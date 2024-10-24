import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/dashboard.tsx';
import '@public/assets/css/tailwind.css';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
