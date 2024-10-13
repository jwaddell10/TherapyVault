export default async function postAuthFormData(formData, url) {
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
			console.log('post form runs')

			if (!response.ok) throw new Error(response.status);
			return response.json();
		})
		.then((data) => {
			console.log('post form runs data')

			return data;
		})
		.catch((error) => {
			throw error;
		});
}
