"use strict";(self["webpackChunkZawadi"]=self["webpackChunkZawadi"]||[]).push([[3],{8071:(e,t,a)=>{a.d(t,{BO:()=>i,UT:()=>l,ZP:()=>o});a(8862),a(7658);var n=a(3978),s=a(8433);const i=async()=>{const e=new n.K({name:"patner_info"});e.create();const t=await e.get("ptoken");if(!t)return!1;{const n=JSON.parse(t);try{const e=await(0,s.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${n.access}`}});if(e.data["done"])return!0}catch(a){if(401==a.response.status){const t=new FormData;t.append("refresh",n.refresh);try{const a=await(0,s.Z)({url:"api/token/refresh/",method:"POST",data:t});return n.access=a.data["access"],e.set("ptoken",JSON.stringify(n)),!0}catch(a){if(401==a.response.status)return!1}}}}},l=async(e,t,a)=>{const i=new n.K({name:"patner_info"});i.create();const l=await i.get("ptoken");if(!l)return a&&a.dismiss(),t.push(`/seller?redirect=${e}`);{const a=JSON.parse(l);try{await(0,s.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${a.access}`}});return a.access}catch(o){if(401==o.response.status){const n=new FormData;n.append("refresh",a.refresh);try{const e=await(0,s.Z)({url:"api/token/refresh/",method:"POST",data:n});return a.access=e.data["access"],i.set("ptoken",JSON.stringify(a)),e.data["access"]}catch(o){if(401==o.response.status)return t.push(`/seller?redirect=${e}`)}}}}},o=l},5402:(e,t,a)=>{a.d(t,{BO:()=>l,Lr:()=>r,QP:()=>o,UT:()=>u,bw:()=>f,ob:()=>d,uZ:()=>c});a(8862),a(7658);var n=a(3978),s=a(3274),i=a(8433);const l=async()=>{const e=new n.K({name:"seller_info"});e.create();const t=await e.get("stoken");if(!t)return!1;{const n=JSON.parse(t);try{const e=await(0,i.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${n.access}`}});if(e.data["done"])return!0}catch(a){if(401==a.response.status){const t=new FormData;t.append("refresh",n.refresh);try{const a=await(0,i.Z)({url:"api/token/refresh/",method:"POST",data:t});return n.access=a.data["access"],e.set("stoken",JSON.stringify(n)),!0}catch(a){if(401==a.response.status)return!1}}}}},o=async e=>{const t=await s.G0.create({message:e});return t.present(),t},r=async(e,t)=>{const a=await s.Cl.create({header:e,message:t,buttons:["OK"]});await a.present()},c=async(e,t,a,n)=>{const i=await s.Cl.create({header:e,message:t,buttons:[{text:"Fermer",role:"cancel"},{text:a,role:"confirm",handler:()=>{n()}}]});await i.present()},d=async(e,t,a="primary")=>{const n=await s.Mn.create({mode:"ios",message:t,position:e,duration:3900,color:a});await n.present()},u=async(e,t,a)=>{const s=new n.K({name:"seller_info"});s.create();const l=await s.get("stoken");if(!l)return a&&a.dismiss(),t.push(`/seller?redirect=${e}`);{const a=JSON.parse(l);try{await(0,i.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${a.access}`}});return a.access}catch(o){if(401==o.response.status){const n=new FormData;n.append("refresh",a.refresh);try{const e=await(0,i.Z)({url:"api/token/refresh/",method:"POST",data:n});return a.access=e.data["access"],s.set("stoken",JSON.stringify(a)),e.data["access"]}catch(o){if(401==o.response.status)return t.push(`/seller?redirect=${e}`)}}}}},f=e=>{window.location.href="tel:"+e}},2003:(e,t,a)=>{a.r(t),a.d(t,{default:()=>K});a(8862),a(3948),a(7658),a(6699),a(285),a(1637);var n=a(6252),s=a(2262),i=a(3577),l=a(7532),o=a(3274),r=a(8903),c=a(8071),d=a(5402),u=a(8433),f=a(2201);const p=e=>((0,n.dD)("data-v-8a8bd210"),e=e(),(0,n.Cn)(),e),m=["innerHTML"],g=["src"],w=p((()=>(0,n._)("h2",null,"Option de livraison",-1))),_={key:0,class:""},h={key:0,style:{"padding-left":"1.5rem","padding-right":"1.5rem","padding-bottom":"1rem"},slot:"content"},v=["onClick"],k={key:0,id:"acti",style:{display:"flex","justify-content":"space-around","padding-top":"99px"}},y={key:1,class:"img_cont"},S={style:{width:"100%"}},U={class:"imgs"},W=["onClick"],b={key:0,id:"acti",style:{display:"flex","justify-content":"space-around","padding-top":"99px"}},x={class:"corp"},C={class:"name_p"},z={key:0},D={key:0,class:"text_p"},O=["onClick"],T={key:1,class:"text_p"},Z={key:1,style:{"padding-left":"1.5rem","padding-right":"1.5rem","padding-bottom":"5rem","padding-top":"5rem",display:"flex","justify-content":"space-around"},slot:"content"},$=p((()=>(0,n._)("div",{class:"top_a"},[(0,n._)("img",{src:l})],-1))),j={style:{padding:"1rem","text-align":"center"}},N=(0,n.aZ)({__name:"CatPage",setup(e){const t=e=>JSON.stringify(e),a=()=>{p.value=[]},l=e=>{window.location.href=e},p=(0,s.iH)([]),N=(0,s.iH)([]),H=(0,s.iH)(""),J=(0,f.yj)(),K=(0,f.tv)(),A=J.params.id,B=async()=>{const e=await(0,d.QP)("Patienter..."),t=await u.Z.get("v2/api/get_subpatner/"+A+"/",{headers:{Authorization:`Bearer ${await(0,c.UT)(`/patner/cat/${A}`,K,e)}`}});t.data["done"]&&(H.value=t.data["result"]["name"],N.value=t.data["result"]["sps"],e.dismiss())},P=(e,t)=>e[0].id==t.id,E=async(e,t,a)=>{const n=await u.Z.post("v2/api/pprods_mm/"+a+"/",{min:e,max:t},{headers:{Authorization:`Bearer ${await(0,c.UT)("/patner/cat/"+A+"/",K,void 0)}`}});if(n.data["done"])for(const s of N.value)for(const a of s.get_min_max)a.min==e&&a.max==t&&(a.prods=n.data["result"])},F=e=>{const t=[];for(const a of e.files)t.push(a.get_file);if(G(e))p.value=p.value.filter((e=>!t.includes(e)));else for(const a of e.files)p.value.includes(a.get_file)||p.value.push(a.get_file)},G=e=>{let t=!1;for(const a of e.files)if(t=p.value.includes(a.get_file),t)break;return t},L=e=>{var t;const a=document.createElement("a");a.href=e,a.target="_blank","download"in a&&a.setAttribute("download",Y(e)),(document.body||document.documentElement).appendChild(a),a.click&&a.click(),null===(t=a.parentNode)||void 0===t||t.removeChild(a)},q=e=>{fetch(e).then((e=>e.blob())).then((e=>{const t=URL.createObjectURL(e);setTimeout((function(){L(t)}),400)}))},R=e=>{for(const t of e)q(t)},Y=e=>{for(const t of N.value)for(const a of t.get_min_max)for(const n of a.prods)for(const a of n.files)if(a.get_file==e)return`${t.get_subs}_image_${a.id}`;return H.value};(0,o.KA)((async()=>{await B()}));const M=(0,s.iH)(0),V=e=>e.length<250,Q=e=>V(e)?e:e.slice(0,248)+"...",I=e=>{p.value.includes(e)?p.value=p.value.filter((t=>t!=e)):p.value.push(e)};return(e,c)=>{const d=(0,n.up)("ion-button"),u=(0,n.up)("ion-label"),f=(0,n.up)("ion-item"),J=(0,n.up)("ion-spinner");return(0,n.wg)(),(0,n.j4)((0,s.SU)(o._i),null,{default:(0,n.w5)((()=>[p.value.length?((0,n.wg)(),(0,n.j4)((0,s.SU)(o.Gu),{key:1},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.sr),null,{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.Sm),{slot:"end"},{default:(0,n.w5)((()=>[(0,n.Wm)(d,{onClick:c[0]||(c[0]=e=>R(p.value))},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.gu),{color:"tertiary",slot:"icon-only",icon:(0,s.SU)(r.LRf)},null,8,["icon"])])),_:1})])),_:1}),(0,n.Wm)((0,s.SU)(o.Sm),{slot:"start"},{default:(0,n.w5)((()=>[(0,n.Wm)(d,{onClick:c[1]||(c[1]=e=>a())},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.gu),{color:"danger",slot:"icon-only",icon:(0,s.SU)(r.XRs)},null,8,["icon"])])),_:1})])),_:1}),(0,n.Wm)((0,s.SU)(o.wd),null,{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(p.value.length)+" selectionné",1),(0,n._)("span",{innerHTML:p.value.length>1?"s":""},null,8,m)])),_:1})])),_:1})])),_:1})):((0,n.wg)(),(0,n.j4)((0,s.SU)(o.Gu),{key:0},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.sr),{color:"tertiary"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.Sm),{slot:"start"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.oU),{"default-href":"/patner/home/"})])),_:1}),(0,n.Wm)((0,s.SU)(o.wd),null,{default:(0,n.w5)((()=>[(0,n.Uk)((0,i.zw)(H.value),1)])),_:1})])),_:1})])),_:1})),N.value.length?((0,n.wg)(),(0,n.j4)((0,s.SU)(o.W2),{key:2},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(N.value,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n.Wm)(f,null,{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.BJ),{slot:"start"},{default:(0,n.w5)((()=>[(0,n._)("img",{src:e.get_spicture},null,8,g)])),_:2},1024),(0,n.Wm)(u,null,{default:(0,n.w5)((()=>[(0,n._)("h3",null,(0,i.zw)(e.get_sname),1),(0,n._)("p",null,(0,i.zw)(e.p_count)+" produits",1)])),_:2},1024),(0,n.Wm)((0,s.SU)(o.Sm),{slot:"end"},{default:(0,n.w5)((()=>[(0,n.Wm)(d,{onClick:t=>l(`whatsapp://send/?phone=${e.get_swhatsapp}`)},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.gu),{color:"secondary",slot:"icon-only",icon:(0,s.SU)(r.tl2)},null,8,["icon"])])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024),(0,n.Wm)(f,null,{default:(0,n.w5)((()=>[(0,n.Wm)(u,null,{default:(0,n.w5)((()=>[w,(0,n._)("p",null,(0,i.zw)(e.livraison),1)])),_:2},1024),(0,n.Wm)((0,s.SU)(o.gu),{icon:(0,s.SU)(r.xhW),slot:"end"},null,8,["icon"])])),_:2},1024),e.get_min_max.length?((0,n.wg)(),(0,n.iD)("div",_,[(0,n.Wm)((0,s.SU)(o.eh),{multiple:!0},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.get_min_max,(a=>((0,n.wg)(),(0,n.j4)((0,s.SU)(o.We),{key:a.id,value:t(a),"toggle-icon":(0,s.SU)(r.h6e),"toggle-icon-slot":"start"},{default:(0,n.w5)((()=>[(0,n.Wm)(f,{onClick:t=>a.prods.length?0:E(a.min,a.max,e.id),slot:"header",color:"light"},{default:(0,n.w5)((()=>[(0,n.Wm)(u,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Entre "+(0,i.zw)(a.min)+" et "+(0,i.zw)(a.max)+" FCFA",1)])),_:2},1024)])),_:2},1032,["onClick"]),a.prods.length?((0,n.wg)(),(0,n.iD)("div",h,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.prods,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id,class:"card"},[1==e.files.length?((0,n.wg)(),(0,n.iD)("div",{key:0,onClick:t=>I(e.files[0].get_file),style:(0,i.j5)({width:"100%",height:"240px","border-radius":"10px","background-size":"cover","background-position":"top center","background-image":`url('${e.files[0].get_file}')`,"margin-bottom":"0.6rem"})},[(0,n._)("div",{class:(0,i.C_)(["cont_img",{activ:p.value.includes(e.files[0].get_file)}])},[p.value.includes(e.files[0].get_file)?((0,n.wg)(),(0,n.iD)("div",k,[(0,n._)("div",null,[(0,n.Wm)((0,s.SU)(o.gu),{icon:(0,s.SU)(r.nT7),size:"large"},null,8,["icon"])])])):(0,n.kq)("",!0)],2)],12,v)):((0,n.wg)(),(0,n.iD)("div",y,[(0,n._)("div",S,[(0,n._)("div",U,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.files,(t=>((0,n.wg)(),(0,n.iD)("div",{id:"prod:25",class:(0,i.C_)(["mr-2",{"first_m f_border":P(e.files,t)}]),key:t.id,onClick:e=>I(t.get_file),style:(0,i.j5)({width:"100%",height:"210px",width:"230px","min-width":"230px","background-size":"cover","background-position":"top center","background-image":`url('${t.get_file}')`,"margin-bottom":"0.6rem"})},[(0,n._)("div",{class:(0,i.C_)(["cont_img",{activ:p.value.includes(t.get_file)}])},[p.value.includes(t.get_file)?((0,n.wg)(),(0,n.iD)("div",b,[(0,n._)("div",null,[(0,n.Wm)((0,s.SU)(o.gu),{icon:(0,s.SU)(r.nT7),size:"large"},null,8,["icon"])])])):(0,n.kq)("",!0)],2)],14,W)))),128))])])])),(0,n._)("div",x,[(0,n._)("div",C,(0,i.zw)(e.name),1),e.details?((0,n.wg)(),(0,n.iD)("div",z,[M.value!=e.id?((0,n.wg)(),(0,n.iD)("div",D,[(0,n.Uk)((0,i.zw)(Q(e.details)),1),V(e.details)?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("a",{key:0,style:{color:"blue","text-decoration":"underline"},onClick:t=>M.value=e.id},"Voir plus",8,O))])):((0,n.wg)(),(0,n.iD)("div",T,[(0,n.Uk)((0,i.zw)(e.details),1),(0,n._)("a",{style:{color:"blue","text-decoration":"underline"},onClick:c[2]||(c[2]=e=>M.value=0)},"Voir moins")]))])):(0,n.kq)("",!0)]),(0,n.Wm)(f,{onClick:t=>F(e),mode:"ios"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,s.SU)(o.nz),{slot:"start",checked:G(e),color:"tertiary"},null,8,["checked"]),(0,n.Wm)(u,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Selectionner ce produit")])),_:1})])),_:2},1032,["onClick"])])))),128))])):((0,n.wg)(),(0,n.iD)("div",Z,[(0,n._)("div",null,[(0,n.Wm)(J,{color:"tertiary",name:"crescent"})])]))])),_:2},1032,["value","toggle-icon"])))),128))])),_:2},1024)])):(0,n.kq)("",!0)])))),128))])),_:1})):((0,n.wg)(),(0,n.j4)((0,s.SU)(o.W2),{key:3},{default:(0,n.w5)((()=>[(0,n._)("div",null,[$,(0,n._)("div",j,[(0,n.Uk)(" Nous n'avons trouvé aucun produit de type "),(0,n._)("strong",null,(0,i.zw)(H.value),1),(0,n.Uk)(" dans votre zone pour le moment. Veuillez réessayer ultérieurement ")])])])),_:1}))])),_:1})}}});var H=a(3744);const J=(0,H.Z)(N,[["__scopeId","data-v-8a8bd210"]]),K=J},7532:(e,t,a)=>{e.exports=a.p+"img/empty_p.50756239.svg"}}]);
//# sourceMappingURL=3-legacy.3493c6ae.js.map