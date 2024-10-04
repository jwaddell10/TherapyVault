import React from "react";
import { render } from "@testing-library/react"
import '@testing-library/jest-dom'
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import {test, describe, expect, it} from '@jest/globals'

test('login component', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
})