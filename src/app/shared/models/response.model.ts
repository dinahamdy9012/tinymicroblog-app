export interface APIResponse<T> {
  total: number;
  data: T;
  errorCode: string;
}