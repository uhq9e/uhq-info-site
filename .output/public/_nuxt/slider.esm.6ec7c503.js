import{ah as g,al as d,ao as p,o,c as u,a as b,R as s,s as h}from"./entry.e65a8b12.js";var y=`
@layer primevue {
    .p-slider {
        position: relative;
    }

    .p-slider .p-slider-handle {
        cursor: grab;
        touch-action: none;
        display: block;
    }

    .p-slider-range {
        display: block;
    }

    .p-slider-horizontal .p-slider-range {
        top: 0;
        left: 0;
        height: 100%;
    }

    .p-slider-horizontal .p-slider-handle {
        top: 50%;
    }

    .p-slider-vertical {
        height: 100px;
    }

    .p-slider-vertical .p-slider-handle {
        left: 50%;
    }

    .p-slider-vertical .p-slider-range {
        bottom: 0;
        left: 0;
        width: 100%;
    }
}
`,v={handle:{position:"absolute"},range:{position:"absolute"}},D={root:function(e){var n=e.props;return["p-slider p-component",{"p-disabled":n.disabled,"p-slider-horizontal":n.orientation==="horizontal","p-slider-vertical":n.orientation==="vertical"}]},range:"p-slider-range",handle:"p-slider-handle"},V=g.extend({name:"slider",css:y,classes:D,inlineStyles:v}),c={name:"BaseSlider",extends:p,props:{modelValue:[Number,Array],min:{type:Number,default:0},max:{type:Number,default:100},orientation:{type:String,default:"horizontal"},step:{type:Number,default:null},range:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},tabindex:{type:Number,default:0},"aria-labelledby":{type:String,default:null},"aria-label":{type:String,default:null}},style:V,provide:function(){return{$parentInstance:this}}};function S(t){return P(t)||L(t)||E(t)||w()}function w(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(t,e){if(t){if(typeof t=="string")return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(t,e)}}function L(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function P(t){if(Array.isArray(t))return m(t)}function m(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var k={name:"Slider",extends:c,emits:["update:modelValue","change","slideend"],dragging:!1,handleIndex:null,initX:null,initY:null,barWidth:null,barHeight:null,dragListener:null,dragEndListener:null,beforeUnmount:function(){this.unbindDragListeners()},methods:{updateDomData:function(){var e=this.$el.getBoundingClientRect();this.initX=e.left+d.getWindowScrollLeft(),this.initY=e.top+d.getWindowScrollTop(),this.barWidth=this.$el.offsetWidth,this.barHeight=this.$el.offsetHeight},setValue:function(e){var n,r=e.touches?e.touches[0].pageX:e.pageX,l=e.touches?e.touches[0].pageY:e.pageY;this.orientation==="horizontal"?n=(r-this.initX)*100/this.barWidth:n=(this.initY+this.barHeight-l)*100/this.barHeight;var i=(this.max-this.min)*(n/100)+this.min;if(this.step){var a=this.range?this.modelValue[this.handleIndex]:this.modelValue,f=i-a;f<0?i=a+Math.ceil(i/this.step-a/this.step)*this.step:f>0&&(i=a+Math.floor(i/this.step-a/this.step)*this.step)}else i=Math.floor(i);this.updateModel(e,i)},updateModel:function(e,n){var r=parseFloat(n.toFixed(10)),l;this.range?(l=this.modelValue?S(this.modelValue):[],this.handleIndex==0?(r<this.min?r=this.min:r>=this.max&&(r=this.max),l[0]=r):(r>this.max?r=this.max:r<=this.min&&(r=this.min),l[1]=r)):(r<this.min?r=this.min:r>this.max&&(r=this.max),l=r),this.$emit("update:modelValue",l),this.$emit("change",l)},onDragStart:function(e,n){this.disabled||(this.$el.setAttribute("data-p-sliding",!0),this.dragging=!0,this.updateDomData(),this.range&&this.modelValue[0]===this.max?this.handleIndex=0:this.handleIndex=n,e.currentTarget.focus(),e.preventDefault())},onDrag:function(e){this.dragging&&(this.setValue(e),e.preventDefault())},onDragEnd:function(e){this.dragging&&(this.dragging=!1,this.$el.setAttribute("data-p-sliding",!1),this.$emit("slideend",{originalEvent:e,value:this.modelValue}))},onBarClick:function(e){this.disabled||d.getAttribute(e.target,"data-pc-section")!=="handle"&&(this.updateDomData(),this.setValue(e))},onMouseDown:function(e,n){this.bindDragListeners(),this.onDragStart(e,n)},onKeyDown:function(e,n){switch(this.handleIndex=n,e.code){case"ArrowDown":case"ArrowLeft":this.decrementValue(e,n),e.preventDefault();break;case"ArrowUp":case"ArrowRight":this.incrementValue(e,n),e.preventDefault();break;case"PageDown":this.decrementValue(e,n,!0),e.preventDefault();break;case"PageUp":this.incrementValue(e,n,!0),e.preventDefault();break;case"Home":this.updateModel(e,this.min),e.preventDefault();break;case"End":this.updateModel(e,this.max),e.preventDefault();break}},decrementValue:function(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,l;this.range?this.step?l=this.modelValue[n]-this.step:l=this.modelValue[n]-1:this.step?l=this.modelValue-this.step:!this.step&&r?l=this.modelValue-10:l=this.modelValue-1,this.updateModel(e,l),e.preventDefault()},incrementValue:function(e,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,l;this.range?this.step?l=this.modelValue[n]+this.step:l=this.modelValue[n]+1:this.step?l=this.modelValue+this.step:!this.step&&r?l=this.modelValue+10:l=this.modelValue+1,this.updateModel(e,l),e.preventDefault()},bindDragListeners:function(){this.dragListener||(this.dragListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.dragListener)),this.dragEndListener||(this.dragEndListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.dragEndListener))},unbindDragListeners:function(){this.dragListener&&(document.removeEventListener("mousemove",this.dragListener),this.dragListener=null),this.dragEndListener&&(document.removeEventListener("mouseup",this.dragEndListener),this.dragEndListener=null)}},computed:{horizontal:function(){return this.orientation==="horizontal"},vertical:function(){return this.orientation==="vertical"},rangeStyle:function(){if(this.range){var e=this.rangeEndPosition>this.rangeStartPosition?this.rangeEndPosition-this.rangeStartPosition:this.rangeStartPosition-this.rangeEndPosition,n=this.rangeEndPosition>this.rangeStartPosition?this.rangeStartPosition:this.rangeEndPosition;return this.horizontal?{left:n+"%",width:e+"%"}:{bottom:n+"%",height:e+"%"}}else return this.horizontal?{width:this.handlePosition+"%"}:{height:this.handlePosition+"%"}},handleStyle:function(){return this.horizontal?{left:this.handlePosition+"%"}:{bottom:this.handlePosition+"%"}},handlePosition:function(){return this.modelValue<this.min?0:this.modelValue>this.max?100:(this.modelValue-this.min)*100/(this.max-this.min)},rangeStartPosition:function(){return this.modelValue&&this.modelValue[0]?(this.modelValue[0]<this.min?0:this.modelValue[0]-this.min)*100/(this.max-this.min):0},rangeEndPosition:function(){return this.modelValue&&this.modelValue.length===2?(this.modelValue[1]>this.max?100:this.modelValue[1]-this.min)*100/(this.max-this.min):100},rangeStartHandleStyle:function(){return this.horizontal?{left:this.rangeStartPosition+"%"}:{bottom:this.rangeStartPosition+"%"}},rangeEndHandleStyle:function(){return this.horizontal?{left:this.rangeEndPosition+"%"}:{bottom:this.rangeEndPosition+"%"}}}},A=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],M=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"],H=["tabindex","aria-valuemin","aria-valuenow","aria-valuemax","aria-labelledby","aria-label","aria-orientation"];function T(t,e,n,r,l,i){return o(),u("div",s({class:t.cx("root"),onClick:e[15]||(e[15]=function(){return i.onBarClick&&i.onBarClick.apply(i,arguments)})},t.ptm("root"),{"data-p-sliding":!1,"data-pc-name":"slider"}),[b("span",s({class:t.cx("range"),style:[t.sx("range"),i.rangeStyle]},t.ptm("range")),null,16),t.range?h("",!0):(o(),u("span",s({key:0,class:t.cx("handle"),style:[t.sx("handle"),i.handleStyle],onTouchstart:e[0]||(e[0]=function(a){return i.onDragStart(a)}),onTouchmove:e[1]||(e[1]=function(a){return i.onDrag(a)}),onTouchend:e[2]||(e[2]=function(a){return i.onDragEnd(a)}),onMousedown:e[3]||(e[3]=function(a){return i.onMouseDown(a)}),onKeydown:e[4]||(e[4]=function(a){return i.onKeyDown(a)}),tabindex:t.tabindex,role:"slider","aria-valuemin":t.min,"aria-valuenow":t.modelValue,"aria-valuemax":t.max,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-orientation":t.orientation},t.ptm("handle")),null,16,A)),t.range?(o(),u("span",s({key:1,class:t.cx("handle"),style:[t.sx("handle"),i.rangeStartHandleStyle],onTouchstart:e[5]||(e[5]=function(a){return i.onDragStart(a,0)}),onTouchmove:e[6]||(e[6]=function(a){return i.onDrag(a)}),onTouchend:e[7]||(e[7]=function(a){return i.onDragEnd(a)}),onMousedown:e[8]||(e[8]=function(a){return i.onMouseDown(a,0)}),onKeydown:e[9]||(e[9]=function(a){return i.onKeyDown(a,0)}),tabindex:t.tabindex,role:"slider","aria-valuemin":t.min,"aria-valuenow":t.modelValue?t.modelValue[0]:null,"aria-valuemax":t.max,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-orientation":t.orientation},t.ptm("startHandler")),null,16,M)):h("",!0),t.range?(o(),u("span",s({key:2,class:t.cx("handle"),style:[t.sx("handle"),i.rangeEndHandleStyle],onTouchstart:e[10]||(e[10]=function(a){return i.onDragStart(a,1)}),onTouchmove:e[11]||(e[11]=function(a){return i.onDrag(a)}),onTouchend:e[12]||(e[12]=function(a){return i.onDragEnd(a)}),onMousedown:e[13]||(e[13]=function(a){return i.onMouseDown(a,1)}),onKeydown:e[14]||(e[14]=function(a){return i.onKeyDown(a,1)}),tabindex:t.tabindex,role:"slider","aria-valuemin":t.min,"aria-valuenow":t.modelValue?t.modelValue[1]:null,"aria-valuemax":t.max,"aria-labelledby":t.ariaLabelledby,"aria-label":t.ariaLabel,"aria-orientation":t.orientation},t.ptm("endHandler")),null,16,H)):h("",!0)],16)}k.render=T;export{k as default};
