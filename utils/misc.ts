import { z } from "zod";

export enum SocialPostTypeEnum {
  Unknown = 0,
  Twitter = 1,
  Pixiv = 2,
  Crepu = 3,
  Discord = 4,
  Skeb = 5,
  Weibo = 50,
  Tieba = 51,
  Bilibili = 52,
  Lofter = 53,
}

export const UploadItemSchema = z.object({
  date: z.date(),
  author: z
    .custom<Author>()
    .optional()
    .refine((v) => v !== undefined && typeof v !== "string"),
  urls: z.array(z.string().url()).min(1),
  nsfw: z.boolean(),
  images: z.array(z.custom<UploadImage>()),
});

export type UploadItem = z.infer<typeof UploadItemSchema>;

export const ImportImageItemSchema = z.object({
  date: z
    .string()
    .refine((v) => !isNaN(new Date(v).valueOf()))
    .optional(),
  authorUrls: z.array(z.string().url()).optional(),
  urls: z.array(z.string().url()).optional(),
  nsfw: z.boolean().optional(),
  imageUrls: z.array(z.string().url()).optional(),
});

export const ImportImageItemsSchema = z.array(ImportImageItemSchema);

export type ImportImageItem = z.infer<typeof ImportImageItemSchema>;
