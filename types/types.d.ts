interface ListResponse<T> {
  items: T[];
  count: number;
}

interface InsertResponse<T> {
  id: T;
}

interface TokenStorage {
  token: string | null;
}
