(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b3efe86e"],{2423:function(t,n,e){"use strict";e.d(n,"g",(function(){return a})),e.d(n,"f",(function(){return i})),e.d(n,"e",(function(){return s})),e.d(n,"a",(function(){return c})),e.d(n,"c",(function(){return o})),e.d(n,"b",(function(){return u})),e.d(n,"d",(function(){return l})),e.d(n,"i",(function(){return d})),e.d(n,"h",(function(){return f})),e.d(n,"j",(function(){return p}));var r=e("b775"),a=function(t,n){return Object(r["a"])({method:"GET",url:"/app/v1_0/users/".concat(t,"/articles"),params:n})},i=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_1/articles",params:t})},s=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/articles/".concat(t)})},c=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/article/collections",data:{target:t}})},o=function(t){return Object(r["a"])({method:"DELETE",url:"/app/v1_0/article/collections/".concat(t)})},u=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/article/likings",data:{target:t}})},l=function(t){return Object(r["a"])({method:"DELETE",url:"/app/v1_0/article/likings/".concat(t)})},d=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/articles",params:t})},f=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/article/collections",params:t})},p=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/histories",params:t})}},"25f0":function(t,n,e){"use strict";var r=e("6eeb"),a=e("825a"),i=e("d039"),s=e("ad6d"),c="toString",o=RegExp.prototype,u=o[c],l=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),d=u.name!=c;(l||d)&&r(RegExp.prototype,c,(function(){var t=a(this),n=String(t.source),e=t.flags,r=String(void 0===e&&t instanceof RegExp&&!("flags"in o)?s.call(t):e);return"/"+n+"/"+r}),{unsafe:!0})},2909:function(t,n,e){"use strict";function r(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}e("a4d3"),e("e01a"),e("d28b"),e("a630"),e("e260"),e("d3b7"),e("25f0"),e("3ca3"),e("ddb0");function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(t){return r(t)||a(t)||i()}e.d(n,"a",(function(){return s}))},"4df4":function(t,n,e){"use strict";var r=e("f8c2"),a=e("7b0b"),i=e("9bdd"),s=e("e95a"),c=e("50c4"),o=e("8418"),u=e("35a1");t.exports=function(t){var n,e,l,d,f,p=a(t),v="function"==typeof this?this:Array,h=arguments.length,m=h>1?arguments[1]:void 0,b=void 0!==m,g=0,_=u(p);if(b&&(m=r(m,h>2?arguments[2]:void 0,2)),void 0==_||v==Array&&s(_))for(n=c(p.length),e=new v(n);n>g;g++)o(e,g,b?m(p[g],g):p[g]);else for(d=_.call(p),f=d.next,e=new v;!(l=f.call(d)).done;g++)o(e,g,b?i(d,m,[l.value,g],!0):l.value);return e.length=g,e}},"7afd":function(t,n,e){"use strict";var r=e("7e78"),a=e.n(r);a.a},"7e78":function(t,n,e){},a630:function(t,n,e){var r=e("23e7"),a=e("4df4"),i=e("1c7e"),s=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:s},{from:a})},ad6d:function(t,n,e){"use strict";var r=e("825a");t.exports=function(){var t=r(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},c24f:function(t,n,e){"use strict";e.d(n,"f",(function(){return a})),e.d(n,"d",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return c})),e.d(n,"b",(function(){return o})),e.d(n,"e",(function(){return u})),e.d(n,"g",(function(){return l})),e.d(n,"h",(function(){return d}));var r=e("b775"),a=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/authorizations",data:t})},i=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user"})},s=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/users/".concat(t)})},c=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/user/followings",data:{target:t}})},o=function(t){return Object(r["a"])({method:"DELETE",url:"/app/v1_0/user/followings/".concat(t)})},u=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/profile"})},l=function(t){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/photo",data:t})},d=function(t){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/profile",data:t})}},e382:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"user-container"},[e("van-nav-bar",{attrs:{title:t.user.name,"left-arrow":""},on:{"click-left":function(n){return t.$router.back()}}}),e("div",{staticClass:"user-info-container"},[e("div",{staticClass:"row1"},[e("van-image",{staticClass:"col1",attrs:{fit:"cover",round:"",src:t.user.photo}}),e("div",{staticClass:"col2"},[e("div",{staticClass:"row1"},[e("div",{staticClass:"item"},[e("div",{staticClass:"count"},[t._v(t._s(t.user.art_count))]),e("div",{staticClass:"text"},[t._v("发布")])]),e("div",{staticClass:"item"},[e("div",{staticClass:"count"},[t._v(t._s(t.user.follow_count))]),e("div",{staticClass:"text"},[t._v("关注")])]),e("div",{staticClass:"item"},[e("div",{staticClass:"count"},[t._v(t._s(t.user.fans_count))]),e("div",{staticClass:"text"},[t._v("粉丝")])]),e("div",{staticClass:"item"},[e("div",{staticClass:"count"},[t._v(t._s(t.user.like_count))]),e("div",{staticClass:"text"},[t._v("获赞")])])]),e("div",{staticClass:"action"},[e("van-button",{attrs:{type:"primary",size:"small"}},[t._v("私信")]),e("van-button",{attrs:{type:"info",size:"small"}},[t._v("关注")])],1)])],1),e("div",{staticClass:"intro-wrap"},[e("div",[e("span",[t._v("认证：")]),e("span",[t._v(t._s(t.user.certi))])]),e("div",[e("span",[t._v("简介：")]),e("span",[t._v(t._s(t.user.intro))])])])]),e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(n){t.loading=n},expression:"loading"}},t._l(t.list,(function(t,n){return e("van-cell",{key:n,attrs:{title:t.title}})})),1)],1)},a=[],i=e("2909"),s=(e("96cf"),e("1da1")),c=e("c24f"),o=e("2423"),u={name:"UserPage",components:{},props:{},data:function(){return{user:{},list:[],loading:!1,finished:!1,page:1}},computed:{},watch:{},created:function(){this.loadUser()},mounted:function(){},methods:{loadUser:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var n,e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(c["c"])(this.$route.params.userId);case 3:n=t.sent,e=n.data,this.user=e.data,t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0),this.$toast("获取用户数据失败");case 12:case"end":return t.stop()}}),t,this,[[0,8]])})));function n(){return t.apply(this,arguments)}return n}(),onLoad:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var n,e,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["g"])(this.$route.params.userId,{page:this.page,per_page:20});case 2:e=t.sent,r=e.data,a=r.data.results,(n=this.list).push.apply(n,Object(i["a"])(a)),this.loading=!1,a.length?this.page++:this.finished=!0;case 8:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}()}},l=u,d=(e("7afd"),e("2877")),f=Object(d["a"])(l,r,a,!1,null,"fc67fbc0",null);n["default"]=f.exports}}]);
//# sourceMappingURL=chunk-b3efe86e.4db1fd8c.js.map