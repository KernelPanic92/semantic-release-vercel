import { SemanticReleaseVercelDeploymentOptions } from "./deployment-options";

/**
 * Object for release settings on Vercel for the specified Semantic Release distribution channel.
 */
export interface ChannelConfiguration
  extends SemanticReleaseVercelDeploymentOptions {
  /**
   * The Semantic Release distribution channel on which to publish releases to Vercel.
   *
   * If this field is set to false, the branch will be released on the default distribution channel (production).
   *
   * For all other branches, if the channel property is not set, the channel name will be the same as the branch name.
   */
  channel?: string | false | undefined;
}
