import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadFolderForm from "../../helpers/FetchRequests/postUploadFolderForm";
import "./CreateFolder.css";

export default function CreateFolder({
	files,
	setFiles,
	setPopupFolderForm,
	setRefreshTrigger,
}) {
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
		// console.log('submit runs')
		event.preventDefault();
		try {
			const response = await postUploadFolderForm(formData, "folder");
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
			<div onClick={handleClose}>
				<CloseIcon />
			</div>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
			/>
		</form>
	);
}
