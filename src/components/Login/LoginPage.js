import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../Config/Config';

const LoginForm = () => {
  const [userType, setUserType] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('An error occurred while fetching users:', error);
      throw error;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : 'Invalid email');
    return isValid;
  };

  const validatePassword = (password) => {
    const isValid = password.length >= 6;
    setPasswordError(isValid ? '' : 'Invalid password');
    return isValid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const users = await getUsers();
      const user = users.find(
        (user) =>
          user.role === userType &&
          user.email === email &&
          user.password === password
      );

      if (user) {
        // Redirect based on user role
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        switch (user.role) {
          case 'Admin':
            navigate('/admin');
            break;
          case 'Vendor':
            navigate('/vendor');
            break;
          case 'Planner':
            navigate('/planner');
            break;
          case 'Contractor':
            navigate('/contractor');
            break;
          default:
            break;
        }
      } else {
        // Display login failure message
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error if necessary
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518704618243-b719e5d5f2b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-gray-900 bg-opacity-80 rounded-lg p-8"
      >
        <div className="mb-4">
          <label
            htmlFor="user-type"
            className="block text-white text-lg mb-2 font-bold"
          >
            Role
          </label>
          <select
            id="user-type"
            value={userType}
            onChange={handleUserTypeChange}
            className="block w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="Vendor">Vendor</option>
            <option value="Planner">Planner</option>
            <option value="Contractor">Contractor</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white text-lg mb-2 font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="block w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-white text-lg mb-2 font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="block w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-10 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
