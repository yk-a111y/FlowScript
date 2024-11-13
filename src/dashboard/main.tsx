import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/dashboard.tsx';
import '@public/assets/css/tailwind.css';
import '@public/assets/css/fonts.css';
import '@public/assets/css/flow.css';
import '@public/assets/css/style.css';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
