import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import TherapyWorksheets from "./components/TherapyWorksheets/TherapyWorksheets.jsx";
import DisplayFile from "./components/DisplayFile.jsx";
import DisplayFolder from "./components/TherapyWorksheets/DisplayFolder.jsx";
import { useState, createContext, useEffect } from "react";
import checkJWT from "./helpers/checkJWT.jsx";

export const AuthContext = createContext(false);

export default function App() {
	const [authed, setAuthed] = useState(false);

	//check if JWT token has expired, if expired remove it

	useEffect(() => {
		const JWTToken = localStorage.getItem("token");

		if (JWTToken) {
			if (checkJWT(JWTToken) === false) {
				// Token is valid
				setAuthed(true);
			} else if (checkJWT(JWTToken) === true) {
				localStorage.removeItem("token");
				setAuthed(false);
			}
		} else {
			// No token found
			setAuthed(false);
		}
	}, []);

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<AuthContext.Provider value={{ authed, setAuthed }}>
					<NavBar />
				</AuthContext.Provider>
			),

			// loader: rootLoader,
			children: [
				{
					path: "/",
					element: (
						<AuthContext.Provider value={{ authed }}>
							<HomePage />
						</AuthContext.Provider>
					),
				},
				{
					path: "/therapy-worksheets",
					element: <TherapyWorksheets />,
				},
				{
					path: "/therapy-worksheets/worksheet/:worksheetId",
					element: <DisplayFile />,
				},
				{
					path: "/therapy-worksheets/folder/:folderId",
					element: <DisplayFolder />,
				},
				{
					path: "/log-in",
					element: (
						<AuthContext.Provider value={{ authed, setAuthed }}>
							<Login />
						</AuthContext.Provider>
					),
				},
				{
					path: "/sign-up",
					element: <Signup />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}
