import { jwtDecode } from "jwt-decode";

export default function checkJWT(token) {
	const { exp } = jwtDecode(token);

	const expirationTimeInMillis = exp * 1000;
	const currentTimeInMillis = Date.now();

	const isExpired = currentTimeInMillis >= expirationTimeInMillis * 1000;
	return isExpired;
}
