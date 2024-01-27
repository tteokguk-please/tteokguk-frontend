export type Filter<TOrigin, TAllowed> = TOrigin extends TAllowed ? TOrigin : never;
export type KeyOf<T> = keyof T;
export type ValueOf<T> = T extends Array<unknown> | Readonly<Array<unknown>>
  ? T[number]
  : T[keyof T];
