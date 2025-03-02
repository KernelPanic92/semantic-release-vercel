import { VercelClientOptions } from '@vercel/client';

import { SemanticReleaseVercelDeploymentOptions } from './deployment-options';

export interface VercelGlobalOptions {
  client?: VercelClientOptions;
  deployment?: SemanticReleaseVercelDeploymentOptions;
}
