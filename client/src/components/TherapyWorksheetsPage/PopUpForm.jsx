import { useState, useRef } from "react";
import useClickOnOutside from "../helpers/useClickOnOutside";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

export default function PopUpForm({ y }) {
    console.log(y, 'y in popup')
	// const handleClick = () => {
	// 	setPopUp(false);
	// };
	return (
		<>
			<section
				style={{
                    display: "flex",
                    flexDirection: "column",
					position: "absolute",
					top: `${y}px`,
					height: "2rem",
					width: "20rem",
					border: "1px solid black",
				}}
				// onClick={handleClick}
				type="text"
			>
				<div>
					<EditIcon />
					Edit
					<DeleteIcon />
					Delete
				</div>
			</section>
		</>
	);
}
