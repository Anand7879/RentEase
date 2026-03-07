// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Toast from "../common/Toast";

// axios.defaults.withCredentials = true;

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [data, setData] = useState({ email: "", password: "" });
//   const [toast, setToast] = useState({ show: false, type: "", message: "" });
//   const [toggled, setToggled] = useState(false);

//   // Auto-toggle to register if navigated from /register
//   useEffect(() => {
//     if (location.state?.showRegister) {
//       setToggled(true);
//     }
//   }, [location.state]);

//   // Register form state
//   const [regData, setRegData] = useState({ name: "", email: "", password: "", type: "" });

//   const showToast = (type, message) => {
//     setToast({ show: true, type, message });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleRegChange = (e) => {
//     const { name, value } = e.target;
//     setRegData({ ...regData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!data.email || !data.password) {
//       return showToast("error", "Please fill all fields");
//     }
//     try {
//       const res = await axios.post("https://rentease-d3zn.onrender.com/api/user/login", data, { withCredentials: true });
//       if (res.data.success) {
//         showToast("success", res.data.message);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         const user = res.data.user;
//         setTimeout(() => {
//           switch (user.type) {
//             case "Admin": navigate("/adminhome"); break;
//             case "Renter": navigate("/renterhome"); break;
//             case "Owner":
//               if (user.granted === "ungranted") {
//                 showToast("error", "Your account is not yet confirmed by the admin");
//               } else {
//                 navigate("/ownerhome");
//               }
//               break;
//             default: navigate("/login"); break;
//           }
//           window.location.reload();
//         }, 1000);
//       } else {
//         showToast("error", res.data.message);
//       }
//     } catch (err) {
//       showToast("error", err.response?.data?.message || "Login failed");
//     }
//   };

//   const handleRegSubmit = async (e) => {
//     e.preventDefault();
//     if (!regData.name || !regData.email || !regData.password || !regData.type) {
//       return showToast("error", "Please fill all fields");
//     }
//     try {
//       const response = await axios.post("https://rentease-d3zn.onrender.com/api/user/register", regData, { withCredentials: true });
//       if (response.data.success) {
//         showToast("success", response.data.message);
//         setTimeout(() => setToggled(false), 1000);
//       } else {
//         showToast("error", response.data.message);
//       }
//     } catch (error) {
//       showToast("error", error.response?.data?.message || "Registration failed. Please try again.");
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

//         * { font-family: 'DM Sans', 'Segoe UI', sans-serif; }

//         .auth-page {
//           min-height: 100vh;
//           background: #080c14;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//           background-image: radial-gradient(ellipse 80% 50% at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 60%),
//                             radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139,92,246,0.05) 0%, transparent 60%);
//         }

//         .auth-wrapper {
//           position: relative;
//           width: 100%;
//           max-width: 800px;
//           height: 500px;
//           border: 1px solid rgba(99,102,241,0.4);
//           box-shadow: 0 0 40px rgba(99,102,241,0.2), 0 0 80px rgba(99,102,241,0.08);
//           overflow: hidden;
//           border-radius: 4px;
//         }

//         /* --- BACKGROUND SHAPES --- */
//         .background-shape {
//           position: absolute;
//           right: 0;
//           top: -5px;
//           height: 600px;
//           width: 850px;
//           background: linear-gradient(45deg, #080c14, #6366f1);
//           transform: rotate(10deg) skewY(40deg);
//           transform-origin: bottom right;
//           transition: 1.5s ease;
//           transition-delay: 1.6s;
//         }
//         .auth-wrapper.toggled .background-shape {
//           transform: rotate(0deg) skewY(0deg);
//           transition-delay: 0.5s;
//         }

//         .secondary-shape {
//           position: absolute;
//           left: 250px;
//           top: 100%;
//           height: 700px;
//           width: 850px;
//           background: #080c14;
//           border-top: 2px solid rgba(99,102,241,0.5);
//           transform: rotate(0deg) skewY(0deg);
//           transform-origin: bottom left;
//           transition: 1.5s ease;
//           transition-delay: 0.5s;
//         }
//         .auth-wrapper.toggled .secondary-shape {
//           transform: rotate(-11deg) skewY(-41deg);
//           transition-delay: 1.2s;
//         }

