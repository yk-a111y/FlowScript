import { createHashRouter, RouteObject } from 'react-router-dom';
import PopupApp from '@/popup/App';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PopupApp />,
  },
];

const router = createHashRouter(routes);

export default router;
