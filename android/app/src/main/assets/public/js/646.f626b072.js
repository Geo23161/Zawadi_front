"use strict";(self["webpackChunkZawadi"]=self["webpackChunkZawadi"]||[]).push([[646],{8071:(e,t,a)=>{a.d(t,{BO:()=>r,UT:()=>i,ZP:()=>c});a(8862),a(7658);var s=a(3978),n=a(8433);const r=async()=>{const e=new s.K({name:"patner_info"});e.create();const t=await e.get("ptoken");if(!t)return!1;{const s=JSON.parse(t);try{const e=await(0,n.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${s.access}`}});if(e.data["done"])return!0}catch(a){if(401==a.response.status){const t=new FormData;t.append("refresh",s.refresh);try{const a=await(0,n.Z)({url:"api/token/refresh/",method:"POST",data:t});return s.access=a.data["access"],e.set("ptoken",JSON.stringify(s)),!0}catch(a){if(401==a.response.status)return!1}}}}},i=async(e,t,a)=>{const r=new s.K({name:"patner_info"});r.create();const i=await r.get("ptoken");if(!i)return a&&a.dismiss(),t.push(`/seller?redirect=${e}`);{const a=JSON.parse(i);try{await(0,n.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${a.access}`}});return a.access}catch(c){if(401==c.response.status){const s=new FormData;s.append("refresh",a.refresh);try{const e=await(0,n.Z)({url:"api/token/refresh/",method:"POST",data:s});return a.access=e.data["access"],r.set("ptoken",JSON.stringify(a)),e.data["access"]}catch(c){if(401==c.response.status)return t.push(`/seller?redirect=${e}`)}}}}},c=i},5402:(e,t,a)=>{a.d(t,{BO:()=>i,Lr:()=>d,QP:()=>c,UT:()=>u,bw:()=>m,ob:()=>l,uZ:()=>o});a(8862),a(7658);var s=a(3978),n=a(3274),r=a(8433);const i=async()=>{const e=new s.K({name:"seller_info"});e.create();const t=await e.get("stoken");if(!t)return!1;{const s=JSON.parse(t);try{const e=await(0,r.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${s.access}`}});if(e.data["done"])return!0}catch(a){if(401==a.response.status){const t=new FormData;t.append("refresh",s.refresh);try{const a=await(0,r.Z)({url:"api/token/refresh/",method:"POST",data:t});return s.access=a.data["access"],e.set("stoken",JSON.stringify(s)),!0}catch(a){if(401==a.response.status)return!1}}}}},c=async e=>{const t=await n.G0.create({message:e});return t.present(),t},d=async(e,t)=>{const a=await n.Cl.create({header:e,message:t,buttons:["OK"]});await a.present()},o=async(e,t,a,s)=>{const r=await n.Cl.create({header:e,message:t,buttons:[{text:"Fermer",role:"cancel"},{text:a,role:"confirm",handler:()=>{s()}}]});await r.present()},l=async(e,t,a="primary")=>{const s=await n.Mn.create({mode:"ios",message:t,position:e,duration:3900,color:a});await s.present()},u=async(e,t,a)=>{const n=new s.K({name:"seller_info"});n.create();const i=await n.get("stoken");if(!i)return a&&a.dismiss(),t.push(`/seller?redirect=${e}`);{const a=JSON.parse(i);try{await(0,r.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${a.access}`}});return a.access}catch(c){if(401==c.response.status){const s=new FormData;s.append("refresh",a.refresh);try{const e=await(0,r.Z)({url:"api/token/refresh/",method:"POST",data:s});return a.access=e.data["access"],n.set("stoken",JSON.stringify(a)),e.data["access"]}catch(c){if(401==c.response.status)return t.push(`/seller?redirect=${e}`)}}}}},m=e=>{window.location.href="tel:"+e}},3646:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});a(7658);var s=a(6252),n=a(2262),r=a(3577),i=a(9160),c=a(8071),d=a(5402),o=a(3274),l=a(8433),u=a(8903),m=a(2201);const p=e=>((0,s.dD)("data-v-796a1124"),e=e(),(0,s.Cn)(),e),w={style:{}},_={key:0,class:"ion-padding"},h=["onClick"],f={class:"dem_h"},v={class:"stats"},g={class:"stat_title"},y={class:"dem_menu"},k={class:"dem_body"},S={class:"dem_text"},U={class:"dem_foot"},b={class:"unit"},O=p((()=>(0,s._)("div",{class:"sub_unit"},"unités",-1))),W={class:"unit"},Z=p((()=>(0,s._)("div",{class:"sub_unit"},"budget prévu",-1))),z={class:"unit"},D=p((()=>(0,s._)("div",{class:"sub_unit"},"il y a",-1))),E={key:1,class:"ion-padding"},T=p((()=>(0,s._)("div",{style:{display:"flex","justify-content":"space-around","padding-top":"8rem","padding-bottom":"1rem"}},[(0,s._)("img",{src:i})],-1))),C={style:{"text-align":"center"}},F=(0,s.aZ)({__name:"PatnerDem",setup(e){const t=(0,n.iH)([]),a=(0,m.tv)(),i=async()=>{const e=await(0,d.QP)("Loading..."),s=await l.Z.get("v2/api/get_dis?root="+p.value,{headers:{Authorization:`Bearer ${await(0,c.UT)("/patner/dem/",a,e)}`}});s.data["done"]&&(t.value=s.data["result"],e.dismiss())},p=(0,n.iH)("En attente");return(0,s.YP)(p,((e,t)=>{i()})),(0,o.Yr)((async()=>{await i()})),(e,i)=>{const c=(0,s.up)("ion-label"),d=(0,s.up)("ion-icon");return(0,s.wg)(),(0,s.j4)((0,n.SU)(o._i),null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(o.Gu),null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(o.sr),{color:"tertiary"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(o.Sm),{slot:"start"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(o.oU),{"default-href":"/patner/home"})])),_:1}),(0,s.Wm)((0,n.SU)(o.wd),null,{default:(0,s.w5)((()=>[(0,s.Uk)("Demandes recueillie")])),_:1})])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(o.W2),null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(o.cJ),{color:"tertiary",value:p.value},{default:(0,s.w5)((()=>[(0,s.Wm)((0,n.SU)(o.GO),{onClick:i[0]||(i[0]=e=>p.value="En attente"),value:"En attente"},{default:(0,s.w5)((()=>[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s.Uk)("En attente")])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(o.GO),{onClick:i[1]||(i[1]=e=>p.value="En cours"),value:"En cours"},{default:(0,s.w5)((()=>[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s.Uk)("En cours")])),_:1})])),_:1}),(0,s.Wm)((0,n.SU)(o.GO),{onClick:i[2]||(i[2]=e=>p.value="Finalisé"),value:"Finalisé"},{default:(0,s.w5)((()=>[(0,s.Wm)(c,null,{default:(0,s.w5)((()=>[(0,s.Uk)("Finalisé")])),_:1})])),_:1})])),_:1},8,["value"]),(0,s._)("div",w,[t.value.length?((0,s.wg)(),(0,s.iD)("div",_,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.value,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e.id,onClick:t=>(0,n.SU)(a).push("/patner/dem/"+e.id),class:"d_sp dem"},[(0,s._)("div",f,[(0,s._)("div",v,[(0,s._)("div",{style:(0,r.j5)({"background-color":e.demand.get_color}),class:"indic"},null,4),(0,s._)("div",g,(0,r.zw)(e.demand.state),1)]),(0,s._)("div",y,[(0,s.Wm)(d,{icon:(0,n.SU)(u.eFK)},null,8,["icon"])])]),(0,s._)("div",k,[(0,s._)("div",{style:(0,r.j5)({"min-width":"32px","min-height":"32px","border-radius":"5px","background-size":"cover","background-position":"top center","background-image":`url('${e.demand.rep_picture}')`,"margin-right":"1rem"})},null,4),(0,s._)("div",S,(0,r.zw)(e.demand.get_subs),1)]),(0,s._)("div",U,[(0,s._)("div",null,[(0,s._)("div",b,(0,r.zw)(e.demand.num),1),O]),(0,s._)("div",null,[(0,s._)("div",W,(0,r.zw)(e.demand.bdg)+"F",1),Z]),(0,s._)("div",null,[(0,s._)("div",z,(0,r.zw)(e.demand.get_duration),1),D])])],8,h)))),128))])):((0,s.wg)(),(0,s.iD)("div",E,[T,(0,s._)("div",C,"Pas de demandes "+(0,r.zw)(p.value),1)]))])])),_:1})])),_:1})}}});var P=a(3744);const $=(0,P.Z)(F,[["__scopeId","data-v-796a1124"]]),x=$},9160:(e,t,a)=>{e.exports=a.p+"img/empty.041789a5.svg"}}]);
//# sourceMappingURL=646.f626b072.js.map