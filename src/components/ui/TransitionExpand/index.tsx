import { CSSTransition } from 'react-transition-group';
import { PropsWithChildren } from 'react';
import './index.css';

interface TransitionExpandProps extends PropsWithChildren {
  show: boolean;
}

const TransitionExpand = ({ children, show }: TransitionExpandProps) => {
  return (
    <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
      <>{children}</>
    </CSSTransition>
  );
};

export default TransitionExpand;
