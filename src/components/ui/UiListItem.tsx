import React from 'react';

interface UiListItemProps {
  active?: boolean;
  disabled?: boolean;
  small?: boolean;
  tag?: React.ElementType;
  color?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const UiListItem: React.FC<UiListItemProps> = ({
  active = false,
  disabled = false,
  small = false,
  tag = 'div',
  color = 'bg-primary text-primary dark:bg-secondary dark:text-secondary bg-opacity-10 dark:bg-opacity-10',
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const Tag = tag as React.ElementType;

  const classNames = [
    'ui-list-item flex w-full items-center rounded-lg transition focus:outline-none',
    active ? color : 'hoverable',
    small ? 'p-2' : 'py-2 px-4',
    disabled ? 'pointer-events-none bg-opacity-75' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('🚀 ~ onClick ~ e:', e);
    // 调用外部传入的onClick处理器
    onClick();
  };

  return (
    <Tag role="listitem" className={classNames} {...rest} onClick={handleClick}>
      {children}
    </Tag>
  );
};

export default UiListItem;
