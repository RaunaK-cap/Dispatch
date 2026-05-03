import type { Request, Response } from "express";
import { channelConfig } from "../types";
import { prisma } from "db";

export const config = async (req: Request, res: Response) => {

    const { config, channel } = req.body

    try {

        const resp = await prisma.channelconfig.upsert({

            where: {
                channel_USERID: {
                    channel: channel,
                    USERID: Number(req.userID)
                }

            }, create: {
                channel: channel,
                config: config,
                USERID: Number(req.userID),
                isactive: true

            }, update: {
                config: config,
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

export const delete_config = async (req: Request, res: Response) => {

    const { id } = req.body

    try {

        const resp = await prisma.channelconfig.delete({
            where: {
                id: id
            }, select: {
                channel: true,
                config: true
            }
        })

        res.status(200).json({
            message: "deleted",
            resp
        })

    } catch (error) {
        res.json({
            message: "eerror while deleting",
            error
        })
    }
}


export const notification_message = async (req: Request, res: Response) => {

    const { user_notification_message } = req.body

    try {

        const response = await prisma.notificationmessage.create({
            data: {
                USERID: Number(req.userID),
                message: user_notification_message
            }
        })

        res.status(200).json({
            message: "message have been queued ",
            response
        })

    } catch (e) {
        res.status(400).json({
            message: "error while sending message"
        })
    }

}

export const delete_notification_message = async (req: Request, res: Response) => {

    const { id } = req.body
    try {
        const resp = await prisma.notificationmessage.delete({
            where: {
                id: id
            }, select: {
                deliverylogs: true
            }
        })

        res.status(200).json({
            message: "deleted",
            resp
        })
    } catch (error) {
        res.status(200).json({
            message: "error while deleting"
        })
    }
}

export const deliverylogs = async (req: Request, res: Response) => {

    const { messageID, channel, status, retrycount, redisjobID, latencyMS } = req.body

    try {
        const response = await prisma.deliverylog.create({
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
            message: "logs have been submitted ",
            response
        })

    } catch (error) {
        res.status(400).json({
            message: "error while saving logs"
        })
    }

}