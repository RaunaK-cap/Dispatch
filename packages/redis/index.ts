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

export async function ensureConsumerGroup(consumergroup: string) {
    try {
        await client.xGroupCreate("NOTIFY", consumergroup, "0", {
            MKSTREAM: true,
        });
    } catch (error) {
        if (error instanceof Error && error.message.includes("BUSYGROUP")) {
            return;
        }

        throw error;
    }
}

type messageType = {
    id: string;
    message: {
        url: string;
        id: string;
    };
    //@ts-ignore
};


//@ts-ignore
export async function Xreadgroups(
    consumergroup: string,
    workingId: string,
): Promise<messageType[] | undefined> {

    const res = await client.xReadGroup(
        consumergroup,
        workingId,
        {
            key: "NOTIFY",
            id: ">",
        },
        {
            COUNT: 5,
            BLOCK: 5000,
        },
    );

    //@ts-ignore
    const message = res?.[0]?.messages;
    return message;
}

export async function Xack(consumergroup: string, eventID: string) {
    await client.xAck("NOTIFY", consumergroup, eventID);
}

export async function XackBulk(consumergroup: string, eventIDs: string[]) {
    await Promise.all(eventIDs.map((eventID) => Xack(consumergroup, eventID)));
}
