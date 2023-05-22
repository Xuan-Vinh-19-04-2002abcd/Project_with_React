import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contractor = () => {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/requestsForWithdraw')
      .then(response => setRequests(response.data))
      .catch(error => console.log(error));

    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  const updateRequestStatus = (requestId, newStatus) => {
    axios.patch(`http://localhost:3000/requestsForWithdraw/${requestId}`, { status: newStatus })
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
    } else if (status === 'Ready to Collect') {
      return 'bg-yellow-500 text-white';
    }
    return '';
  };

  const getRequestStatus = (status, requestId) => {
    const statusOptions = ['New', 'Collected', 'Ready to Collect'];
    return (
      <div className="flex justify-center">
        <select
          value={status}
          className="bg-transparent border-none outline-none"
          onChange={(event) => handleStatusChange(event, requestId)}
          style={{ backgroundColor: getRequestStatusClasses(status).split(' ')[0].substring(3) }}
        >
          {statusOptions.map(option => (
            <option
              key={option}
              value={option}
              style={{ backgroundColor: getRequestStatusClasses(option).split(' ')[0].substring(3) }}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.username : '';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contractor Requests</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Request ID</th>
              <th className="border border-gray-300 px-4 py-2">Planner</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id}>
                <td className="border border-gray-300 px-4 py-2">{request.id}</td>
                <td className="border border-gray-300 px-4 py-2">{getUserName(request.plannerUserId)}</td>
                <td className="border border-gray-300 px-4 py-2">{request.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
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

export default Contractor;
