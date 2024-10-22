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

	it("renders text on screen", () => {
		expect(screen.getByText("Worksheets")).toBeInTheDocument();
		expect(screen.getByText("Upload Folder")).toBeInTheDocument();
		expect(screen.getByText("Upload File")).toBeInTheDocument();
	});

	it("pops up form when user clicks upload links", () => {
		const uploadFormButton = screen.getByText("Upload Folder")

		fireEvent.click(uploadFormButton)
	});
});
