import{s as v}from"./index.esm.6f348039.js";import{ah as w,aj as O,ao as x,o as d,c as m,a as c,F as C,i as V,R as u,S as y,t as S,l as b,j as B,aq as A}from"./entry.e65a8b12.js";import"./baseicon.esm.727e0a4e.js";var P=`
@layer primevue {
    .p-chips {
        display: inline-flex;
    }

    .p-chips-multiple-container {
        margin: 0;
        padding: 0;
        list-style-type: none;
        cursor: text;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .p-chips-token {
        cursor: default;
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
    }

    .p-chips-input-token {
        flex: 1 1 auto;
        display: inline-flex;
    }

    .p-chips-token-icon {
        cursor: pointer;
    }

    .p-chips-input-token input {
        border: 0 none;
        outline: 0 none;
        background-color: transparent;
        margin: 0;
        padding: 0;
        box-shadow: none;
        border-radius: 0;
        width: 100%;
    }

    .p-fluid .p-chips {
        display: flex;
    }
}
`,j={root:function(n){var t=n.instance,r=n.props;return["p-chips p-component p-inputwrapper",{"p-disabled":r.disabled,"p-focus":t.focused,"p-inputwrapper-filled":r.modelValue&&r.modelValue.length||t.inputValue&&t.inputValue.length,"p-inputwrapper-focus":t.focused}]},container:"p-inputtext p-chips-multiple-container",token:function(n){var t=n.state,r=n.index;return["p-chips-token",{"p-focus":t.focusedIndex===r}]},label:"p-chips-token-label",removeTokenIcon:"p-chips-token-icon",inputToken:"p-chips-input-token"},K=w.extend({name:"chips",css:P,classes:j}),D={name:"BaseChips",extends:x,props:{modelValue:{type:Array,default:null},max:{type:Number,default:null},separator:{type:[String,Object],default:null},addOnBlur:{type:Boolean,default:null},allowDuplicate:{type:Boolean,default:!0},placeholder:{type:String,default:null},disabled:{type:Boolean,default:!1},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},inputProps:{type:null,default:null},removeTokenIcon:{type:String,default:void 0},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},style:K,provide:function(){return{$parentInstance:this}}};function p(e){return L(e)||E(e)||F(e)||T()}function T(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function F(e,n){if(e){if(typeof e=="string")return h(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return h(e,n)}}function E(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function L(e){if(Array.isArray(e))return h(e)}function h(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var R={name:"Chips",extends:D,emits:["update:modelValue","add","remove","focus","blur"],data:function(){return{id:O(),inputValue:null,focused:!1,focusedIndex:null}},methods:{onWrapperClick:function(){this.$refs.input.focus()},onInput:function(n){this.inputValue=n.target.value,this.focusedIndex=null},onFocus:function(n){this.focused=!0,this.focusedIndex=null,this.$emit("focus",n)},onBlur:function(n){this.focused=!1,this.focusedIndex=null,this.addOnBlur&&this.addItem(n,n.target.value,!1),this.$emit("blur",n)},onKeyDown:function(n){var t=n.target.value;switch(n.code){case"Backspace":t.length===0&&this.modelValue&&this.modelValue.length>0&&(this.focusedIndex!==null?this.removeItem(n,this.focusedIndex):this.removeItem(n,this.modelValue.length-1));break;case"Enter":t&&t.trim().length&&!this.maxedOut&&this.addItem(n,t,!0);break;case"ArrowLeft":t.length===0&&this.modelValue&&this.modelValue.length>0&&this.$refs.container.focus();break;case"ArrowRight":n.stopPropagation();break;default:this.separator&&(this.separator===n.key||n.key.match(this.separator))&&this.addItem(n,t,!0);break}},onPaste:function(n){var t=this;if(this.separator){var r=(n.clipboardData||window.clipboardData).getData("Text");if(r){var i=this.modelValue||[],o=r.split(this.separator);o=o.filter(function(a){return t.allowDuplicate||i.indexOf(a)===-1}),i=[].concat(p(i),p(o)),this.updateModel(n,i,!0)}}},onContainerFocus:function(){this.focused=!0},onContainerBlur:function(){this.focusedIndex=-1,this.focused=!1},onContainerKeyDown:function(n){switch(n.code){case"ArrowLeft":this.onArrowLeftKeyOn(n);break;case"ArrowRight":this.onArrowRightKeyOn(n);break;case"Backspace":this.onBackspaceKeyOn(n);break}},onArrowLeftKeyOn:function(){this.inputValue.length===0&&this.modelValue&&this.modelValue.length>0&&(this.focusedIndex=this.focusedIndex===null?this.modelValue.length-1:this.focusedIndex-1,this.focusedIndex<0&&(this.focusedIndex=0))},onArrowRightKeyOn:function(){this.inputValue.length===0&&this.modelValue&&this.modelValue.length>0&&(this.focusedIndex===this.modelValue.length-1?(this.focusedIndex=null,this.$refs.input.focus()):this.focusedIndex++)},onBackspaceKeyOn:function(n){this.focusedIndex!==null&&this.removeItem(n,this.focusedIndex)},updateModel:function(n,t,r){var i=this;this.$emit("update:modelValue",t),this.$emit("add",{originalEvent:n,value:t}),this.$refs.input.value="",this.inputValue="",setTimeout(function(){i.maxedOut&&(i.focused=!1)},0),r&&n.preventDefault()},addItem:function(n,t,r){if(t&&t.trim().length){var i=this.modelValue?p(this.modelValue):[];(this.allowDuplicate||i.indexOf(t)===-1)&&(i.push(t),this.updateModel(n,i,r))}},removeItem:function(n,t){if(!this.disabled){var r=p(this.modelValue),i=r.splice(t,1);this.focusedIndex=null,this.$refs.input.focus(),this.$emit("update:modelValue",r),this.$emit("remove",{originalEvent:n,value:i})}}},computed:{maxedOut:function(){return this.max&&this.modelValue&&this.max===this.modelValue.length},focusedOptionId:function(){return this.focusedIndex!==null?"".concat(this.id,"_chips_item_").concat(this.focusedIndex):null}},components:{TimesCircleIcon:v}};function s(e){"@babel/helpers - typeof";return s=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},s(e)}function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),t.push.apply(t,r)}return t}function I(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?g(Object(t),!0).forEach(function(r){M(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function M(e,n,t){return n=z(n),n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function z(e){var n=W(e,"string");return s(n)==="symbol"?n:String(n)}function W(e,n){if(s(e)!=="object"||e===null)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var r=t.call(e,n||"default");if(s(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var N=["aria-labelledby","aria-label","aria-activedescendant"],q=["id","aria-label","aria-setsize","aria-posinset","data-p-focused"],U=["id","disabled","placeholder"];function H(e,n,t,r,i,o){return d(),m("div",u({class:e.cx("root")},e.ptm("root"),{"data-pc-name":"chips"}),[c("ul",u({ref:"container",class:e.cx("container"),tabindex:"-1",role:"listbox","aria-orientation":"horizontal","aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-activedescendant":i.focused?o.focusedOptionId:void 0,onClick:n[5]||(n[5]=function(a){return o.onWrapperClick()}),onFocus:n[6]||(n[6]=function(){return o.onContainerFocus&&o.onContainerFocus.apply(o,arguments)}),onBlur:n[7]||(n[7]=function(){return o.onContainerBlur&&o.onContainerBlur.apply(o,arguments)}),onKeydown:n[8]||(n[8]=function(){return o.onContainerKeyDown&&o.onContainerKeyDown.apply(o,arguments)})},e.ptm("container")),[(d(!0),m(C,null,V(e.modelValue,function(a,l){return d(),m("li",u({key:"".concat(l,"_").concat(a),id:i.id+"_chips_item_"+l,role:"option",class:e.cx("token",{index:l}),"aria-label":a,"aria-selected":!0,"aria-setsize":e.modelValue.length,"aria-posinset":l+1},e.ptm("token"),{"data-p-focused":i.focusedIndex===l}),[y(e.$slots,"chip",{class:b(e.cx("label")),value:a},function(){return[c("span",u({class:e.cx("label")},e.ptm("label")),S(a),17)]}),y(e.$slots,"removetokenicon",{class:b(e.cx("removeTokenIcon")),index:l,onClick:function(f){return o.removeItem(f,l)}},function(){return[(d(),B(A(e.removeTokenIcon?"span":"TimesCircleIcon"),u({class:[e.cx("removeTokenIcon"),e.removeTokenIcon],onClick:function(f){return o.removeItem(f,l)},"aria-hidden":"true"},e.ptm("removeTokenIcon")),null,16,["class","onClick"]))]})],16,q)}),128)),c("li",u({class:e.cx("inputToken"),role:"option"},e.ptm("inputToken")),[c("input",u({ref:"input",id:e.inputId,type:"text",class:e.inputClass,style:e.inputStyle,disabled:e.disabled||o.maxedOut,placeholder:e.placeholder,onFocus:n[0]||(n[0]=function(a){return o.onFocus(a)}),onBlur:n[1]||(n[1]=function(a){return o.onBlur(a)}),onInput:n[2]||(n[2]=function(){return o.onInput&&o.onInput.apply(o,arguments)}),onKeydown:n[3]||(n[3]=function(a){return o.onKeyDown(a)}),onPaste:n[4]||(n[4]=function(a){return o.onPaste(a)})},I(I({},e.inputProps),e.ptm("input"))),null,16,U)],16)],16,N)],16)}R.render=H;export{R as default};
