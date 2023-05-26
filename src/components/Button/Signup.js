import React from 'react';
import { useNavigate } from 'react-router-dom'; 
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      onClick={handleLogout}
    >
      Đăng xuất
    </button>
  );
};

export default LogoutButton;
