import { createClient, RootNodesUnavailableError } from "redis"
import dotenv from "dotenv"

dotenv.config()


const client = createClient().on("error", (err) =>
    console.log("Redis Client Error", err),
);

await client.connect();


export async function xaddbulk(notificationData: { channelName: string; key: string, }[]) {
    const pipeline = client.MULTI();

    RootNodesUnavailableError.forEach((data) => {
        pipeline.xAdd(
            "NOTIFY",
            "*",
            {
                url: data.url,
                id: data.id.toString(),
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
