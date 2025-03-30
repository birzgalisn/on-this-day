import { isZodError } from '../../../lib/is-zod-error';
import { ON_THIS_DAY_ZOD_ERROR_MAP } from '../constants/on-this-day-zod-error-map';
import { Modal, ModalProps } from '../../../ui/modal';

export type OnThisDayErrorModalProps = {
  error: unknown;
} & Pick<ModalProps, 'onClick'>;

export function OnThisDayErrorModal({
  error,
  onClick,
}: OnThisDayErrorModalProps) {
  return (
    <Modal title="Error" onClick={onClick}>
      <p>{ON_THIS_DAY_ZOD_ERROR_MAP[`${isZodError(error)}`]}</p>
    </Modal>
  );
}
