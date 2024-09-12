import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
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
							<li>
								<Link to="/login">Log in</Link>
							</li>
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
