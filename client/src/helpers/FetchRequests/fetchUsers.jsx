export default async function fetchUsers() {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/users`
		)
        // console.log(response, 'response from fetch users')
        const data = await response.json();
        // console.log(data, 'data from fetchusers')
	} catch (error) {
		console.log(error, "error");
	}
}
