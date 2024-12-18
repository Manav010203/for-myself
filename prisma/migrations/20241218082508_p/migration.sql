/*
  Warnings:

  - A unique constraint covering the columns `[userId,streamId]` on the table `Upvote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `extractedId` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "extractedId" TEXT NOT NULL,
ADD COLUMN     "largeImg" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "played" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "smallImg" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "active" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_userId_streamId_key" ON "Upvote"("userId", "streamId");
