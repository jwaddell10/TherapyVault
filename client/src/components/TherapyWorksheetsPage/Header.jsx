import { useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UploadForm from "../helpers/UploadForm/UploadFileForm";
import CreateFolder from "../helpers/CreateFolder";
import { Link } from "react-router-dom";

export default function Header({ setRefreshTrigger, name }) {
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
				<div>{name ? <h1>{name.title}</h1> : <h1>Worksheet</h1>}</div>
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
	);
}