//         /* --- CREDENTIALS PANEL --- */
//         .credentials-panel {
//           position: absolute;
//           top: 0;
//           width: 50%;
//           height: 100%;
//           display: flex;
//           justify-content: center;
//           flex-direction: column;
//         }
//         .credentials-panel.signin { left: 0; padding: 0 40px; }
//         .credentials-panel.signup { right: 0; padding: 0 60px; }

//         .credentials-panel h2 {
//           font-size: 32px;
//           text-align: center;
//           color: #fff;
//         }

//         /* --- SIGNIN SLIDE ELEMENTS --- */
//         .credentials-panel.signin .slide-element {
//           transform: translateX(0%);
//           transition: 0.7s;
//           opacity: 1;
//         }
//         .credentials-panel.signin .slide-element:nth-child(1) { transition-delay: 2.1s; }
//         .credentials-panel.signin .slide-element:nth-child(2) { transition-delay: 2.2s; }
//         .credentials-panel.signin .slide-element:nth-child(3) { transition-delay: 2.3s; }
//         .credentials-panel.signin .slide-element:nth-child(4) { transition-delay: 2.4s; }
//         .credentials-panel.signin .slide-element:nth-child(5) { transition-delay: 2.5s; }

//         .auth-wrapper.toggled .credentials-panel.signin .slide-element {
//           transform: translateX(-120%);
//           opacity: 0;
//         }
//         .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(1) { transition-delay: 0s; }
//         .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(2) { transition-delay: 0.1s; }
//         .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(3) { transition-delay: 0.2s; }
//         .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(4) { transition-delay: 0.3s; }
//         .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(5) { transition-delay: 0.4s; }

//         /* --- SIGNUP SLIDE ELEMENTS --- */
//         .credentials-panel.signup .slide-element {
//           transform: translateX(120%);
//           transition: 0.7s ease;
//           opacity: 0;
//           filter: blur(10px);
//         }
//         .credentials-panel.signup .slide-element:nth-child(1) { transition-delay: 0s; }
//         .credentials-panel.signup .slide-element:nth-child(2) { transition-delay: 0.1s; }
//         .credentials-panel.signup .slide-element:nth-child(3) { transition-delay: 0.2s; }
//         .credentials-panel.signup .slide-element:nth-child(4) { transition-delay: 0.3s; }
//         .credentials-panel.signup .slide-element:nth-child(5) { transition-delay: 0.4s; }
//         .credentials-panel.signup .slide-element:nth-child(6) { transition-delay: 0.5s; }
//         .credentials-panel.signup .slide-element:nth-child(7) { transition-delay: 0.6s; }

//         .auth-wrapper.toggled .credentials-panel.signup .slide-element {
//           transform: translateX(0%);
//           opacity: 1;
//           filter: blur(0px);
//         }
//         .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(1) { transition-delay: 1.7s; }
//         .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(2) { transition-delay: 1.8s; }
//         .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(3) { transition-delay: 1.9s; }
//         .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(4) { transition-delay: 1.9s; }
//         .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(5) { transition-delay: 2.0s; }
//         .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(6) { transition-delay: 2.1s; }
//         .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(7) { transition-delay: 2.2s; }

//         /* --- FIELD WRAPPER --- */
//         .field-wrapper {
//           position: relative;
//           width: 100%;
//           height: 50px;
//           margin-top: 22px;
//         }
//         .field-wrapper input,
//         .field-wrapper select {
//           width: 100%;
//           height: 100%;
//           background: transparent;
//           border: none;
//           outline: none;
//           font-size: 15px;
//           color: #fff;
//           font-weight: 600;
//           border-bottom: 2px solid #fff;
//           padding-right: 23px;
//           transition: 0.5s;
//         }
//         .field-wrapper select option { background: #080c14; color: #fff; }
//         .field-wrapper input:focus,
//         .field-wrapper input:valid {
//           border-bottom: 2px solid #818cf8;
//         }
//         .field-wrapper select:focus { border-bottom: 2px solid #818cf8; }
//         .field-wrapper label {
//           position: absolute;
//           top: 50%;
//           left: 0;
//           transform: translateY(-50%);
//           font-size: 15px;
//           color: rgba(255,255,255,0.6);
//           transition: 0.5s;
//           pointer-events: none;
//         }
//         .field-wrapper input:focus ~ label,
//         .field-wrapper input:valid ~ label {
//           top: -5px;
//           color: #818cf8;
//           font-size: 12px;
//         }
//         .field-wrapper i {
//           position: absolute;
//           top: 50%;
//           right: 0;
//           font-size: 18px;
//           transform: translateY(-50%);
//           color: rgba(255,255,255,0.4);
//         }
//         .field-wrapper input:focus ~ i,
//         .field-wrapper input:valid ~ i { color: #818cf8; }

