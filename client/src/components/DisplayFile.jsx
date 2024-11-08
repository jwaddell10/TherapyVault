import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DisplayFile() {
	const fileId = useParams();
	console.log(
		`${import.meta.env.VITE_API_URL}/worksheet/${fileId.worksheetId}`,
		"url"
	);
	const [fileData, setFileData] = useState(null);
	useEffect(() => {
		const fetchFileData = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/worksheet/${
					fileId.worksheetId
				}`
			);
			const data = await response.json();
			console.log(data.title, "data tile");
			setFileData(data);
		};
		fetchFileData();
	}, [fileId.worksheetId]);

	return <>{fileData && <h1>{fileData.title}</h1>}</>;
}
