import { Cross } from '~/icons/cross';
import { Button } from '~/ui/button';
import './modal.css';

export type ModalProps = {
  title: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
} & Omit<React.HTMLProps<HTMLDivElement>, 'title' | 'onClick'>;

export function Modal({
  title,
  className = '',
  children,
  onClick,
  ...props
}: ModalProps) {
  return (
    <div className="modal">
      <div
        className={`modal-content full-width container column ${className}`}
        {...props}
      >
        <div className="modal-header">
          <h2 className="line-clamp line-clamp--single">{title}</h2>

          <Button variant="secondary" size="sm" onClick={onClick}>
            <Cross />
          </Button>
        </div>

        {children}
      </div>
    </div>
  );
}
