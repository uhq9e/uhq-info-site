import k from"./paginator.esm.1b688027.js";import{ah as b,ai as g,ao as T,ap as R,o as n,c as u,R as i,S as s,s as l,j as w,as as P,w as m,l as v,a as h,F as S,i as $}from"./entry.e65a8b12.js";import"./index.esm.b3e830a1.js";import"./baseicon.esm.727e0a4e.js";import"./dropdown.esm.1ffad83e.js";import"./index.esm.f6d9606f.js";import"./index.esm.2a477ad8.js";import"./index.esm.42b2c471.js";import"./overlayeventbus.esm.5f1005ca.js";import"./portal.esm.aa40dffd.js";import"./virtualscroller.esm.5359c919.js";import"./inputnumber.esm.ac77af66.js";import"./button.esm.4cfb2234.js";import"./badge.esm.63629650.js";import"./index.esm.4ca4af39.js";import"./index.esm.08a63c45.js";import"./inputtext.esm.6f13cc8a.js";import"./index.esm.6ffad009.js";var L={root:function(e){var r=e.props;return["p-dataview p-component",{"p-dataview-list":r.layout==="list","p-dataview-grid":r.layout==="grid"}]},header:"p-dataview-header",paginator:function(e){var r=e.instance;return r.paginatorTop?"p-paginator-top":r.paginatorBottom?"p-paginator-bottom":""},content:"p-dataview-content",grid:"p-grid p-nogutter grid grid-nogutter",column:"p-col col",emptyMessage:"p-dataview-emptymessage",footer:"p-dataview-footer"},O=b.extend({name:"dataview",classes:L}),A={name:"BaseDataView",extends:T,props:{value:{type:Array,default:null},layout:{type:String,default:"list"},rows:{type:Number,default:0},first:{type:Number,default:0},totalRecords:{type:Number,default:0},paginator:{type:Boolean,default:!1},paginatorPosition:{type:String,default:"bottom"},alwaysShowPaginator:{type:Boolean,default:!0},paginatorTemplate:{type:String,default:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"},pageLinkSize:{type:Number,default:5},rowsPerPageOptions:{type:Array,default:null},currentPageReportTemplate:{type:String,default:"({currentPage} of {totalPages})"},sortField:{type:[String,Function],default:null},sortOrder:{type:Number,default:null},lazy:{type:Boolean,default:!1},dataKey:{type:String,default:null}},style:O,provide:function(){return{$parentInstance:this}}};function B(t){return N(t)||D(t)||z(t)||F()}function F(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function z(t,e){if(t){if(typeof t=="string")return c(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(t,e)}}function D(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function N(t){if(Array.isArray(t))return c(t)}function c(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,d=new Array(e);r<e;r++)d[r]=t[r];return d}var V={name:"DataView",extends:A,emits:["update:first","update:rows","page"],data:function(){return{d_first:this.first,d_rows:this.rows}},watch:{first:function(e){this.d_first=e},rows:function(e){this.d_rows=e},sortField:function(){this.resetPage()},sortOrder:function(){this.resetPage()}},methods:{getKey:function(e,r){return this.dataKey?g.resolveFieldData(e,this.dataKey):r},onPage:function(e){this.d_first=e.first,this.d_rows=e.rows,this.$emit("update:first",this.d_first),this.$emit("update:rows",this.d_rows),this.$emit("page",e)},sort:function(){var e=this;if(this.value){var r=B(this.value),d=g.localeComparator();return r.sort(function(p,a){var f=g.resolveFieldData(p,e.sortField),o=g.resolveFieldData(a,e.sortField);return g.sort(f,o,e.sortOrder,d)}),r}else return null},resetPage:function(){this.d_first=0,this.$emit("update:first",this.d_first)}},computed:{getTotalRecords:function(){return this.totalRecords?this.totalRecords:this.value?this.value.length:0},empty:function(){return!this.value||this.value.length===0},paginatorTop:function(){return this.paginator&&(this.paginatorPosition!=="bottom"||this.paginatorPosition==="both")},paginatorBottom:function(){return this.paginator&&(this.paginatorPosition!=="top"||this.paginatorPosition==="both")},items:function(){if(this.value&&this.value.length){var e=this.value;if(e&&e.length&&this.sortField&&(e=this.sort()),this.paginator){var r=this.lazy?0:this.d_first;return e.slice(r,r+this.d_rows)}else return e}else return null}},components:{DVPaginator:k}};function C(t,e,r,d,p,a){var f=R("DVPaginator");return n(),u("div",i({class:t.cx("root")},t.ptm("root"),{"data-pc-name":"dataview"}),[t.$slots.header?(n(),u("div",i({key:0,class:t.cx("header")},t.ptm("header")),[s(t.$slots,"header")],16)):l("",!0),a.paginatorTop?(n(),w(f,{key:1,rows:p.d_rows,first:p.d_first,totalRecords:a.getTotalRecords,pageLinkSize:t.pageLinkSize,template:t.paginatorTemplate,rowsPerPageOptions:t.rowsPerPageOptions,currentPageReportTemplate:t.currentPageReportTemplate,class:v(t.cx("paginator")),alwaysShow:t.alwaysShowPaginator,onPage:e[0]||(e[0]=function(o){return a.onPage(o)}),unstyled:t.unstyled,pt:t.ptm("paginator")},P({_:2},[t.$slots.paginatorstart?{name:"start",fn:m(function(){return[s(t.$slots,"paginatorstart")]}),key:"0"}:void 0,t.$slots.paginatorend?{name:"end",fn:m(function(){return[s(t.$slots,"paginatorend")]}),key:"1"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):l("",!0),h("div",i({class:t.cx("content")},t.ptm("content")),[h("div",i({class:t.cx("grid")},t.ptm("grid")),[(n(!0),u(S,null,$(a.items,function(o,y){return n(),u(S,{key:a.getKey(o,y)},[t.$slots.list&&t.layout==="list"?s(t.$slots,"list",{key:0,data:o,index:y}):l("",!0),t.$slots.grid&&t.layout==="grid"?s(t.$slots,"grid",{key:1,data:o,index:y}):l("",!0)],64)}),128)),a.empty?(n(),u("div",i({key:0,class:t.cx("column")},t.ptm("column")),[h("div",i({class:t.cx("emptyMessage")},t.ptm("emptyMessage")),[s(t.$slots,"empty")],16)],16)):l("",!0)],16)],16),a.paginatorBottom?(n(),w(f,{key:2,rows:p.d_rows,first:p.d_first,totalRecords:a.getTotalRecords,pageLinkSize:t.pageLinkSize,template:t.paginatorTemplate,rowsPerPageOptions:t.rowsPerPageOptions,currentPageReportTemplate:t.currentPageReportTemplate,class:v(t.cx("paginator")),alwaysShow:t.alwaysShowPaginator,onPage:e[1]||(e[1]=function(o){return a.onPage(o)}),unstyled:t.unstyled,pt:t.ptm("paginator")},P({_:2},[t.$slots.paginatorstart?{name:"start",fn:m(function(){return[s(t.$slots,"paginatorstart")]}),key:"0"}:void 0,t.$slots.paginatorend?{name:"end",fn:m(function(){return[s(t.$slots,"paginatorend")]}),key:"1"}:void 0]),1032,["rows","first","totalRecords","pageLinkSize","template","rowsPerPageOptions","currentPageReportTemplate","class","alwaysShow","unstyled","pt"])):l("",!0),t.$slots.footer?(n(),u("div",i({key:3,class:t.cx("footer")},t.ptm("footer")),[s(t.$slots,"footer")],16)):l("",!0)],16)}V.render=C;export{V as default};
