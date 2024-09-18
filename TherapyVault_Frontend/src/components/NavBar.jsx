import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
import "./NavBar.css";

export default function NavBar() {
	const { isLoggedIn } = useContext(LoginContext);
	// console.log(isLoggedIn, 'isloggedin')
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
							{isLoggedIn ? (
								<li>
									<Link to="/login">Log in</Link>
								</li>
							) : (
								<li>
									<Link to="/logout">Log in</Link>
								</li>
							)}
							<li>
								<Link to="/signup">Sign up</Link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
}
