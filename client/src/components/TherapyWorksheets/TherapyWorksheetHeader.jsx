import { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UploadFileForm from "./UploadFileForm/UploadFileForm";
import CreateFolder from "./CreateFolder/CreateFolder";
import { Link } from "react-router-dom";
import { setRef } from "@mui/material";

export default function TherapyWorksheetHeader({
	title,
	setRefreshTrigger,
	folderId,
}) {
	console.log(setRefreshTrigger)
	// console.log(folderId, "folderid in header");
	const [popupUploadForm, setPopupUploadForm] = useState(false);
	const [popupFolderForm, setPopupFolderForm] = useState(false);
	const handleUploadFile = () => {
		setPopupUploadForm(true);
	};

	const handleUploadFolder = () => {
		setPopupFolderForm(true);
	};

	return (
		<section className="header-container">
			<header className="worksheets-header">
				<div>{title ? <h1>{title}</h1> : <h1>Worksheet</h1>}</div>
				<div className="upload-container">
					<Link
						role="uploadfolder"
						className="upload-link"
						onClick={handleUploadFolder}
					>
						<DriveFolderUploadIcon /> Upload Folder
					</Link>
					<Link className="upload-link" onClick={handleUploadFile}>
						<UploadFileIcon /> Upload File
					</Link>
				</div>
				{popupFolderForm && (
					<>
						<div className="background"></div>
						<CreateFolder
							folderId={folderId}
							setRefreshTrigger={setRefreshTrigger}
							setPopupFolderForm={setPopupFolderForm}
						></CreateFolder>
					</>
				)}
				{popupUploadForm && (
					<>
						<div className="background"></div>
						<Link></Link>
						<UploadFileForm
							folderId={folderId}
							setRefreshTrigger={setRefreshTrigger}
							setPopupUploadForm={setPopupUploadForm}
						></UploadFileForm>
					</>
				)}
			</header>
		</section>
	);
}
