export default async function handleDelete(
	itemType,
	setRefreshTrigger,
	deletedItemId,
	setIsModalOpen
) {
	console.log('jwttoken')

	const JWTToken = localStorage.getItem("token");
	console.log(JWTToken, 'jwttoken')
	const choice = window.confirm("Are you sure you want to delete this?");
	if (!choice) return;
	const headers = new Headers()
	headers.set('Authorization', `${JWTToken}`)
	try {
		const response = await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/${itemType}/${deletedItemId}/delete`,
			{
				method: "DELETE",
				headers: headers,
			}
		);

		if (response.ok) {
			const data = await response.json();
			console.log(data, "data");
			setRefreshTrigger((prev) => prev + 1);
			setIsModalOpen(false);
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || "Delete operation failed");
		}
	} catch (error) {
		console.error(`Error deleting ${itemType}:`, error.message);
		// Here you might want to show an error message to the user
	}
}
