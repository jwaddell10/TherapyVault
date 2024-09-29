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
			return data;
		})
		.catch((error) => {
			throw error;
		});
}
