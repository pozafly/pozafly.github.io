(globalThis.webpackChunkgatsby_casper=globalThis.webpackChunkgatsby_casper||[]).push([[214],{8225:(t,e,i)=>{"use strict";i.d(e,{m:()=>u,Z:()=>S});var o=i(1788),n=i(6771),a=i(5444),s=i(7294),l=(i(9012),i(5847)),r=i(4979),p=i(3050),c=i(1792),d=i(937),f=i(1596),g=i(3431);let m=function(t){function e(...e){var i;return(i=t.call.apply(t,[this].concat(e))||this).subscribe=s.createRef(),i.titleRef=s.createRef(),i.lastScrollY=0,i.ticking=!1,i.state={showTitle:!1},i.openModal=()=>{i.subscribe.current&&i.subscribe.current.open()},i.onScroll=()=>{i.titleRef&&i.titleRef.current&&(i.ticking||requestAnimationFrame(i.update),i.ticking=!0)},i.update=()=>{if(!i.titleRef||!i.titleRef.current)return;i.lastScrollY=window.scrollY;const t=i.titleRef.current.getBoundingClientRect().top,e=i.titleRef.current.offsetHeight+35;i.lastScrollY>=t+e?i.setState({showTitle:!0}):i.setState({showTitle:!1}),i.ticking=!1},i}(0,o.Z)(e,t);var i=e.prototype;return i.componentDidMount=function(){this.lastScrollY=window.scrollY,this.props.isPost&&window.addEventListener("scroll",this.onScroll,{passive:!0})},i.componentWillUnmount=function(){window.removeEventListener("scroll",this.onScroll)},i.render=function(){const{isHome:t=!1,isPost:e=!1,post:i={}}=this.props;return(0,g.tZ)(s.Fragment,null,r.Z.showSubscribe&&(0,g.tZ)(d.p,{ref:this.subscribe}),(0,g.tZ)("nav",{css:h},(0,g.tZ)(b,{className:"site-nav-left"},!t&&(0,g.tZ)(f.B,null),(0,g.tZ)(x,{css:[this.state.showTitle?z:"","",""]},(0,g.tZ)("ul",{css:[t?y:v,"",""],role:"menu"},(0,g.tZ)("li",{role:"menuitem"},(0,g.tZ)(a.rU,{to:"/"},"Home")),(0,g.tZ)("li",{role:"menuitem"},(0,g.tZ)(a.rU,{to:"/about"},"About")),(0,g.tZ)("li",{role:"menuitem"},(0,g.tZ)(a.rU,{to:"/tags"},"Tags")),(0,g.tZ)("li",{role:"menuitem"},(0,g.tZ)(a.rU,{to:"/tags/diary/"},"Diary"))),e&&(0,g.tZ)(j,{ref:this.titleRef,className:"nav-post-title"},i.title))),(0,g.tZ)(w,null,(0,g.tZ)(Z,null,r.Z.instagram&&(0,g.tZ)("a",{className:"social-link-fb",css:t?[l.vh,l.kt]:[l.IW,l.kt],href:r.Z.instagram,target:"_blank",title:"Instagram",rel:"noopener noreferrer"},(0,g.tZ)(p.m,null)),r.Z.github&&(0,g.tZ)("a",{css:t?l.vh:l.IW,href:r.Z.github,title:"Github",target:"_blank",rel:"noopener noreferrer"},(0,g.tZ)(c.E,null))),r.Z.showSubscribe&&(0,g.tZ)(k,{onClick:this.openModal},"Subscribe"))))},e}(s.PureComponent);const u={name:"1w0z3am",styles:"position:fixed;top:0;right:0;left:0;z-index:1000;background:rgba(20,22,26,.78);@media (prefers-color-scheme: light){background:hsla(0,0%,100%,.8);border-bottom:1px solid #e9eef1;}@media (max-width: 700px){padding-right:0;padding-left:0;}/* @media (prefers-color-scheme: light) {\n    background: hsla(0,0%,100%,.95);\n  } */"},h={name:"lcmrfl",styles:"position:relative;z-index:100;display:flex;justify-content:space-between;align-items:flex-start;overflow-y:hidden;height:64px;font-size:1.3rem"},b=(0,n.Z)("div",{target:"e1sju8vj5"})({name:"crtwut",styles:"flex:1 0 auto;display:flex;align-items:center;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;margin-right:10px;padding:10px 0 80px;font-weight:500;letter-spacing:0.2px;text-transform:uppercase;white-space:nowrap;-ms-overflow-scrolling:touch;@media (max-width: 700px){margin-right:0;padding-left:5vw;}"}),x=(0,n.Z)("div",{target:"e1sju8vj4"})({name:"ggt2ij",styles:"position:relative;align-self:flex-start"}),y={name:"1jy6gs5",styles:"position:absolute;z-index:1000;display:flex;margin:0 0 0 -12px;padding:0;list-style:none;transition:all 1s cubic-bezier(0.19, 1, 0.22, 1);li{display:block;margin:0;padding:0;}li a{font-size:1.2rem;font-weight:600;position:relative;display:block;padding:14px 12px;color:#fff;opacity:0.8;transition:opacity 0.35s ease-in-out;@media (max-width: 700px){padding:14px 8px;}}li a:hover{text-decoration:none;opacity:1;}li a:before{content:'';position:absolute;right:100%;bottom:8px;left:12px;height:1px;background:#fff;opacity:0.25;transition:all 0.35s ease-in-out;}li a:hover:before{right:12px;opacity:0.5;}"},v={name:"hyxw21",styles:"position:absolute;z-index:1000;display:flex;margin:0 0 0 -12px;padding:0;list-style:none;transition:all 1s cubic-bezier(0.19, 1, 0.22, 1);li{display:block;margin:0;padding:0;}li a{font-size:1.2rem;font-weight:600;position:relative;display:block;padding:14px 12px;color:#fff;opacity:0.8;transition:opacity 0.35s ease-in-out;@media (prefers-color-scheme: light){color:black;}@media (max-width: 700px){padding:14px 8px;}}li a:hover{text-decoration:none;opacity:1;}li a:before{content:'';position:absolute;right:100%;bottom:8px;left:12px;height:1px;background:#fff;opacity:0.25;transition:all 0.35s ease-in-out;@media (prefers-color-scheme: light){background:black;}}li a:hover:before{right:12px;opacity:0.5;}"},w=(0,n.Z)("div",{target:"e1sju8vj3"})({name:"3i3mo1",styles:"flex:0 1 auto;display:flex;align-items:center;justify-content:flex-end;padding:10px 0;height:64px;@media (max-width: 700px){}"}),Z=(0,n.Z)("div",{target:"e1sju8vj2"})({name:"1z0rm8f",styles:"flex-shrink:0;display:flex;align-items:center"}),k=(0,n.Z)("a",{target:"e1sju8vj1"})({name:"tong54",styles:"display:block;padding:4px 10px;margin:0 0 0 10px;border:#fff 1px solid;color:#fff;line-height:1em;border-radius:10px;opacity:0.8;:hover{text-decoration:none;opacity:1;cursor:pointer;}"}),j=(0,n.Z)("span",{target:"e1sju8vj0"})({name:"1p2qzts",styles:"visibility:hidden;position:absolute;top:9px;color:#fff;font-size:1.7rem;font-weight:400;text-transform:none;opacity:0;transition:all 1s cubic-bezier(0.19, 1, 0.22, 1);transform:translateY(175%);@media (prefers-color-scheme: light){color:black;}.dash{left:-25px;}.dash:before{content:'– ';opacity:0.5;}"}),z={name:"44uflt",styles:"ul{visibility:hidden;opacity:0;transform:translateY(-175%);}.nav-post-title{visibility:visible;opacity:1;transform:translateY(0);}"},S=m}}]);
//# sourceMappingURL=af52a822-ccf256559e75857954d5.js.map