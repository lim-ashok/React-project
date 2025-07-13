/**
 * Main App Component
 * 
 * This is the main component that manages the entire authentication flow.
 * It handles switching between login and signup forms and manages the user's
 * authentication state throughout the application.
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import { loginUser, signupUser, logoutUser, checkAuthStatus } from './services/authService';

function App() {
  // State variables to manage the application
  const [isLoggedIn, setIsLoggedIn] = useState(false);     // Track if user is logged in
  const [currentForm, setCurrentForm] = useState('login'); // Track which form to show ('login' or 'signup')
  const [user, setUser] = useState(null);                  // Store user information
  const [loading, setLoading] = useState(true);            // Track loading state

  // useEffect hook runs when the component first loads
  // It checks if the user is already logged in
  useEffect(() => {
    checkUserAuthentication();
  }, []);

  /**
   * Check if user is already authenticated when app loads
   * This function runs when the app first starts
   */
  const checkUserAuthentication = async () => {
    try {
      const authData = await checkAuthStatus();
      if (authData.authenticated) {
        setIsLoggedIn(true);
        setUser(authData.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  /**
   * Handle user logout
   * This function logs out the user and resets the application state
   */
  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      setCurrentForm('login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  /**
   * Handle successful login
   * This function is called when login is successful
   */
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  /**
   * Switch between login and signup forms
   * This function changes which form is currently displayed
   */
  const switchForm = (formType) => {
    setCurrentForm(formType);
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // If user is logged in, show the dashboard
  if (isLoggedIn) {
    return (
      <div className="App">
        <div className="dashboard">
          <h1>Welcome, {user?.username}!</h1>
          <p>You are successfully logged in.</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If user is not logged in, show login or signup form
  return (
    <div className="App">
      <div className="auth-container">
        <h1>Authentication System</h1>
        
        {/* Form switching buttons */}
        <div className="form-switch">
          <button 
            onClick={() => switchForm('login')}
            className={currentForm === 'login' ? 'active' : ''}
          >
            Login
          </button>
          <button 
            onClick={() => switchForm('signup')}
            className={currentForm === 'signup' ? 'active' : ''}
          >
            Sign Up
          </button>
        </div>

        {/* Show either login or signup form based on currentForm state */}
        {currentForm === 'login' ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <SignupForm onSignupSuccess={() => switchForm('login')} />
        )}
      </div>
    </div>
  );
}

/**
 * Login Form Component
 * 
 * This component renders the login form and handles user login
 */
function LoginForm({ onLoginSuccess }) {
  // State variables for the login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle form submission for login
   * This function is called when the user clicks the login button
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);   // Show loading state
    setError('');       // Clear any previous errors

    try {
      // Call the login function from our authentication service
      const result = await loginUser(username, password);
      
      if (result.success) {
        // Login successful - call the success callback
        onLoginSuccess(result.user);
      } else {
        // Login failed - show error message
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      // Handle any errors that occurred during login
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      
      {/* Show error message if there's an error */}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

/**
 * Signup Form Component
 * 
 * This component renders the signup form and handles user registration
 */
function SignupForm({ onSignupSuccess }) {
  // State variables for the signup form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  /**
   * Handle form submission for signup
   * This function is called when the user clicks the signup button
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);   // Show loading state
    setError('');       // Clear any previous errors
    setSuccess('');     // Clear any previous success messages

    // Check if passwords match
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Call the signup function from our authentication service
      const result = await signupUser(username, email, password, passwordConfirm);
      
      if (result.success) {
        // Signup successful
        setSuccess('Account created successfully! Please login.');
        // Clear form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        
        // After 2 seconds, switch to login form
        setTimeout(() => {
          onSignupSuccess();
        }, 2000);
      } else {
        // Signup failed - show error message
        setError(result.message || 'Signup failed');
      }
    } catch (error) {
      // Handle any errors that occurred during signup
      setError(error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      
      {/* Show error message if there's an error */}
      {error && <div className="error-message">{error}</div>}
      
      {/* Show success message if signup was successful */}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="signup-username">Username:</label>
          <input
            type="text"
            id="signup-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="signup-password-confirm">Confirm Password:</label>
          <input
            type="password"
            id="signup-password-confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default App;
