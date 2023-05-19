import React, { useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {
  const [userType, setUserType] = useState('Admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    console.log(userType)
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Đã xảy ra lỗi khi lấy danh sách người dùng:', error);
      throw error;
    }
  };
  
 
  const handleLogin = async  (event) => {
    event.preventDefault();
    
  try {
    const users = await getUsers();
    console.log(userType + username + password);
    

    const user = users.find((user) => user.role ===userType && user.username === username && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      // Chuyển trang thành công
      navigate('/admin'); // Thay đổi URL của trang thành công tại đây
    } else {
      // Hiển thị thông báo lỗi
      alert('Email hoặc mật khẩu không chính xác');
    }
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error);
    // Xử lý lỗi nếu cần thiết
  }
  };
  if (isLoggedIn) {
    return <Navigate to="/admin" />;
  }
  return (  
    <div className="h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518704618243-b719e5d5f2b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat">
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-gray-900 bg-opacity-80 rounded-lg p-8">
        <div className="mb-4">
          <label htmlFor="user-type" className="block text-white text-lg mb-2 font-bold">
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
          <label htmlFor="username" className="block text-white text-lg mb-2 font-bold">
            User name
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="block w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white text-lg mb-2 font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="block w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
            >
            Login
            </button>
            </div>
            </form>
            </div>
            );
            };
            
            export default LoginForm;