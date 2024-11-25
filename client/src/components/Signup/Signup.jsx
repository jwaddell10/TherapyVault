import Button from "../../helpers/Button/Button.jsx";
import postAuthFormData from "../../helpers/FetchRequests/postAuthFormData.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [usernameError, setUsernameError] = useState(null);
	const [error, setError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const navigate = useNavigate();

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		setPasswordError("");

		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords must match");
			return;
		}

		try {
			const data = await postAuthFormData(formData, "/users/sign-up");
			if (data.token) {
				navigate("/");
			} else setError("An error has occurred. Try again later")
		} catch (error) {
			if (error.message.startsWith("4")) {
				setUsernameError("Username taken. Please try another");
			} else setError("An error has occurred. Try again later");
			return error;
		}
	}

	return (
		<main className="signup">
			<h1 className="title">Sign Up</h1>
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="">Username:</label>
				<input
					name="username"
					type="text"
					value={formData.username}
					onChange={handleChange}
					required
				/>
				{usernameError && (
					<div style={{ color: "red" }}>{usernameError}</div>
				)}
				<label htmlFor="">Password:</label>{" "}
				<input
					name="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				{passwordError && (
					<div style={{ color: "red" }}>{passwordError}</div>
				)}
				<label htmlFor="">Confirm Password:</label>{" "}
				<input
					name="confirmPassword"
					type="password"
					value={formData.confirmPassword}
					onChange={handleChange}
					required
				/>
				{passwordError && (
					<div style={{ color: "red" }}>{passwordError}</div>
				)}
				<Button type="submit" text="Sign up"></Button>
			</form>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</main>
	);
}
