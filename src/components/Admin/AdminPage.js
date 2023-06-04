import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../Config/Config';
import LogoutButton from '../Button/Signup';
import CreateRoleForm from './FormRole';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleCreateUserSuccess = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCreateRequest = () => {
    setShowRoleForm(true);
  };

  const handleCloseModal = () => {
    setShowRoleForm(false);
  };
  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div className='bg-gray-800 w-full lg:w-1/6 lg:min-h-screen'>
        <div className='flex flex-col items-center justify-center h-1/3'>
          <div className='w-28 h-28 bg-indigo-500 rounded-full mb-3'></div>
          <p className='text-white text-2xl font-semibold'>Admin</p>
        </div>
      </div>
      <div className='w-full lg:w-5/6 px-4'>
          <div className='mt-10 flex justify-end'>
          <LogoutButton/>
          </div>
        <div className='md:mt-32 mt-4'>
          <div className='mb-4 flex justify-between '>
          {!showRoleForm && (
        <button className="flex-start px-4 py-2 rounded-md text-white bg-black"onClick={handleCreateRequest} >Create Role</button>
      )}
            
            <input
              type='text'
              placeholder='Tìm kiếm...'
              value={searchTerm}
              onChange={handleSearch}
              className='border border-gray-300 rounded-md py-2 px-4 w-full lg:w-3/12 '
            />

          </div>
          <div className='w-full border-t-2 border-gray-500'></div>
        </div>
        <div className='container mx-auto px-4'>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white shadow-md rounded my-4'>
              <thead className='bg-gray-200 text-gray-700'>
                <tr>
                  <th className='py-2 px-4'>STT</th>
                  <th className='py-2 px-4'>Name</th>
                  <th className='py-2 px-4'>Role</th>
                </tr>
              </thead>
              <tbody className='text-gray-600'>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : ''}
                  >
                    <td className='text-center font-semibold'>{index + 1}</td>
                    <td className='text-center font-semibold'>{user.username}</td>
                    <td className='text-center font-semibold'>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showRoleForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 4.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          
            <CreateRoleForm  handleCreateClose={handleCloseModal} handleCreateSuccess={handleCreateUserSuccess}/>
          </div>
        </div>
      )}  
      
    </div>
    
  );
};

export default AdminPage;
