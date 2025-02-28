import * as React from 'react';

import { cn } from '@/lib/utils';
import UiIcon from './UiIcon';

interface InputProps extends React.ComponentProps<'input'> {
  prependIcon?: string;
  label?: string;
}

const UiInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prependIcon, label, ...props }, ref) => {
    return (
      <div className="input-ui inline-block w-full">
        {label && (
          <p className="ml-1 inline-block text-sm leading-none text-gray-600 dark:text-gray-200">
            {label}
          </p>
        )}
        <div className="relative w-full">
          {prependIcon && (
            <UiIcon
              name={prependIcon}
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
          )}
          <input
            className={cn(
              'bg-input flex h-12 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              prependIcon && 'pl-10',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
UiInput.displayName = 'UiInput';

export default UiInput;
