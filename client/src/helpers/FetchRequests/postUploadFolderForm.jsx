export default async function postUploadFolderForm(formData, folderId, url) {
	const JWTToken = localStorage.getItem("token");
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
			method: "POST",
			body: JSON.stringify({
				formData,
				folderId,
			}),
			headers: {
				"Content-type": "application/json",
				authorization: `${JWTToken}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error in postUploadForm:", error);
		throw error;
	}
}
