import{s as A}from"./index.esm.ba2c5980.js";import{ah as E,ao as g,R as r,ap as v,o as a,c as l,F as f,j as p,w as M,a as x,aq as h,l as y,s as m,t as k,i as P,S,b as C}from"./entry.e65a8b12.js";import"./baseicon.esm.727e0a4e.js";var U=`
@layer primevue {
    .p-breadcrumb {
        overflow-x: auto;
    }

    .p-breadcrumb .p-breadcrumb-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }

    .p-breadcrumb .p-menuitem-text {
        line-height: 1;
    }

    .p-breadcrumb .p-menuitem-link {
        text-decoration: none;
        display: flex;
        align-items: center;
    }

    .p-breadcrumb .p-menuitem-separator {
        display: flex;
        align-items: center;
    }

    .p-breadcrumb::-webkit-scrollbar {
        display: none;
    }
}
`,N={root:"p-breadcrumb p-component",menu:"p-breadcrumb-list",home:"p-breadcrumb-home",separator:"p-menuitem-separator",menuitem:function(i){var t=i.instance;return["p-menuitem",{"p-disabled":t.disabled()}]},action:function(i){var t=i.props,s=i.isActive,c=i.isExactActive;return["p-menuitem-link",{"router-link-active":s,"router-link-active-exact":t.exact&&c}]},icon:"p-menuitem-icon",label:"p-menuitem-text"},R=E.extend({name:"breadcrumb",css:U,classes:N}),V={name:"BaseBreadcrumb",extends:g,props:{model:{type:Array,default:null},home:{type:null,default:null},exact:{type:Boolean,default:!0}},style:R,provide:function(){return{$parentInstance:this}}},B={name:"BreadcrumbItem",hostName:"Breadcrumb",extends:g,props:{item:null,templates:null,exact:null,index:null},methods:{onClick:function(i,t){this.item.command&&this.item.command({originalEvent:i,item:this.item}),this.item.to&&t&&t(i)},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},isCurrentUrl:function(){var i=this.item,t=i.to,s=i.url,c=typeof window<"u"?window.location.pathname:"";return t===c||s===c?"page":void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var i=this;return{action:r({class:this.cx("action"),"aria-current":this.isCurrentUrl(),onClick:function(s){return i.onClick(s)}},this.ptm("action",this.ptmOptions)),icon:r({class:[this.cx("icon"),this.item.icon]},this.ptm("icon",this.ptmOptions)),label:r({class:this.cx("label")},this.ptm("label",this.ptmOptions))}}}},D=["href","aria-current","onClick"],F=["href","target","aria-current"];function j(e,i,t,s,c,n){var d=v("router-link");return n.visible()?(a(),l("li",r({key:0,class:[e.cx("menuitem"),t.item.class]},e.ptm("menuitem",n.ptmOptions)),[t.templates.item?(a(),p(h(t.templates.item),{key:1,item:t.item,label:n.label(),props:n.getMenuItemProps},null,8,["item","label","props"])):(a(),l(f,{key:0},[t.item.to?(a(),p(d,{key:0,to:t.item.to,custom:""},{default:M(function(o){var b=o.navigate,u=o.href,I=o.isActive,O=o.isExactActive;return[x("a",r({href:u,class:e.cx("action",{isActive:I,isExactActive:O}),"aria-current":n.isCurrentUrl(),onClick:function(w){return n.onClick(w,b)}},e.ptm("action",n.ptmOptions)),[t.templates.itemicon?(a(),p(h(t.templates.itemicon),{key:0,item:t.item,class:y(e.cx("icon"))},null,8,["item","class"])):t.item.icon?(a(),l("span",r({key:1,class:[e.cx("icon"),t.item.icon]},e.ptm("icon",n.ptmOptions)),null,16)):m("",!0),t.item.label?(a(),l("span",r({key:2,class:e.cx("label")},e.ptm("label",n.ptmOptions)),k(n.label()),17)):m("",!0)],16,D)]}),_:1},8,["to"])):(a(),l("a",r({key:1,href:t.item.url||"#",class:e.cx("action"),target:t.item.target,"aria-current":n.isCurrentUrl(),onClick:i[0]||(i[0]=function(){return n.onClick&&n.onClick.apply(n,arguments)})},e.ptm("action",n.ptmOptions)),[t.templates&&t.templates.itemicon?(a(),p(h(t.templates.itemicon),{key:0,item:t.item,class:y(e.cx("icon",n.ptmOptions))},null,8,["item","class"])):t.item.icon?(a(),l("span",r({key:1,class:[e.cx("icon"),t.item.icon]},e.ptm("icon",n.ptmOptions)),null,16)):m("",!0),t.item.label?(a(),l("span",r({key:2,class:e.cx("label")},e.ptm("label",n.ptmOptions)),k(n.label()),17)):m("",!0)],16,F))],64))],16)):m("",!0)}B.render=j;var q={name:"Breadcrumb",extends:V,beforeMount:function(){this.$slots.item||console.warn("In future versions, vue-router support will be removed. Item templating should be used.")},components:{BreadcrumbItem:B,ChevronRightIcon:A}};function z(e,i,t,s,c,n){var d=v("BreadcrumbItem"),o=v("ChevronRightIcon");return a(),l("nav",r({class:e.cx("root")},e.ptm("root"),{"data-pc-name":"breadcrumb"}),[x("ol",r({class:e.cx("menu")},e.ptm("menu")),[e.home?(a(),p(d,r({key:0,item:e.home,class:e.cx("home"),templates:e.$slots,exact:e.exact,pt:e.pt,unstyled:e.unstyled},e.ptm("home")),null,16,["item","class","templates","exact","pt","unstyled"])):m("",!0),(a(!0),l(f,null,P(e.model,function(b,u){return a(),l(f,{key:b.label+"_"+u},[e.home||u!==0?(a(),l("li",r({key:0,class:e.cx("separator")},e.ptm("separator")),[S(e.$slots,"separator",{},function(){return[C(o,r({"aria-hidden":"true"},e.ptm("separatorIcon")),null,16)]})],16)):m("",!0),C(d,{item:b,index:u,templates:e.$slots,exact:e.exact,pt:e.pt,unstyled:e.unstyled},null,8,["item","index","templates","exact","pt","unstyled"])],64)}),128))],16)],16)}q.render=z;export{q as default};
