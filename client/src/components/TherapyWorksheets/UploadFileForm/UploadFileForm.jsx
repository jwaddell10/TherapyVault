import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadFileForm from "../../../helpers/FetchRequests/postUploadFileForm";
import "./UploadFileForm.css";

export default function UploadFileForm({
	setRefreshTrigger,
	setPopupUploadForm,
	folderId,
}) {
	const [title, setTitle] = useState(null);
	const [demographic, setDemographic] = useState(null);
	const [description, setDescription] = useState(null);
	const [file, setFile] = useState(null);

	// const [file, setFile] = useState(null);

	// const handleChange = (event) => {
	// 	const { name, value } = event.target;
	// 	setFormData((prevState) => ({ ...prevState, [name]: value }));
	// };

	// const handleFileChange = (event) => {
	// 	setFile(event.target.files[0]);
	// };

	const handleClose = () => {
		setPopupUploadForm(false);
	};

	const upload = async (event) => {
		event.preventDefault();
		const formDataToSend = new FormData();
		formDataToSend.append("worksheet", file);
		formDataToSend.append("title", title);
		formDataToSend.append("demographic", demographic);
		formDataToSend.append("description", description);
		formDataToSend.append("folderId", folderId);
		formDataToSend.append("sessionID", localStorage.getItem("sessionID"));

		for (let [key, value] of formDataToSend.entries()) {
			console.log(key, value, "key and value");
		}

		try {
			await postUploadFileForm(formDataToSend, "worksheet");
			setPopupUploadForm(false);
			setRefreshTrigger((prevTrigger) => prevTrigger + 1);
		} catch (error) {
			console.error("Error uploading worksheet:", error);
		}
	};

	return (
		<div className="upload-form">
			<div className="form-group">
				<div onClick={handleClose}>
					<CloseIcon />
				</div>
				<input
					type="text"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					required
				/>
				{/* <select
					type="text"
					onChange={(e) => {
						setDemographic(e.target.value);
					}}
					required
				>
					<option value=""></option>
					<option value="child">Child</option>
					<option value="adolescent">Adolescent</option>
					<option value="adult">Adult</option>
				</select> */}
				<input
					type="text"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
				<input
					className="file-input"
					onChange={(e) => {
						setFile(e.target.files[0]);
					}}
					type="file"
					required
				/>
				<button onClick={upload}>Submit</button>
			</div>
		</div>
	);
}
