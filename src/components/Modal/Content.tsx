import { XIcon } from '@/libs/utils/Icon';
import { ModalProps } from '@/types/modaltype';
import { useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useModalContext } from './Root';

interface ModalContentProps extends ModalProps {
  icon?: boolean;
  popover?: boolean;
}

export default function ModalContent(props: ModalContentProps) {
  const { children, icon, popover, className } = props;
  const {
    open: currentOpenState,
    handleOpenChange,
    trigger,
  } = useModalContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && overlayRef.current === event.target) {
      if (handleOpenChange) {
        handleOpenChange(false);
      }
    }
  };

  const handleClose = () => {
    if (handleOpenChange) {
      handleOpenChange(false);
    }
  };

  const position = useMemo(() => {
    if (!trigger?.current) {
      return { x: 0, y: 0 };
    }
    const rect = trigger.current.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y + rect.height,
    };
  }, [trigger?.current]);

  const renderPortal = () => {
    if (currentOpenState) {
      return createPortal(
        <div>
          {popover ? (
            <div
              style={{
                top: position.y,
                left: position.x - 100,
              }}
              className={`absolute h-400 w-400 rounded-xl bg-custom-green-100 px-20 py-24 shadow-lg ${className}`}
            >
              {icon && (
                <XIcon
                  onClick={handleClose}
                  className="absolute right-20 top-20 cursor-pointer"
                />
              )}
              {children}
            </div>
          ) : (
            <div
              ref={overlayRef}
              className={`fixed inset-0 flex items-center justify-center bg-custom-black/70`}
              onClick={handleClickOverlay}
            >
              <div
                className={`min-w-300 relative z-50 h-auto w-auto flex-col rounded-lg bg-custom-gray-100 p-20 ${className}`}
              >
                {icon && (
                  <XIcon
                    onClick={handleClose}
                    className="absolute right-20 top-20 cursor-pointer"
                  />
                )}
                {children}
              </div>
            </div>
          )}
        </div>,
        document.body,
      );
    }
    return null;
  };

  return <>{renderPortal()}</>;
}