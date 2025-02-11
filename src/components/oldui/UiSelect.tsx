import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { IconType } from 'react-icons';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  prependIcon?: IconType;
  block?: boolean;
  disabled?: boolean;
  showDetail?: boolean;
  placeholder?: string;
}

const UiSelect = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      prependIcon: PrependIcon,
      placeholder,
      block = false,
      disabled = false,
      children,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('ui-select cursor-pointer', !block && 'inline-block')}>
        {label && (
          <label className="ml-1 text-sm text-gray-600 dark:text-gray-200">
            {label}
          </label>
        )}

        <div className="ui-select__content relative flex w-full items-center">
          {PrependIcon && (
            <PrependIcon
              size={20}
              className="absolute left-0 ml-2 text-gray-600 dark:text-gray-200"
            />
          )}

          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              'bg-input z-10 h-full w-full appearance-none rounded-lg px-4 py-2 pr-10 transition',
              className
            )}
            onChange={onChange}
            {...props}
          >
            {placeholder && (
              <option className="text-gray-400" value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>

          <RiArrowDropDownLine
            size={28}
            className="absolute right-0 mr-2 text-gray-600 dark:text-gray-200"
          />
        </div>
      </div>
    );
  }
);

UiSelect.displayName = 'UiSelect';

export default UiSelect;
