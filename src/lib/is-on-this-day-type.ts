import { onThisDaySchema, OnThisDayType } from '../schema/on-this-day';

export function isOnThisDayType(value: unknown): value is OnThisDayType {
  if (typeof value !== 'string' || !(value in onThisDaySchema.shape)) {
    return false;
  }

  return true;
}
