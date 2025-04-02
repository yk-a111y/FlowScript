import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useWorkflowStore } from '@/store/workflow';
import Sidebar from './components/Sidebar';

const DashBoardApp = () => {
  const loadData = useWorkflowStore((state) => state.loadData);

  // Init Workflow Data
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard-app flex h-full min-h-screen">
      <Sidebar />
      <div className="dashboard-main flex flex-col flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardApp;
