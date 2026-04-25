import type { NextFunction, Request, Response } from "express";
import jwt, { verify, type JwtPayload } from "jsonwebtoken"

interface verifedbody extends JwtPayload {
    userid: string
}

const usermiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        res.send("enter token")
        return;
    }
    const verfied_token = jwt.verify(token!, process.env.JWT_SECRET!) as verifedbody
    if (verfied_token) {
        req.userID = verfied_token.userid
        next()
    } else {
        res.json({
            message: "unauthorized"
        })
    }

    return;
}

export default usermiddleware