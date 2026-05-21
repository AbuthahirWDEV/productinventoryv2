import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddProducts from './AddProducts';

const categoryOptions = ['Electronics', 'Clothing', 'Grocery', 'others'];

describe('AddProducts', () => {
  test('renders all form fields', () => {
    render(<AddProducts categoryOptions={categoryOptions} onAddProduct={() => {}} editValue="" />);
    const inputs = screen.getAllByPlaceholderText('Enter ...');
    expect(inputs).toHaveLength(2);
    expect(screen.getByText(/Product name/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Stock/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
  });

  test('renders all category options in the dropdown', () => {
    render(<AddProducts categoryOptions={categoryOptions} onAddProduct={() => {}} editValue="" />);
    const options = screen.getAllByRole('option');
    categoryOptions.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
    expect(options).toHaveLength(categoryOptions.length);
  });

  test('calls onAddProduct with correct data on form submit', () => {
    const mockOnAddProduct = jest.fn();
    render(
      <AddProducts categoryOptions={categoryOptions} onAddProduct={mockOnAddProduct} editValue="" />
    );

    const inputs = screen.getAllByPlaceholderText('Enter ...');
    fireEvent.change(inputs[0], { target: { value: 'Laptop' } });
    fireEvent.change(inputs[1], { target: { value: '45000' } });

    fireEvent.click(screen.getByText('Add Product'));

    expect(mockOnAddProduct).toHaveBeenCalledTimes(1);
    expect(mockOnAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        productName: 'Laptop',
        price: '45000',
      })
    );
  });

  test('resets form fields after submission', () => {
    render(<AddProducts categoryOptions={categoryOptions} onAddProduct={() => {}} editValue="" />);
    const inputs = screen.getAllByPlaceholderText('Enter ...');
    fireEvent.change(inputs[0], { target: { value: 'Laptop' } });
    fireEvent.click(screen.getByText('Add Product'));
    expect(inputs[0]).toHaveValue('');
  });

  test('pre-fills form fields when editValue is provided', () => {
    const editValue = {
      id: 1,
      productName: 'Smartphone',
      price: '25000',
      category: 'Electronics',
      isStock: true,
    };
    render(
      <AddProducts categoryOptions={categoryOptions} onAddProduct={() => {}} editValue={editValue} />
    );
    expect(screen.getByDisplayValue('Smartphone')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25000')).toBeInTheDocument();
  });

  test('toggling the stock checkbox changes its state', () => {
    render(<AddProducts categoryOptions={categoryOptions} onAddProduct={() => {}} editValue="" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
