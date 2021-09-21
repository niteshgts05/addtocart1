(this.webpackJsonplms=this.webpackJsonplms||[]).push([[0],{129:function(e,t,a){},130:function(e,t,a){},132:function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),n=a(23),c=a.n(n),l=a(11),s=a(8),o=a(13),d=a(12),m=a(7),u=a(21),p=a(59),h=function(e){return function(t,a){var r=a().cart.cartItems.slice(),i=!1;r.forEach((function(t){t.id===e.id&&(i=!0)})),i||r.push(Object(p.a)({},e)),t({type:"ADD_TO_CART",payload:{cartItems:r}}),localStorage.setItem("cartItems",JSON.stringify(r))}},g=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={grandTotal:"",toggle:!1},r}return Object(s.a)(a,[{key:"handleHide",value:function(){this.setState({toggle:!this.state.toggle})}},{key:"render",value:function(){var e=this,t=this.props.cartItems;return i.a.createElement("div",null,i.a.createElement("span",{"data-toggle":"offcanvas",className:"btn btn-link border-none"},i.a.createElement("i",{className:"mdi mdi-cart"})," My Cart ",i.a.createElement("small",{className:"cart-value"},t.length)),i.a.createElement("div",{className:"cart-sidebar"},i.a.createElement("div",{className:"bs-canvas-header side-cart-header p-3 "},i.a.createElement("div",{className:"d-inline-block  main-cart-title"},"My Cart  ",i.a.createElement("span",null,"(",t.length," Items)")),i.a.createElement("button",{type:"button",className:"bs-canvas-close close","data-toggle":"offcanvas"},i.a.createElement("i",{className:"mdi mdi-close"}))),i.a.createElement("div",{className:"cart-sidebar-body"},t.map((function(t,a){return i.a.createElement("div",{className:"cart-item",key:a},i.a.createElement("div",{className:"cart-product-img"},i.a.createElement("img",{className:"img-fluid",src:t.filename,alt:"cart"}),i.a.createElement("div",{className:"offer-badge"},t.rating)),i.a.createElement("div",{className:"cart-text"},i.a.createElement("h4",null,t.title),i.a.createElement("div",{className:"qty-group"},i.a.createElement("div",{className:"quantity buttons_added"},i.a.createElement("input",{type:"button",defaultValue:"-",className:"minus minus-btn",onClick:function(){return e.props.decreaseToCart(t)}}),i.a.createElement("input",{type:"number",value:t.qty,className:"input-text qty text",disabled:!0}),i.a.createElement("input",{type:"button",defaultValue:"+",className:"plus plus-btn",onClick:function(){return e.props.incrementToCart(t)}}),i.a.createElement("button",{type:"button",className:"cart-close-btn",onClick:function(){return e.props.removeFromCart(t)}},i.a.createElement("i",{className:"mdi mdi-close"}))),i.a.createElement("div",{className:"cart-item-price"},"\u20b9",(t.qty*t.price).toFixed(2)))))}))),i.a.createElement("div",{className:"cart-sidebar-footer"},i.a.createElement("div",{className:"cart-store-details"},i.a.createElement("p",null,"Sub Total ",i.a.createElement("strong",{className:"float-right"},"\u20b9",t.reduce((function(e,t){return e+t.qty*t.price}),0).toFixed(2))),i.a.createElement("p",null,"Delivery Charges ",i.a.createElement("strong",{className:"float-right text-danger"},"+ \u20b90.00")),i.a.createElement("h6",null,"Your total savings ",i.a.createElement("strong",{className:"float-right text-danger"},"\u20b9 0.00"))),i.a.createElement("a",{href:"/checkout"},i.a.createElement("button",{className:"btn btn-secondary btn-lg btn-block text-left",type:"button"},i.a.createElement("span",{className:"float-left"},i.a.createElement("i",{className:"mdi mdi-cart-outline"})," Proceed to Checkout "),i.a.createElement("span",{className:"float-right"},i.a.createElement("strong",null,"\u20b9",t.reduce((function(e,t){return e+t.qty*t.price}),0).toFixed(2))," ",i.a.createElement("span",{className:"mdi mdi-chevron-right"})))))))}}]),a}(r.Component),b=Object(u.b)((function(e){return{cartItems:e.cart.cartItems}}),{incrementToCart:function(e){return function(t,a){var r=a().cart.cartItems.slice(),i=r.find((function(t){return t.id===e.id})),n=r.indexOf(i),c=r[n];c.qty=c.qty+1,c.total=c.qty*c.netPrice,t({type:"INCREASE_QUANTITY",payload:{cartItems:r}}),localStorage.setItem("cartItems",JSON.stringify(r))}},decreaseToCart:function(e){return function(t,a){var r=a().cart.cartItems.slice(),i=r.find((function(t){return t.id===e.id})),n=r.indexOf(i),c=r[n];c.qty>1&&(c.qty=c.qty-1,c.total=c.qty*c.netPrice),t({type:"DECREASE_QUANTITY",payload:{cartItems:r}}),localStorage.setItem("cartItems",JSON.stringify(r))}},removeFromCart:function(e){return function(t,a){var r=a().cart.cartItems.slice().filter((function(t){return t.id!==e.id}));t({type:"REMOVE_FROM_CART",payload:{cartItems:r}}),localStorage.setItem("cartItems",JSON.stringify(r))}}})(g),y=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={token:"",userName:"",searchtxt:""},r}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("header",{className:"header clearfix"},i.a.createElement("nav",{className:"navbar navbar-light navbar-expand-lg bg-dark bg-faded osahan-menu"},i.a.createElement("div",{className:"container-fluid"},i.a.createElement("a",{className:"navbar-brand",href:"/"}," ",i.a.createElement("img",{src:"https://picsum.photos/80/35?random=1",alt:"logo"})," "),i.a.createElement("div",{className:"navbar-collapse",id:"navbarNavDropdown"},i.a.createElement("div",{className:"navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main"},i.a.createElement("div",{className:"top-categories-search",onSubmit:this.handleClickSearch},i.a.createElement("div",{className:"input-group"}))),i.a.createElement("div",{className:"my-2 my-lg-0"},i.a.createElement("ul",{className:"list-inline main-nav-right"},i.a.createElement("li",{className:"list-inline-item"}),i.a.createElement("li",{className:"list-inline-item cart-btn mr-0"},i.a.createElement(b,null)))))))))}}]),a}(r.Component),f=Object(m.f)(y),v=a(32),w=a.n(v),E=(a(94),a(95),a(20)),N=function(e){var t=e.categoryData,a={nextArrow:i.a.createElement("p",null),prevArrow:i.a.createElement("p",null),arrows:!0,dots:!1,infinite:!1,speed:500,slidesToShow:7,slidesToScroll:2,initialSlide:.5,responsive:[{breakpoint:1024,settings:{slidesToShow:6,slidesToScroll:3,infinite:!0,dots:!1}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:3,slidesToScroll:3}}]};return i.a.createElement("div",{style:{background:"#eee"}},i.a.createElement("div",{className:"container",id:"header-category-bk"},i.a.createElement(w.a,a,t.length>0&&t.map((function(e,t){return i.a.createElement("div",{className:"item",key:t},i.a.createElement("div",{className:"category-item"},i.a.createElement(E.b,{to:{pathname:"/shop/grocery-staples",state:{category_name:e.category_name,category_image:e.category_image}}},i.a.createElement("img",{className:"img-fluid",src:e.category_image,alt:e.category_name}),i.a.createElement("h6",null,e.category_name))))})))))},k=(Object(u.b)(null)((function(e){var t=e.categoryData,a={dots:!1,infinite:!0,autoplay:!0,speed:2e3,autoplaySpeed:2e3,slidesToShow:1,slidesToScroll:1};return i.a.createElement("div",null,i.a.createElement(N,{categoryData:t}),i.a.createElement(w.a,a,i.a.createElement("div",{className:"owl-item"},i.a.createElement("img",{src:"img/banners/offer-1.jpg",alt:"supermarket"})),i.a.createElement("div",{className:"owl-item"},i.a.createElement("img",{src:"img/banners/offer-2.jpg",alt:"supermarket"})),i.a.createElement("div",{className:"owl-item"},i.a.createElement("img",{src:"img/banners/offer-3.jpg",alt:"supermarket"}))))})),a(2)),j=a.n(k),C=a(3),S=a(146),O=[{id:"1",title:"Brown eggs",type:"dairy",description:"Raw organic brown eggs in a basket",filename:"0.jpg",height:600,width:400,price:28.1,rating:4,qty:1},{id:"2",title:"Sweet fresh stawberry",type:"fruit",description:"Sweet fresh stawberry on the wooden table",filename:"1.jpg",height:450,width:299,price:29.45,rating:4,qty:1},{id:"3",title:"Asparagus",type:"vegetable",description:"Asparagus with ham on the wooden table",filename:"2.jpg",height:450,width:299,price:18.95,rating:3,qty:1},{id:"4",title:"Green smoothie",type:"dairy",description:"Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",filename:"3.jpg",height:600,width:399,price:17.68,rating:4,qty:1},{id:"5",title:"Raw legums",type:"vegetable",description:"Raw legums on the wooden table",filename:"4.jpg",height:450,width:299,price:17.11,rating:2,qty:1},{id:"6",title:"Baking cake",type:"dairy",description:"Baking cake in rural kitchen - dough  recipe ingredients (eggs, flour, sugar) on vintage wooden table from above.",filename:"5.jpg",height:450,width:675,price:11.14,rating:4,qty:1},{id:"7",title:"Pesto with basil",type:"vegetable",description:"Italian traditional pesto with basil, chesse and oil",filename:"6.jpg",height:450,width:299,price:18.19,rating:2,qty:1},{id:"8",title:"Hazelnut in black ceramic bowl",type:"vegetable",description:"Hazelnut in black ceramic bowl on old wooden background. forest wealth. rustic style. selective focus",filename:"7.jpg",height:450,width:301,price:27.35,rating:0,qty:1},{id:"9",title:"Fresh stawberry",type:"fruit",description:"Sweet fresh stawberry on the wooden table",filename:"8.jpg",height:600,width:399,price:28.59,rating:4,qty:1},{id:"10",title:"Lemon and salt",type:"fruit",description:"Rosemary, lemon and salt on the table",filename:"9.jpg",height:450,width:299,price:15.79,rating:5,qty:1},{id:"11",title:"Homemade bread",type:"bakery",description:"Homemade bread",filename:"10.jpg",height:450,width:301,price:17.48,rating:3,qty:1},{id:"12",title:"Legums",type:"vegetable",description:"Cooked legums on the wooden table",filename:"11.jpg",height:600,width:399,price:14.77,rating:0,qty:1},{id:"13",title:"Fresh tomato",type:"vegetable",description:"Fresh tomato juice with basil",filename:"12.jpg",height:600,width:903,price:16.3,rating:2,qty:1},{id:"14",title:"Healthy breakfast",type:"fruit",description:"Healthy breakfast set. rice cereal or porridge with berries and honey over rustic wood background",filename:"13.jpg",height:450,width:350,price:13.02,rating:2,qty:1},{id:"15",title:"Green beans",type:"vegetable",description:"Raw organic green beans ready to eat",filename:"14.jpg",height:450,width:300,price:28.79,rating:1,qty:1},{id:"16",title:"Baked stuffed portabello mushrooms",type:"bakery",description:"Homemade baked stuffed portabello mushrooms with spinach and cheese",filename:"15.jpg",height:600,width:400,price:20.31,rating:1,qty:1},{id:"17",title:"Strawberry jelly",type:"fruit",description:"Homemade organic strawberry jelly in a jar",filename:"16.jpg",height:400,width:600,price:14.18,rating:1,qty:1},{id:"18",title:"Pears juice",type:"fruit",description:"Fresh pears juice on the wooden table",filename:"17.jpg",height:600,width:398,price:19.49,rating:4,qty:1},{id:"19",title:"Fresh pears",type:"fruit",description:"Sweet fresh pears on the wooden table",filename:"18.jpg",height:600,width:398,price:15.12,rating:5,qty:1},{id:"20",title:"Caprese salad",type:"vegetable",description:"Homemade healthy caprese salad with tomato mozzarella and basil",filename:"19.jpg",height:400,width:600,price:16.76,rating:5,qty:1},{id:"21",title:"Oranges",type:"fruit",description:"Orange popsicle ice cream bars made from fresh oranges.  a refreshing summer treat.",filename:"20.jpg",height:450,width:274,price:21.48,rating:4,qty:1},{id:"22",title:"Vegan food",type:"vegetable",description:"Concept of vegan food",filename:"21.jpg",height:450,width:299,price:29.66,rating:4,qty:1},{id:"23",title:"Breakfast with muesli",type:"dairy",description:"Concept of healthy breakfast with muesli",filename:"22.jpg",height:450,width:299,price:22.7,rating:2,qty:1},{id:"24",title:"Honey",type:"bakery",description:"Honey and honeycell on the table",filename:"23.jpg",height:450,width:299,price:17.01,rating:2,qty:1},{id:"25",title:"Breakfast with cottage",type:"fruit",description:"Healthy breakfast with cottage cheese and strawberry",filename:"24.jpg",height:600,width:398,price:14.05,rating:1,qty:1},{id:"26",title:"Strawberry smoothie",type:"fruit",description:"Glass of red strawberry smoothie with chia seeds, served with retro cocktail tube, fresh mint and strawberries over dark background",filename:"25.jpg",height:600,width:400,price:28.86,rating:2,qty:1},{id:"27",title:"Strawberry and mint",type:"fruit",description:"Homemade muesli with strawberry and mint",filename:"26.jpg",height:450,width:299,price:26.21,rating:4,qty:1},{id:"28",title:"Ricotta",type:"dairy",description:"Ricotta with berry and mint",filename:"27.jpg",height:600,width:398,price:27.81,rating:5,qty:1},{id:"29",title:"Cuban sandwiche",type:"bakery",description:"Homemade traditional cuban sandwiches with ham pork and cheese",filename:"28.jpg",height:450,width:300,price:18.5,rating:4,qty:1},{id:"30",title:"Granola",type:"dairy",description:"Glass jar with homemade granola and yogurt with nuts, raspberries and blackberries on wooden cutting board over white textile in day light",filename:"29.jpg",height:450,width:300,price:29.97,rating:3,qty:1},{id:"31",title:"Smoothie with chia seeds",type:"fruit",description:"Glass of red strawberry smoothie with chia seeds, served with retro cocktail tube, fresh mint and strawberries over wooden table",filename:"30.jpg",height:600,width:900,price:25.26,rating:5,qty:1},{id:"32",title:"Yogurt",type:"dairy",description:"Homemade yogurt with raspberry and mint",filename:"31.jpg",height:450,width:299,price:27.61,rating:4,qty:1},{id:"33",title:"Sandwich with salad",type:"vegetable",description:"Vegan sandwich with salad, tomato and radish",filename:"32.jpg",height:600,width:398,price:22.48,rating:5,qty:1},{id:"34",title:"Cherry",type:"fruit",description:"Cherry with sugar on old table",filename:"33.jpg",height:600,width:400,price:14.35,rating:5,qty:1},{id:"35",title:"Raw asparagus",type:"vegetable",description:"Raw fresh asparagus salad with cheese and dressing",filename:"34.jpg",height:600,width:400,price:22.97,rating:4,qty:1},{id:"36",title:"Corn",type:"vegetable",description:"Grilled corn on the cob with salt and butter",filename:"35.jpg",height:450,width:300,price:13.55,rating:2,qty:1},{id:"37",title:"Vegan",type:"vegan",description:"Concept of healthy vegan eating",filename:"36.jpg",height:600,width:398,price:28.96,rating:5,qty:1},{id:"38",title:"Fresh blueberries",type:"fruit",description:"Healthy breakfast. berry crumble with fresh blueberries, raspberries, strawberries, almond, walnuts, pecans, yogurt, and mint in ceramic plates over white wooden surface, top view",filename:"37.jpg",height:450,width:321,price:21.01,rating:4,qty:1},{id:"39",title:"Smashed avocado",type:"fruit",description:"Vegan sandwiches with smashed avocado, tomatoes and radish. top view",filename:"38.jpg",height:450,width:450,price:25.88,rating:0,qty:1},{id:"40",title:"Italian ciabatta",type:"bakery",description:"Italian ciabatta bread cut in slices on wooden chopping board with herbs, garlic and olives over dark grunge backdrop, top view",filename:"39.jpg",height:450,width:565,price:15.18,rating:1,qty:1},{id:"41",title:"Rustic breakfast",type:"dairy",description:"Rustic healthy breakfast set. cooked buckwheat groats with milk and honey on dark grunge backdrop. top view, copy space",filename:"40.jpg",height:450,width:307,price:21.32,rating:0,qty:1},{id:"42",title:"Sliced lemons",type:"fruit",description:"Heap of whole and sliced lemons and limes with mint in vintage metal grid box over old wooden table with turquoise wooden background. dark rustic style.",filename:"41.jpg",height:600,width:900,price:27.14,rating:2,qty:1},{id:"43",title:"Plums",type:"fruit",description:"Yellow and red sweet plums",filename:"42.jpg",height:450,width:299,price:19.18,rating:1,qty:1},{id:"44",title:"French fries",type:"bakery",description:"Homemade oven baked french fries with ketchup",filename:"43.jpg",height:600,width:400,price:18.32,rating:3,qty:1},{id:"45",title:"Strawberries",type:"fruit",description:"Healthy breakfast set. rice cereal or porridge with fresh strawberry, apricots, almond and honey over white rustic wood backdrop, top view, \0",filename:"44.jpg",height:450,width:352,price:15.13,rating:3,qty:1},{id:"46",title:"Ground beef meat burger",type:"meat",description:"Raw ground beef meat burger steak cutlets with seasoning on vintage wooden boards, black background",filename:"45.jpg",height:450,width:675,price:11.73,rating:5,qty:1},{id:"47",title:"Tomatoes",type:"fruit",description:"Organic tomatoes made with love",filename:"46.jpg",height:450,width:675,price:26.03,rating:4,qty:1},{id:"48",title:"Basil",type:"vegetable",description:"Concept of vegan food with basil",filename:"47.jpg",height:450,width:678,price:15.19,rating:4,qty:1},{id:"49",title:"Fruits bouquet",type:"fruit",description:"Abstract citrus fruits bouquet on blue background",filename:"48.jpg",height:600,width:401,price:18.18,rating:1,qty:1},{id:"50",title:"Peaches on branch",type:"fruit",description:"Peaches on branch with leaves and glasses with peach juice and limonade with ice cubes in aluminum tray over old metal table. dark rustic style. top view.",filename:"49.jpg",height:600,width:400,price:25.62,rating:3,qty:1}],q=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).state={productlist:[],isloaded:!1},r}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=Object(C.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({productlist:O,isloaded:!0});case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.productlist,a={dots:!1,infinite:!1,speed:500,slidesToShow:5,slidesToScroll:4,initialSlide:0,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0,dots:!1}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:3,initialSlide:3}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return i.a.createElement("div",null,i.a.createElement("section",{className:"product-items-slider section-padding"},i.a.createElement("div",{className:"container",id:"header-category-bk"},i.a.createElement("div",{className:"section-header"},i.a.createElement("span",null,"For You"),i.a.createElement("h5",{className:"heading-design-h5"},"Grocery & Staples"," ")),i.a.createElement(w.a,a,this.state.isloaded?t.map((function(t,a){return i.a.createElement("div",{key:a,className:"item"},i.a.createElement("div",{className:"product"},i.a.createElement("div",{className:"product-header"},i.a.createElement("span",{className:"badge badge-success"},"Rating :   ",t.rating),i.a.createElement("span",{className:"d-none"},t.filename="https://picsum.photos/300/300?random=".concat(t.id)),i.a.createElement("img",{className:"img-fluid",src:t.filename,alt:"product"})),i.a.createElement("div",{className:"product-body"},i.a.createElement("h5",null,t.title),i.a.createElement("h6",null,i.a.createElement("strong",null,i.a.createElement("span",{className:"mdi mdi-approval"}))," ","- ",t.type)),i.a.createElement("div",{className:"product-footer"},i.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm float-right",onClick:function(){return e.props.addToCart(t)}},i.a.createElement("i",{className:"mdi mdi-cart-outline"})," Add To Cart"),i.a.createElement("p",{className:"offer-price mb-0"},"\u20b9",t.price," ",i.a.createElement("i",{className:"mdi mdi-tag-outline"}),i.a.createElement("br",null)))))})):i.a.createElement("div",{className:"progress-bar-bk"},i.a.createElement(S.a,{color:"secondary"}))))))}}]),a}(r.Component),x=Object(u.b)(null,{addToCart:h})(q),T=function(){return i.a.createElement("div",{className:"wrapper"},i.a.createElement(x,null))},I=a(63),G=a.n(I),A="localhost"===document.domain?"http://18.118.106.30:5000":"production",F={GetUserLogin:"".concat(A,"/api/customer/login"),GetUserRegsiter:"".concat(A,"/api/customer/register"),GetCustomerDetails:"".concat(A,"/api/customer/getUserByEmailId?email="),GetProductById:"".concat(A,"/api/product/getWebProductById?id="),GetAllGroceryStaple:"".concat(A,"/api/product/getAllGroceryStaple"),GetOrderCreateByUser:"".concat(A,"/api/order/create"),GetOrderByUser:"".concat(A,"/api/order/list"),GetFilterByCategory:"".concat(A,"/api/category/c"),GetCustomerUpdateDetails:"".concat(A,"/api/customer/update"),GetLocationListDetails:"".concat(A,"/api/location/list"),GetAreaListDetails:"".concat(A,"/api/location/area/list/getbyid?id="),GetProductByFilter:"".concat(A,"/api/product/gcatalogsearch/result?search="),GetCategoryListByFilter:"".concat(A,"/api/category/catlogsearch/child-category"),GetProductBySubcategory:"".concat(A,"/api/category/catlogsearch/product"),GetPaymentValue:"".concat(A,"/api/payment/orders"),GetPaymentVerification:"".concat(A,"/api/payment/verification"),GetPaymentOrderList:"".concat(A,"/api/payment/orderlist"),GetAllCategoryList:"".concat(A,"/v1/getCategory"),GetAllProductList:"".concat(A,"/v1/getproductbycategoryid/11")},B=G.a.create({baseURL:A,headers:{"Content-Type":"application/json"}}),P=(a(114),a(4)),R={getProductById:function(){var e=Object(C.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.get(F.GetProductById+t);case 3:if(!(a=e.sent).data.error){e.next=7;break}return P.NotificationManager.error(a.data.error),e.abrupt("return",null);case 7:return e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),getAllProductList:function(){var e=Object(C.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.get(F.GetAllProductList);case 3:if(!(a=e.sent).data.error){e.next=7;break}return P.NotificationManager.error(a.data.error),e.abrupt("return",null);case 7:return e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),getProductByFilter:function(){var e=Object(C.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.get(F.GetProductByFilter+t);case 3:if(!(a=e.sent).data.error){e.next=7;break}return P.NotificationManager.error(a.data.error),e.abrupt("return",null);case 7:return e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),getCategoryListByFilter:function(){var e=Object(C.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.post(F.GetCategoryListByFilter,t);case 3:if(!(a=e.sent).data.error){e.next=7;break}return P.NotificationManager.error(a.data.error),e.abrupt("return",null);case 7:return e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),getProductBySubcategory:function(){var e=Object(C.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.post(F.GetProductBySubcategory,t);case 3:if(!(a=e.sent).data.error){e.next=7;break}return P.NotificationManager.error(a.data.error),e.abrupt("return",null);case 7:return e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()},H={getAllCategoryList:function(){var e=Object(C.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.get(F.GetAllCategoryList);case 3:if(!(a=e.sent)){e.next=6;break}return e.abrupt("return",a);case 6:e.next=12;break;case 8:return e.prev=8,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),getFilterByCategory:function(){var e=Object(C.a)(j.a.mark((function e(t){var a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B.get(F.GetFilterByCategory+"/".concat(t.slug,"/").concat(t.id));case 3:if(!(a=e.sent).data.error){e.next=7;break}return P.NotificationManager.error(a.data.error),e.abrupt("return",null);case 7:return e.abrupt("return",a.data);case 10:return e.prev=10,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()},L=(a(129),a(147)),_=(a(130),function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).handleToggleButton=function(e){return function(t){r.setState({toggle:e})}},r.state={list:[],toggle:""},r}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=Object(C.a)(j.a.mark((function e(){var t,a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.location.href.split("/"),a=t.pop()||t.pop(),e.prev=2,e.next=5,H.getAllCategoryList(a);case 5:(r=e.sent)&&this.setState({list:r.data}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),P.NotificationManager.error("empty data in category","Undefined");case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"handleFilterCategory",value:function(){var e=Object(C.a)(j.a.mark((function e(t,a){var r,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={id:t.id,slug:a},e.next=3,H.getFilterByCategory(r);case 3:(i=e.sent)?this.props.onSelectFilterCategory(i):P.NotificationManager.error("empty data in category","Undefined");case 5:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.list;return i.a.createElement("div",null,i.a.createElement(L.a,{togglefilter:"offcanvas1",className:"filter-btn pull-bs-canvas-right",variant:"contained",color:"secondary"},"Filters"),i.a.createElement("div",{className:"bs-canvas bs-canvas-right position-fixed bg-cart h-100"},i.a.createElement("div",{className:"bs-canvas-header side-cart-header p-3 "},i.a.createElement("div",{className:"d-inline-block  main-cart-title"},"Filters"),i.a.createElement("button",{type:"button",className:"bs-canvas-close close","aria-label":"Close"},i.a.createElement("i",{className:"mdi mdi-close"}))),i.a.createElement("div",{className:"bs-canvas-body filter-body"},t?i.a.createElement("div",{className:"filter-items"},i.a.createElement("div",{className:"filtr-cate-title"},i.a.createElement("h4",null,t.name)),i.a.createElement("div",{className:"shop-filters filter-item-body"},i.a.createElement("div",{id:"accordion"},t.SubCategories?t.SubCategories.map((function(a,r){return i.a.createElement("div",{className:"card",key:r},i.a.createElement("div",{className:"card-header",id:"headingThree"},i.a.createElement("h5",{className:"mb-0"},i.a.createElement("button",{className:"btn btn-link",onClick:e.handleToggleButton(a.id)},a.sub_name," ",i.a.createElement("span",{className:"mdi mdi-chevron-down float-right"})))),a.SubChildCategories.map((function(a,r){return i.a.createElement("div",{key:r,id:"collapsefour",className:a.subcategoryId===e.state.toggle?"collapse show":"collapse"},i.a.createElement("div",{className:"card-body"},i.a.createElement("div",{className:"list-group bs-canvas-close","aria-label":"Close",onClick:e.handleFilterCategory.bind(e,a,t.slug)},i.a.createElement("span",{className:"list-group-item list-group-item-action"},a.name))))})))})):"loading"))):"")))}}]),a}(r.Component)),M=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(l.a)(this,a),(r=t.call(this,e)).onLoadMore=function(e){r.setState({limit:r.state.limit+6})},r.state={list:[],limit:12,isloaded:!1},r}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=Object(C.a)(j.a.mark((function e(){var t,a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return window.scrollTo(0,0),t=window.location.href.split("/"),a=t.pop()||t.pop(),e.prev=3,e.next=6,R.getAllProductList(a);case 6:(r=e.sent)&&this.setState({list:r,isloaded:!0}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),P.NotificationManager.error("Empty data in category","Data");case 13:case"end":return e.stop()}}),e,this,[[3,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"handleChangeByCategory",value:function(e){e&&this.setState({isloaded:!0,list:e.data})}},{key:"render",value:function(){var e=this,t=this.state,a=t.list,r=t.isloaded;t.limit;return i.a.createElement("div",null,i.a.createElement("section",{style:{height:"30px"},className:" page-info section-padding border-bottom bg-white single-product-header-bk"},i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("a",{href:"/"},i.a.createElement("strong",null,i.a.createElement("span",{className:"mdi mdi-home"})," Home")),i.a.createElement("span",{className:"mdi mdi-chevron-right"})," ",i.a.createElement("a",{href:"/"},window.history.state.state.category_name))))),i.a.createElement("div",{className:"all-product-grid"},i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-lg-12"},i.a.createElement("div",{className:"product-top-dt"},i.a.createElement("div",{className:"product-left-title"},i.a.createElement("h2",null,"All Products 125")),i.a.createElement(_,{onSelectFilterCategory:this.handleChangeByCategory.bind(this)}),i.a.createElement("div",{className:"product-sort"},i.a.createElement("select",{className:"form-control"},i.a.createElement("option",{className:"item",value:0},"Sort by Products"),i.a.createElement("option",{className:"item",value:1},"Price - Low to High"),i.a.createElement("option",{className:"item",value:2},"Price - High to Low"),i.a.createElement("option",{className:"item",value:3},"Alphabetical"),i.a.createElement("option",{className:"item",value:4},"Saving - High to Low"),i.a.createElement("option",{className:"item",value:5},"Saving - Low to High"),i.a.createElement("option",{className:"item",value:6},"% Off - High to Low")))))))),i.a.createElement("section",{className:"shop-list section-padding"},r?i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("div",{className:"row no-gutters"},a.map((function(t,a){return i.a.createElement("div",{key:a,className:"col-md-3 p-2"},i.a.createElement("div",{className:"item"},i.a.createElement("div",{className:"product"},i.a.createElement(E.b,{to:{pathname:"/p/".concat(t.slug,"/").concat(t.id),state:t}},i.a.createElement("div",{className:"product-header"},i.a.createElement("span",{className:"badge badge-success"},t.discountPer,"% OFF"),i.a.createElement("img",{className:"img-fluid",src:t.primary_image,alt:"product"}),i.a.createElement("span",{className:"veg text-success mdi mdi-circle"})),i.a.createElement("div",{className:"product-body"},i.a.createElement("h5",null,t.name),i.a.createElement("h6",null,i.a.createElement("strong",null,i.a.createElement("span",{className:"mdi mdi-approval"})," Available in")," - ",t.unitSize))),i.a.createElement("div",{className:"product-footer"},i.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm float-right",onClick:function(){return e.props.addToCart(t)}},i.a.createElement("i",{className:"mdi mdi-cart-outline"})," Add To Cart"),i.a.createElement("p",{className:"offer-price mb-0"},"\u20b9",t.product_name,"  ",i.a.createElement("i",{className:"mdi mdi-tag-outline"}),i.a.createElement("br",null),i.a.createElement("span",{className:"regular-price"},"\u20b9",t.price," "))))))}))),i.a.createElement("div",{class:"more-product-btn"},i.a.createElement("button",{class:"show-more-btn hover-btn",onClick:this.onLoadMore},"Show More"))))):i.a.createElement("div",{className:"progress-bar-bk"},i.a.createElement(S.a,{color:"secondary"}))))}}]),a}(r.Component),D=(Object(u.b)(null,{addToCart:h})(M),function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(f,null),i.a.createElement(m.c,null,i.a.createElement(m.a,{exact:!0,path:"/",component:T})))}}]),a}(r.Component)),U=(r.Component,a(131),a(24)),V=a(64),Y=a(65),J=Object(U.combineReducers)({cart:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cartItems:JSON.parse(localStorage.getItem("cartItems")||"[]")},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TO_CART":case"INCREASE_QUANTITY":case"DECREASE_QUANTITY":case"REMOVE_FROM_CART":return{cartItems:t.payload.cartItems};default:return e}}}),z=[Y.a],Q=Object(U.createStore)(J,{},Object(V.composeWithDevTools)(U.applyMiddleware.apply(void 0,z))),W=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement(u.a,{store:Q},i.a.createElement("div",{className:"App"},i.a.createElement(P.NotificationContainer,null),i.a.createElement(E.a,null,i.a.createElement(m.c,null,i.a.createElement(m.a,{path:"/",component:D})))))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(E.a,{basename:""},i.a.createElement(i.a.StrictMode,null,i.a.createElement(W,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},69:function(e,t,a){e.exports=a(132)}},[[69,1,2]]]);
//# sourceMappingURL=main.61be3feb.chunk.js.map