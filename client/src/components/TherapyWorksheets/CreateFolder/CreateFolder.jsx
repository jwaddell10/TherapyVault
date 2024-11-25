import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadFolderForm from "../../../helpers/FetchRequests/postUploadFolderForm";
import "./CreateFolder.css";
import Button from "../../../helpers/Button/Button";

export default function CreateFolder({
	folderId,
	setRefreshTrigger,
	setPopupFolderForm
}) {
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleClose = () => {
		setPopupFolderForm(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await postUploadFolderForm(
				formData,
				folderId,
				"folder"
			);
			if (response) {
				setPopupFolderForm(false);
				setRefreshTrigger((prevState) => prevState + 1);
			}
		} catch (error) {
			console.log(error, "error");
		}
	};
	return (
		<form className="folder-form" onSubmit={handleSubmit}>
			{error}
			<div className="form-header">
				<label htmlFor="name">Folder Name:</label>
				<div onClick={handleClose}>
					<CloseIcon />
				</div>
			</div>
			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
			/>
			<Button
				style={{ width: "8rem", left: 0 }}
				text="Submit"
				onClick={handleSubmit}
			>
				Submit
			</Button>
		</form>
	);
}
