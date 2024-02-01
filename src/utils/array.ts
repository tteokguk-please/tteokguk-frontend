export const differenceArray = <T>(one: T[], another: T[]) =>
  one.filter((item) => !another.includes(item));
