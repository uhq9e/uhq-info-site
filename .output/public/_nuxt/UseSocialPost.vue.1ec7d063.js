import y from"./tag.esm.ba7bd9e1.js";import{g as _,r as m,h as g,o,c as i,S as d,u as a,j as p,w as u,a as s,t as P,F as T,i as b,k as w,b as B,s as S,e as N}from"./entry.e65a8b12.js";import $ from"./overlaypanel.esm.c86d5ed9.js";import{a as C,m as D}from"./index.ca906294.js";const H={class:"mb:16"},V=s("div",{class:"f:0.8em"},"作者",-1),x={class:"f:bold f:1.2em max-w:full"},F=s("div",{class:"f:0.8em mb:4"},"社交链接",-1),L={class:"flex flex:row gap:4"},E=_({__name:"AuthorPanel",props:{author:{}},setup(r){const t=m();return(e,n)=>{const l=y,f=N,h=$,v=g("ripple");return o(),i("div",null,[d(e.$slots,"default",{op:a(t)}),e.author?(o(),p(h,{key:0,ref_key:"op",ref:t},{default:u(()=>[s("div",H,[V,s("div",x,P(e.author.name),1)]),s("div",null,[F,s("div",L,[(o(!0),i(T,null,b(e.author.urls,(c,k)=>(o(),p(f,{key:k,href:c,target:"_blank"},{default:u(()=>[w(B(l,{value:("urlToHostname"in e?e.urlToHostname:a(C))(c),class:"p-ripple capitalize"},null,8,["value"]),[[v]])]),_:2},1032,["href"]))),128))])])]),_:1},512)):S("",!0)])}}}),O=_({__name:"UseSocialPost",props:{url:{}},setup(r){const e=m(D(r.url));return(n,l)=>d(n.$slots,"default",{socialPostType:a(e)})}});export{E as _,O as a};
