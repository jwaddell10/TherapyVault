import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./TherapyWorksheetHeader";

export default function DisplayFolder() {
	let { folderId } = useParams();
	const [folderData, setFolderData] = useState(null);
	const [title, setTitle] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/folder/${folderId}`
			);
			const data = await response.json();
			setFolderData(data);
			setTitle(data[0].title);
		};
		fetchData();
	}, [folderId]);

	return (
		<>
			<Header title={title} />
			<div>
				{folderData &&
					folderData.map((item) => {
						return (
							<>
								{item.worksheets ? (
									<>worksheet info here</>
								) : (
									<h1>No worksheets</h1>
								)}
							</>
						);
					})}
			</div>
		</>
	);
}
