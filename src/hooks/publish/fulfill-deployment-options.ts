import { DeploymentOptions } from "@vercel/client";
import { first, isNil } from "lodash-es";
import { VerifyReleaseContext } from "semantic-release";
import { ChannelConfiguration, VercelGlobalOptions } from "../../configuration";

export const fulfillDeploymentOptions = (context: VerifyReleaseContext, channelConfiguration: ChannelConfiguration, options: VercelGlobalOptions | undefined): DeploymentOptions => {
    const deployment = options?.deployment;
    const lastCommit = first(context.commits);
    const gitMetadata = isNil(lastCommit) ? void 0 : {
      commitAuthorName: lastCommit.author.name,
      commitMessage: lastCommit.message,
      commitSha: lastCommit.hash,
      commitRef: lastCommit.commit.long,
    };
  
    return {
      gitMetadata,
      build: channelConfiguration.build ?? deployment?.build,
      regions: channelConfiguration.regions ?? deployment?.regions,
      routes: channelConfiguration.routes ?? deployment?.routes,
      cleanUrls: channelConfiguration.cleanUrls ?? deployment?.cleanUrls,
      rewrites: channelConfiguration.rewrites ?? deployment?.rewrites,
      redirects: channelConfiguration.redirects ?? deployment?.redirects,
      headers: channelConfiguration.headers ?? deployment?.headers,
      trailingSlash: channelConfiguration.trailingSlash ?? deployment?.trailingSlash,
      builds: channelConfiguration.builds ?? deployment?.builds,
      functions: channelConfiguration.functions ?? deployment?.functions,
      env: channelConfiguration.env ?? deployment?.env,
      source: channelConfiguration.source ?? deployment?.source,
      target: channelConfiguration.target ?? deployment?.target,
      name: channelConfiguration.name ?? deployment?.name,
      public: channelConfiguration.public ?? deployment?.public,
      meta: channelConfiguration.meta ?? deployment?.meta,
      projectSettings: deployment?.projectSettings ??
        channelConfiguration.projectSettings,
      customEnvironmentSlugOrId: deployment?.customEnvironmentSlugOrId ??
        channelConfiguration.customEnvironmentSlugOrId,
      autoAssignCustomDomains: true,
    } satisfies DeploymentOptions;
  }