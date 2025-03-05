import {
  type DeploymentOptions,
  type VercelClientOptions,
} from '@vercel/client';
import { isNil } from 'lodash-es';
import type { PublishContext } from 'semantic-release';

import type {
  ChannelConfiguration,
  PluginConfiguration,
} from '../../configuration';
import { DeepPartial } from '../../utils';
import { mergePluginConfigurationWithDefaults } from '../merge-plugin-configuration-with-defaults';
import { createDeploymentOptionsForChannel } from './create-deployment-options-for-channel';
import { deploy } from './deploy';
import { getChannelConfiguration } from './get-channel-configuration';

export async function publish(
  options: DeepPartial<PluginConfiguration> | undefined,
  context: PublishContext,
): Promise<void> {
  const { logger, nextRelease } = context;

  const pluginConfiguration: PluginConfiguration =
    mergePluginConfigurationWithDefaults(context, options);

  const channelConfiguration: ChannelConfiguration | undefined =
    getChannelConfiguration(nextRelease, pluginConfiguration.channels ?? []);

  if (isNil(channelConfiguration)) {
    const missingChannelMessage = `Skip ${nextRelease.gitTag} publish to Vercel - missing channel configuration for ${nextRelease.channel}`;
    logger.warn(missingChannelMessage);

    return;
  }

  const clientOptions: VercelClientOptions =
    pluginConfiguration.globalOptions.client;

  const deploymentOptions: DeploymentOptions =
    createDeploymentOptionsForChannel(
      context,
      pluginConfiguration,
      channelConfiguration,
    );

  logger.info(`Publishing ${nextRelease.gitTag} to Vercel`);

  await deploy(clientOptions, deploymentOptions, logger);
}
