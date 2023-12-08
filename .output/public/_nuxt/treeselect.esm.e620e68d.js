import{s as D}from"./index.esm.f6d9606f.js";import{O as $}from"./overlayeventbus.esm.5f1005ca.js";import{s as z}from"./portal.esm.aa40dffd.js";import{ah as B,ak as L,al as p,am as M,aj as H,an as U,ao as R,ap as P,o as c,c as f,a as h,R as a,S as m,F as S,d as T,t as w,i as F,s as O,j as x,aq as W,l as V,b as K,w as k,ar as q,as as Z}from"./entry.e65a8b12.js";import G from"./tree.esm.5a1ea88e.js";import"./baseicon.esm.727e0a4e.js";import"./index.esm.b291be9b.js";import"./index.esm.2a477ad8.js";import"./index.esm.4b125a15.js";import"./index.esm.ba2c5980.js";import"./index.esm.b8ef7c4b.js";var J=`
@layer primevue {
    .p-treeselect {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
    }

    .p-treeselect-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .p-treeselect-label-container {
        overflow: hidden;
        flex: 1 1 auto;
        cursor: pointer;
    }

    .p-treeselect-label {
        display: block;
        white-space: nowrap;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .p-treeselect-label-empty {
        overflow: hidden;
        visibility: hidden;
    }

    .p-treeselect-token {
        cursor: default;
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
    }

    .p-treeselect .p-treeselect-panel {
        min-width: 100%;
    }

    .p-treeselect-items-wrapper {
        overflow: auto;
    }

    .p-fluid .p-treeselect {
        display: flex;
    }
}
`,Q={root:function(t){var n=t.props;return{position:n.appendTo==="self"?"relative":void 0}}},X={root:function(t){var n=t.instance,r=t.props;return["p-treeselect p-component p-inputwrapper",{"p-treeselect-chip":r.display==="chip","p-disabled":r.disabled,"p-focus":n.focused,"p-inputwrapper-filled":!n.emptyValue,"p-inputwrapper-focus":n.focused||n.overlayVisible}]},labelContainer:"p-treeselect-label-container",label:function(t){var n=t.instance,r=t.props;return["p-treeselect-label",{"p-placeholder":n.label===r.placeholder,"p-treeselect-label-empty":!r.placeholder&&n.emptyValue}]},token:"p-treeselect-token",tokenLabel:"p-treeselect-token-label",trigger:"p-treeselect-trigger",triggerIcon:"p-treeselect-trigger-icon",panel:function(t){var n=t.instance;return["p-treeselect-panel p-component",{"p-input-filled":n.$primevue.config.inputStyle==="filled","p-ripple-disabled":n.$primevue.config.ripple===!1}]},wrapper:"p-treeselect-items-wrapper",emptyMessage:"p-treeselect-empty-message"},Y=B.extend({name:"treeselect",css:J,classes:X,inlineStyles:Q}),_={name:"BaseTreeSelect",extends:R,props:{modelValue:null,options:Array,scrollHeight:{type:String,default:"400px"},placeholder:{type:String,default:null},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:null},selectionMode:{type:String,default:"single"},appendTo:{type:String,default:"body"},emptyMessage:{type:String,default:null},display:{type:String,default:"comma"},metaKeySelection:{type:Boolean,default:!0},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},panelClass:{type:[String,Object],default:null},panelProps:{type:null,default:null},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},style:Y,provide:function(){return{$parentInstance:this}}};function v(e){"@babel/helpers - typeof";return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(e)}function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?E(Object(n),!0).forEach(function(r){ee(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ee(e,t,n){return t=te(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function te(e){var t=ne(e,"string");return v(t)==="symbol"?t:String(t)}function ne(e,t){if(v(e)!=="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(v(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function b(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=A(e))||t&&e&&typeof e.length=="number"){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(u){throw u},f:o}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i=!0,d=!1,s;return{s:function(){n=n.call(e)},n:function(){var u=n.next();return i=u.done,u},e:function(u){d=!0,s=u},f:function(){try{!i&&n.return!=null&&n.return()}finally{if(d)throw s}}}}function re(e){return oe(e)||le(e)||A(e)||ie()}function ie(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function A(e,t){if(e){if(typeof e=="string")return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}}function le(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function oe(e){if(Array.isArray(e))return j(e)}function j(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var se={name:"TreeSelect",extends:_,emits:["update:modelValue","before-show","before-hide","change","show","hide","node-select","node-unselect","node-expand","node-collapse","focus","blur"],data:function(){return{focused:!1,overlayVisible:!1,expandedKeys:{}}},watch:{modelValue:{handler:function(){this.selfChange||this.updateTreeState(),this.selfChange=!1},immediate:!0},options:function(){this.updateTreeState()}},outsideClickListener:null,resizeListener:null,scrollHandler:null,overlay:null,selfChange:!1,selfClick:!1,beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.overlay&&(L.clear(this.overlay),this.overlay=null)},mounted:function(){this.updateTreeState()},methods:{show:function(){this.$emit("before-show"),this.overlayVisible=!0},hide:function(){this.$emit("before-hide"),this.overlayVisible=!1,this.$refs.focusInput.focus()},onFocus:function(t){this.focused=!0,this.$emit("focus",t)},onBlur:function(t){this.focused=!1,this.$emit("blur",t)},onClick:function(t){!this.disabled&&(!this.overlay||!this.overlay.contains(t.target))&&(this.overlayVisible?this.hide():this.show(),this.$refs.focusInput.focus())},onSelectionChange:function(t){this.selfChange=!0,this.$emit("update:modelValue",t),this.$emit("change",t)},onNodeSelect:function(t){this.$emit("node-select",t),this.selectionMode==="single"&&this.hide()},onNodeUnselect:function(t){this.$emit("node-unselect",t)},onNodeToggle:function(t){this.expandedKeys=t},onKeyDown:function(t){switch(t.code){case"ArrowDown":this.onArrowDownKey(t);break;case"Space":case"Enter":this.onEnterKey(t);break;case"Escape":this.onEscapeKey(t);break}},onArrowDownKey:function(t){var n=this;this.overlayVisible||(this.show(),this.$nextTick(function(){var r=p.find(n.$refs.tree.$el,'[data-pc-section="treeitem"]'),o=re(r).find(function(i){return i.getAttribute("tabindex")==="0"});p.focus(o)}),t.preventDefault())},onEnterKey:function(t){this.overlayVisible?this.hide():this.onArrowDownKey(t),t.preventDefault()},onEscapeKey:function(t){this.overlayVisible&&(this.hide(),t.preventDefault())},onOverlayEnter:function(t){L.set("overlay",t,this.$primevue.config.zIndex.overlay),p.addStyles(t,{position:"absolute",top:"0",left:"0"}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.scrollValueInView(),this.$emit("show")},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.$emit("hide"),this.overlay=null},onOverlayAfterLeave:function(t){L.clear(t)},alignOverlay:function(){this.appendTo==="self"?p.relativePosition(this.overlay,this.$el):(this.overlay.style.minWidth=p.getOuterWidth(this.$el)+"px",p.absolutePosition(this.overlay,this.$el))},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(n){t.overlayVisible&&!t.selfClick&&t.isOutsideClicked(n)&&t.hide(),t.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var t=this;this.scrollHandler||(this.scrollHandler=new M(this.$refs.container,function(){t.overlayVisible&&t.hide()})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var t=this;this.resizeListener||(this.resizeListener=function(){t.overlayVisible&&!p.isTouchDevice()&&t.hide()},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isOutsideClicked:function(t){return!(this.$el.isSameNode(t.target)||this.$el.contains(t.target)||this.overlay&&this.overlay.contains(t.target))},overlayRef:function(t){this.overlay=t},onOverlayClick:function(t){$.emit("overlay-click",{originalEvent:t,target:this.$el}),this.selfClick=!0},onOverlayKeydown:function(t){t.code==="Escape"&&this.hide()},findSelectedNodes:function(t,n,r){if(t){if(this.isSelected(t,n)&&(r.push(t),delete n[t.key]),Object.keys(n).length&&t.children){var o=b(t.children),i;try{for(o.s();!(i=o.n()).done;){var d=i.value;this.findSelectedNodes(d,n,r)}}catch(y){o.e(y)}finally{o.f()}}}else{var s=b(this.options),l;try{for(s.s();!(l=s.n()).done;){var u=l.value;this.findSelectedNodes(u,n,r)}}catch(y){s.e(y)}finally{s.f()}}},isSelected:function(t,n){return this.selectionMode==="checkbox"?n[t.key]&&n[t.key].checked:n[t.key]},updateTreeState:function(){var t=N({},this.modelValue);this.expandedKeys={},t&&this.options&&this.updateTreeBranchState(null,null,t)},updateTreeBranchState:function(t,n,r){if(t){if(this.isSelected(t,r)&&(this.expandPath(n),delete r[t.key]),Object.keys(r).length&&t.children){var o=b(t.children),i;try{for(o.s();!(i=o.n()).done;){var d=i.value;n.push(t.key),this.updateTreeBranchState(d,n,r)}}catch(y){o.e(y)}finally{o.f()}}}else{var s=b(this.options),l;try{for(s.s();!(l=s.n()).done;){var u=l.value;this.updateTreeBranchState(u,[],r)}}catch(y){s.e(y)}finally{s.f()}}},expandPath:function(t){if(t.length>0){var n=b(t),r;try{for(n.s();!(r=n.n()).done;){var o=r.value;this.expandedKeys[o]=!0}}catch(i){n.e(i)}finally{n.f()}}},scrollValueInView:function(){if(this.overlay){var t=p.findSingle(this.overlay,'[data-p-highlight="true"]');t&&t.scrollIntoView({block:"nearest",inline:"start"})}}},computed:{selectedNodes:function(){var t=[];if(this.modelValue&&this.options){var n=N({},this.modelValue);this.findSelectedNodes(null,n,t)}return t},label:function(){var t=this.selectedNodes;return t.length?t.map(function(n){return n.label}).join(", "):this.placeholder},emptyMessageText:function(){return this.emptyMessage||this.$primevue.config.locale.emptyMessage},emptyValue:function(){return!this.modelValue||Object.keys(this.modelValue).length===0},emptyOptions:function(){return!this.options||this.options.length===0},listId:function(){return H()+"_list"}},components:{TSTree:G,Portal:z,ChevronDownIcon:D},directives:{ripple:U}};function g(e){"@babel/helpers - typeof";return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(e)}function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?I(Object(n),!0).forEach(function(r){ae(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ae(e,t,n){return t=ue(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ue(e){var t=ce(e,"string");return g(t)==="symbol"?t:String(t)}function ce(e,t){if(g(e)!=="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(g(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var de=["id","disabled","tabindex","aria-labelledby","aria-label","aria-expanded","aria-controls"],pe=["aria-expanded"];function fe(e,t,n,r,o,i){var d=P("TSTree"),s=P("Portal");return c(),f("div",a({ref:"container",class:e.cx("root"),style:e.sx("root"),onClick:t[7]||(t[7]=function(){return i.onClick&&i.onClick.apply(i,arguments)})},e.ptm("root"),{"data-pc-name":"treeselect"}),[h("div",a({class:"p-hidden-accessible"},e.ptm("hiddenInputWrapper"),{"data-p-hidden-accessible":!0}),[h("input",a({ref:"focusInput",id:e.inputId,type:"text",role:"combobox",class:e.inputClass,style:e.inputStyle,readonly:"",disabled:e.disabled,tabindex:e.disabled?-1:e.tabindex,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-haspopup":"tree","aria-expanded":o.overlayVisible,"aria-controls":i.listId,onFocus:t[0]||(t[0]=function(l){return i.onFocus(l)}),onBlur:t[1]||(t[1]=function(l){return i.onBlur(l)}),onKeydown:t[2]||(t[2]=function(l){return i.onKeyDown(l)})},C(C({},e.inputProps),e.ptm("hiddenInput"))),null,16,de)],16),h("div",a({class:e.cx("labelContainer")},e.ptm("labelContainer")),[h("div",a({class:e.cx("label")},e.ptm("label")),[m(e.$slots,"value",{value:i.selectedNodes,placeholder:e.placeholder},function(){return[e.display==="comma"?(c(),f(S,{key:0},[T(w(i.label||"empty"),1)],64)):e.display==="chip"?(c(),f(S,{key:1},[(c(!0),f(S,null,F(i.selectedNodes,function(l){return c(),f("div",a({key:l.key,class:e.cx("token")},e.ptm("token")),[h("span",a({class:e.cx("tokenLabel")},e.ptm("tokenLabel")),w(l.label),17)],16)}),128)),i.emptyValue?(c(),f(S,{key:0},[T(w(e.placeholder||"empty"),1)],64)):O("",!0)],64)):O("",!0)]})],16)],16),h("div",a({class:e.cx("trigger"),role:"button","aria-haspopup":"tree","aria-expanded":o.overlayVisible},e.ptm("trigger")),[m(e.$slots,"triggericon",{class:V(e.cx("triggerIcon"))},function(){return[(c(),x(W("ChevronDownIcon"),a({class:e.cx("triggerIcon")},e.ptm("triggerIcon")),null,16,["class"]))]})],16,pe),K(s,{appendTo:e.appendTo},{default:k(function(){return[K(q,a({name:"p-connected-overlay",onEnter:i.onOverlayEnter,onLeave:i.onOverlayLeave,onAfterLeave:i.onOverlayAfterLeave},e.ptm("transition")),{default:k(function(){return[o.overlayVisible?(c(),f("div",a({key:0,ref:i.overlayRef,onClick:t[5]||(t[5]=function(){return i.onOverlayClick&&i.onOverlayClick.apply(i,arguments)}),class:[e.cx("panel"),e.panelClass],onKeydown:t[6]||(t[6]=function(){return i.onOverlayKeydown&&i.onOverlayKeydown.apply(i,arguments)})},C(C({},e.panelProps),e.ptm("panel"))),[m(e.$slots,"header",{value:e.modelValue,options:e.options}),h("div",a({class:e.cx("wrapper"),style:{"max-height":e.scrollHeight}},e.ptm("wrapper")),[K(d,{ref:"tree",id:i.listId,value:e.options,selectionMode:e.selectionMode,"onUpdate:selectionKeys":i.onSelectionChange,selectionKeys:e.modelValue,expandedKeys:o.expandedKeys,"onUpdate:expandedKeys":i.onNodeToggle,metaKeySelection:e.metaKeySelection,onNodeExpand:t[3]||(t[3]=function(l){return e.$emit("node-expand",l)}),onNodeCollapse:t[4]||(t[4]=function(l){return e.$emit("node-collapse",l)}),onNodeSelect:i.onNodeSelect,onNodeUnselect:i.onNodeUnselect,level:0,unstyled:e.unstyled,pt:e.ptm("tree"),"data-pc-section":"tree"},Z({_:2},[e.$slots.itemtogglericon?{name:"togglericon",fn:k(function(l){return[m(e.$slots,"itemtogglericon",{node:l.node,expanded:l.expanded,class:V(l.class)})]}),key:"0"}:void 0,e.$slots.itemcheckboxicon?{name:"checkboxicon",fn:k(function(l){return[m(e.$slots,"itemcheckboxicon",{checked:l.checked,partialChecked:l.partialChecked,class:V(l.class)})]}),key:"1"}:void 0]),1032,["id","value","selectionMode","onUpdate:selectionKeys","selectionKeys","expandedKeys","onUpdate:expandedKeys","metaKeySelection","onNodeSelect","onNodeUnselect","unstyled","pt"]),i.emptyOptions?(c(),f("div",a({key:0,class:e.cx("emptyMessage")},e.ptm("emptyMessage")),[m(e.$slots,"empty",{},function(){return[T(w(i.emptyMessageText),1)]})],16)):O("",!0)],16),m(e.$slots,"footer",{value:e.modelValue,options:e.options})],16)):O("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])],16)}se.render=fe;export{se as default};
