import SemanticReleaseError from '@semantic-release/error';
import { isEmpty, isNil, startsWith, trim } from 'lodash-es';
import { VerifyConditionsContext } from 'semantic-release';

import { PluginConfiguration } from '../configuration';
import { getError } from '../errors';
import { DeepPartial } from '../utils';
import { mergePluginConfigurationWithDefaults } from './merge-plugin-configuration-with-defaults';

export async function verifyConditions(
  options: DeepPartial<PluginConfiguration> | undefined,
  context: VerifyConditionsContext,
): Promise<void> {
  const pluginConfiguration = mergePluginConfigurationWithDefaults(
    context,
    options,
  );
  const errors: SemanticReleaseError[] = [];

  const client = pluginConfiguration.globalOptions.client;
  const vercelToken = client.token;
  if (isNil(vercelToken)) {
    errors.push(getError('ENOVERCELTOKEN'));
  } else if (isEmpty(trim(vercelToken))) {
    errors.push(getError('EINVALIDVERCELTOKEN'));
  }

  const vercelTeamId = client.teamId;
  if (!isNil(vercelTeamId) && !startsWith(vercelTeamId, 'team_')) {
    context.logger.warn(
      "The Vercel Team Id does not begin with 'team_'. Are you sure it is correct?",
    );
  }

  if (isEmpty(errors)) {
    return;
  }

  throw new AggregateError(errors);
}
