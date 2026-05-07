import { prisma } from "db";


export async function redispayload(USERID: number, message: string, id: number) {
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
        return UserData
    } catch (error) {
        console.log(error)
        return "data not found"
    }
}