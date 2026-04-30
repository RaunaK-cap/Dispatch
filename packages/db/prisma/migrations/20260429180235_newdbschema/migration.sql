-- CreateEnum
CREATE TYPE "channeltype" AS ENUM ('DISCORD', 'EMAIL', 'WHATSAPP', 'TELEGRAM');

-- CreateEnum
CREATE TYPE "deliverystatus" AS ENUM ('QUEUED', 'PROCESSING', 'DELIVERED', 'FAILED', 'RETYING');

-- CreateTable
CREATE TABLE "channelconfig" (
    "id" SERIAL NOT NULL,
    "channel" "channeltype" NOT NULL,
    "config" JSONB NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT false,
    "USERID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channelconfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificationmessage" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "USERID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notificationmessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliverylogs" (
    "id" SERIAL NOT NULL,
    "messageID" INTEGER NOT NULL,
    "USERID" INTEGER NOT NULL,
    "channel" "channeltype",
    "status" "deliverystatus" NOT NULL,
    "retrycount" INTEGER NOT NULL,
    "redisjobID" TEXT,
    "latencyMS" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliverylogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "channelconfig" ADD CONSTRAINT "channelconfig_USERID_fkey" FOREIGN KEY ("USERID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationmessage" ADD CONSTRAINT "notificationmessage_USERID_fkey" FOREIGN KEY ("USERID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliverylogs" ADD CONSTRAINT "deliverylogs_messageID_fkey" FOREIGN KEY ("messageID") REFERENCES "notificationmessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliverylogs" ADD CONSTRAINT "deliverylogs_USERID_fkey" FOREIGN KEY ("USERID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
