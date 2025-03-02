/**
 * @type {import('semantic-release').GlobalConfig}
 */
const releaseConfig = {
  branches: [
    "main",
    {
      name: "next",
      channel: "next",
      prerelease: true,
    },
    "+([0-9])?(.{+([0-9]),x}).x",
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};

module.exports = releaseConfig;
