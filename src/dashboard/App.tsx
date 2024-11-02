import { useWorkflowStore } from '@/store/workflow';
import logo from '@public/assets/img/icon.png';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoardApp = () => {
  const { loadData } = useWorkflowStore();

  // Init State
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="text-red-600 m-4">
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center bg-yellow-100 py-6 dark:bg-gray-800">
        <img src={logo} className="mx-auto mb-4 w-10" />
        <div>
          <Link to={'/'}>workflow</Link>
        </div>
      </aside>
      <main className="pl-16">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashBoardApp;
