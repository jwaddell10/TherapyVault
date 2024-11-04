import Button from "../helpers/Button/Button.jsx";
import postAuthFormData from "../helpers/FetchRequests/postAuthFormData.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
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
			if (data) {
				sessionStorage.setItem("username", data.username)
				sessionStorage.setItem("sessionID", data.sessionID);
				navigate("/");
			}
		} catch (error) {
			if (error.message === "Failed to fetch") {
				setError("Sever error. Please try again later");
			}
			if (error.message.startsWith("4")) {
				setError("Username taken. Please try another");
			}
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
				{error && <div style={{ color: "red" }}>{error}</div>}
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
		</main>
	);
}
