import { DeepPartial } from '../utils';
import type { PluginConfiguration } from './plugin-configuration';

export const defaultPluginConfiguration: DeepPartial<PluginConfiguration> = {
  channels: [
    {
      channel: false,
      target: 'production',
    },
    {
      channel: 'next',
      target: 'preview',
    },
    {
      channel: 'next-major',
      target: 'preview',
    },
    {
      channel: 'beta',
      target: 'beta',
    },
    {
      channel: 'alpha',
      target: 'alpha',
    },
  ],
};
