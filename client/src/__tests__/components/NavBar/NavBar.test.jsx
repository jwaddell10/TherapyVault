import NavBar from "../../../components/NavBar/NavBar.jsx"
import { MemoryRouter } from "react-router-dom"
import { describe, it } from "vitest"
import { render } from "@testing-library/react";

describe('NavBar', () => {
    it('renders component', () => {
      render(<MemoryRouter><NavBar/></MemoryRouter>)
  
    });
  });