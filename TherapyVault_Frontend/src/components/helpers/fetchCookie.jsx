export default async function fetchCookie() {
	return fetch(`${import.meta.env.VITE_API_URL}`).then((response) =>
		response.json().then((data) => data)
	);
}
