import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders search input with correct placeholder', () => {
    render(<SearchBar searchQuery="" onSearchQuery={() => {}} />);
    expect(screen.getByPlaceholderText('search the item...')).toBeInTheDocument();
  });

  test('displays the current searchQuery value', () => {
    render(<SearchBar searchQuery="laptop" onSearchQuery={() => {}} />);
    expect(screen.getByDisplayValue('laptop')).toBeInTheDocument();
  });

  test('calls onSearchQuery with new value when user types', () => {
    const mockOnSearchQuery = jest.fn();
    render(<SearchBar searchQuery="" onSearchQuery={mockOnSearchQuery} />);
    const input = screen.getByPlaceholderText('search the item...');
    fireEvent.change(input, { target: { value: 'phone' } });
    expect(mockOnSearchQuery).toHaveBeenCalledWith('phone');
  });

  test('renders Searchbar label', () => {
    render(<SearchBar searchQuery="" onSearchQuery={() => {}} />);
    expect(screen.getByText(/Searchbar/i)).toBeInTheDocument();
  });
});
