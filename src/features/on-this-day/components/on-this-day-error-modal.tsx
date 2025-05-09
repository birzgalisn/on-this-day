import { getReadableOnThisDayError } from '~/features/on-this-day/lib/get-readable-on-this-day-error';
import { Modal, ModalProps } from '~/ui/modal/modal';

export type OnThisDayErrorModalProps = {
  error: unknown;
} & Pick<ModalProps, 'onClick'>;

export function OnThisDayErrorModal({
  error,
  onClick,
}: OnThisDayErrorModalProps) {
  return (
    <Modal title="Error" onClick={onClick}>
      <p>{getReadableOnThisDayError(error)}</p>
    </Modal>
  );
}
