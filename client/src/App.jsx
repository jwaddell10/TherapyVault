import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup.jsx";
import TherapyWorksheets from "./components/TherapyWorksheets/TherapyWorksheets.jsx";

export default function App() {
	sessionStorage.clear();
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
					element: <TherapyWorksheets />
				},
				{
					path: "/log-in",
					element: <Login />,
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
