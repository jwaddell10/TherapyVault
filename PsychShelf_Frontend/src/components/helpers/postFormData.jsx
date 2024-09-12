export const postFormData = async (formData) => {
	const { name, password, confirmPassword } = formData;

	const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
		method: "POST",
		body: JSON.stringify({
			name,
			password,
			confirmPassword,
		}),
		headers: { "Content-type": "application/json" },
	});

    const data = await response.json()
    console.log(data, 'data')
};
