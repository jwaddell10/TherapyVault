import Button from "../helpers/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/log-in")
	}
	return (
		<div className="home-page-container">
			<div className="title">TherapyVault</div>
			<div className="instructions">{`These are the instructions. I'm writing them here`}</div>
			<Button text="Get Started" onClick={handleClick}></Button>
		</div>
	);
}
