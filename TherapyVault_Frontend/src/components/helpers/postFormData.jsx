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
		.then((response) => response.json()).then((data) => data)
		.catch((error) => {
			throw new Error(error);
		});

	// try {
	// 	const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
	// 		method: "POST",
	// 		body: JSON.stringify({
	// 			username,
	// 			password,
	// 			confirmPassword,
	// 		}),
	// 		headers: { "Content-type": "application/json" },
	// 	});

	// 	return response.json();
	// } catch (error) {
	// 	console.log(error, "error");
	// }
}
