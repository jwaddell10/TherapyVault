export default async function postFormData(formData, url) {
	const { name, password, confirmPassword } = formData;

	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
			method: "POST",
			body: JSON.stringify({
				name,
				password,
				confirmPassword,
			}),
			headers: { "Content-type": "application/json" },
		});

		const data = await response.json();
		console.log(data, 'data postform')
		return data;
	} catch (error) {
		console.log(error, "error");
	}
}
