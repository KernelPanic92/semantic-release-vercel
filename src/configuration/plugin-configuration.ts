import type { ChannelConfiguration } from "./channel-configuration";
import { VercelGlobalOptions } from "./vercel-global-options";

export interface PluginConfiguration {
  channels?: ChannelConfiguration[];
  globalOptions?: VercelGlobalOptions;
}