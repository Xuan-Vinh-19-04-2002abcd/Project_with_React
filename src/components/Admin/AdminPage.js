import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../Config/Config';
const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div className='bg-gray-800 w-full lg:w-1/6 lg:min-h-screen'>
        <div className='flex flex-col items-center justify-center h-1/3'>
          <div className='w-28 h-28 bg-indigo-500 rounded-full mb-3'></div>
          <p className='text-white text-2xl font-semibold'>Admin</p>
        </div>
      </div>
      <div className='w-full lg:w-5/6 px-4'>
        <div className='md:mt-32 mt-4'>
          <div className='mb-4 flex justify-end'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              value={searchTerm}
              onChange={handleSearch}
              className='border border-gray-300 rounded-md py-2 px-4 w-full lg:w-3/12'
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
                  <th className='py-2 px-4'>Tên</th>
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
    </div>
  );
};

export default AdminPage;
