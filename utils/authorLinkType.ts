import { capitalize } from "lodash-es";
import { SocialPostTypeEnum } from "./misc";

interface GroupsObject {
  [key: string]: string;
}

interface AuthorLinkObject {
  id: SocialPostTypeEnum;
  key: string;
  regex?: RegExp[];
}

export default class AuthorLinkType {
  static readonly Unknown = new this({
    id: SocialPostTypeEnum.Unknown,
    key: "unknown",
  });
  static readonly Twitter = new this({
    id: SocialPostTypeEnum.Twitter,
    key: "twitter",
    regex: [/^https?:\/\/(?:twitter|x)\.com\/(?<user>\w+)/],
  });
  static readonly Pixiv = new this({
    id: SocialPostTypeEnum.Pixiv,
    key: "pixiv",
    regex: [/^https?:\/\/www\.pixiv\.net\/users\/(?<user>\d+)/],
  });
  static readonly Crepu = new this({
    id: SocialPostTypeEnum.Crepu,
    key: "crepu",
    regex: [/^https?:\/\/crepu\.net\/post\/(?<user>\d+)/], // TODO: 改成Crepu用户
  });
  static readonly Skeb = new this({
    id: SocialPostTypeEnum.Skeb,
    key: "skeb",
    regex: [/^https?:\/\/skeb\.jp\/@(?<user>\w+)/],
  });
  static readonly Weibo = new this({
    id: SocialPostTypeEnum.Weibo,
    key: "weibo",
    regex: [/^https?:\/\/weibo\.com\/u\/(?<user>\d+)/],
  });
  static readonly Tieba = new this({
    id: SocialPostTypeEnum.Tieba,
    key: "tieba",
    regex: [/^https?:\/\/tieba\.baidu\.com\/home\/main\/\?id=(?<user>\S+)/],
  });
  static readonly Bilibili = new this({
    id: SocialPostTypeEnum.Bilibili,
    key: "bilibili",
    regex: [/^https?:\/\/space\.bilibili\.com\/(?<user>\d+)/],
  });
  static readonly Lofter = new this({
    id: SocialPostTypeEnum.Lofter,
    key: "lofter",
    regex: [/^https?:\/\/(?<user>\w+)\.lofter\.com/],
  });

  static readonly members = [
    this.Unknown,
    this.Twitter,
    this.Pixiv,
    this.Crepu,
    this.Skeb,
    this.Weibo,
    this.Tieba,
    this.Bilibili,
    this.Lofter,
  ];

  public groups: GroupsObject | undefined = undefined;

  private constructor(public readonly obj: AuthorLinkObject) {}

  public static getByKey(key: string): AuthorLinkType | undefined {
    AuthorLinkType.members.forEach((v) => {
      if (v.obj.key === key) return v;
    });

    return undefined;
  }

  public static getById(id: number): AuthorLinkType | undefined {
    AuthorLinkType.members.forEach((v) => {
      if (v.obj.id === id) return v;
    });

    return undefined;
  }

  public static matchByUrl(url: string): AuthorLinkType {
    for (const type of AuthorLinkType.members) {
      if (!type.obj.regex) continue;
      for (const regex of type.obj.regex) {
        const result = regex.exec(url);
        if (result) {
          return type.withGroups(result.groups);
        }
      }
    }
    return AuthorLinkType.Unknown;
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

      default:
        return `${capitalize(this.obj.key)}@${this.groups.user}`;
    }
  }
}
