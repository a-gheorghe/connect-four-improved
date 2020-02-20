import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from './Cell';

it('renders with aria label on button', () => {
  let { container } = render(<Cell rowIndex={1} colIndex={1} onClick={() => jest.fn()} val="1" />); 
  expect(container.querySelector('button')).toHaveAttribute('aria-label');
});