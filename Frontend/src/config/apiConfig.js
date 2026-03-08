// API Base Configuration
// Uses environment variable, no fallback to avoid CORS issues
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error(
    "FATAL: VITE_API_BASE_URL not set in .env file.\n" +
    "Please create a .env file in Frontend folder with:\n" +
    "VITE_API_BASE_URL=http://localhost:8001 (local) or https://your-backend.com (production)"
  );
}

// API Endpoints
const API_ENDPOINTS = {
  // User Auth Endpoints
  USER_LOGIN: `${API_BASE_URL}/api/user/login`,
  USER_REGISTER: `${API_BASE_URL}/api/user/register`,
  USER_FORGOT_PASSWORD: `${API_BASE_URL}/api/user/forgotpassword`,
  USER_GET_DATA: `${API_BASE_URL}/api/user/getuserdata`,
  USER_GET_ALL_PROPERTIES: `${API_BASE_URL}/api/user/getAllProperties`,
  USER_BOOKING_HANDLE: (propertyId) => `${API_BASE_URL}/api/user/bookinghandle/${propertyId}`,
  USER_GET_ALL_BOOKINGS: `${API_BASE_URL}/api/user/getallbookings`,

  // Admin Endpoints
  ADMIN_GET_ALL_USERS: `${API_BASE_URL}/api/admin/getallusers`,
  ADMIN_HANDLE_STATUS: `${API_BASE_URL}/api/admin/handlestatus`,
  ADMIN_GET_ALL_PROPERTIES: `${API_BASE_URL}/api/admin/getallproperties`,
  ADMIN_GET_ALL_BOOKINGS: `${API_BASE_URL}/api/admin/getallbookings`,

  // Owner Endpoints
  OWNER_POST_PROPERTY: `${API_BASE_URL}/api/owner/postproperty`,
  OWNER_GET_ALL_PROPERTIES: `${API_BASE_URL}/api/owner/getallproperties`,
  OWNER_GET_ALL_BOOKINGS: `${API_BASE_URL}/api/owner/getallbookings`,
  OWNER_DELETE_PROPERTY: (propertyId) => `${API_BASE_URL}/api/owner/deleteproperty/${propertyId}`,
  OWNER_UPDATE_PROPERTY: (propertyId) => `${API_BASE_URL}/api/owner/updateproperty/${propertyId}`,
  OWNER_HANDLE_BOOKING_STATUS: `${API_BASE_URL}/api/owner/handlebookingstatus`,
};

export default API_ENDPOINTS;
