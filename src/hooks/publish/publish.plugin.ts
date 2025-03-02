import {
  type DeploymentOptions,
  type VercelClientOptions,
} from '@vercel/client';
import type { PublishContext } from 'semantic-release';

import type {
  ChannelConfiguration,
  PluginConfiguration,
} from '../../configuration';
import { fulfillOptions } from '../fulfill-options';
import { deploy } from './deploy';
import { fulfillClientOptions } from './fulfill-client-options';
import { fulfillDeploymentOptions } from './fulfill-deployment-options';
import { getChannelConfiguration } from './get-channel-configuration';

export async function publish(
  pluginConfiguration: PluginConfiguration,
  context: PublishContext,
): Promise<void> {
  const { logger, envCi, nextRelease } = context;
  const { isCi } = envCi;

  if (!isCi) {
    logger.warn(
      `Skip ${nextRelease.gitTag} tag creation in in a not known CI environment`,
    );
    return;
  }

  const { channels, globalOptions: options } =
    fulfillOptions(pluginConfiguration);

  const channelConfiguration: ChannelConfiguration | undefined =
    getChannelConfiguration(nextRelease, channels ?? []);

  if (!channelConfiguration) {
    const missingChannelMessage = `Skip ${nextRelease.gitTag} publish to Vercel - missing channel configuration for ${nextRelease.channel}`;
    logger.warn(missingChannelMessage);
    return;
  }

  const clientOptions: VercelClientOptions = fulfillClientOptions(
    context,
    options,
  );
  const deploymentOptions: DeploymentOptions = fulfillDeploymentOptions(
    context,
    channelConfiguration,
    options,
  );

  logger.info(`Publishing ${nextRelease.gitTag} to Vercel`);
  await deploy(clientOptions, deploymentOptions, logger);
}
