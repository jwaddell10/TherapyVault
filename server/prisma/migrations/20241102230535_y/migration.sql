/*
  Warnings:

  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Session_userId_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId";
