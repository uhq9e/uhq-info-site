import script from './menubar.esm-4d5e70e3.mjs';
import script$1 from './datatable.esm-528efe18.mjs';
import script$2 from './column.esm-448b01a0.mjs';
import script$3 from './inputnumber.esm-3190ec1b.mjs';
import script$4 from './inputtext.esm-f33fbeb4.mjs';
import script$5 from './button.esm-ecbaff79.mjs';
import script$6 from './toast.esm-1dd156e2.mjs';
import script$7 from './confirmdialog.esm-091adbf2.mjs';
import script$8 from './dynamicdialog.esm-c5fe16a7.mjs';
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, withKeys, useSSRContext } from 'vue';
import { F as FilterMatchMode, d as useI18n, e as useConfirm, f as useToast, g as useDialog } from '../server.mjs';
import { u as useFetch } from './fetch-b7fe539d.mjs';
import { s as sortMetaArrayToFormat } from './index-8368f3bf.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './NewAuthor-aca1b768.mjs';
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
import './chips.esm-6d2cd9fb.mjs';
import './tag.esm-a59af12d.mjs';
import 'vee-validate';
import '@vee-validate/yup';
import 'yup';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "authors",
  __ssrInlineRender: true,
  setup(__props) {
    const defaultOrderBy = [{ field: "id", order: -1 }];
    const filters = ref({
      id: { value: null, matchMode: FilterMatchMode.EQUALS },
      name: { value: null, matchMode: FilterMatchMode.CONTAINS }
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
      "/api/authors/item",
      {
        query: queryParams,
        server: false
      },
      "$K5iJBgiekx"
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
          $fetch.raw(`/api/authors/item/${id}`, {
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
                  detail: t("requestErrors.status.404"),
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
      var _a, _b;
      queryParams.value = {
        ...queryParams.value,
        offset: event.first,
        order_by: sortMetaArrayToFormat((_a = event.multiSortMeta) != null ? _a : defaultOrderBy),
        id: (_b = event.filters.id.value) != null ? _b : void 0,
        name: event.filters.name.value ? `%${event.filters.name.value}%` : void 0
      };
      execute();
    }
    function onSort(event) {
      var _a, _b;
      queryParams.value = {
        ...queryParams.value,
        offset: event.first,
        order_by: sortMetaArrayToFormat((_a = event.multiSortMeta) != null ? _a : defaultOrderBy),
        id: (_b = event.filters.id.value) != null ? _b : void 0,
        name: event.filters.name.value ? `%${event.filters.name.value}%` : void 0
      };
      execute();
    }
    function onFilter(event) {
      var _a, _b;
      queryParams.value = {
        ...queryParams.value,
        offset: event.first,
        order_by: sortMetaArrayToFormat((_a = event.multiSortMeta) != null ? _a : defaultOrderBy),
        id: (_b = event.filters.id.value) != null ? _b : void 0,
        name: event.filters.name.value ? `%${event.filters.name.value}%` : void 0
      };
    }
    function showNewItemDialog() {
      dialog.open(_sfc_main$1, {
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
      var _a2, _b2;
      var _a, _b;
      const _component_Menubar = script;
      const _component_DataTable = script$1;
      const _component_Column = script$2;
      const _component_InputNumber = script$3;
      const _component_InputText = script$4;
      const _component_Button = script$5;
      const _component_Toast = script$6;
      const _component_ConfirmDialog = script$7;
      const _component_DynamicDialog = script$8;
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
        "sort-mode": "multiple",
        "multi-sort-meta": defaultOrderBy,
        filters: unref(filters),
        "onUpdate:filters": ($event) => isRef(filters) ? filters.value = $event : null,
        globalFilterFields: ["id", "name"],
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
            _push2(ssrRenderComponent(_component_Column, {
              field: "name",
              header: "\u4F5C\u8005\u540D",
              "show-filter-match-modes": false,
              sortable: ""
            }, {
              filter: withCtx(({ filterModel, filterCallback }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_InputText, {
                    modelValue: filterModel.value,
                    "onUpdate:modelValue": ($event) => filterModel.value = $event,
                    onKeydown: ($event) => filterCallback(),
                    class: "p-column-filter",
                    placeholder: "\u68C0\u7D22\u4F5C\u8005\u540D"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_InputText, {
                      modelValue: filterModel.value,
                      "onUpdate:modelValue": ($event) => filterModel.value = $event,
                      onKeydown: withKeys(($event) => filterCallback(), ["enter"]),
                      class: "p-column-filter",
                      placeholder: "\u68C0\u7D22\u4F5C\u8005\u540D"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
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
              createVNode(_component_Column, {
                field: "name",
                header: "\u4F5C\u8005\u540D",
                "show-filter-match-modes": false,
                sortable: ""
              }, {
                filter: withCtx(({ filterModel, filterCallback }) => [
                  createVNode(_component_InputText, {
                    modelValue: filterModel.value,
                    "onUpdate:modelValue": ($event) => filterModel.value = $event,
                    onKeydown: withKeys(($event) => filterCallback(), ["enter"]),
                    class: "p-column-filter",
                    placeholder: "\u68C0\u7D22\u4F5C\u8005\u540D"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onKeydown"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manage/authors.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=authors-afa27fc5.mjs.map