//         /* --- SUBMIT BUTTON --- */
//         .submit-button {
//           position: relative;
//           width: 100%;
//           height: 45px;
//           background: transparent;
//           border-radius: 40px;
//           cursor: pointer;
//           font-size: 16px;
//           font-weight: 600;
//           color: #fff;
//           border: 1.5px solid #6366f1;
//           overflow: hidden;
//           z-index: 1;
//           transition: 0.3s;
//           letter-spacing: 0.03em;
//         }
//         .submit-button::before {
//           content: "";
//           position: absolute;
//           height: 300%;
//           width: 100%;
//           background: linear-gradient(#080c14, #6366f1, #080c14, #6366f1);
//           top: -100%;
//           left: 0;
//           z-index: -1;
//           transition: 0.5s;
//         }
//         .submit-button:hover::before { top: 0; }

//         /* --- SWITCH LINK --- */
//         .switch-link {
//           font-size: 13px;
//           text-align: center;
//           margin: 15px 0 8px;
//           color: #fff;
//         }
//         .switch-link a {
//           text-decoration: none;
//           color: #818cf8;
//           font-weight: 600;
//         }
//         .switch-link a:hover { text-decoration: underline; }

//         /* --- WELCOME SECTION --- */
//         .welcome-section {
//           position: absolute;
//           top: 0;
//           height: 100%;
//           width: 50%;
//           display: flex;
//           justify-content: center;
//           flex-direction: column;
//         }
//         .welcome-section.signin {
//           right: 0;
//           text-align: right;
//           padding: 0 40px 60px 150px;
//         }
//         .welcome-section.signin .slide-element {
//           transform: translateX(0);
//           transition: 0.7s ease;
//           opacity: 1;
//           filter: blur(0px);
//         }
//         .welcome-section.signin .slide-element:nth-child(1) { transition-delay: 2.0s; }
//         .welcome-section.signin .slide-element:nth-child(2) { transition-delay: 2.1s; }

//         .auth-wrapper.toggled .welcome-section.signin .slide-element {
//           transform: translateX(120%);
//           opacity: 0;
//           filter: blur(10px);
//         }
//         .auth-wrapper.toggled .welcome-section.signin .slide-element:nth-child(1) { transition-delay: 0s; }
//         .auth-wrapper.toggled .welcome-section.signin .slide-element:nth-child(2) { transition-delay: 0.1s; }

//         .welcome-section.signup {
//           left: 0;
//           text-align: left;
//           padding: 0 150px 60px 38px;
//           pointer-events: none;
//         }
//         .welcome-section.signup .slide-element {
//           transform: translateX(-120%);
//           transition: 0.7s ease;
//           opacity: 0;
//           filter: blur(10px);
//         }
//         .welcome-section.signup .slide-element:nth-child(1) { transition-delay: 0s; }
//         .welcome-section.signup .slide-element:nth-child(2) { transition-delay: 0.1s; }

//         .auth-wrapper.toggled .welcome-section.signup .slide-element {
//           transform: translateX(0%);
//           opacity: 1;
//           filter: blur(0);
//         }
//         .auth-wrapper.toggled .welcome-section.signup .slide-element:nth-child(1) { transition-delay: 1.7s; }
//         .auth-wrapper.toggled .welcome-section.signup .slide-element:nth-child(2) { transition-delay: 1.8s; }

//         .welcome-section h2 {
//           text-transform: uppercase;
//           font-size: 36px;
//           line-height: 1.3;
//           color: #fff;
//         }

//         /* --- FOOTER --- */
//         .auth-footer {
//           margin-top: 30px;
//           text-align: center;
//           font-size: 14px;
//           color: #fff;
//         }
//         .auth-footer a {
//           color: #818cf8;
//           text-decoration: none;
//           font-weight: 600;
//         }
//         .auth-footer a:hover { text-decoration: underline; color: #a5b4fc; }

