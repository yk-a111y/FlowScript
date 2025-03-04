import React, { useContext } from 'react';
import { TabPanelsContext } from './UiTabPanels';
import { cn } from '@/lib/utils';

interface UiTabPanelProps {
  value: string | number;
  activeClass?: string;
  cache?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * UiTabPanel
 * as tab content panel, display or hide content based on current active value
 */
const UiTabPanel = ({
  value = '',
  activeClass = 'ui-tab-panel--active',
  className = '',
  cache,
  children,
}) => {
  // get current active value and cache setting from context
  const tabPanelsContext = useContext(TabPanelsContext);

  // handle empty context situation
  if (!tabPanelsContext) {
    console.warn('UiTabPanel must be used within a UiTabPanels component');
    return null;
  }

  // determine if this panel is the current active panel
  const isActive = value === tabPanelsContext.modelValue.value;

  // determine if content should be cached (use component level setting first, then use parent level setting)
  const shouldCache =
    cache !== undefined ? cache : tabPanelsContext.cache.value;

  // if not cached and not active, do not render any content
  if (!shouldCache && !isActive) {
    return null;
  }

  // render panel
  return (
    <div
      className={cn('ui-tab-panel', isActive ? activeClass : '', className)}
      style={{
        display: shouldCache && !isActive ? 'none' : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default UiTabPanel;
