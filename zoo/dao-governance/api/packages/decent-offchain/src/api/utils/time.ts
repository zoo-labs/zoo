export const unixTimestamp = (date?: Date | null): number | null => {
  if (!date) return null;
  return Math.floor(date.getTime() / 1000);
};
