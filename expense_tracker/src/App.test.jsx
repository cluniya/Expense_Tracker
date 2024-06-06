import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';

const mockStore = configureStore([]);

const renderWithProviders = (ui, { store }) => {
    return render(
        <Provider store={store}>
            <Router>
                {ui}
            </Router>
        </Provider>
    );
};

describe('App component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: {
                isAuthenticated: false
            }
        });
    });

    test('renders Navbar component', () => {
        renderWithProviders(<App />, { store });
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('renders SignUpForm component on root route', () => {
        renderWithProviders(<App />, { store });
        expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    });

    test('renders SignInForm component on /signin route', () => {
        renderWithProviders(<App />, { store });
        window.history.pushState({}, 'SignIn page', '/signin');
        expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    });

    test('renders UpdateProfile component on /update-profile route', () => {
        renderWithProviders(<App />, { store });
        window.history.pushState({}, 'Update Profile page', '/update-profile');
        expect(screen.getByRole('heading', { name: /update profile/i })).toBeInTheDocument();
    });

    test('renders ExpenseDashboard component on /expense route when authenticated', () => {
        store = mockStore({
            auth: {
                isAuthenticated: true
            }
        });
        renderWithProviders(<App />, { store });
        window.history.pushState({}, 'Expense page', '/expense');
        expect(screen.getByRole('heading', { name: /expense dashboard/i })).toBeInTheDocument();
    });

    test('redirects to /signin when trying to access /expense route while not authenticated', () => {
        renderWithProviders(<App />, { store });
        window.history.pushState({}, 'Expense page', '/expense');
        expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    });

    test('redirects to /expense for unknown routes when authenticated', () => {
        store = mockStore({
            auth: {
                isAuthenticated: true
            }
        });
        renderWithProviders(<App />, { store });
        window.history.pushState({}, 'Unknown page', '/unknown');
        expect(screen.getByRole('heading', { name: /expense dashboard/i })).toBeInTheDocument();
    });

    test('redirects to /signin for unknown routes when not authenticated', () => {
        renderWithProviders(<App />, { store });
        window.history.pushState({}, 'Unknown page', '/unknown');
        expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    });

    test('renders correct elements based on authentication state', () => {
        // Not authenticated
        renderWithProviders(<App />, { store });
        expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();

        // Authenticated
        store = mockStore({
            auth: {
                isAuthenticated: true
            }
        });
        renderWithProviders(<App />, { store });
        window.history.pushState({}, 'Expense page', '/expense');
        expect(screen.getByRole('heading', { name: /expense dashboard/i })).toBeInTheDocument();
    });

    test('handles navigation correctly when clicking links in Navbar', () => {
        renderWithProviders(<App />, { store });
        // Assuming the Navbar has a link to Sign In
        const signInLink = screen.getByRole('link', { name: /sign in/i });
        signInLink.click();
        expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    });
});
