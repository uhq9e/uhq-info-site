interface SiteStorage {
  id: number;
  file_name: string;
  key: string;
  size: number;
  hash: string;
  kind: number;
  mime_type: string;
  created_by?: number;
  created_at: string;
}

interface Novel {
  id: number;
  title: string;
  description?: string;
  author_name: string;
  author_url?: string;
  nsfw: boolean;
  object_id?: number;
  created_by?: number;
  created_at: string;
  object?: SiteStorage;
}
