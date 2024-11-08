/*
  Warnings:

  - You are about to drop the column `demographics` on the `Demographic` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the `Worksheets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DemographicToWorksheets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `demographic` to the `Demographic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demographic" DROP COLUMN "demographics",
ADD COLUMN     "demographic" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "authorId",
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Worksheets";

-- DropTable
DROP TABLE "_DemographicToWorksheets";

-- CreateTable
CREATE TABLE "Worksheet" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL,
    "folderId" INTEGER,

    CONSTRAINT "Worksheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DemographicToWorksheet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Worksheet_authorId_idx" ON "Worksheet"("authorId");

-- CreateIndex
CREATE INDEX "Worksheet_folderId_idx" ON "Worksheet"("folderId");

-- CreateIndex
CREATE UNIQUE INDEX "_DemographicToWorksheet_AB_unique" ON "_DemographicToWorksheet"("A", "B");

-- CreateIndex
CREATE INDEX "_DemographicToWorksheet_B_index" ON "_DemographicToWorksheet"("B");

-- CreateIndex
CREATE INDEX "Folder_userId_idx" ON "Folder"("userId");

-- CreateIndex
CREATE INDEX "Folder_parentId_idx" ON "Folder"("parentId");
