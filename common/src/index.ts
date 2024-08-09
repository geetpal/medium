import z from "zod"


export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export const createPostInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updatePostInput = z.object({
    id: z.number(),
    title: z.string().optional(),
    content: z.string().optional()

})

//Frontend dev will be benefiting from this, as he will be able to see the structure of input
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreatePostInput = z.infer<typeof createPostInput>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;