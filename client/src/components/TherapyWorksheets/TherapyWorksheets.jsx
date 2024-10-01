import SideBar from "../SideBar/SideBar.jsx";
import UploadForm from "../helpers/UploadForm/UploadForm.jsx";
import { useState } from "react";
import "./TherapyWorksheets.css";

export default function TherapyWorksheets() {
	const [popup, setPopup] = useState(false)

	const handleUpload = () => {
		setPopup(true);
	}

	return (
		<section className="page-container">
			<SideBar />
			<main className="main-content">
				<section>
					<header className="worksheets-header">
						<h1>Worksheets</h1>
						<h1 onClick={handleUpload}>Upload File</h1>
						{popup && <UploadForm setPopup={setPopup}></UploadForm>}
					</header>
				</section>
			</main>
		</section>
	);
}
