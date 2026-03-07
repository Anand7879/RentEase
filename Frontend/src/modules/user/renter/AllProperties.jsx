import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../../common/Toast"
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const RenterAllProperty = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "https://rentease-d3zn.onrender.com/api/user/getallbookings",
        { withCredentials: true }
      );
      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        showToast("error", response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        showToast("error", "Session expired, please login again");
        navigate("/login");
      } else {
        showToast("error", "Failed to fetch properties");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  return (
    <div className="overflow-x-auto bg-gray-900/80 backdrop-blur-md border border-gray-700 shadow-xl rounded-xl p-6">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <h2 className="text-xl font-semibold text-indigo-400 mb-4">All My Bookings</h2>
      <table className="min-w-full border border-gray-700 text-sm rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 border-b border-gray-700 text-left">Booking ID</th>
            <th className="px-4 py-2 border-b border-gray-700 text-left">Property ID</th>
            <th className="px-4 py-2 border-b border-gray-700 text-center">Tenant Name</th>
            <th className="px-4 py-2 border-b border-gray-700 text-center">Phone</th>
            <th className="px-4 py-2 border-b border-gray-700 text-center">Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {allProperties.length > 0 ? (
            allProperties.map((booking, index) => (
              <tr key={booking._id}
                className={`${index % 2 === 0 ? "bg-gray-800/60" : "bg-gray-900/50"} hover:bg-gray-800 transition-colors`}>
                <td className="px-4 py-2 border-b border-gray-700 text-gray-200">{booking._id}</td>
                <td className="px-4 py-2 border-b border-gray-700 text-gray-200">{booking.propertyId}</td>
                <td className="px-4 py-2 border-b border-gray-700 text-center text-gray-200">{booking.userName}</td>
                <td className="px-4 py-2 border-b border-gray-700 text-center text-gray-200">{booking.phone}</td>
                <td className={`px-4 py-2 border-b border-gray-700 text-center font-semibold ${
                  booking.bookingStatus === "booked" ? "text-green-400" : "text-yellow-400"
                }`}>
                  {booking.bookingStatus}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400 font-medium">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RenterAllProperty;