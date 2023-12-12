import { SocialPostTypeEnum } from "./misc";

interface GroupsObject {
  [key: string]: string;
}

interface SocialPostObject {
  id: SocialPostTypeEnum;
  key: string;
  regex?: RegExp[];
  color: string;
}

export default class SocialPostType {
  static readonly Unknown = new this({
    id: SocialPostTypeEnum.Unknown,
    key: "unknown",
    color: "#888",
  });
  static readonly Twitter = new this({
    id: SocialPostTypeEnum.Twitter,
    key: "twitter",
    regex: [/^https?:\/\/(?:twitter|x)\.com\/(?<user>\w+)\/status\/(?<id>\d+)/],
    color: "#1af",
  });
  static readonly Pixiv = new this({
    id: SocialPostTypeEnum.Pixiv,
    key: "pixiv",
    regex: [
      /^https?:\/\/www\.pixiv\.net\/(?:en\/)*artworks\/(?<id>\d+)/,
      /^https?:\/\/www\.pixiv\.net\/member_illust\.php\?illust_id=(?<id>\d)+/,
    ],
    color: "#0096fa",
  });
  static readonly Crepu = new this({
    id: SocialPostTypeEnum.Crepu,
    key: "crepu",
    regex: [/^https?:\/\/crepu\.net\/post\/(?<id>\d+)/],
    color: "#06b6d4",
  });
  static readonly Discord = new this({
    id: SocialPostTypeEnum.Discord,
    key: "discord",
    regex: [
      /^https?:\/\/discord\.com\/channels\/(?<server>\d+)\/(?<channel>\d+)\/(?<id>\d+)/,
    ],
    color: "#78d",
  });
  static readonly Skeb = new this({
    id: SocialPostTypeEnum.Skeb,
    key: "skeb",
    regex: [/^https?:\/\/skeb\.jp\/@(?<user>\w+)\/works\/(?<id>\d+)/],
    color: "#28837f",
  });
  static readonly Weibo = new this({
    id: SocialPostTypeEnum.Weibo,
    key: "weibo",
    regex: [/^https?:\/\/weibo\.com\/(?<user>\d+)\/(?<id>\w+)/],
    color: "#ff8200",
  });
  static readonly Tieba = new this({
    id: SocialPostTypeEnum.Tieba,
    key: "tieba",
    regex: [/^https?:\/\/tieba\.baidu\.com\/p\/(?<id>\d+)/],
    color: "#18f",
  });
  static readonly Bilibili = new this({
    id: SocialPostTypeEnum.Bilibili,
    key: "bilibili",
    regex: [
      /^https?:\/\/www\.bilibili\.com\/opus\/(?<id>\d+)/,
      /^https?:\/\/t\.bilibili\.com\/(?<id>\d+)/,
    ],
    color: "#f79",
  });
  static readonly Lofter = new this({
    id: SocialPostTypeEnum.Lofter,
    key: "lofter",
    regex: [/^https?:\/\/(?<user>\w+)\.lofter\.com\/post\/(?<id>\w+_\w+)/],
    color: "#14c4bc",
  });

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

  public groups: GroupsObject | undefined = undefined;

  private constructor(public readonly obj: SocialPostObject) {}

  public static getByKey(key: string): SocialPostType | undefined {
    SocialPostType.members.forEach((v) => {
      if (v.obj.key === key) return v;
    });

    return undefined;
  }

  public static getById(id: number): SocialPostType | undefined {
    SocialPostType.members.forEach((v) => {
      if (v.obj.id === id) return v;
    });

    return undefined;
  }

  public static matchByUrl(url: string): SocialPostType {
    for (const type of SocialPostType.members) {
      if (!type.obj.regex) continue;
      for (const regex of type.obj.regex) {
        const result = regex.exec(url);
        if (result) {
          return type.withGroups(result.groups);
        }
      }
    }
    return SocialPostType.Unknown;
  }

  public withGroups(groups: GroupsObject | undefined): this {
    const newObj: this = Object.create(this);
    newObj.groups = groups;
    return newObj;
  }

  public toDisplay(): string | undefined {
    if (!this.groups) return undefined;

    switch (this.obj.id) {
      case SocialPostTypeEnum.Unknown:
        return undefined;

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
