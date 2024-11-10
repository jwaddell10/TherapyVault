/*
  Warnings:

  - You are about to drop the column `parentId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentId_fkey";

-- DropIndex
DROP INDEX "Folder_parentId_idx";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "parentId",
ADD COLUMN     "folderId" INTEGER;

-- CreateIndex
CREATE INDEX "Folder_folderId_idx" ON "Folder"("folderId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
