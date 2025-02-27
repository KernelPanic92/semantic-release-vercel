import { defaultPluginConfiguration, PluginConfiguration } from "../configuration";
import { merge } from "lodash-es";

export function fulfillOptions(
        pluginConfiguration: PluginConfiguration,
  ): PluginConfiguration {
   return merge(
       {},
       defaultPluginConfiguration,
       pluginConfiguration
     );
  }