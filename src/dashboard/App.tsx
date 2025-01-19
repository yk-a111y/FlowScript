import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useWorkflowStore } from '@/store/workflow';
import logo from '@public/assets/img/icon.png';

const DashBoardApp = () => {
  const { loadData } = useWorkflowStore();

  // Init Data
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard-app">
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center bg-yellow-100 py-6 dark:bg-gray-800">
        <img src={logo} className="mx-auto mb-4 w-10" />
        <div>
          <Link to={'/'}>workflow</Link>
        </div>
      </aside>
      <main className="pl-16">
        <div className="dashboard-main flex flex-col">
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoardApp;
