import { VercelClientOptions } from '@vercel/client';
import { defaultsDeep } from 'lodash-es';
import { VerifyReleaseContext } from 'semantic-release';

import { VercelGlobalOptions } from '../../configuration';
import {
  VERCEL_TEAM_ID_ENV_NAME,
  VERCEL_TOKEN_ENV_NAME,
} from '../../constants';

export const fulfillClientOptions = (
  context: VerifyReleaseContext,
  options: VercelGlobalOptions | undefined,
): VercelClientOptions => {
  const client = options?.client;

  return defaultsDeep({}, client, {
    token: context.env[VERCEL_TOKEN_ENV_NAME],
    teamId: context.env[VERCEL_TEAM_ID_ENV_NAME],
    path: process.cwd(),
  });
};
