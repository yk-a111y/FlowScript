import { FC } from 'react';
import * as RemixIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

interface IconProps {
  size?: number;
  name: string;
}

const Icon: FC<IconProps> = ({ size = 24, name }) => {
  const IconComponent =
    (RemixIcons as Record<string, FC>)[name] ||
    (FaIcons as Record<string, FC>)[name] ||
    (MdIcons as Record<string, FC>)[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <div style={{ fontSize: size }}>
      <IconComponent />
    </div>
  );
};

export default Icon;
