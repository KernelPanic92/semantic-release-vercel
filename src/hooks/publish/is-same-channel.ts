export function isSameChannel(
  channel: string | false | null | undefined,
  otherChannel: string | false | null | undefined,
) {
  return channel === otherChannel || (!channel && !otherChannel);
}
