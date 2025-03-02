import type { DeploymentOptions } from '@vercel/client';

export type SemanticReleaseVercelDeploymentOptions = Omit<
  DeploymentOptions,
  'version' | 'autoAssignCustomDomains' | 'gitMetadata'
>;
