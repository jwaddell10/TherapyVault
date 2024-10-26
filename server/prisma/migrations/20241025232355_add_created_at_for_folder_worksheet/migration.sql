/*
  Warnings:

  - Added the required column `createdAt` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Worksheets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Worksheets" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL;
