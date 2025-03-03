import React from 'react';
import { useTabContext } from './UiTabs';

interface UiTabProps {
  disabled?: boolean;
  value: string | number;
  children: React.ReactNode;
}

const UiTab: React.FC<UiTabProps> = ({ disabled = false, value, children }) => {
  const tabContext = useTabContext();

  const isActive = tabContext.activeValue === value;

  const handleClick = () => {
    if (!disabled) {
      tabContext.updateActive(value);
    }
  };

  return (
    <button
      aria-selected={isActive}
      className={`
        ui-tab z-[1] transition-colors focus:ring-0
        ${tabContext.type}
        ${disabled ? 'pointer-events-none opacity-75' : ''}
        ${tabContext.small ? 'small' : ''}
        ${tabContext.fill ? 'flex-1' : ''}
        ${isActive ? 'is-active' : ''}
      `}
      tabIndex={isActive ? 0 : -1}
      role="tab"
      disabled={disabled}
      onMouseEnter={tabContext.hoverHandler}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default UiTab;
