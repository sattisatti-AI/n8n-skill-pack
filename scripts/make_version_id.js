#!/usr/bin/env node
function hex(n){return Math.floor(Math.random()*n).toString(16);}
function uuidLike(){const part=(len)=>Array.from({length:len},()=>hex(16)).join("");return `${part(8)}-${part(4)}-${part(4)}-${part(4)}-${part(12)}`;}
console.log(uuidLike());
