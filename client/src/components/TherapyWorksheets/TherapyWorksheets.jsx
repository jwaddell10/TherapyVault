import SideBar from "../SideBar/SideBar.jsx";
import "./TherapyWorksheets.css";

export default function TherapyWorksheets() {
	return (
		<section className="page-container">
			<SideBar />
			<main className="main-content">
				<section>
					<header className="worksheets-header">
						<h1>Worksheets</h1>
						<h1>Upload File</h1>
					</header>
				</section>
			</main>
		</section>
	);
}
