import script from './toast.esm-1dd156e2.mjs';
import script$1 from './card.esm-f1ed36d9.mjs';
import script$2 from './inputtext.esm-f33fbeb4.mjs';
import script$3 from './button.esm-ecbaff79.mjs';
import script$5 from './sidebar.esm-f641ec77.mjs';
import script$4 from './menu.esm-1927a622.mjs';
import { useSSRContext, defineComponent, ref, unref, withCtx, createTextVNode, isRef, createVNode, resolveDirective, mergeProps, withDirectives, openBlock, createBlock, createCommentVNode, toDisplayString } from 'vue';
import { d as useI18n, o as useState, p as useLocalStorage, f as useToast, u as useRoute, q as __nuxt_component_5, _ as _export_sfc } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useSeoMeta } from './index-faf78169.mjs';
import { v as validateToken, p as pageTitleFormat } from './index-8368f3bf.mjs';
import './portal.esm-fb4d8ec4.mjs';
import './index.esm-dfa1186a.mjs';
import './baseicon.esm-95b030db.mjs';
import './index.esm-3f7ff53d.mjs';
import './index.esm-905a09c0.mjs';
import './index.esm-c061dd0f.mjs';
import './badge.esm-c4a594dc.mjs';
import './index.esm-dbcdf49b.mjs';
import './overlayeventbus.esm-e3d31df3.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavigateMenu",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Menu = script$4;
      const _directive_ripple = resolveDirective("ripple");
      _push(ssrRenderComponent(_component_Menu, mergeProps({ model: _ctx.items }, _attrs), {
        item: withCtx(({ item, props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttrs(mergeProps({
              class: [
                "flex align-items:center bg:transparent",
                { "item-actived": unref(route).path === item.url }
              ],
              href: item.url
            }, props.action, ssrGetDirectiveProps(_ctx, _directive_ripple)))} data-v-0eb24de1${_scopeId}>`);
            if (item.icon) {
              _push2(`<span class="${ssrRenderClass(item.icon)}" data-v-0eb24de1${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="ml-2" data-v-0eb24de1${_scopeId}>${ssrInterpolate(item.label)}</span></a>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("a", mergeProps({
                class: [
                  "flex align-items:center bg:transparent",
                  { "item-actived": unref(route).path === item.url }
                ],
                href: item.url
              }, props.action), [
                item.icon ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: item.icon
                }, null, 2)) : createCommentVNode("", true),
                createVNode("span", { class: "ml-2" }, toDisplayString(item.label), 1)
              ], 16, ["href"])), [
                [_directive_ripple]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavigateMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0eb24de1"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ManageLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const items = ref([
      { label: "\u56FE\u7247\u7BA1\u7406", url: "/manage/images" },
      { label: "\u4F5C\u8005\u7BA1\u7406", url: "/manage/authors" }
    ]);
    const sidebarVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = script$5;
      const _component_NavigateMenu = __nuxt_component_1;
      const _component_Button = script$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex:column h:calc(100vh-5.5rem)" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Sidebar, {
        visible: unref(sidebarVisible),
        "onUpdate:visible": ($event) => isRef(sidebarVisible) ? sidebarVisible.value = $event : null,
        pt: { content: { class: "px:0" } }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NavigateMenu, {
              items: unref(items),
              class: "w:full border:0"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NavigateMenu, {
                items: unref(items),
                class: "w:full border:0"
              }, null, 8, ["items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        onClick: ($event) => sidebarVisible.value = !unref(sidebarVisible),
        label: "\u5BFC\u822A",
        icon: "pi pi-bars",
        class: "mb:8 hidden@xs",
        text: ""
      }, null, _parent));
      _push(`<div class="flex flex:row flex-grow:1 w:full">`);
      _push(ssrRenderComponent(_component_NavigateMenu, {
        class: "hidden@<xs mr:8",
        items: unref(items)
      }, null, _parent));
      _push(`<div class="flex-grow:1 b:1 b:solid b:var(--surface-border) r:6 overflow:hidden">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ManageLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const pageDescription = "\u7F51\u7AD9\u5185\u5BB9\u7BA1\u7406\u9762\u677F";
const toastLife = 3e3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "manage",
  __ssrInlineRender: true,
  setup(__props) {
    const pageTitle = pageTitleFormat("\u7BA1\u7406");
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      description: pageDescription,
      ogDescription: pageDescription
    });
    const { t } = useI18n();
    useState("token-validated", () => false);
    const tokenStorage = useLocalStorage("manage-token", {
      token: null
    });
    const toast = useToast();
    const token = ref("");
    const loading = ref(false);
    const inited = ref(false);
    async function onValidate() {
      loading.value = true;
      if (await validateToken(token.value)) {
        toast.add({
          severity: "success",
          summary: t("messages.validationSuccess"),
          life: toastLife
        });
        tokenStorage.value = { token: token.value };
      } else {
        toast.add({
          severity: "error",
          summary: t("messages.wrongToken"),
          life: toastLife
        });
      }
      loading.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = script;
      const _component_Card = script$1;
      const _component_InputText = script$2;
      const _component_Button = script$3;
      const _component_ManageLayout = _sfc_main$1;
      const _component_NuxtPage = __nuxt_component_5;
      if (unref(inited)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_Toast, null, null, _parent));
        if (unref(tokenStorage).token === null) {
          _push(`<div class="flex flex:col align-items:center">`);
          _push(ssrRenderComponent(_component_Card, { class: "w:20rem max-w:full" }, {
            title: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u9700\u8981\u8BA4\u8BC1`);
              } else {
                return [
                  createTextVNode("\u9700\u8981\u8BA4\u8BC1")
                ];
              }
            }),
            content: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex flex:col gap:8"${_scopeId}><label for="token" class="f:bold"${_scopeId}>Token</label>`);
                _push2(ssrRenderComponent(_component_InputText, {
                  id: "token",
                  type: "password",
                  modelValue: unref(token),
                  "onUpdate:modelValue": ($event) => isRef(token) ? token.value = $event : null,
                  class: "w:full"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex:col gap:8" }, [
                    createVNode("label", {
                      for: "token",
                      class: "f:bold"
                    }, "Token"),
                    createVNode(_component_InputText, {
                      id: "token",
                      type: "password",
                      modelValue: unref(token),
                      "onUpdate:modelValue": ($event) => isRef(token) ? token.value = $event : null,
                      class: "w:full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ];
              }
            }),
            footer: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Button, {
                  onClick: onValidate,
                  label: "\u9A8C\u8BC1",
                  loading: unref(loading),
                  disabled: !unref(token).length
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Button, {
                    onClick: onValidate,
                    label: "\u9A8C\u8BC1",
                    loading: unref(loading),
                    disabled: !unref(token).length
                  }, null, 8, ["loading", "disabled"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(ssrRenderComponent(_component_ManageLayout, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtPage)
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=manage-b60beee1.mjs.map
