import { useState, useRef } from "react";
import useFetchFilesFolders from "../helpers/FetchRequests/useFetchFilesFolders";
import useClickOnOutside from "../helpers/useClickOnOutside";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PopUpForm from "./PopUpForm";

export default function DisplayFilesFolders() {
	const [isEditingId, setIsEditingId] = useState(null);
	// const [items, setItems] = useState("")
	const [isEditing, setIsEditing] = useState(false);
	const [y, setY] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	//close popup when user clicks outside popup div
	const ref = useRef();
	useClickOnOutside(ref, () => setIsModalOpen(false));

	const { files, folders } = useFetchFilesFolders();
	const data = (files?.files || []).concat(folders?.folders || []);
	//sort data by id
	const sortedData = data.sort((a, b) => a.id - b.id);

	const handleKeyDown = async (id, event) => {
		// console.log('keydown runs')
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
				const result = await response.json();
				console.log(response, "response");
				console.log(result, "result");
				setIsEditing(!isEditing);
				// setItems(prev => [...prev, result])
				// console.log(items, 'items after update')

				// Optionally update the state or UI here
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
				{sortedData?.map((item) => {
					return (
						<tr key={item.id}>
							{isEditing && isEditingId === item.id ? (
								<input
									onKeyDown={(event) => {
										handleKeyDown(item.id, event);
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
										setY(event.pageY);
									}}
								/>
								{isModalOpen && (
									<div ref={ref}>
										<PopUpForm
											id={item.id}
											isEditing={isEditing}
											setIsEditing={setIsEditing}
											y={y}
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
