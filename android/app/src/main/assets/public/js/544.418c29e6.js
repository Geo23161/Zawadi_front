"use strict";(self["webpackChunkZawadi"]=self["webpackChunkZawadi"]||[]).push([[544],{2642:(e,t,s)=>{s.r(t),s.d(t,{startFocusVisible:()=>c});
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const o="ion-focused",n="ion-focusable",r=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],c=e=>{let t=[],s=!0;const c=e?e.shadowRoot:document,i=e||document.body,a=e=>{t.forEach((e=>e.classList.remove(o))),e.forEach((e=>e.classList.add(o))),t=e},d=()=>{s=!1,a([])},u=e=>{s=r.includes(e.key),s||a([])},v=e=>{if(s&&void 0!==e.composedPath){const t=e.composedPath().filter((e=>!!e.classList&&e.classList.contains(n)));a(t)}},E=()=>{c.activeElement===i&&a([])};c.addEventListener("keydown",u),c.addEventListener("focusin",v),c.addEventListener("focusout",E),c.addEventListener("touchstart",d),c.addEventListener("mousedown",d);const L=()=>{c.removeEventListener("keydown",u),c.removeEventListener("focusin",v),c.removeEventListener("focusout",E),c.removeEventListener("touchstart",d),c.removeEventListener("mousedown",d)};return{destroy:L,setFocus:a}}}}]);
//# sourceMappingURL=544.418c29e6.js.map