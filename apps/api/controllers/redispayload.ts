import { prisma } from "db";


export async function redispayload(userid: number) {
    try {
        const UserData = await prisma.user.findFirst({
            where: {
                id: userid

            }, select: {
                channelconfig: {
                    select: {
                        channel: true,
                        config: true,

                    }
                },
                notificationmessage: {
                    select: {
                        message: true,
                        USERID: true,
                        id: true
                    }
                },
            },
        })
        console.log(UserData)
        return UserData
    } catch (error) {
        console.log(error)
        return "data not found"
    }
}