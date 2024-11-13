import React, { ElementType } from 'react';

interface UiCardProps {
  hover?: boolean;
  padding?: string;
  tag?: ElementType;
  children: React.ReactNode;
  className?: string;
}

const UiCard = ({
  hover = false,
  padding = 'p-4',
  tag: Tag = 'div',
  children,
  className = '',
  ...attrs
}: UiCardProps) => {
  const classes = `ui-card rounded-lg bg-white dark:bg-gray-800 ${padding} ${
    hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
  } ${className}`; // merge classes

  return (
    <Tag className={classes} {...attrs}>
      {children}
    </Tag>
  );
};

export default UiCard;
