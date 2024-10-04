import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../helpers/Button/Button";
import postFormData from "../helpers/postFormData";
import "./Login.css";

export default function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		await postFormData(formData, "/log-in").then((data) => {
			if (data) {
				sessionStorage.setItem("sessionID", data.sessionID);
				navigate("/");
			}
		});
	};
	return (
		<main>
			<h1 className="title">Log in</h1>
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="">Username:</label>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<label htmlFor="">Password:</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<Button className="login-button" type="submit" text="Log in"></Button>
				<section>
					Don&apos;t have an account?
					<Link to="/sign-up"> Sign up here</Link>
				</section>
			</form>
		</main>
	);
}
