import UploadForm from "../helpers/UploadForm/UploadFileForm.jsx";
import CreateFolder from "../helpers/CreateFolder.jsx";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DisplayFilesFolders from "./DisplayFilesFolders.jsx";
import { Link } from "react-router-dom";
import "./TherapyWorksheets.css";
import useFetchFilesFolders from "../helpers/FetchRequests/useFetchFilesFolders.jsx";

export default function TherapyWorksheets() {
	//state to refresh page when files/folders are altered
	const [refreshTrigger, setRefreshTrigger] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const { files, folders } = useFetchFilesFolders(isEditing, refreshTrigger);
	const filesAndFoldersSortedById = (files?.files || [])
		.concat(folders?.folders || [])
		.sort((a, b) => a.id - b.id);
	
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
									setRefreshTrigger={setRefreshTrigger}
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
				<DisplayFilesFolders
					filesAndFoldersSortedById={filesAndFoldersSortedById}
					setRefreshTrigger={setRefreshTrigger}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			</main>
		</section>
	);
}
