import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import TherapyWorksheets from '../components/TherapyWorksheets/TherapyWorksheets';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('renders component', () => {
    render(<MemoryRouter><TherapyWorksheets/></MemoryRouter>)

  });
});