import { createHashRouter, RouteObject } from 'react-router-dom';
import DashboardApp from '@/dashboard/App';
import Workflows from '@/dashboard/pages/Workflows';
import WorkflowDetail from '@/dashboard/pages/WorkflowDetail';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardApp />,
    children: [
      {
        index: true, // default route
        element: <Workflows />,
      },
      {
        path: 'workflow/:id',
        element: <WorkflowDetail />,
      },
    ],
  },
];

const router = createHashRouter(routes);

export default router;