//         /* --- MOBILE --- */
//         @media (max-width: 768px) {
//           .auth-wrapper { height: auto; min-height: 500px; }
//           .credentials-panel, .welcome-section { width: 100%; position: relative; }
//           .credentials-panel.signin, .credentials-panel.signup { padding: 40px 30px; left: 0; right: 0; }
//           .credentials-panel.signin { display: flex; }
//           .credentials-panel.signup { display: none; }
//           .auth-wrapper.toggled .credentials-panel.signin { display: none; }
//           .auth-wrapper.toggled .credentials-panel.signup { display: flex; }
//           .credentials-panel.signin .slide-element,
//           .credentials-panel.signup .slide-element {
//             transform: translateY(0); opacity: 1; filter: blur(0);
//           }
//           .welcome-section { display: none; }
//           .background-shape, .secondary-shape { display: none; }
//         }
//         @media (max-width: 480px) {
//           .credentials-panel.signin, .credentials-panel.signup { padding: 30px 20px; }
//           .credentials-panel h2 { font-size: 24px; }
//         }
//       `}</style>

//       {toast.show && (
//         <Toast
//           type={toast.type}
//           message={toast.message}
//           onClose={() => setToast({ ...toast, show: false })}
//         />
//       )}

//       <div className="auth-page">
//         <div className={`auth-wrapper ${toggled ? "toggled" : ""}`}>
//           <div className="background-shape"></div>
//           <div className="secondary-shape"></div>

//           {/* ===== LOGIN PANEL (LEFT) ===== */}
//           <div className="credentials-panel signin">
//             <h2 className="slide-element">Login</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="field-wrapper slide-element">
//                 <input type="email" name="email" value={data.email} onChange={handleChange} required />
//                 <label>Email Address</label>
//                 <i className="fa-solid fa-envelope"></i>
//               </div>

//               <div className="field-wrapper slide-element">
//                 <input type="password" name="password" value={data.password} onChange={handleChange} required />
//                 <label>Password</label>
//                 <i className="fa-solid fa-lock"></i>
//               </div>

//               <div className="field-wrapper slide-element">
//                 <button className="submit-button" type="submit">Login</button>
//               </div>

//               <div className="switch-link slide-element">
//                 <Link to="/forgotpassword" style={{ color: "#f87171", fontSize: "13px" }}>
//                   Forgot Password?
//                 </Link>
//               </div>

//               <div className="switch-link slide-element">
//                 <p>
//                   Don't have an account?{" "}
//                   <a
//                     href="#"
//                     onClick={(e) => { e.preventDefault(); setToggled(true); }}
//                   >
//                     Sign Up
//                   </a>
//                 </p>
//               </div>
//             </form>
//           </div>

//           {/* ===== WELCOME BACK (RIGHT - visible on login) ===== */}
//           <div className="welcome-section signin">
//             <h2 className="slide-element">WELCOME BACK!</h2>
//           </div>

//           {/* ===== REGISTER PANEL (RIGHT) ===== */}
//           <div className="credentials-panel signup">
//             <h2 className="slide-element">Register</h2>
//             <form onSubmit={handleRegSubmit}>
//               <div className="field-wrapper slide-element">
//                 <input type="text" name="name" value={regData.name} onChange={handleRegChange} required />
//                 <label>Full Name</label>
//                 <i className="fa-solid fa-user"></i>
//               </div>

//               <div className="field-wrapper slide-element">
//                 <input type="email" name="email" value={regData.email} onChange={handleRegChange} required />
//                 <label>Email Address</label>
//                 <i className="fa-solid fa-envelope"></i>
//               </div>

//               <div className="field-wrapper slide-element">
//                 <input type="password" name="password" value={regData.password} onChange={handleRegChange} required />
//                 <label>Password</label>
//                 <i className="fa-solid fa-lock"></i>
//               </div>

//               <div className="field-wrapper slide-element" style={{ height: "50px" }}>
//                 <select name="type" value={regData.type} onChange={handleRegChange} required
//                   style={{ paddingTop: "15px" }}>
//                   <option value="" disabled>Select User Type</option>
//                   <option value="Renter">Renter</option>
//                   <option value="Owner">Owner</option>
//                   <option value="Admin">Admin</option>
//                 </select>
//               </div>

//               <div className="field-wrapper slide-element">
//                 <button className="submit-button" type="submit">Register</button>
//               </div>

