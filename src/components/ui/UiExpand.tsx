import { PropsWithChildren } from 'react';
import UiIcon from './UiIcon';

interface UiExpandProps extends PropsWithChildren {
  header: React.ReactNode;
  headerClass: string;
  handleToggle: () => void;
  show: boolean;
}

const defaultHeaderClass = 'px-4 py-2 w-full flex items-center h-full';

const UiExpand = ({
  headerClass = defaultHeaderClass,
  header,
  handleToggle,
  show,
  children,
}: UiExpandProps) => {
  const toggleExpand = () => {
    handleToggle();
  };
  return (
    <div aria-expanded={show} className="ui-expand">
      <button className={headerClass} onClick={toggleExpand}>
        <UiIcon
          name="RiArrowLeftSLine"
          className="mr-2 -ml-1 transition-transform hidden"
        />
        {header}
        <UiIcon
          name="RiArrowLeftSLine"
          rotate={show ? 90 : -90}
          className="-mr-1 ml-2 transition-transform hidden"
        />
      </button>
      {show && <div className="ui-expand__panel">{children}</div>}
    </div>
  );
};

export default UiExpand;
