export function dbTimeForHuman(time: string) {
  return new Date(time).toLocaleString();
}
