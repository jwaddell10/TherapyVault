import Signup from "../../../components/Signup/Signup.jsx"
import { MemoryRouter } from "react-router-dom"
import { describe, it } from "vitest"
import { render } from "@testing-library/react";

describe('Signup', () => {
    it('renders component', () => {
      render(<MemoryRouter><Signup/></MemoryRouter>)
    });
  });