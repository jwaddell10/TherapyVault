import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TherapyWorksheets from "../../../components/TherapyWorksheetsPage/TherapyWorksheets";
import { MemoryRouter } from "react-router-dom";

describe("Therapy Worksheets", () => {
	render(
		<MemoryRouter>
			<TherapyWorksheets />
		</MemoryRouter>
	);
	const uploadFolderButton = screen.getByText(/Upload Folder/i);


	it("renders text on screen", () => {
		expect(screen.getByText("Worksheets")).toBeInTheDocument();
		expect(screen.getByText("Upload Folder")).toBeInTheDocument();
		expect(screen.getByText("Upload File")).toBeInTheDocument();
	});

	it("pops up form when user clicks upload links", () => {
		fireEvent.click(uploadFolderButton)
		expect(screen.getByLabelText("Name")).toBeInTheDocument();
	});
});
