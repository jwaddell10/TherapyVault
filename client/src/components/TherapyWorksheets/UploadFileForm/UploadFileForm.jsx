import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadForm from "../../helpers/FetchRequests/postUploadForm";
import "./UploadFileForm.css";

export default function UploadForm({ setPopupUploadForm }) {
	const [formData, setFormData] = useState({
		title: "",
		demographic: "",
		description: "",
	});
	const [file, setFile] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleClose = () => {
		setPopupUploadForm(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formDataToSend = new FormData();
		console.log(formData, "formdata");
		for (const key in formData) {
			formDataToSend.append(key, formData[key]);
			// console.log(Object.fromEntries(formDataToSend.entries()));
		}
		//need to append each item in formdata
		if (file) {
			console.log(file, 'file')
			formDataToSend.append("worksheet", file);
		}

		// for (const pair of formDataToSend.entries()) {
		// 	console.log(pair, 'pair in formdatatosend')
		// }

		try {
			console.log(formDataToSend.entries(), 'sent data')
			await postUploadForm(formDataToSend, "worksheet");
			setPopupUploadForm(false);
		} catch (error) {
			console.error("Error uploading worksheet:", error);
		}
	};

	return (
		<form
			className="upload-form"
			onSubmit={handleSubmit}
			encType="multipart/form-data"
			method="post"
		>
			<div className="form-group">
				<div onClick={handleClose}>
					<CloseIcon />
				</div>
				<label htmlFor="">Title:</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
				/>
				<select
					name="demographic"
					id="demographic"
					onChange={handleChange}
					required
				>
					<option value="">Select Demographic</option>
					<option value="child">Child</option>
					<option value="adolescent">Adolescent</option>
					<option value="adult">Adult</option>
				</select>
				{/* <select
					name="topic"
					id="topic"
					onChange={handleChange}
					required
				>
					<option value="">Select Option</option>
					<option value="ADHD">ADHD</option>
					<option value="Anger">Anger</option>
					<option value="Anxiety">Anxiety</option>
					<option value="CBT">CBT</option>
					<option value="Coping Skills">Coping Skills</option>
					<option value="Communication">Communication</option>
					<option value="DBT">DBT</option>
					<option value="Depression">Depression</option>
					<option value="Grief">Grief</option>
					<option value="Mindfulness">Mindfulness</option>
					<option value="Other">Other</option>
					<option value="Parenting">Parenting</option>
					<option value="Self-esteem">Self-esteem</option>
					<option value="Social Skills">Social Skills</option>
					<option value="Stress">Stress</option>
				</select> */}
				<textarea
					name="description"
					id="description"
					placeholder="optional, intervention description"
					onChange={handleChange}
				></textarea>
				<input
					onChange={(event) => {
						handleFileChange(event);
					}}
					type="file"
					// accept="image/*"
					className="form-control-file"
					name="worksheet"
					required
				/>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</form>
	);
}
