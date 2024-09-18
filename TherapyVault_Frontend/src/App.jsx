import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Signup from "./components/Signup.jsx";

export const LoginContext = createContext(null);

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(null);

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
					<NavBar />
				</LoginContext.Provider>
			),
			// loader: rootLoader,
			children: [
				{
					path: "/",
					element: <HomePage />,
				},
				{
					path: "/login",
					element: (
						<LoginContext.Provider
							value={{ isLoggedIn, setIsLoggedIn }}
						>
							<Login />
						</LoginContext.Provider>
					),
				},
				{
					path: "/logout",
					element: (
						<LoginContext.Provider
							value={{ isLoggedIn, setIsLoggedIn }}
						>
							<Logout />
						</LoginContext.Provider>
					),
				},
				{
					path: "/signup",
					element: <Signup />,
				},
			],
		},
	]);
	return <RouterProvider router={router} />;
}
