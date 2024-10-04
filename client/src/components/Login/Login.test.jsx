import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import { test } from "vitest"

test('login component', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
})