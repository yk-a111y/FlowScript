import React from 'react';
import { cn } from '@/lib/utils';

interface UiListProps {
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const UiList: React.FC<UiListProps> = ({
  disabled = false,
  children,
  className = '',
  style,
}) => {
  return (
    <div
      role="listbox"
      className={cn(
        'ui-list',
        disabled ? 'pointer-events-none' : '',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default UiList;
