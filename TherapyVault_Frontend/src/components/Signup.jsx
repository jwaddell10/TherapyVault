import Button from "./helpers/Button";
import postFormData from "./helpers/postFormData.jsx";
import { useState } from "react";

export default function Signup() {
	const [formData, setFormData] = useState({
		name: "",
		password: "",
		confirmPassword: "",
	});
	const [inputError, setInputError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		console.log(
			formData.name,
			"name",
			formData.password,
			"password",
			formData.confirmPassword,
			"confirmpassword"
		);
		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords must match");
		}

		await postFormData(formData, `/signup`);
	}

	return (
		<main className="signup">
			<h1 className="title">Sign Up</h1>
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="">
					Username:
					<input
						name="name"
						type="text"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</label>
				{inputError && <div style={{ color: "red" }}>{inputError}</div>}

				<label htmlFor="">
					Password:
					<input
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label>
				{passwordError && (
					<div style={{ color: "red" }}>{passwordError}</div>
				)}

				<label htmlFor="">
					Confirm Password:
					<input
						name="confirmPassword"
						type="password"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</label>
				{passwordError && (
					<div style={{ color: "red" }}>{passwordError}</div>
				)}

				<Button type="submit" text="Sign up"></Button>
			</form>
		</main>
	);
}
