import { _ as _sfc_main$1 } from './PageTitle-6afbe231.mjs';
import script$1 from './paginator.esm-47d8a321.mjs';
import { _ as _export_sfc, u as useRoute, b as useRouter, a as __nuxt_component_0 } from '../server.mjs';
import { s as sortMetaArrayToFormat, p as pageTitleFormat } from './index-8368f3bf.mjs';
import { u as useSeoMeta } from './index-faf78169.mjs';
import { useSSRContext, defineComponent, computed, ref, withAsyncContext, unref, withCtx, isRef, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList } from 'vue';
import { u as useFetch } from './fetch-b7fe539d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import script from './blockui.esm-dd15814f.mjs';
import { groupBy } from 'lodash-es';
import './index.esm-a352f37c.mjs';
import './baseicon.esm-95b030db.mjs';
import './dropdown.esm-5e9a1388.mjs';
import './index.esm-2a968448.mjs';
import './index.esm-dbcdf49b.mjs';
import './index.esm-905a09c0.mjs';
import './overlayeventbus.esm-e3d31df3.mjs';
import './portal.esm-fb4d8ec4.mjs';
import './virtualscroller.esm-a1fbc95c.mjs';
import './inputnumber.esm-3190ec1b.mjs';
import './button.esm-ecbaff79.mjs';
import './badge.esm-c4a594dc.mjs';
import './index.esm-edfc390e.mjs';
import './index.esm-67b61922.mjs';
import './inputtext.esm-f33fbeb4.mjs';
import './index.esm-ca7b6c02.mjs';
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

const pageDescription = "\u6BCF\u5929\u6536\u96C6\u7684\u4E00\u4E9B\u9C7C\u56FE";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "daily",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const pageTitle = pageTitleFormat("\u9C7C\u56FE");
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      description: pageDescription,
      ogDescription: pageDescription
    });
    const defaultOrderBy = [{ field: "date", order: -1 }];
    const route = useRoute();
    const router = useRouter();
    const page = computed({
      get: () => {
        var _a;
        return Number((_a = route.query.p) != null ? _a : "1");
      },
      set: (p) => router.push({ query: { p } })
    });
    const rows = ref(20);
    const first = ref((page.value - 1) * rows.value);
    const queryParams = ref({
      offset: first,
      limit: rows,
      order_by: ref(sortMetaArrayToFormat(defaultOrderBy))
    });
    const { data, pending, error, execute } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/images/item", {
      query: queryParams,
      server: false
    }, "$kxVm9k6dlC")), __temp = await __temp, __restore(), __temp);
    const grouped = computed(() => {
      var _a;
      return groupBy((_a = data.value) == null ? void 0 : _a.items, "date");
    });
    function onFirstChange(first2) {
      page.value = Math.floor(first2 / rows.value) + 1;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageTitle = _sfc_main$1;
      const _component_Paginator = script$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-1019073c>`);
      _push(ssrRenderComponent(_component_PageTitle, { value: "\u9C7C\u56FE" }, null, _parent));
      _push(`<section class="flex flex:col" data-v-1019073c>`);
      _push(ssrRenderComponent(unref(script), { blocked: unref(pending) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_component_Paginator, {
              first: unref(first),
              "onUpdate:first": [($event) => isRef(first) ? first.value = $event : null, onFirstChange],
              rows: unref(rows),
              "onUpdate:rows": ($event) => isRef(rows) ? rows.value = $event : null,
              totalRecords: (_a = unref(data)) == null ? void 0 : _a.count,
              pt: { root: { style: { background: "transparent" } } }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Paginator, {
                first: unref(first),
                "onUpdate:first": [($event) => isRef(first) ? first.value = $event : null, onFirstChange],
                rows: unref(rows),
                "onUpdate:rows": ($event) => isRef(rows) ? rows.value = $event : null,
                totalRecords: (_b = unref(data)) == null ? void 0 : _b.count,
                pt: { root: { style: { background: "transparent" } } }
              }, null, 8, ["first", "onUpdate:first", "rows", "onUpdate:rows", "totalRecords"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex:col gap:8 align-items:center" data-v-1019073c><!--[-->`);
      ssrRenderList(Object.entries(unref(grouped)), (image) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/images/daily-${image[0]}`,
          target: "_blank",
          class: "b:1 b:solid b:var(--surface-border) r:6 px:16 py:8 bg:white general-width w:full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="f:bold mb:8 text-decoration" data-v-1019073c${_scopeId}>${ssrInterpolate(image[0])}</div><div class="w:full h:150 px:16 py:8 flex flex:row gap:8 overflow-x:auto b:1 b:solid b:var(--surface-border) r:6 bg:var(--surface-ground)" data-v-1019073c${_scopeId}><!--[-->`);
              ssrRenderList(image[1], (file) => {
                _push2(`<div class="h:full r:6 shadow-2 aspect:1/1 bg:center bg:cover" style="${ssrRenderStyle({
                  backgroundImage: `url('https://object.wakachika.love/${file.local_files[0].path}')`
                })}" data-v-1019073c${_scopeId}></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "f:bold mb:8 text-decoration" }, toDisplayString(image[0]), 1),
                createVNode("div", { class: "w:full h:150 px:16 py:8 flex flex:row gap:8 overflow-x:auto b:1 b:solid b:var(--surface-border) r:6 bg:var(--surface-ground)" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(image[1], (file) => {
                    return openBlock(), createBlock("div", {
                      class: "h:full r:6 shadow-2 aspect:1/1 bg:center bg:cover",
                      style: {
                        backgroundImage: `url('https://object.wakachika.love/${file.local_files[0].path}')`
                      }
                    }, null, 4);
                  }), 256))
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(unref(script), { blocked: unref(pending) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_component_Paginator, {
              first: unref(first),
              "onUpdate:first": [($event) => isRef(first) ? first.value = $event : null, onFirstChange],
              rows: unref(rows),
              "onUpdate:rows": ($event) => isRef(rows) ? rows.value = $event : null,
              totalRecords: (_a = unref(data)) == null ? void 0 : _a.count,
              pt: { root: { style: { background: "transparent" } } }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Paginator, {
                first: unref(first),
                "onUpdate:first": [($event) => isRef(first) ? first.value = $event : null, onFirstChange],
                rows: unref(rows),
                "onUpdate:rows": ($event) => isRef(rows) ? rows.value = $event : null,
                totalRecords: (_b = unref(data)) == null ? void 0 : _b.count,
                pt: { root: { style: { background: "transparent" } } }
              }, null, 8, ["first", "onUpdate:first", "rows", "onUpdate:rows", "totalRecords"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/images/daily.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const daily = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1019073c"]]);

export { daily as default };
//# sourceMappingURL=daily-cb6ddac7.mjs.map
