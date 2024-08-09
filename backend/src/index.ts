import { Hono } from 'hono'
import { userRouter } from './routes/userRouter';
import { blogRouter } from './routes/blogRouter';

//If you are deploying on serveless offering we use "edge"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { JWTPayload } from 'hono/utils/jwt/types';



//Initializing hono with the bindings (required details present in other files) and variables (vars that are being used in the code to access the value)
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: number;
    prisma: JWTPayload;
  }
}>()


//Middleware to initiate/create prisma client
app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const test = prisma.user

  c.set("prisma", prisma)

  await next();
  await prisma.$disconnect();
})

app.route("api/v1/user", userRouter)
app.route("api/v1/blog", blogRouter)


//ISSUE:- The reason for initializing the prisma client inside each route again and again is becasue we do not have global access to the db URL. SOLUTION:- The solution is to either define the client again and again or use a middleware



export default app
