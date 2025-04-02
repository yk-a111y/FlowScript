import * as React from 'react';

import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface UiTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  max?: number;
}

const UiTextarea = React.forwardRef<HTMLTextAreaElement, UiTextareaProps>(
  ({ className, autoResize, max, ...props }, ref) => {
    useEffect(() => {
      if (!autoResize && ref && 'current' in ref && ref.current) {
        const textarea = ref.current;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, [autoResize, ref]);

    return (
      <textarea
        maxLength={max}
        className={cn(
          'ui-textarea ui-input bg-input w-full rounded-lg px-4 py-2 transition',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

UiTextarea.displayName = 'UiTextarea';

export default UiTextarea;
