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

interface NewImageItem {
  urls?: (string | undefined)[];
  date: string;
  nsfw: boolean;
  author_id?: number;
  local_file_ids: string[];
}

type GroupedImageItems = [string, ImageItem[]];

type LocalImageType = "local";
type WebImageType = "web";

interface LocalImage {
  type: LocalImageType;
  file: File;
}

interface WebImage {
  type: WebImageType;
  url: string;
}

type UploadImage = LocalImage | WebImage;
