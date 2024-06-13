import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import Wrapper from './todoWrapper';
import * as todoService from '../../services/todo.service';

jest.mock('../../services/todo.service'); // Mocking the todo.service module



// Mocking the imported components
jest.mock('./filter', () => () => <div data-testid="mock-filter" />);
jest.mock('./todos', () => ({ todos, onView, onEdit }) => (<div data-testid="mock-todos"></div>));

jest.mock('./form', () => ({ mode, values, open, handleClose }) => (
  <div data-testid="mock-form">
    <div data-testid="mode">{mode}</div>
    <div data-testid="values">{JSON.stringify(values)}</div>
    <div data-testid="open">{open ? 'true' : 'false'}</div>
    <button onClick={handleClose} data-testid="close-button">Close</button>
  </div>
));

const mockTodos = [
    { id: 1, text: 'Todo 1' },
    { id: 2, text: 'Todo 2' },
  ];


describe('Wrapper component', () => {
  test('renders correctly', async () => {
    todoService.getAll.mockResolvedValue(mockTodos); // Mocking the getAll function to return mockTodos
    await act( async () => render(<Wrapper/>));

    

    expect(screen.getByTestId('wrapper-component')).toBeInTheDocument();
    expect(screen.getByTestId('mock-filter')).toBeInTheDocument();
    expect(screen.getByTestId('mock-todos')).toBeInTheDocument();
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });

  test('opens form dialog on add button click', async () => {
    todoService.getAll.mockResolvedValue(mockTodos); // Mocking the getAll function to return mockTodos
    await act( async () => render(<Wrapper/>));
    

    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('mode')).toHaveTextContent('new');
    expect(screen.getByTestId('open')).toHaveTextContent('true');
  });

  test('closes form dialog on close button click', async () => {
    todoService.getAll.mockResolvedValue(mockTodos); // Mocking the getAll function to return mockTodos
    await act( async () => render(<Wrapper/>));
    

    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('open')).toHaveTextContent('true');
    fireEvent.click(screen.getByTestId('close-button'));
    await waitFor(() => {
      expect(screen.getByTestId('open')).toHaveTextContent('false');
    });
  });

  // Add more tests as needed
});
