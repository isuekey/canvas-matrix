!function(t){var e={};function s(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(r,n,function(e){return t[e]}.bind(null,n));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class r{constructor(t=[0,0,0,0,0,0,0,0,0]){this.mat=t}setI(){return this.mat=[1,0,0,0,1,0,0,0,1],this}setRotate(t=0){const e=Math.cos(t*Math.PI/180),s=Math.sin(t*Math.PI/180);return this.mat=[e,-s,0,s,e,0,0,0,1],this}setScale(t=1,e=1){return this.mat=[t,0,0,0,e,0,0,0,1],this}setTranslate(t=0,e=0){return this.mat=[1,0,t,0,1,e,0,0,1],this}multiply(t){return"number"==typeof t?new r(this.mat.map(e=>e*t)):t.multiplyBy(this)}handleMultiplyBy(t){const e=this.mat,s=t.mat;return[e[0]*s[0]+e[1]*s[3]+e[2]*s[6],e[0]*s[1]+e[1]*s[4]+e[2]*s[7],e[0]*s[2]+e[1]*s[5]+e[2]*s[8],e[3]*s[0]+e[4]*s[3]+e[5]*s[6],e[3]*s[1]+e[4]*s[4]+e[5]*s[7],e[3]*s[2]+e[4]*s[5]+e[5]*s[8],e[6]*s[0]+e[7]*s[3]+e[8]*s[6],e[6]*s[1]+e[7]*s[4]+e[8]*s[7],e[6]*s[2]+e[7]*s[5]+e[8]*s[8]]}multiplyBy(t){return new r("number"==typeof t?this.mat.map(e=>e*t):this.handleMultiplyBy(t))}getCanvasTransform(){const t=this.mat;return[t[0],t[3],t[1],t[4],t[2],t[5]]}getElement(t,e){return this.mat[3*t+e]}}r.prototype[Symbol.toStringTag]="Matrix3";class n extends r{constructor(t=[0,0,0,0,0,0,0,0,0]){super(t),this.usage=0}setUsage(t=1){this.usage=t}setI(){return this.setUsage(),super.setI(),this}setRotate(t){return super.setRotate(t),this.setUsage(5),this}setScale(t,e){return super.setScale(t,e),this.setUsage(),this}setTranslate(t,e){return super.setTranslate(t,e),this.setUsage(),this}multiply(t){return this.usage+=27,t.multiplyBy(this)}multiplyBy(t){const e=super.handleMultiplyBy(t);return this.usage+=27,new n(e)}}n.prototype[Symbol.toStringTag]="Matrix3Dev";class a{constructor(t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]){this.mat=t}setI(){return this.mat=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}setRotate(t=0,e=[0,0,1]){const s=Math.cos(t*Math.PI/180),r=Math.sin(t*Math.PI/180),[n,a,u]=e,i=Math.sqrt(n*n+a*a+u*u),[l,o,h]=[n/i,a/i,u/i],p=1-s;return this.mat=[s+p*l*l,p*l*o-r*h,p*l*h+r*o,0,p*o*l+r*h,s+p*o*o,p*o*h-r*l,0,p*h*l-r*o,p*h*o+r*l,s+p*h*h,0,0,0,0,1],this}setScale(t=1,e=1,s=1){return this.mat=[t,0,0,0,0,e,0,0,0,0,s,0,0,0,0,1],this}setTranslate(t,e,s){return this.mat=[1,0,0,t,0,1,0,e,0,0,1,s,0,0,0,1],this}multiply(t){return"number"==typeof t?new a(this.mat.map(e=>e*t)):t.multiplyBy(this)}handleMultiplyBy(t){const e=this.mat,s=t.mat;return[e[0]*s[0]+e[1]*s[4]+e[2]*s[8]+e[3]*s[12],e[0]*s[1]+e[1]*s[5]+e[2]*s[9]+e[3]*s[13],e[0]*s[2]+e[1]*s[6]+e[2]*s[10]+e[3]*s[14],e[0]*s[3]+e[1]*s[7]+e[2]*s[11]+e[3]*s[15],e[4]*s[0]+e[5]*s[4]+e[6]*s[8]+e[7]*s[12],e[4]*s[1]+e[5]*s[5]+e[6]*s[9]+e[7]*s[13],e[4]*s[2]+e[5]*s[6]+e[6]*s[10]+e[7]*s[14],e[4]*s[3]+e[5]*s[7]+e[6]*s[11]+e[7]*s[15],e[8]*s[0]+e[9]*s[4]+e[10]*s[8]+e[11]*s[12],e[8]*s[1]+e[9]*s[5]+e[10]*s[9]+e[11]*s[13],e[8]*s[2]+e[9]*s[6]+e[10]*s[10]+e[11]*s[14],e[8]*s[3]+e[9]*s[7]+e[10]*s[11]+e[11]*s[15],e[12]*s[0]+e[13]*s[4]+e[14]*s[8]+e[15]*s[12],e[12]*s[1]+e[13]*s[5]+e[14]*s[9]+e[15]*s[13],e[12]*s[2]+e[13]*s[6]+e[14]*s[10]+e[15]*s[14],e[12]*s[3]+e[13]*s[7]+e[14]*s[11]+e[15]*s[15]]}multiplyBy(t){if("number"==typeof t)return new a(this.mat.map(e=>e*t));this.mat,t.mat;return new a(this.handleMultiplyBy(t))}getElement(t,e){return this.mat[4*t+e]}}a.prototype[Symbol.toStringTag]="Matrix4";class u extends a{constructor(t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]){super(t),this.usage=0}setUsage(t=1){this.usage=t}setI(){return this.setUsage(),super.setI(),this}setRotate(t=0,e=[0,0,1]){return super.setRotate(t,e),this.setUsage(16),this}setScale(t=1,e=1,s=1){return super.setScale(t,e,s),this.setUsage(),this}setTranslate(t=0,e=0,s=0){return super.setTranslate(t,e),this.setUsage(),this}multiply(t){return this.usage+=64,t.multiplyBy(this)}multiplyBy(t){const e=super.handleMultiplyBy(t);return this.usage+=64,new u(e)}}u.prototype[Symbol.toStringTag]="Matrix4Dev",s.d(e,"Mat4",(function(){return a})),s.d(e,"Mat3",(function(){return r})),s.d(e,"Mat4Dev",(function(){return u})),s.d(e,"Mat3Dev",(function(){return n}))}]);