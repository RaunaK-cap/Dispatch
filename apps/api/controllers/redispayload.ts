import { prisma } from "db";
import { xaddbulk } from "redis-queue";



export async function redispayload(USERID: number, message: string, id: number) {

    if (!USERID) {
        return "id not found"
    }

    try {
        const UserData = await prisma.user.findFirst({
            where: {
                id: USERID

            }, select: {
                channelconfig: {
                    select: {
                        channel: true,
                        config: true,

                    }
                }
            },
        })

        UserData?.channelconfig.forEach((data) => {
            xaddbulk([{
                channelName: data.channel,
                config: String(data.config),
                message: message,
                messageID: String(id),
                UserID: String(USERID)
            }])

        })

        return UserData

    } catch (error) {
        console.log(error)
        return "data not found"
    }
}