import { createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";

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
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
]);

export default router; 
