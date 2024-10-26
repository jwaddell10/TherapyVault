/*
  Warnings:

  - Made the column `createdAt` on table `Folder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Worksheets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Worksheets" ALTER COLUMN "createdAt" SET NOT NULL;
