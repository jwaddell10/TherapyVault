export default async function postUploadFileForm(formData, url) {
	const JWTToken = localStorage.getItem("token");

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
			method: "POST",
			body: formData,
			headers: {
				authorization: `${JWTToken}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error in postUploadFileForm:", error);
		throw error;
	}
}
