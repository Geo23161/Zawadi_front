"use strict";(self["webpackChunkZawadi"]=self["webpackChunkZawadi"]||[]).push([[190],{5402:(e,t,a)=>{a.d(t,{BO:()=>o,Lr:()=>i,QP:()=>r,UT:()=>d,bw:()=>m,ob:()=>u,uZ:()=>c});a(8862),a(7658);var s=a(3978),n=a(3274),l=a(8433);const o=async()=>{const e=new s.K({name:"seller_info"});e.create();const t=await e.get("stoken");if(!t)return!1;{const s=JSON.parse(t);try{const e=await(0,l.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${s.access}`}});if(e.data["done"])return!0}catch(a){if(401==a.response.status){const t=new FormData;t.append("refresh",s.refresh);try{const a=await(0,l.Z)({url:"api/token/refresh/",method:"POST",data:t});return s.access=a.data["access"],e.set("stoken",JSON.stringify(s)),!0}catch(a){if(401==a.response.status)return!1}}}}},r=async e=>{const t=await n.G0.create({message:e});return t.present(),t},i=async(e,t)=>{const a=await n.Cl.create({header:e,message:t,buttons:["OK"]});await a.present()},c=async(e,t,a,s)=>{const l=await n.Cl.create({header:e,message:t,buttons:[{text:"Fermer",role:"cancel"},{text:a,role:"confirm",handler:()=>{s()}}]});await l.present()},u=async(e,t,a="primary")=>{const s=await n.Mn.create({mode:"ios",message:t,position:e,duration:3900,color:a});await s.present()},d=async(e,t,a)=>{const n=new s.K({name:"seller_info"});n.create();const o=await n.get("stoken");if(!o)return a&&a.dismiss(),t.push(`/seller?redirect=${e}`);{const a=JSON.parse(o);try{await(0,l.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${a.access}`}});return a.access}catch(r){if(401==r.response.status){const s=new FormData;s.append("refresh",a.refresh);try{const e=await(0,l.Z)({url:"api/token/refresh/",method:"POST",data:s});return a.access=e.data["access"],n.set("stoken",JSON.stringify(a)),e.data["access"]}catch(r){if(401==r.response.status)return t.push(`/seller?redirect=${e}`)}}}}},m=e=>{window.location.href="tel:"+e}},7189:(e,t,a)=>{a.r(t),a.d(t,{default:()=>G});a(8862),a(7658);var s=a(6252),n=a(2262),l=a(9963),o=a(1787),r=a(6545),i=a(5560),c=a(1499);const u=a.p+"img/new.14f3b509.svg";var d=a(3274),m=a(8903),w=a(2201),p=a(5402),_=a(3978),f=a(8433),v=a(9564);const g=e=>((0,s.dD)("data-v-eb323ab8"),e=e(),(0,s.Cn)(),e),h=g((()=>(0,s._)("img",{src:o},null,-1))),S=g((()=>(0,s._)("img",{src:r},null,-1))),y=g((()=>(0,s._)("img",{src:i},null,-1))),U=g((()=>(0,s._)("img",{src:c},null,-1))),W={class:"body_all"},b={class:"header"},k={class:"menu"},C=g((()=>(0,s._)("div",{class:"title_m"},[(0,s._)("div",{class:"img_cont"},[(0,s._)("img",{src:r,class:"img_m"})]),(0,s._)("div",{class:"text_m"},"Zawadi")],-1))),Z=g((()=>(0,s._)("div",{class:"title_b"},"Connexion.",-1))),I=g((()=>(0,s._)("div",{class:"body_i"},[(0,s._)("img",{src:u,class:"img_b"})],-1))),O={class:"form_b"},x={class:"d_sp"},J={class:"d_sp"},B=g((()=>(0,s._)("div",{style:{"padding-top":"0rem"}},[(0,s._)("a",{href:"whatsapp://send?text=J'aimerais proceder au changement de mon mot de passe",style:{color:"green","text-decoration":"underline"}},"Mot de passe oublié?")],-1))),$={key:0,style:{"padding-top":"0.4rem"}},Q={key:1},K={class:"d_sp",style:{"text-align":"center",color:"rgb(41, 41, 41)"}},P=(0,s.aZ)({__name:"SellerLoginView",setup(e){v.A_.setBackgroundColor({color:"#17A649"});const t=(0,n.iH)(""),a=(0,n.iH)(""),o=(0,w.tv)(),r=(0,n.iH)(!1),i=(0,w.yj)(),c=async()=>{const e=new FormData;e.append("email",t.value);const a=await(0,f.Z)({url:"v2/api/authenticate_seller/",method:"POST",data:e});return a.data["done"]},u=async()=>{const e=await g("Connexion...");if(!await c())return e.dismiss(),P("Connexion impossible","Aucun compte vendeur n'est associé à ces identifiants");(0,f.Z)({url:"api/token/",method:"POST",data:{email:t.value,password:a.value}}).then((s=>{e.dismiss();const n=new _.K({name:"seller_info"});n.create(),n.set("stoken",JSON.stringify(s.data)),n.set("email",t.value),n.set("password",a.value),setTimeout((()=>{"redirect"in i.query&&o.push(i.query.redirect),o.push("/seller/home")}),200)})).catch((t=>(e.dismiss(),console.log(t),P("Connexion impossible","Veuillez vérifier vos identifiants."))))},g=async e=>{const t=await d.G0.create({message:e});return t.present(),t},P=async(e,t)=>{const a=await d.Cl.create({header:e,message:t,buttons:["OK"]});await a.present()},T=e=>{window.location.href=e},z=e=>{g("Loading..."),window.location.href=e};return(0,d.Yr)((async()=>{const e=localStorage.getItem("new_s");if(e){const s=JSON.parse(e);t.value=s.email,a.value=s.password,localStorage.removeItem("new_s"),await u()}const s=await(0,p.BO)();if(s)o.push("/seller/home");else{const e=new _.K({name:"seller_info"});e.create();const s=await e.get("email"),n=await e.get("password");s&&(t.value=s),n&&(a.value=n)}})),(e,i)=>{const c=(0,s.up)("ion-title"),w=(0,s.up)("ion-toolbar"),p=(0,s.up)("ion-header"),_=(0,s.up)("ion-footer"),f=(0,s.up)("ion-icon");return(0,s.wg)(),(0,s.j4)((0,n.SU)(d._i),null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.z0),{class:"poino","content-id":"main-content"},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{mode:"ios"},{default:(0,s.w5)((()=>[(0,s.Wm)(w,null,{default:(0,s.w5)((()=>[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s.Uk)("Menu")])),_:1})])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(d.W2),null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.q_),null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.Ie),{detail:"true",onClick:i[0]||(i[0]=e=>z("/acheteur")),button:""},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.BJ),{slot:"start"},{default:(0,s.w5)((()=>[h])),_:1}),(0,s.Wm)((0,n.SU)(d.Q$),null,{default:(0,s.w5)((()=>[(0,s.Uk)(" Zawadi Acheteur ")])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(d.Ie),{detail:"true",color:"secondary",button:""},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.BJ),{slot:"start"},{default:(0,s.w5)((()=>[S])),_:1}),(0,s.Wm)((0,n.SU)(d.Q$),null,{default:(0,s.w5)((()=>[(0,s.Uk)(" Zawadi Vendeur ")])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(d.Ie),{onClick:i[1]||(i[1]=e=>z("/patner")),detail:"true",button:""},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.BJ),{slot:"start"},{default:(0,s.w5)((()=>[y])),_:1}),(0,s.Wm)((0,n.SU)(d.Q$),null,{default:(0,s.w5)((()=>[(0,s.Uk)(" Zawadi Partenaire ")])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(d.Ie),{detail:"true",onClick:i[2]||(i[2]=e=>T("https://www.zawadi.site/blog")),button:""},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.BJ),{slot:"start"},{default:(0,s.w5)((()=>[U])),_:1}),(0,s.Wm)((0,n.SU)(d.Q$),null,{default:(0,s.w5)((()=>[(0,s.Uk)(" Zawadi Blog ")])),_:1})])),_:1})])),_:1})])),_:1}),(0,s.Wm)(_,null,{default:(0,s.w5)((()=>[(0,s.Wm)(w,{mode:"ios"},{default:(0,s.w5)((()=>[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s.Uk)(" © Elife Global")])),_:1})])),_:1})])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(d.W2),null,{default:(0,s.w5)((()=>[(0,s._)("div",W,[(0,s._)("form",{onSubmit:i[6]||(i[6]=(0,l.iM)((e=>u()),["prevent"]))},[(0,s._)("div",b,[(0,s.Wm)((0,n.SU)(d.zc),null,{default:(0,s.w5)((()=>[(0,s._)("div",k,[(0,s.Wm)(f,{icon:(0,n.SU)(m.GIQ)},null,8,["icon"])])])),_:1}),C]),Z,I,(0,s._)("div",O,[(0,s._)("div",x,[(0,s.Wm)((0,n.SU)(d.Ie),{fill:"outline",mode:"md",color:"secondary"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.Q$),{position:"floating"},{default:(0,s.w5)((()=>[(0,s.Uk)("Email")])),_:1}),(0,s.Wm)((0,n.SU)(d.pK),{required:"",value:t.value,type:"email",onIonInput:i[3]||(i[3]=e=>t.value=e.target.value)},null,8,["value"])])),_:1})]),(0,s._)("div",J,[(0,s.Wm)((0,n.SU)(d.Ie),{fill:"outline",mode:"md",color:"secondary"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(d.Q$),{position:"floating"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Mot de passe ")])),_:1}),(0,s.Wm)((0,n.SU)(d.pK),{type:"password",required:"",value:a.value,onIonInput:i[4]||(i[4]=e=>a.value=e.target.value)},null,8,["value"])])),_:1})]),B,r.value?((0,s.wg)(),(0,s.iD)("div",Q,[(0,s.Wm)((0,n.SU)(d.PQ),{color:"secondary",name:"dots"})])):((0,s.wg)(),(0,s.iD)("div",$,[(0,s.Wm)((0,n.SU)(d.YG),{type:"submit",color:"secondary",expand:"full"},{default:(0,s.w5)((()=>[(0,s.Uk)("Connexion")])),_:1})])),(0,s._)("div",K,[(0,s.Uk)(" Pas de compte vendeur? "),(0,s._)("a",{onClick:i[5]||(i[5]=e=>(0,n.SU)(o).push("/seller/register")),style:{color:"green"}},"Créez un ici")])])],32)])])),_:1})])),_:1})}}});var T=a(3744);const z=(0,T.Z)(P,[["__scopeId","data-v-eb323ab8"]]),G=z}}]);
//# sourceMappingURL=190.ddd5e25b.js.map