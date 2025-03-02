import { NextRelease } from 'semantic-release';

import { ChannelConfiguration } from '../../configuration';
import { isDefaultChannel } from './is-default-channel';
import { isSameChannel } from './is-same-channel';

export function getChannelConfiguration(
  nextRelease: NextRelease,
  channelConfigurations: Array<ChannelConfiguration>,
): ChannelConfiguration | undefined {
  const { channel } = nextRelease;
  if (isDefaultChannel(channel)) {
    return channelConfigurations.find((configuration) =>
      isDefaultChannel(configuration.channel),
    );
  }

  return channelConfigurations.find((configuration) =>
    isSameChannel(configuration.channel, channel),
  );
}
