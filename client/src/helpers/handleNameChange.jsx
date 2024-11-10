export default async function handleNameChange(id, type, event) {
    console.log('handle namechange runs')
	if (event.key === "Enter") {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/${type}/${id}/update`,
				{
					method: "PUT",
					body: JSON.stringify({ title: event.target.value }),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response;
		} catch (error) {
			console.error("There was a problem with the PUT request:", error);
		}
	}
}
