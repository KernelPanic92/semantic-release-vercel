import { inspect } from 'node:util';

import { isString } from 'lodash-es';

export const stringify = (value: unknown): string => {
  if (isString(value)) {
    return value;
  }

  return inspect(value, {
    breakLength: Number.POSITIVE_INFINITY,
    depth: 2,
    maxArrayLength: 5,
  });
};
