import { createClient, RootNodesUnavailableError } from "redis"
import dotenv from "dotenv"

dotenv.config()


const client = createClient().on("error", (err) =>
    console.log("Redis Client Error", err),
);

await client.connect();


export async function xaddbulk(notificationData: { channelName: string; config: string, message: string, UserID: string, messageID: string }[]) {
    const pipeline = client.MULTI();

    notificationData.forEach((data) => {
        pipeline.xAdd(
            "NOTIFY",
            "*",
            {
                channelname: data.channelName,
                config: data.config,
                notification_message: data.message,
                messageID: data.messageID,
                UserID: data.UserID

            },
            {
                TRIM: {
                    strategy: "MAXLEN",
                    strategyModifier: "~",
                    threshold: 50,
                },
            },
        );
    });

    const results = await pipeline.EXEC();
    console.log(
        `[${new Date().toISOString()}] Added ${results?.length} entries:`,
        results,
    );
}
