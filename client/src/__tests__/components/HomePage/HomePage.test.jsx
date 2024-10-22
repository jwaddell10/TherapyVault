import HomePage from "../../../components/HomePage/HomePage.jsx"
import { MemoryRouter } from "react-router-dom"
import { describe, it } from "vitest"
import { render } from "@testing-library/react";

describe('HomePage', () => {
    it('renders component', () => {
      render(<MemoryRouter><HomePage/></MemoryRouter>)
  
    });
  });
