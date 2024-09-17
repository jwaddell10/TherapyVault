export default async function postFormData(formData, url) {
	const { username, password, confirmPassword } = formData;

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
				confirmPassword,
			}),
			headers: { "Content-type": "application/json" },
		});

		return response.json();
	} catch (error) {
		console.log(error, "error");
	}
}
