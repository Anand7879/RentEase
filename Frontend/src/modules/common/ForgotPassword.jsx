import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";
import API_ENDPOINTS from "../../config/apiConfig";

axios.defaults.withCredentials = true;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [data, setData] = useState({ email: "", password: "", confirmPassword: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password || !data.confirmPassword) {
      return showToast("error", "Please fill all fields");
    }

    if (data.password !== data.confirmPassword) {
      return showToast("error", "Passwords do not match");
    }

    try {
      const res = await axios.post(
        API_ENDPOINTS.USER_FORGOT_PASSWORD,
        data,
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", "Your password has been changed!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        showToast("error", "User doesn't exist");
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        * { font-family: 'Poppins', sans-serif; }

        .fp-page {
          min-height: 100vh;
          background: #1a1a2e;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .fp-wrapper {
          position: relative;
          width: 100%;
          max-width: 460px;
          border: 2px solid #00d4ff;
          box-shadow: 0 0 25px #00d4ff;
          overflow: hidden;
          padding: 50px 50px 40px;
          animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fp-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #00d4ff;
          border-radius: 50%;
          font-size: 28px;
          box-shadow: 0 0 15px #00d4ff44;
          animation: pulseGlow 2s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px #00d4ff44; }
          50% { box-shadow: 0 0 30px #00d4ff99; }
        }

        .fp-wrapper h2 {
          font-size: 28px;
          text-align: center;
          color: #fff;
          margin-bottom: 6px;
          opacity: 0;
          animation: slideIn 0.6s ease 0.2s forwards;
        }

        .fp-wrapper p {
          font-size: 13px;
          text-align: center;
          color: #aaa;
          margin-bottom: 30px;
          opacity: 0;
          animation: slideIn 0.6s ease 0.3s forwards;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .field-wrapper {
          position: relative;
          width: 100%;
          height: 50px;
          margin-top: 25px;
          opacity: 0;
          animation: slideIn 0.6s ease forwards;
        }
        .field-wrapper:nth-of-type(1) { animation-delay: 0.4s; }
        .field-wrapper:nth-of-type(2) { animation-delay: 0.5s; }
        .field-wrapper:nth-of-type(3) { animation-delay: 0.6s; }

        .field-wrapper input {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 15px;
          color: #fff;
          font-weight: 600;
          border-bottom: 2px solid #fff;
          padding-right: 23px;
          transition: 0.5s;
        }
        .field-wrapper input:focus,
        .field-wrapper input:valid {
          border-bottom: 2px solid #00d4ff;
        }
        .field-wrapper label {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          font-size: 15px;
          color: #fff;
          transition: 0.5s;
          pointer-events: none;
        }
        .field-wrapper input:focus ~ label,
        .field-wrapper input:valid ~ label {
          top: -5px;
          color: #00d4ff;
          font-size: 12px;
        }
        .field-wrapper i {
          position: absolute;
          top: 50%;
          right: 0;
          font-size: 18px;
          transform: translateY(-50%);
          color: #fff;
        }
        .field-wrapper input:focus ~ i,
        .field-wrapper input:valid ~ i { color: #00d4ff; }

        .fp-btn-wrapper {
          margin-top: 35px;
          opacity: 0;
          animation: slideIn 0.6s ease 0.7s forwards;
        }

        .submit-button {
          position: relative;
          width: 100%;
          height: 45px;
          background: transparent;
          border-radius: 40px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          border: 2px solid #00d4ff;
          overflow: hidden;
          z-index: 1;
        }
        .submit-button::before {
          content: "";
          position: absolute;
          height: 300%;
          width: 100%;
          background: linear-gradient(#1a1a2e, #00d4ff, #1a1a2e, #00d4ff);
          top: -100%;
          left: 0;
          z-index: -1;
          transition: 0.5s;
        }
        .submit-button:hover::before { top: 0; }

        .fp-links {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 13px;
          opacity: 0;
          animation: slideIn 0.6s ease 0.8s forwards;
        }
        .fp-links a {
          color: #00d4ff;
          text-decoration: none;
          font-weight: 600;
        }
        .fp-links a:hover { text-decoration: underline; }

        .fp-footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }
        .fp-footer a {
          color: #00d4ff;
          text-decoration: none;
          font-weight: 600;
        }
        .fp-footer a:hover { text-decoration: underline; }
      `}</style>

      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="fp-page">
        <div className="fp-wrapper">
          <div className="fp-icon">🔑</div>
          <h2>Forgot Password?</h2>
          <p>Enter your email and set a new password to reset your account</p>

          <form onSubmit={handleSubmit}>
            <div className="field-wrapper">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
              <label>Email Address</label>
              <i className="fa-solid fa-envelope"></i>
            </div>

            <div className="field-wrapper">
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
              <label>New Password</label>
              <i className="fa-solid fa-lock"></i>
            </div>

            <div className="field-wrapper">
              <input
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirm Password</label>
              <i className="fa-solid fa-shield-halved"></i>
            </div>

            <div className="fp-btn-wrapper">
              <button className="submit-button" type="submit">
                Change Password
              </button>
            </div>

            <div className="fp-links">
              <Link to="/login">← Back to Login</Link>
              <Link to="/login" onClick={(e) => { /* toggle to register */ }}>
                Create Account
              </Link>
            </div>
          </form>
        </div>

        <div className="fp-footer">
          <p>Made with ❤️ by <a href="#" target="_blank" rel="noreferrer">RentEase</a></p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;