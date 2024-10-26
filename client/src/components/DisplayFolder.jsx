import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./TherapyWorksheetsPage/Header";

export default function DisplayFolder() {
	let { folderId } = useParams();
	const [folderData, setFolderData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/folder/${folderId}`
			);
			const data = await response.json();
			setFolderData(data);
		};
		fetchData();
	}, [folderId]);

	return (
		<>
			<Header name={folderData}/>
			<div>
				{folderData && (
					<ul>
						<li>{folderData.id}</li>
						<li>{folderData.title}</li>
						<li>{folderData.createdAt}</li>
					</ul>
				)}
			</div>
		</>
	);
}
