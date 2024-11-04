/*
  Warnings:

  - You are about to drop the `_FolderToWorksheets` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Folderid]` on the table `Worksheets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_FolderToWorksheets" DROP CONSTRAINT "_FolderToWorksheets_A_fkey";

-- DropForeignKey
ALTER TABLE "_FolderToWorksheets" DROP CONSTRAINT "_FolderToWorksheets_B_fkey";

-- AlterTable
ALTER TABLE "Worksheets" ADD COLUMN     "Folderid" INTEGER;

-- DropTable
DROP TABLE "_FolderToWorksheets";

-- CreateIndex
CREATE UNIQUE INDEX "Worksheets_Folderid_key" ON "Worksheets"("Folderid");

-- AddForeignKey
ALTER TABLE "Worksheets" ADD CONSTRAINT "Worksheets_Folderid_fkey" FOREIGN KEY ("Folderid") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
