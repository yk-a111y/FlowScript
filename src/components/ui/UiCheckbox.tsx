import React from 'react';
import UiIcon from './UiIcon';
import { cn } from '@/lib/utils';

interface UiCheckboxProps {
  className?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

export const UiCheckbox: React.FC<UiCheckboxProps> = ({
  className,
  checked = false,
  indeterminate = false,
  disabled = false,
  block = false,
  children,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={cn(
        'checkbox-ui',
        'items-center',
        block ? 'flex' : 'inline-flex',
        className
      )}
    >
      <div
        className={cn(
          'relative inline-block h-5 w-5 rounded focus-within:ring-2 focus-within:ring-accent',
          {
            'pointer-events-none opacity-75': disabled,
          }
        )}
      >
        <input
          type="checkbox"
          className={cn('checkbox-ui__input opacity-0', {
            indeterminate,
          })}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
        <div className="checkbox-ui__mark bg-input absolute top-0 left-0 cursor-pointer rounded border dark:border-gray-700">
          <UiIcon
            name={indeterminate ? 'RiSubtractLine' : 'RiCheckLine'}
            size={20}
            className="text-white dark:text-black"
          />
        </div>
      </div>
      {children && <span className="ml-2 inline-block">{children}</span>}
    </label>
  );
};

export default UiCheckbox;
