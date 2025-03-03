import { VERCEL_TEAM_ID_ENV_NAME, VERCEL_TOKEN_ENV_NAME } from '../constants';
import { stringify } from '../utils';
import { SemanticReleaseErrorData } from './semantic-release-error-data';

export function EINVALIDVERCELTOKEN(): SemanticReleaseErrorData {
  return {
    message: 'Invalid Vercel token.',
    details: `The Vercel Token configured in the \`${VERCEL_TOKEN_ENV_NAME}\` environment variable or in \`globalOptions.client.token\` options variable must be a valid [vercel token](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token).
  
  Please make sure to set the \`${VERCEL_TOKEN_ENV_NAME}\` environment variable in your CI with the correct value or \`globalOptions.client.token\` options in semantic release configuration file.`,
  };
}

export function ENOVERCELTOKEN(): SemanticReleaseErrorData {
  return {
    message: 'No Vercel token specified.',
    details: `A [vercel token](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token) must be set in the \`${VERCEL_TOKEN_ENV_NAME}\` environment variable on your CI environment or in \`globalOptions.client.token\` options variable in semantic release configuration file.
  
  Please make sure to set the \`${VERCEL_TOKEN_ENV_NAME}\` environment variable in your CI with the correct value or \`globalOptions.client.token\` options in semantic release configuration file.`,
  };
}

export function EINVALIDVERCELTEAMID(): SemanticReleaseErrorData {
  return {
    message: 'Invalid Vercel Team ID.',
    details: `The Vercel team id configured in the \`${VERCEL_TEAM_ID_ENV_NAME}\` environment variable or in \`globalOptions.client.teamId\` options variable must be a valid [vercel team id](https://vercel.com/docs/accounts/create-a-team).
    
    Please make sure to set the \`${VERCEL_TEAM_ID_ENV_NAME}\` environment variable in your CI with the correct value or \`globalOptions.client.teamId\` options in semantic release configuration file.`,
  };
}

export function ENOVERCELTEAMID(): SemanticReleaseErrorData {
  return {
    message: 'No Vercel Team ID specified.',
    details: `A [vercel team id](https://vercel.com/docs/accounts/create-a-team) must be set in the \`${VERCEL_TEAM_ID_ENV_NAME}\` environment variable on your CI environment or in \`globalOptions.client.teamId\` options variable in semantic release configuration file.
    
    Please make sure to set the \`${VERCEL_TEAM_ID_ENV_NAME}\` environment variable in your CI with the correct value or \`globalOptions.client.teamId\` options in semantic release configuration file.`,
  };
}

export function EVERCELCHECKSCONCLUSIONFAILED(data: {
  payload: unknown;
}): SemanticReleaseErrorData {
  return {
    message: 'Vercel checks conclusion failed.',
    details: `Vercel checks conclusion failed, due to:
    
    ${stringify(data.payload)}`,
  };
}

export function EVERCELDEPLOY(data: {
  payload: { errorCode: string; errorMessage: string };
}): SemanticReleaseErrorData {
  return {
    message: 'Error during Vercel Deployment.',
    details: `Deployment failed with code ${data.payload.errorCode} due to: \`${data.payload.errorMessage}\`
      
    ${stringify(data.payload)}`,
  };
}
