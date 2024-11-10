import { useParams } from "react-router-dom";
import OptionsForm from "./TherapyWorksheets/OptionsForm";
import useGetFileData from "../helpers/FetchRequests/useGetFileData";
import handleDelete from "../helpers/handleDelete";
import { useState } from "react";

export default function DisplayFile() {
	const fileId = useParams();
	const { fileData } = useGetFileData(fileId);
	console.log(fileData, "file data from usegetfiledata");
	const [refreshTrigger, setRefreshTrigger] = useState(null)

	return (
		<>
			{/* <DisplayAllFilesFolders filesAndFoldersSortedById={fileData}/> */}
			<OptionsForm onDelete={() => {handleDelete('worksheet', setRefreshTrigger, fileData.id)}}/>
			{fileData && <h1>{fileData.title}</h1>}
		</>
	);
}
