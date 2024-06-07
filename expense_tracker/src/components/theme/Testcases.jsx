import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import App from '../App'; // Ensure the correct relative path

const mockStore = configureMockStore([]);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { isAuthenticated: false },
    });
  });

  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const element = screen.getByText(/hello world/i);
    expect(element).toBeInTheDocument();
  });
});
