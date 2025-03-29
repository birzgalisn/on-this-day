import { ZodError } from 'zod';

export function isZodError(error: unknown): error is ZodError {
  return (error as ZodError)?.name === 'ZodError';
}
