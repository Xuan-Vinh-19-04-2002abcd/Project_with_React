// CustomSwitch.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../components/Admin/AdminPage';
import LoginForm from '../components/Login/LoginPage';
import Planner from '../components/Planer/Planer';
import Contractor from '../components/Project_Contractor/Contractor';
import Vendor from '../components/Supply_Vendor/Vendor';
const CustomSwitch = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/contractor" element={<Contractor />} />
      <Route path="/vendor" element={<Vendor />} />
    </Routes>

  );
};

export default CustomSwitch;
