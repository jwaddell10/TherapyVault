/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToWorksheets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToWorksheets" DROP CONSTRAINT "_CategoryToWorksheets_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToWorksheets" DROP CONSTRAINT "_CategoryToWorksheets_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToWorksheets";

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "topics" VARCHAR(255) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TopicToWorksheets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TopicToWorksheets_AB_unique" ON "_TopicToWorksheets"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicToWorksheets_B_index" ON "_TopicToWorksheets"("B");

-- AddForeignKey
ALTER TABLE "_TopicToWorksheets" ADD CONSTRAINT "_TopicToWorksheets_A_fkey" FOREIGN KEY ("A") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicToWorksheets" ADD CONSTRAINT "_TopicToWorksheets_B_fkey" FOREIGN KEY ("B") REFERENCES "Worksheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
