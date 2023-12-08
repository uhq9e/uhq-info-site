import{ah as i,ai as t}from"./entry.e65a8b12.js";var o=`
.p-icon {
    display: inline-block;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,a=i.extend({name:"baseicon",css:o}),s={name:"BaseIcon",props:{label:{type:String,default:void 0},spin:{type:Boolean,default:!1}},beforeMount:function(){var n;a.loadStyle({nonce:(n=this.$config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce})},methods:{pti:function(){var n=t.isEmpty(this.label);return{class:["p-icon",{"p-icon-spin":this.spin}],role:n?void 0:"img","aria-label":n?void 0:this.label,"aria-hidden":n}}},computed:{$config:function(){var n;return(n=this.$primevue)===null||n===void 0?void 0:n.config}}};export{s};
