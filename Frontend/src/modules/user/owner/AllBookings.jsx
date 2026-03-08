import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../../common/Toast";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../../config/apiConfig"; 
axios.defaults.withCredentials = true;

const OwnerAllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const getAllProperty = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.OWNER_GET_ALL_BOOKINGS,
        { withCredentials: true }
      );
      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        showToast("error", response.data.message || "Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        showToast("error", "Session expired, please login again");
        navigate("/login");
      } else {
        showToast("error", "Failed to fetch bookings");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleStatus = async (bookingId, propertyId, status) => {
    try {
      const res = await axios.post(
        API_ENDPOINTS.OWNER_HANDLE_BOOKING_STATUS,
        { bookingId, propertyId, status },
        { withCredentials: true }
      );
      if (res.data.success) {
        showToast("success", res.data.message);
        getAllProperty();
      } else {
        showToast("error", "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to update booking status");
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <table className="min-w-full border border-gray-700 rounded-lg shadow-2xl bg-gray-900/80 backdrop-blur-md text-gray-300">
        <thead className="bg-indigo-600/80 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Booking ID</th>
            <th className="py-3 px-4 text-center">Property ID</th>
            <th className="py-3 px-4 text-center">Tenant Name</th>
            <th className="py-3 px-4 text-center">Tenant Phone</th>
            <th className="py-3 px-4 text-center">Booking Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allBookings.length > 0 ? (
            allBookings.map((booking, idx) => (
              <tr key={booking._id}
                className={`border-b border-gray-700 transition duration-200 hover:bg-gray-800/50 ${
                  idx % 2 === 0 ? "bg-gray-800/40" : "bg-gray-900/40"
                }`}>
                <td className="py-3 px-4">{booking._id}</td>
                <td className="py-3 px-4 text-center">{booking.propertyId}</td>
                <td className="py-3 px-4 text-center">{booking.userName}</td>
                <td className="py-3 px-4 text-center">{booking.phone}</td>
                <td className={`py-3 px-4 text-center font-semibold ${
                  booking.bookingStatus === "booked" ? "text-green-400" : "text-yellow-400"
                }`}>
                  {booking.bookingStatus}
                </td>
                <td className="py-3 px-4 text-center">
                  {booking.bookingStatus === "pending" ? (
                    <button onClick={() => handleStatus(booking._id, booking.propertyId, "booked")}
                      className="px-4 py-1 text-sm bg-green-600/80 hover:bg-green-600 text-white rounded-lg transition shadow-md">
                      Mark Booked
                    </button>
                  ) : (
                    <button onClick={() => handleStatus(booking._id, booking.propertyId, "pending")}
                      className="px-4 py-1 text-sm bg-yellow-500/80 hover:bg-yellow-500 text-white rounded-lg transition shadow-md">
                      Mark Pending
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 px-4 text-center text-gray-400 italic">
                No bookings available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerAllBookings;