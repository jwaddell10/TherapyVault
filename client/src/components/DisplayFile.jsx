import { useParams } from "react-router-dom";
import useGetFileData from "../helpers/FetchRequests/useGetFileData";

export default function DisplayFile() {
	const fileId = useParams();
	const { fileData } = useGetFileData(fileId);

	return (
		<>
			{fileData && (
				<>
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
