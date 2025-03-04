import { cn } from '@/lib/utils';
import React, { createContext, useState, useEffect } from 'react';

// create context
export const TabPanelsContext = createContext({
  modelValue: { value: '' },
  cache: { value: false },
});

interface UiTabPanelsProps {
  modelValue: string | number;
  onChange: (value: string | number) => void;
  cache?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
/**
 * UiTabPanels
 */
const UiTabPanels = ({
  modelValue = '',
  onChange,
  cache = false,
  children,
  className,
  style,
}) => {
  // create context value
  const [contextValue, setContextValue] = useState({
    modelValue: { value: modelValue },
    cache: { value: cache },
  });

  // when props change, update context
  useEffect(() => {
    setContextValue({
      modelValue: { value: modelValue },
      cache: { value: cache },
    });
  }, [modelValue, cache]);

  /**
   * handle tab change
   * @param {string|number} value - new tab value
   */
  const handleTabChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  // provide contextValue to child components
  const providerValue = {
    ...contextValue,
    setModelValue: handleTabChange,
  };

  return (
    <TabPanelsContext.Provider value={providerValue}>
      <div className={cn('ui-tab-panels', className)} style={style}>
        {children}
      </div>
    </TabPanelsContext.Provider>
  );
};

export default UiTabPanels;
