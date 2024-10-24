export default async function postUploadForm(formData, url) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
			method: "POST",
			body: JSON.stringify(formData),
			headers: { "Content-type": "application/json" },
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
