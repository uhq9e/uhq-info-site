import{ah as E,ao as D,aj as I,ai as F,al as p,R as c,an as B,aK as N,ap as L,h as x,o as s,c as u,a as O,F as A,i as j,j as m,w as U,k as h,aq as y,l as w,b as H}from"./entry.e65a8b12.js";var z=`
@layer primevue {
    .p-dock {
        position: absolute;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }

    .p-dock-list-container {
        display: flex;
        pointer-events: auto;
    }

    .p-dock-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-dock-item {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
    }

    .p-dock-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        cursor: default;
    }

    .p-dock-item-second-prev,
    .p-dock-item-second-next {
        transform: scale(1.2);
    }

    .p-dock-item-prev,
    .p-dock-item-next {
        transform: scale(1.4);
    }

    .p-dock-item-current {
        transform: scale(1.6);
        z-index: 1;
    }

    /* Position */
    /* top */
    .p-dock-top {
        left: 0;
        top: 0;
        width: 100%;
    }

    .p-dock-top .p-dock-item {
        transform-origin: center top;
    }

    /* bottom */
    .p-dock-bottom {
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .p-dock-bottom .p-dock-item {
        transform-origin: center bottom;
    }

    /* right */
    .p-dock-right {
        right: 0;
        top: 0;
        height: 100%;
    }

    .p-dock-right .p-dock-item {
        transform-origin: center right;
    }

    .p-dock-right .p-dock-list {
        flex-direction: column;
    }

    /* left */
    .p-dock-left {
        left: 0;
        top: 0;
        height: 100%;
    }

    .p-dock-left .p-dock-item {
        transform-origin: center left;
    }

    .p-dock-left .p-dock-list {
        flex-direction: column;
    }
}
`,R={root:function(t){var e=t.props;return["p-dock p-component","p-dock-".concat(e.position)]},container:"p-dock-list-container",menu:"p-dock-list",menuitem:function(t){var e=t.instance,a=t.processedItem,r=t.index,i=t.id;return["p-dock-item",{"p-focus":e.isItemActive(i),"p-disabled":e.disabled(a),"p-dock-item-second-prev":e.currentIndex-2===r,"p-dock-item-prev":e.currentIndex-1===r,"p-dock-item-current":e.currentIndex===r,"p-dock-item-next":e.currentIndex+1===r,"p-dock-item-second-next":e.currentIndex+2===r}]},content:"p-menuitem-content",action:function(t){var e=t.props,a=t.isActive,r=t.isExactActive;return["p-dock-link",{"router-link-active":a,"router-link-active-exact":e.exact&&r}]},icon:"p-dock-icon"},V=E.extend({name:"dock",css:z,classes:R}),q={name:"BaseDock",extends:D,props:{position:{type:String,default:"bottom"},model:null,class:null,style:null,tooltipOptions:null,exact:{type:Boolean,default:!0},menuId:{type:String,default:null},tabindex:{type:Number,default:0},"aria-label":{type:String,default:null},"aria-labelledby":{type:String,default:null}},style:V,provide:function(){return{$parentInstance:this}}};function S(n){return Q(n)||J(n)||G(n)||W()}function W(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function G(n,t){if(n){if(typeof n=="string")return g(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);if(e==="Object"&&n.constructor&&(e=n.constructor.name),e==="Map"||e==="Set")return Array.from(n);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return g(n,t)}}function J(n){if(typeof Symbol<"u"&&n[Symbol.iterator]!=null||n["@@iterator"]!=null)return Array.from(n)}function Q(n){if(Array.isArray(n))return g(n)}function g(n,t){(t==null||t>n.length)&&(t=n.length);for(var e=0,a=new Array(t);e<t;e++)a[e]=n[e];return a}var K={name:"DockSub",hostName:"Dock",extends:D,emits:["focus","blur"],props:{position:{type:String,default:"bottom"},model:{type:Array,default:null},templates:{type:null,default:null},exact:{type:Boolean,default:!0},tooltipOptions:null,menuId:{type:String,default:null},tabindex:{type:Number,default:0},"aria-label":{type:String,default:null},"aria-labelledby":{type:String,default:null}},data:function(){return{id:this.menuId,currentIndex:-3,focused:!1,focusedOptionIndex:-1}},watch:{menuId:function(t){this.id=t||I()}},mounted:function(){this.id=this.id||I()},methods:{getItemId:function(t){return"".concat(this.id,"_").concat(t)},getItemProp:function(t,e){return t&&t.item?F.getItemValue(t.item[e]):void 0},getPTOptions:function(t,e,a){return this.ptm(t,{context:{index:a,item:e,active:this.isItemActive(this.getItemId(a))}})},isSameMenuItem:function(t){return t.currentTarget&&(t.currentTarget.isSameNode(t.target)||t.currentTarget.isSameNode(t.target.closest('[data-pc-section="menuitem"]')))},isItemActive:function(t){return t===this.focusedOptionIndex},onListMouseLeave:function(){this.currentIndex=-3},onItemMouseEnter:function(t){this.currentIndex=t},onItemActionClick:function(t,e){e&&e(t)},onItemClick:function(t,e){if(this.isSameMenuItem(t)){var a=this.getItemProp(e,"command");a&&a({originalEvent:t,item:e.item})}},onListFocus:function(t){this.focused=!0,this.changeFocusedOptionIndex(0),this.$emit("focus",t)},onListBlur:function(t){this.focused=!1,this.focusedOptionIndex=-1,this.$emit("blur",t)},onListKeyDown:function(t){switch(t.code){case"ArrowDown":{(this.position==="left"||this.position==="right")&&this.onArrowDownKey(),t.preventDefault();break}case"ArrowUp":{(this.position==="left"||this.position==="right")&&this.onArrowUpKey(),t.preventDefault();break}case"ArrowRight":{(this.position==="top"||this.position==="bottom")&&this.onArrowDownKey(),t.preventDefault();break}case"ArrowLeft":{(this.position==="top"||this.position==="bottom")&&this.onArrowUpKey(),t.preventDefault();break}case"Home":{this.onHomeKey(),t.preventDefault();break}case"End":{this.onEndKey(),t.preventDefault();break}case"Enter":case"Space":{this.onSpaceKey(t),t.preventDefault();break}}},onArrowDownKey:function(){var t=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t)},onArrowUpKey:function(){var t=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t)},onHomeKey:function(){this.changeFocusedOptionIndex(0)},onEndKey:function(){this.changeFocusedOptionIndex(p.find(this.$refs.list,'li[data-pc-section="menuitem"][data-p-disabled="false"]').length-1)},onSpaceKey:function(){var t=p.findSingle(this.$refs.list,'li[id="'.concat("".concat(this.focusedOptionIndex),'"]')),e=t&&p.findSingle(t,'[data-pc-section="action"]');e?e.click():t&&t.click()},findNextOptionIndex:function(t){var e=p.find(this.$refs.list,'li[data-pc-section="menuitem"][data-p-disabled="false"]'),a=S(e).findIndex(function(r){return r.id===t});return a>-1?a+1:0},findPrevOptionIndex:function(t){var e=p.find(this.$refs.list,'li[data-pc-section="menuitem"][data-p-disabled="false"]'),a=S(e).findIndex(function(r){return r.id===t});return a>-1?a-1:0},changeFocusedOptionIndex:function(t){var e=p.find(this.$refs.list,'li[data-pc-section="menuitem"][data-p-disabled="false"]'),a=t>=e.length?e.length-1:t<0?0:t;this.focusedOptionIndex=e[a].getAttribute("id")},disabled:function(t){return typeof t.disabled=="function"?t.disabled():t.disabled},getMenuItemProps:function(t,e){return{action:c({tabindex:-1,"aria-hidden":!0,class:this.cx("action")},this.getPTOptions("action",t,e)),icon:c({class:[this.cx("icon"),t.icon]},this.getPTOptions("icon",t,e))}}},computed:{focusedOptionId:function(){return this.focusedOptionIndex!==-1?this.focusedOptionIndex:null}},directives:{ripple:B,tooltip:N}},X=["id","aria-orientation","aria-activedescendant","tabindex","aria-label","aria-labelledby"],Y=["id","aria-label","aria-disabled","onClick","onMouseenter","data-p-focused","data-p-disabled"],Z=["href","target","onClick"],_=["href","target"];function $(n,t,e,a,r,i){var b=L("router-link"),k=x("ripple"),v=x("tooltip");return s(),u("div",c({class:n.cx("container")},n.ptm("container")),[O("ul",c({ref:"list",id:r.id,class:n.cx("menu"),role:"menu","aria-orientation":e.position==="bottom"||e.position==="top"?"horizontal":"vertical","aria-activedescendant":r.focused?i.focusedOptionId:void 0,tabindex:e.tabindex,"aria-label":n.ariaLabel,"aria-labelledby":n.ariaLabelledby,onFocus:t[0]||(t[0]=function(){return i.onListFocus&&i.onListFocus.apply(i,arguments)}),onBlur:t[1]||(t[1]=function(){return i.onListBlur&&i.onListBlur.apply(i,arguments)}),onKeydown:t[2]||(t[2]=function(){return i.onListKeyDown&&i.onListKeyDown.apply(i,arguments)}),onMouseleave:t[3]||(t[3]=function(){return i.onListMouseLeave&&i.onListMouseLeave.apply(i,arguments)})},n.ptm("menu")),[(s(!0),u(A,null,j(e.model,function(o,l){return s(),u("li",c({key:l,id:i.getItemId(l),class:n.cx("menuitem",{processedItem:o,index:l,id:i.getItemId(l)}),role:"menuitem","aria-label":o.label,"aria-disabled":i.disabled(o),onClick:function(f){return i.onItemClick(f,o)},onMouseenter:function(f){return i.onItemMouseEnter(l)}},i.getPTOptions("menuitem",o,l),{"data-p-focused":i.isItemActive(i.getItemId(l)),"data-p-disabled":i.disabled(o)||!1}),[O("div",c({class:n.cx("content")},i.getPTOptions("content",o,l)),[e.templates.item?(s(),m(y(e.templates.item),{key:1,item:o,index:l,label:o.label,props:i.getMenuItemProps(o,l)},null,8,["item","index","label","props"])):(s(),u(A,{key:0},[o.to&&!i.disabled(o)?(s(),m(b,{key:0,to:o.to,custom:""},{default:U(function(d){var f=d.navigate,C=d.href,P=d.isActive,M=d.isExactActive;return[h((s(),u("a",c({href:C,class:n.cx("action",{isActive:P,isExactActive:M}),target:o.target,tabindex:"-1","aria-hidden":"true",onClick:function(T){return i.onItemActionClick(T,o,f)}},i.getPTOptions("action",o,l)),[e.templates.icon?(s(),m(y(e.templates.icon),{key:1,item:o,class:w(n.cx("icon"))},null,8,["item","class"])):h((s(),u("span",c({key:0,class:[n.cx("icon"),o.icon]},i.getPTOptions("icon",o,l)),null,16)),[[k]])],16,Z)),[[v,{value:o.label,disabled:!e.tooltipOptions},e.tooltipOptions]])]}),_:2},1032,["to"])):h((s(),u("a",c({key:1,href:o.url,class:n.cx("action"),target:o.target,tabindex:"-1","aria-hidden":"true"},i.getPTOptions("action",o,l)),[e.templates.icon?(s(),m(y(e.templates.icon),{key:1,item:o,class:w(n.cx("icon"))},null,8,["item","class"])):h((s(),u("span",c({key:0,class:[n.cx("icon"),o.icon]},i.getPTOptions("icon",o,l)),null,16)),[[k]])],16,_)),[[v,{value:o.label,disabled:!e.tooltipOptions},e.tooltipOptions]])],64))],16)],16,Y)}),128))],16,X)],16)}K.render=$;var tt={name:"Dock",extends:q,beforeMount:function(){this.$slots.item||console.warn("In future versions, vue-router support will be removed. Item templating should be used.")},computed:{containerClass:function(){return[this.class,this.cx("root")]}},components:{DockSub:K}};function nt(n,t,e,a,r,i){var b=L("DockSub");return s(),u("div",c({class:i.containerClass,style:n.style},n.ptm("root"),{"data-pc-name":"dock"}),[H(b,{model:n.model,templates:n.$slots,exact:n.exact,tooltipOptions:n.tooltipOptions,position:n.position,menuId:n.menuId,"aria-label":n.ariaLabel,"aria-labelledby":n.ariaLabelledby,tabindex:n.tabindex,pt:n.pt,unstyled:n.unstyled},null,8,["model","templates","exact","tooltipOptions","position","menuId","aria-label","aria-labelledby","tabindex","pt","unstyled"])],16)}tt.render=nt;export{tt as default};
