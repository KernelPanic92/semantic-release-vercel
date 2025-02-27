import { VercelClientOptions } from "@vercel/client";
import { VerifyReleaseContext } from "semantic-release";
import { VercelGlobalOptions } from "../../configuration";
import { VERCEL_TOKEN_ENV_NAME, VERCEL_TEAM_ID_ENV_NAME, VERCEL_API_URL } from "../../constants";

export const fulfillClientOptions = (context: VerifyReleaseContext, options: VercelGlobalOptions | undefined): VercelClientOptions => {
    const client = options?.client;
    return {
      token: client?.token ?? context.env[VERCEL_TOKEN_ENV_NAME],
      teamId: client?.teamId ?? context.env[VERCEL_TEAM_ID_ENV_NAME],
      path: context.cwd ?? options?.client?.path ?? process.cwd(),
      debug: client?.debug,
      apiUrl: client?.apiUrl ?? VERCEL_API_URL,
      force: client?.force,
      prebuilt: client?.prebuilt,
      vercelOutputDir: client?.vercelOutputDir,
      rootDirectory: client?.rootDirectory,
      withCache: client?.withCache,
      userAgent: client?.userAgent,
      defaultName: client?.defaultName,
      isDirectory: client?.isDirectory,
      skipAutoDetectionConfirmation: client?.skipAutoDetectionConfirmation,
      archive: client?.archive,
      agent: client?.agent,
    } satisfies VercelClientOptions;
  }
  