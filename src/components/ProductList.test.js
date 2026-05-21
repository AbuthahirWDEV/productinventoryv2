import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';

const mockProducts = [
  { id: 1, productName: 'Laptop', price: 45000, category: 'Electronics', isStock: true },
  { id: 2, productName: 'T-Shirt', price: 500, category: 'Clothing', isStock: false },
];

describe('ProductList', () => {
  test('shows "No products available" when products list is empty', () => {
    render(<ProductList products={[]} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  test('renders correct number of product items', () => {
    render(<ProductList products={mockProducts} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockProducts.length);
  });

  test('renders product name and price', () => {
    render(<ProductList products={mockProducts} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/45000/)).toBeInTheDocument();
  });

  test('renders product category', () => {
    render(<ProductList products={mockProducts} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
  });

  test('calls onDelete with correct id when Delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<ProductList products={mockProducts} onDelete={mockOnDelete} onEdit={() => {}} />);
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('calls onEdit with correct id when Edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<ProductList products={mockProducts} onDelete={() => {}} onEdit={mockOnEdit} />);
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[1]);
    expect(mockOnEdit).toHaveBeenCalledWith(2);
  });

  test('renders inStock checkbox as checked for in-stock products', () => {
    render(<ProductList products={mockProducts} onDelete={() => {}} onEdit={() => {}} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });
});
