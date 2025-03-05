import { DeploymentOptions } from '@vercel/client';
import { defaultsDeep, first, isNil, omit } from 'lodash-es';
import { AnalyzeCommitsContext } from 'semantic-release';

import { ChannelConfiguration, PluginConfiguration } from '../../configuration';

export const createDeploymentOptionsForChannel = (
  context: AnalyzeCommitsContext,
  pluginConfiguration: PluginConfiguration,
  channel: ChannelConfiguration,
): DeploymentOptions => {
  const channelDeployment: DeploymentOptions = omit(channel, 'channel');

  const lastCommit = first(context.commits);
  const gitMetadata = isNil(lastCommit)
    ? void 0
    : {
        commitAuthorName: lastCommit.author.name,
        commitMessage: lastCommit.message,
        commitSha: lastCommit.hash,
        commitRef: lastCommit.commit.long,
      };

  return defaultsDeep(
    {},
    { gitMetadata, autoAssignCustomDomains: true },
    channelDeployment,
    pluginConfiguration.globalOptions?.deployment,
  );
};
