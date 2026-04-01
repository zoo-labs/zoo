export type QueryReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
};

export type TanstackQueryOptions = {
  enabled: boolean
}
