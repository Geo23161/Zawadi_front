"use strict";(self["webpackChunkZawadi"]=self["webpackChunkZawadi"]||[]).push([[598],{6699:(e,t,a)=>{var s=a(2109),i=a(1318).includes,l=a(7293),n=a(1223),r=l((function(){return!Array(1).includes()}));s({target:"Array",proto:!0,forced:r},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),n("includes")},5402:(e,t,a)=>{a.d(t,{BO:()=>n,Lr:()=>o,QP:()=>r,UT:()=>d,bw:()=>f,ob:()=>u,uZ:()=>c});a(8862),a(7658);var s=a(3978),i=a(3274),l=a(8433);const n=async()=>{const e=new s.K({name:"seller_info"});e.create();const t=await e.get("stoken");if(!t)return!1;{const s=JSON.parse(t);try{const e=await(0,l.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${s.access}`}});if(e.data["done"])return!0}catch(a){if(401==a.response.status){const t=new FormData;t.append("refresh",s.refresh);try{const a=await(0,l.Z)({url:"api/token/refresh/",method:"POST",data:t});return s.access=a.data["access"],e.set("stoken",JSON.stringify(s)),!0}catch(a){if(401==a.response.status)return!1}}}}},r=async e=>{const t=await i.G0.create({message:e});return t.present(),t},o=async(e,t)=>{const a=await i.Cl.create({header:e,message:t,buttons:["OK"]});await a.present()},c=async(e,t,a,s)=>{const l=await i.Cl.create({header:e,message:t,buttons:[{text:"Fermer",role:"cancel"},{text:a,role:"confirm",handler:()=>{s()}}]});await l.present()},u=async(e,t,a="primary")=>{const s=await i.Mn.create({mode:"ios",message:t,position:e,duration:3900,color:a});await s.present()},d=async(e,t,a)=>{const i=new s.K({name:"seller_info"});i.create();const n=await i.get("stoken");if(!n)return a&&a.dismiss(),t.push(`/seller?redirect=${e}`);{const a=JSON.parse(n);try{await(0,l.Z)({url:"v2/ping",method:"GET",headers:{Authorization:`Bearer ${a.access}`}});return a.access}catch(r){if(401==r.response.status){const s=new FormData;s.append("refresh",a.refresh);try{const e=await(0,l.Z)({url:"api/token/refresh/",method:"POST",data:s});return a.access=e.data["access"],i.set("stoken",JSON.stringify(a)),e.data["access"]}catch(r){if(401==r.response.status)return t.push(`/seller?redirect=${e}`)}}}}},f=e=>{window.location.href="tel:"+e}},5084:(e,t,a)=>{a.r(t),a.d(t,{default:()=>$});a(6699),a(7658),a(3948),a(8862);var s=a(6252),i=a(2262),l=a(3577);const n=a.p+"img/sold.3977acf6.svg";var r=a(3274),o=a(8903),c=a(5402),u=a(8433),d=a(2201);const f=e=>((0,s.dD)("data-v-17e7ec5a"),e=e(),(0,s.Cn)(),e),g=["innerHTML"],w=["src"],p={key:0},m=f((()=>(0,s._)("div",{class:"top_a"},[(0,s._)("img",{src:n})],-1))),v=f((()=>(0,s._)("div",{style:{padding:"1rem"}},"Aucun produit vendu pour le moment!",-1))),_=[m,v],h={key:1,class:"ion-padding"},y=["onClick"],k={key:0,id:"acti",style:{display:"flex","justify-content":"space-around","padding-top":"99px"}},S={key:1,class:"img_cont"},U={style:{width:"100%"}},W={class:"imgs"},b=["onClick"],C={key:0,id:"acti",style:{display:"flex","justify-content":"space-around","padding-top":"99px"}},z={class:"corp"},D={class:"name_p"},x={class:"text_p"},T=f((()=>(0,s._)("div",{style:{"min-height":"95vh"}},null,-1))),Z=(0,s.aZ)({__name:"SoldProduct",setup(e){const t=(0,i.iH)([]),a=(0,i.iH)(""),n=(0,i.iH)(""),f=(0,i.iH)(!1),m=(0,d.tv)(),v=(0,i.iH)([]),Z=()=>{t.value=[]},j=async()=>{const e=await(0,c.QP)("Loading..."),t=await(0,u.Z)({url:"v2/api/sold_prods/",headers:{Authorization:`Bearer ${await(0,c.UT)("/seller/sold/",m,e)}`}});t.data["done"]&&(e.dismiss(),f.value=!0,a.value=t.data["name"],v.value=t.data["result"],n.value=t.data["picture"])},O=e=>{t.value.includes(e)?t.value=t.value.filter((t=>t!=e)):t.value.push(e)},$=e=>{let a=!1;for(const s of e.files)if(a=t.value.includes(s.get_file),a)break;return a},H=e=>{const a=[];for(const t of e.files)a.push(t.get_file);if($(e))t.value=t.value.filter((e=>!a.includes(e)));else for(const s of e.files)t.value.includes(s.get_file)||t.value.push(s.get_file)},P=()=>{const e=[];for(const a of v.value){$(a)&&e.push(`prod:${a.id}`);for(const s of a.files)t.value.includes(s.get_file)&&e.push(`file:${s.id}`)}return e},A=async()=>{const e=await(0,c.QP)("Loading..."),a=await(0,u.Z)({url:"v2/api/delete_th/",method:"POST",data:{lis:JSON.stringify(P())},headers:{Authorization:`Bearer ${await(0,c.UT)("/seller/sold/",m,e)}`}});a.data["done"]&&(e.dismiss(),j(),t.value=[])};return(0,r.Yr)((async()=>{await j()})),(e,c)=>{const u=(0,s.up)("ion-button"),d=(0,s.up)("ion-label"),m=(0,s.up)("ion-item");return(0,s.wg)(),(0,s.j4)((0,i.SU)(r._i),null,{default:(0,s.w5)((()=>[t.value.length?((0,s.wg)(),(0,s.j4)((0,i.SU)(r.Gu),{key:1},{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.sr),null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.Sm),{slot:"start"},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{onClick:c[0]||(c[0]=e=>Z())},{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.gu),{color:"danger",slot:"icon-only",icon:(0,i.SU)(o.XRs)},null,8,["icon"])])),_:1})])),_:1}),(0,s.Wm)((0,i.SU)(r.Sm),{slot:"end"},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{onClick:c[1]||(c[1]=e=>A())},{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.gu),{color:"danger",slot:"icon-only",icon:(0,i.SU)(o._Ij)},null,8,["icon"])])),_:1})])),_:1}),(0,s.Wm)((0,i.SU)(r.wd),null,{default:(0,s.w5)((()=>[(0,s.Uk)((0,l.zw)(t.value.length)+" selectionné",1),(0,s._)("span",{innerHTML:t.value.length>1?"s":""},null,8,g)])),_:1})])),_:1})])),_:1})):((0,s.wg)(),(0,s.j4)((0,i.SU)(r.Gu),{key:0},{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.sr),{color:"secondary"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.Sm),{slot:"start"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.oU),{"default-href":"/seller/home"})])),_:1}),(0,s.Wm)((0,i.SU)(r.wd),null,{default:(0,s.w5)((()=>[(0,s.Uk)("Produits Vendus")])),_:1})])),_:1})])),_:1})),f.value?((0,s.wg)(),(0,s.j4)((0,i.SU)(r.W2),{key:2},{default:(0,s.w5)((()=>[(0,s.Wm)(m,null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.BJ),{slot:"start"},{default:(0,s.w5)((()=>[(0,s._)("img",{src:n.value},null,8,w)])),_:1}),(0,s.Wm)(d,null,{default:(0,s.w5)((()=>[(0,s._)("h3",null,(0,l.zw)(a.value),1),(0,s._)("p",null,(0,l.zw)(v.value.length)+" produits vendus",1)])),_:1})])),_:1}),v.value.length?((0,s.wg)(),(0,s.iD)("div",h,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(v.value,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e.id,class:"card"},[1==e.files.length?((0,s.wg)(),(0,s.iD)("div",{key:0,onClick:t=>O(e.files[0].get_file),style:(0,l.j5)({width:"100%",height:"240px","border-radius":"10px","background-size":"cover","background-position":"top center","background-image":`url('${e.files[0].get_file}')`,"margin-bottom":"0.6rem"})},[(0,s._)("div",{class:(0,l.C_)(["cont_img",{activ:t.value.includes(e.files[0].get_file)}])},[t.value.includes(e.files[0].get_file)?((0,s.wg)(),(0,s.iD)("div",k,[(0,s._)("div",null,[(0,s.Wm)((0,i.SU)(r.gu),{icon:(0,i.SU)(o.nT7),size:"large"},null,8,["icon"])])])):(0,s.kq)("",!0)],2)],12,y)):((0,s.wg)(),(0,s.iD)("div",S,[(0,s._)("div",U,[(0,s._)("div",W,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.files,(e=>((0,s.wg)(),(0,s.iD)("div",{class:"mr-2 first_m f_border",key:e.id,onClick:t=>O(e.get_file),style:(0,l.j5)({width:"100%",height:"210px",width:"230px","min-width":"230px","background-size":"cover","background-position":"top center","background-image":`url('${e.get_file}')`,"margin-bottom":"0.6rem"})},[(0,s._)("div",{class:(0,l.C_)(["cont_img",{activ:t.value.includes(e.get_file)}])},[t.value.includes(e.get_file)?((0,s.wg)(),(0,s.iD)("div",C,[(0,s._)("div",null,[(0,s.Wm)((0,i.SU)(r.gu),{icon:(0,i.SU)(o.nT7),size:"large"},null,8,["icon"])])])):(0,s.kq)("",!0)],2)],12,b)))),128))])])])),(0,s._)("div",z,[(0,s._)("div",D,(0,l.zw)(e.name),1),(0,s._)("div",x,(0,l.zw)(e.details),1)]),(0,s.Wm)(m,{onClick:t=>H(e),mode:"ios"},{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(r.nz),{slot:"start",checked:$(e),color:"secondary"},null,8,["checked"]),(0,s.Wm)(d,null,{default:(0,s.w5)((()=>[(0,s.Uk)("Selectionner ce produit")])),_:1})])),_:2},1032,["onClick"])])))),128))])):((0,s.wg)(),(0,s.iD)("div",p,_))])),_:1})):((0,s.wg)(),(0,s.j4)((0,i.SU)(r.W2),{key:3},{default:(0,s.w5)((()=>[T])),_:1}))])),_:1})}}});var j=a(3744);const O=(0,j.Z)(Z,[["__scopeId","data-v-17e7ec5a"]]),$=O}}]);
//# sourceMappingURL=598-legacy.1847490a.js.map