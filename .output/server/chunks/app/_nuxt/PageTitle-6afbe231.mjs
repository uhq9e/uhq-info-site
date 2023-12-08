import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageTitle",
  __ssrInlineRender: true,
  props: {
    value: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rel p:16 overflow-x:clip overflow-y:visible" }, _attrs))}><h1 class="my:0">${ssrInterpolate(_ctx.value)}</h1><div class="abs left:-25 top:-75 f:15rem f:bold f:white untouchable user-select:none z:-1 white-space:nowrap text-outline matrix(1,0,-0.1,0.75,0,0)">${ssrInterpolate(_ctx.value)}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PageTitle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PageTitle-6afbe231.mjs.map
