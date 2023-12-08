import{ah as h,an as m,ao as y,h as g,k as v,o as c,c as d,a,R as r,S as O,s as L,l as S,t as k}from"./entry.e65a8b12.js";var P={root:function(t){var n=t.instance,i=t.props;return["p-button p-togglebutton p-component",{"p-focus":n.focused,"p-button-icon-only":n.hasIcon&&!n.hasLabel,"p-disabled":i.disabled,"p-highlight":i.modelValue===!0}]},icon:function(t){var n=t.instance,i=t.props;return["p-button-icon",{"p-button-icon-left":i.iconPos==="left"&&n.label,"p-button-icon-right":i.iconPos==="right"&&n.label}]},label:"p-button-label"},C=h.extend({name:"accordion",classes:P}),I={name:"BaseToggleButton",extends:y,props:{modelValue:Boolean,onIcon:String,offIcon:String,onLabel:{type:String,default:"Yes"},offLabel:{type:String,default:"No"},iconPos:{type:String,default:"left"},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},style:C,provide:function(){return{$parentInstance:this}}},j={name:"ToggleButton",extends:I,emits:["update:modelValue","change","click","focus","blur"],outsideClickListener:null,data:function(){return{focused:!1}},mounted:function(){this.bindOutsideClickListener()},beforeUnmount:function(){this.unbindOutsideClickListener()},methods:{onClick:function(t){this.disabled||(this.$emit("update:modelValue",!this.modelValue),this.$emit("change",t),this.$emit("click",t),this.focused=!0)},onFocus:function(t){this.focused=!0,this.$emit("focus",t)},onBlur:function(t){this.focused=!1,this.$emit("blur",t)},bindOutsideClickListener:function(){var t=this;this.outsideClickListener||(this.outsideClickListener=function(n){t.focused&&!t.$refs.container.contains(n.target)&&(t.focused=!1)},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)}},computed:{hasLabel:function(){return this.onLabel&&this.onLabel.length>0&&this.offLabel&&this.offLabel.length>0},hasIcon:function(){return this.$slots.icon||this.onIcon&&this.offIcon},label:function(){return this.hasLabel?this.modelValue?this.onLabel:this.offLabel:"&nbsp;"},getPTOptions:function(){return{context:{focused:this.focused,disabled:this.disabled,highlighted:this.modelValue===!0}}}},directives:{ripple:m}};function s(e){"@babel/helpers - typeof";return s=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(e)}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(u){return Object.getOwnPropertyDescriptor(e,u).enumerable})),n.push.apply(n,i)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?p(Object(n),!0).forEach(function(i){B(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}function B(e,t,n){return t=V(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function V(e){var t=w(e,"string");return s(t)==="symbol"?t:String(t)}function w(e,t){if(s(e)!=="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(s(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var T=["data-p-active"],$=["id","checked","value","aria-labelledby","aria-label"];function D(e,t,n,i,u,o){var b=g("ripple");return v((c(),d("div",r({ref:"container",class:e.cx("root"),onClick:t[2]||(t[2]=function(l){return o.onClick(l)})},e.ptm("root",o.getPTOptions),{"data-p-active":e.modelValue===!0,"data-pc-name":"togglebutton"}),[a("span",r({class:"p-hidden-accessible"},e.ptm("hiddenInputWrapper"),{"data-p-hidden-accessible":!0}),[a("input",r({id:e.inputId,type:"checkbox",role:"switch",class:e.inputClass,style:e.inputStyle,checked:e.modelValue,value:e.modelValue,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,onFocus:t[0]||(t[0]=function(l){return o.onFocus(l)}),onBlur:t[1]||(t[1]=function(l){return o.onBlur(l)})},f(f({},e.inputProps),e.ptm("hiddenInput"))),null,16,$)],16),O(e.$slots,"icon",{value:e.modelValue,class:S(e.cx("icon"))},function(){return[e.onIcon||e.offIcon?(c(),d("span",r({key:0,class:[e.cx("icon"),e.modelValue?e.onIcon:e.offIcon]},e.ptm("icon",o.getPTOptions)),null,16)):L("",!0)]}),a("span",r({class:e.cx("label")},e.ptm("label",o.getPTOptions)),k(o.label),17)],16,T)),[[b]])}j.render=D;export{j as default};
