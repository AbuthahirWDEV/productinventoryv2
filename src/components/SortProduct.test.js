import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortProduct from './SortProduct';

const sortOptions = [
  'None',
  'Price: Low → High',
  'Price: High → Low',
  'Name: A → Z',
  'Name: Z → A',
];

describe('SortProduct', () => {
  test('renders all sort options', () => {
    render(<SortProduct sortOptions={sortOptions} onSort={() => {}} />);
    sortOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('renders the correct number of options', () => {
    render(<SortProduct sortOptions={sortOptions} onSort={() => {}} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(sortOptions.length);
  });

  test('calls onSort with selected value when dropdown changes', () => {
    const mockOnSort = jest.fn();
    render(<SortProduct sortOptions={sortOptions} onSort={mockOnSort} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Price: Low → High' } });
    expect(mockOnSort).toHaveBeenCalledWith('Price: Low → High');
  });

  test('renders SortProduct label', () => {
    render(<SortProduct sortOptions={sortOptions} onSort={() => {}} />);
    expect(screen.getByText(/SortProduct/i)).toBeInTheDocument();
  });
});
