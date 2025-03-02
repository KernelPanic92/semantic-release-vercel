import { defaultsDeep } from 'lodash-es';

import {
  defaultPluginConfiguration,
  PluginConfiguration,
} from '../configuration';

export function fulfillOptions(
  pluginConfiguration: PluginConfiguration,
): PluginConfiguration {
  return defaultsDeep({}, pluginConfiguration, defaultPluginConfiguration);
}
