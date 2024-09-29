/*
  Warnings:

  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToUpload` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `categories` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_id_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUpload" DROP CONSTRAINT "_CategoryToUpload_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToUpload" DROP CONSTRAINT "_CategoryToUpload_B_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "categories" SET NOT NULL;

-- DropTable
DROP TABLE "Upload";

-- DropTable
DROP TABLE "_CategoryToUpload";

-- CreateTable
CREATE TABLE "Worksheets" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Worksheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demographic" (
    "id" SERIAL NOT NULL,
    "demographics" VARCHAR(255) NOT NULL,

    CONSTRAINT "Demographic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToWorksheets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DemographicToWorksheets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToWorksheets_AB_unique" ON "_CategoryToWorksheets"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToWorksheets_B_index" ON "_CategoryToWorksheets"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DemographicToWorksheets_AB_unique" ON "_DemographicToWorksheets"("A", "B");

-- CreateIndex
CREATE INDEX "_DemographicToWorksheets_B_index" ON "_DemographicToWorksheets"("B");

-- AddForeignKey
ALTER TABLE "Worksheets" ADD CONSTRAINT "Worksheets_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWorksheets" ADD CONSTRAINT "_CategoryToWorksheets_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToWorksheets" ADD CONSTRAINT "_CategoryToWorksheets_B_fkey" FOREIGN KEY ("B") REFERENCES "Worksheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemographicToWorksheets" ADD CONSTRAINT "_DemographicToWorksheets_A_fkey" FOREIGN KEY ("A") REFERENCES "Demographic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemographicToWorksheets" ADD CONSTRAINT "_DemographicToWorksheets_B_fkey" FOREIGN KEY ("B") REFERENCES "Worksheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
