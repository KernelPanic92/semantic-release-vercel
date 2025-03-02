import { DeploymentOptions } from '@vercel/client';
import { defaultsDeep, first, isNil } from 'lodash-es';
import { VerifyReleaseContext } from 'semantic-release';

import { ChannelConfiguration, VercelGlobalOptions } from '../../configuration';

export const fulfillDeploymentOptions = (
  context: VerifyReleaseContext,
  channelConfiguration: ChannelConfiguration,
  options: VercelGlobalOptions | undefined,
): DeploymentOptions => {
  const deployment = options?.deployment;
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
    channelConfiguration,
    deployment,
  );
};
