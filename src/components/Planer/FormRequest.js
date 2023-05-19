import React, { useState,useEffect } from 'react';
import axios from 'axios';

const CableDrumRequest = ({ vendors, projectContractors }) => {
  const [cableDrumRequest, setCableDrumRequest] = useState({
    plannerUserId: 2,
    quantity: 0,
    status: 'New',
    supplyVendorId: '',
    projectContractorId: '',
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Gọi API để lấy thông tin người dùng
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  
  const handleCableDrumRequest = async () => {
    try {
      // const response = await axios.post('http://localhost:3000/requestsForWithdraw', cableDrumRequest);
      // console.log('Cable Drum Request created:', response.data);

      // Lấy thông tin người dùng và gửi email
      const projectContractorId = cableDrumRequest.projectContractorId;
     
      const projectContractor = users.find(user => user.id == projectContractorId);
      console.log(projectContractor)
      if (projectContractor) {
        const email = projectContractor.email;
        const quantity = cableDrumRequest.quantity;
        sendEmail(email, quantity);
      } else {
        console.error('Project Contractor not found');
      }
    } catch (error) {
      console.error('Error creating Cable Drum Request:', error);
    }
  };

  const sendEmail = async (email, quantity) => {
    try {
      const response = await axios.post('http://localhost:3004/send-email', {
        email,
        quantity,
      });
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  return (
   <div className='flex items-center bg-neutral-400 rounded' >
    <div className='w-1/2'>
        <img src='https://images.unsplash.com/photo-1629540946404-ebe133e99f49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9pbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' className='rounded'></img>
    </div>
    <div className="p-4 mx-4 flex flex-col justify-center items-center w-1/2">
      <h2 className="text-2xl font-bold mb-4">Cable Drum Request</h2>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <select
          id="vendor"
          value={cableDrumRequest.vendorId}
          onChange={(e) =>
            setCableDrumRequest({
              ...cableDrumRequest,
              supplyVendorId: e.target.value,
            })
          }
          className="border  rounded px-4 py-2 flex-grow md:w-72"
        >
          <option value="" className='font-medium'>Select Vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.username}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <input
          type="number"
          id="quantity"
          value={cableDrumRequest.quantity}
          onChange={(e) =>
            setCableDrumRequest({
              ...cableDrumRequest,
              quantity: parseInt(e.target.value),
            })
          }
          className="border border-gray-300 rounded px-4 py-2 flex-grow md:w-72"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        
        <select
          id="projectContractor"
          value={cableDrumRequest.projectContractorId}
          onChange={(e) =>
            setCableDrumRequest({
              ...cableDrumRequest,
              projectContractorId: e.target.value,
            })
          }
          className="border border-gray-300 rounded px-4 py-2 flex-grow md:w-72"
        >
          <option value="">Select Project Contractor</option>
          {projectContractors.map((projectContractor) => (
            <option key={projectContractor.id} value={projectContractor.id}>
              {projectContractor.username}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleCableDrumRequest}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ml-4"
      >
        Submit Request
      </button>
    </div>
   </div>
  );
};

export default CableDrumRequest;
