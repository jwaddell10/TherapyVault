-- CreateTable
CREATE TABLE "_FolderToWorksheets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToWorksheets_AB_unique" ON "_FolderToWorksheets"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToWorksheets_B_index" ON "_FolderToWorksheets"("B");

-- AddForeignKey
ALTER TABLE "_FolderToWorksheets" ADD CONSTRAINT "_FolderToWorksheets_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToWorksheets" ADD CONSTRAINT "_FolderToWorksheets_B_fkey" FOREIGN KEY ("B") REFERENCES "Worksheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
