import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./helpers/Button";
import postFormData from "./helpers/postFormData";

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
                sessionStorage.setItem("sessionID", data.sessionID)
				navigate("/");
			}
		});
	};
	return (
		<main>
			<h1 className="title">Log in</h1>
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="">
					Username:
					<input
						type="text"
						name="username"
						value={formData.username}
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
