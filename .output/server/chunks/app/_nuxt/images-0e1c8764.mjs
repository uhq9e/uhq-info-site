import script from './menubar.esm-4d5e70e3.mjs';
import script$1 from './datatable.esm-528efe18.mjs';
import script$2 from './column.esm-448b01a0.mjs';
import script$3 from './inputnumber.esm-3190ec1b.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './UseSocialPost-f4665701.mjs';
import script$4 from './tag.esm-a59af12d.mjs';
import script$5 from './calendar.esm-710a5529.mjs';
import script$6 from './checkbox.esm-f7aeaa36.mjs';
import script$7 from './tristatecheckbox.esm-596a0174.mjs';
import script$8 from './button.esm-ecbaff79.mjs';
import script$9 from './toast.esm-1dd156e2.mjs';
import script$a from './confirmdialog.esm-091adbf2.mjs';
import script$b from './dynamicdialog.esm-c5fe16a7.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, withKeys, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, watch, inject, computed } from 'vue';
import { F as FilterMatchMode, d as useI18n, e as useConfirm, f as useToast, g as useDialog, _ as _export_sfc, t as toRef, h as useObjectUrl, i as toValue, j as tryOnScopeDispose } from '../server.mjs';
import { u as useFetch } from './fetch-b7fe539d.mjs';
import { s as sortMetaArrayToFormat, f as formatDate, u as urlToFavicon } from './index-8368f3bf.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import script$c from './autocomplete.esm-eb5e5f1d.mjs';
import script$d from './chips.esm-6d2cd9fb.mjs';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { _ as _sfc_main$2 } from './NewAuthor-aca1b768.mjs';
import * as yup from 'yup';
import './index.esm-2206b48f.mjs';
import './baseicon.esm-95b030db.mjs';
import './index.esm-edfc390e.mjs';
import './index.esm-ca7b6c02.mjs';
import './index.esm-dbcdf49b.mjs';
import './paginator.esm-47d8a321.mjs';
import './index.esm-a352f37c.mjs';
import './dropdown.esm-5e9a1388.mjs';
import './index.esm-2a968448.mjs';
import './index.esm-905a09c0.mjs';
import './overlayeventbus.esm-e3d31df3.mjs';
import './portal.esm-fb4d8ec4.mjs';
import './virtualscroller.esm-a1fbc95c.mjs';
import './index.esm-c66f718d.mjs';
import './index.esm-dfa1186a.mjs';
import './index.esm-f7767a90.mjs';
import './index.esm-4a34944e.mjs';
import './index.esm-67b61922.mjs';
import './inputtext.esm-f33fbeb4.mjs';
import './overlaypanel.esm-40c0358a.mjs';
import './index.esm-6eb921ee.mjs';
import './index.esm-9365f56f.mjs';
import './badge.esm-c4a594dc.mjs';
import './index.esm-3f7ff53d.mjs';
import './index.esm-c061dd0f.mjs';
import './dialog.esm-bf442840.mjs';
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

