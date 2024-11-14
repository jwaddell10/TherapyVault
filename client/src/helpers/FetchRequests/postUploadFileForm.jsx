export default async function postUploadFileForm(formData, url) {
	const username = sessionStorage.getItem("username");
	if (username) {
		formData.append("username", username);
	}
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
			method: "POST",
			body: formData,
		});

		// console.log(response, 'this is response in postupload')
		if (!response.ok) {
			// console.log(response, "response");
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error in postUploadFileForm:", error);
		throw error;
	}
}