//               <div className="switch-link slide-element">
//                 <p>
//                   Already have an account?{" "}
//                   <a
//                     href="#"
//                     onClick={(e) => { e.preventDefault(); setToggled(false); }}
//                   >
//                     Sign In
//                   </a>
//                 </p>
//               </div>
//             </form>
//           </div>

//           {/* ===== WELCOME (LEFT - visible on register) ===== */}
//           <div className="welcome-section signup">
//             <h2 className="slide-element">WELCOME!</h2>
//           </div>
//         </div>

//         <div className="auth-footer">
//           <p>Made with ❤️ by <Link to="/" rel="noreferrer">RentEase</Link></p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Toast from "../common/Toast";

// axios.defaults.withCredentials = true;


// const Login = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState({ email: "", password: "" });
//   const [toast, setToast] = useState({ show: false, type: "", message: "" });

//   const showToast = (type, message) => {
//     setToast({ show: true, type, message });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!data.email || !data.password) {
//       showToast("error", "Please fill all fields");
//     }

//     try {
//       const res = await axios.post("http://localhost:8001/api/user/login", data, { withCredentials: true });
//       if (res.data.success) {
//         showToast("success", res.data.message);
//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         const user = res.data.user;
//         setTimeout(() => {
//           switch (user.type) {
//             case "Admin":
//               navigate("/adminhome");
//               break;
//             case "Renter":
//               navigate("/renterhome");
//               break;
//             case "Owner":
//               if (user.granted === "ungranted") {
//                 showToast("error", "Your account is not yet confirmed by the admin");
//               } else {
//                 navigate("/ownerhome");
//               }
//               break;
//             default:
//               navigate("/login");
//               break;
//           }

//           window.location.reload();
//         }, 1000);
//       } else {
//         showToast("error", res.data.message);
//       }
//     } catch (err) {
//       showToast("error", err.response?.data?.message || "Login failed");
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col">
//       {toast.show && (
//         <Toast
//           type={toast.type}
//           message={toast.message}
//           onClose={() => setToast({ ...toast, show: false })}
//         />
//       )}

//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center">
//         <h2 className="text-3xl font-extrabold text-indigo-400 tracking-wide">
//           RentEase
//         </h2>
//         <div className="space-x-8 text-lg">
//           <Link to="/" className="text-gray-200 hover:text-indigo-400 transition">
//             Home
//           </Link>
//           <Link to="/login" className="text-gray-200 hover:text-indigo-400 transition">
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="text-black bg-indigo-400 px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
//           >
//             Register
//           </Link>
//         </div>
//       </nav>

//       {/* Login Form */}
//       <div className="flex-grow flex justify-center items-center px-4 pt-20">
//         <div className="bg-gray-900/80 border border-gray-700 backdrop-blur-md shadow-2xl rounded-xl w-full max-w-md p-8">
//           <div className="text-center mb-6">
//             <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-3xl font-bold shadow-inner">
//               🔒
//             </div>
//             <h1 className="text-2xl font-semibold mt-4 text-white">Sign In</h1>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
//             />
//             <input
//               type="password"
//               name="password"
//               value={data.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
//             />

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
//             >
//               Sign In
//             </button>

