import { useState } from "react";
import DisplayAllFilesFolders from "./DisplayAllFilesFolders.jsx";
import "./TherapyWorksheets.css";
import useFetchFilesFolders from "../../helpers/FetchRequests/useFetchFilesFolders.jsx";
import TherapyWorksheetHeader from "./TherapyWorksheetHeader.jsx";

export default function TherapyWorksheets({ title }) {
	const [refreshTrigger, setRefreshTrigger] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const { files, folders } = useFetchFilesFolders(isEditing, refreshTrigger);
	const filesWithTypesAndNoParentFolder = (files || [])
		.map((file) => ({
			...file,
			type: "worksheet",
		}))
		.filter((item) => item.folderId === null);
	const foldersWithTypesAndNoParentFolder = (folders?.folders || [])
		.map((folder) => ({
			...folder,
			type: "folder",
		}))
		.filter((item) => item.folderId === null);

	const filesandFoldersSortedById = filesWithTypesAndNoParentFolder
		.concat(foldersWithTypesAndNoParentFolder)
		.sort((a, b) => a.id - b.id);
	return (
		<section className="page-container">
			{/* <SideBar /> */}
			<main className="main-content">
				<TherapyWorksheetHeader
					title={title}
					setRefreshTrigger={setRefreshTrigger}
				/>
				<DisplayAllFilesFolders
					filesAndFoldersSortedById={filesandFoldersSortedById}
					setRefreshTrigger={setRefreshTrigger}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			</main>
		</section>
	);
}
