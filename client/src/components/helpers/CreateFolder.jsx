import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadForm from "./FetchRequests/postUploadForm";
import "./CreateFolder.css";

export default function CreateFolder({ setPopupFolderForm }) {
	const [formData, setFormData] = useState({
		name: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log(name, "name", value, "value");
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleClose = () => {
		setPopupFolderForm(false);
	};

	const handleSubmit = async (event) => {
		// setPopupFolderForm(true)
		event.preventDefault();
		setPopupFolderForm(false);
		try {
			await postUploadForm(formData, "folder");
		} catch (error) {
			console.log(error, "error");
		}
		// const {name, value}
		// setFormData((prevState) => {( ...prevState, [name]: value)})
	};
	return (
		<form className="folder-form" onSubmit={handleSubmit}>
			<div onClick={handleClose}>
				<CloseIcon />
			</div>
			<label htmlFor="">Name:</label>
			<input
				type="text"
				name="name"
				value={formData.name}
				onChange={handleChange}
			/>
		</form>
	);
}
