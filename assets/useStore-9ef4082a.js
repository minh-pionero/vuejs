import{a1 as o,a2 as c}from"./index-fccdf61c.js";const u=e=>{const r=o(c);return{dispatch:(t,s)=>{let i=t;return e&&(i=`${e}/${t}`),r.dispatch(i,s)},getters:t=>{let s=t;return e&&(s=`${e}/${t}`),r.getters[s]}}};export{u};