export default async function postUploadFileForm(formData, url) {
	const JWTToken = localStorage.getItem("token");
	// console.log(JWTToken, 'jwt token')
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
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
