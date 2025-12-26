# Deployment Troubleshooting Guide

## 🚨 Issue: "Something went wrong" on all pages

### Root Cause
The deployment is failing because of environment variable validation and potential SSR issues.

## ✅ Solutions Applied

### 1. Fixed Environment Validation
- **Problem**: `env.ts` was throwing errors when `API_BASE_URL` wasn't set
- **Fix**: Changed from `throw new Error()` to `console.warn()` with fallback values
- **Result**: App will use default API URL if environment variable is missing

### 2. Environment Variables for Render

Set these environment variables in your Render dashboard:

```bash
API_BASE_URL=https://wrensly-backend.onrender.com/api
BASE_URL=https://your-frontend-url.onrender.com
NODE_ENV=production
```

### 3. Build Commands for Render

Make sure your Render service is configured with:

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

## 🔧 Additional Debugging Steps

### 1. Check Render Logs
In your Render dashboard:
1. Go to your service
2. Click on "Logs" tab
3. Look for specific error messages during build/runtime

### 2. Test Locally with Production Build
```bash
npm run build
npm start
```

### 3. Check Network Issues
The app tries to connect to the backend API. If the backend is down or unreachable:
- The feed page will show "Error loading posts"
- Auth redirects might fail

### 4. Common Render Issues

**Build Failures:**
- Check if all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check for memory issues during build

**Runtime Failures:**
- Environment variables not set
- API endpoints unreachable
- SSR hydration mismatches

## 🚀 Quick Fix Checklist

1. ✅ **Environment Variables Set** in Render dashboard
2. ✅ **Build Command** configured correctly
3. ✅ **Start Command** configured correctly
4. ✅ **Backend API** is accessible from Render servers
5. ✅ **CORS** configured on backend to allow your frontend domain

## 🔍 Debug Commands

**Check environment in production:**
```javascript
console.log('API_BASE_URL:', process.env.API_BASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
```

**Test API connectivity:**
```bash
curl https://wrensly-backend.onrender.com/api/health
```

## 📞 Next Steps

1. **Deploy the fixed version** with the updated `env.ts`
2. **Set environment variables** in Render
3. **Check logs** for specific error messages
4. **Test API connectivity** between frontend and backend

If issues persist, check the Render logs for specific error messages and share them for further debugging.