import{s as u}from"./index.esm.6f348039.js";import{ah as d,ao as h,o,c as r,S as t,R as i,j as c,aq as p,s,t as v}from"./entry.e65a8b12.js";import"./baseicon.esm.727e0a4e.js";var y=`
@layer primevue {
    .p-chip {
        display: inline-flex;
        align-items: center;
    }

    .p-chip-text {
        line-height: 1.5;
    }

    .p-chip-icon.pi {
        line-height: 1.5;
    }

    .p-chip-remove-icon {
        line-height: 1.5;
        cursor: pointer;
    }

    .p-chip img {
        border-radius: 50%;
    }
}
`,f={root:function(n){var l=n.props;return["p-chip p-component",{"p-chip-image":l.image!=null}]},icon:"p-chip-icon",label:"p-chip-text",removeIcon:"p-chip-remove-icon"},g=d.extend({name:"chip",css:y,classes:f}),b={name:"BaseChip",extends:h,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},removable:{type:Boolean,default:!1},removeIcon:{type:String,default:void 0}},style:g,provide:function(){return{$parentInstance:this}}},k={name:"Chip",extends:b,emits:["remove"],data:function(){return{visible:!0}},methods:{onKeydown:function(n){(n.key==="Enter"||n.key==="Backspace")&&this.close(n)},close:function(n){this.visible=!1,this.$emit("remove",n)}},components:{TimesCircleIcon:u}},C=["aria-label"],I=["src"];function S(e,n,l,$,m,a){return m.visible?(o(),r("div",i({key:0,class:e.cx("root"),"aria-label":e.label},e.ptm("root"),{"data-pc-name":"chip"}),[t(e.$slots,"default",{},function(){return[e.image?(o(),r("img",i({key:0,src:e.image},e.ptm("image")),null,16,I)):e.$slots.icon?(o(),c(p(e.$slots.icon),i({key:1,class:e.cx("icon")},e.ptm("icon")),null,16,["class"])):e.icon?(o(),r("span",i({key:2,class:[e.cx("icon"),e.icon]},e.ptm("icon")),null,16)):s("",!0),e.label?(o(),r("div",i({key:3,class:e.cx("label")},e.ptm("label")),v(e.label),17)):s("",!0)]}),e.removable?t(e.$slots,"removeicon",{key:0,onClick:a.close,onKeydown:a.onKeydown},function(){return[(o(),c(p(e.removeIcon?"span":"TimesCircleIcon"),i({tabindex:"0",class:[e.cx("removeIcon"),e.removeIcon],onClick:a.close,onKeydown:a.onKeydown},e.ptm("removeIcon")),null,16,["class","onClick","onKeydown"]))]}):s("",!0)],16,C)):s("",!0)}k.render=S;export{k as default};
