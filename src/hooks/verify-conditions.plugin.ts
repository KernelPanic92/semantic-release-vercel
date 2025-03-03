import SemanticReleaseError from '@semantic-release/error';
import { isEmpty, isNil, trim } from 'lodash-es';
import { VerifyConditionsContext } from 'semantic-release';

import { PluginConfiguration } from '../configuration';
import { VERCEL_TEAM_ID_ENV_NAME, VERCEL_TOKEN_ENV_NAME } from '../constants';
import { getError } from '../errors';
import { fulfillOptions } from './fulfill-options';

export async function verifyConditions(
  pluginConfig: PluginConfiguration,
  context: VerifyConditionsContext,
): Promise<void> {
  const { globalOptions } = fulfillOptions(pluginConfig);
  const errors: SemanticReleaseError[] = [];

  const vercelToken =
    globalOptions?.client?.token ?? context.env[VERCEL_TOKEN_ENV_NAME];

  if (isNil(vercelToken)) {
    errors.push(getError('ENOVERCELTOKEN'));
  } else if (isEmpty(trim(vercelToken))) {
    errors.push(getError('EINVALIDVERCELTOKEN'));
  }

  const vercelTeamId =
    globalOptions?.client?.teamId ?? context.env[VERCEL_TEAM_ID_ENV_NAME];
  if (isNil(vercelTeamId)) {
    errors.push(getError('ENOVERCELTEAMID'));
  } else if (isEmpty(trim(vercelTeamId))) {
    errors.push(getError('EINVALIDVERCELTEAMID'));
  }

  if (isEmpty(errors)) {
    return;
  }

  throw new AggregateError(errors);
}
