-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "folderId" INTEGER;

-- AlterTable
ALTER TABLE "Worksheets" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
