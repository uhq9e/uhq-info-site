const site = {
  title: "\u82E5\u5343\u4EBA\u7684\u672B\u8DEF",
  description: "\u5B58\u653E\u4E00\u4E9B\u70B9\u5B50\u548Cyuyuyu\u56FE\u7684\u5730\u65B9\u3002"
};
const shared = {
  error: "\u9519\u8BEF",
  confirmed: "\u5DF2\u786E\u8BA4"
};
const requestErrors = {
  network: "\u7F51\u7EDC\u9519\u8BEF",
  status: {
    "401": "\u9700\u8981\u8BA4\u8BC1",
    "403": "\u6CA1\u6709\u6743\u9650",
    "404": "\u65E0\u6B64\u6761\u76EE",
    "500": "\u5185\u90E8\u9519\u8BEF"
  }
};
const messages = {
  sessionExpired: "\u4F1A\u8BDD\u5931\u6548",
  validationSuccess: "\u9A8C\u8BC1\u901A\u8FC7",
  wrongToken: "Token\u6709\u8BEF",
  itemDeleted: "\u6761\u76EE\u5DF2\u5220\u9664"
};
const zh = {
  site,
  shared,
  requestErrors,
  messages
};
const i18n_config = () => ({
  legacy: false,
  locale: "zh",
  messages: {
    zh
  }
});

export { i18n_config as default };
//# sourceMappingURL=i18n.config-68ee1e3c.mjs.map
