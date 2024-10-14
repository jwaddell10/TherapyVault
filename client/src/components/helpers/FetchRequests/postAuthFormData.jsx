export default async function postAuthFormData(formData, url) {
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

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(errorBody);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error);
	}
}
