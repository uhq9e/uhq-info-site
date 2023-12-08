import type { DataTableSortMeta } from "primevue/datatable";

export function formatDate(
  date: Date | null | undefined
): string | null | undefined {
  if (!date) return date;
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function urlToFavicon(url: string): string | null {
  const urlRegex =
    /^(https?:\/\/(?:[a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.\w+)\/*\S*/;
  const matched = urlRegex.exec(url);
  return matched !== null ? `${matched[1]}/favicon.ico` : matched;
}

interface GroupsObject {
  [key: string]: string;
}

enum SocialPostTypeEnum {
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

export class SocialPostType {
  static readonly Unknown = new this(
    SocialPostTypeEnum.Unknown,
    "unknown",
    null,
    "#888"
  );
  static readonly Twitter = new this(
    SocialPostTypeEnum.Twitter,
    "twitter",
    [/^https?:\/\/(?:twitter|x)\.com\/(?<user>\w+)\/status\/(?<id>\d+)/],
    "#1af"
  );
  static readonly Pixiv = new this(
    SocialPostTypeEnum.Pixiv,
    "pixiv",
    [
      /^https?:\/\/www\.pixiv\.net\/(?:en\/)*artworks\/(?<id>\d+)/,
      /^https?:\/\/www\.pixiv\.net\/member_illust\.php\?illust_id=(?<id>\d)+/,
    ],
    "#0096fa"
  );
  static readonly Crepu = new this(
    SocialPostTypeEnum.Crepu,
    "crepu",
    [/^https?:\/\/crepu\.net\/post\/(?<id>\d+)/],
    "#06b6d4"
  );
  static readonly Discord = new this(
    SocialPostTypeEnum.Discord,
    "discord",
    [
      /^https?:\/\/discord\.com\/channels\/(?<server>\d+)\/(?<channel>\d+)\/(?<id>\d+)/,
    ],
    "#78d"
  );
  static readonly Skeb = new this(
    SocialPostTypeEnum.Skeb,
    "skeb",
    [/^https?:\/\/skeb\.jp\/@(?<user>\w+)\/works\/(?<id>\d+)/],
    "#28837f"
  );
  static readonly Weibo = new this(
    SocialPostTypeEnum.Weibo,
    "weibo",
    [/^https?:\/\/weibo\.com\/(?<user>\d+)\/(?<id>\w+)/],
    "#ff8200"
  );
  static readonly Tieba = new this(
    SocialPostTypeEnum.Tieba,
    "tieba",
    [/^https?:\/\/tieba\.baidu\.com\/p\/(?<id>\d+)/],
    "#18f"
  );
  static readonly Bilibili = new this(
    SocialPostTypeEnum.Bilibili,
    "bilibili",
    [
      /^https?:\/\/www\.bilibili\.com\/opus\/(?<id>\d+)/,
      /^https?:\/\/t\.bilibili\.com\/(?<id>\d+)/,
    ],
    "f79"
  );
  static readonly Lofter = new this(
    SocialPostTypeEnum.Lofter,
    "lofter",
    [/^https?:\/\/(?<user>\w+)\.lofter\.com\/post\/(?<id>\w+_\w+)/],
    "#14c4bc"
  );

  static readonly members = [
    this.Unknown,
    this.Twitter,
    this.Pixiv,
    this.Crepu,
    this.Discord,
    this.Skeb,
    this.Weibo,
    this.Tieba,
    this.Bilibili,
    this.Lofter,
  ];

  public groups: GroupsObject | undefined | null = null;

  private constructor(
    public readonly id: SocialPostTypeEnum,
    public readonly key: string,
    public readonly regex: RegExp[] | null,
    public readonly color: string
  ) {}

  public withGroups(groups: GroupsObject | undefined): this {
    this.groups = groups;
    return this;
  }

  public toDisplay(): string | null {
    if (!this.groups) return null;

    switch (this.id) {
      case SocialPostTypeEnum.Unknown:
        return null;

      case SocialPostTypeEnum.Twitter:
        return `@${this.groups.user}/${this.groups.id}`;

      case SocialPostTypeEnum.Pixiv:
        return `${this.groups.id}`;

      case SocialPostTypeEnum.Crepu:
        return `${this.groups.id}`;

      case SocialPostTypeEnum.Discord:
        return `${this.groups.id}`;

      case SocialPostTypeEnum.Skeb:
        return `@${this.groups.user}/${this.groups.id}`;

      case SocialPostTypeEnum.Weibo:
        return `@${this.groups.user}/${this.groups.id}`;

      case SocialPostTypeEnum.Tieba:
        return `${this.groups.id}`;

      case SocialPostTypeEnum.Bilibili:
        return `${this.groups.id}`;

      case SocialPostTypeEnum.Lofter:
        return `@${this.groups.user}/${this.groups.id}`;
    }
  }
}

export function matchSocialPostByUrl(url: string): SocialPostType {
  for (const type of SocialPostType.members) {
    if (!type.regex) continue;
    for (const regex of type.regex) {
      const result = regex.exec(url);
      if (result) {
        return type.withGroups(result.groups);
      }
    }
  }
  return SocialPostType.Unknown;
}

export function urlToHostname(url: string): string | null {
  const regex =
    /^https?:\/\/(?:[a-zA-Z0-9_-]+\.)*([a-zA-Z0-9_-]+)\.\w{2,6}\/?\S*/;
  const result = regex.exec(url);
  return result ? result[1] : null;
}

export async function validateToken(token: string): Promise<boolean> {
  let resp = await $fetch.raw("/api/auth/validate_token", {
    method: "POST",
    body: token,
    ignoreResponseError: true,
  });
  return resp.status === 200 ? true : false;
}

export function pageTitleFormat(str: string): string {
  return `${str} | 若千人的末路`;
}

export function sortMetaToFormat(meta: DataTableSortMeta): string {
  return `${(meta.order ?? 1) >= 0 ? "+" : "-"}${meta.field}`;
}

export function sortMetaArrayToFormat(metaArr: DataTableSortMeta[]): string {
  return metaArr.map((v) => sortMetaToFormat(v)).join(",");
}
