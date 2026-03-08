# Deployment Configuration & Fixes

## Issue 1: Netlify Frontend Build Error ✅ FIXED
**Error:** `Expected "finally" but found "else"` in Login.jsx:91

**Root Cause:** Missing `if (response.data.success)` condition in handleRegSubmit

**Fix Applied:** Added missing if condition around success check in register handler

---

## Issue 2: Render Backend Error ✅ FIXED
**Error:** `CloudinaryStorage is not a constructor` in ownerRoutes.js:25

**Root Cause:** Incorrect import syntax for multer-storage-cloudinary
```javascript
// ❌ WRONG
const { CloudinaryStorage } = require("multer-storage-cloudinary");
```

**Fix Applied:** Changed to correct import:
```javascript
// ✅ CORRECT
const CloudinaryStorage = require("multer-storage-cloudinary");
```

---

## Deployment Setup Guide

### Frontend (Netlify)

#### 1. Environment Variables
Create a `.env` file in your Frontend directory (DO NOT commit to git):
```
VITE_API_BASE_URL=https://your-backend-api.onrender.com
```

#### 2. Netlify Configuration
Your `netlify.toml` should have:
```toml
[build]
command = "npm install && npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

#### 3. Deploy Steps
1. Push code to GitHub (without .env file)
2. Connect repository to Netlify
3. In Netlify Dashboard → Site Settings → Build & Deploy → Environment
4. Add environment variable:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://your-render-url.onrender.com`
5. Trigger deploy
6. Verify build succeeds

### Backend (Render)

#### 1. Environment Variables (CRITICAL)
In Render Dashboard → Your Service → Environment:

Add all these required variables:
```
MONGO_DB=mongodb+srv://your_username:your_password@cluster.mongodb.net/database_name
JWT_KEY=your_secret_jwt_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=production
PORT=8001
```

#### 2. Render Configuration
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Node Version:** 22 (default is fine)

#### 3. Deploy Steps
1. Connect GitHub repository to Render
2. Set build/start commands (as above)
3. Go to Environment tab → Add all variables from .env.example
4. Click "Deploy"
5. Watch logs for successful startup

**Key Sign of Success in Render logs:**
```
[dotenv@17.2.1] injecting env (9) from .env
Connected to MongoDB
Server is running on port 8001
```

---

## Environment Variables Reference

### MongoDB Connection String
Get from: MongoDB Atlas Dashboard → Cluster → Connect → Connection String
- Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
- Replace `<password>` and `dbname`

### JWT Secret
- Generate a random string (minimum 32 characters)
- Keep it secret - never commit to git or share

### Cloudinary Credentials
Get from: Cloudinary Dashboard → Settings → API Keys
- `CLOUDINARY_CLOUD_NAME`: Your cloud name
- `CLOUDINARY_API_KEY`: Your API key (public)
- `CLOUDINARY_API_SECRET`: Your API secret (keep private!)

---

## Testing Checklist After Deployment

### Netlify Frontend
- [ ] Build succeeds (green checkmark)
- [ ] Site loads at your domain
- [ ] Can navigate to login page
- [ ] Can see all routes load without 404

### Render Backend
- [ ] Logs show "Connected to MongoDB"
- [ ] Logs show "Server is running on port 8001"
- [ ] No errors about missing environment variables
- [ ] Can make API requests to backend from frontend

### Full Integration Test
1. [ ] Go to frontend URL
2. [ ] Register a new user (should call backend)
3. [ ] Login should work
4. [ ] Navigate to different pages
5. [ ] Check browser Network tab for 200 responses from API
6. [ ] Check Render logs for no errors

---

## Troubleshooting

### Frontend Build Fails
**Check:**
- No syntax errors in .jsx files
- All imports are correct
- .env file has correct `VITE_API_BASE_URL`
- Run `npm run build` locally to test

### Backend Won't Start
**Check:**
- All environment variables are set in Render dashboard
- MongoDB connection string is correct (test in Mongo Atlas)
- Cloudinary credentials are valid
- No syntax errors in Node.js files
- Check Render logs for specific error message

### API Calls Fail (Frontend → Backend)
**Check:**
- Frontend .env has correct backend URL
- Backend is actually running (check Render logs)
- CORS is enabled in backend (check index.js)
- Network tab shows 401/403 vs 5xx errors

### Cloudinary Upload Not Working
**Check:**
- All 3 Cloudinary credentials are correct
- Cloudinary folder is set to "rentease-properties"
- File formats are allowed: jpg, jpeg, png, webp
- Account has upload permissions

---

## Files Modified for Deployment

✅ `Frontend/src/modules/common/Login.jsx` - Fixed syntax error
✅ `Backend/routes/ownerRoutes.js` - Fixed CloudinaryStorage import
✅ `Backend/.env.example` - Created (template for env vars)
✅ `Frontend/.env.example` - Created (template for env vars)
✅ `Frontend/src/config/apiConfig.js` - Created (uses VITE_API_BASE_URL)

---

## Next Deploy After Local Testing

### For Netlify (Frontend):
1. In VSCode, verify no errors: `npm run build` 
2. Push to GitHub
3. Netlify auto-deploys on push
4. Verify at: https://your-site-name.netlify.app

### For Render (Backend):
1. Verify locally: test endpoints with Postman
2. Push to GitHub
3. Render auto-deploys on push
4. Check logs in Render dashboard
5. Backend URL shown in Render dashboard (e.g., https://rentease-api.onrender.com)
6. Update frontend .env with this URL

---

## IMPORTANT: Never Commit .env Files
```bash
# Add to .gitignore (if not already there)
.env
.env.local
.env.*.local
```

Always use `.env.example` as template and create `.env` locally/in deployment platform only!
