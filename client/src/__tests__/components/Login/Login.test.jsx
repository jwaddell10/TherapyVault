import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../../components/Login/Login";
import { MemoryRouter } from "react-router-dom";
import { expect, it, describe } from "vitest";

describe("Login component", () => {
	it("should render form items", () => {
		render(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);
		expect(screen.getByText("Username:")).toBeInTheDocument();
		expect(screen.getByText("Password:")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /log in/i })
		).toBeInTheDocument();
	});

	it("should handle form submission", () => {
		render(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);

		const usernameInput = screen.getByLabelText(/username/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const loginButton = screen.getByRole("button", { name: /log in/i });

		fireEvent.change(usernameInput, { target: { value: "testuser" } });
		expect(usernameInput.value).toBe("testuser");

		fireEvent.change(passwordInput, { target: { value: "password" } });
		expect(passwordInput.value).toBe("password");

		fireEvent.click(loginButton);
	});
});
