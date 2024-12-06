import { useState, useRef } from "react";
import useClickOnOutside from "../../helpers/useClickOnOutside";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OptionsForm from "./OptionsForm";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DisplayAllFilesFolders({
	filesAndFoldersSortedById,
	setRefreshTrigger,
	isEditing,
	setIsEditing,
}) {
	const navigate = useNavigate();
	const [isEditingId, setIsEditingId] = useState(null);

	const [itemToDelete, setItemToDelete] = useState({ id: null, type: null });
	const [position, setPosition] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	//close popup when user clicks outside popup div
	const ref = useRef();
	useClickOnOutside(ref, () => setIsModalOpen(false));

	const handleClick = async (id, itemType) => {
		navigate(`/therapy-worksheets/${itemType}/${id}`);
	};

	const handleNameChange = async (id, type, event) => {
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
				setIsEditing(!isEditing);
				setRefreshTrigger((prevState) => prevState + 1)
			} catch (error) {
				console.error(
					"There was a problem with the PUT request:",
					error
				);
			}
		}
	};

	const handleDelete = async () => {
		const { id, type } = itemToDelete;
		const JWTToken = localStorage.getItem('token')
		const headers = new Headers()
		headers.set('Authorization', `${JWTToken}`)
		console.log(type, "type in itemtodelete");
		const choice = window.confirm("Are you sure you want to delete this?");
		if (!choice) return;
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/${type}/${id}/delete`,
				{
					method: "DELETE",
					headers: headers,
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
										handleNameChange(
											item.id,
											item.type,
											event
										);
									}}
								/>
							) : (
								<td>
									{item.type === "folder" ? (
										<>
											<FolderIcon />
											<Link
												onClick={() => {
													handleClick(
														item.id,
														item.type
													);
												}}
											>
												{item.title}
											</Link>
										</>
									) : (
										<>
											<DescriptionIcon />
											<Link
												onClick={() => {
													handleClick(
														item.id,
														"worksheet"
													);
												}}
											>
												{item.title}
											</Link>
										</>
									)}
								</td>
							)}
							<td>&nbsp;</td>
							<td>{formatDate(item.createdAt)}</td>
							<td>&nbsp;</td>
							<td>
								<MoreHorizIcon
									onClick={(event) => {
										setIsEditingId(item.id);
										setIsModalOpen(true);
										setItemToDelete({
											id: item.id,
											type: item.type,
										});
										setPosition(event.pageY);
									}}
								/>
								{isModalOpen && (
									<div ref={ref}>
										<OptionsForm
											isEditing={isEditing}
											setIsEditing={setIsEditing}
											position={position}
											onDelete={() => {
												handleDelete(item.type);
											}}
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
