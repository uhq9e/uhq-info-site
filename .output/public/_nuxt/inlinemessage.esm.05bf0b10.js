import{ah as l,ao as p,o,c,S as a,j as m,R as i,aq as u,a as d,d as f}from"./entry.e65a8b12.js";import{s as v}from"./index.esm.4b125a15.js";import{s as g,a as y}from"./index.esm.20c9b6e4.js";import{s as $}from"./index.esm.6f348039.js";import"./baseicon.esm.727e0a4e.js";var h=`
@layer primevue {
    .p-inline-message {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: top;
    }
    
    .p-inline-message-icon {
        flex-shrink: 0;
    }

    .p-inline-message-icon-only .p-inline-message-text {
        visibility: hidden;
        width: 0;
    }

    .p-fluid .p-inline-message {
        display: flex;
    }
}
`,x={root:function(n){var s=n.props,t=n.instance;return["p-inline-message p-component p-inline-message-"+s.severity,{"p-inline-message-icon-only":!t.$slots.default}]},icon:function(n){var s=n.props;return["p-inline-message-icon",s.icon]},text:"p-inline-message-text"},B=l.extend({name:"inlinemessage",css:h,classes:x}),S={name:"BaseInlineMessage",extends:p,props:{severity:{type:String,default:"error"},icon:{type:String,default:void 0}},style:B,provide:function(){return{$parentInstance:this}}},k={name:"InlineMessage",extends:S,timeout:null,data:function(){return{visible:!0}},mounted:function(){var n=this;this.sticky||setTimeout(function(){n.visible=!1},this.life)},computed:{iconComponent:function(){return{info:g,success:v,warn:y,error:$}[this.severity]}}};function C(e,n,s,t,I,r){return o(),c("div",i({"aria-live":"polite",class:e.cx("root")},e.ptm("root")),[a(e.$slots,"icon",{},function(){return[(o(),m(u(e.icon?"span":r.iconComponent),i({class:e.cx("icon")},e.ptm("icon")),null,16,["class"]))]}),d("span",i({class:e.cx("text")},e.ptm("text")),[a(e.$slots,"default",{},function(){return[f(" ")]})],16)],16)}k.render=C;export{k as default};
