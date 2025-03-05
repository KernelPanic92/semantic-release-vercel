import { defaultsDeep } from 'lodash-es';
import { VerifyConditionsContext } from 'semantic-release';

import {
  defaultPluginConfiguration,
  PluginConfiguration,
} from '../configuration';
import { VERCEL_TEAM_ID_ENV_NAME, VERCEL_TOKEN_ENV_NAME } from '../constants';
import { DeepPartial } from '../utils';

export const mergePluginConfigurationWithDefaults = (
  context: VerifyConditionsContext,
  options: DeepPartial<PluginConfiguration> | undefined,
): PluginConfiguration => {
  const runtimePluginConfiguration: DeepPartial<PluginConfiguration> = {
    globalOptions: {
      client: {
        token: context.env[VERCEL_TOKEN_ENV_NAME],
        teamId: context.env[VERCEL_TEAM_ID_ENV_NAME],
        path: process.cwd(),
      },
    },
  };

  return defaultsDeep(
    {},
    options,
    defaultPluginConfiguration,
    runtimePluginConfiguration,
  );
};
