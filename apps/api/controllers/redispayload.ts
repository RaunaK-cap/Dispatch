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
        console.log(UserData?.channelconfig.forEach((d) => { console.log(d) }))
        console.log(message, id, USERID)

        try {

            UserData?.channelconfig.forEach((data) => {
                xaddbulk([{
                    channelName: data.channel,
                    config: String(data.config),
                    message: message,
                    messageID: String(id),
                    UserID: String(USERID)
                }])

            })
        } catch (e) {

        }

        return UserData

    } catch (error) {
        console.log(error)
        return "data not found"
    }
}