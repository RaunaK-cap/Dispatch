/*
  Warnings:

  - The values [RETYING] on the enum `deliverystatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `deliverylogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[channel,USERID]` on the table `channelconfig` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "deliverystatus_new" AS ENUM ('PENDING', 'QUEUED', 'PROCESSING', 'DELIVERED', 'PARTIALLY_DELIVERED', 'FAILED', 'CANCELLED');
ALTER TABLE "deliverylog" ALTER COLUMN "status" TYPE "deliverystatus_new" USING ("status"::text::"deliverystatus_new");
ALTER TYPE "deliverystatus" RENAME TO "deliverystatus_old";
ALTER TYPE "deliverystatus_new" RENAME TO "deliverystatus";
DROP TYPE "public"."deliverystatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "channelconfig" DROP CONSTRAINT "channelconfig_USERID_fkey";

-- DropForeignKey
ALTER TABLE "deliverylogs" DROP CONSTRAINT "deliverylogs_USERID_fkey";

-- DropForeignKey
ALTER TABLE "deliverylogs" DROP CONSTRAINT "deliverylogs_messageID_fkey";

-- DropForeignKey
ALTER TABLE "notificationmessage" DROP CONSTRAINT "notificationmessage_USERID_fkey";

-- DropTable
DROP TABLE "deliverylogs";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliverylog" (
    "id" SERIAL NOT NULL,
    "messageID" INTEGER NOT NULL,
    "USERID" INTEGER NOT NULL,
    "channel" "channeltype",
    "status" "deliverystatus" NOT NULL DEFAULT 'PENDING',
    "retrycount" INTEGER NOT NULL,
    "redisjobID" TEXT,
    "latencyMS" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliverylog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "channelconfig_channel_USERID_key" ON "channelconfig"("channel", "USERID");

-- AddForeignKey
ALTER TABLE "channelconfig" ADD CONSTRAINT "channelconfig_USERID_fkey" FOREIGN KEY ("USERID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationmessage" ADD CONSTRAINT "notificationmessage_USERID_fkey" FOREIGN KEY ("USERID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliverylog" ADD CONSTRAINT "deliverylog_messageID_fkey" FOREIGN KEY ("messageID") REFERENCES "notificationmessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliverylog" ADD CONSTRAINT "deliverylog_USERID_fkey" FOREIGN KEY ("USERID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
