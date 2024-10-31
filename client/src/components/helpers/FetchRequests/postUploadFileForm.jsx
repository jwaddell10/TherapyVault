export default async function postUploadFileForm(formData, url) {
	console.log("Uploading file to:", url);
	// Log FormData contents (for debugging)
	for (let [key, value] of formData.entries()) {
		console.log(key, value, "key and value");
	}
	try {
		console.log(formData, 'formdata');
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
			method: "POST",
			body: formData,
		});
		if (!response.ok) {
			console.log(response, 'response')
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		// console.log("try keeps running");

		return await response.json();
	} catch (error) {
		console.error("Error in postUploadFileForm:", error);
		throw error;
	}
}
