-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Worksheets" DROP CONSTRAINT "Worksheets_Folderid_fkey";

-- DropForeignKey
ALTER TABLE "Worksheets" DROP CONSTRAINT "Worksheets_id_fkey";

-- DropForeignKey
ALTER TABLE "_DemographicToWorksheets" DROP CONSTRAINT "_DemographicToWorksheets_A_fkey";

-- DropForeignKey
ALTER TABLE "_DemographicToWorksheets" DROP CONSTRAINT "_DemographicToWorksheets_B_fkey";
