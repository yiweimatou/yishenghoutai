webpackJsonp([15],{1135:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),l=u(i),r=n(1),o=(u(r),n(83)),c={img:{cursor:"pointer"}},d=function(e){var t=e.list,n=e.onClick;return(0,l["default"])(o.GridList,{padding:60,cols:4},void 0,t.map(function(e){return(0,l["default"])(o.GridTile,{title:e.lname},e.lid,(0,l["default"])("img",{src:e.cover,alt:"cover",onClick:function(){return n(e.lid)},style:c.img}))}))};t["default"]=d},1438:function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(19),l=n(1135),r=u(l),o=n(36),c=function(e){return{list:e.lesson.list}},d=function(e){return{onClick:function(t){e((0,o.push)("/lesson/detail/"+t))}}};t["default"]=(0,i.connect)(c,d)(r["default"])}});