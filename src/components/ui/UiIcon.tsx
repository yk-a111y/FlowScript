import { FC } from 'react';
import * as RemixIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

interface IconProps {
  size?: number;
  name: string;
  className?: string;
  rotate?: number;
}

const Icon: FC<IconProps> = ({ size = 24, name, className, rotate }) => {
  const IconComponent =
    (RemixIcons as Record<string, FC>)[name] ||
    (FaIcons as Record<string, FC>)[name] ||
    (MdIcons as Record<string, FC>)[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <div
      style={{ fontSize: size, transform: `rotate(${rotate}deg)` }}
      className={className}
    >
      <IconComponent />
    </div>
  );
};

export default Icon;
