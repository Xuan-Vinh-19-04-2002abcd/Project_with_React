import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CableDrumRequest from './FormRequest';

const Planner = () => {
  const [contracts, setContracts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [projectContractors, setProjectContractors] = useState([]);
  const [showCableDrumRequest, setShowCableDrumRequest] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/contracts');
        setContracts(response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const filteredVendors = response.data.filter((user) => user.role === 'Vendor');
        setVendors(filteredVendors);
        const filteredProjectContractors = response.data.filter((user) => user.role === 'Contractor');
        setProjectContractors(filteredProjectContractors);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchContracts();
    fetchUsers();
  }, []);

  useEffect(() => {
    const updatedContracts = contracts.map((contract) => {
      const vendor = vendors.find((vendor) => vendor.id === contract.supplyVendorId);
      return {
        ...contract,
        vendor: vendor ? vendor.username : null,
      };
    });
    setContracts(updatedContracts);
  }, [vendors]);

  const handleCreateRequest = () => {
    setShowCableDrumRequest(true);
  };

  const handleCloseModal = () => {
    setShowCableDrumRequest(false);
  };

  return (
    <div className="container mx-auto px-4 py-8  h-screen bg-[url('')]">
      <div className="w-full   mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Contracts</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Amount of Cable Drum</th>
              <th className="py-2 px-4 border-b">Vendor</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td className="py-2 px-4 border text-center">{contract.startDate}</td>
                <td className="py-2 px-4 border text-center">{contract.endDate}</td>
                <td className="py-2 px-4 border text-center">{contract.contractAmount}</td>
                <td className="py-2 px-4 border text-center">{contract.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCableDrumRequest && (
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
          
            <CableDrumRequest vendors={vendors} projectContractors={projectContractors} />
          </div>
        </div>
      )}

      {!showCableDrumRequest && (
        <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleCreateRequest}>
          Create Request
        </button>
      )}
    </div>
  );
};

export default Planner;