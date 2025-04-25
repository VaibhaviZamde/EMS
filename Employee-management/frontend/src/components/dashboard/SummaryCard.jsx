import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-white rounded shadow p-4">
      <div className={`text-white ${color} p-3 rounded mr-4 text-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-700 font-medium">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
