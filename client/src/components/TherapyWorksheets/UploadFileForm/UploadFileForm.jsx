import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadFileForm from "../../../helpers/FetchRequests/postUploadFileForm";
import "./UploadFileForm.css";
import Button from "../../../helpers/Button/Button";

export default function UploadFileForm({
	folderId,
	setRefreshTrigger,
	setPopupUploadForm,
}) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState(null);
	const [title, setTitle] = useState(null);
	const [file, setFile] = useState(null);

	const handleClose = () => {
		setPopupUploadForm(false);
	};

	const upload = async (event) => {
		event.preventDefault();
		setIsDisabled(true);
		const formDataToSend = new FormData();
		formDataToSend.append("worksheet", file);
		formDataToSend.append("title", title);
		formDataToSend.append("folderId", folderId);

		try {
			const response = await postUploadFileForm(
				formDataToSend,
				"worksheet"
			);

			if (!response.ok) {
				setError(response.message);
			}
			setPopupUploadForm(false);
			setRefreshTrigger((prevState) => prevState + 1);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<form className="file-form" onSubmit={upload}>
			<div className="form-header">
				<label htmlFor="name">File Name:</label>
				<div onClick={handleClose}>
					<CloseIcon />
				</div>
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
			<Button
				disabled={isDisabled}
				className="button"
				text="Submit"
				style={{ width: "8rem" }}
				onClick={upload}
			></Button>
			{error && <div style={{ color: "black" }}>{error}</div>}
		</form>
	);
}
