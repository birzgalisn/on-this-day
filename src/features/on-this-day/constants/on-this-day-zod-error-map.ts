import { isZodError } from '~/lib/is-zod-error';

export const ON_THIS_DAY_ZOD_ERROR_MAP = Object.freeze({
  true: 'Could not process events. Please report this issue',
  false: 'Something went wrong. Could not fetch events for today',
}) satisfies Record<`${ReturnType<typeof isZodError>}`, string>;
