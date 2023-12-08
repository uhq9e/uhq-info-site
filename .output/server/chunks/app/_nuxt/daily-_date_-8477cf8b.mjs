import { _ as _sfc_main$2 } from './PageTitle-6afbe231.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './UseSocialPost-f4665701.mjs';
import { u as useRoute, a as __nuxt_component_0 } from '../server.mjs';
import script from './tag.esm-a59af12d.mjs';
import { useSSRContext, defineComponent, watchEffect, unref, ref, resolveDirective, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { u as useSeoMeta } from './index-faf78169.mjs';
import { u as useFetch } from './fetch-b7fe539d.mjs';
import { p as pageTitleFormat } from './index-8368f3bf.mjs';
import './overlaypanel.esm-40c0358a.mjs';
import './index.esm-905a09c0.mjs';
import './baseicon.esm-95b030db.mjs';
import './overlayeventbus.esm-e3d31df3.mjs';
import './portal.esm-fb4d8ec4.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageItem",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const selectionIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthorPanel = _sfc_main$1$1;
      const _component_UseSocialPost = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Tag = script;
      const _directive_ripple = resolveDirective("ripple");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "shadow-1 r:6 bg:white p:16" }, _attrs))}><div class="flex {flex:col;gap:8}@&lt;xs {flex:row;justify-content:space-between}@&gt;xs mb:8">`);
      _push(ssrRenderComponent(_component_AuthorPanel, {
        author: _ctx.item.author
      }, {
        default: withCtx((slot, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="f:bold f:1.2em cursor:pointer"${_scopeId}><i class="pi pi-user mr:4"${_scopeId}></i>${ssrInterpolate((_a = _ctx.item.author) == null ? void 0 : _a.name)}</div>`);
          } else {
            return [
              createVNode("div", {
                class: "f:bold f:1.2em cursor:pointer",
                onClick: ($event) => {
                  var _a2;
                  return (_a2 = slot.op) == null ? void 0 : _a2.show($event);
                }
              }, [
                createVNode("i", { class: "pi pi-user mr:4" }),
                createTextVNode(toDisplayString((_b = _ctx.item.author) == null ? void 0 : _b.name), 1)
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex:row gap:4"><!--[-->`);
      ssrRenderList(_ctx.item.urls, (url, i) => {
        _push(ssrRenderComponent(_component_UseSocialPost, { url }, {
          default: withCtx((slot, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                href: url,
                target: "_blank"
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Tag, mergeProps({
                      value: slot.socialPostType.key,
                      title: slot.socialPostType.toDisplay(),
                      style: { backgroundColor: slot.socialPostType.color },
                      class: "p-ripple capitalize"
                    }, ssrGetDirectiveProps(_ctx, _directive_ripple)), null, _parent3, _scopeId2));
                  } else {
                    return [
                      withDirectives(createVNode(_component_Tag, {
                        value: slot.socialPostType.key,
                        title: slot.socialPostType.toDisplay(),
                        style: { backgroundColor: slot.socialPostType.color },
                        class: "p-ripple capitalize"
                      }, null, 8, ["value", "title", "style"]), [
                        [_directive_ripple]
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, {
                  href: url,
                  target: "_blank"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(_component_Tag, {
                      value: slot.socialPostType.key,
                      title: slot.socialPostType.toDisplay(),
                      style: { backgroundColor: slot.socialPostType.color },
                      class: "p-ripple capitalize"
                    }, null, 8, ["value", "title", "style"]), [
                      [_directive_ripple]
                    ])
                  ]),
                  _: 2
                }, 1032, ["href"])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="w:full"><div class="flex flex:row h:100 py:8 gap:8"><!--[-->`);
      ssrRenderList(_ctx.item.local_files, (file, i) => {
        _push(`<div class="${ssrRenderClass([
          "h:full r:6 aspect:1/1 bg:center bg:cover cursor:pointer b:var(--primary-color) b:2 b:dashed:hover",
          {
            "b:solid": i === unref(selectionIndex)
          }
        ])}" style="${ssrRenderStyle({
          backgroundImage: `url('https://object.wakachika.love/${file.path}')`
        })}"></div>`);
      });
      _push(`<!--]--></div><img${ssrRenderAttr("src", `https://object.wakachika.love/${_ctx.item.local_files[unref(selectionIndex)].path}`)}${ssrRenderAttr("alt", _ctx.item.local_files[unref(selectionIndex)].file_name)} class="w:inherit r:6"></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "daily-[date]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { data, pending, error, execute } = useFetch(
      "/api/images/item",
      {
        server: false,
        query: {
          date: route.params.date,
          order_by: "+id"
        }
      },
      "$2s59oQgWg3"
    );
    const pageDescription = `${route.params.date}\u7684\u9C7C\u56FE`;
    const pageTitle = pageTitleFormat(pageDescription);
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      description: pageDescription,
      ogDescription: pageDescription
    });
    watchEffect(() => {
      var _a, _b;
      if (error.value) {
        console.log((_a = error.value) == null ? void 0 : _a.status);
        switch ((_b = error.value) == null ? void 0 : _b.status) {
          case 422:
            console.warn("\u4F60\u662F\u5426\u8D70\u9519\u4E86\u5730\u65B9\uFF1Fa");
            break;
          default:
            console.error("\u7F51\u7EDC\u9519\u8BEF");
            break;
        }
      }
    });
    watchEffect(() => {
      if (data.value) {
        if (!data.value.count) {
          console.warn("\u4F60\u662F\u5426\u8D70\u9519\u4E86\u5730\u65B9\uFF1Fb");
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_PageTitle = _sfc_main$2;
      const _component_ImageItem = _sfc_main$1;
      if (unref(data)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_PageTitle, {
          value: unref(route).params.date
        }, null, _parent));
        _push(`<div class="flex flex:col w:full align-items:center gap:8"><!--[-->`);
        ssrRenderList((_a = unref(data)) == null ? void 0 : _a.items, (item) => {
          _push(ssrRenderComponent(_component_ImageItem, {
            item,
            class: "general-width"
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/images/daily-[date].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=daily-_date_-8477cf8b.mjs.map
