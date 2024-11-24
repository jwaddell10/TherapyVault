import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadFileForm from "../../../helpers/FetchRequests/postUploadFileForm";
import "./UploadFileForm.css";

export default function UploadFileForm({
	folderId,
	setRefreshTrigger,
	setPopupUploadForm,
}) {
	const [title, setTitle] = useState(null);
	const [file, setFile] = useState(null);

	const handleClose = () => {
		setPopupUploadForm(false);
	};

	const upload = async (event) => {
		event.preventDefault();
		const formDataToSend = new FormData();
		formDataToSend.append("worksheet", file);
		formDataToSend.append("title", title);
		formDataToSend.append("folderId", folderId);

		try {
			const response = await postUploadFileForm(
				formDataToSend,
				"worksheet"
			);
			if (response) {
				setPopupUploadForm(false);
				setRefreshTrigger((prevTrigger) => prevTrigger + 1);
			}
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
