import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../common/Toast"
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../config/apiConfig";

axios.defaults.withCredentials = true;

const AdminAllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "https://rentease-d3zn.onrender.com/api/admin/getallproperties",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        showToast("error", response.data.message || "Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        showToast("error", "Session expired, please login again");
        navigate("/login");
      } else {
        showToast("error", "Failed to fetch Property");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <table className="min-w-full border border-gray-700 bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden">
        <thead className="bg-indigo-600/80 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Property ID</th>
            <th className="py-3 px-4 text-center">Owner ID</th>
            <th className="py-3 px-4 text-center">Property Type</th>
            <th className="py-3 px-4 text-center">Property Ad Type</th>
            <th className="py-3 px-4 text-center">Property Address</th>
            <th className="py-3 px-4 text-center">Owner Contact</th>
            <th className="py-3 px-4 text-center">Property Amt</th>
          </tr>
        </thead>
        <tbody>
          {allProperties.length > 0 ? (
            allProperties.map((property, index) => (
              <tr
                key={property._id}
                className={`transition duration-200 ${
                  index % 2 === 0 ? "bg-gray-800/60" : "bg-gray-900/60"
                } hover:bg-indigo-500/20`}
              >
                <td className="py-2 px-4 border-b border-gray-700 text-gray-200">
                  {property._id}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-300">
                  {property.ownerId}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-center text-indigo-400 font-medium">
                  {property.propertyType}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-300">
                  {property.propertyAdType || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-300">
                  {property.propertyAddress}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-center text-gray-300">
                  {property.ownerContact}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 text-center font-semibold text-green-400">
                  ₹{property.propertyAmt}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-400 font-medium italic"
              >
                No properties found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllProperty;