import { B as BaseStyle, v as script$2 } from '../server.mjs';
import { openBlock, createElementBlock, mergeProps, createBlock, resolveDynamicComponent, createCommentVNode, renderSlot, createElementVNode, toDisplayString } from 'vue';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'is-https';
import 'vue/server-renderer';
import '@master/css';

var css = "\n@layer primevue {\n    .p-tag {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-tag-icon,\n    .p-tag-value,\n    .p-tag-icon.pi {\n        line-height: 1.5;\n    }\n\n    .p-tag.p-tag-rounded {\n        border-radius: 10rem;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ["p-tag p-component", {
      "p-tag-info": props.severity === "info",
      "p-tag-success": props.severity === "success",
      "p-tag-warning": props.severity === "warning",
      "p-tag-danger": props.severity === "danger",
      "p-tag-rounded": props.rounded
    }];
  },
  icon: "p-tag-icon",
  value: "p-tag-value"
};
var TagStyle = BaseStyle.extend({
  name: "tag",
  css,
  classes
});
var script$1 = {
  name: "BaseTag",
  "extends": script$2,
  props: {
    value: null,
    severity: null,
    rounded: Boolean,
    icon: String
  },
  style: TagStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "Tag",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "tag"
  }), [_ctx.$slots.icon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.icon), mergeProps({
    key: 0,
    "class": _ctx.cx("icon")
  }, _ctx.ptm("icon")), null, 16, ["class"])) : _ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    "class": [_ctx.cx("icon"), _ctx.icon]
  }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "default", {}, function() {
    return [createElementVNode("span", mergeProps({
      "class": _ctx.cx("value")
    }, _ctx.ptm("value")), toDisplayString(_ctx.value), 17)];
  })], 16);
}
script.render = render;

export { script as default };
//# sourceMappingURL=tag.esm-a59af12d.mjs.map
