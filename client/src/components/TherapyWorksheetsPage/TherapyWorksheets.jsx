import UploadForm from "../helpers/UploadForm/UploadFileForm.jsx";
import CreateFolder from "../helpers/CreateFolder.jsx";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DisplayFilesFolders from "./DisplayFilesFolders.jsx";
import { Link } from "react-router-dom";
import "./TherapyWorksheets.css";

export default function TherapyWorksheets() {
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
			{/* <SideBar /> */}
			<main className="main-content">
				<section className="header-container">
					<header className="worksheets-header">
						<h1>Worksheets</h1>
						<div className="upload-container">
							<Link
								role="uploadfolder"
								className="upload-link"
								onClick={handleUploadFolder}
							>
								<DriveFolderUploadIcon /> Upload Folder
							</Link>
							<Link
								className="upload-link"
								onClick={handleUploadFile}
							>
								<UploadFileIcon /> Upload File
							</Link>
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
								<Link></Link>
								<UploadForm
									setPopupUploadForm={setPopupUploadForm}
								></UploadForm>
							</>
						)}
					</header>
				</section>
				<DisplayFilesFolders />
			</main>
		</section>
	);
}
