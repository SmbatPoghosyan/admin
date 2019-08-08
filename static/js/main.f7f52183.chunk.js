(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,a,t){},115:function(e,a,t){},116:function(e,a,t){},134:function(e,a,t){},135:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),l=t(8),r=t.n(l),s=t(22),i=t(17),o=(t(89),t(90),t(7)),m=t(13),u=t.n(m);function d(e){u.a.get("/branches/",{}).then(function(a){e(a.data)}).catch(function(e){alert(e.message)})}t(66);var h=t(170),p=t(172),f=t(171),b=t(174),E=t(165),g=t(168),v=t(34),y=t.n(v),O=t(169),N=t(167),j=(t(108),Object(E.a)(function(e){return{margin:{margin:e.spacing(0)},extendedIcon:{marginRight:e.spacing(0)}}})),C=Object(i.f)(function(e){var a=e.branch,t=e.setBranches,l=j(),r=Object(n.useState)(a.name),s=Object(o.a)(r,2),i=s[0],m=s[1],p=Object(n.useState)(!1),E=Object(o.a)(p,2),v=E[0],C=E[1],k=Object(n.useState)(a.screens),S=Object(o.a)(k,2),D=S[0],w=S[1];Object(n.useEffect)(function(){m(e.branch.name),w(e.branch.screens)},[e]);return c.a.createElement("div",{className:"branchContainer ".concat(v?"editModeCont":""),style:{border:"1px solid ".concat(v?"#236498":"#969494")}},c.a.createElement("div",{className:"nameidcont"},c.a.createElement("div",{className:"branchName"},c.a.createElement(N.a,{className:"".concat(v?"editMode":""),disabled:!v,value:i,title:i,onChange:function(e){m(e.target.value)}}),c.a.createElement("p",{className:"brancheId",title:"id: ".concat(a._id)},a._id)),c.a.createElement("div",{className:"iconsContainer"},c.a.createElement(g.a,{onClick:function(){C(!0)},"aria-label":"Edit",title:"Edit"},c.a.createElement(O.a,{fontSize:"small"},"edit_icon"))),c.a.createElement("div",{className:"iconsContainer"},c.a.createElement(g.a,{"aria-label":"Delete",onClick:function(){window.confirm("Are you sure ?")&&function(e,a){u.a.delete("/branches/"+e).then(function(e){d(a),alert(e.data.message)}).catch(function(e){alert(e.message)})}(a._id,t)},className:l.margin,title:"Delete"},c.a.createElement(y.a,{fontSize:"small"})))),c.a.createElement("div",{className:"branchFooter"},v?c.a.createElement("span",{className:"branchButtons"},c.a.createElement(h.a,{variant:"contained",size:"small",onClick:function(){!function(e,a,t,n){u.a.put("/branches/"+e,{name:a,screens:t}).then(function(e){d(n),alert(e.data.message)}).catch(function(e){console.log(e),alert(e.message)})}(a._id,i,D,t),C(!1)}}," ","Save"," "),c.a.createElement(h.a,{variant:"contained",size:"small",onClick:function(){C(!1)}}," ","Cancel"," ")):c.a.createElement(h.a,{size:"small",variant:"contained",onClick:function(t){e.history.push("/branches/".concat(a._id))}},"Open"),c.a.createElement(f.a,{className:"brancheScreen ".concat(v?"editMode":""),select:!0,disabled:!v,title:"Screen",value:D,onChange:function(e){w(e.target.value)}},[1,2,3].map(function(e){return c.a.createElement(b.a,{key:e,dense:!1,value:e},e)}))))});function k(){return{top:"".concat(50,"%"),left:"".concat(50,"%"),transform:"translate(-".concat(50,"%, -").concat(50,"%)")}}var S=Object(E.a)(function(e){return{paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,4),outline:"none"}}}),D=Object(i.f)(function(e){var a=Object(n.useState)([]),t=Object(o.a)(a,2),l=t[0],r=t[1],i=S(),m=c.a.useState(k),E=Object(o.a)(m,1)[0],g=c.a.useState(!1),v=Object(o.a)(g,2),y=v[0],O=v[1],N=c.a.useState("name"),j=Object(o.a)(N,2),D=j[0],w=j[1],x=c.a.useState(1),F=Object(o.a)(x,2),B=F[0],T=F[1];Object(n.useEffect)(function(){d(r)},[]);var I=function(){O(!1)};return c.a.createElement(c.a.Fragment,null,c.a.createElement(p.a,{"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",open:y,onClose:I},c.a.createElement("div",{style:E,className:i.paper},c.a.createElement("h1",{id:"modal-title"}," Create branch "),c.a.createElement(f.a,{id:"branch-name",label:"Name",value:D,placeholder:"Branch Name",onChange:function(e){w(e.target.value)},margin:"normal",className:"mg-16",helperText:'The "Name" field is required*',error:0===D.length}),c.a.createElement(f.a,{id:"select-screens",select:!0,label:"Select",value:B,onChange:function(e){T(e.target.value)},helperText:"Please select screens count",margin:"normal",className:"mg-16"},[1,2,3].map(function(e){return c.a.createElement(b.a,{key:e,value:e},e)})),c.a.createElement(h.a,{variant:"contained",onClick:function(){D?(w("name"),T(1),function(e,a,t,n){u.a.post("/branches/",{name:e,screens:a}).then(function(e){d(t),n(),alert(e.data.message)}).catch(function(e){alert(e.message)})}(D,B,r,I),O(!1)):alert('The "Name" field is empty ,please type branch name !!!')}},"Create"))),c.a.createElement(c.a.Fragment,null,c.a.createElement(h.a,{variant:"contained",onClick:function(){O(!0)}},"Create"),c.a.createElement("div",{className:"allListLinkContainer"},c.a.createElement("p",{className:"head"},"Branches"),c.a.createElement("ul",{className:"list"},l&&l.map(function(e,a){return c.a.createElement("li",{key:a},c.a.createElement("p",null,c.a.createElement(s.b,{to:"/branches/".concat(e._id)},e.name),c.a.createElement("span",null,a+1)),c.a.createElement("hr",null))})))),l&&l.length>0&&c.a.createElement("div",{className:"allBranchesContainer"},l.map(function(e,a){return c.a.createElement(C,{branch:e,setBranches:r,key:a})})))}),w=(t(115),function(e){return c.a.createElement("div",null,c.a.createElement("span",null,"Playlist "))}),x=(t(116),t(47)),F=t(31),B=t(52);function T(e,a){u.a.get("/playlists/"+e,{}).then(function(e){a(e.data)}).catch(function(e){alert(e.message)})}var I,L=t(78),_=t.n(L),P=(t(134),u.a.CancelToken);var H=function(e){var a=e.branchId,t=(e.playlists,e.setPlaylists),l=e.branchScreens,r=e.disabledDates,i=Object(n.useState)(""),m=Object(o.a)(i,2),d=m[0],p=m[1],f=Object(n.useState)(),b=Object(o.a)(f,2),E=b[0],v=b[1],O=Object(n.useState)(),j=Object(o.a)(O,2),C=j[0],k=j[1],S=Object(n.useState)(null),D=Object(o.a)(S,2),w=D[0],L=D[1],H=Object(n.useState)(!0),W=Object(o.a)(H,2),z=W[0],M=W[1],R=Object(n.useState)(!1),A=Object(o.a)(R,2),J=A[0],U=A[1],q=Object(n.useState)(null),G=Object(o.a)(q,2),Y=G[0],K=G[1],Q=Object(n.useState)(1),V=Object(o.a)(Q,2),X=V[0],Z=V[1],$=Object(n.useState)(),ee=Object(o.a)($,2),ae=ee[0],te=ee[1],ne=Object(n.useState)(""),ce=Object(o.a)(ne,2),le=ce[0],re=ce[1],se=Object(n.useState)(""),ie=Object(o.a)(se,2),oe=ie[0],me=ie[1],ue=Object(n.useState)(""),de=Object(o.a)(ue,2),he=de[0],pe=de[1],fe=Object(n.useState)(""),be=Object(o.a)(fe,2),Ee=be[0],ge=be[1],ve=Object(n.useState)(0),ye=Object(o.a)(ve,2),Oe=ye[0],Ne=ye[1],je=Object(n.useState)(1),Ce=Object(o.a)(je,2),ke=Ce[0],Se=Ce[1],De=Object(n.useState)([]),we=Object(o.a)(De,2),xe=we[0],Fe=we[1],Be=Object(n.useState)(!0),Te=Object(o.a)(Be,2),Ie=Te[0],Le=Te[1],_e=Object(n.useState)({checked1:!1,checked2:!1,checked3:!1}),Pe=Object(o.a)(_e,2),He=Pe[0],We=Pe[1];Object(n.useEffect)(function(){Ne((Ee||0)+60*(he||0)+60*(oe||0)*60+24*(le||0)*60*60)},[le,oe,he,Ee]),Object(n.useEffect)(function(){xe.length&&d&&E&&C&&!Ie?M(!1):M(!0)},[xe,d,E,C,Ie]),Object(n.useEffect)(function(){U(!!(Oe&&ke&&X&&w&&Y))},[Y,Oe,ke,X,w]);var ze=function(){document.getElementById("form").reset(),I(),te(""),L(null),K(null)},Me="".concat(le||0===le?le<10?"0"+le:le:" --",":d"),Re="".concat(oe||0===oe?oe<10?"0"+oe:oe:" --",":h"),Ae="".concat(he||0===he?he<10?"0"+he:he:" --",":m"),Je="".concat(Ee||0===Ee?Ee<10?"0"+Ee:Ee:" --",":s");return a?c.a.createElement("div",{className:"createPlaylist"},c.a.createElement("div",{className:"head"},c.a.createElement("span",null,"Create Playlist "),c.a.createElement(s.b,{to:"/branches/".concat(a,"/")},c.a.createElement("i",{className:"close"}))),c.a.createElement("div",{className:"createPlaylistBody"},c.a.createElement("div",{className:"playlistTabsContainer"},c.a.createElement("div",null,c.a.createElement("div",{className:"playlistCreateItemCont spaceBetWeen"},c.a.createElement("span",{className:"playlistTabHead"},"Name"),c.a.createElement(N.a,{className:"backgroundFFF marginRight5",value:d,title:d,onChange:function(e){p(e.target.value)},placeholder:"Name"})),c.a.createElement("div",{className:"playlistCreateItemCont spaceBetWeen"},c.a.createElement("span",{className:"playlistTabHead"},"Date Range"),c.a.createElement(_.a,{inputProps:{className:"margin05",placeholder:"pick date and time"},timeFormat:!0,startDate:E?new Date(E):"",endDate:C?new Date(C):"",onChange:function(e){var a=new Date(e.start).valueOf(),t=new Date(e.end).valueOf(),n=-1/0,c=1/0,l=!0,s=!1,i=void 0;try{for(var o,m=r[Symbol.iterator]();!(l=(o=m.next()).done);l=!0){var u=o.value,d=new Date(u.startDate).valueOf(),h=new Date(u.endDate).valueOf();if(a<d||a>h)n===-1/0&&(n=a>h?h:n),c===1/0&&(c=a<d?d:c);else if(a>=d&&a<=h)return Le(!0),void alert("This date is in used!!! ".concat(new Date(u.startDate).toLocaleString()," - ").concat(new Date(u.endDate).toLocaleString()," try another date."))}}catch(p){s=!0,i=p}finally{try{l||null==m.return||m.return()}finally{if(s)throw i}}if(a&&a>n&&a<c)return t&&t>n&&t<c&&(Le(!1),k(t)),void v(a);Le(!0),alert("This date is in used!!! try less than ".concat(new Date(c).toLocaleString()," ."))},className:"marginRight5 centerByFlex"}))),c.a.createElement("div",{className:"spaceBetWeen",style:{height:"100%",alignItems:"flex-start"}},c.a.createElement("div",{className:"createFileCont"},"Create File",c.a.createElement("div",{className:"playlistCreateItemCont spaceBetWeen"},c.a.createElement("span",{className:"playlistTabHead"},"Show Time"),c.a.createElement("div",{className:"showTimeCont"},c.a.createElement("input",{placeholder:"day",type:"number",title:"day",min:"0",max:"365",onChange:function(e){var a=e.target.value?parseInt(e.target.value):"";a<=365&&a>=0&&re(a)},value:le}),c.a.createElement("input",{placeholder:"hour",type:"number",title:"hour",min:"0",max:"23",onChange:function(e){var a=e.target.value?parseInt(e.target.value):"";a<=23&&a>=0&&me(a)},value:oe}),c.a.createElement("input",{placeholder:"minute",type:"number",title:"minute",min:"0",max:"59",onChange:function(e){var a=e.target.value?parseInt(e.target.value):"";a<=59&&a>=0&&pe(a)},value:he}),c.a.createElement("input",{placeholder:"second",type:"number",title:"second",min:"0",max:"59",onChange:function(e){var a=e.target.value?parseInt(e.target.value):"";a<=59&&a>=0&&ge(a)},value:Ee}),c.a.createElement("div",{style:{color:"#fff"}},"".concat(Me," ").concat(Re," ").concat(Ae," ").concat(Je," ")))),c.a.createElement("div",{className:"playlistCreateItemCont spaceBetWeen"},c.a.createElement("span",{className:"playlistTabHead"},"Order"),c.a.createElement("input",{placeholder:"order",type:"number",title:"order",min:"0",value:ke,onChange:function(e){return Se(e.target.value)}})),c.a.createElement("div",{className:"playlistCreateItemCont spaceBetWeen"},c.a.createElement("span",{className:"playlistTabHead"},"Screen"),c.a.createElement("div",{className:"backgroundFFF",style:{padding:"0.5rem"}},[1,2,3].map(function(e){return e<=l?c.a.createElement("span",{key:e},c.a.createElement("label",null,e),c.a.createElement("input",{className:"margin05 padding05",type:"checkbox",checked:1===e?He.checked1:2===e?He.checked2:He.checked3,onChange:(a="checked".concat(e),function(e){He.checked1&&!He.checked2&&"checked3"===a||He.checked3&&!He.checked2&&"checked1"===a||(He.checked1&&He.checked2&&He.checked3&&"checked2"===a?We({checked1:!1,checked2:!1,checked3:!1}):We(Object(F.a)({},He,Object(x.a)({},a,e.target.checked))))})})):null;var a}))),c.a.createElement("form",{id:"form",onSubmit:function(e){e.preventDefault();var a=new FormData;a.append("file",w),function(e,a,t){u.a.post("/upload/",e,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(e){t(parseInt(Math.round(100*e.loaded/e.total)))},cancelToken:new P(function(e){I=e})}).then(function(e){console.log("kayf",e.data),a(Object(F.a)({},e.data,{path:"/files/"+e.data.filename}))}).catch(function(e){u.a.isCancel(e)?(console.log("Request canceled",e.message),alert("Upload canceled"),t("")):alert(e.message)})}(a,K,te)}},c.a.createElement("div",{className:"spaceBetWeen",style:{margin:"0.5rem 0"}},c.a.createElement("input",{type:"file",onChange:function(e){L(e.target.files[0])}}),c.a.createElement("span",null,ae&&c.a.createElement("label",{style:{marginRight:"0.5rem"}},ae,"%"),c.a.createElement("button",{type:"submit",disabled:!w||Y,className:!w||Y?"buttonDisabled":""},"Upload"),c.a.createElement("button",{type:"reset",onClick:ze,disabled:!w||Y,className:!w||Y?"buttonDisabled":""},"Cancel")))),c.a.createElement("button",{onClick:function(e){Y&&Fe([].concat(Object(B.a)(xe),[{showTime:Oe,order:ke,screen:X,name:Y.filename,type:Y.mimetype,url:Y.path}])),setTimeout(function(){Ne(0),Se(1),Z(1),re(""),me(""),pe(""),ge(""),K(null),L(null),ze()},500)},disabled:!J,className:J?"":"buttonDisabled"},"Create File"),Y&&c.a.createElement("div",{className:"fileContainer"},"video"===Y.mimetype.split("/")[0]&&c.a.createElement("video",{src:Y.path,controls:!0,preload:"none"},"Your browser does not support the video tag."),"image"===Y.mimetype.split("/")[0]&&c.a.createElement("img",{src:Y.path}))),c.a.createElement("div",{className:"playlistFilesContainer spaceBetWeen"},c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"allListLinkContainer",style:{margin:"0.5rem",maxHeight:"54vh"}},c.a.createElement("p",{className:"head"},"File List"),c.a.createElement("ul",{className:"list listHeight"},xe.length>0?xe.map(function(e,a){return c.a.createElement("li",{className:"playlistLink",key:a},c.a.createElement("div",null,c.a.createElement("div",null,a+1,". ",e.name),c.a.createElement("div",{className:"spaceBetWeen"},c.a.createElement("div",null,c.a.createElement("span",{className:"fileLi"},"Screen: ",c.a.createElement("strong",{className:"bold"},e.screen),". "),c.a.createElement("span",{className:"fileLi"},"Order: ",c.a.createElement("strong",{className:"bold"},e.order),". "),c.a.createElement("span",{className:"fileLi"},"Time: ",function(e){var a=parseInt(e,10),t=Math.floor(a/86400);a-=3600*t*24;var n=Math.floor(a/3600);a-=3600*n;var c=Math.floor(a/60);return t+"d:"+n+"h:"+c+"m:"+(a-=60*c)+"s"}(e.showTime),". ")),c.a.createElement("span",null,c.a.createElement(g.a,{"aria-label":"Delete",onClick:function(){return a=e.name,void Fe(xe.filter(function(e){return e.name!==a}));var a},title:"Delete",style:{padding:"3px"}},c.a.createElement(y.a,{fontSize:"small"}))))),c.a.createElement("hr",null))}):null))))))),c.a.createElement(h.a,{variant:"contained",onClick:function(){var e={name:d,endDate:C,startDate:E,currency:!1,ticker:!1,files:JSON.stringify(Object(B.a)(xe))};!function(e,a,t){u.a.post("/playlists/"+e,Object(F.a)({},a)).then(function(a){T(e,t)}).catch(function(e){alert(e.message)})}(a,e,t),p(""),v(new Date),k(new Date),Fe([])},className:"createButton ".concat(z?"buttonDisabled":""),disabled:z},"Create")):c.a.createElement("h1",{className:"centerByFlex"},"Loading...")},W=Object(i.f)(function(e){var a=Object(n.useState)({}),t=Object(o.a)(a,2),l=t[0],r=t[1],m=Object(n.useState)([]),d=Object(o.a)(m,2),p=d[0],f=d[1],b=Object(n.useState)([]),E=Object(o.a)(b,2),v=E[0],O=E[1],N=e.match.params;Object(n.useEffect)(function(){!function(e,a,t){u.a.get("/branches/"+e,{}).then(function(e){console.log(e.data),a(e.data.branch),t(e.data.playlists)}).catch(function(e){console.log(e),alert(e.message),alert("WRONG ID!!!")})}(N.id,r,f),T(N.id,f)},[]),Object(n.useEffect)(function(){j()},[p]);var j=function(){var e=[];p.forEach(function(a){e.push({id:a._id,startDate:new Date(a.startDate).valueOf(),endDate:new Date(a.endDate).valueOf()})}),e.sort(function(e,a){return e.startDate-a.startDate}),console.log(e),O(e)},C=function(){e.history.push("/branches/".concat(l._id,"/create"))},k=function(e){window.confirm("Are you sure ?")&&function(e,a,t){u.a.delete("/playlists/"+e).then(function(e){T(a,t),alert(e.data.message)}).catch(function(e){alert(e.message)})}(e,l._id,f)};return l&&l._id?c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"branchPageContainer"},c.a.createElement("div",{className:"body"},c.a.createElement("div",{className:"allListLinkContainer"},c.a.createElement("p",{className:"head"},"Playlists"),c.a.createElement("ul",{className:"list listHeight"},p.length>0?p.map(function(e,a){return c.a.createElement("li",{className:"playlistLink",key:a},c.a.createElement("p",null,c.a.createElement(s.b,{to:"/branches/".concat(l._id,"/playlist/").concat(e._id)},a+1,". ",e.name," "),c.a.createElement("span",null,c.a.createElement(g.a,{"aria-label":"Delete",onClick:function(){return k(e._id)},title:"Delete",style:{padding:"3px"}},c.a.createElement(y.a,{fontSize:"small"})))),c.a.createElement("hr",null))}):null)),c.a.createElement("div",{className:"headAndPlaylistcontainer"},c.a.createElement("div",{className:"head"},c.a.createElement("span",{className:"hello"},"Hello, ",l.name),c.a.createElement("span",{className:"screen"},"Screen ",l.screens)),c.a.createElement("div",{className:"playlist"},c.a.createElement(i.c,null,c.a.createElement(i.a,{exact:!0,path:"".concat(e.match.url,"/"),render:function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"centerByFlex selectOrCreate"},"Select or Create Playlist",c.a.createElement(h.a,{variant:"contained",onClick:C},"Create")))}}),c.a.createElement(i.a,{path:"".concat(e.match.url,"/playlist/:id"),render:function(e){return c.a.createElement(w,e)}}),c.a.createElement(i.a,{path:"".concat(e.match.url,"/create"),render:function(e){return c.a.createElement(H,Object.assign({branchId:l._id,branchScreens:l.screens,setPlaylists:f,playlists:p,disabledDates:v},e))}}))))))):c.a.createElement("h1",{className:"centerByFlex margin0Auto"},"Loading...")}),z=function(){return c.a.createElement("div",{style:{position:"absolute",left:"50%",top:"40%",transform:"translate(-50%,-50%)"}},c.a.createElement("h1",{style:{margin:"1rem",fontSize:"2rem",lineHeight:"3rem"}},"The Page Is Not Found !!!"),c.a.createElement(h.a,null," ",c.a.createElement(s.b,{to:"/",style:{textDecoration:"none",color:"#fff"}},"Go Home")))},M=function(){return c.a.createElement(s.a,null,c.a.createElement("div",{className:"app"},c.a.createElement(i.c,null,c.a.createElement(i.a,{exact:!0,path:"/",component:D}),c.a.createElement(i.a,{exact:!0,path:"/branches",component:D}),c.a.createElement(i.a,{path:"/branches/:id",component:W}),c.a.createElement(i.a,{component:z}))))};r.a.render(c.a.createElement(M,null),document.getElementById("root"))},66:function(e,a,t){},84:function(e,a,t){e.exports=t(135)},89:function(e,a,t){},90:function(e,a,t){}},[[84,1,2]]]);
//# sourceMappingURL=main.f7f52183.chunk.js.map