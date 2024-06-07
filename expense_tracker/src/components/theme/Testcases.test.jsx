// src/__tests__/Testcases.test.jsx
import { render, screen } from '@testing-library/react';
import Testcases from '../Testcases'; // Ensure the correct relative path

describe('Testcases Component', () => {
  test('renders Text 1: Hello, World!', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 1: Hello, World!/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 2: Welcome to React testing.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 2: Welcome to React testing./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 3: This is a test case example.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 3: This is a test case example./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 4: Writing tests is important.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 4: Writing tests is important./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 5: React Testing Library is awesome.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 5: React Testing Library is awesome./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 6: Testing ensures reliability.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 6: Testing ensures reliability./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 7: Lets write some tests.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 7: Let's write some tests./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 8: Testing components is fun.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 8: Testing components is fun./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 9: Always test your code.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 9: Always test your code./i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders Text 10: Tests help catch bugs early.', () => {
    render(<Testcases />);
    const textElement = screen.getByText(/Text 10: Tests help catch bugs early./i);
    expect(textElement).toBeInTheDocument();
  });
});
