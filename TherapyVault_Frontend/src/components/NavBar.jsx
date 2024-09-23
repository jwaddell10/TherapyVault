import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
import "./NavBar.css";

export default function NavBar() {
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	
	const handleLogout = async () => {
	fetch(`${import.meta.env.VITE_API_URL}/log-out`, {
		method: "POST",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data, "data");
			setIsLoggedIn(false);
		});
	}
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
									<Link onClick={handleLogout}>Log out</Link>
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
