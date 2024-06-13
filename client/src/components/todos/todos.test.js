import React from 'react';
import { render, screen } from '@testing-library/react';
import Todos from './todos';

test('renders no results found message when no todos are provided', () => {
  render(<Todos todos={[]} />);
  const noResultsMessage = screen.getByText('No Results Found');
  expect(noResultsMessage).toBeInTheDocument();
});

test('renders todos correctly', () => {
  const sampleTodos = [
    { _id: 1, title: 'Todo 1', description: 'Todo 1 description', status: 'To Do', updatedAt: '2024-06-10T08:30:04.441Z' },
    { _id: 2, title: 'Todo 2', description: 'Todo 2 descrption', status: 'In Progress', updatedAt: '2024-06-11T08:30:04.441Z' },
  ];
  
  render(<Todos todos={sampleTodos} />);
  
  // Check if todos are rendered
  const todo1 = screen.getByText('Todo 1');
  const todo2 = screen.getByText('Todo 2');
  expect(todo1).toBeInTheDocument();
  expect(todo2).toBeInTheDocument();
});
