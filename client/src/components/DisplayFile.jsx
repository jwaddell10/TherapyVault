import { useParams } from "react-router-dom";
import OptionsForm from "./TherapyWorksheets/OptionsForm";
import useGetFileData from "../helpers/FetchRequests/useGetFileData";
import handleDelete from "../helpers/handleDelete";
import { useState } from "react";

export default function DisplayFile() {
	const fileId = useParams();
	const { fileData } = useGetFileData(fileId);
	const [refreshTrigger, setRefreshTrigger] = useState(null);

	return (
		<>
			<OptionsForm
				onDelete={() => {
					handleDelete("worksheet", setRefreshTrigger, fileData.id);
				}}
			/>
			{fileData && (
				<>
					<h1>{fileData.title}</h1>
					<iframe
						src={fileData.imgUrl}
						width={"100%"}
						height={"600px"}
						title={fileData.title}
					></iframe>
				</>
			)}
		</>
	);
}
