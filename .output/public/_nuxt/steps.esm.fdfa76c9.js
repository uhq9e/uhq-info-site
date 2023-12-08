import{ah as x,al as I,R as r,ao as P,ap as A,o as l,c,a as u,F as h,i as D,j as g,w as F,t as f,aq as C,s as E}from"./entry.e65a8b12.js";var K=`
@layer primevue {
    .p-steps {
        position: relative;
    }

    .p-steps .p-steps-list {
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
    }

    .p-steps-item {
        position: relative;
        display: flex;
        justify-content: center;
        flex: 1 1 auto;
        overflow: hidden;
    }

    .p-steps-item .p-menuitem-link {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        text-decoration: none;
    }

    .p-steps.p-steps-readonly .p-steps-item {
        cursor: auto;
    }

    .p-steps-item.p-steps-current .p-menuitem-link {
        cursor: default;
    }

    .p-steps-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    .p-steps-number {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-steps-title {
        display: block;
    }
}
`,O={root:function(e){var t=e.props;return["p-steps p-component",{"p-readonly":t.readonly}]},menu:"p-steps-list",menuitem:function(e){var t=e.instance,a=e.item;return["p-steps-item",{"p-highlight p-steps-current":t.isActive(a),"p-disabled":t.isItemDisabled(a)}]},action:function(e){var t=e.props,a=e.isActive,d=e.isExactActive;return["p-menuitem-link",{"router-link-active":a,"router-link-active-exact":t.exact&&d}]},step:"p-steps-number",label:"p-steps-title"},S=x.extend({name:"steps",css:K,classes:O}),M={name:"BaseSteps",extends:P,props:{id:{type:String},model:{type:Array,default:null},readonly:{type:Boolean,default:!0},exact:{type:Boolean,default:!0}},style:S,provide:function(){return{$parentInstance:this}}},B={name:"Steps",extends:M,beforeMount:function(){this.$slots.item||console.warn("In future versions, vue-router support will be removed. Item templating should be used.")},mounted:function(){var e=this.findFirstItem();e.tabIndex="0"},methods:{getPTOptions:function(e,t,a){return this.ptm(e,{context:{item:t,index:a,active:this.isActive(t),disabled:this.isItemDisabled(t)}})},onItemClick:function(e,t,a){if(this.disabled(t)||this.readonly){e.preventDefault();return}t.command&&t.command({originalEvent:e,item:t}),t.to&&a&&a(e)},onItemKeydown:function(e,t,a){switch(e.code){case"ArrowRight":{this.navigateToNextItem(e.target),e.preventDefault();break}case"ArrowLeft":{this.navigateToPrevItem(e.target),e.preventDefault();break}case"Home":{this.navigateToFirstItem(e.target),e.preventDefault();break}case"End":{this.navigateToLastItem(e.target),e.preventDefault();break}case"Tab":break;case"Enter":case"Space":{this.onItemClick(e,t,a),e.preventDefault();break}}},navigateToNextItem:function(e){var t=this.findNextItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToPrevItem:function(e){var t=this.findPrevItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToFirstItem:function(e){var t=this.findFirstItem(e);t&&this.setFocusToMenuitem(e,t)},navigateToLastItem:function(e){var t=this.findLastItem(e);t&&this.setFocusToMenuitem(e,t)},findNextItem:function(e){var t=e.parentElement.nextElementSibling;return t?t.children[0]:null},findPrevItem:function(e){var t=e.parentElement.previousElementSibling;return t?t.children[0]:null},findFirstItem:function(){var e=I.findSingle(this.$refs.list,'[data-pc-section="menuitem"]');return e?e.children[0]:null},findLastItem:function(){var e=I.find(this.$refs.list,'[data-pc-section="menuitem"]');return e?e[e.length-1].children[0]:null},setFocusToMenuitem:function(e,t){e.tabIndex="-1",t.tabIndex="0",t.focus()},isActive:function(e){return e.to?this.$router.resolve(e.to).path===this.$route.path:!1},isItemDisabled:function(e){return this.disabled(e)||this.readonly&&!this.isActive(e)},visible:function(e){return typeof e.visible=="function"?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled=="function"?e.disabled():e.disabled},label:function(e){return typeof e.label=="function"?e.label():e.label},getMenuItemProps:function(e,t){var a=this;return{action:r({class:this.cx("action"),onClick:function(i){return a.onItemClick(i,e)},onKeyDown:function(i){return a.onItemKeydown(i,e)}},this.getPTOptions("action",e,t)),step:r({class:this.cx("step")},this.getPTOptions("step",e,t)),label:r({class:this.cx("label")},this.getPTOptions("label",e,t))}}}},L=["id"],N=["data-p-highlight","data-p-disabled"],j=["href","aria-current","onClick","onKeydown"],H=["onKeydown"];function R(n,e,t,a,d,i){var y=A("router-link");return l(),c("nav",r({id:n.id,class:n.cx("root")},n.ptm("root"),{"data-pc-name":"steps"}),[u("ol",r({ref:"list",class:n.cx("menu")},n.ptm("menu")),[(l(!0),c(h,null,D(n.model,function(s,o){return l(),c(h,{key:s.to},[i.visible(s)?(l(),c("li",r({key:0,class:[n.cx("menuitem",{item:s}),s.class],style:s.style},i.getPTOptions("menuitem",s,o),{"data-p-highlight":i.isActive(s),"data-p-disabled":i.isItemDisabled(s)}),[n.$slots.item?(l(),g(C(n.$slots.item),{key:1,item:s,index:o,label:i.label(s),props:i.getMenuItemProps(s,o)},null,8,["item","index","label","props"])):(l(),c(h,{key:0},[i.isItemDisabled(s)?(l(),c("span",r({key:1,class:n.cx("action"),onKeydown:function(m){return i.onItemKeydown(m,s)}},i.getPTOptions("action",s,o)),[u("span",r({class:n.cx("step")},i.getPTOptions("step",s,o)),f(o+1),17),u("span",r({class:n.cx("label")},i.getPTOptions("label",s,o)),f(i.label(s)),17)],16,H)):(l(),g(y,{key:0,to:s.to,custom:""},{default:F(function(p){var m=p.navigate,k=p.href,T=p.isActive,b=p.isExactActive;return[u("a",r({href:k,class:n.cx("action",{isActive:T,isExactActive:b}),tabindex:-1,"aria-current":b?"step":void 0,onClick:function(v){return i.onItemClick(v,s,m)},onKeydown:function(v){return i.onItemKeydown(v,s,m)}},i.getPTOptions("action",s,o)),[u("span",r({class:n.cx("step")},i.getPTOptions("step",s,o)),f(o+1),17),u("span",r({class:n.cx("label")},i.getPTOptions("label",s,o)),f(i.label(s)),17)],16,j)]}),_:2},1032,["to"]))],64))],16,N)):E("",!0)],64)}),128))],16)],16,L)}B.render=R;export{B as default};
