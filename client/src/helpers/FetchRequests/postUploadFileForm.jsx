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

		return await response.json();
	} catch (error) {
		return error;
	}
}
