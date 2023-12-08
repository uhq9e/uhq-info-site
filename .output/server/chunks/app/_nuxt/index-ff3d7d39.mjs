import { _ as _export_sfc, d as useI18n, a as __nuxt_component_0 } from '../server.mjs';
import { u as useSeoMeta } from './index-faf78169.mjs';
import { useSSRContext, defineComponent, unref, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { p as pageTitleFormat } from './index-8368f3bf.mjs';
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
import '@master/css';

const pageDescription = "\u82E5\u5343\u4EBA\u7684\u672B\u8DEF";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const pageTitle = pageTitleFormat("\u4E3B\u9875");
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      description: pageDescription,
      ogDescription: pageDescription
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e6b126f9><div class="h:calc(100vh-5.5rem) flex flex:row r:6 overflow:hidden shadow-2" data-v-e6b126f9><div class="w:100% w:50%@sm p:32@&gt;sm text:center text:left@sm flex align-items:center justify-content:center justify-content:start@sm z:1" data-v-e6b126f9><section class="py:32 w:full bd:blur(10)@&lt;md" data-v-e6b126f9><div class="f:3rem f:bold mb:16" data-v-e6b126f9><span class="heading-gradient" data-v-e6b126f9>${ssrInterpolate(unref(t)("site.title"))}</span></div><p class="mt:0 mb:16 lh:1.5" data-v-e6b126f9>${ssrInterpolate(unref(t)("site.description"))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/images/daily",
        class: "p-button p-button-raised f:bold f:white f:white:hover"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9C7C\u56FE`);
          } else {
            return [
              createTextVNode("\u9C7C\u56FE")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div><div class="w:100% w:50%@sm static@&gt;sm abs@&lt;sm r:6@md overflow:hidden top:0 right:0 bottom:0 left:0" data-v-e6b126f9><div class="clip:polygon(8%|0,100%|0%,100%|100%,0|100%)@sm w:full h:full bg:url(&#39;/images/hero.png&#39;) bg:cover bg:center" data-v-e6b126f9></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e6b126f9"]]);

export { index as default };
//# sourceMappingURL=index-ff3d7d39.mjs.map
