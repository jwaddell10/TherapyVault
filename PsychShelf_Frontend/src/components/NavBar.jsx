import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
	return (
		<>
			<nav className="navbar">
				<ul>
					<li className="title">
						<Link to="/">TherapyVault</Link>
					</li>
					<li className="nav-link">
						<Link to="/login">Log in</Link>
						<Link to="/signup">Sign up</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
}
