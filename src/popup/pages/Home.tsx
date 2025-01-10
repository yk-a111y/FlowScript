import { useEffect } from 'react';
import BackgroundUtils from '@/background/backgroundUtils';

const PopupHome = () => {
  const toDashboard = () => {
    BackgroundUtils.openDashboard('');
  };

  useEffect(() => {
    console.log('useEffect');
  }, []);

  return (
    <>
      {/* Header bg */}
      <div className="absolute top-0 left-0 w-full rounded-b-2xl bg-accent h-48" />
      <div className="dark relative z-10 px-5 pt-8 text-white placeholder:text-black">
        <div className="mb-4 flex items-center">
          {/* Title */}
          <h1 className="text-xl font-semibold text-white">FlowScript</h1>
          <div className="grow"></div>
          {/* Function */}
          <button className="text-white" onClick={toDashboard}>
            Go Dashboard
          </button>
        </div>
      </div>
    </>
  );
};

export default PopupHome;
