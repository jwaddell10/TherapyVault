import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../helpers/Button/Button";
import postAuthFormData from "../../helpers/FetchRequests/postAuthFormData";
import "./Login.css";
import { AuthContext } from "../../App";

export default function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const { setAuthed } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	}

	const handleDemoLogin = async (event) => {
		event.preventDefault();
		const demoUserData = {
			username: "demouser",
			password: "demouser",
		}
		// Submit the form immediately after setting the demo credentials
		try {
			await postAuthFormData(demoUserData, "/users/log-in").then((data) => {
				if (data.token) {
					localStorage.setItem("token", data.token);
					setAuthed(true);
					navigate("/therapy-worksheets");
				} else setError(data.message);
			});
		} catch (error) {
			setError("Server error. Please try again later.");
			throw new Error(error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await postAuthFormData(formData, "/users/log-in").then((data) => {
				if (data.token) {
					localStorage.setItem("token", data.token);
					setAuthed(true);
					navigate("/therapy-worksheets");
				} else setError(data.message);
			});
		} catch (error) {
			setError("Server error. Please try again later.");
			throw new Error(error);
		}
	};
	return (
		<main>
			<h1 aria-label="log in title" className="title">
				Log in
			</h1>
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="">Username:</label>
				<input
					aria-label="username"
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<label htmlFor="">Password:</label>
				<input
					aria-label="password"
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<Button
					role="button"
					className="button"
					type="submit"
					text="Log in"
				></Button>
				<button
					type="button"
					onClick={handleDemoLogin}
					className="demo-button"
				>
					Log in with Demo Account
				</button>
				{/* <Button
					role="button"
					className="demo-button"
					type="submit"
					text="Log in with Demo Account"
					onClick={handleDemoLogin}
				></Button> */}
				<section>
					Don&apos;t have an account?
					<Link to="/sign-up"> Sign up here</Link>
				</section>
				{error && <h1>{error}</h1>}
			</form>
		</main>
	);
}
