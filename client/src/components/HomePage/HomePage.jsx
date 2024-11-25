import Button from "../../helpers/Button/Button";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { useContext } from "react";
import { AuthContext } from "../../App";

export default function Home() {
	const authed = useContext(AuthContext);

	return (
		<div className="home-page-container">
			<h1 className="title">Welcome to TherapyVault</h1>
			<p className="instructions">{`Welcome to the virtual Therapy File Cabinet (TherapyVault). 
			I created this as a way to keep track of worksheets, interventions, and scored measures I 
			regularly use in my Therapy practice. To get started, please sign up or log in and 
			create folders or upload files however you please. At this time, only JPG or PDF 
			files are enabled. I plan to add more later!`}</p>
			{authed.authed === true ? (
				<Link to="/therapy-worksheets">
					<Button text="Get Started"></Button>
				</Link>
			) : (
				<Link to="/log-in">
					<Button text="Get Started"></Button>
				</Link>
			)}
			<div className="example-images">
				<img
					src="https://res.cloudinary.com/dak6py2ng/image/upload/v1732564021/Screenshot_2024-11-25_at_1.46.23_PM_kc9u7j.png"
					alt="example image"
				/>
				<img src="https://res.cloudinary.com/dak6py2ng/image/upload/v1732564029/Screenshot_2024-11-25_at_1.46.02_PM_gztwla.png" alt="example image" />
				<img src="https://res.cloudinary.com/dak6py2ng/image/upload/v1732564377/Screenshot_2024-11-25_at_1.52.24_PM_hnpmnl.png" alt="example image" />
			</div>
		</div>
	);
}
