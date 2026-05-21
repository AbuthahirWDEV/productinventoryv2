import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the Add Product button', () => {
    render(<App />);
    expect(screen.getByText('Add Product')).toBeInTheDocument();
  });

  test('renders the search bar', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('search the item...')).toBeInTheDocument();
  });

  test('renders FilterByCategory and SortProduct dropdowns', () => {
    render(<App />);
    const combos = screen.getAllByRole('combobox');
    expect(combos.length).toBeGreaterThanOrEqual(2);
  });

  test('shows "No products available" initially', () => {
    render(<App />);
    expect(screen.getByText('No products available')).toBeInTheDocument();
  });

  test('adds a product and displays it in the list', () => {
    render(<App />);
    const inputs = screen.getAllByPlaceholderText('Enter ...');
    fireEvent.change(inputs[0], { target: { value: 'Laptop' } });
    fireEvent.change(inputs[1], { target: { value: '45000' } });
    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/45000/)).toBeInTheDocument();
  });

  test('deletes a product from the list', () => {
    render(<App />);
    const inputs = screen.getAllByPlaceholderText('Enter ...');
    fireEvent.change(inputs[0], { target: { value: 'Tablet' } });
    fireEvent.change(inputs[1], { target: { value: '20000' } });
    fireEvent.click(screen.getByText('Add Product'));

    expect(screen.getByText(/Tablet/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText(/Tablet/i)).not.toBeInTheDocument();
  });

  test('filters products by search query', () => {
    render(<App />);
    const formInputs = screen.getAllByPlaceholderText('Enter ...');

    fireEvent.change(formInputs[0], { target: { value: 'Laptop' } });
    fireEvent.change(formInputs[1], { target: { value: '45000' } });
    fireEvent.click(screen.getByText('Add Product'));

    fireEvent.change(formInputs[0], { target: { value: 'T-Shirt' } });
    fireEvent.change(formInputs[1], { target: { value: '500' } });
    fireEvent.click(screen.getByText('Add Product'));

    const searchInput = screen.getByPlaceholderText('search the item...');
    fireEvent.change(searchInput, { target: { value: 'Laptop' } });

    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
    expect(screen.queryByText(/T-Shirt/i)).not.toBeInTheDocument();
  });
});
