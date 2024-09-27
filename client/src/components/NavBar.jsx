import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
	// const { setIsLoggedIn } = useContext(LoginContext);
	const session = sessionStorage.getItem("sessionID")
	const navigate = useNavigate()

	const handleLogout = async () => {
		const sessionID = sessionStorage.getItem("sessionID");

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/log-out`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: sessionID,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			if (data) {
				sessionStorage.removeItem("sessionID");
				navigate("/")
			}
			
		} catch (error) {
			console.error("Logout failed:", error);
		}
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
							{!session ? (
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
