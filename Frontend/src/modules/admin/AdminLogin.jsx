import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";
import { UserContext } from "../../App";
import API_ENDPOINTS from "../../config/apiConfig";

axios.defaults.withCredentials = true;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUserData, setUserLoggedIn } = useContext(UserContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return showToast("error", "Please fill all fields");
    }
    try {
      const res = await axios.post(
        API_ENDPOINTS.USER_LOGIN,
        data,
        { withCredentials: true }
      );
      if (res.data.success) {
        const user = res.data.user;
        if (user.type !== "Admin") {
          return showToast("error", "Access denied. Admins only.");
        }
        localStorage.setItem("user", JSON.stringify(user));
        setUserData(user);
        setUserLoggedIn(true);
        showToast("success", "Welcome Admin!");
        setTimeout(() => navigate("/adminhome"), 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        .admin-page {
          min-height: 100vh;
          background: #080c14;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          background-image:
            radial-gradient(ellipse 60% 50% at 30% 50%, rgba(99,102,241,0.07), transparent 60%),
            radial-gradient(ellipse 50% 40% at 70% 60%, rgba(139,92,246,0.05), transparent 60%);
        }

        .admin-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 20px;
          padding: 48px 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 0 60px rgba(99,102,241,0.1);
        }

        .admin-icon {
          width: 56px; height: 56px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }

        .admin-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: white;
          text-align: center;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .admin-sub {
          color: rgba(255,255,255,0.35);
          font-size: 14px;
          text-align: center;
          margin-bottom: 36px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .field-wrap {
          position: relative;
          margin-bottom: 24px;
        }

        .field-wrap input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 16px;
          color: white;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .field-wrap input::placeholder { color: rgba(255,255,255,0.25); }
        .field-wrap input:focus { border-color: rgba(99,102,241,0.6); }

        .admin-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 24px rgba(99,102,241,0.35);
          font-family: 'DM Sans', sans-serif;
          margin-top: 8px;
          letter-spacing: 0.01em;
        }

        .admin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(99,102,241,0.5);
          filter: brightness(1.1);
        }

        .back-link {
          display: block;
          text-align: center;
          margin-top: 24px;
          color: rgba(255,255,255,0.25);
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .back-link:hover { color: rgba(255,255,255,0.5); }
      `}</style>

      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="admin-page">
        <div className="admin-card">
          {/* Icon */}
          <div className="admin-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" style={{ width: 26, height: 26 }}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>

          <div className="admin-title">Admin Portal</div>
          <div className="admin-sub">Restricted Access</div>

          <form onSubmit={handleSubmit}>
            <div className="field-wrap">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Admin Email"
                required
              />
            </div>
            <div className="field-wrap">
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="admin-btn">
              Access Dashboard →
            </button>
          </form>

          <span className="back-link" onClick={() => navigate("/")}>
            ← Back to Home
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;