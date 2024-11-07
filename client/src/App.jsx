import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import TherapyWorksheets from "./components/TherapyWorksheets/TherapyWorksheets.jsx";
import DisplayFile from "./components/DisplayFile.jsx";
import DisplayFolder from "./components/TherapyWorksheets/DisplayFolder.jsx";
import { useState } from "react";

export default function App() {
	// sessionStorage.clear();
	const [username, setUserName] = useState(null)
	const router = createBrowserRouter([
		{
			path: "/",
			element: <NavBar />,
			// loader: rootLoader,
			children: [
				{
					path: "/",
					element: <HomePage />,
				},
				{
					path: "/therapy-worksheets",
					element: <TherapyWorksheets username={username}/>,
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
					element: <Login setUserName={setUserName}/>,
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
