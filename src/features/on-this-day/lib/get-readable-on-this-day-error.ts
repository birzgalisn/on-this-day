import { isZodError } from '../../../lib/is-zod-error';
import { ON_THIS_DAY_ZOD_ERROR_MAP } from '../constants/on-this-day-zod-error-map';

export function getReadableOnThisDayError(error: unknown) {
  return ON_THIS_DAY_ZOD_ERROR_MAP[`${isZodError(error)}`];
}
