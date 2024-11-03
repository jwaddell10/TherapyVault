/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_folderId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "folderid" INTEGER,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_folderid_fkey" FOREIGN KEY ("folderid") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
