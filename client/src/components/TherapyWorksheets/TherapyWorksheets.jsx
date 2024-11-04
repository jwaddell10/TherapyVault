import { useState } from "react";
import DisplayAllFilesFolders from "./DisplayAllFilesFolders.jsx";
import "./TherapyWorksheets.css";
import useFetchFilesFolders from "../helpers/FetchRequests/useFetchFilesFolders.jsx";
import TherapyWorksheetHeader from "./TherapyWorksheetHeader.jsx";

export default function TherapyWorksheets({username}) {
	//state to refresh page when files/folders are altered
	const [refreshTrigger, setRefreshTrigger] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const { files, folders } = useFetchFilesFolders(isEditing, refreshTrigger);
	const filesAndFoldersSortedById = (files || [])
		.map((file) => ({ ...file, type: "worksheet" }))
		.concat(folders?.folders || [])
		.map((folder) => ({ ...folder, type: "folder" }))
		.sort((a, b) => a.id - b.id);
console.log(filesAndFoldersSortedById, 'files and folders')
	return (
		<section className="page-container">
			{/* <SideBar /> */}
			<main className="main-content">
				<TherapyWorksheetHeader username={username} setRefreshTrigger={setRefreshTrigger} />
				<DisplayAllFilesFolders
					filesAndFoldersSortedById={filesAndFoldersSortedById}
					setRefreshTrigger={setRefreshTrigger}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			</main>
		</section>
	);
}
