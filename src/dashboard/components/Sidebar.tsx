import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '@public/assets/img/icon.png';
import { cn } from '@/lib/utils';
import UiIcon from '@/components/ui/UiIcon';
import UiSeparator from '@/components/ui/UiSeparator';

const tabs = [
  { id: 'home', icon: 'RiFlowChart', path: '/' },
  { id: 'packages', icon: 'RiFolderAddLine', path: '/packages' },
  { id: 'schedule', icon: 'RiTimeLine' },
  { id: 'store', icon: 'RiHardDrive3Line' },
  { id: 'log', icon: 'RiHistoryLine' },
  { id: 'settings', icon: 'RiSettings3Line' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState<string>('home');
  const [showHoverIndicator, setShowHoverIndicator] = useState<boolean>(false);

  useEffect(() => {
    setActiveIcon(location.pathname.split('/')[1] || 'home');
  }, [location.pathname]);

  const hoverHandler = () => {
    setShowHoverIndicator(true);
  };

  const hoverOutHandler = () => {
    setShowHoverIndicator(false);
  };

  return (
    <div className="relative z-10 w-24 bg-white shadow-lg">
      <img src={logo} className="mx-auto mt-4 w-10" />
      <div className="flex flex-col items-center gap-8 py-10">
        {/* top area */}
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveIcon(item.id);
              if (item.path) {
                navigate(item.path);
              }
            }}
            onMouseEnter={hoverHandler}
            className={cn(
              'rounded-2xl p-3 transition-all duration-300 ease-in-out',
              activeIcon === item.id
                ? 'bg-black text-white scale-125 shadow-lg'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            )}
          >
            <UiIcon name={item.icon} />
          </button>
        ))}
        <UiSeparator className="w-16 bg-gray-200" />
        {/* selector */}
        <button
          className={cn(
            'rounded-2xl p-3 transition-all duration-300 ease-in-out',
            activeIcon === 'selector'
              ? 'bg-black text-white scale-125 shadow-lg'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          )}
          onClick={() => setActiveIcon('selector')}
        >
          <UiIcon name="RiFocus3Line" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
