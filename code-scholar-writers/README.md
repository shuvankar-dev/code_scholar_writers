# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# API Configuration Issues - SOLUTION

## Problem Summary:
Your API calls are failing because you have hardcoded API URLs scattered across multiple files, and they're not switching properly between local development (XAMPP) and production.

## Files That Need Updating:
The following files have hardcoded API URLs that need to be updated:

1. `src/pages/FAQPage.tsx` ✅ (Fixed)
2. `src/components/PriceCalculator.tsx` ✅ (Fixed) 
3. `src/components/BlogPage.tsx`
4. `src/components/SingleBlogPage.tsx`
5. `src/components/admin/AdminBlogManagement.tsx`
6. `src/components/admin/AdminDashboard.tsx`
7. `src/components/admin/AdminFAQManagement.tsx`
8. `src/components/admin/AdminLogin.tsx`
9. `src/components/admin/AdminMasterPrice.tsx`
10. `src/components/admin/AdminOrders.tsx`
11. `src/components/admin/AdminRegister.tsx`

## Quick Fix Instructions:

### Step 1: Configure your API URLs
Edit `src/config/api.ts` and set the correct URLs:

```typescript
// FOR LOCAL DEVELOPMENT (XAMPP):
export const API_BASE_URL = 'http://localhost/codescholarwriters-api';

// FOR PRODUCTION:
// export const API_BASE_URL = 'https://your-domain.com/codescholarwriters-api';
```

### Step 2: Check Your XAMPP Setup
Make sure your XAMPP has the API files in the correct location:
- XAMPP htdocs path: `C:\xampp\htdocs\codescholarwriters-api\`
- API should be accessible at: `http://localhost/codescholarwriters-api/get_faqs.php`

### Step 3: Test API Endpoints
Open these URLs in your browser to verify they work:
- http://localhost/codescholarwriters-api/get_faqs.php
- http://localhost/codescholarwriters-api/get_blogs.php
- http://localhost/codescholarwriters-api/admin/get_prices.php

## Current Configuration:
I've set your API to use local XAMPP for testing. The configuration will:
1. Always use `http://localhost/codescholarwriters-api` for now
2. Log the API URL to console for debugging
3. You can switch to production by uncommenting the production line

## Next Steps:
1. Start your XAMPP server
2. Make sure MySQL is running
3. Test the API endpoints manually
4. Check browser console for any errors
5. The React app should now work with your local API

## Production Deployment:
When ready for production:
1. Upload your API files to your hosting server
2. Update the production URL in `api.ts`
3. Uncomment the production line
4. Comment out the local line

Let me know if you need help with any of these steps!

# Production Readiness Checklist

## Current Status: 🔄 PARTIALLY READY

### ✅ Completed:
1. **Centralized API Configuration** - Created `src/config/api.ts`
2. **Auto Environment Detection** - Detects localhost vs production
3. **Updated Core Files**:
   - ✅ `src/pages/FAQPage.tsx`
   - ✅ `src/components/PriceCalculator.tsx` 
   - ✅ `src/components/BlogPage.tsx`

### ⚠️ Still Needs Work:

#### **Critical Files to Update** (8 remaining):
1. `src/components/SingleBlogPage.tsx`
2. `src/components/admin/AdminBlogManagement.tsx`
3. `src/components/admin/AdminDashboard.tsx`
4. `src/components/admin/AdminFAQManagement.tsx`
5. `src/components/admin/AdminLogin.tsx`
6. `src/components/admin/AdminMasterPrice.tsx`
7. `src/components/admin/AdminOrders.tsx`
8. `src/components/admin/AdminRegister.tsx`

#### **Production Deployment Steps**:

### **STEP 1: Verify Your Production API Setup**
Check that your production server has:
- ✅ API files uploaded to correct path
- ✅ Database connected with production credentials
- ✅ CORS headers configured
- ✅ File permissions set correctly

Test these URLs on your production server:
```
https://srv1992.hstgr.io/codescholarwriters-api/get_faqs.php
https://srv1992.hstgr.io/codescholarwriters-api/get_blogs.php
https://srv1992.hstgr.io/codescholarwriters-api/admin/get_prices.php
```

### **STEP 2: Update Production URL** (if needed)
Current production URL in `api.ts`:
```
production: 'https://srv1992.hstgr.io/codescholarwriters-api'
```

If your API is at a different path, update it to:
```
production: 'https://your-actual-domain.com/path-to-api'
```

### **STEP 3: Final Production Preparation**
Before going live:

1. **Remove Debug Logs** - Remove console.log from `api.ts`
2. **Test All Endpoints** - Verify FAQ, Blog, Admin functions work
3. **Update Remaining Files** - Convert remaining hardcoded URLs
4. **Build for Production** - Run `npm run build`

## **Quick Test Commands**:

### Test Current Setup:
```bash
# 1. Start development server
npm run dev

# 2. Check browser console for:
# "Environment: LOCAL" or "Environment: PRODUCTION"
# "API_BASE_URL: http://localhost/codescholarwriters-api"

# 3. Test FAQ page - should load without errors
```

### **Status: 70% Complete**
- Core infrastructure: ✅ Done
- Environment detection: ✅ Done  
- Critical files: 🔄 3/11 updated
- Production config: ⚠️ Needs verification
- Testing: ⚠️ Pending