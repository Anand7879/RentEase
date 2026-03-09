# 🏠 RentEase

> A full-stack rental property web application that connects Property Owners and Renters on a single seamless platform.

**Live Demo:** [https://hunthouse.netlify.app](https://hunthouse.netlify.app)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)

---

## About

RentEase is a modern rental property platform with three distinct user roles:

- **Owner** — List, manage, and update property listings. Approve or reject booking requests.
- **Renter** — Browse, filter, and book available properties. Track booking history.
- **Admin** — Full platform oversight. Monitor all users, properties, and bookings.

---

## Features

### 🏡 Home Page
- Dark-themed UI with full-screen hero carousel
- Live property feed from database
- Features section with animated cards
- Responsive navbar with role-based navigation

### 👤 Authentication
- Register as Owner or Renter
- JWT-based authentication with HTTP-only cookies
- Role-based access control
- Admin portal with separate login

### 🏢 Owner Dashboard
- Add new properties with images (stored on Cloudinary)
- Edit and delete existing listings
- View all personal property listings
- Approve or reject Renter booking requests

### 🔍 Renter Dashboard
- Browse all available properties with images
- Real-time filtering by address, property type, and ad type (Rent/Sale)
- Detailed property modal with owner contact and pricing
- Simple booking form — just name and phone number
- Full booking history with status tracking

### ⚙️ Admin Dashboard
- View all registered users with roles
- Monitor all property listings across the platform
- Track all booking transactions platform-wide

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework and build tool |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| Context API | Global state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | File upload handling |
| Cloudinary | Permanent image storage |
| cookie-parser | Cookie management |
| dotenv | Environment variables |
| cors | Cross-origin requests |

### Deployment
| Service | Purpose |
|---|---|
| Netlify | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |
| Cloudinary | Image CDN |

---

## Project Structure

```
RentEase/
├── Backend/
│   ├── config/
│   │   └── connect.js              # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js      # Admin logic
│   │   ├── ownerController.js      # Owner logic
│   │   └── userController.js       # Auth & user logic
│   ├── middlewares/
│   │   └── authMiddleware.js       # JWT verification
│   ├── models/
│   │   ├── BookingSchema.js        # Booking model
│   │   ├── PropertySchema.js       # Property model
│   │   └── UserSchema.js           # User model
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── ownerRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── index.js                    # Express app entry point
│   └── package.json
│
└── Frontend/
    ├── public/
    │   └── _redirects              # Netlify SPA redirect
    ├── src/
    │   ├── modules/
    │   │   ├── admin/
    │   │   │   ├── AdminLogin.jsx
    │   │   │   ├── AdminHome.jsx
    │   │   │   ├── AllUsers.jsx
    │   │   │   ├── AllProperty.jsx
    │   │   │   └── AllBookings.jsx
    │   │   ├── common/
    │   │   │   ├── Home.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── Register.jsx
    │   │   │   └── Toast.jsx
    │   │   └── user/
    │   │       ├── AllPropertiesCards.jsx
    │   │       ├── owner/
    │   │       │   ├── OwnerHome.jsx
    │   │       │   ├── AddProperty.jsx
    │   │       │   ├── AllProperties.jsx
    │   │       │   └── AllBookings.jsx
    │   │       └── renter/
    │   │           ├── RenterHome.jsx
    │   │           └── AllProperties.jsx
    │   ├── App.jsx                 # Routes & UserContext
    │   └── main.jsx
    ├── netlify.toml
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repository
```bash
git clone https://github.com/Anand7879/RentEase.git
cd RentEase
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder (see [Environment Variables](#environment-variables)).

```bash
node index.js
```

Backend runs on `http://localhost:8001`

### 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables

Create `Backend/.env` with the following:

```env
PORT=8001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Deployment

### Frontend — Netlify
1. Connect your GitHub repo to Netlify
2. Set **Base directory** to `Frontend`
3. Build command: `npm install && node node_modules/vite/bin/vite.js build`
4. Publish directory: `Frontend/dist`

`Frontend/netlify.toml`:
```toml
[build]
  command = "npm install && node node_modules/vite/bin/vite.js build"
  publish = "dist"
```

`Frontend/public/_redirects`:
```
/*    /index.html   200
```

### Backend — Render
1. Connect your GitHub repo to Render
2. Set **Root directory** to `Backend`
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add all environment variables in the **Environment** tab

---

## API Endpoints

### User Routes — `/api/user`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout user |
| GET | `/getAllProperties` | Get all properties (public) |
| POST | `/bookinghandle/:propertyId` | Book a property |

### Owner Routes — `/api/owner`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/postproperty` | Add new property with images |
| GET | `/getallproperties` | Get owner's properties |
| DELETE | `/deleteproperty/:propertyid` | Delete a property |
| PATCH | `/updateproperty/:propertyid` | Update a property |
| GET | `/getallbookings` | Get owner's bookings |
| POST | `/handlebookingstatus` | Approve or reject booking |

### Admin Routes — `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/getallusers` | Get all users |
| GET | `/getallproperties` | Get all properties |
| GET | `/getallbookings` | Get all bookings |

---

## User Roles

| Role | Access |
|---|---|
| **Renter** | Browse properties, book properties, view booking history |
| **Owner** | Add/edit/delete properties, manage booking requests |
| **Admin** | View all users, properties, and bookings platform-wide |

> ⚠️ Admin accounts can only be created directly in the database — registration is restricted to Owner and Renter roles only.

---

## Author

**Anand** — [GitHub](https://github.com/Anand7879)

---

## License

This project is open source and available under the [MIT License](LICENSE).