import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TherapyWorksheets from "../../../components/TherapyWorksheets/TherapyWorksheets";
import { MemoryRouter } from "react-router-dom";

const getByTextContent = (text) => {
    // Passing function to `getByText`
    return screen.getByText((content, element) => {
        const hasText = element => element.textContent === text
        const elementHasText = hasText(element)
        const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child))
        return elementHasText && childrenDontHaveText
  })
}

describe("Therapy Worksheets", () => {
	render(
		<MemoryRouter>
			<TherapyWorksheets />
		</MemoryRouter>
	);
	const uploadFolderButton = screen.getByText(/Upload Folder/i);


	it("renders text on screen", () => {
		expect(screen.getByText("Worksheet")).toBeInTheDocument();
		expect(screen.getByText("Upload Folder")).toBeInTheDocument();
		expect(screen.getByText("Upload File")).toBeInTheDocument();
	});

	it("pops up form when user clicks upload links", () => {
		fireEvent.click(uploadFolderButton)
		expect(screen.getByText(getByTextContent("Name"))).toBeInTheDocument();
	});
});
