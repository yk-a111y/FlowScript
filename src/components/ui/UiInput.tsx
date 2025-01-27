import * as React from 'react';

import { cn } from '@/lib/utils';
import UiIcon from './UiIcon';

interface InputProps extends React.ComponentProps<'input'> {
  prependIcon?: string;
}

const UiInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prependIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {prependIcon && (
          <UiIcon
            name={prependIcon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
          />
        )}
        <input
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            prependIcon && 'pl-10',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
UiInput.displayName = 'UiInput';

export default UiInput;
