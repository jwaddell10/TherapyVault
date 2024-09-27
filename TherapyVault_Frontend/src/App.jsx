import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
// import fetchCookie from "./components/helpers/fetchCookie.jsx";

export default function App() {
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
