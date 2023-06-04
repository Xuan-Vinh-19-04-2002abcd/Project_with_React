import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../Config/Config';

const CreateRoleForm = ({ handleCreateClose,handleCreateSuccess }) => {
  const [role, setRole] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    email: '',
    role: '',
  });

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));

    if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    } else if (name === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (name === 'role') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: validateRole(value),
      }));
    }
  };

  const handleCreateRole = async () => {
    try {
      const { password, email, role: newRole } = role;
      const passwordError = validatePassword(password);
      const emailError = validateEmail(email);
      const roleError = validateRole(newRole);

      if (passwordError || emailError || roleError) {
        setErrors({
          password: passwordError,
          email: emailError,
          role: roleError,
        });
        return;
      }

      // Validation passed, continue with API call
      const response = await axios.post(`${API_URL}/users`, role);
      console.log('Role created:', response.data);
      handleCreateSuccess(response.data);
      alert('Role created successfully');
      resetForm();
      console.log(role);
      handleCreateClose();
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const resetForm = () => {
    setRole({
      username: '',
      password: '',
      email: '',
      role: '',
    });
    setErrors({
      password: '',
      email: '',
      role: '',
    });
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password should be at least 8 characters long';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validateRole = (role) => {
    if (!role) {
      return 'Role is required';
    }
    return '';
  };

  return (
    <div className="flex items-center bg-neutral-400 rounded">
      <div className="p-4 mx-4 flex flex-col justify-center items-center ">
        <h2 className="text-2xl font-bold mb-4">Create Role</h2>
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <input
            type="text"
            id="username"
            name="username"
            value={role.username}
            onChange={handleRoleChange}
            className="border border-gray-300 rounded px-4 py-2 flex-grow md:w-72"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col md:flex-col md:items-center mb-4">
          <input
            type="password"
            id="password"
            name="password"
            value={role.password}
            onChange={handleRoleChange}
            className="border border-gray-300 rounded px-4 py-2 flex-grow md:w-72 mb-1"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <select
            id="role"
            name="role"
            value={role.role}
            onChange={handleRoleChange}
            className="border rounded px-4 py-2 flex-grow md:w-72"
          >
            <option value="">Select Role</option>
            <option value="Planner">Planner</option>
            <option value="Vendor">Vendor</option>
            <option value="Contractor">Contractor</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-col  mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={role.email}
            onChange={handleRoleChange}
            className="border border-gray-300 rounded px-4 py-2 flex-grow md:w-72 mb-1"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <button
          onClick={handleCreateRole}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ml-4"
        >
          Create Role
        </button>
      </div>
    </div>
  );
};

export default CreateRoleForm;
