import { useParams } from "react-router-dom";
import OptionsForm from "./TherapyWorksheets/OptionsForm";
<<<<<<< HEAD
import useGetFileData from "../helpers/FetchRequests/useGetFileData";
=======
>>>>>>> 51c8949597a262480d4a173cd74c68eee1798cfa

export default function DisplayFile() {
	const fileId = useParams();
	const { fileData } = useGetFileData(fileId);
	console.log(fileData, 'file data from usegetfiledata')

<<<<<<< HEAD
	return (
		<>
			<OptionsForm />
			{fileData && <h1>{fileData.title}</h1>}
		</>
	);
=======
	return <><OptionsForm />{fileData && <h1>{fileData.title}</h1>}</>;
>>>>>>> 51c8949597a262480d4a173cd74c68eee1798cfa
}
