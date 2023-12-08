interface LocalFile {
  id: number;
  file_name?: string;
  path: string;
  created_at: string;
}

interface Author {
  id: number;
  name: string;
  urls?: string[];
}

interface ImageItem {
  id: number;
  urls?: string[];
  date: string;
  nsfw: boolean;
  author_id?: number;
  author?: Author;
  local_files: LocalFile[];
}
