import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OptionsForm({
	deletedItemId,
	isEditing,
	setIsEditing,
	position,
}) {
	const handleEditing = () => {
		setIsEditing(!isEditing);
	};

	const handleDelete = async () => {
		try {
			await fetch(
				`${
					import.meta.env.VITE_API_URL
				}/folder/${deletedItemId}/delete`,
				{
					method: "DELETE",
				}
			)
				.then((response) => response.json())
				.then((data) => console.log(data, "data"));
		} catch (error) {
			throw new Error(error);
		}
	};
	return (
		<>
			<section
				style={{
					display: "flex",
					flexDirection: "column",
					position: "absolute",
					top: `${position}px`,
					height: "2rem",
					width: "20rem",
					border: "1px solid black",
				}}
				type="text"
			>
				<div>
					<EditIcon onClick={handleEditing} />
					{isEditing ? "Save" : "Edit"}
					<DeleteIcon onClick={handleDelete} />
					Delete
				</div>
			</section>
		</>
	);
}
