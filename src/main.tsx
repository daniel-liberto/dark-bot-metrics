
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AdminApp from './AdminApp.tsx';
import './index.css';

// Determine which app to render based on URL path
const isAdminRoute = window.location.pathname.startsWith('/admin');

// Render the appropriate app
createRoot(document.getElementById("root")!).render(
  isAdminRoute ? <AdminApp /> : <App />
);
