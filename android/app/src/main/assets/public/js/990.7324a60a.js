"use strict";(self["webpackChunkZawadi"]=self["webpackChunkZawadi"]||[]).push([[990],{8990:(e,t,n)=>{n.r(t),n.d(t,{createSwipeBackGesture:()=>s});var r=n(6587),a=n(545),i=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const s=(e,t,n,s,c)=>{const o=e.ownerDocument.defaultView,u=(0,a.i)(e),d=e=>{const t=50,{startX:n}=e;return u?n>=o.innerWidth-t:n<=t},h=e=>u?-e.deltaX:e.deltaX,l=e=>u?-e.velocityX:e.velocityX,w=e=>d(e)&&t(),k=e=>{const t=h(e),n=t/o.innerWidth;s(n)},p=e=>{const t=h(e),n=o.innerWidth,a=t/n,i=l(e),s=n/2,u=i>=0&&(i>.2||t>s),d=u?1-a:a,w=d*n;let k=0;if(w>5){const e=w/Math.abs(i);k=Math.min(e,540)}c(u,a<=0?.01:(0,r.h)(0,a,.9999),k)};return(0,i.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:w,onStart:n,onMove:k,onEnd:p})}}}]);
//# sourceMappingURL=990.7324a60a.js.map