import { isEmpty, isNil, trim } from 'lodash-es';
import { VerifyConditionsContext } from 'semantic-release';

import { PluginConfiguration } from '../configuration';
import { VERCEL_TEAM_ID_ENV_NAME, VERCEL_TOKEN_ENV_NAME } from '../constants';
import { fulfillOptions } from './fulfill-options';

export async function verifyConditions(
  pluginConfig: PluginConfiguration,
  context: VerifyConditionsContext,
): Promise<void> {
  const { globalOptions } = fulfillOptions(pluginConfig);
  const vercelToken =
    globalOptions?.client?.token ?? context.env[VERCEL_TOKEN_ENV_NAME];

  if (isNil(vercelToken)) {
    throw new Error(`Missing ${VERCEL_TOKEN_ENV_NAME}`);
  }

  if (isEmpty(trim(vercelToken))) {
    throw new Error(`Empty ${VERCEL_TOKEN_ENV_NAME}`);
  }

  const vercelTeamId =
    globalOptions?.client?.teamId ?? context.env[VERCEL_TEAM_ID_ENV_NAME];
  if (isNil(vercelTeamId)) {
    throw new Error(`Missing ${VERCEL_TEAM_ID_ENV_NAME}`);
  }

  if (isEmpty(trim(vercelTeamId))) {
    throw new Error(`Empty ${VERCEL_TEAM_ID_ENV_NAME}`);
  }
}
