# semantic-release-vercel

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish a [vercel](https://vercel.com/) project using [vercel/client](https://github.com/vercel/vercel/blob/main/packages/client).


| Step               | Description                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `verifyConditions` | Verify the presence of the `VERCEL_TOKEN` and `VERCEL_TEAM_ID` environment variables |
| `publish`          | Publish the project to vercel.                                                  |                                                 |


## Install

**with npm:**
```bash
npm install --save-dev semantic-release-vercel
```

**with pnpm:**
```bash
pnpm add -D semantic-release-vercel
```

**with yarn:**
```bash
yarn add --dev semantic-release-vercel
```

**with bun:**
```bash
bun add -d semantic-release-vercel
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "semantic-release-vercel",
  ]
}
```

## Configuration

### Vercel authentication

The Vercel [token](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token) is **required** and can be set via [environment variables](#environment-variables) or [options](#options).

### Environment variables

| Variable    | Description                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `VERCEL_TOKEN` | Vercel token created via [Vercel site](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token) |
| `VERCEL_TEAM_ID` | Vercel team id obtained via [Vercel site](https://vercel.com/docs/accounts/create-a-team) |

### Options

A plugin configuration can be specified by wrapping the name and an options object in an array. Options configured this way will be passed only to that specific plugin.


| Option | Type | Description | Default |
|--------|------|-------------|---------|
|channels | [ChannelConfiguration[]](#channel-configuration) | Array of channel configurations defining deployment behavior for different [release channels](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#channel). | `Channels Default Configuration` |
| globalOptions | [Vercel Global Options](#vercel-global-options) | Global settings applying to all deployments, including Vercel client and deployment options. | `undefined` |

### Channel configuration

Channel extends [DeploymentOptions](https://github.com/vercel/vercel/blob/main/packages/client/src/types.ts) from @vercel/client, omitting the version, autoAssignCustomDomains, and gitMetadata fields. By default, each channel inherits its deployment configurations from the Vercel Global Options, ensuring a consistent setup across all deployments. However, individual channels can override these inherited settings, allowing for customized deployment behaviors specific to each distribution channel.

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| channel | string/false/undefined | The Semantic Release distribution channel to deploy to. If false, deploys to production. | Branch name |


**if no channels are provided in [Options](#options), the Channels Default Configuration is applied:**

```js
[
    {
      channel: false,
      target: "production", // vercel production deploy
    },
    {
      channel: "next",
      target: "preview", // vercel preview deploy
    },
    {
      channel: "next-major",
      target: "preview", // vercel preview deploy
    },
    {
      channel: "beta",
      target: "beta", // vercel custom beta branch deploy
    },
    {
      channel: "alpha",
      target: "alpha", // vercel custom alpha branch deploy
    },
]
```

### Vercel Global Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| client | [VercelClientOptions](https://github.com/vercel/vercel/blob/main/packages/client/src/types.ts) | Configuration options for interacting with the Vercel API. | `undefined` |
| deployment | [DeploymentOptions](https://github.com/vercel/vercel/blob/main/packages/client/src/types.ts) | Settings for customizing the deployment process. | `undefined` |

### npm configuration

The plugin uses the [`vercel` client](https://github.com/vercel/vercel/blob/main/packages/client) which will read the configuration from [`vercel.json`](https://vercel.com/docs/projects/project-configuration).

### Examples

#### Simple
```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-vercel"
    ]
  ]
}
```

#### Custom Channels
```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-vercel",
      {
        "channels": [
            {
                "channel": false,
                "target": "production",
            },
            {
                "channel": "develop",
                "target": "preview",
            }
        ]
      }
    ],
  ]
}
```

#### Custom Project Setting
```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-vercel",
      {
        "globalOptions": {
            "deployment": {
                "projectSettings": {
                    "framework": "angular",
                    "devCommand": "pnpm ng serve",
                    "installCommand": "pnpm i",
                    "buildCommand": "pnpm build",
                    "outputDirectory": "dist"
                }
            }
        }
      }
    ],
  ]
}
```
