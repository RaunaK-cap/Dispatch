import type { Request, Response } from "express";
import { channelConfig } from "../types";
import { prisma } from "db";

export const config = async (req: Request, res: Response) => {

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

        res.status(200).json({
            message: "credentials have been saved successfully ",
            resp: resp
        })

    } catch (error) {
        res.status(400).json({
            message: "error while storing "
        })
    }

}


export const notification_message = async (req: Request, res: Response) => {

    const { user_notification_message } = req.body

    try {

        const res = await prisma.notificationmessage.create({
            data: {
                USERID: Number(req.userID),
                message: user_notification_message
            }
        })

        res.status(200).json({
            message: "message have been queued "
        })

    } catch (e) {
        res.status(400).json({
            message: "error while sending message"
        })
    }

}

export const deliverylogs = async (req: Request, res: Response) => {
    const { messageID, channel, status, retrycount, redisjobID, latencyMS } = req.body
    try {
        const res = await prisma.deliverylogs.create({
            data: {
                USERID: Number(req.userID),
                messageID: messageID,
                channel: channel,
                status: status,
                retrycount: retrycount,
                redisjobID: redisjobID,
                latencyMS: latencyMS

            }
        })

        res.status(200).json({
            message: "logs have been submitted "
        })
    } catch (error) {
        res.status(400).json({
            message: "error while saving logs"
        })
    }

}