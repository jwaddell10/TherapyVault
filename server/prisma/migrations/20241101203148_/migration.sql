/*
  Warnings:

  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TopicToWorksheets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TopicToWorksheets" DROP CONSTRAINT "_TopicToWorksheets_A_fkey";

-- DropForeignKey
ALTER TABLE "_TopicToWorksheets" DROP CONSTRAINT "_TopicToWorksheets_B_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Topic";

-- DropTable
DROP TABLE "_TopicToWorksheets";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
