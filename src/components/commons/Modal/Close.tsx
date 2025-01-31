import { ModalProps } from '@/types/modaltype';

import Button from '../Button';
import { useModalContext } from './Root';

interface ModalCloseProps extends ModalProps {
  confirm?: boolean;
  onConfirm?: () => void;
}

export default function ModalClose(props: ModalCloseProps) {
  const { children, confirm, onConfirm, className } = props;
  const { handleOpenChange } = useModalContext();

  const handleCloseClick = () => {
    if (handleOpenChange) {
      handleOpenChange(false);
    }
  };

  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (handleOpenChange) {
      handleOpenChange(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-10 pt-10">
        {confirm && (
          <Button
            variant="inactiveButton"
            className={`flex-center h-40 w-full rounded-md ${className}`}
            onClick={handleCloseClick}
          >
            아니오
          </Button>
        )}
        <Button
          variant="activeButton"
          className={`flex-center h-40 w-full rounded-md ${className}`}
          onClick={handleConfirmClick}
        >
          {children}
        </Button>
      </div>
    </>
  );
}
