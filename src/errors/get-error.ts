import SemanticReleaseError from '@semantic-release/error';

import * as ERRORS from './errors';
import { SemanticReleaseErrorData } from './semantic-release-error-data';

export function getError<
  TCode extends keyof typeof ERRORS,
  TContext extends Parameters<(typeof ERRORS)[TCode]> extends infer P
    ? P extends unknown[]
      ? P
      : never
    : never,
>(code: TCode, ...context: TContext): SemanticReleaseError {
  const errorFn = ERRORS[code] as (
    ...args: TContext
  ) => SemanticReleaseErrorData;

  const { message, details } = errorFn(...context);

  return new SemanticReleaseError(message, code, details);
}
