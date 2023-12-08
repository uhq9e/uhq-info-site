var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function formatDate(date) {
  if (!date)
    return date;
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function urlToFavicon(url) {
  const urlRegex = /^(https?:\/\/(?:[a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.\w+)\/*\S*/;
  const matched = urlRegex.exec(url);
  return matched !== null ? `${matched[1]}/favicon.ico` : matched;
}
const _SocialPostType = class _SocialPostType2 {
  constructor(id, key, regex, color) {
    __publicField(this, "groups", null);
    this.id = id;
    this.key = key;
    this.regex = regex;
    this.color = color;
  }
  withGroups(groups) {
    this.groups = groups;
    return this;
  }
  toDisplay() {
    if (!this.groups)
      return null;
    switch (this.id) {
      case 0:
        return null;
      case 1:
        return `@${this.groups.user}/${this.groups.id}`;
      case 2:
        return `${this.groups.id}`;
      case 3:
        return `${this.groups.id}`;
      case 4:
        return `${this.groups.id}`;
      case 5:
        return `@${this.groups.user}/${this.groups.id}`;
      case 50:
        return `@${this.groups.user}/${this.groups.id}`;
      case 51:
        return `${this.groups.id}`;
      case 52:
        return `${this.groups.id}`;
      case 53:
        return `@${this.groups.user}/${this.groups.id}`;
    }
  }
};
__publicField(_SocialPostType, "Unknown", new _SocialPostType(
  0,
  "unknown",
  null,
  "#888"
));
__publicField(_SocialPostType, "Twitter", new _SocialPostType(
  1,
  "twitter",
  [/^https?:\/\/(?:twitter|x)\.com\/(?<user>\w+)\/status\/(?<id>\d+)/],
  "#1af"
));
__publicField(_SocialPostType, "Pixiv", new _SocialPostType(
  2,
  "pixiv",
  [
    /^https?:\/\/www\.pixiv\.net\/(?:en\/)*artworks\/(?<id>\d+)/,
    /^https?:\/\/www\.pixiv\.net\/member_illust\.php\?illust_id=(?<id>\d)+/
  ],
  "#0096fa"
));
__publicField(_SocialPostType, "Crepu", new _SocialPostType(
  3,
  "crepu",
  [/^https?:\/\/crepu\.net\/post\/(?<id>\d+)/],
  "#06b6d4"
));
__publicField(_SocialPostType, "Discord", new _SocialPostType(
  4,
  "discord",
  [
    /^https?:\/\/discord\.com\/channels\/(?<server>\d+)\/(?<channel>\d+)\/(?<id>\d+)/
  ],
  "#78d"
));
__publicField(_SocialPostType, "Skeb", new _SocialPostType(
  5,
  "skeb",
  [/^https?:\/\/skeb\.jp\/@(?<user>\w+)\/works\/(?<id>\d+)/],
  "#28837f"
));
__publicField(_SocialPostType, "Weibo", new _SocialPostType(
  50,
  "weibo",
  [/^https?:\/\/weibo\.com\/(?<user>\d+)\/(?<id>\w+)/],
  "#ff8200"
));
__publicField(_SocialPostType, "Tieba", new _SocialPostType(
  51,
  "tieba",
  [/^https?:\/\/tieba\.baidu\.com\/p\/(?<id>\d+)/],
  "#18f"
));
__publicField(_SocialPostType, "Bilibili", new _SocialPostType(
  52,
  "bilibili",
  [
    /^https?:\/\/www\.bilibili\.com\/opus\/(?<id>\d+)/,
    /^https?:\/\/t\.bilibili\.com\/(?<id>\d+)/
  ],
  "f79"
));
__publicField(_SocialPostType, "Lofter", new _SocialPostType(
  53,
  "lofter",
  [/^https?:\/\/(?<user>\w+)\.lofter\.com\/post\/(?<id>\w+_\w+)/],
  "#14c4bc"
));
__publicField(_SocialPostType, "members", [
  _SocialPostType.Unknown,
  _SocialPostType.Twitter,
  _SocialPostType.Pixiv,
  _SocialPostType.Crepu,
  _SocialPostType.Discord,
  _SocialPostType.Skeb,
  _SocialPostType.Weibo,
  _SocialPostType.Tieba,
  _SocialPostType.Bilibili,
  _SocialPostType.Lofter
]);
let SocialPostType = _SocialPostType;
function matchSocialPostByUrl(url) {
  for (const type of SocialPostType.members) {
    if (!type.regex)
      continue;
    for (const regex of type.regex) {
      const result = regex.exec(url);
      if (result) {
        return type.withGroups(result.groups);
      }
    }
  }
  return SocialPostType.Unknown;
}
function urlToHostname(url) {
  const regex = /^https?:\/\/(?:[a-zA-Z0-9_-]+\.)*([a-zA-Z0-9_-]+)\.\w{2,6}\/?\S*/;
  const result = regex.exec(url);
  return result ? result[1] : null;
}
async function validateToken(token) {
  let resp = await $fetch.raw("/api/auth/validate_token", {
    method: "POST",
    body: token,
    ignoreResponseError: true
  });
  return resp.status === 200 ? true : false;
}
function pageTitleFormat(str) {
  return `${str} | \u82E5\u5343\u4EBA\u7684\u672B\u8DEF`;
}
function sortMetaToFormat(meta) {
  var _a;
  return `${((_a = meta.order) != null ? _a : 1) >= 0 ? "+" : "-"}${meta.field}`;
}
function sortMetaArrayToFormat(metaArr) {
  return metaArr.map((v) => sortMetaToFormat(v)).join(",");
}

export { urlToHostname as a, formatDate as f, matchSocialPostByUrl as m, pageTitleFormat as p, sortMetaArrayToFormat as s, urlToFavicon as u, validateToken as v };
//# sourceMappingURL=index-8368f3bf.mjs.map
