import { useState, useRef } from "react";
import useClickOnOutside from "../helpers/useClickOnOutside";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OptionsForm from "./OptionsForm";

export default function DisplayFilesFolders({
	filesAndFoldersSortedById,
	setRefreshTrigger,
	isEditing,
	setIsEditing,
}) {
	const [isEditingId, setIsEditingId] = useState(null);

	const [itemToDelete, setItemToDelete] = useState("");
	const [deletedItemId, setDeletedItemId] = useState(null);

	const [position, setPosition] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	//close popup when user clicks outside popup div
	const ref = useRef();
	useClickOnOutside(ref, () => setIsModalOpen(false));

	const handleFolderNameChange = async (id, event) => {
		if (event.key === "Enter") {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/folder/${id}/update`,
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
				setIsEditing(!isEditing);
			} catch (error) {
				console.error(
					"There was a problem with the PUT request:",
					error
				);
			}
		}
	};

	const handleFolderDelete = async () => {
		const choice = window.confirm("Are you sure you want to delete this?");
		if (!choice) return;
		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/folder/${deletedItemId}/delete`,
				{
					method: "DELETE",
				}
			);
			const data = await response.json();
			console.log(data, "data");
			if (response.ok) {
				setRefreshTrigger((prev) => prev + 1);
				setIsModalOpen(false);
			} else {
				throw new Error("Delete operation failed");
			}
		} catch (error) {
			console.error("Error deleting folder:", error);
		}
	};

	const formatDate = (date) => {
		const newDate = new Date(date);
		const options = { month: "long", day: "numeric", year: "numeric" };
		return newDate.toLocaleDateString("en-US", options);
	};

	return (
		<table style={{ width: "-webkit-fill-available" }}>
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Size</th>
					<th scope="col">Created</th>
					<th scope="col">Last Updated</th>
					<th scope="col">Options</th>
				</tr>
			</thead>
			<tbody>
				{filesAndFoldersSortedById?.map((item) => {
					return (
						<tr key={item.id}>
							{isEditing && isEditingId === item.id ? (
								<input
									onKeyDown={(event) => {
										handleFolderNameChange(item.id, event);
									}}
								/>
							) : (
								<td>{item.title}</td>
							)}
							<td>&nbsp;</td>
							<td>{formatDate(item.createdAt)}</td>
							<td>&nbsp;</td>
							<td>
								<MoreHorizIcon
									onClick={(event) => {
										setIsEditingId(item.id);
										setIsModalOpen(true);
										setDeletedItemId(item.id);
										setPosition(event.pageY);
									}}
								/>
								{isModalOpen && (
									<div ref={ref}>
										<OptionsForm
											onDelete={handleFolderDelete}
											deletedItemId={deletedItemId}
											isEditing={isEditing}
											setIsEditing={setIsEditing}
											itemToDelete={itemToDelete}
											setItemToDelete={setItemToDelete}
											position={position}
										/>
									</div>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
