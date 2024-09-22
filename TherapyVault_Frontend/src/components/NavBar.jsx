import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
import "./NavBar.css";

export default function NavBar() {

	const { isLoggedIn } = useContext(LoginContext);
	console.log(isLoggedIn, "navaariss");
	const handleLogout = async () => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/log-out`, {
			method: "POST",
		})
		const data = await response.json()
		console.log(data, 'data')
	};
	return (
		<>
			<nav className="navbar">
				<ul>
					<li className="title">
						<Link to="/">
							<h1>TherapyVault</h1>
						</Link>
					</li>
					<li className="nav-link">
						<ul>
							{!isLoggedIn ? (
								<li>
									<Link to="/log-in">Log in</Link>
								</li>
							) : (
								<li>
									<Link to="/log-out" onClick={handleLogout}>
										Log out
									</Link>
								</li>
							)}
							<li>
								<Link to="/sign-up">Sign up</Link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
}
