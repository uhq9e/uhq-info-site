import{ah as s,ao as o,o as t,c as l,S as p,R as i,t as c,j as u,l as d,aq as m,s as v}from"./entry.e65a8b12.js";var g=`
@layer primevue {
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
    }

    .p-avatar.p-avatar-image {
        background-color: transparent;
    }

    .p-avatar.p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar .p-avatar-icon {
        font-size: 1rem;
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }
}
`,y={root:function(e){var n=e.props;return["p-avatar p-component",{"p-avatar-image":n.image!=null,"p-avatar-circle":n.shape==="circle","p-avatar-lg":n.size==="large","p-avatar-xl":n.size==="xlarge"}]},label:"p-avatar-text",icon:"p-avatar-icon"},b=s.extend({name:"avatar",css:g,classes:y}),f={name:"BaseAvatar",extends:o,props:{label:{type:String,default:null},icon:{type:String,default:null},image:{type:String,default:null},size:{type:String,default:"normal"},shape:{type:String,default:"square"},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},style:b,provide:function(){return{$parentInstance:this}}},h={name:"Avatar",extends:f,emits:["error"],methods:{onError:function(e){this.$emit("error",e)},getPTOptions:function(e){return this.ptm(e,{parent:{instance:this.$parent}})}}},S=["aria-labelledby","aria-label"],k=["src","alt"];function P(a,e,n,z,E,r){return t(),l("div",i({class:a.cx("root"),"aria-labelledby":a.ariaLabelledby,"aria-label":a.ariaLabel},r.getPTOptions("root"),{"data-pc-name":"avatar"}),[p(a.$slots,"default",{},function(){return[a.label?(t(),l("span",i({key:0,class:a.cx("label")},r.getPTOptions("label")),c(a.label),17)):a.$slots.icon?(t(),u(m(a.$slots.icon),{key:1,class:d(a.cx("icon"))},null,8,["class"])):a.icon?(t(),l("span",i({key:2,class:[a.cx("icon"),a.icon]},r.getPTOptions("icon")),null,16)):a.image?(t(),l("img",i({key:3,src:a.image,alt:a.ariaLabel,onError:e[0]||(e[0]=function(){return r.onError&&r.onError.apply(r,arguments)})},r.getPTOptions("image")),null,16,k)):v("",!0)]})],16,S)}h.render=P;export{h as default};
