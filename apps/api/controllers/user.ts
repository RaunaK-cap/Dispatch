import type { Request, Response } from "express";
import { signinschema, signupscheam } from "../types";
import { prisma } from "db";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const signup = async (req: Request, res: Response) => {
    const body = req.body
    const verifiedbody = signupscheam.safeParse(body)
    if (!verifiedbody.success) {
        return res.status(400).send("invalid inputs")
    }
    try {
        const response = await prisma.user.upsert({
            where: {
                username: verifiedbody.data?.username
            },
            create: {
                username: verifiedbody.data.username,
                password: verifiedbody.data.password,
                firstname: verifiedbody.data.firstname,
                lastname: verifiedbody.data.lastname
            },
            update: {
                username: verifiedbody.data.username,
                password: verifiedbody.data.password,
                firstname: verifiedbody.data.firstname,
                lastname: verifiedbody.data.lastname
            }
        })


        res.status(200).json({
            message: "signup succesfull"
        })
    } catch (error) {
        res.status(400).json({
            message: "error in signup"
        })
    }

}

export const signin = async (req: Request, res: Response) => {
    const body = req.body
    const verifiedbody = signinschema.safeParse(body)
    if (!verifiedbody.success) {
        return res.status(400).send("Invalid data")
    }

    try {
        const result = await prisma.user.findFirst({
            where: {
                username: verifiedbody.data.username,
                password: verifiedbody.data.password
            }
        })

        if (!result) {
            res.status(400).send("user not found, signup first")
        } else {
            const token = jwt.sign({ userid: result.id }, process.env.JWT_SECRET!)
            res.status(200).json({
                message: "signin successfull",
                token

            })
        }

    } catch (error) {
        res.status(500).json({
            message: "error in sign in"
        })
    }
}