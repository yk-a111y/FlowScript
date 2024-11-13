import React, { createContext, useContext, PropsWithChildren } from 'react';

interface UiTabPanelsProps {
  modelValue?: string | number;
  cache?: boolean;
}

// type of context
interface UiTabPanelsContextType {
  modelValue: string | number;
  cache: boolean;
}

// create context
const UiTabPanelsContext = createContext<UiTabPanelsContextType | undefined>(
  undefined
);

const UiTabPanels: React.FC<PropsWithChildren<UiTabPanelsProps>> = ({
  modelValue = '',
  cache = false,
  children,
}) => {
  // transform props to obj
  const props = { modelValue, cache };

  return (
    <UiTabPanelsContext.Provider value={props}>
      <div className="ui-tab-panels">{children}</div>
    </UiTabPanelsContext.Provider>
  );
};

// useContext Hook
const useUiTabPanels = (): UiTabPanelsContextType => {
  const context = useContext(UiTabPanelsContext);
  if (!context) {
    throw new Error('useUiTabPanels must be used within a UiTabPanels');
  }
  return context;
};

export { UiTabPanels, useUiTabPanels };
