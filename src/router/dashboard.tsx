import { createHashRouter, RouteObject } from 'react-router-dom';
import DashboardApp from '@/dashboard/App';
import WorkFlows from '@/dashboard/pages/Workflows';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardApp />,
    children: [
      {
        index: true,
        element: <WorkFlows />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
