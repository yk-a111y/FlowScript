import { IconType } from 'react-icons';

interface UiIconProps {
  icon: IconType;
  size?: number;
}

const UiIcon = ({ icon: Icon, size = 24 }: UiIconProps) => {
  return <Icon size={size} />;
};

export default UiIcon;
