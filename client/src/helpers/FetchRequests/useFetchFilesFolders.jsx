import { useState, useEffect } from "react";

export default function useFetchFilesFolders(isEditing, refreshTrigger) {
	const JWTToken = localStorage.getItem("token");
	const [files, setFiles] = useState([]);
	const [folders, setFolders] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				"Content-type": "application/json",
				Authorization: `${JWTToken}`,
			};
			try {
				await fetch(`${import.meta.env.VITE_API_URL}/folder`, {
					headers: headers,
				})
					.then((response) => response.json())
					.then((folders) => setFolders(folders));
				await fetch(`${import.meta.env.VITE_API_URL}/worksheet`, {
					headers: headers,
				})
					.then((response) => response.json())
					.then((files) => setFiles(files));
			} catch (error) {
				console.log(error, "this is the error");
			}
		};
		fetchData();
	}, [isEditing, refreshTrigger]);
	return { files, folders };
}
