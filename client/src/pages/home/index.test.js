import React from 'react';
import { render } from '@testing-library/react';
import Home from '.';

// Mock the Wrapper component
jest.mock('../../components/todos/todoWrapper', () => {
  return () => <div data-testid="mock-wrapper"></div>;
});

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('renders mock wrapper component', () => {
    const { getByTestId } = render(<Home />);
    const mockWrapperComponent = getByTestId('mock-wrapper');
    expect(mockWrapperComponent).toBeInTheDocument();
  });

  it('renders home component with correct styles', () => {
    const { getByTestId } = render(<Home />);
    const homeComponent = getByTestId('home-component');
    expect(homeComponent).toHaveStyle('backgroundColor: #FAFAFA');
  });
});
