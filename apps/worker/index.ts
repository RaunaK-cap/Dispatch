import { prisma } from "db";
import {
    Xreadgroups,
    XackBulk,
    ensureConsumerGroup,
} from "redis-queue";
import dotenv from "dotenv";

dotenv.config();

// Use environment variables or default fallbacks for local testing!
const GROUP_NAME = process.env.REGION_ID || "dispatch-workers";
const WORKING_ID = process.env.WORKING_ID || "worker-1";

async function main() {
    console.log(`Starting Worker: ${WORKING_ID} in Group: ${GROUP_NAME}`);
    await ensureConsumerGroup(GROUP_NAME);

    while (true) {
        const responses = await Xreadgroups(GROUP_NAME, WORKING_ID);

        if (!responses || responses.length === 0) {
            continue;
        }

        console.log(`Received ${responses.length} jobs from Redis...`);

        // Map through all incoming messages and process them
        const promises = responses.map((msg) =>
            //@ts-ignore - bypassing strict type checks for the redis payload
            sendNotification(msg.message, msg.id)
        );

        await Promise.all(promises);

        // Acknowledge all processed messages so Redis removes them from the queue
        await XackBulk(
            GROUP_NAME,
            responses.map((response) => response.id),
        );
    }
}

// This function handles the actual sending logic
async function sendNotification(payload: any, redisJobId: string) {
    const starttime = Date.now();

    try {
        const config = JSON.parse(payload.config);
        
        // 1. Send the message based on the channel type
        if (payload.channelName === "DISCORD" && config.webhookUrl) {
            await fetch(config.webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: payload.message })
            });
        } 
        else if (payload.channelName === "TELEGRAM" && config.botToken && config.chatId) {
            const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: config.chatId, text: payload.message })
            });
        }
        // You can add WHATSAPP or EMAIL here later!

        const endtime = Date.now();

        // 2. Log success to the database
        await prisma.deliverylog.create({
            data: {
                status: "DELIVERED",
                // @ts-ignore
                channel: payload.channelName,
                messageID: Number(payload.messageID),
                USERID: Number(payload.UserID),
                retrycount: 0,
                redisjobID: redisJobId,
                latencyMS: endtime - starttime,
            },
        });

        console.log(`✅ Message ${payload.messageID} delivered via ${payload.channelName}`);

    } catch (error) {
        const endtime = Date.now();
        console.error(`❌ Failed to send message ${payload.messageID}:`, error);

        // 3. Log failure to the database
        await prisma.deliverylog.create({
            data: {
                status: "FAILED",
                // @ts-ignore
                channel: payload.channelName,
                messageID: Number(payload.messageID),
                USERID: Number(payload.UserID),
                retrycount: 0,
                redisjobID: redisJobId,
                latencyMS: endtime - starttime,
            },
        });
    }
}

main();