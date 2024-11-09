import { useParams } from "react-router-dom";
import OptionsForm from "./TherapyWorksheets/OptionsForm";
import useGetFileData from "../helpers/FetchRequests/useGetFileData";

export default function DisplayFile() {
	const fileId = useParams();
	const { fileData } = useGetFileData(fileId);
	console.log(fileData, 'file data from usegetfiledata')

	return (
		<>
			<OptionsForm />
			{fileData && <h1>{fileData.title}</h1>}
		</>
	);
}
