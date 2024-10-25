import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OptionsForm({
	deletedItemId,
	isEditing,
	setIsEditing,
	position,
	onDelete
}) {
	const handleEditing = () => {
		setIsEditing(!isEditing);
	};

	// const handleFolderToDelete = () => {
	// 	console.log('it works in options')
	// }

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
					<DeleteIcon onClick={onDelete} />
					Delete
				</div>
			</section>
		</>
	);
}