interface ListResponse<T> {
  items: T[];
  count: number;
}

interface InsertResponse<T> {
  id: T;
}

interface UpdateResponse<T> {
  id: T;
}

interface TokenStorage {
  token: string | null;
}

interface TagsCount {
  tag: string;
  count: number;
}
