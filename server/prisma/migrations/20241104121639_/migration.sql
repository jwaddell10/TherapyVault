-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_folderid_fkey";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