//             <div className="flex justify-between text-sm mt-4">
//               <Link to="/forgotpassword" className="text-red-400 hover:underline">
//                 Forgot Password?
//               </Link>
//               <Link to="/register" className="text-indigo-400 hover:underline">
//                 Create an Account
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [toggled, setToggled] = useState(false);

  // Auto-toggle to register if navigated from /register
  useEffect(() => {
    if (location.state?.showRegister) {
      setToggled(true);
    }
  }, [location.state]);

  // Register form state
  const [regData, setRegData] = useState({ name: "", email: "", password: "", type: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return showToast("error", "Please fill all fields");
    }
    try {
      const res = await axios.post("http://localhost:8001/api/user/login", data, { withCredentials: true });
      if (res.data.success) {
        showToast("success", res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        const user = res.data.user;
        setTimeout(() => {
          switch (user.type) {
            case "Admin": navigate("/adminhome"); break;
            case "Renter": navigate("/renterhome"); break;
            case "Owner":
              if (user.granted === "ungranted") {
                showToast("error", "Your account is not yet confirmed by the admin");
              } else {
                navigate("/ownerhome");
              }
              break;
            default: navigate("/login"); break;
          }
          window.location.reload();
        }, 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Login failed");
    }
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.password || !regData.type) {
      return showToast("error", "Please fill all fields");
    }
    try {
      const response = await axios.post("http://localhost:8001/api/user/register", regData, { withCredentials: true });
      if (response.data.success) {
        showToast("success", response.data.message);
        setTimeout(() => setToggled(false), 1000);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        * { font-family: 'DM Sans', 'Segoe UI', sans-serif; }

        .auth-page {
          min-height: 100vh;
          background: #080c14;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background-image: radial-gradient(ellipse 80% 50% at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 60%),
                            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139,92,246,0.05) 0%, transparent 60%);
        }

        .auth-wrapper {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 500px;
          border: 1px solid rgba(99,102,241,0.4);
          box-shadow: 0 0 40px rgba(99,102,241,0.2), 0 0 80px rgba(99,102,241,0.08);
          overflow: hidden;
          border-radius: 4px;
        }

        /* --- BACKGROUND SHAPES --- */
        .background-shape {
          position: absolute;
          right: 0;
          top: -5px;
          height: 600px;
          width: 850px;
          background: linear-gradient(45deg, #080c14, #6366f1);
          transform: rotate(10deg) skewY(40deg);
          transform-origin: bottom right;
          transition: 1.5s ease;
          transition-delay: 1.6s;
        }
        .auth-wrapper.toggled .background-shape {
          transform: rotate(0deg) skewY(0deg);
          transition-delay: 0.5s;
        }

        .secondary-shape {
          position: absolute;
          left: 250px;
          top: 100%;
          height: 700px;
          width: 850px;
          background: #080c14;
          border-top: 2px solid rgba(99,102,241,0.5);
          transform: rotate(0deg) skewY(0deg);
          transform-origin: bottom left;
          transition: 1.5s ease;
          transition-delay: 0.5s;
        }
        .auth-wrapper.toggled .secondary-shape {
          transform: rotate(-11deg) skewY(-41deg);
          transition-delay: 1.2s;
        }

        /* --- CREDENTIALS PANEL --- */
        .credentials-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .credentials-panel.signin { left: 0; padding: 0 40px; }
        .credentials-panel.signup { right: 0; padding: 0 60px; }

        .credentials-panel h2 {
          font-size: 32px;
          text-align: center;
          color: #fff;
        }

        /* --- SIGNIN SLIDE ELEMENTS --- */
        .credentials-panel.signin .slide-element {
          transform: translateX(0%);
          transition: 0.7s;
          opacity: 1;
        }
        .credentials-panel.signin .slide-element:nth-child(1) { transition-delay: 2.1s; }
        .credentials-panel.signin .slide-element:nth-child(2) { transition-delay: 2.2s; }
        .credentials-panel.signin .slide-element:nth-child(3) { transition-delay: 2.3s; }
        .credentials-panel.signin .slide-element:nth-child(4) { transition-delay: 2.4s; }
        .credentials-panel.signin .slide-element:nth-child(5) { transition-delay: 2.5s; }

        .auth-wrapper.toggled .credentials-panel.signin .slide-element {
          transform: translateX(-120%);
          opacity: 0;
        }
        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(1) { transition-delay: 0s; }
        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(2) { transition-delay: 0.1s; }
        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(3) { transition-delay: 0.2s; }
        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(4) { transition-delay: 0.3s; }
        .auth-wrapper.toggled .credentials-panel.signin .slide-element:nth-child(5) { transition-delay: 0.4s; }

        /* --- SIGNUP SLIDE ELEMENTS --- */
        .credentials-panel.signup .slide-element {
          transform: translateX(120%);
          transition: 0.7s ease;
          opacity: 0;
          filter: blur(10px);
        }
        .credentials-panel.signup .slide-element:nth-child(1) { transition-delay: 0s; }
        .credentials-panel.signup .slide-element:nth-child(2) { transition-delay: 0.1s; }
        .credentials-panel.signup .slide-element:nth-child(3) { transition-delay: 0.2s; }
        .credentials-panel.signup .slide-element:nth-child(4) { transition-delay: 0.3s; }
        .credentials-panel.signup .slide-element:nth-child(5) { transition-delay: 0.4s; }
        .credentials-panel.signup .slide-element:nth-child(6) { transition-delay: 0.5s; }
        .credentials-panel.signup .slide-element:nth-child(7) { transition-delay: 0.6s; }

        .auth-wrapper.toggled .credentials-panel.signup .slide-element {
          transform: translateX(0%);
          opacity: 1;
          filter: blur(0px);
        }
        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(1) { transition-delay: 1.7s; }
        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(2) { transition-delay: 1.8s; }
        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(3) { transition-delay: 1.9s; }
        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(4) { transition-delay: 1.9s; }
        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(5) { transition-delay: 2.0s; }
        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(6) { transition-delay: 2.1s; }
        .auth-wrapper.toggled .credentials-panel.signup .slide-element:nth-child(7) { transition-delay: 2.2s; }

        /* --- FIELD WRAPPER --- */
        .field-wrapper {
          position: relative;
          width: 100%;
          height: 50px;
          margin-top: 22px;
        }
        .field-wrapper input,
        .field-wrapper select {
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
        .field-wrapper select option { background: #080c14; color: #fff; }
        .field-wrapper input:focus,
        .field-wrapper input:valid {
          border-bottom: 2px solid #818cf8;
        }
        .field-wrapper select:focus { border-bottom: 2px solid #818cf8; }
        .field-wrapper label {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          font-size: 15px;
          color: rgba(255,255,255,0.6);
          transition: 0.5s;
          pointer-events: none;
        }
        .field-wrapper input:focus ~ label,
        .field-wrapper input:valid ~ label {
          top: -5px;
          color: #818cf8;
          font-size: 12px;
        }
        .field-wrapper i {
          position: absolute;
          top: 50%;
          right: 0;
          font-size: 18px;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.4);
        }
        .field-wrapper input:focus ~ i,
        .field-wrapper input:valid ~ i { color: #818cf8; }

        /* --- SUBMIT BUTTON --- */
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
          border: 1.5px solid #6366f1;
          overflow: hidden;
          z-index: 1;
          transition: 0.3s;
          letter-spacing: 0.03em;
        }
        .submit-button::before {
          content: "";
          position: absolute;
          height: 300%;
          width: 100%;
          background: linear-gradient(#080c14, #6366f1, #080c14, #6366f1);
          top: -100%;
          left: 0;
          z-index: -1;
          transition: 0.5s;
        }
        .submit-button:hover::before { top: 0; }

        /* --- SWITCH LINK --- */
        .switch-link {
          font-size: 13px;
          text-align: center;
          margin: 15px 0 8px;
          color: #fff;
        }
        .switch-link a {
          text-decoration: none;
          color: #818cf8;
          font-weight: 600;
        }
        .switch-link a:hover { text-decoration: underline; }

        /* --- WELCOME SECTION --- */
        .welcome-section {
          position: absolute;
          top: 0;
          height: 100%;
          width: 50%;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .welcome-section.signin {
          right: 0;
          text-align: right;
          padding: 0 40px 60px 150px;
        }
        .welcome-section.signin .slide-element {
          transform: translateX(0);
          transition: 0.7s ease;
          opacity: 1;
          filter: blur(0px);
        }
        .welcome-section.signin .slide-element:nth-child(1) { transition-delay: 2.0s; }
        .welcome-section.signin .slide-element:nth-child(2) { transition-delay: 2.1s; }

        .auth-wrapper.toggled .welcome-section.signin .slide-element {
          transform: translateX(120%);
          opacity: 0;
          filter: blur(10px);
        }
        .auth-wrapper.toggled .welcome-section.signin .slide-element:nth-child(1) { transition-delay: 0s; }
        .auth-wrapper.toggled .welcome-section.signin .slide-element:nth-child(2) { transition-delay: 0.1s; }

        .welcome-section.signup {
          left: 0;
          text-align: left;
          padding: 0 150px 60px 38px;
          pointer-events: none;
        }
        .welcome-section.signup .slide-element {
          transform: translateX(-120%);
          transition: 0.7s ease;
          opacity: 0;
          filter: blur(10px);
        }
        .welcome-section.signup .slide-element:nth-child(1) { transition-delay: 0s; }
        .welcome-section.signup .slide-element:nth-child(2) { transition-delay: 0.1s; }

        .auth-wrapper.toggled .welcome-section.signup .slide-element {
          transform: translateX(0%);
          opacity: 1;
          filter: blur(0);
        }
        .auth-wrapper.toggled .welcome-section.signup .slide-element:nth-child(1) { transition-delay: 1.7s; }
        .auth-wrapper.toggled .welcome-section.signup .slide-element:nth-child(2) { transition-delay: 1.8s; }

        .welcome-section h2 {
          text-transform: uppercase;
          font-size: 36px;
          line-height: 1.3;
          color: #fff;
        }

        /* --- FOOTER --- */
        .auth-footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }
        .auth-footer a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 600;
        }
        .auth-footer a:hover { text-decoration: underline; color: #a5b4fc; }

        /* --- MOBILE --- */
        @media (max-width: 768px) {
          .auth-wrapper { height: auto; min-height: 500px; }
          .credentials-panel, .welcome-section { width: 100%; position: relative; }
          .credentials-panel.signin, .credentials-panel.signup { padding: 40px 30px; left: 0; right: 0; }
          .credentials-panel.signin { display: flex; }
          .credentials-panel.signup { display: none; }
          .auth-wrapper.toggled .credentials-panel.signin { display: none; }
          .auth-wrapper.toggled .credentials-panel.signup { display: flex; }
          .credentials-panel.signin .slide-element,
          .credentials-panel.signup .slide-element {
            transform: translateY(0); opacity: 1; filter: blur(0);
          }
          .welcome-section { display: none; }
          .background-shape, .secondary-shape { display: none; }
        }
        @media (max-width: 480px) {
          .credentials-panel.signin, .credentials-panel.signup { padding: 30px 20px; }
          .credentials-panel h2 { font-size: 24px; }
        }
      `}</style>

      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="auth-page">
        <div className={`auth-wrapper ${toggled ? "toggled" : ""}`}>
          <div className="background-shape"></div>
          <div className="secondary-shape"></div>

          {/* ===== LOGIN PANEL (LEFT) ===== */}
          <div className="credentials-panel signin">
            <h2 className="slide-element">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="field-wrapper slide-element">
                <input type="email" name="email" value={data.email} onChange={handleChange} required />
                <label>Email Address</label>
                <i className="fa-solid fa-envelope"></i>
              </div>

              <div className="field-wrapper slide-element">
                <input type="password" name="password" value={data.password} onChange={handleChange} required />
                <label>Password</label>
                <i className="fa-solid fa-lock"></i>
              </div>

              <div className="field-wrapper slide-element">
                <button className="submit-button" type="submit">Login</button>
              </div>

              <div className="switch-link slide-element">
                <Link to="/forgotpassword" style={{ color: "#f87171", fontSize: "13px" }}>
                  Forgot Password?
                </Link>
              </div>

              <div className="switch-link slide-element">
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setToggled(true); }}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* ===== WELCOME BACK (RIGHT - visible on login) ===== */}
          <div className="welcome-section signin">
            <h2 className="slide-element">WELCOME BACK!</h2>
          </div>

          {/* ===== REGISTER PANEL (RIGHT) ===== */}
          <div className="credentials-panel signup">
            <h2 className="slide-element">Register</h2>
            <form onSubmit={handleRegSubmit}>
              <div className="field-wrapper slide-element">
                <input type="text" name="name" value={regData.name} onChange={handleRegChange} required />
                <label>Full Name</label>
                <i className="fa-solid fa-user"></i>
              </div>

              <div className="field-wrapper slide-element">
                <input type="email" name="email" value={regData.email} onChange={handleRegChange} required />
                <label>Email Address</label>
                <i className="fa-solid fa-envelope"></i>
              </div>

              <div className="field-wrapper slide-element">
                <input type="password" name="password" value={regData.password} onChange={handleRegChange} required />
                <label>Password</label>
                <i className="fa-solid fa-lock"></i>
              </div>

              <div className="field-wrapper slide-element" style={{ height: "50px" }}>
                <select name="type" value={regData.type} onChange={handleRegChange} required
                  style={{ paddingTop: "15px" }}>
                  <option value="" disabled>Select User Type</option>
                  <option value="Renter">Renter</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>

              <div className="field-wrapper slide-element">
                <button className="submit-button" type="submit">Register</button>
              </div>

              <div className="switch-link slide-element">
                <p>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setToggled(false); }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* ===== WELCOME (LEFT - visible on register) ===== */}
          <div className="welcome-section signup">
            <h2 className="slide-element">WELCOME!</h2>
          </div>
        </div>

        <div className="auth-footer">
          <p>Made with ❤️ by <a href="#" target="_blank" rel="noreferrer">RentEase</a></p>
        </div>
      </div>
    </>
  );
};

export default Login;