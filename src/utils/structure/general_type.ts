export interface typeBasicFuncReturn<E, S> {
  isError: boolean;
  data: E | S;
}

export interface offsetLimit {
  offset?: number;
  limit?: number;
}
