import React, { useState, useEffect, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import UiCard from './UiCard';
import UiIcon from './UiIcon';

interface UiModalProps extends PropsWithChildren {
  open: boolean;
  onClose?: () => void;
  teleportTo?: string;
  contentClass?: string;
  title?: string;
  padding?: string;
  contentPosition?: 'center' | 'start';
  customContent?: boolean;
  persist?: boolean;
  blur?: boolean;
  disableTeleport?: boolean;
  activator?: React.ReactNode;
  header?: React.ReactNode;
  headerAppend?: React.ReactNode;
}

const UiModal = ({
  open,
  onClose,
  teleportTo = 'body',
  contentClass = 'max-w-lg',
  title = '',
  padding = 'p-4',
  contentPosition = 'center',
  customContent = false,
  persist = false,
  blur = false,
  disableTeleport = false,
  children,
  activator,
  header,
  headerAppend,
}: UiModalProps) => {
  const [show, setShow] = useState(open);
  const positions = {
    center: 'items-center',
    start: 'items-start',
  };

  // sync the open state
  useEffect(() => {
    setShow(open);
  }, [open]);

  // press esc to close modal
  useEffect(() => {
    const keyupHandler = (event) => {
      if (event.code === 'Escape') closeModal();
    };

    if (show) {
      window.addEventListener('keyup', keyupHandler);
      toggleBodyOverflow(true);
    } else {
      window.removeEventListener('keyup', keyupHandler);
      toggleBodyOverflow(false);
    }

    return () => {
      window.removeEventListener('keyup', keyupHandler);
      toggleBodyOverflow(false);
    };
  }, [show]);

  const toggleBodyOverflow = (value) => {
    if (value) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  const closeModal = () => {
    if (persist) return;

    setShow(false);
    onClose && onClose(false);
  };

  const openModal = () => {
    setShow(true);
  };

  // 创建modal内容
  const modalContent = (
    <div className="modal-ui">
      {show && (
        <div
          className={`modal-ui__content-container z-50 flex justify-center overflow-y-auto ${positions[contentPosition]}`}
          style={blur ? { backdropFilter: 'blur(2px)' } : {}}
        >
          <div
            className="absolute h-full w-full bg-black bg-opacity-20 dark:bg-opacity-60"
            style={{ zIndex: -2 }}
            onClick={closeModal}
          />

          {customContent ? (
            children
          ) : (
            <UiCard
              className={`modal-ui__content w-full shadow-lg ${contentClass}`}
              padding={padding}
            >
              <div className="modal-ui__content-header mb-4">
                <div className="flex items-center justify-between">
                  <span className="content-header">{header || title}</span>
                  {headerAppend}
                  {!persist && (
                    <div className="cursor-pointer" onClick={closeModal}>
                      <UiIcon
                        name="RiCloseLine"
                        className="text-gray-600 dark:text-gray-300"
                      />
                    </div>
                  )}
                </div>
              </div>
              {typeof children === 'function'
                ? children({ close: closeModal })
                : children}
            </UiCard>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {activator && (
        <div className="modal-ui__activator">
          {typeof activator === 'function'
            ? activator({ open: openModal })
            : activator}
        </div>
      )}

      {disableTeleport
        ? modalContent
        : show &&
          createPortal(
            modalContent,
            typeof teleportTo === 'string'
              ? document.querySelector(teleportTo) || document.body
              : teleportTo
          )}
    </>
  );
};

export default UiModal;
