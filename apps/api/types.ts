import { z } from "zod"


export const signupscheam = z.object({
    username: z.string().min(2),
    password: z.string().min(2),
    firstname: z.string().min(2),
    lastname: z.string().min(2)
})

export const signinschema = z.object({
    username: z.string().min(2),
    password: z.string().min(2)
})