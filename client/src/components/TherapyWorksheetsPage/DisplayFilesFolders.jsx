import { useState, useRef } from "react";
import useFetchFilesFolders from "../helpers/FetchRequests/useFetchFilesFolders";
import useClickOnOutside from "../helpers/useClickOnOutside";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OptionsForm from "./OptionsForm";

export default function DisplayFilesFolders() {
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingId, setIsEditingId] = useState(null);

	const [itemToDelete, setItemToDelete] = useState("");
	const [deletedItemId, setDeletedItemId] = useState(null);

	const [position, setPosition] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	//close popup when user clicks outside popup div
	const ref = useRef();
	useClickOnOutside(ref, () => setIsModalOpen(false));

	const { files, folders } = useFetchFilesFolders(isEditing);
	const filesAndFoldersSortedById = (files?.files || [])
		.concat(folders?.folders || [])
		.sort((a, b) => a.id - b.id);

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
							<td>&nbsp;</td>
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
