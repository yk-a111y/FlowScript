import * as React from 'react';

import { cn } from '@/lib/utils';

const UiTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'ui-textarea ui-input bg-input w-full rounded-lg px-4 py-2 transition',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
UiTextarea.displayName = 'UiTextarea';

export default UiTextarea;
