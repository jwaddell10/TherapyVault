import { useState } from "react";

export default function UploadForm({ setPopup }) {
	const [formData, setFormData] = useState({
		title: "",
		demographic: "",
		topic: "",
		description: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleClose = () => {
		setPopup(false);
	};

	return (
		<form action="" encType="multipart/form-data" method="post">
			<div className="form-group">
				<div onClick={handleClose}>X</div>
				<label htmlFor="">Title:</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>
				<select name="demographic" id="demographic">
					<option value="child">Child</option>
					<option value="adolescent">Adolescent</option>
					<option value="adult">Adult</option>
				</select>
				<select name="topic" id="topic">
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
				></textarea>
				<input
					type="file"
					className="form-control-file"
					name="uploaded_file"
				/>
			</div>
		</form>
	);
}
