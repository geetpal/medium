import { PrismaClient } from "@prisma/client/extension"
import { Hono } from "hono"
import { decode, sign, verify } from 'hono/jwt'


import { signupInput, signinInput } from "@geetpalsingh/medium3-common"



// Will come back to this type error correction to figure out what type should be assigned to a prisma client that extends accelerate
// type ExtendedPrismaClient = PrismaClient & ReturnType<typeof withAccelerate>;
export const userRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string
    }, Variables: {
        prisma: PrismaClient
    }
}>()


//User Routes
userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    const prisma = c.get('prisma')

    const { success } = signupInput.safeParse(body)
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" })
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name,
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ token })
    }
    catch (e) {
        c.status(403)
        return c.json({
            error: "User already exists, try unique email id"
        })
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json()

    const prisma = c.get('prisma')

    const { success } = signinInput.safeParse(body)
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" })
    }


    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!user) {
            c.status(403)
            return c.json({
                error: "User does not exist"
            })
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            "token": token,
            "message": "Signin Successfull"
        })
    }
    catch (e) {
        c.status(403);
        return c.json({
            error: "Error during signin"
        })
    }
})