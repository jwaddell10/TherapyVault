import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./TherapyWorksheetHeader";
import DisplayAllFilesFolders from "./DisplayAllFilesFolders";

export default function DisplayFolder() {
	let { folderId } = useParams();
	const [folderData, setFolderData] = useState();
	const [title, setTitle] = useState(null);
	console.log(title, 'title')
	const [refreshTrigger, setRefreshTrigger] = useState(0)
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/folder/${folderId}`
			);

			if (!response.ok) {
				throw new Error("Server error occurred. Try again later");
			}

			const data = await response.json();

			if (data) {
				// console.log(data.title, 'this is data from fetch')
				const fileWithType = data.worksheet.map((item) => ({
					...item,
					type: "worksheet",
				}));
				const folderWithType = data.children.map((item) => ({
					...item,
					type: "folder",
				}));
				const folderChildren = fileWithType.concat(folderWithType);
				setFolderData(folderChildren);
				setTitle(data.title);
			}
		};
		fetchData();
	}, [folderId, refreshTrigger]);

	return (
		<>
			<Header title={title} folderId={folderId} />
			<DisplayAllFilesFolders filesAndFoldersSortedById={folderData} setRefreshTrigger={setRefreshTrigger} />
			{/* <div>
				{folderData &&
					folderData.map((item) => {
						return (
							<>
								{item.title}
							</>
						);
					})}
			</div> */}
		</>
	);
}
