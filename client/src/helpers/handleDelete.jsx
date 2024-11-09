// import { setRef } from "@mui/material";

export default async function handleDelete(
	item,
	setRefreshTrigger,
	setIsModalOpen,
	deletedItemId
) {

    console.log(item, 'item type')
	// console.log(`${import.meta.env.VITE_API_URL}/${itemType}/${deletedItemId}`, 'url');
	// const choice = window.confirm("Are you sure you want to delete this?");
	// if (!choice) return;
	// try {
	// 	const response = await fetch(
	// 		`${
	// 			import.meta.env.VITE_API_URL
	// 		}/${itemType}/${deletedItemId}/delete`,
	// 		{
	// 			method: "DELETE",
	// 		}
	// 	);
	// 	const data = await response.json();
	// 	console.log(data, "data");
	// 	if (response.ok) {
	// 		setRefreshTrigger((prev) => prev + 1);
	// 		setIsModalOpen(false);
	// 	} else {
	// 		throw new Error("Delete operation failed");
	// 	}
	// } catch (error) {
	// 	console.error("Error deleting folder:", error);
	// }
}
