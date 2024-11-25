import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OptionsForm({
	isEditing,
	setIsEditing,
	position,
	onDelete,
}) {
	const handleEditing = () => {
		setIsEditing(!isEditing);
	};

	return (
		<>
			<section
				style={{
					display: "flex",
					flexDirection: "column",
					position: "absolute",
					top: `${position}px`,
					width: "10rem",
					boxShadow: "1px 1px lightgray",
					backgroundColor: "whitesmoke"
				}}
				type="text"
			>
				<div>
					<div className="edit">
						<EditIcon onClick={handleEditing} />
						{isEditing ? "Save" : "Edit"}
					</div>
					<div className="delete">
						<DeleteIcon onClick={onDelete} />
						Delete
					</div>
				</div>
			</section>
		</>
	);
}
