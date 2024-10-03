import { useState } from "react";
import CloseIcon from "@rsuite/icons/Close";
import postUploadForm from "../postUploadForm";

export default function UploadForm({ setPopup }) {
	const [formData, setFormData] = useState({
		title: "",
		demographic: "",
		topic: "",
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
		setPopup(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formDataToSend = new FormData();

		Object.keys(formData).forEach((key) => {
			formDataToSend.append(key, formData[key]);
		});

		formDataToSend.append("worksheet", file);

		try {
			await postUploadForm(formDataToSend, "worksheet");
			setPopup(false);
		} catch (error) {
			console.error("Error uploading worksheet:", error);
		}
	};

	return (
		<form
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
				<select
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
				</select>
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
					className="form-control-file"
					name="worksheet"
					required
				/>
			</div>
		</form>
	);
}
