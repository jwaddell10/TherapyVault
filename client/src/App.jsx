import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import TherapyWorksheets from "./components/TherapyWorksheets/TherapyWorksheets.jsx";
import DisplayFile from "./components/DisplayFile.jsx";
import DisplayFolder from "./components/TherapyWorksheets/DisplayFolder.jsx";
import { useState, createContext } from "react";
// import fetchUsers from "./helpers/FetchRequests/fetchUsers.jsx";
// import { locals } from "../../server/app.js";

export const AuthContext = createContext(false);

export default function App() {
	const [authed, setAuthed] = useState(false);
	// localStorage.clear();
	// const users = fetchUsers()
	// console.log(users, 'users')

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
					element: <HomePage />,
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
