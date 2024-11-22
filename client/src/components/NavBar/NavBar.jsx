import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../App.jsx";
import "./NavBar.css";

export default function NavBar() {
	const { authed, setAuthed } = useContext(AuthContext);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setAuthed(false);
	};
	return (
		<>
			<nav className="navbar">
				<ul>
					<li className="navbar-title">
						<Link to="/">
							<h1>TherapyVault</h1>
						</Link>
					</li>
					<li className="nav-link">
						<ul className="navbar-routes">
							{!authed ? (
								<div className="no-session-links">
									<StyledLink>
										<LoginIcon sx={{ color: "white" }} />
										<Link to="/log-in">Log in</Link>
									</StyledLink>
									<StyledLink>
										<PersonAddIcon
											sx={{ color: "white" }}
										/>
										<Link to="/sign-up">Sign up</Link>
									</StyledLink>
								</div>
							) : (
								<div className="session-links">
									<StyledLink>
										<HomeIcon sx={{ color: "white" }} />
										<Link to="/">Home</Link>
									</StyledLink>
									<StyledLink>
										<DescriptionIcon
											sx={{ color: "white" }}
										/>
										<Link to="/therapy-worksheets">
											Worksheets
										</Link>
									</StyledLink>
									<StyledLink>
										<LogoutIcon sx={{ color: "white" }} />
										<Link to="/" onClick={handleLogout}>
											Log out
										</Link>
									</StyledLink>
								</div>
							)}
						</ul>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
}

const StyledLink = styled(Link)`
	display: flex;
	align-items: center;
	padding: 5px;
`;
