import App from './src/App';
import TodoTable from './src/TodoTable';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

test('renders App component', () => {
  //Renders App
  render(<App />);
  //Looks for an element
  const headline = screen.getByText(/My Todolist/i);
  expect(headline).toBeInTheDocument();
});

test('renders todotable', () => {
  const row = [{ desc: 'Go to coffee', date: '24.01.2024' }];
  //renders the table with the row
  render(<TodoTable todos={row} />);
  const table = screen.getByRole('table');
  expect(table).toHaveTextContent(/go to coffee/i);
});

test('adds todos and clears list after', () => {
  //First, renders the component
  render(<App />);

  //Step 1: Populating todos

  //Looks for the field
  const desc = screen.getByPlaceholderText('Description');
  //Populates the field
  fireEvent.change(desc, { target: { value: 'Clean the house' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '29.01.2024' } });

  //Looks for the Add button
  const button = screen.getByText('Add');
  //Clicks the button
  fireEvent.click(button);

  //Asserts
  const table = screen.getByRole('table');
  expect(table).toHaveTextContent(/clean the house/i);

  //Step 2: Clearing todos
  //Clear inputs
  userEvent.clear(date);
  userEvent.clear(desc);
  //Find clear button and clear list
  const clearBtn = screen.getByText(/Clear/i);
  fireEvent.click(clearBtn);
  //Verify that the row has been deleted
  const doesntExistTableRow = screen.queryByText(/clean the house/i);
  expect(doesntExistTableRow).not.toBeInTheDocument();
});
