export default function Logout() {
	// const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)
	// setIsLoggedIn(false);

	fetch(`${import.meta.env.VITE_API_URL}/log-out`)
		.then((response) => response.json())
		.then((data) => console.log(data, "data"));
}
