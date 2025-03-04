import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react';

type TabType = 'default' | 'fill';

interface UiTabsProps {
  value: string | number;
  onChange: (id: string | number) => void;
  type?: TabType;
  color?: string;
  small?: boolean;
  fill?: boolean;
  children: React.ReactNode;
}

interface TabContextType {
  activeValue: string | number;
  updateActive: (id: string | number) => void;
  hoverHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
  type: TabType;
  color: string;
  small: boolean;
  fill: boolean;
}

// create context
export const TabContext = createContext<TabContextType | null>(null);

// hook for getting context for child components
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within a UiTabs component');
  }
  return context;
};

const UiTabs: React.FC<UiTabsProps> = ({
  value,
  onChange,
  type = 'default',
  color = 'bg-box-transparent',
  small = false,
  fill = false,
  children,
}) => {
  const tabTypes = {
    default: 'border-b',
    fill: 'p-2 rounded-lg',
  };

  const hoverIndicatorRef = useRef<HTMLDivElement>(null);
  const [showHoverIndicator, setShowHoverIndicator] = useState(false);

  const updateActive = useCallback(
    (id: string | number) => {
      onChange(id);
    },
    [onChange]
  );

  const hoverHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const isFill = type === 'fill';

      if (target.classList.contains('is-active') && isFill) {
        if (hoverIndicatorRef.current) {
          hoverIndicatorRef.current.style.display = 'none';
        }
        return;
      }

      const { height, width } = target.getBoundingClientRect();
      const elHeight = isFill ? height + 3 : height - 11;

      setShowHoverIndicator(true);

      if (hoverIndicatorRef.current) {
        hoverIndicatorRef.current.style.width = `${width}px`;
        hoverIndicatorRef.current.style.height = `${elHeight}px`;
        hoverIndicatorRef.current.style.display = 'inline-block';
        hoverIndicatorRef.current.style.transform = `translate(${target.offsetLeft}px, -50%)`;
      }
    },
    [type]
  );

  // 鼠标离开时隐藏悬停指示器
  const handleMouseLeave = () => {
    setShowHoverIndicator(false);
  };

  const contextValue = {
    activeValue: value,
    updateActive,
    hoverHandler,
    type,
    color,
    small,
    fill,
  };

  return (
    <TabContext.Provider value={contextValue}>
      <div
        className={`ui-tabs relative flex items-center space-x-1 text-gray-600 dark:text-gray-200 ${
          tabTypes[type] || tabTypes.default
        } ${type === 'fill' ? color : ''}`}
        role="tablist"
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={hoverIndicatorRef}
          className="ui-tabs__indicator bg-box-transparent absolute left-0 z-0 rounded-lg"
          style={{
            top: '50%',
            transform: 'translate(0, -50%)',
            display: showHoverIndicator ? 'block' : 'none',
          }}
        />
        {children}
      </div>
    </TabContext.Provider>
  );
};

export default UiTabs;
