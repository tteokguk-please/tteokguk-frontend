export type Filter<TOrigin, TAllowed> = TOrigin extends TAllowed ? TOrigin : never;
