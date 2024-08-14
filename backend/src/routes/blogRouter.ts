import { PrismaClient } from "@prisma/client/extension"
import { Hono } from "hono"
import { decode, sign, verify } from 'hono/jwt'

import { createPostInput, updatePostInput } from "@geetpalsingh/medium3-common"


export const blogRouter = new Hono<{
    Bindings: {
        JWT_SECRET: string
    }, Variables: {
        userId: number
        prisma: PrismaClient
    }
}>()


//Blog Route middleware
//#1 To check the authorization via jwt token
blogRouter.use('*', async (c, next) => {

    const token = c.req.header("Authorization");
    if (!token) {
        // 403 forbidden—you don't have permission to access this resource
        c.status(403)
        return c.json({
            error: "No permission to access"
        })
    }
    const jwt = token.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);

    // 401 means lacks valid authentication credentials for the requested resource
    if (!payload) {
        c.status(401)
        return c.json({
            error: "Unauthorized"
        })
    }
    c.set('userId', Number(payload.id));
    await next();
})

//Blog Routes
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const prisma = await c.get("prisma")
    const userId = c.get("userId");

    console.log("hello");
    const { success } = createPostInput.safeParse(body)
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" })
    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({
            id: blog.id,
            message: "Blog post created"
        })
    }
    catch (e) {
        c.status(400);
        console.log(e)
        return c.json({ error: "Error during blog post creation" })
    }

})

blogRouter.put('/', async (c) => {
    const body = await c.req.json()
    const prisma = await c.get("prisma")


    const { success } = updatePostInput.safeParse(body)
    if (!success) {
        c.status(400);
        return c.json({ error: "invalid input" })
    }

    try {
        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id,
            }, data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: body.id,
            message: 'Blog post updated'
        })
    }
    catch (e) {
        c.status(400);
        return c.json({ error: "Error during blog updation" })
    }

})

blogRouter.get('/bulk', async (c) => {

    const prisma = await c.get("prisma")

    try {
        const blogs = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!blogs) {
            return c.json({ message: "No blogs exists" })
        }
        return c.json(blogs)
    }
    catch (e) {
        console.log(e)
        return c.json({ error: "Error while fetching all the blog posts" })
    }

})

blogRouter.get('/:id', async (c) => {
    const prisma = await c.get("prisma")
    const id = c.req.param("id")

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }, select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!blog) {
            c.status(404)
            return c.json({
                error: "Blog post not found"
            })
        }
        return c.json(blog)
    }
    catch (e) {
        c.status(400)
        console.log(e)
        return c.json({ error: "Error while finding the blog post" })
    }





})

