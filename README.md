# CaterServ - Frontend (Client)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

This is the frontend client for the **CaterServ** web application, providing an elegant and high-performance user interface for customers to explore catering services, view events, and place orders. 

### 🚀 Live Deployment
**Frontend Production URL:** [https://restaurant-frontend-amber-kappa.vercel.app/](https://restaurant-frontend-amber-kappa.vercel.app/)

---

## 🌟 Key Features

*   **Modern UI/UX:** Built with React, featuring smooth Framer Motion animations and responsive grid layouts.
*   **State Management:** State, caching, and API interactions are robustly managed through **Redux Toolkit (RTK Query)**.
*   **Authentication Flow:** Secure, stateless JWT verification relying heavily on Authorization Headers.
*   **Performance:** Code-splitting and optimized builds via Vite. Includes skeleton loaders (`react-loading-skeleton`) for seamless content fetching.
*   **Admin Dashboard:** Dedicated `/dash` routes for administrative CRUD operations (Managing Events, Teams, Blogs, Services).

## 📂 Project Architecture

*   `src/app/store.js`: Centralized Redux store configuration.
*   `src/services/`: RTK Query slices connecting dynamically to the backend API.
*   `src/features/Website/`: Public-facing components (Home, Menu, Contact, Blog).
*   `src/features/Admin/`: Protected admin dashboard logic and layout components.
*   `src/routes/`: Routing logic handling separation of concerns natively using `react-router-dom`.

## 🛠️ Local Development Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the `/client` directory.
   ```env
   # Leave blank to use Vite's local dev proxy, OR point to the local backend:
   VITE_API_URL=http://localhost:3000/api
   ```
   *(Note: In production (Vercel), this variable is set to the live Render backend URL).*

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Vite will spin up the local server, typically accessible at `http://localhost:5173`. 
   *Note: `vite.config.js` is automatically configured to proxy `/api` requests to a local `localhost:3000` backend server when testing locally without a strict environment variable.*

## 🚢 Deployment (Vercel)

The application is optimized for Vercel. 
*   **Build Command:** `npm run build`
*   **Output Directory:** `dist`
*   **Fallback Routing:** A `vercel.json` configuration file is included in the root to ensure proper Single Page Application (SPA) routing. This redirects 404 navigation requests safely back to `index.html`.
