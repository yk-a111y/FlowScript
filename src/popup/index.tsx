import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/popup.tsx';
import '@public/styles/tailwind.css';
import '@public/styles/fonts.css';
import '@public/styles/flow.css';
import '@public/styles/style.css';
import '../index.css';

if (import.meta.hot) {
  import.meta.hot.accept();
}

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
