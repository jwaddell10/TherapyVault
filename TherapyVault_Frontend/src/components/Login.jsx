import { useState } from "react";
import Button from "./helpers/Button";
import postFormData from "./helpers/postFormData";

export default function Login() {
	const [formData, setFormData] = useState({
		name: "",
		password: "",
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await postFormData(formData, `/login`);
	}
	return (
		<main>
			<h1 className="title">Log in</h1>
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="">
					Username:
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</label>
				<label htmlFor="">
					Password:
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label>
				<Button type="submit" text="Log in"></Button>
			</form>
		</main>
	);
}
