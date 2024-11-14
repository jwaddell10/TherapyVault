import { useParams } from "react-router-dom";
import OptionsForm from "./TherapyWorksheets/OptionsForm";
import useGetFileData from "../helpers/FetchRequests/useGetFileData";
import handleDelete from "../helpers/handleDelete";
import { useState } from "react";

export default function DisplayFile() {
	const fileId = useParams();
	const { fileData } = useGetFileData(fileId);
	console.log(fileData, "file data");
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
						src="https://res.cloudinary.com/dak6py2ng/image/upload/v1731547609/worksheets/kcrms13vqgcvdwllt6gd.pdf"
						width={"100%"}
						height={"600px"}
						title={fileData.title}
					></iframe>
				</>
			)}
		</>
	);
}
