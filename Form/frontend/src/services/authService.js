/**
 * Authentication Service
 * 
 * This service handles all authentication-related API calls to the Django backend.
 * It includes functions for login, signup, logout, and checking authentication status.
 * 
 * Base URL points to Django backend running on localhost:8000
 */

// Base URL for Django backend API
const API_BASE_URL = 'http://localhost:8000/api/auth';

/**
 * Login user with username and password
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} - Promise that resolves with login response
 */
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for session management
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/**
 * Register new user account
 * @param {string} username - Desired username
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} passwordConfirm - Password confirmation
 * @returns {Promise} - Promise that resolves with signup response
 */
export const signupUser = async (username, email, password, passwordConfirm) => {
    try {
        const response = await fetch(`${API_BASE_URL}/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for session management
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password_confirm: passwordConfirm
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }

        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

/**
 * Logout current user
 * @returns {Promise} - Promise that resolves with logout response
 */
export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for session management
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Logout failed');
        }

        return data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

/**
 * Check if user is currently authenticated
 * @returns {Promise} - Promise that resolves with authentication status
 */
export const checkAuthStatus = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/check/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for session management
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Auth check failed');
        }

        return data;
    } catch (error) {
        console.error('Auth check error:', error);
        throw error;
    }
};