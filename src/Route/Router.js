// CustomSwitch.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../components/Admin/AdminPage';
import LoginForm from '../components/Login/LoginPage';
import Planner from '../components/Planer/Planer';
const CustomSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/planner" element={<Planner />} />
      
    </Routes>

  );
};

export default CustomSwitch;
