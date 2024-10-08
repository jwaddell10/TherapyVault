import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { expect, it, describe, fireEvent } from "vitest";
import userEvent from '@testing-library/user-event'

describe("Login component", () => {
	it("should render form items", () => {
		render(
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		);
		expect(screen.getByLabelText("log in title")).toBeInTheDocument();
		expect(screen.getByText("Username:")).toBeInTheDocument();
		expect(screen.getByText("Password:")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /log in/i })
		).toBeInTheDocument();
	});

	describe("should handle form submission, allow any value in username/password", () => {
        it('should handle form submission', async () => {
            const user = userEvent.setup()

            const utils = render(
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            );

            const userInput = utils.getByLabelText("username")
            const passwordInput = screen.getByLabelText("password")
    
            fireEvent.change(screen.getByLabelText("username"), {
                target: { value: "testuser" },
            });
            expect(userInput.value).toBe('testuser')
            fireEvent.change(screen.getByLabelText("password"), {
                target: { value: "password" },
            });
            fireEvent.click(screen.getByRole("button", { name: /log in/i }));
        })

	});
});
