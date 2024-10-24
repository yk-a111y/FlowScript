import logo from '@public/assets/img/icon.png';
import { Link, Outlet } from 'react-router-dom';

const DashBoardApp = () => {
  // const tabs = [
  //   {
  //     id: 'workflow',
  //     icon: 'riFlowChart',
  //     path: '/workflows',
  //     // shortcut: getShortcut('page:workflows', '/workflows'),
  //   },
  //   {
  //     id: 'packages',
  //     icon: 'mdiPackageVariantClosed',
  //     path: '/packages',
  //     shortcut: '',
  //   },
  //   {
  //     id: 'schedule',
  //     icon: 'riTimeLine',
  //     path: '/schedule',
  //     // shortcut: getShortcut('page:schedule', '/triggers'),
  //   },
  //   {
  //     id: 'storage',
  //     icon: 'riHardDrive2Line',
  //     path: '/storage',
  //     // shortcut: getShortcut('page:storage', '/storage'),
  //   },
  //   {
  //     id: 'log',
  //     icon: 'riHistoryLine',
  //     path: '/logs',
  //     // shortcut: getShortcut('page:logs', '/logs'),
  //   },
  //   {
  //     id: 'settings',
  //     icon: 'riSettings3Line',
  //     path: '/settings',
  //     // shortcut: getShortcut('page:settings', '/settings'),
  //   },
  // ];
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
