import http from 'http';
import https from 'https';
import { defaultsDeep, isNil, startsWith } from 'lodash-es';
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

  const result: PluginConfiguration = defaultsDeep(
    {},
    options,
    defaultPluginConfiguration,
    runtimePluginConfiguration,
  );

  if (isNil(result.globalOptions.client.agent)) {
    const apiUrl = result.globalOptions.client.apiUrl;
    const isHttps = isNil(apiUrl) || startsWith(apiUrl, 'https');
    const agent = isHttps
      ? new https.Agent({ keepAlive: true })
      : new http.Agent({ keepAlive: true });
    result.globalOptions.client.agent = agent;
  }

  return result;
};
