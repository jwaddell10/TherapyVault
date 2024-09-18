import { useState } from "react";
import Button from "./helpers/Button";
import postFormData from "./helpers/postFormData";

export default function Login() {
	const [data, setData] = useState(null);
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
		await postFormData(formData, "/login").then((data) => {
			setData(data)
            //make it so it navigates to home, and change navbar to logout
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
