import React from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers, FaBuilding, FaMoneyBill, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

const AdminSummary = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-4">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={5} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={3} color="bg-yellow-500" />
        <SummaryCard icon={<FaMoneyBill />} text="Monthly Pay" number="$2500" color="bg-red-600" />
      </div>

      <h3 className="text-2xl font-bold mb-4">Leave Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={2} color="bg-teal-600" />
        <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-green-500" />
        <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={1} color="bg-yellow-500" />
        <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={2} color="bg-red-600" />
      </div>
    </div>
  );
};

export default AdminSummary;
