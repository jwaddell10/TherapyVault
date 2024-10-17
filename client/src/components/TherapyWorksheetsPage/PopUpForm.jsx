import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PopUpForm({ isEditing, setIsEditing, y }) {
    const handleEditing = () => {
        setIsEditing(!isEditing)
    }
	return (
		<>
			<section
				style={{
                    display: "flex",
                    flexDirection: "column",
					position: "absolute",
					top: `${y}px`,
					height: "2rem",
					width: "20rem",
					border: "1px solid black",
				}}
				type="text"
			>
				<div>
					<EditIcon onClick={handleEditing} />
					{isEditing ? "Save" : "Edit"}
					<DeleteIcon />
					Delete
				</div>
			</section>
		</>
	);
}
