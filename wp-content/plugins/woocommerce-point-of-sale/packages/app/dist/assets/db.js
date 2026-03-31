import{b as o,I as a}from"../index.js";const n=o(async({router:e})=>{await a.init(),a.instance.on("versionchange",()=>{e.push({name:"error-reload-register"})})});export{n as default};