function resolveElement(el) {
  if (typeof Window !== "undefined" && el instanceof Window)
    return el.document.documentElement;
  if (typeof Document !== "undefined" && el instanceof Document)
    return el.documentElement;
  return el;
}
const UseObjectUrl = /* @__PURE__ */ defineComponent({
  name: "UseObjectUrl",
  props: [
    "object"
  ],
  setup(props, { slots }) {
    const object = toRef(props, "object");
    const url = useObjectUrl(object);
    return () => {
      if (slots.default && url.value)
        return slots.default(url);
    };
  }
});
const elInitialOverflow = /* @__PURE__ */ new WeakMap();
function useScrollLock(element, initialState = false) {
  const isLocked = ref(initialState);
  let initialOverflow;
  watch(toRef(element), (el) => {
    const target = resolveElement(toValue(el));
    if (target) {
      const ele = target;
      if (!elInitialOverflow.get(ele))
        elInitialOverflow.set(ele, initialOverflow);
      if (isLocked.value)
        ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const el = resolveElement(toValue(element));
    if (!el || isLocked.value)
      return;
    el.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    var _a;
    const el = resolveElement(toValue(element));
    if (!el || !isLocked.value)
      return;
    el.style.overflow = (_a = elInitialOverflow.get(el)) != null ? _a : "";
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else
        unlock();
    }
  });
}
function onScrollLock() {
  let isMounted = false;
  const state = ref(false);
  return (el, binding) => {
    state.value = binding.value;
    if (isMounted)
      return;
    isMounted = true;
    const isLocked = useScrollLock(el, binding.value);
    watch(state, (v) => isLocked.value = v);
  };
}
onScrollLock();
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NewImageItem",
  __ssrInlineRender: true,
  setup(__props) {
    const dialog = useDialog();
    const dialogRef = inject("dialogRef");
    const { data, pending, error, execute } = useFetch(
      "/api/authors/all",
      {
        server: false
      },
      "$h2i8gIzjKw"
    );
    const { errors, defineField, handleSubmit } = useForm({
      validationSchema: toTypedSchema(
        yup.object({
          date: yup.date().required().default(/* @__PURE__ */ new Date()),
          author: yup.object().required(),
          urls: yup.array().of(yup.string().url()).default([]),
          nsfw: yup.bool().required().default(false),
          images: yup.array().of(yup.mixed()).default([])
        })
      )
    });
    const [date, dateAttrs] = defineField("date");
    const [author, authorAttrs] = defineField("author");
    const [urls, urlsAttrs] = defineField("urls");
    const [nsfw, nsfwAttrs] = defineField("nsfw");
    const [images, imagesAttrs] = defineField("images");
    const filteredAuthors = ref([]);
    const uploading = ref(false);
    function search(event) {
      if (data.value) {
        if (event.query.trim().length) {
          filteredAuthors.value = data.value.items.filter((author2) => {
            return author2.name.toLowerCase().includes(event.query.toLowerCase());
          });
        } else {
          filteredAuthors.value = [...data.value.items];
        }
      }
    }
    function addImage() {
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.multiple = true;
      input.onchange = (e) => {
        var _a2;
        var _a;
        const files = (_a = e == null ? void 0 : e.target) == null ? void 0 : _a.files;
        if (files) {
          images.value = [...(_a2 = images.value) != null ? _a2 : [], ...files];
        }
      };
      input.click();
    }
    function removeImage(index) {
      var _a;
      images.value = (_a = images.value) == null ? void 0 : _a.filter((_, i) => i !== index);
    }
    handleSubmit(async (values) => {
      uploading.value = true;
      let requests = [];
      for (const file of values.images) {
        if (file) {
          const f = file;
          requests.push(
            $fetch("/api/storage/item", {
              method: "POST",
              body: f
            })
          );
        }
      }
      let imageIds = (await Promise.all(requests)).map((v) => v.id);
      let insertedItem = await $fetch("/api/images/item", {
        method: "POST",
        body: {
          author_id: values.author.id,
          local_file_ids: imageIds,
          urls: values.urls,
          date: formatDate(values.date),
          nsfw: values.nsfw
        }
      });
      uploading.value = false;
      dialogRef == null ? void 0 : dialogRef.value.close(insertedItem);
    });
    function addAuthor() {
      dialog.open(_sfc_main$2, {
        props: {
          header: "\u6DFB\u52A0\u4F5C\u8005",
          modal: true,
          style: {
            width: "50rem",
            maxWidth: "100vw"
          }
        },
        onClose: (opt) => {
          if ((opt == null ? void 0 : opt.type) === "config-close") {
            execute();
          }
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Calendar = script$5;
      const _component_AutoComplete = script$c;
      const _component_Button = script$8;
      const _component_Chips = script$d;
      const _component_UseSocialPost = _sfc_main$3;
      const _component_Tag = script$4;
      const _component_Checkbox = script$6;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "flex flex:col gap:16" }, _attrs))} data-v-1bd36ffc><div class="flex flex:col gap:4" data-v-1bd36ffc><label for="date" class="f:bold" data-v-1bd36ffc>\u9009\u62E9\u65E5\u671F</label>`);
      _push(ssrRenderComponent(_component_Calendar, mergeProps({
        "input-id": "date",
        modelValue: unref(date),
        "onUpdate:modelValue": ($event) => isRef(date) ? date.value = $event : null
      }, unref(dateAttrs), {
        "input-class": { "p-invalid": unref(errors).date },
        "date-format": "yy-mm-dd",
        class: "w:full"
      }), null, _parent));
      _push(`<small class="p-error" data-v-1bd36ffc>${ssrInterpolate(unref(errors).date)}</small></div><div class="flex flex:col gap:4" data-v-1bd36ffc><label for="author" class="f:bold" data-v-1bd36ffc>\u9009\u62E9\u4F5C\u8005</label><div class="flex flex:row gap:4 w:full" data-v-1bd36ffc>`);
      _push(ssrRenderComponent(_component_AutoComplete, mergeProps({
        modelValue: unref(author),
        "onUpdate:modelValue": ($event) => isRef(author) ? author.value = $event : null
      }, unref(authorAttrs), {
        "option-label": "name",
        "input-id": "author",
        placeholder: "\u8F93\u5165\u540D\u79F0\u67E5\u627E\u4F5C\u8005",
        suggestions: unref(filteredAuthors),
        loading: unref(pending),
        disabled: unref(pending),
        "input-class": ["w:full", { "p-invalid": unref(errors).author }],
        class: "flex-grow:1",
        onComplete: search
      }), null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        onClick: addAuthor,
        icon: "pi pi-plus"
      }, null, _parent));
      _push(`</div><small class="p-error" data-v-1bd36ffc>${ssrInterpolate(unref(errors).author)}</small></div><div class="flex flex:col gap:4" data-v-1bd36ffc><label for="urls" class="f:bold" data-v-1bd36ffc>\u539F\u5740\u94FE\u63A5</label>`);
      _push(ssrRenderComponent(_component_Chips, mergeProps({
        modelValue: unref(urls),
        "onUpdate:modelValue": ($event) => isRef(urls) ? urls.value = $event : null
      }, unref(urlsAttrs), {
        placeholder: "\u8F93\u5165\u7F51\u5740\u540E\u6309\u56DE\u8F66\u6DFB\u52A0",
        "input-id": "urls",
        class: { "p-invalid": unref(errors).urls },
        pt: { container: { class: "w:full" } }
      }), {
        chip: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UseSocialPost, {
              url: slotProps.value
            }, {
              default: withCtx((slotProps_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex:row align-items:center gap:4" data-v-1bd36ffc${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Tag, null, {
                    default: withCtx((_, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2;
                      if (_push4) {
                        _push4(`<img${ssrRenderAttr("src", (_a2 = unref(urlToFavicon)(slotProps.value)) != null ? _a2 : "favicon.ico")} alt="favicon" class="h:16 aspect:1/1 mr:2" data-v-1bd36ffc${_scopeId3}> ${ssrInterpolate(slotProps_.socialPostType.key)}`);
                      } else {
                        return [
                          createVNode("img", {
                            src: (_b2 = unref(urlToFavicon)(slotProps.value)) != null ? _b2 : "favicon.ico",
                            alt: "favicon",
                            class: "h:16 aspect:1/1 mr:2"
                          }, null, 8, ["src"]),
                          createTextVNode(" " + toDisplayString(slotProps_.socialPostType.key), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<span data-v-1bd36ffc${_scopeId2}>${ssrInterpolate(slotProps_.socialPostType.toDisplay() || slotProps.value)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex:row align-items:center gap:4" }, [
                      createVNode(_component_Tag, null, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createVNode("img", {
                              src: (_a2 = unref(urlToFavicon)(slotProps.value)) != null ? _a2 : "favicon.ico",
                              alt: "favicon",
                              class: "h:16 aspect:1/1 mr:2"
                            }, null, 8, ["src"]),
                            createTextVNode(" " + toDisplayString(slotProps_.socialPostType.key), 1)
                          ];
                        }),
                        _: 2
                      }, 1024),
                      createVNode("span", null, toDisplayString(slotProps_.socialPostType.toDisplay() || slotProps.value), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UseSocialPost, {
                url: slotProps.value
              }, {
                default: withCtx((slotProps_) => [
                  createVNode("div", { class: "flex flex:row align-items:center gap:4" }, [
                    createVNode(_component_Tag, null, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode("img", {
                            src: (_a2 = unref(urlToFavicon)(slotProps.value)) != null ? _a2 : "favicon.ico",
                            alt: "favicon",
                            class: "h:16 aspect:1/1 mr:2"
                          }, null, 8, ["src"]),
                          createTextVNode(" " + toDisplayString(slotProps_.socialPostType.key), 1)
                        ];
                      }),
                      _: 2
                    }, 1024),
                    createVNode("span", null, toDisplayString(slotProps_.socialPostType.toDisplay() || slotProps.value), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["url"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<small class="p-error" data-v-1bd36ffc>${ssrInterpolate(unref(errors).urls)}</small></div><div class="flex flex:col gap:4" data-v-1bd36ffc><label for="nsfw" class="f:bold" data-v-1bd36ffc>\u662F\u5426\u4E3ANSFW</label>`);
      _push(ssrRenderComponent(_component_Checkbox, mergeProps({
        "input-id": "nsfw",
        modelValue: unref(nsfw),
        "onUpdate:modelValue": ($event) => isRef(nsfw) ? nsfw.value = $event : null
      }, unref(nsfwAttrs), {
        "input-class": { "p-invalid": unref(errors).nsfw },
        binary: true
      }), null, _parent));
      _push(`<small class="p-error" data-v-1bd36ffc>${ssrInterpolate(unref(errors).nsfw)}</small></div><div class="flex flex:col gap:4" data-v-1bd36ffc>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: addImage,
        label: "\u4E0A\u4F20\u56FE\u7247",
        icon: "pi pi-plus",
        class: "as:start",
        badge: (_a = unref(images)) == null ? void 0 : _a.length.toString()
      }, null, _parent));
      if ((_b = unref(images)) == null ? void 0 : _b.length) {
        _push(`<div class="w:full h:150 py:8 flex flex:row gap:8 overflow-x:auto" data-v-1bd36ffc><!--[-->`);
        ssrRenderList(unref(images), (file, i) => {
          _push(ssrRenderComponent(unref(UseObjectUrl), {
            key: i,
            object: file
          }, {
            default: withCtx((url, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="h:full r:6 aspect:1/1 bg:center bg:cover shadow-2 image-container" style="${ssrRenderStyle(`background-image: url(${url.value})`)}" data-v-1bd36ffc${_scopeId}><div class="rel w:full h:full bg:#00000020 ~opacity|200ms image-actions" data-v-1bd36ffc${_scopeId}>`);
                _push2(ssrRenderComponent(_component_Button, {
                  onClick: ($event) => removeImage(i),
                  icon: "pi pi-trash",
                  severity: "danger",
                  text: "",
                  rounded: "",
                  size: "small",
                  class: "abs top:10 right:10 bg:white"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", {
                    class: "h:full r:6 aspect:1/1 bg:center bg:cover shadow-2 image-container",
                    style: `background-image: url(${url.value})`
                  }, [
                    createVNode("div", { class: "rel w:full h:full bg:#00000020 ~opacity|200ms image-actions" }, [
                      createVNode(_component_Button, {
                        onClick: ($event) => removeImage(i),
                        icon: "pi pi-trash",
                        severity: "danger",
                        text: "",
                        rounded: "",
                        size: "small",
                        class: "abs top:10 right:10 bg:white"
                      }, null, 8, ["onClick"])
                    ])
                  ], 4)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<small class="p-error" data-v-1bd36ffc>${ssrInterpolate(unref(errors).images)}</small></div>`);
      _push(ssrRenderComponent(_component_Button, {
        type: "submit",
        label: "\u6DFB\u52A0",
        loading: unref(uploading)
      }, null, _parent));
      _push(`</form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dialog/NewImageItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NewImageItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1bd36ffc"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "images",
  __ssrInlineRender: true,
  setup(__props) {
    const defaultOrderBy = [{ field: "id", order: -1 }];
    const filters = ref({
      id: { value: null, matchMode: FilterMatchMode.EQUALS },
      date: { value: null, matchMode: FilterMatchMode.EQUALS },
      nsfw: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const { t } = useI18n();
    const confirm = useConfirm();
    const toast = useToast();
    const dialog = useDialog();
    const loading = ref(false);
    const queryParams = ref({
      offset: 0,
      limit: 20,
      order_by: sortMetaArrayToFormat(defaultOrderBy)
    });
    const menuItems = ref([
      { label: "\u6DFB\u52A0\u6761\u76EE", icon: "pi pi-plus", command: showNewItemDialog },
      { label: "\u5237\u65B0", icon: "pi pi-refresh", command: () => execute() }
    ]);
    const { data, pending, error, execute } = useFetch(
      "/api/images/item",
      {
        query: queryParams,
        server: false
      },
      "$aIUgAkptOX"
    );
    function onDeleteItem(id) {
      confirm.require({
        message: "\u4F60\u662F\u5426\u786E\u5B9A\u8981\u5220\u9664\uFF1F",
        header: "\u786E\u8BA4\u5220\u9664",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger p-button-text",
        rejectClass: "p-button",
        accept: () => {
          loading.value = true;
          $fetch.raw(`/api/images/item/${id}`, {
            method: "DELETE",
            ignoreResponseError: true
          }).then((resp) => {
            switch (resp.status) {
              case 200:
                execute();
                toast.add({
                  severity: "info",
                  summary: t("shared.confirmed"),
                  detail: t("messages.itemDeleted"),
                  life: 3e3
                });
                break;
              case 403:
                toast.add({
                  severity: "error",
                  summary: t("shared.error"),
                  detail: t("requestErrors.status.403"),
                  life: 3e3
                });
                break;
              case 404:
                toast.add({
                  severity: "error",
                  summary: t("shared.error"),
                  detail: t("requestErrors.status.404"),
                  life: 3e3
                });
                break;
              default:
                toast.add({
                  severity: "error",
                  summary: t("shared.error"),
                  detail: t("requestErrors.network"),
                  life: 3e3
                });
                break;
            }
          }).catch(() => {
            toast.add({
              severity: "error",
              summary: t("shared.error"),
              detail: t("requestErrors.network"),
              life: 3e3
            });
          }).finally(() => {
            loading.value = false;
          });
        }
      });
    }
    function onPage(event) {
      var _a, _b, _c, _d;
      queryParams.value = {
        ...queryParams.value,
        offset: event.first,
        order_by: sortMetaArrayToFormat((_a = event.multiSortMeta) != null ? _a : defaultOrderBy),
        id: (_b = event.filters.id.value) != null ? _b : void 0,
        date: (_c = formatDate(event.filters.date.value)) != null ? _c : void 0,
        nsfw: (_d = event.filters.nsfw.value) != null ? _d : void 0
      };
      execute();
    }
    function onSort(event) {
      var _a, _b, _c, _d;
      console.log(event);
      queryParams.value = {
        ...queryParams.value,
        offset: event.first,
        order_by: sortMetaArrayToFormat((_a = event.multiSortMeta) != null ? _a : defaultOrderBy),
        id: (_b = event.filters.id.value) != null ? _b : void 0,
        date: (_c = formatDate(event.filters.date.value)) != null ? _c : void 0,
        nsfw: (_d = event.filters.nsfw.value) != null ? _d : void 0
      };
      execute();
    }
    function onFilter(event) {
      var _a, _b, _c, _d;
      console.log(event);
      queryParams.value = {
        ...queryParams.value,
        offset: event.first,
        order_by: sortMetaArrayToFormat((_a = event.multiSortMeta) != null ? _a : defaultOrderBy),
        id: (_b = event.filters.id.value) != null ? _b : void 0,
        date: (_c = formatDate(event.filters.date.value)) != null ? _c : void 0,
        nsfw: (_d = event.filters.nsfw.value) != null ? _d : void 0
      };
    }
    function showNewItemDialog() {
      dialog.open(NewImageItem, {
        props: {
          header: "\u6DFB\u52A0\u6761\u76EE",
          modal: true,
          style: {
            width: "50rem",
            maxWidth: "100vw"
          }
        },
        onClose: (opt) => {
          if ((opt == null ? void 0 : opt.type) === "config-close") {
            execute();
          }
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      var _a, _b;
      const _component_Menubar = script;
      const _component_DataTable = script$1;
      const _component_Column = script$2;
      const _component_InputNumber = script$3;
      const _component_AuthorPanel = _sfc_main$1$1;
      const _component_Tag = script$4;
      const _component_Calendar = script$5;
      const _component_Checkbox = script$6;
      const _component_TriStateCheckbox = script$7;
      const _component_Button = script$8;
      const _component_Toast = script$9;
      const _component_ConfirmDialog = script$a;
      const _component_DynamicDialog = script$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h:full flex flex:column" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Menubar, {
        model: unref(menuItems),
        pt: { root: { class: "border:none" } }
      }, null, _parent));
      _push(ssrRenderComponent(_component_DataTable, {
        value: (_a2 = (_a = unref(data)) == null ? void 0 : _a.items) != null ? _a2 : [],
        first: unref(queryParams).offset,
        rows: unref(queryParams).limit,
        loading: unref(pending),
        "total-records": (_b2 = (_b = unref(data)) == null ? void 0 : _b.count) != null ? _b2 : 0,
        "multi-sort-meta": defaultOrderBy,
        "sort-mode": "multiple",
        filters: unref(filters),
        "onUpdate:filters": ($event) => isRef(filters) ? filters.value = $event : null,
        globalFilterFields: ["id", "date", "nsfw"],
        filterDisplay: "menu",
        "data-key": "id",
        lazy: "",
        paginator: "",
        onPage,
        onSort,
        onFilter,
        class: "flex-grow:1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Column, {
              field: "id",
              header: "ID",
              "show-filter-match-modes": false,
              sortable: ""
            }, {
              filter: withCtx(({ filterModel, filterCallback }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputNumber, {
                    modelValue: filterModel.value,
                    "onUpdate:modelValue": ($event) => filterModel.value = $event,
                    onKeydown: ($event) => filterCallback(),
                    useGrouping: false,
                    class: "p-column-filter",
                    placeholder: "\u68C0\u7D22ID"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_InputNumber, {
                      modelValue: filterModel.value,
                      "onUpdate:modelValue": ($event) => filterModel.value = $event,
                      onKeydown: withKeys(($event) => filterCallback(), ["enter"]),
                      useGrouping: false,
                      class: "p-column-filter",
                      placeholder: "\u68C0\u7D22ID"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { header: "\u56FE\u7247\u6570\u91CF" }, {
              body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(slotProps.data.local_files.length)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(slotProps.data.local_files.length), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { header: "\u9884\u89C8" }, {
              body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (slotProps.data.local_files.length) {
                    _push3(`<div class="${ssrRenderClass(`aspect:1/1 w:6rem shadow-2 r:6 bg:center bg:cover bg:url('https://object.wakachika.love/${slotProps.data.local_files[0].path}')`)}"${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    slotProps.data.local_files.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: `aspect:1/1 w:6rem shadow-2 r:6 bg:center bg:cover bg:url('https://object.wakachika.love/${slotProps.data.local_files[0].path}')`
                    }, null, 2)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "author_id",
              header: "\u4F5C\u8005"
            }, {
              body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AuthorPanel, {
                    author: slotProps.data.author
                  }, {
                    default: withCtx((slot, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Tag, {
                          class: "cursor:pointer",
                          value: slotProps.data.author.name,
                          onClick: ($event) => {
                            var _a22;
                            return (_a22 = slot.op) == null ? void 0 : _a22.show($event);
                          }
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_Tag, {
                            class: "cursor:pointer",
                            value: slotProps.data.author.name,
                            onClick: ($event) => {
                              var _a22;
                              return (_a22 = slot.op) == null ? void 0 : _a22.show($event);
                            }
                          }, null, 8, ["value", "onClick"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AuthorPanel, {
                      author: slotProps.data.author
                    }, {
                      default: withCtx((slot) => [
                        createVNode(_component_Tag, {
                          class: "cursor:pointer",
                          value: slotProps.data.author.name,
                          onClick: ($event) => {
                            var _a22;
                            return (_a22 = slot.op) == null ? void 0 : _a22.show($event);
                          }
                        }, null, 8, ["value", "onClick"])
                      ]),
                      _: 2
                    }, 1032, ["author"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "date",
              header: "\u65E5\u671F",
              "show-filter-match-modes": false,
              sortable: ""
            }, {
              filter: withCtx(({ filterModel, filterCallback }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Calendar, {
                    modelValue: filterModel.value,
                    "onUpdate:modelValue": ($event) => filterModel.value = $event,
                    onKeydown: ($event) => filterCallback(),
                    "date-format": "yy-mm-dd",
                    class: "p-column-filter",
                    placeholder: "\u68C0\u7D22\u65E5\u671F"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Calendar, {
                      modelValue: filterModel.value,
                      "onUpdate:modelValue": ($event) => filterModel.value = $event,
                      onKeydown: withKeys(($event) => filterCallback(), ["enter"]),
                      "date-format": "yy-mm-dd",
                      class: "p-column-filter",
                      placeholder: "\u68C0\u7D22\u65E5\u671F"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, {
              field: "nsfw",
              header: "NSFW",
              "show-filter-match-modes": false,
              sortable: ""
            }, {
              body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Checkbox, {
                    "model-value": slotProps.data.nsfw,
                    binary: true,
                    readonly: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Checkbox, {
                      "model-value": slotProps.data.nsfw,
                      binary: true,
                      readonly: ""
                    }, null, 8, ["model-value"])
                  ];
                }
              }),
              filter: withCtx(({ filterModel }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_TriStateCheckbox, {
                    id: "nsfw",
                    modelValue: filterModel.value,
                    "onUpdate:modelValue": ($event) => filterModel.value = $event,
                    class: "p-column-filter"
                  }, null, _parent3, _scopeId2));
                  _push3(`<label for="nsfw"${_scopeId2}>\u662F\u5426\u4E3ANSFW</label></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_TriStateCheckbox, {
                        id: "nsfw",
                        modelValue: filterModel.value,
                        "onUpdate:modelValue": ($event) => filterModel.value = $event,
                        class: "p-column-filter"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("label", { for: "nsfw" }, "\u662F\u5426\u4E3ANSFW")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Column, { header: "\u64CD\u4F5C" }, {
              body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Button, {
                    onClick: ($event) => onDeleteItem(slotProps.data.id),
                    icon: "pi pi-trash",
                    size: "small",
                    severity: "danger",
                    loading: unref(loading),
                    text: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Button, {
                      onClick: ($event) => onDeleteItem(slotProps.data.id),
                      icon: "pi pi-trash",
                      size: "small",
                      severity: "danger",
                      loading: unref(loading),
                      text: ""
                    }, null, 8, ["onClick", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Column, {
                field: "id",
                header: "ID",
                "show-filter-match-modes": false,
                sortable: ""
              }, {
                filter: withCtx(({ filterModel, filterCallback }) => [
                  createVNode(_component_InputNumber, {
                    modelValue: filterModel.value,
                    "onUpdate:modelValue": ($event) => filterModel.value = $event,
                    onKeydown: withKeys(($event) => filterCallback(), ["enter"]),
                    useGrouping: false,
                    class: "p-column-filter",
                    placeholder: "\u68C0\u7D22ID"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "\u56FE\u7247\u6570\u91CF" }, {
                body: withCtx((slotProps) => [
                  createTextVNode(toDisplayString(slotProps.data.local_files.length), 1)
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "\u9884\u89C8" }, {
                body: withCtx((slotProps) => [
                  slotProps.data.local_files.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: `aspect:1/1 w:6rem shadow-2 r:6 bg:center bg:cover bg:url('https://object.wakachika.love/${slotProps.data.local_files[0].path}')`
                  }, null, 2)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "author_id",
                header: "\u4F5C\u8005"
              }, {
                body: withCtx((slotProps) => [
                  createVNode(_component_AuthorPanel, {
                    author: slotProps.data.author
                  }, {
                    default: withCtx((slot) => [
                      createVNode(_component_Tag, {
                        class: "cursor:pointer",
                        value: slotProps.data.author.name,
                        onClick: ($event) => {
                          var _a22;
                          return (_a22 = slot.op) == null ? void 0 : _a22.show($event);
                        }
                      }, null, 8, ["value", "onClick"])
                    ]),
                    _: 2
                  }, 1032, ["author"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "date",
                header: "\u65E5\u671F",
                "show-filter-match-modes": false,
                sortable: ""
              }, {
                filter: withCtx(({ filterModel, filterCallback }) => [
                  createVNode(_component_Calendar, {
                    modelValue: filterModel.value,
                    "onUpdate:modelValue": ($event) => filterModel.value = $event,
                    onKeydown: withKeys(($event) => filterCallback(), ["enter"]),
                    "date-format": "yy-mm-dd",
                    class: "p-column-filter",
                    placeholder: "\u68C0\u7D22\u65E5\u671F"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
                ]),
                _: 1
              }),
              createVNode(_component_Column, {
                field: "nsfw",
                header: "NSFW",
                "show-filter-match-modes": false,
                sortable: ""
              }, {
                body: withCtx((slotProps) => [
                  createVNode(_component_Checkbox, {
                    "model-value": slotProps.data.nsfw,
                    binary: true,
                    readonly: ""
                  }, null, 8, ["model-value"])
                ]),
                filter: withCtx(({ filterModel }) => [
                  createVNode("div", null, [
                    createVNode(_component_TriStateCheckbox, {
                      id: "nsfw",
                      modelValue: filterModel.value,
                      "onUpdate:modelValue": ($event) => filterModel.value = $event,
                      class: "p-column-filter"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("label", { for: "nsfw" }, "\u662F\u5426\u4E3ANSFW")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_Column, { header: "\u64CD\u4F5C" }, {
                body: withCtx((slotProps) => [
                  createVNode(_component_Button, {
                    onClick: ($event) => onDeleteItem(slotProps.data.id),
                    icon: "pi pi-trash",
                    size: "small",
                    severity: "danger",
                    loading: unref(loading),
                    text: ""
                  }, null, 8, ["onClick", "loading"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      _push(ssrRenderComponent(_component_ConfirmDialog, null, null, _parent));
      _push(ssrRenderComponent(_component_DynamicDialog, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manage/images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=images-0e1c8764.mjs.map
