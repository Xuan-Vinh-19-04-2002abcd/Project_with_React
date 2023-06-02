import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../Config/Config';
import LogoutButton from '../Button/Signup';
const Vendor = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    axios.get(`${API_URL}/requestsForWithdraw`)
      .then(response => {
        const filteredRequests = response.data.filter(request => request.supplyVendorId  == loggedInUser.id);
        setRequests(filteredRequests);
      })
      .catch(error => console.log(error));

    axios.get(`${API_URL}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, [loggedInUser.id]);

  const updateRequestStatus = (requestId, newStatus) => {
    axios.patch(`${API_URL}/requestsForWithdraw/${requestId}`, { status: newStatus })
      .then(response => {
        const updatedRequest = response.data;
        setRequests(prevRequests => {
          const updatedRequests = prevRequests.map(request => {
            if (request.id === updatedRequest.id) {
              return updatedRequest;
            }
            return request;
          });
          return updatedRequests;
        });
      })
      .catch(error => console.log(error));
  };

  const handleStatusChange = (event, requestId) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    updateRequestStatus(requestId, newStatus);
  };

  const getRequestStatusClasses = (status) => {
    if (status === 'New') {
      return 'bg-blue-500 text-white';
    } else if (status === 'Collected') {
      return 'bg-red-500 text-white';
    }else if (status === 'Ready to Collect') {
        return 'bg-green-500 text-white';
      }
    return '';
  };

  const getRequestStatus = (status, requestId) => {
    const statusOptions = ['New',"Ready to Collect"];
    if (status === 'Collected') {
      return (
        <div className="flex justify-center">
          <button className='border border-stone-500 py-1 px-8 bg-red-600 cursor-default rounded-md'>
          Collected
          </button>
        </div>
      );
    }
    return (
      <div className="flex justify-center">
        <select
          value={status}
          className="appearance-none bg-black text-white py-2 px-3 pr-2 rounded leading-tight cursor-pointer text-center "
          onChange={(event) => handleStatusChange(event, requestId)}
        >
          {statusOptions.map(option => (
            <option
              className='text-white'
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const getUserName = (userId) => {
    if (userId === loggedInUser.id) {
      return loggedInUser.username;
    }

    const user = users.find(user => user.id == userId);
    return user ? user.username : '';
  };

  const getSupperVendorName = (vendorId) => {
    const vendor = users.find(user => user.id == vendorId);
    return vendor ? vendor.username : '';
  };
  
  return (
    <div className="container mx-auto p-4 mt-8">
      <div className='flex justify-between mb-4'>
      <p className='px-2 py-2 rounded-2xl bg-orange-600 font-bold '><span className='text-xl'>Hi</span> {loggedInUser.username}</p>
        <LogoutButton/>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">All Your Requests</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className='bg-slate-400'>
              <th className="border border-gray-300 px-4 py-2">Request ID</th>
              <th className="border border-gray-300 px-4 py-2">Planner</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Project Contractor</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id}>
                <td className="border border-gray-300 px-4 py-2">{request.id}</td>
                <td className="border border-gray-300 px-4 py-2">{getUserName(request.plannerUserId)}</td>
                <td className="border border-gray-300 px-4 py-2">{request.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{getSupperVendorName(request.projectContractorUserId)}</td>
                <td className= "border border-gray-300 px-4 py-2">
                  {getRequestStatus(request.status, request.id)}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
