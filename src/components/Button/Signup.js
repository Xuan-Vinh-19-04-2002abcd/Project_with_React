import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center" onClick={handleLogout}>
      Log out
      <svg class="h-5 w-5 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M7 4v3h6v2H7v3l-4-4 4-4zm2-4h8v16H9V0zm0 18h8v2H9v-2z" />
      </svg>
      
    </button>

  );
};

export default LogoutButton;
