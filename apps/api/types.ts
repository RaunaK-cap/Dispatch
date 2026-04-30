import { optional, z } from "zod"


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

export const channelConfig = z.object({
    discord: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    telegram: z.string().min(1).optional(),
    whatsapp: z.string().min(1).optional(),
    channelConfig: z.string().min(1)
})