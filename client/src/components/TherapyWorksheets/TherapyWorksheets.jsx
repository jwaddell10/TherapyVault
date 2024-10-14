import SideBar from "../SideBar/SideBar.jsx";
import UploadForm from "../helpers/UploadForm/UploadForm.jsx";
import CreateFolder from "../helpers/CreateFolder.jsx";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DisplayFilesFolders from "./DisplayFilesFolders.jsx";
import "./TherapyWorksheets.css";

export default function TherapyWorksheets() {
	//display folders, need to fetch folders from database, display them to user
	//dont want folder and file component, because they'd be out of order
	//could do const data = fetchData, then data.map in this component, maybe useffect?
	const [popupUploadForm, setPopupUploadForm] = useState(false);
	const [popupFolderForm, setPopupFolderForm] = useState(false);
	const handleUploadFile = () => {
		setPopupUploadForm(true);
	};

	const handleUploadFolder = () => {
		setPopupFolderForm(true);
	};

	return (
		<section className="page-container">
			<SideBar />
			<main className="main-content">
				<section className="header-container">
					<header className="worksheets-header">
						<h1>Worksheets</h1>
						<div className="upload-container">
							<h1 onClick={handleUploadFolder}>
								<DriveFolderUploadIcon />
								Upload Folder
							</h1>
							<h1 onClick={handleUploadFile}>
								<UploadFileIcon /> Upload File
							</h1>
						</div>
						{popupFolderForm && (
							<>
								<div className="background"></div>
								<CreateFolder
									setPopupFolderForm={setPopupFolderForm}
								></CreateFolder>
							</>
						)}
						{popupUploadForm && (
							<>
								<div className="background"></div>
								<UploadForm
									setPopupUploadForm={setPopupUploadForm}
								></UploadForm>
							</>
						)}
					</header>
				</section>
				<section className="worksheet-container">
					<DisplayFilesFolders />
				</section>
			</main>
		</section>
	);
}
