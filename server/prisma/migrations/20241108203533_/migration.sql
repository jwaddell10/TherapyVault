/*
  Warnings:

  - You are about to drop the column `userId` on the `Folder` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Folder_userId_idx";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Folder_authorId_idx" ON "Folder"("authorId");
