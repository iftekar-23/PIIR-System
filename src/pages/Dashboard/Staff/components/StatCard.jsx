// src/pages/Dashboard/Citizen/components/StatCard.jsx
import React from "react";

const accentColors = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  red: "text-red-600",
};

const StatCard = ({ title, value, accent = "blue" }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <p className="text-gray-700 font-medium">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${accentColors[accent]}`}>{value}</p>
    </div>
  );
};

export default StatCard;
