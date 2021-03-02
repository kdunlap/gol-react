import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Conway\'s Game of Life/i);
  expect(linkElement).toBeInTheDocument();
});
