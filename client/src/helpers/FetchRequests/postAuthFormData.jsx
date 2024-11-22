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
			throw new Error(
				`HTTP error! status: ${response.status}, message: ${errorBody}`
			);
		}

		const data = await response.json();
		if (data.token) {
			localStorage.setItem("token", data.token);
		}
		return data;
	} catch (error) {
		console.error("Authentication error:", error);
		throw error; // Re-throw the error for the caller to handle
	}
}
