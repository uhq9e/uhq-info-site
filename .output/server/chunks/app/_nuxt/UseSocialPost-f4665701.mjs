import script from './overlaypanel.esm-40c0358a.mjs';
import { a as __nuxt_component_0 } from '../server.mjs';
import script$1 from './tag.esm-a59af12d.mjs';
import { defineComponent, ref, resolveDirective, unref, withCtx, mergeProps, withDirectives, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { a as urlToHostname, m as matchSocialPostByUrl } from './index-8368f3bf.mjs';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthorPanel",
  __ssrInlineRender: true,
  props: {
    author: {}
  },
  setup(__props) {
    const op = ref();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_OverlayPanel = script;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Tag = script$1;
      const _directive_ripple = resolveDirective("ripple");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      ssrRenderSlot(_ctx.$slots, "default", { op: unref(op) }, null, _push, _parent);
      if (_ctx.author) {
        _push(ssrRenderComponent(_component_OverlayPanel, {
          ref_key: "op",
          ref: op
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mb:16"${_scopeId}><div class="f:0.8em"${_scopeId}>\u4F5C\u8005</div><div class="f:bold f:1.2em max-w:full"${_scopeId}>${ssrInterpolate(_ctx.author.name)}</div></div><div${_scopeId}><div class="f:0.8em mb:4"${_scopeId}>\u793E\u4EA4\u94FE\u63A5</div><div class="flex flex:row gap:4"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.author.urls, (url, i) => {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  key: i,
                  href: url,
                  target: "_blank"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_Tag, mergeProps({
                        value: ("urlToHostname" in _ctx ? _ctx.urlToHostname : unref(urlToHostname))(url),
                        class: "p-ripple capitalize"
                      }, ssrGetDirectiveProps(_ctx, _directive_ripple)), null, _parent3, _scopeId2));
                    } else {
                      return [
                        withDirectives(createVNode(_component_Tag, {
                          value: ("urlToHostname" in _ctx ? _ctx.urlToHostname : unref(urlToHostname))(url),
                          class: "p-ripple capitalize"
                        }, null, 8, ["value"]), [
                          [_directive_ripple]
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                createVNode("div", { class: "mb:16" }, [
                  createVNode("div", { class: "f:0.8em" }, "\u4F5C\u8005"),
                  createVNode("div", { class: "f:bold f:1.2em max-w:full" }, toDisplayString(_ctx.author.name), 1)
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "f:0.8em mb:4" }, "\u793E\u4EA4\u94FE\u63A5"),
                  createVNode("div", { class: "flex flex:row gap:4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.author.urls, (url, i) => {
                      return openBlock(), createBlock(_component_NuxtLink, {
                        key: i,
                        href: url,
                        target: "_blank"
                      }, {
                        default: withCtx(() => [
                          withDirectives(createVNode(_component_Tag, {
                            value: ("urlToHostname" in _ctx ? _ctx.urlToHostname : unref(urlToHostname))(url),
                            class: "p-ripple capitalize"
                          }, null, 8, ["value"]), [
                            [_directive_ripple]
                          ])
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthorPanel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UseSocialPost",
  __ssrInlineRender: true,
  props: {
    url: {}
  },
  setup(__props) {
    const props = __props;
    const socialPostType = ref(matchSocialPostByUrl(props.url));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlot(_ctx.$slots, "default", { socialPostType: unref(socialPostType) }, null, _push, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UseSocialPost.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=UseSocialPost-f4665701.mjs.map
