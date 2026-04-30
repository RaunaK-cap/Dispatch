import type { Request, Response } from "express";
import { channelConfig } from "../types";
import { prisma } from "db";

export const content = async (req: Request, res: Response) => {

    const { config, channel } = req.body
    try {

        const resp = await prisma.channelconfig.create({
            data: {
                config: config,
                channel: channel,
                USERID: Number(req.userID),
                isactive: true

            }
        })

        res.json({
            message: "credentials have been saved successfully ",
            resp: resp
        })

    } catch (error) {
        res.json({
            message: "error while storing "
        })
    }

}