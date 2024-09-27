export default async function postFormData(formData, url) {
	const { username, password, confirmPassword } = formData;

	return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
		method: "POST",
		body: JSON.stringify({
			username,
			password,
			confirmPassword,
		}),
		headers: { "Content-type": "application/json" },
	})
		.then((response) => {
			if (!response.ok) throw new Error(response.status);
			return response.json();
		})
		.then((data) => {
			console.log("Data received:", data);
			return data; // Return the data for further processing if needed
		})
		.catch((error) => {
			console.log("Error:", error);
			throw error; // Re-throw the error for the caller to handle
		});
}
