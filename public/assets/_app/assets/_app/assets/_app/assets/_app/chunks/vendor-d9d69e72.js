function p(){}function I(t,e){for(const n in e)t[n]=e[n];return t}function L(t){return t&&typeof t=="object"&&typeof t.then=="function"}function z(t){return t()}function B(){return Object.create(null)}function g(t){t.forEach(z)}function G(t){return typeof t=="function"}function J(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let b;function dt(t,e){return b||(b=document.createElement("a")),b.href=e,t===b.href}function K(t){return Object.keys(t).length===0}function _t(t,e,n,r){if(t){const c=O(t,e,n,r);return t[0](c)}}function O(t,e,n,r){return t[1]&&r?I(n.ctx.slice(),t[1](r(e))):n.ctx}function ht(t,e,n,r){if(t[2]&&r){const c=t[2](r(n));if(e.dirty===void 0)return c;if(typeof c=="object"){const o=[],u=Math.max(e.dirty.length,c.length);for(let s=0;s<u;s+=1)o[s]=e.dirty[s]|c[s];return o}return e.dirty|c}return e.dirty}function mt(t,e,n,r,c,o){if(c){const u=O(e,n,r,o);t.p(u,c)}}function pt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}let x=!1;function W(){x=!0}function Q(){x=!1}function R(t,e,n,r){for(;t<e;){const c=t+(e-t>>1);n(c)<=r?t=c+1:e=c}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&i.push(f)}e=i}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let c=0;for(let i=0;i<e.length;i++){const l=e[i].claim_order,f=(c>0&&e[n[c]].claim_order<=l?c+1:R(1,c,d=>e[n[d]].claim_order,l))-1;r[i]=n[f]+1;const a=f+1;n[a]=i,c=Math.max(a,c)}const o=[],u=[];let s=e.length-1;for(let i=n[c]+1;i!=0;i=r[i-1]){for(o.push(e[i-1]);s>=i;s--)u.push(e[s]);s--}for(;s>=0;s--)u.push(e[s]);o.reverse(),u.sort((i,l)=>i.claim_order-l.claim_order);for(let i=0,l=0;i<u.length;i++){for(;l<o.length&&u[i].claim_order>=o[l].claim_order;)l++;const f=l<o.length?o[l]:null;t.insertBefore(u[i],f)}}function V(t,e){if(x){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function gt(t,e,n){x&&!n?V(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function X(t){t.parentNode.removeChild(t)}function yt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Y(t){return document.createElement(t)}function Z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t){return document.createTextNode(t)}function bt(){return j(" ")}function xt(){return j("")}function kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function tt(t){return Array.from(t.childNodes)}function et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function T(t,e,n,r,c=!1){et(t);const o=(()=>{for(let u=t.claim_info.last_index;u<t.length;u++){const s=t[u];if(e(s)){const i=n(s);return i===void 0?t.splice(u,1):t[u]=i,c||(t.claim_info.last_index=u),s}}for(let u=t.claim_info.last_index-1;u>=0;u--){const s=t[u];if(e(s)){const i=n(s);return i===void 0?t.splice(u,1):t[u]=i,c?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=u,s}}return r()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function P(t,e,n,r){return T(t,c=>c.nodeName===e,c=>{const o=[];for(let u=0;u<c.attributes.length;u++){const s=c.attributes[u];n[s.name]||o.push(s.name)}o.forEach(u=>c.removeAttribute(u))},()=>r(e))}function wt(t,e,n){return P(t,e,n,Y)}function $t(t,e,n){return P(t,e,n,Z)}function nt(t,e){return T(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>j(e),!0)}function Et(t){return nt(t," ")}function jt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Nt(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}let k;function _(t){k=t}function w(){if(!k)throw new Error("Function called outside component initialization");return k}function St(t){w().$$.on_mount.push(t)}function At(t){w().$$.after_update.push(t)}function vt(t,e){w().$$.context.set(t,e)}const y=[],D=[],$=[],F=[],rt=Promise.resolve();let N=!1;function ct(){N||(N=!0,rt.then(C))}function S(t){$.push(t)}let A=!1;const v=new Set;function C(){if(!A){A=!0;do{for(let t=0;t<y.length;t+=1){const e=y[t];_(e),it(e.$$)}for(_(null),y.length=0;D.length;)D.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];v.has(e)||(v.add(e),e())}$.length=0}while(y.length);for(;F.length;)F.pop()();N=!1,A=!1,v.clear()}}function it(t){if(t.fragment!==null){t.update(),g(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}const E=new Set;let h;function lt(){h={r:0,c:[],p:h}}function ut(){h.r||g(h.c),h=h.p}function H(t,e){t&&t.i&&(E.delete(t),t.i(e))}function st(t,e,n,r){if(t&&t.o){if(E.has(t))return;E.add(t),h.c.push(()=>{E.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}function Ct(t,e){const n=e.token={};function r(c,o,u,s){if(e.token!==n)return;e.resolved=s;let i=e.ctx;u!==void 0&&(i=i.slice(),i[u]=s);const l=c&&(e.current=c)(i);let f=!1;e.block&&(e.blocks?e.blocks.forEach((a,d)=>{d!==o&&a&&(lt(),st(a,1,1,()=>{e.blocks[d]===a&&(e.blocks[d]=null)}),ut())}):e.block.d(1),l.c(),H(l,1),l.m(e.mount(),e.anchor),f=!0),e.block=l,e.blocks&&(e.blocks[o]=l),f&&C()}if(L(t)){const c=w();if(t.then(o=>{_(c),r(e.then,1,e.value,o),_(null)},o=>{if(_(c),r(e.catch,2,e.error,o),_(null),!e.hasCatch)throw o}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function qt(t,e,n){const r=e.slice(),{resolved:c}=t;t.current===t.then&&(r[t.value]=c),t.current===t.catch&&(r[t.error]=c),t.block.p(r,n)}function Mt(t,e){const n={},r={},c={$$scope:1};let o=t.length;for(;o--;){const u=t[o],s=e[o];if(s){for(const i in u)i in s||(r[i]=1);for(const i in s)c[i]||(n[i]=s[i],c[i]=1);t[o]=s}else for(const i in u)c[i]=1}for(const u in r)u in n||(n[u]=void 0);return n}function zt(t){return typeof t=="object"&&t!==null?t:{}}function Bt(t){t&&t.c()}function Ot(t,e){t&&t.l(e)}function ot(t,e,n,r){const{fragment:c,on_mount:o,on_destroy:u,after_update:s}=t.$$;c&&c.m(e,n),r||S(()=>{const i=o.map(z).filter(G);u?u.push(...i):g(i),t.$$.on_mount=[]}),s.forEach(S)}function at(t,e){const n=t.$$;n.fragment!==null&&(g(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ft(t,e){t.$$.dirty[0]===-1&&(y.push(t),ct(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Tt(t,e,n,r,c,o,u,s=[-1]){const i=k;_(t);const l=t.$$={fragment:null,ctx:null,props:o,update:p,not_equal:c,bound:B(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:B(),dirty:s,skip_bound:!1,root:e.target||i.$$.root};u&&u(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(a,d,...q)=>{const M=q.length?q[0]:d;return l.ctx&&c(l.ctx[a],l.ctx[a]=M)&&(!l.skip_bound&&l.bound[a]&&l.bound[a](M),f&&ft(t,a)),d}):[],l.update(),f=!0,g(l.before_update),l.fragment=r?r(l.ctx):!1,e.target){if(e.hydrate){W();const a=tt(e.target);l.fragment&&l.fragment.l(a),a.forEach(X)}else l.fragment&&l.fragment.c();e.intro&&H(t.$$.fragment),ot(t,e.target,e.anchor,e.customElement),Q(),C()}_(i)}class Pt{$destroy(){at(this,1),this.$destroy=p}$on(e,n){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const c=r.indexOf(n);c!==-1&&r.splice(c,1)}}$set(e){this.$$set&&!K(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const m=[];function Dt(t,e=p){let n;const r=new Set;function c(s){if(J(t,s)&&(t=s,n)){const i=!m.length;for(const l of r)l[1](),m.push(l,t);if(i){for(let l=0;l<m.length;l+=2)m[l][0](m[l+1]);m.length=0}}}function o(s){c(s(t))}function u(s,i=p){const l=[s,i];return r.add(l),r.size===1&&(n=e(c)||p),s(t),()=>{r.delete(l),r.size===0&&(n(),n=null)}}return{set:c,update:o,subscribe:u}}export{St as A,I as B,Dt as C,_t as D,mt as E,pt as F,ht as G,V as H,p as I,dt as J,Ct as K,Nt as L,qt as M,yt as N,Z as O,$t as P,Pt as S,tt as a,kt as b,wt as c,X as d,Y as e,gt as f,nt as g,jt as h,Tt as i,Bt as j,bt as k,xt as l,Ot as m,Et as n,ot as o,Mt as p,zt as q,lt as r,J as s,j as t,st as u,at as v,ut as w,H as x,vt as y,At as z};
