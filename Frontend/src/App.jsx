import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import ForgotPassword from "./modules/common/ForgotPassword";
import AdminHome from "./modules/admin/AdminHome";
import AdminLogin from "./modules/admin/AdminLogin";
import OwnerHome from "./modules/user/owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";
import AllUsers from "./modules/admin/AllUsers";
import AddProperty from "./modules/user/owner/AddProperty";
import OwnerAllBookings from "./modules/user/owner/AllBookings";
import RenterAllProperty from "./modules/user/renter/AllProperties";
import AdminAllBookings from "./modules/admin/AllBookings";
import AdminAllProperty from "./modules/admin/AllProperty";
import OwnerAllProperties from "./modules/user/owner/AllProperties";
import AllPropertiesCards from "./modules/user/AllPropertiesCards";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

// Protected Route Component - Prevents unauthorized access to role-specific pages
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "null");
  
  if (!userData || !allowedRoles.includes(userData.type)) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
};

function App() {
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setUserLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, userLoggedIn, setUserLoggedIn }}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/adminlogin' element={<AdminLogin />} />
            
            {/* Admin Routes - Protected */}
            <Route path='/admin/home' element={<ProtectedRoute element={<AdminHome />} allowedRoles={["Admin"]} />} />
            <Route path='/admin/users' element={<ProtectedRoute element={<AllUsers />} allowedRoles={["Admin"]} />} />
            <Route path='/admin/bookings' element={<ProtectedRoute element={<AdminAllBookings />} allowedRoles={["Admin"]} />} />
            <Route path='/admin/properties' element={<ProtectedRoute element={<AdminAllProperty />} allowedRoles={["Admin"]} />} />
            
            {/* Owner Routes - Protected */}
            <Route path='/owner/home' element={<ProtectedRoute element={<OwnerHome />} allowedRoles={["Owner"]} />} />
            <Route path='/owner/add-property' element={<ProtectedRoute element={<AddProperty />} allowedRoles={["Owner"]} />} />
            <Route path='/owner/bookings' element={<ProtectedRoute element={<OwnerAllBookings />} allowedRoles={["Owner"]} />} />
            <Route path='/owner/properties' element={<ProtectedRoute element={<OwnerAllProperties />} allowedRoles={["Owner"]} />} />
            
            {/* Renter Routes - Protected */}
            <Route path='/renter/home' element={<ProtectedRoute element={<RenterHome />} allowedRoles={["Renter"]} />} />
            <Route path='/renter/bookings' element={<ProtectedRoute element={<RenterAllProperty />} allowedRoles={["Renter"]} />} />
            
            {/* Public Routes */}
            <Route path='/properties' element={<AllPropertiesCards />} />
            
            {/* Fallback for old routes - redirect to new paths */}
            <Route path='/adminhome' element={<Navigate to="/admin/home" replace />} />
            <Route path='/ownerhome' element={<Navigate to="/owner/home" replace />} />
            <Route path='/renterhome' element={<Navigate to="/renter/home" replace />} />
            <Route path='/postproperty' element={<Navigate to="/owner/add-property" replace />} />
            
            {/* 404 Fallback */}
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;