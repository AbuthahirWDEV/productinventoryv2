import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterByCategory from './FilterByCategory';

const categoryOptions = ['Electronics', 'Clothing', 'Grocery', 'others'];

describe('FilterByCategory', () => {
  test('renders "All" as the first option', () => {
    render(<FilterByCategory categoryOptions={categoryOptions} onFilter={() => {}} />);
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveTextContent('All');
  });

  test('renders all provided category options plus "All"', () => {
    render(<FilterByCategory categoryOptions={categoryOptions} onFilter={() => {}} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(categoryOptions.length + 1);
    categoryOptions.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  test('calls onFilter with selected value when dropdown changes', () => {
    const mockOnFilter = jest.fn();
    render(<FilterByCategory categoryOptions={categoryOptions} onFilter={mockOnFilter} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Clothing' } });
    expect(mockOnFilter).toHaveBeenCalledWith('Clothing');
  });

  test('renders the FilterByCategory label', () => {
    render(<FilterByCategory categoryOptions={categoryOptions} onFilter={() => {}} />);
    expect(screen.getByText(/FilterByCategory/i)).toBeInTheDocument();
  });
});
