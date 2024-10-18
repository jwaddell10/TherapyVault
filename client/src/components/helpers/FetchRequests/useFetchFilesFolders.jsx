import { useState, useEffect } from "react";

export default function useFetchFilesFolders(isEditing) {
	const [files, setFiles] = useState([]);
	const [folders, setFolders] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetch(`${import.meta.env.VITE_API_URL}/folder`)
					.then((response) => response.json())
					.then((folders) => setFolders(folders));
				await fetch(`${import.meta.env.VITE_API_URL}/worksheet`)
					.then((response) => response.json())
					.then((files) => setFiles(files));
			} catch (error) {
				console.log(error, "error");
			}
		};
		fetchData();
	}, [isEditing]);
	// console.log(files, 'files', folders, 'folders')
	return { files, folders };
}
