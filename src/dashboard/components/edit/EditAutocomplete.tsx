import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

interface EditAutocompleteProps extends PropsWithChildren {
  className?: string;
}

const EditAutocomplete: React.FC<EditAutocompleteProps> = ({
  className,
  children,
}) => {
  return <div className={cn(className)}>{children}</div>;
};

export default EditAutocomplete;
