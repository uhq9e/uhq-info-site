import E from"./button.esm.4cfb2234.js";import{ah as z,aH as u,ak as b,al as c,am as B,aA as R,ao as H,ap as j,h as K,o as a,j as v,w as p,b as y,ar as F,R as s,k as I,c as m,S as d,F as D,aq as O,l as g,s as C,a as h,t as T,as as w}from"./entry.e65a8b12.js";import{O as N}from"./overlayeventbus.esm.5f1005ca.js";import{s as U}from"./portal.esm.aa40dffd.js";import"./badge.esm.63629650.js";import"./index.esm.2a477ad8.js";import"./baseicon.esm.727e0a4e.js";var V=`
@layer primevue {
    .p-confirm-popup {
        position: absolute;
        margin-top: 10px;
        top: 0;
        left: 0;
    }

    .p-confirm-popup-flipped {
        margin-top: 0;
        margin-bottom: 10px;
    }

    /* Animation */
    .p-confirm-popup-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    .p-confirm-popup-leave-to {
        opacity: 0;
    }

    .p-confirm-popup-enter-active {
        transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    .p-confirm-popup-leave-active {
        transition: opacity 0.1s linear;
    }

    .p-confirm-popup:after,
    .p-confirm-popup:before {
        bottom: 100%;
        left: calc(var(--overlayArrowLeft, 0) + 1.25rem);
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }

    .p-confirm-popup:after {
        border-width: 8px;
        margin-left: -8px;
    }

    .p-confirm-popup:before {
        border-width: 10px;
        margin-left: -10px;
    }

    .p-confirm-popup-flipped:after,
    .p-confirm-popup-flipped:before {
        bottom: auto;
        top: 100%;
    }

    .p-confirm-popup.p-confirm-popup-flipped:after {
        border-bottom-color: transparent;
    }

    .p-confirm-popup.p-confirm-popup-flipped:before {
        border-bottom-color: transparent;
    }

    .p-confirm-popup .p-confirm-popup-content {
        display: flex;
        align-items: center;
    }
}
`,q={root:function(e){var t=e.instance;return["p-confirm-popup p-component",{"p-input-filled":t.$primevue.config.inputStyle==="filled","p-ripple-disabled":t.$primevue.config.ripple===!1}]},content:"p-confirm-popup-content",icon:function(e){var t=e.instance;return["p-confirm-popup-icon",t.confirmation?t.confirmation.icon:null]},message:"p-confirm-popup-message",footer:"p-confirm-popup-footer",rejectButton:function(e){var t=e.instance;return["p-confirm-popup-reject",t.confirmation&&!t.confirmation.rejectClass?"p-button-text":null]},acceptButton:"p-confirm-popup-accept"},X=z.extend({name:"confirmpopup",css:V,classes:q}),Y={name:"BaseConfirmPopup",extends:H,props:{group:String},style:X,provide:function(){return{$parentInstance:this}}},Z={name:"ConfirmPopup",extends:Y,inheritAttrs:!1,data:function(){return{visible:!1,confirmation:null,autoFocusAccept:null,autoFocusReject:null}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,confirmListener:null,closeListener:null,mounted:function(){var e=this;this.confirmListener=function(t){t&&t.group===e.group&&(e.confirmation=t,e.target=t.target,e.confirmation.onShow&&e.confirmation.onShow(),e.visible=!0)},this.closeListener=function(){e.visible=!1,e.confirmation=null},u.on("confirm",this.confirmListener),u.on("close",this.closeListener)},beforeUnmount:function(){u.off("confirm",this.confirmListener),u.off("close",this.closeListener),this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindResizeListener(),this.container&&(b.clear(this.container),this.container=null),this.target=null,this.confirmation=null},methods:{accept:function(){this.confirmation.accept&&this.confirmation.accept(),this.visible=!1},reject:function(){this.confirmation.reject&&this.confirmation.reject(),this.visible=!1},onHide:function(){this.confirmation.onHide&&this.confirmation.onHide(),this.visible=!1},onAcceptKeydown:function(e){(e.code==="Space"||e.code==="Enter")&&(this.accept(),c.focus(this.target),e.preventDefault())},onRejectKeydown:function(e){(e.code==="Space"||e.code==="Enter")&&(this.reject(),c.focus(this.target),e.preventDefault())},onEnter:function(e){this.autoFocusAccept=this.confirmation.defaultFocus===void 0||this.confirmation.defaultFocus==="accept",this.autoFocusReject=this.confirmation.defaultFocus==="reject",this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),b.set("overlay",e,this.$primevue.config.zIndex.overlay)},onAfterEnter:function(){this.focus()},onLeave:function(){this.autoFocusAccept=null,this.autoFocusReject=null,this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener()},onAfterLeave:function(e){b.clear(e)},alignOverlay:function(){c.absolutePosition(this.container,this.target);var e=c.getOffset(this.container),t=c.getOffset(this.target),o=0;e.left<t.left&&(o=t.left-e.left),this.container.style.setProperty("--overlayArrowLeft","".concat(o,"px")),e.top<t.top&&(this.container.setAttribute("data-p-confirm-popup-flipped","true"),!this.isUnstyled&&c.addClass(this.container,"p-confirm-popup-flipped"))},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.visible&&e.container&&!e.container.contains(t.target)&&!e.isTargetClicked(t)?(e.confirmation.onHide&&e.confirmation.onHide(),e.visible=!1):e.alignOverlay()},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new B(this.target,function(){e.visible&&(e.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.visible&&!c.isTouchDevice()&&(e.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},focus:function(){var e=this.container.querySelector("[autofocus]");e&&e.focus({preventScroll:!0})},isTargetClicked:function(e){return this.target&&(this.target===e.target||this.target.contains(e.target))},containerRef:function(e){this.container=e},onOverlayClick:function(e){N.emit("overlay-click",{originalEvent:e,target:this.target})},onOverlayKeydown:function(e){e.code==="Escape"&&(u.emit("close",this.closeListener),c.focus(this.target))},getCXOptions:function(e,t){return{contenxt:{icon:e,iconClass:t.class}}}},computed:{message:function(){return this.confirmation?this.confirmation.message:null},acceptLabel:function(){return this.confirmation?this.confirmation.acceptLabel||this.$primevue.config.locale.accept:null},rejectLabel:function(){return this.confirmation?this.confirmation.rejectLabel||this.$primevue.config.locale.reject:null},acceptIcon:function(){return this.confirmation?this.confirmation.acceptIcon:null},rejectIcon:function(){return this.confirmation?this.confirmation.rejectIcon:null}},components:{CPButton:E,Portal:U},directives:{focustrap:R}};function f(n){"@babel/helpers - typeof";return f=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(n)}function k(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(n,r).enumerable})),t.push.apply(t,o)}return t}function S(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?k(Object(t),!0).forEach(function(o){G(n,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):k(Object(t)).forEach(function(o){Object.defineProperty(n,o,Object.getOwnPropertyDescriptor(t,o))})}return n}function G(n,e,t){return e=J(e),e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function J(n){var e=M(n,"string");return f(e)==="symbol"?e:String(e)}function M(n,e){if(f(n)!=="object"||n===null)return n;var t=n[Symbol.toPrimitive];if(t!==void 0){var o=t.call(n,e||"default");if(f(o)!=="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(n)}var Q=["aria-modal"];function W(n,e,t,o,r,i){var L=j("CPButton"),P=j("Portal"),A=K("focustrap");return a(),v(P,null,{default:p(function(){return[y(F,s({name:"p-confirm-popup",onEnter:i.onEnter,onAfterEnter:i.onAfterEnter,onLeave:i.onLeave,onAfterLeave:i.onAfterLeave},n.ptm("transition")),{default:p(function(){return[r.visible?I((a(),m("div",s({key:0,ref:i.containerRef,role:"alertdialog",class:n.cx("root"),"aria-modal":r.visible,onClick:e[2]||(e[2]=function(){return i.onOverlayClick&&i.onOverlayClick.apply(i,arguments)}),onKeydown:e[3]||(e[3]=function(){return i.onOverlayKeydown&&i.onOverlayKeydown.apply(i,arguments)})},S(S({},n.$attrs),n.ptm("root"))),[n.$slots.container?d(n.$slots,"container",{key:0,message:r.confirmation,onAccept:i.accept,onReject:i.reject}):(a(),m(D,{key:1},[n.$slots.message?(a(),v(O(n.$slots.message),{key:1,message:r.confirmation},null,8,["message"])):(a(),m("div",s({key:0,class:n.cx("content")},n.ptm("content")),[d(n.$slots,"icon",{},function(){return[n.$slots.icon?(a(),v(O(n.$slots.icon),{key:0,class:g(n.cx("icon"))},null,8,["class"])):r.confirmation.icon?(a(),m("span",s({key:1,class:n.cx("icon")},n.ptm("icon")),null,16)):C("",!0)]}),h("span",s({class:n.cx("message")},n.ptm("message")),T(r.confirmation.message),17)],16)),h("div",s({class:n.cx("footer")},n.ptm("footer")),[y(L,{label:i.rejectLabel,onClick:e[0]||(e[0]=function(l){return i.reject()}),onKeydown:i.onRejectKeydown,autofocus:r.autoFocusReject,class:g([n.cx("rejectButton"),r.confirmation.rejectClass]),unstyled:n.unstyled,pt:n.ptm("rejectButton"),"data-pc-name":"rejectbutton"},w({_:2},[i.rejectIcon||n.$slots.rejecticon?{name:"icon",fn:p(function(l){return[d(n.$slots,"rejecticon",{},function(){return[h("span",s({class:[i.rejectIcon,l.class]},n.ptm("rejectButton").icon,{"data-pc-name":"rejectbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1032,["label","onKeydown","autofocus","class","unstyled","pt"]),y(L,{label:i.acceptLabel,onClick:e[1]||(e[1]=function(l){return i.accept()}),onKeydown:i.onAcceptKeydown,autofocus:r.autoFocusAccept,class:g([n.cx("acceptButton"),r.confirmation.acceptClass]),unstyled:n.unstyled,pt:n.ptm("acceptButton"),"data-pc-name":"acceptbutton"},w({_:2},[i.acceptIcon||n.$slots.accepticon?{name:"icon",fn:p(function(l){return[d(n.$slots,"accepticon",{},function(){return[h("span",s({class:[i.acceptIcon,l.class]},n.ptm("acceptButton").icon,{"data-pc-name":"acceptbuttonicon"}),null,16)]})]}),key:"0"}:void 0]),1032,["label","onKeydown","autofocus","class","unstyled","pt"])],16)],64))],16,Q)),[[A]]):C("",!0)]}),_:3},16,["onEnter","onAfterEnter","onLeave","onAfterLeave"])]}),_:3})}Z.render=W;export{Z as default};
