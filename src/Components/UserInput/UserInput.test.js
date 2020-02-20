import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserInput from './UserInput';

it('renders an input associated with a label', () => {
  const { getByLabelText } = render(<UserInput label="label" id="test" />);
  const input = getByLabelText(/label/);
  expect(input).toHaveAttribute('type', 'number')
});