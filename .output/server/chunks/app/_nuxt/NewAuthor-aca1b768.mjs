import script from './inputtext.esm-f33fbeb4.mjs';
import script$1 from './chips.esm-6d2cd9fb.mjs';
import script$2 from './tag.esm-a59af12d.mjs';
import script$3 from './button.esm-ecbaff79.mjs';
import { defineComponent, inject, ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { u as urlToFavicon, a as urlToHostname } from './index-8368f3bf.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import * as yup from 'yup';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NewAuthor",
  __ssrInlineRender: true,
  setup(__props) {
    const dialogRef = inject("dialogRef");
    const { errors, defineField, handleSubmit } = useForm({
      validationSchema: toTypedSchema(
        yup.object({
          name: yup.string().required(),
          urls: yup.array().of(yup.string()).required().default([])
        })
      )
    });
    const [name, nameAttrs] = defineField("name");
    const [urls, urlsAttrs] = defineField("urls");
    const uploading = ref(false);
    handleSubmit(async (values) => {
      uploading.value = true;
      let insertedItem = await $fetch("/api/authors/item", {
        method: "POST",
        body: {
          name: values.name,
          urls: values.urls
        }
      });
      uploading.value = false;
      dialogRef == null ? void 0 : dialogRef.value.close(insertedItem);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputText = script;
      const _component_Chips = script$1;
      const _component_Tag = script$2;
      const _component_Button = script$3;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "flex flex:col gap:16" }, _attrs))}><div class="flex flex:col gap:4"><label for="author_name" class="f:bold">\u4F5C\u8005\u540D</label>`);
      _push(ssrRenderComponent(_component_InputText, mergeProps({
        id: "author_name",
        modelValue: unref(name),
        "onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null
      }, unref(nameAttrs), {
        "input-class": { "p-invalid": unref(errors).name },
        class: "w:full"
      }), null, _parent));
      _push(`<small class="p-error">${ssrInterpolate(unref(errors).name)}</small></div><div class="flex flex:col gap:4"><label for="author_urls" class="f:bold">\u793E\u4EA4\u94FE\u63A5</label>`);
      _push(ssrRenderComponent(_component_Chips, mergeProps({
        modelValue: unref(urls),
        "onUpdate:modelValue": ($event) => isRef(urls) ? urls.value = $event : null
      }, unref(urlsAttrs), {
        placeholder: "\u8F93\u5165\u7F51\u5740\u540E\u6309\u56DE\u8F66\u6DFB\u52A0",
        "input-id": "author_urls",
        class: { "p-invalid": unref(errors).urls },
        pt: { container: { class: "w:full" } }
      }), {
        chip: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex:row align-items:center gap:4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Tag, null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<img${ssrRenderAttr("src", (_a = ("urlToFavicon" in _ctx ? _ctx.urlToFavicon : unref(urlToFavicon))(slotProps.value)) != null ? _a : "favicon.ico")} alt="favicon" class="h:16 aspect:1/1 mr:2"${_scopeId2}>${ssrInterpolate((_b = ("urlToHostname" in _ctx ? _ctx.urlToHostname : unref(urlToHostname))(slotProps.value)) != null ? _b : "unknown")}`);
                } else {
                  return [
                    createVNode("img", {
                      src: (_c = ("urlToFavicon" in _ctx ? _ctx.urlToFavicon : unref(urlToFavicon))(slotProps.value)) != null ? _c : "favicon.ico",
                      alt: "favicon",
                      class: "h:16 aspect:1/1 mr:2"
                    }, null, 8, ["src"]),
                    createTextVNode(toDisplayString((_d = ("urlToHostname" in _ctx ? _ctx.urlToHostname : unref(urlToHostname))(slotProps.value)) != null ? _d : "unknown"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex:row align-items:center gap:4" }, [
                createVNode(_component_Tag, null, {
                  default: withCtx(() => {
                    var _a, _b;
                    return [
                      createVNode("img", {
                        src: (_a = ("urlToFavicon" in _ctx ? _ctx.urlToFavicon : unref(urlToFavicon))(slotProps.value)) != null ? _a : "favicon.ico",
                        alt: "favicon",
                        class: "h:16 aspect:1/1 mr:2"
                      }, null, 8, ["src"]),
                      createTextVNode(toDisplayString((_b = ("urlToHostname" in _ctx ? _ctx.urlToHostname : unref(urlToHostname))(slotProps.value)) != null ? _b : "unknown"), 1)
                    ];
                  }),
                  _: 2
                }, 1024)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<small class="p-error">${ssrInterpolate(unref(errors).urls)}</small></div>`);
      _push(ssrRenderComponent(_component_Button, {
        type: "submit",
        label: "\u6DFB\u52A0",
        loading: unref(uploading)
      }, null, _parent));
      _push(`</form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dialog/NewAuthor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=NewAuthor-aca1b768.mjs.map
