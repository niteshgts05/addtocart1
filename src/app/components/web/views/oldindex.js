import * as types from "../constants";
import * as moment from "moment";
import checksum_lib from "../assets/sdk/paytm/checksum/checksum";

//  FOR LOCAL MACHINE
let CROSS_ORIGIN_URL = "https://cors-anywhere.herokuapp.com/";
//  let DEV_URL = `${CROSS_ORIGIN_URL}https://api.admin.dairybuddy.com/`;

//  let DEV_URL_2x = `https://api.admin.dairybuddy.com/`;

// let DEV_URL = `https://api.admin.dairybuddy.com/`;


//let DEV_URL = `https://private.api.dairybuddy.com`; //--old
 //let DEV_URL = `https://sbapi.prod.dairybuddy.com`; //--new

 //let PARTNER_ID = 9;

let DEV_URL = window.atob(localStorage.getItem('EV_RL'))
let PARTNER_ID = localStorage.getItem('PARTNER_ID')

let PAYMENT_DEV_URL = DEV_URL;

let guestId = localStorage.getItem('guestId');
let groupId = localStorage.getItem('groupId')
if(!guestId){
  localStorage.clear()
}

//  NODE URL - PAYMENT

export let CASHFREE_PAYMENT_URL = `https://www.cashfree.com/checkout/post/submit`;

let PAYMENT_URL = `http://10.172.173.248:5000`;


// let GUEST_USER_BUILDING = "dc0a1e70-e07b-4eb8-8591-d79519f38b2a";
let GUEST_USER_BUILDING = "";

 //Get data from url 
 const urlParams = new URLSearchParams(window.location.search);
 const userid = urlParams.get('userid')
 const token = urlParams.get('token')
//  const redirecturl = urlParams.get('redirecturl');
 const redirecturl = "about-us";

 //.Get data from url

const userIdData = () => {
  try {
    let userId = localStorage.getItem("userId");
    if (userId !== null) {
      return userId;
    }
    else {
      const url = window.location.pathname;
      if (url === "/signup") {
      } else if (url !== "/login" && !groupId && !userid) {
        window.location.replace("/login");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

let userId = userIdData();
let cityId = 1;

/*
 *
 * name: homeData
 * desc: get Home Data and dispatch
 * @param: userId
 * @return: data
 * Created by Ashok on 19.08.2019
 *
 */

export const homeData =  () => async dispatch => {
  let getPartner = localStorage.getItem('getPartner');
  if(getPartner === undefined){
    logout()
  }
  //  APP LAUNCH DATA
 await appLaunchData();
 await getConfigData();
 await getPartnerdetails();
  let params = { id: userId, androidVersion: 9 };
  let post = postMethod(params);
  let url = `${DEV_URL}/home/user/home`;
  fetch(url, post)
    .then(res => res.json())
    .then(apiData => {
      if (apiData.data) {
        let { data, status } = apiData;
        localStorage.setItem('categoryData', JSON.stringify(data.productCategory));
        if (status === 1) {
          let { banner, bannerSecond, productCategory } = data;
          dispatch({ type: types.BANNER_LIST, payload: banner, status });
          dispatch({
            type: types.CATEGORY_LIST,
            payload: productCategory,
            status,
          });
          dispatch({
            type: types.SECOND_BANNER_LIST,
            payload: bannerSecond,
            status,
          });
          //  dispatch({type:types.FLASH_PRODUCT_LIST,payload:flashProductList,status});
        }
      }
    });
};

// Direct login

// export const sendDirectData = async(userid, token)=>{
//         localStorage.setItem('userId', userid);
//         localStorage.setItem('token', token);
// }
export const directLogin = (userid,verificationToken) => async dispatch => { 
  // let {userid,verificationToken} = data
  let params = { userId:userid, verificationToken };
  let url = `${DEV_URL}/user/userAutoLoginCheck`;
  let post = postMethod(params);
  const result = await (await fetch(url, post)).json();
  // alert(result)
  if (result.status === 0) {
    window.open(
      './login',
      '_self'
    )
    localStorage.clear()
    return false;
  }

  else if (result.status === 1) {
    await localStorage.setItem('result', JSON.stringify(result))
    await localStorage.setItem('userId', result.data.verifyOtpData.user.id);
    await localStorage.setItem('userToken', result.data.verifyOtpData.token);
    await localStorage.setItem('userStatus', result.data.verifyOtpData.user.userStatus);
    await localStorage.setItem('profileData', window.btoa(JSON.stringify(result.data.profileDate.data)));
    await localStorage.setItem('userAppData', JSON.stringify(result.data.launchData.data));
    await localStorage.setItem('userData', window.btoa(JSON.stringify(result.data.verifyOtpData.user)));
    await localStorage.setItem('guestId', 1);
    await localStorage.setItem('chatPopUp', 1);
    await getConfigData();
    await getPartnerdetails();
    return result;

  }
};

// Direct login


export const fetchRefreshData = () => {
  // appLaunchData();
}

const appLaunchData = async () => {
  let url = `${DEV_URL}/user/appLaunchData?userId=${userId}`;
  const result = await (await fetch(url, getMethod())).json();
  if (result.data) {
    let { data, status } = result;
    if (status === 1) {
      await localStorage.setItem("userAppData", JSON.stringify(data));
      return data;
    }
  }
};

const getConfigData = async () => {
  let url = `${DEV_URL}/partner/getConfig/${PARTNER_ID}`;
  const result = await (await fetch(url, getMethod())).json();
  if (result.data) {
    let { data, status } = result;
    if (status === 1) {
      // await localStorage.setItem("configData", window.btoa(JSON.stringify(data)));

      await localStorage.setItem("configData", window.btoa(encodeURIComponent(JSON.stringify(data)).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }
      )));
      // for guest user login
      let userId = localStorage.getItem('userId');
      if (userId === null) {
        let configData = JSON.parse(window.atob(localStorage.getItem('configData')))
        userId = configData.guestUserId;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userStatus', 4);
        localStorage.setItem('guestId', userId)
        window.location.reload(false);
      }
      // for guest user login
      return data;
    }
  }
};

const getPartnerdetails= async () => {
  let url = `${DEV_URL}/partner/getPartner`;
  const result = await (await fetch(url, getMethod())).json();
  if (result.data) {
    let { data, status } = result;
    if (status === 1) {
      
      // await localStorage.setItem("getPartner", window.btoa(JSON.stringify(data)));
      await localStorage.setItem("getPartner", window.btoa(encodeURIComponent(JSON.stringify(data)).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }
      )));
      getConfigData()
      return data;
    }
  }
};

export const getPartnerdetails1 = (id)=> async dispatch => {
  PARTNER_ID = id
  await localStorage.setItem('PARTNER_ID',id)
  let url = `${DEV_URL}/partner/getPartner`;
  const result = await (await fetch(url, getMethod())).json();
  if (result.data) {
    let { data, status } = result;
    if (status === 1) {
      
      // await localStorage.setItem("getPartner", window.btoa(JSON.stringify(data)));
      await localStorage.setItem("getPartner", window.btoa(encodeURIComponent(JSON.stringify(data)).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }
      )));
      getConfigData();
      return data;
    }
  }
};


export const getPartner= () => async dispatch => {
  let url = `${DEV_URL}/partner/getPartner`;
  const result = await (await fetch(url, getMethod())).json();
  if (result.data) {
    let { data, status } = result;
    if (status === 1) {
      await localStorage.setItem("getPartner", window.btoa(encodeURIComponent(JSON.stringify(data)).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }
      )));
      // await localStorage.setItem("getPartner", window.btoa(JSON.stringify(data)));
      getConfigData()
      return data;
    }
  }
};



export const getUdateUserAppDataExport = () => () => {
  return getUdateUserAppData();
};

/*
 *
 * name: flashProduct
 * desc: get Flash Product List and dispatch data
 * @param: userId
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */

export const flashProduct = () => async dispatch => {
  let url = `${DEV_URL}/offer/getFlashOffers/v3`;
  try {
    let params = { userId };
    let userData = await getUdateUserAppData();
    if (userData.building) {
      let { cityId, buildingId } = userData.building;
      params = { ...params, cityId, buildingId };
      let post = postMethod(params);
      const result = await (await fetch(url, post)).json();
      if (result && result.data !== undefined) {
        let { data, status } = result;
        dispatch({ type: types.FLASH_PRODUCT_LIST, payload: data, status });
      }
    }
  } catch (err) {
    console.log(err);
  }
};


/*
 *
 * name: addToCart
 * desc: Add product to the cart
 * @param: product - {}
 * @return: dispatch data
 * Created by Ashok on 28.08.2019
 *
 */

export const addToCart = (product) => async (dispatch, getState) => {
  // console.log("cart product" + JSON.stringify(product));
  await setLocalStorageData({ key: "cart product", value: JSON.stringify(product) });
  // console.log("cart product count" + JSON.stringify(product.count));

  // console.log("cart count" + product.count);
  if (product !== undefined && product !== null) {
    //  PRODUCT LIST
    let cartList = await getState().cart.cart_product_list;
    // console.log(cartList)
    let result = await updateCart({ product, cartList, type: 1 });
    if (result) {
      let { cartList, subTotal } = result;
      //  STORE SUBTOTAL DATA
      await setLocalStorageData({ key: "cartSubTotal", value: subTotal });
      dispatch({ type: types.CART_SUB_TOTAL, payload: subTotal });
      localStorage.setItem("cart_product_list", JSON.stringify(cartList));
      dispatch({ type: types.CART_PRODUCT_LIST, payload: cartList });
      dispatch({ type: types.CART_COUNT, payload: cartList.length });
    }
  }
};

/*
 *
 * name: updateCart
 * desc: common func for add & remove cart
 * @param: cartList,product,type-[1-ADD, 2-REMOVE]
 * @return: dispatch data
 * Created by Ashok on 28.08.2019
 *
 */
const updateCart = async ({ cartList, product, type }) => {
  let { id, productUnitPrice, productCategory } = product;

  //  NON MILK PRODUCT
  if (productCategory !== 1) {
    //  simply
  }

  let cartData = {};
  if (cartList.length > 0) {
    cartData = cartList.find(p => p.productMasterId === id);
    if (cartData == undefined || cartData == null) {
      cartData = {};
    }
  }
  let quantity = 1;

  //  CHECK CART DATA ARRAY LENGTH
  if (Object.keys(cartData).length > 0) {
    if (type === 1) {
      cartData.quantity += 1; //  INCREMENT
    } else {
      cartData.quantity -= 1; //  DECREMENT
    }
    cartData.price = cartData.quantity * productUnitPrice;
  } else if (type === 1) {
    let price = quantity * productUnitPrice;
    let newCartProduct = { productMasterId: id, quantity, price };
    await cartList.push(newCartProduct);
  }
  cartList = await cartList.filter(c => c.quantity > 0);

  let subTotal = 0;
  if (cartList.length > 0) {
    await cartList.forEach(product => {
      subTotal += product.price;
    });
  }

  return { cartList, subTotal };
};

/*
 *
 * name: removeProduct
 * desc: remove product from the cart
 * @param: product - {}
 * @return: dispatch data
 * Created by Ashok on 28.08.2019
 *
 */
export const removeProduct = product => async (dispatch, getState) => {
  if (product !== undefined && product !== null) {
    //  PRODUCT LIST
    let cartList = await getState().cart.cart_product_list;

    let result = await updateCart({ product, cartList, type: 2 });
    if (result) {
      let { cartList, subTotal } = result;

      //  STORE SUBTOTAL DATA
      await setLocalStorageData({ key: "cartSubTotal", value: subTotal });
      dispatch({ type: types.CART_SUB_TOTAL, payload: subTotal });

      localStorage.setItem("cart_product_list", JSON.stringify(cartList));
      dispatch({ type: types.CART_PRODUCT_LIST, payload: cartList });
      dispatch({ type: types.CART_COUNT, payload: cartList.length });
    }
  }
};

/*
 *
 * name: computeCart
 * desc: send products to server, get response & store data in local
 * @param: -
 * @return: dispatch data
 * Created by Ashok on 29.08.2019
 *
 */
export const computeCart = (orderType) => async (dispatch, getState) => {
  //  PRODUCT LIST
  let cartItemList = await getState().cart.cart_product_list;
  //  let cartListEnc = JSON.stringify(cartList);
  let subscriptionType = orderType

  let params = { userId, cartItemList, subscriptionType };
  let url = `${DEV_URL}/cart/computeCart/v5`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    let subsList = [];
    let deliveryCharge = 0,
      cartSubTotal = 0,
      cartTotal = 0;
    if (result) {
      subsList = result.subsList;
      deliveryCharge = result.deliveryCharge;
      //  let {offers} = result;
      if (subsList && subsList.length > 0) {
        //  CALCULATE SUBTOTAL & DETAILS
        cartSubTotal = 0;
        await subsList.forEach(product => {
          cartSubTotal += product.productUnitPrice * product.quantity;
        });
        cartSubTotal = parseFloat(cartSubTotal);
        deliveryCharge = parseFloat(deliveryCharge);
        cartTotal = deliveryCharge + cartSubTotal;
      } else {
        subsList = [];
      }
    }

    //  DISPATCH CART PRODUCT LIST
    localStorage.setItem("cart_computed_list", JSON.stringify(subsList));
    dispatch({ type: types.CART_COMPUTED_LIST, payload: subsList });
    dispatch({ type: types.CART_COMPUTED_ARR, payload: result });

    //  DISPATCH - DELIVERY, CART CHARGE DETAILS
    dispatch({ type: types.DELIVERY_CHARGE, payload: deliveryCharge });
    dispatch({ type: types.CART_SUB_TOTAL, payload: cartSubTotal });
    dispatch({ type: types.CART_TOTAL, payload: cartTotal });
  } catch (err) {
    console.log(err);
  }
};




/*
 *
 * name: checkoutCart
 * desc: send products to server & get response & remove data in local === response - 1
 * @param: -
 * @return: dispatch data
 * Created by Ashok on 30.08.2019
 *
 */
export const checkoutCart = (selectedDate, futureDate, orderType) => async (dispatch, getState) => {
  //  PRODUCT LIST
  let enableBulk = localStorage.getItem('enableBulk');
  let cartItemList = await getState().cart.cart_product_list;
  let orderDate = selectedDate;
  let subscriptionType = orderType;
  let params = { userId, cartItemList, orderDate, subscriptionType };
  let url = `${DEV_URL}/cart/checkout/v5`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    let { status, message, rechargeAmount, data } = result;
    const currentBalance = localStorage.getItem('currentBalance')
    if (rechargeAmount) {
      window.location.replace(`/wallet-checkout/?rechargeAmount=${rechargeAmount}`)
    }
    let responseType = 0,
      subsList = [];

    if (status === 0) {
      responseType = 3;
      dispatch({ type: types.CHECKOUT_RESPONE, payload: { message } });
    }

    else if (status === 1) {
      responseType = 1;

      //  REMOVE ALL CART DETAILS FROM REDUX STATE & LOCAL STORAGE & DISPATCH
      localStorage.setItem("cart_computed_list", JSON.stringify(subsList));
      localStorage.setItem("cart_product_list", JSON.stringify(subsList));
      dispatch({ type: types.CART_COMPUTED_LIST, payload: subsList });
      dispatch({ type: types.CART_COMPUTED_ARR, payload: subsList });

      //  DISPATCH - DELIVERY, CART CHARGE DETAILS
      dispatch({ type: types.DELIVERY_CHARGE, payload: 0 });
      dispatch({ type: types.CART_SUB_TOTAL, payload: 0 });
      dispatch({ type: types.CART_TOTAL, payload: 0 });

      message = "Your Order has been placed successfully";
      if (enableBulk === 'true') {
        message = result.message;
        localStorage.setItem('enableBulk', false);
      }
      dispatch({ type: types.CHECKOUT_RESPONE, payload: { message } });
    } else {
      dispatch({ type: types.CHECKOUT_RESPONE, payload: { message } });
    }

    //  DISPATCH RESPONSE
    dispatch({ type: types.CHECKOUT_RESPONSE_TYPE, payload: responseType });
    dispatch({ type: types.CHECKOUT_MODAL_SHOW });

    if (data.nextAvailbleDate) {
      return (data.nextAvailbleDate)
    }
  }
  catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: modalShowHide
 * desc: show & hide Modal
 * @param: Type
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */
export const modalShowHide = type => async dispatch => {
  try {
    let constantType = "";
    if (type === 1) {
      constantType = types.CHECKOUT_MODAL_SHOW;
    } else if (type === 2) {
      constantType = types.SUBSCRIPTION_MODAL_SHOW;
    } else if (type === 3) {
      constantType = types.SCHEDULE_MODAL_SHOW;
    } else if (type === 4) {
      constantType = types.MY_SUBSCRIPTION_MODAL_SHOW;
    } else if (type === 5) {
      constantType = types.REASON_LIST_MODAL_SHOW;
      dispatch({ type: types.REASON_TEXT, payload: 1 });
    } else if (type === 6) {
      constantType = types.COMMON_MODAL_SHOW;
    }

    if (constantType !== null) {
      dispatch({ type: constantType });
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: getBannerProducts
 * desc: get banner products and dispatch data
 * @param: urlIndex
 * @return: data
 * Created by Ashok on 20.08.2019
 *
 */

export const getBannerProducts = urlIndex => async dispatch => {
  dispatch({ type: types.LOADING, payload: 1 });
  try {
    if (urlIndex !== undefined) {
      let url = `${DEV_URL}${urlIndex}`;
      const data = await (await fetch(url)).json();
      dispatch({ type: types.BANNER_PRODUCTS, payload: data, status: 1 });
      dispatch({ type: types.LOADING, payload: 0 });
    }
  } catch (err) {
    console.log("ERR");
  }
};

/*
 *
 * name: post method
 * desc: post params
 * @param: params
 * @return: get param,method,attach it and return as object
 * Created by Ashok on 20.08.2019
 *
 */
const postMethod = (params, type = 1) => {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      partnerId: PARTNER_ID,
      deviceType: "WEB",
      version: "1",
    },
    body: JSON.stringify(params),
  };
};

const getMethod = () => {
  return {
    method: "GET",
    headers: {
      partnerId: PARTNER_ID,
      deviceType: "WEB",
    },
  };
};

/*
 *
 * name: getSubCategoryProducts
 * desc: get sub category products and return data
 * @param: {productCategoryId,productSubCategoryId}
 * @return: data [bannerList,productList]
 * Created by Ashok on 20.08.2019
 *
 */
export const getSubCategoryProducts = data => async dispatch => {
  let { productCategoryId, productSubCategoryId } = data;
  let params = {
    userId,
    productCategory: parseInt(productCategoryId),
    productSubCategory: parseInt(productSubCategoryId),
  };
  let url = `${DEV_URL}/productMaster/getProductsByCategory/v2`;
  let post = postMethod(params);
  const result = await (await fetch(url, post)).json();
  if (result) return result;
};

/*
 *
 * name: getEssentialProducts
 * desc: get essentials products and Dispatch data
 * @param: -
 * @return: dispatch data
 * Created by Ashok on 20.08.2019
 *
 */
export const getEssentialProducts = ({ getAllProducts }) => async dispatch => {
  if (getAllProducts === undefined) {
    getAllProducts = false;
  }
  let params = { userId, getAllProducts };
  let url = `${DEV_URL}/offer/getPopularProducts`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    if (result) {
      let { data, status } = result;
      if (status === 1) {
        dispatch({ type: types.ESSENTIAL_PRODUCT_LIST, payload: data, status });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: getNewArrivals
 * desc: get New Arrival Vendor and Dispatch data
 * @param: -
 * @return: dispatch data
 * Created by Ashok on 20.08.2019
 *
 */
export const getNewArrivals = () => async dispatch => {
  let params = { userId };
  let url = `${DEV_URL}/productBrand/userHomePageData`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    if (result) {
      let { newArrivals, status } = result;
      if (status === 1) {
        dispatch({
          type: types.NEW_ARRIVAL_LIST,
          payload: newArrivals,
          status,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: notificationData
 * desc: Post userId and return notification Details
 * @param: -
 * @return: notification Details
 * Created by Rakesh Kumar Pradhan on 20.11.2020
 *
 */
export const notificationData = () => async dispatch => {
  // alert(userId+"welcome")
  let params = { userId };
  let url = `${DEV_URL}/notification/fetchUserNotificationLog`;
  let post = postMethod(params);

  const result = await (await fetch(url, post)).json();
  await setLocalStorageData({ key: "notificationData", value: JSON.stringify(result) });
  if (result) {
    return result.data;
  }
};


/*
 *
 * name: getNewArrivalDetail
 * desc: get New Arrival Vendord detail and return data
 * @param: -
 * @return: vendor, product details
 * Created by Ashok on 21.08.2019
 *
 */
export const getNewArrivalDetail = paramData => async dispatch => {
  let params = { ...paramData, userId };
  let url = `${DEV_URL}/productBrand/getNewArrivalDetails`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    if (result) return result;
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: getSmartCart
 * desc: get Smart Cart Product List and return data
 * @param: -
 * @return: data - [products,mainMessage,subMessages]
 * Created by Ashok on 21.08.2019
 *
 */
export const getSmartCart = () => async () => {
  let url = `${DEV_URL}/productMaster/getRecentProductsByUserId/${userId}`;
  try {
    const result = await (await fetch(url)).json();
    if (result) return result;
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: applyCoupon
 * desc: get Smart Cart Product List and return,dispatch data
 * @param: - userId,amount,offerCode
 * @return: data
 * Created by Ashok on 23.08.2019
 *
 */
export const applyCoupon = paramData => async (dispatch) => {
  // console.log(paramData);
  // let couponList = await getCouponMrpList();
  // console.log(couponList);

  // let couponData = couponList.find(coupon => coupon.couponName === paramData.offerCode);
  // if (Object.keys(couponData).length > 0) {
  //   console.log(couponData);
  //   dispatch({ type: types.APPLIED_COUPON_MRP, payload: couponData });
  //   return {
  //     data: couponData,
  //     status: 1,
  //     message: "Coupon applied successfully",
  //   };
  // }

    let params = {...paramData,id:userId};
    let url = `${DEV_URL}/billingMaster/applyRechargeOffer`;
    try{
        let post = postMethod(params);
        const result = await( await fetch(url,post)).json();
        console.log(result);
        if(result){
            if(result.status === 1){
                //  DISPATCH DATA
                localStorage.setItem('offerCode',paramData.offerCode)
                dispatch({type: types.APPLIED_COUPON, payload:paramData.offerCode})
                dispatch({ type: types.APPLIED_COUPON_MRP, payload: result });
                // dispatch({ type: types.COUPON_RESPONE, payload: "dasjdklasjkldj" });

            }
            return result;
        }
    }catch(err){
        console.log(err);
    }

};

/*
 *
 * name: verifySubscriptionCoupon
 * desc: verify Subscription Coupon, if coupon exists, coupon will be applied
 * @param: - userId,offerCode
 * @return: data
 * Created by Ashok on 16.09.2019
 *
 */
export const verifySubscriptionCoupon = paramData => async (dispatch, getState) => {
  console.log(paramData);

  let { subscriptionCouponCode: couponCode } = paramData;

  let product = getState().subscribe.subscription_product_data;
  if (Object.keys(product).length > 0) {
    let params = { couponCode, userId, productMasterId: product.id };
    console.log(params);
    let url = `${DEV_URL}/offer/validateSubscriptionCoupon`;
    try {
      let post = postMethod(params);
      const result = await (await fetch(url, post)).json();
      console.log(result);
      if (result) {
        let { status } = result;
        let data = [];
        let message = "Invalid coupon";
        if (status === 1) {
          message = "Coupon applied successfully";
          //  DISPATCH DATA
        }
        return { data, status, message };
      }
    } catch (err) {
      console.log(err);
    }
  }
};

/*
 *
 * name: getBillingMasterBalanceData
 * desc: call wallet data function, get Billing Master data and return,dispatch data
 * @param: - userId,amount,offerCode
 * @return: data
 * Created by Ashok on 23.08.2019
 *
 */
export const getBillingMasterBalanceData = () => async dispatch => {
  dispatch({ type: types.LOADING, payload: 1 });
  let data = await walletData();
  if (data) {
    setWalletAmount(data);
    dispatch({ type: types.BILLING_MASTER_BALANCE_DATA, payload: data });
    dispatch({ type: types.LOADING, payload: 0 });
    return data;
  }
};

/*
 *
 * name: walletData
 * desc: get Wallet and return data
 * @param:userId
 * @return: data
 * Created by Ashok on 23.08.2019
 *
 */
const walletData = async () => {
  let params = { id: userId };
  let url = `${DEV_URL}/billingMaster/getBillingPageDataV2`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    if (result) {
      // alert(JSON.stringify(result))
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: couponBanner
 * desc: get Coupon banner and dispatch data
 * @param: cityId
 * @return: data
 * Created by Ashok on 23.08.2019
 *
 */
export const couponBanner = () => async dispatch => {
  let url = `${DEV_URL}/offer/payment/city/${cityId}`;
  try {
    const result = await (await fetch(url, getMethod())).json();
    if (result && result.status === 1) {
      dispatch({ type: types.COUPON_BANNER, payload: result.data });
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: billingHistory
 * desc: get Billing History List and return,dispatch data
 * @param:userId
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */
export const billingHistory = (paginateUrl = "") => async dispatch => {
  let urlData = `/billingLog/findByUserPaginated/v2/${userId}`;
  let recordType = 1; //  FIRST ARR
  if (paginateUrl !== "") {
    urlData = paginateUrl;
    recordType = 2; //  NTH ARR
  }
  let url = `${DEV_URL}${urlData}`;
  try {
    const result = await (await fetch(url)).json();
    if (result) {
      dispatch({ type: types.BILLING_HISTORY_ARR, payload: result });
      dispatch({
        type: types.BILLING_HISTORY,
        payload: result.result,
        recordType,
      });

      //  UPDATE PAGINATION URL
      let nextPaginationUrl = "";
      if (result.pagination !== undefined) {
        if (result.pagination.next !== undefined) {
          nextPaginationUrl = result.pagination.next;
        }
      }
      dispatch({
        type: types.BILLING_HISTORY_NEXT_URL,
        payload: nextPaginationUrl,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: getCouponMrpList
 * desc: get Billing History List and dispatch data
 * @param:userId
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */

const getCouponMrpList = async () => {
  let url = `${DEV_URL}/offer/list/recharge/mrpDiscount`;
  let params = { userId };
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    if (result && result.offerList !== undefined) {
      return result.offerList;
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: couponMrpList
 * desc: Get Coupon List and dispatch data
 * @param: -
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */
export const couponMrpList = () => async dispatch => {
  try {
    let result = await getCouponMrpList();
    if (result) {
      dispatch({ type: types.COUPON_LIST, payload: result });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: removeCoupon
 * desc: remove coupon from redux state
 * @param: Type - [1 - MRP DISC COUP, 2 - COUPON ]
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */
export const removeCoupon = (data = 1) => async dispatch => {
  try {
    dispatch({ type: types.COUPON_RESPONSE_TYPE, payload: 2 });
    dispatch({ type: types.REMOVE_COUPON, payload: data });
    dispatch({ type: types.COUPON_MODAL_SHOW });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: removeCoupon
 * desc: remove coupon from redux state
 * @param:Type - [1 - MRP DISC COUP, 2 - COUPON ]
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */
export const couponModalShowHide = () => async dispatch => {
  try {
    dispatch({ type: types.COUPON_MODAL_SHOW });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: removeCoupon
 * desc: remove coupon from redux state
 * @param: Type - [1 - MRP DISC COUP, 2 - COUPON ]
 * @return: data
 * Created by Ashok on 26.08.2019
 *
 */
export const changeCouponResponse = (data = 1) => async dispatch => {
  try {
    dispatch({ type: types.COUPON_RESPONSE_TYPE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

// export const changeCouponResponse1 = (data) => async dispatch => {
//   console.log(data)
//   console.log(data.couponResponse)
//   try {
//     dispatch({ type: types.COUPON_RESPONSE_TYPE, payload: data.modalType });
//     dispatch({ type: types.COUPON_RESPONE, payload: data.couponResponse });
//   } catch (err) {
//     console.log(err);
//   }
// };

/*
 *
 * name: setSubscriptionDate
 * desc: dispatch Subscription Date to redux state
 * @param: DATE
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */
export const setSubscriptionDate = date => async dispatch => {
  try {
    dispatch({ type: types.SUBSCRIPTION_DATE, payload: date });
    //  calendarDaysList()();
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: setSubscriptionType
 * desc: dispatch Subscription Type to redux state
 * @param: TYPE [0,1,2,3]
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */
export const setSubscriptionType = type => async dispatch => {
  try {
    dispatch({ type: types.SUBSCRIPTION_TYPE, payload: type });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: setSubscriptionProductData
 * desc: dispatch Subscription product to redux state
 * @param: product data
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */
export const setSubscriptionProductData = product => async dispatch => {
  try {
    dispatch({ type: types.SUBSCRIPTION_PRODUCT_DATA, payload: product });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: setSubscriptionProductData
 * desc: dispatch Subscription product to redux state
 * @param: product data
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */
export const setSubscriptionProductQty = quantity => async dispatch => {
  try {
    dispatch({ type: types.SUBSCRIPTION_PRODUCT_QTY, payload: quantity });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: setSubscriptionType
 * desc: dispatch Subscription Type to redux state
 * @param: TYPE [0,1,2,3]
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */
export const setSubscriptionDaysList = () => async (dispatch, getState) => {
  try {
    let { subscriptionDate, subscriptionType } = await getState().subscribe;

    //  GET SUNDAY - THIS WEEK
    let sunday = moment(subscriptionDate).day(0);
    const futureDays = [...Array(21).keys()];

    let selectedDay = moment(subscriptionDate);
    let selectedDayFormat = moment(subscriptionDate).format("DDD");
    let selectedDayWeekNum = moment(subscriptionDate).day();

    let pastDate = true;
    let caseType = subscriptionType;
    let selected = false;

    let next3Days = [...Array(10).keys()];
    selectedDayFormat = parseInt(selectedDayFormat);

    let nextDaysArr = [],
      daysList = [];
    let day = selectedDayFormat;
    await next3Days.forEach(key => {
      nextDaysArr.push(day);
      day += 3;
    });

    //  CHECK PAST DATE
    await futureDays.forEach(key => {
      let date = moment(sunday).add(key, "day");
      let thisDayFormat = moment(date).format("DDD");
      let thisDayWeekNum = moment(date).day();
      if (thisDayFormat >= selectedDayFormat) {
        pastDate = false;
        if (caseType === "1") {
          selected = true;
        } else if (caseType === "2") {
          selected = !selected;
        } else if (caseType === "3") {
          thisDayFormat = parseInt(thisDayFormat);
          let check = nextDaysArr.find(day => day === thisDayFormat);
          selected = false;
          if (check !== undefined) {
            selected = true;
          }
        } else if (caseType === "7") {
          selected = thisDayWeekNum === selectedDayWeekNum ? true : false;
        }
      }
      daysList.push({ date: date, pastDate, selected });
    });
    // console.log(daysList);
    dispatch({ type: types.SUBSCRIPTION_DAYS_LIST, payload: daysList });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: subscribeProduct
 * desc: get data & update to backend
 * @param: userId,cityId,
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */

export const subscribeProduct = () => async (dispatch, getState) => {
  try {
    let url = `${DEV_URL}/subscriptionMaster/create/v3`;
    let { subscription_product_data, subscription_product_qty, subscriptionDate, subscriptionType } = await getState().subscribe;

    let productMaster = subscription_product_data.id;
    let productQuantity = subscription_product_qty;
    let startDate = moment(subscriptionDate).format("YYYY-MM-DD");
    subscriptionType = parseInt(subscriptionType);

    let params = {
      userId,
      startDate,
      productMaster,
      productQuantity,
      subscriptionType,
    };
    let post = postMethod(params);

    let responseType = 0;
    const result = await (await fetch(url, post)).json();
    console.log(result);

    let { status, message } = result;
    if (status === 1) {
      responseType = 1;
      message = "Subscription added";
    }
    //  DISPATCH RESPONSE
    //  dispatch({type:types.SUBSCRIPTION_MODAL_SHOW}); //  CLOSE COND MODAL
    dispatch({ type: types.SUBSCRIPTION_MODAL_TYPE, payload: 2 });
    dispatch({ type: types.SUBSCRIPTION_RESPONE, payload: { message } });
    dispatch({ type: types.SUBSCRIPTION_RESPONSE_TYPE, payload: responseType });
    //  dispatch({type:types.SUBSCRIPTION_MODAL_SHOW}); //  OPEN MODAL
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: support
 * desc: dispatch Support Data to redux state
 * @param: userId & cityId
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */

export const support = () => async dispatch => {
  try {
    let url = `${DEV_URL}/support/faq_options/orders`;
    let userData = await getUdateUserAppData();
    if (userData.building) {
      let { cityId } = userData.building;
      let params = { userId, cityId };
      let post = postMethod(params);
      const result = await (await fetch(url, post)).json();
      if (result && result.status === true) {
        dispatch({ type: types.SUPPORT, payload: result });
        dispatch({ type: types.FAQ_LIST, payload: result.faq });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: schduleCalendarData
 * desc: dispatch Schdule Calendar Data to redux state
 * @param: userId,startDate,endDate
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */

export const schduleCalendarData = data => async dispatch => {

  try {
    // let url = `${DEV_URL}/calendar/getCalendarByDateRange`;
    let url = `${DEV_URL}/calendar/getCalendarByDateRange/v2`;

    let startDate, endDate;

    let type = 2;
    if (data !== undefined) {
      startDate = data.startDate;
      endDate = data.endDate;
      type = 1;
    } else {
      //  HOME PAGE
      startDate = moment().add(1, "day");
      endDate = startDate;
    }
    startDate = moment(startDate).format("YYYY-MM-DD");
    endDate = moment(endDate).format("YYYY-MM-DD");
    let params = { userId, startDate, endDate };
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    await setLocalStorageData({ key: "schduleCalendarData", value: JSON.stringify(result) });

    if (result) {
      if (type === 1) {
        await result.forEach(res => (res.updateData = []));
        dispatch({ type: types.SCHEDULE_CALENDAR_LIST, payload: result });
      } else if (type === 2) {
        if (result.length > 0) {
          dispatch({ type: types.SCHEDULE_CALENDAR_DATA, payload: result[0] });
        }
        return result;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: schduleCalendarData
 * desc: dispatch Schdule Calendar Data to redux state
 * @param: userId,startDate,endDate
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */

export const updateSubscriptionData = (subscriptionProducts, data, key, subscriptions) => async dispatch => {
  try {
    let { product, type } = data;

    await subscriptionProducts.forEach(sub => {
      if (sub.id === product.id) {
        console.log("coming");
        let productQuantity;
        if (type === 1) {
          productQuantity = sub.productQuantity + 1;
        } else {
          productQuantity = sub.productQuantity - 1;
        }
        sub.productQuantity = productQuantity;
        sub.newCount = sub.productQuantity;
      } else {
        sub.newCount = sub.productQuantity;
      }
    });
    console.log(subscriptionProducts);
    console.log(subscriptions);
    let newData = await subscriptionProducts.filter(sub => sub.count != sub.productQuantity);
    console.log(newData);
    dispatch({
      type: types.SCHEDULE_CALENDAR_UPDATE_DATA,
      payload: newData,
      key,
    });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: updateCalendarData
 * desc: dispatch Schdule Calendar Data to redux state
 * @param: userId,startDate,endDate
 * @return: data
 * Created by Ashok on 03.09.2019
 *
 */

export const updateCalendarData = data => async (dispatch, getState) => {
  try {
    if (data !== undefined) {
      let { key1 } = data;
      let { scheduleCalendarList, scheduleCalendarUpdateData } = getState().schedule;
      if (scheduleCalendarList.length > 0) {
        let scheduleCalendarData = scheduleCalendarList[key1];
        if (scheduleCalendarData) {
          let { updateData, date } = scheduleCalendarData;
          if (updateData.length > 0) {
            console.log(scheduleCalendarUpdateData);
            let stringDate = date;
            let subscriptionUpdateList = [];

            //  FORM NEW ARRAY
            for (var value of scheduleCalendarUpdateData) {
              console.log(value);
              var newElement = {};
              newElement["subscriptionMasterId"] = value.id;
              newElement["quantity"] = value.productQuantity;
              newElement["stringDate"] = stringDate;
              newElement["productName"] = value.productName;
              let type = false;
              if (value.count < value.productQuantity) {
                type = true;
              }
              newElement["increased"] = type;
              subscriptionUpdateList.push(newElement);
            }

            //  API CALL
            let params = subscriptionUpdateList;
            let url = `${DEV_URL}/subscriptionException/updateSubscription/v2`;
            let post = postMethod(params);
            const result = await (await fetch(url, post)).json();
            console.log(result);

            //  RESPONSE
            let responseType = 0,
              message = "Something went wrong";
            if (result) {
              if (result.status === 1) {
                responseType = 1;
                message = "Your order has been updated";
              } else {
                message = result.message !== undefined ? result.message : message;
              }
            }
            //  DISPATCH DATA & REMOVE
            dispatch({ type: types.SCHEDULE_MODAL_TYPE, payload: 2 });
            dispatch({ type: types.SCHEDULE_RESPONE, payload: { message } });
            dispatch({
              type: types.SCHEDULE_RESPONSE_TYPE,
              payload: responseType,
            });
          } else {
            window.location.reload();
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: mySubscriptions
 * desc: get My Subscriptions List and dispatch data
 * @param: userId
 * @return: data
 * Created by Ashok on 04.09.2019
 *
 */

export const mySubscriptions = data => async dispatch => {
  let url = `${DEV_URL}/subscriptionMaster/listUserSubscriptions/v3/${userId}`;
  try {
    const result = await (await fetch(url)).json();
    console.log(result);
    if (result) {
      let { subscriptions, productsList } = result;
      dispatch({ type: types.MY_SUBSCRIPTION_LIST, payload: subscriptions });
      dispatch({
        type: types.MY_SUBSCRIPTION_PRODUCT_LIST,
        payload: productsList,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: setSubscriptionsType
 * desc: Set My Subscriptions Type and dispatch type
 * @param: -
 * @return: data
 * Created by Ashok on 05.09.2019
 *
 */

export const setSubscriptionsType = data => async dispatch => {
  try {
    let { type, modalType = 1 } = data;
    let constantType = "";
    if (modalType === 1) {
      constantType = types.SET_MY_SUBSCRIPTION_TYPE;
    } else if (modalType === 2) {
      constantType = types.SET_COMMON_TYPE;
    }
    dispatch({ type: constantType, payload: type });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: updateMySubscription
 * desc: update My Subscriptions Product Type and dispatch data
 * @param: {type,product,reasonCode,reasonId,startDate,endDate}
 * @return: data
 * Created by Ashok on 05.09.2019
 *
 */

export const updateMySubscription = data => async dispatch => {
  try {
    let { type, product, reasonCode, reasonId, startDate, endDate } = data;

    if (reasonId !== undefined) {
      reasonId = parseInt(reasonId);
    }

    let { id: subscriptionId } = product;
    let subscriptionState = type === 1 ? 0 : 1;
    let reason = reasonCode;

    //  COMMON
    let params = { subscriptionId, subscriptionState };
    let url = `${DEV_URL}/subscriptionMaster/pause/v4`;

    //  PARAMS DATA - BASED ON TYPE
    if (type === 1) {
      //  PAUSE
      if (startDate !== undefined && endDate !== undefined) {
        startDate = moment(startDate).format("YYYY-MM-DD");
        endDate = moment(endDate).format("YYYY-MM-DD");
        params = { ...params, reason, reasonId, startDate, endDate };
      }
    } else if (type === 3) {
      //  END
      url = `${DEV_URL}/subscriptionMaster/end/v3`;
      params = { subscriptionId, reason, reasonId };
    }

    //  API CALL
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();

    //  RESPONSE
    let responseType = 0,
      message = "Something went wrong";
    if (result) {
      if (result.status === 1) {
        responseType = 1;
        message = "Your order has been updated";
      } else {
        message = result.message !== undefined ? result.message : message;
      }
    }
    if (type !== 2) {
      dispatch({ type: types.REASON_LIST_MODAL_SHOW }); // CLOSE REASON LIST MODAL
    }

    //  DISPATCH DATA & REMOVE
    dispatch({ type: types.MY_SUBSCRIPTION_MODAL_TYPE, payload: 2 });
    dispatch({ type: types.MY_SUBSCRIPTION_RESPONE, payload: { message } });
    dispatch({
      type: types.MY_SUBSCRIPTION_RESPONSE_TYPE,
      payload: responseType,
    });
    dispatch({ type: types.MY_SUBSCRIPTION_MODAL_SHOW }); // OPEN MODAL
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: reasonList
 * desc: get Reason List and dispatch data
 * @param: userId
 * @return: data
 * Created by Ashok on 05.09.2019
 *
 */

export const reasonList = data => async dispatch => {
  let url = `${DEV_URL}/subscriptionMaster/reason`;
  try {
    let { type } = data;
    let reasonType = type === 1 ? "PAUSE" : "END";
    let post = postMethod({ reasonType });
    const result = await (await fetch(url, post)).json();
    if (result) {
      let { data, status } = result;
      if (status === 1) {
        dispatch({ type: types.REASON_LIST, payload: data });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: searchProductList
 * desc: get Search Product List and dispatch data
 * @param: userId
 * @return: data
 * Created by Ashok on 06.09.2019
 *
 */

export const searchProductList = data => async dispatch => {
  try {
    dispatch({ type: types.LOADING, payload: 1 });
    let { searchKey: query } = data;
    let url = `${DEV_URL}/productMaster/getProductsForQuery/v2`;
    let params = { userId, query };
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    // console.log(result);
    if (result) {
      dispatch({ type: types.SEARCH_PRODUCT_LIST, payload: result });
      dispatch({ type: types.LOADING, payload: 0 });
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: getProfile
 * desc: get Profile and dispatch data
 * @param: userId
 * @return: data
 * Created by Ashok on 09.09.2019
 *
 */

export const getProfile = () => async dispatch => {
  try {
    //  GET DATA FROM LOCAL STORAGE
    let profileData = await localStorage.getItem("profileData");
    let uid = await localStorage.getItem('userId');
    let token = await localStorage.getItem('token');
    //  IF DATA - EMPTY - CALL API
    if (typeof (profileData) === 'null' || typeof (profileData) === 'undefined' || typeof (profileData) === 'object') {
      // alert(typeof(profileData))
      let url = `${DEV_URL}/user/getUserProfile?userId=${userId}`;
      const result = await (await fetch(url)).json();
      if (result && result.status === 1) {
        let { data: profileData } = result;
        profileData = JSON.stringify(profileData);
        await localStorage.removeItem("profileData");
        await localStorage.setItem("profileData", window.btoa(profileData));
        window.location.reload()
      } else {
        profileData = JSON.stringify([]);
      }
      if (token) {
        await directLogin(uid, token)
      }
    }


    //  GET DATA FROM LOCAL AGAIN & DISPATCH IT
    profileData = await localStorage.getItem("profileData");
    if (typeof (profileData === "null") || typeof (profileData === "undefined")) {
      logout();
    }
    profileData = JSON.parse(window.atob(profileData));
    dispatch({ type: types.PROFILE, payload: profileData });
  } catch (err) {
    console.log(err);
  }
};


/*
 *
 * name: partnerSelection
 * desc: receive host and set partnerId and apiBaseUrl
 * @param: host
 * @set: partnerId and apiBaseUrl
 * Created by Nitesh on 17.12.2020
 *
 */
export const partnerSelection = data => async dispatch => {
  try {
    let url = `${DEV_URL}/partner/group?groupId=${groupId}`;
    const res = await (await fetch(url, getMethod())).json();
    if(res){
    return res;
    }
  } catch (err) {
    console.log(err);
  }
};



/*
 *
 * name: getPartnerSetupConfig
 * desc: receive host and set partnerId and apiBaseUrl
 * @param: host
 * @set: partnerId and apiBaseUrl
 * Created by Nitesh on 17.12.2020
 *
 */
export const getPartnerSetupConfig = host => async dispatch => {
  try {
    let url = `https://private.api.dairybuddy.com/partner/getPartnerSetupConfig?host=${host}`;
    const res = await (await fetch(url, getMethod())).json();
    if(res){
     await localStorage.setItem('PARTNER_ID',res.data.web.partnerId);
     await localStorage.setItem('EV_RL',window.btoa(res.data.web.apiBaseUrl));
     await localStorage.setItem('groupId',res.data.web.groupId)
     PARTNER_ID = res.data.web.partnerId;
     DEV_URL = (res.data.web.apiBaseUrl);
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};





/*
 *
 * name: login
 * desc: Login and return data
 * @param: mobileNumber
 * @return: data
 * Created by Ashok on 09.09.2019
 *
 */

export const login = data => async dispatch => {
  try {
    let { mobileNumber } = data;
    let url = `${DEV_URL}/user/sendOTP/v3?mobile=${mobileNumber}`;
    const rs = await (await fetch(url, getMethod())).json();
    // console.log(rs);
    return rs;
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: refreshedCartData
 * desc: send products to server, get response & store data in local
 * @param: -
 * @return: dispatch data
 * Created by Nitest on 12.01.2021
 *
 */

 
/*
 *
 * name: refreshedCartData
 * desc: send products to server & get response & remove data in local === response - 1
 * @param: -
 * @return: dispatch data
 * Created by Nitesh on 12.01.2021
 *
 */
export const refreshedCartData = (userId) => async (dispatch, getState) => {
  //  PRODUCT LIST

  let enableBulk = localStorage.getItem('enableBulk');
  let cartItemList = await getState().cart.cart_product_list;
  let params = { userId, cartItemList};
  let url = `${DEV_URL}/cart/refresh/`;
 
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    let { status, message, rechargeAmount, data } = result;
    const currentBalance = localStorage.getItem('currentBalance')
    const cart_product_list = localStorage.getItem('cart_product_list')
    

    if (rechargeAmount) {
      window.location.replace(`/wallet-checkout/?rechargeAmount=${rechargeAmount}`)
    }
    
    let responseType = 0,
      subsList = [];

    if (status === 0) {
      responseType = 3;
      dispatch({ type: types.CHECKOUT_RESPONE, payload: { message } });
    }

    else if (status === 1) {
      responseType = 1;
      //  REMOVE ALL CART DETAILS FROM REDUX STATE & LOCAL STORAGE & DISPATCH
      localStorage.setItem("cart_computed_list", JSON.stringify(subsList));
      // localStorage.setItem("cart_product_list", JSON.stringify(subsList));
      dispatch({ type: types.CART_COMPUTED_LIST, payload: subsList });
      dispatch({ type: types.CART_COMPUTED_ARR, payload: subsList });

      //  DISPATCH - DELIVERY, CART CHARGE DETAILS
      dispatch({ type: types.DELIVERY_CHARGE, payload: 0 });
      dispatch({ type: types.CART_SUB_TOTAL, payload: 0 });
      dispatch({ type: types.CART_TOTAL, payload: 0 });

      message = "Your Order has been placed successfully";
      if (enableBulk === 'true') {
        message = result.message;
        localStorage.setItem('enableBulk', false);
      }
      dispatch({ type: types.CHECKOUT_RESPONE, payload: { message } });
      
    } else {
      dispatch({ type: types.CHECKOUT_RESPONE, payload: { message } });
    }
    if(typeof(cart_product_list) === 'string'){
      window.location.replace('/checkout')
    }

    //  DISPATCH RESPONSE
    dispatch({ type: types.CHECKOUT_RESPONSE_TYPE, payload: responseType });
    dispatch({ type: types.CHECKOUT_MODAL_SHOW });

    if (data.nextAvailbleDate) {
      return (data.nextAvailbleDate)
    }
  }
  catch (err) {
    console.log(err);
  }

};

/*
 *
 * name: verifyOtp
 * desc: verifyOtp and dispatch data
 * @param: mobileNumber
 * @return: data
 * Created by Ashok on 09.09.2019
 *
 */


export const verifyOtp = data => async dispatch => {

  try {
    let { mobileNumber, otp } = data;
    let url = `${DEV_URL}/user/verifyOTP/v2?mobile=${mobileNumber}&otp=${otp}`;

    const result = await (await fetch(url, getMethod())).json();


    if (result) {
      //  SUCCESS
      if (result.status === 1) {
        //after verifying clear data from localStorage
        localStorage.removeItem('profileData');
        // localStorage.removeItem('userStatus');
        //after verifying clear data from localStorage
        let { data } = result;
        let userId = data.user.id;
        let token = data.token;
        let userStatus = data.user.userStatus;
        localStorage.setItem("userStatus", userStatus);
        data = JSON.stringify(data);
        // alert(userStatus)
        if (result.data.user.building.id === undefined) {
          {
            localStorage.setItem("addressStatus", 1);
          }
          window.location.replace("/address-update");
        }
        //  STORE USER DATA
        await setLocalStorageData({ key: "userData", value: window.btoa(data) });

        //  STORE USER ID
        await setLocalStorageData({ key: "userId", value: userId });

        //  STORE USER TOKEN
        await setLocalStorageData({ key: "userToken", value: token });
      }
      if (result.status === 0) {
        //  STORE USER phone no.
        await localStorage.setItem("userStatus", 3);
        await setLocalStorageData({ key: "mobileNumber", value: mobileNumber });
        window.location.replace("/signup");
      }
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};



/*
 *
 * name: cityList
 * desc: get cityList and dispatch data
 * @param: -
 * @return: data
 * Created by Ashok on 09.09.2019
 *
 */

export const cityList = () => async dispatch => {
  try {
    let url = `${DEV_URL}/building/getAllCityList`;
    const result = await (await fetch(url)).json();
    if (result) {
      let { cityList } = result;
      dispatch({ type: types.CITY_LIST, payload: cityList });
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};




/*
 *
 * name: cityData
 * desc: dispatch cityData
 * @param: dta
 * @return: data
 * Created by Ashok on 09.09.2019
 *
 */

export const cityData = data => async dispatch => {
  try {
    dispatch({ type: types.CITY_DATA, payload: data });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: buildingSearchList
 * desc: get Search Product List and dispatch data
 * @param: userId
 * @return: data
 * Created by Ashok on 10.09.2019
 *
 */

export const buildingSearchList = data => async dispatch => {
  try {
    dispatch({ type: types.LOADING, payload: 1 });
    let { value: query, cityId } = data;
    let url = `${DEV_URL}/building/getBuildingNamesByCity/v2?query=${query}&city=2`;
    // let url = `${DEV_URL}/building/getBuildingNamesByCity/v2?query=${query}&city=${cityId}`;
    const result = await (await fetch(url, getMethod())).json();
    console.log(result);
    if (result) {
      dispatch({ type: types.BUILDING_LIST, payload: result });
      dispatch({ type: types.LOADING, payload: 0 });
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: setBuildingData
 * desc: dispatch setBuildingData
 * @param: dta
 * @return: data
 * Created by Ashok on 10.09.2019
 *
 */

export const setBuildingData = data => async dispatch => {
  try {
    console.log(data);
    dispatch({ type: types.BUILDING_DATA, payload: data });
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: changeAddress
 * desc: changeAddress
 * @param: dta
 * @return: data
 * Created by Ashok on 10.09.2019
 *
 */

export const changeAddress = data => async (dispatch, getState) => {
  try {
    // console.log(data);
    let cityData = getState().address.cityData;
    if (Object.keys(cityData).length > 0 && data) {
      let url = `${DEV_URL}/user/update/address/v4`;

      let { address, type, buildingType, houseNo } = data;
      let { id: cityId } = cityData;
      let { id: buildingId, buildingName } = address;

      let params = {
        userId,
        cityId,
        houseNo,
        fullAddressRequired: true,
        buildingId,
        address: buildingName,
      };
      console.log(params);
      let post = postMethod(params);
      const result = await (await fetch(url, post)).json();
      console.log(result);
      return result;
    } else {
      window.location.replace("/city-list");
    }
  } catch (err) {
    console.log(err);
  }
};

// export const changeAddressRequest = data => async (dispatch, getState) => {
//   try {
//     let cityData = getState().address.cityData;
//     if (data) {
//       let url = `${DEV_URL}/user/userlocationUpdateRequest`;
//       let params = {
//         userId,
//         address: data.addressColony,
//         houseNo: data.houseNoFlatBuilding,
//       };
//       console.log(params);
//       let post = postMethod(params);
//       const result = await (await fetch(url, post)).json();
//       console.log(result);
//       return result;
//     } else {
//       window.location.replace("/address-update");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

//Kg


export const changeAddressRequest = data => async (dispatch, getState) => {
  // alert(JSON.stringify(data))
  try {
    let cityData = getState().address.cityData;
    if (data) {
      let url = `${DEV_URL}/user/userlocationUpdateRequest`;
      let params = {
        // userId,
        address: data.addressColony,

      };

      let location = data.houseNoFlatBuilding
      console.log(location);
      let post = postMethod(location);
      const result = await (await fetch(url, post)).json()

      // .then(function(result){ 
      //   return result.json();   
      //  })

      return result
    } else {
      window.location.replace("/address-update");
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: updateAddressStatus
 * desc: update name, email, phone 
 * @param: - userId, name, mobile, email
 * @return: - data and status
 * Created by Nitesh on 14.12.2020
 *
 */

export const updateAddressStatus = data => async () => {
  try {
    if (data) {
      let url = `${DEV_URL}/user/updateUserProfile`;
      let params = {
        id : userId,
        userName: data.Name,
        email: data.Email,
        mobile: data.Mobile,
      };
      let post = postMethod(params);
      const result = await (await fetch(url, post)).json();
      return result
    } else {
      window.location.replace("/address-update");
    }
  } catch (err) {
    console.log(err);
  }
};


export const signUpRequest = data => async (dispatch, getState) => {
  try {
    let cityData = getState().address.cityData;
    if (data) {
      let url = `${DEV_URL}/user/userSignUp`;
      let params = { email: data.email, userName: data.userName };
      console.log(params);
      let post = postMethod(data);
      const result = await (await fetch(url, post)).json();
      console.log(result);
      return result;
    } else {
      window.location.replace("/address-update");
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: logout
 * desc: remove all local storage & redirect to login page
 * @param: -
 * @return: -
 * Created by Ashok on 10.09.2019
 *
 */

export const logout = data => async dispatch => {
  try {
    //  REMOVE USER ID,TOKEN FROM AUTH REDUCER STATE, LOCAL STORAGE & REDIRECT TO LOGIN PAGE
    const localStorageArr = [
      "userAppData",
      "cart_product_list",
      "cart_computed_list",
      "profileData",
      "userData",
      "userId",
      "userToken",
      "cartSubTotal",
    ];

    localStorageArr.forEach((value, key) => {
      localStorage.removeItem(value);
      { localStorage.setItem('setlocalData', true) }
    });
    localStorage.clear()

    //  REDIRECT TO LOGIN PAGE
    window.location.replace("/login");

  } catch (err) {
    console.log(err);
  }
};

export const setLocalStorageDataFunc = ({ key, value }) => async () => {
  await setLocalStorageData({ key, value });
};

export const getLocalStorageDataFunc = ({ key }) => async () => {
  return await getLocalStorageData({ key });
};

/*
 *
 * name: walletPaymentCheckout
 * desc: based on type init payment/ get payload from API
 * @param: type - [1 - PAYTM]
 * @return: data
 * Created by Ashok on 18.09.2019
 *
 */
// export const walletPaymentCheckout = (data) => async () => {
//   console.log(data);
//   try {
//     let rechargeAmount = await getLocalStorageData({ key: "rechargeAmount" });
//     if (isNaN(rechargeAmount) || rechargeAmount < 0) {
//       window.location.replace("/wallet"); //  REDIRECT TO WALLET PAGE
//     }

//     let { type } = data;
//     let paramData = { amount: rechargeAmount, userId, type: "PWA" };
//     let url = `${DEV_URL}/makeBillPayment/getPaytmPayloadV2`;
//     if (type === 1) {
//       let post = postMethod(paramData);
//       const result = await (await fetch(url, post)).json();
//       if (result) {
//         //  STORE PAYLOAD IN LOCAL
//         let payloadData = JSON.stringify(result);
//         await setLocalStorageData({
//           key: "paytmPaylodData",
//           value: payloadData,
//         });

//         // let newData = await getLocalStorageData({key:'paytmPaylodData'});
//         // console.log(newData);
//         return result;
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getSubCategoryProducts = (data) => async (dispatch) => {
//   let { productCategoryId, productSubCategoryId } = data;
//   let params = {
//     userId,
//     productCategory: parseInt(productCategoryId),
//     productSubCategory: parseInt(productSubCategoryId),
//   };
//   let url = `${DEV_URL}/productMaster/getProductsByCategory/v2`;
//   let post = postMethod(params);
//   const result = await (await fetch(url, post)).json();
//   if (result) return result;
// };

export const walletPaymentCheckoutJuspay = data => async () => {

  try {
    let rechargeAmount = await getLocalStorageData({ key: "rechargeAmount" });
    if (isNaN(rechargeAmount) || rechargeAmount < 0) {
      window.location.replace("/wallet"); //  REDIRECT TO WALLET PAGE
    }
    console.log("Amount:  " + rechargeAmount);
    let { type } = data;
    let paramData = { amount: rechargeAmount, userId, type: "PWA" };
    console.log(paramData);

    let url = `${PAYMENT_DEV_URL}/payment/juspay/createPaymentOrder`;
    if (type === 1) {
      let post = postMethod(paramData);
      const result = await (await fetch(url, post)).json();
      if (result) {
        //  STORE PAYLOAD IN LOCAL
        let payloadData = JSON.stringify(result);
        await setLocalStorageData({
          key: "paytmPaylodData",
          value: payloadData,
        });

        // let newData = await getLocalStorageData({key:'paytmPaylodData'});
        // console.log(newData);
        return result;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// console.log(navigator);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('../serviceWorker.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

// created by kingston on 28.12.2020
// name : dateSubmitSuccess
// dispatch Date
export const dateSubmitSuccess = (selectDate , selectDateTo) => async (dispatch,getState) => {
  let dateList = await getState().filterdate.selectDate;
  let dateListTo = await getState().filterdate.selectDateTo;
  try {
    
  let date =  await ({selectDate , selectDateTo}) ;
   if(date.length !== null || date.length !== undefined) {
    
     dispatch({ type: types.SELECTED_DATE, payload: date.selectDate });
     dispatch({ type: types.SELECTED_DATE_TO, payload: date.selectDateTo });
  
   }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: billPayment
 * desc: after payment success, bill payment
 * @param: type - [1 - PAYTM]
 * @return: data
 * Created by Ashok on 19.09.2019
 *
 */
export const billPayment = data => async () => {
  let { type, transactionData } = data;
  if (type === 1) {
    let { status } = transactionData;
    if (transactionData.status == 1) {
      // let {TXNAMOUNT,ORDERID,BANKTXNID,STATUS,TXNID,PAYMENTMODE,TXNDATE,CHECKSUMHASH,BANKNAME} = transactionData

      // let paramData = {amount:TXNAMOUNT,userId,bankTxnId:BANKTXNID,orderId:ORDERID,transactionId:TXNID,paymentType:3,paymentSource:1,paymentProvider:11, discountCouponId:0, newPaytmProvider:false, newPhonepeProvider:false};
      let paramData = transactionData;
      let url = `${PAYMENT_DEV_URL}/payment/makeBillPayment/appSource`;
      let post = postMethod(paramData);
      const result = await (await fetch(url, post)).json();
      if (result) {
        console.log(result);
        return result;
      }
    }
  }
};



/*
 *
 * name: singleSignOn
 * desc: send data to API and check, store user data
 * @param: query params
 * @return: data
 * Created by Ashok on 16.09.2019
 *
 */
export const singleSignOn = params => async dispatch => {
  let dev = `${CROSS_ORIGIN_URL}https://api.admin.dairybuddy.com/`;
  // let dev = `${CROSS_ORIGIN_URL}http://localhost:8080/`;

  let url = `${dev}/user/singleClickRegister/v2`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    console.log(result);
    //  SUCCESS
    if (result.status === 1) {
      let { user, token, newUser, status } = result;
      let data = { user, status, token };
      let userId = user.id;
      data = JSON.stringify(data);

      //  STORE USER DATA
      await setLocalStorageData({ key: "userData", value: window.btoa(data) });

      //  STORE USER ID
      await setLocalStorageData({ key: "userId", value: userId });

      //  STORE USER TOKEN
      await setLocalStorageData({ key: "userToken", value: token });
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};

//  HELPERS

const setLocalStorageData = async ({ key, value }) => {
  await localStorage.removeItem(key);
  await localStorage.setItem(key, value);
};

const getLocalStorageData = async ({ key }) => {
  try {
    return await localStorage.getItem(key);
  } catch (err) {
    console.log(err);
  }
};

const setWalletAmount = async data => {
  data = await data;
  if (data) {
    let currentBalance = data.currentBalance;

    if (typeof (currentBalance === "null") || typeof (currentBalance === "undefined")) {
      logout();
    }
    // await localStorage.removeItem("currentBalance");
    await localStorage.setItem("currentBalance", currentBalance);
  }
};

export const getUdateUserWalletAmount = type => async () => {
  try {
    //  GET VALUE FROM LOCAL STORAGE
    let balance = await localStorage.getItem("currentBalance");
    if (typeof balance == "undefined" || balance == null || isNaN(balance)) {
      await setWalletAmount(await walletData());
      balance = localStorage.getItem("currentBalance");
    }
    return balance;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

const getUdateUserAppData = async type => {
  try {
    let appData = await localStorage.getItem("userAppData");
    if (appData === null) {
      await appLaunchData();
      appData = await localStorage.getItem("userAppData");
    }
    return JSON.parse(appData);
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: walletPaymentCheckout
 * desc: based on type init payment/ get payload from API
 * @param: type - [1 - Cashfree]
 * @return: data
 * Created by Nitesh on 27.08.2020
 *
 */

export const walletPaymentCheckout = data => async () => {
  try {
    // let rechargeAmount = await getLocalStorageData({ key: "rechargeAmount" });
    let rechargeAmount = data.rechargeAmount;
    if (isNaN(rechargeAmount) || rechargeAmount < 0) {
      window.location.replace("/walletPro"); //  REDIRECT TO WALLET PAGE
    }
    let protocol = window.location.protocol;
    let host = window.location.hostname;
    let port = window.location.port;
    // let orderId = 1;

    let returnUrl = `${protocol}//${host}:${port}/payment/verification`;
    let { type } = data;
    let paramData = {
      amount: rechargeAmount,
      userId,
      type: "web",
      returnUrl: returnUrl,
      // rechargeOffercode:"31121150"
    };
    let url = `${PAYMENT_DEV_URL}/payment/cashfree/createPaymentOrder`;
    if (type === 1) {
      let post = postMethod(paramData);
      const result = await (await fetch(url, post)).json();
      if (result) {
        //  STORE PAYLOAD IN LOCAL
        let payloadData = JSON.stringify(result);
        await setLocalStorageData({
          key: "paytmPaylodData",
          value: payloadData,
        });
        return result;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: razorPayPaymentCheckout
 * desc: based on payment method get type in wallet page
 * @param: amount, txnId, userId
 * @return: data
 * Created by Nitesh on 09.12.2020
 *
 */

export const razorPayPaymentCheckout = data => async () => {
  let {amount, unquetxnId} = data
  
  try {
    let rechargeAmount = amount;
    let txnId = unquetxnId;
    // let rechargeAmount = (Math.round(data.amount * 100) / 100) .toFixed(2)

    let amt = parseFloat(rechargeAmount) + 0.1;
    // let rechargeAmount = parseFloat(data.amount) * 100
    if (isNaN(rechargeAmount) || rechargeAmount < 0) {
      window.location.replace("/walletPro"); //  REDIRECT TO WALLET PAGE
    }
    // let protocol = window.location.protocol;
    // let host = window.location.hostname;
    // let port = window.location.port;

    // let returnUrl = `${protocol}/${host}:${port}/payment/verification`;
    let paramData = {
      amount: amt,
      userId,
      txnId,
      // returnUrl: returnUrl,
    };

    let url = `${DEV_URL}/payment/userPayment/createRazorpayOrder`;
    
      let post = postMethod(paramData);
      const result = await (await fetch(url, post)).json();
      if (result) {
        //  STORE PAYLOAD IN LOCAL
        let payloadData = JSON.stringify(result);
        await setLocalStorageData({
          key: "razorPayData",
          value: payloadData,
        });
        return result;
      }
    
  }
   catch (err) {
    console.log(err);
  }
};

  /*
 *
 * name: razorPayPaymentSuccess
 * desc: based on payment success 
 * @param: payment_id,order_id,signature
 * @return: data - status
 * Created by Nitesh on 10.12.2020
 *
 */

export const razorPayPaymentSuccess = data => async dispatch => {
let {razorpay_payment_id,razorpay_order_id,razorpay_signature, couponCode,rechargeAmount} = data
  try {
  let paramData = {
    amount: rechargeAmount,
    bankTxnId: razorpay_payment_id,
    discountCouponId: 0,
    newPaytmProvider: false,
    orderId : razorpay_order_id,
    paymentProvider:1,
    paymentSource:1,
    paymentType:1,
    transactionId: razorpay_payment_id,
    userId:userId, 
    rechargeOfferCode : couponCode,
    discountCouponName : "",
    discountCouponId :0 
  };

  let url = `${DEV_URL}/payment/makeBillPayment/razorPayPayent`;

    let post = postMethod(paramData);
    const result = await (await fetch(url, post)).json();
    console.log(result)
    if (result) {
      console.log(result);
      return result;
    }
  }
  catch (err) {
    console.log(err);
  }
};
  /////////////////////////
  /*
 *
 * name: getProductDetails
 * desc: get product details Vendor detail and return data
 * @param: productMasterId
 * @return: vendor, product details
 * Created by Nitesh on 04.09.2020
 *
 */
export const getProductDetails = paramData => async dispatch => {
  let params = { ...paramData, userId };
  let url = `${DEV_URL}/productBrand/getProductDetails`;
  try {
    let post = postMethod(params);
    const result = await (await fetch(url, post)).json();
    if (result) return result;
  } catch (err) {
    console.log(err);
  }
};

/*
 *
 * name: getBuildingId
 * desc: get buildingID return status
 * @param: buildingId
 * @return: status for guest user building
 * Created by Nitesh on 23.09.2020
 *
 */
// export const getBuildingId = (buildingId) => {
//   if (buildingId === GUEST_USER_BUILDING) {
//     return (true)
//   } else {
//     return (false)
//   }
// };

export const getBannerDetails = async (promoUrl) => {
  let url = `${DEV_URL}/productMaster/getBannerProducts${promoUrl}`;
  const result = await (await fetch(url, getMethod())).json();
  if (result.length) {
    // console.log(JSON.stringify(result))
    return result;
  }
};

////////////////////////////////////////////////Add bulk order/////////////////////////////////////////////////////////////////////////
/*
 *
 * name: addBulkorder
 * desc: get product, quantity and dispatch data
 * @param: userId
 * @return: data
 * Created by Nitest on 28.10.2020
 *
 */

 
export const addBulkorder = (product, quantity) => async (dispatch, getState) => {
  await setLocalStorageData({ key: "cart product", value: JSON.stringify(product) });
  // console.log("cart product count" + JSON.stringify(product.count));

  console.log("cart count" + product.count);
  if (product !== undefined && product !== null) {
    //  PRODUCT LIST
    let cartList = await getState().cart.cart_product_list;
    let result = await updateBulkCart({ product, quantity, cartList, type: 1 });
    if (result) {
      let { cartList, subTotal } = result;
      //  STORE SUBTOTAL DATA
      await setLocalStorageData({ key: "cartSubTotal", value: subTotal });
      dispatch({ type: types.CART_SUB_TOTAL, payload: subTotal });
      localStorage.setItem("cart_product_list", JSON.stringify(cartList));
      dispatch({ type: types.CART_PRODUCT_LIST, payload: cartList });
      dispatch({ type: types.CART_COUNT, payload: cartList.length });
    }
  }
};

const updateBulkCart = async ({ cartList, product, type, quantity }) => {
  let { id, productUnitPrice, productCategory } = product;
  //  NON MILK PRODUCT
  if (productCategory !== 1) {
    //  simply
  }
  let cartData = {};
  if (cartList.length > 0) {
    cartData = cartList.find(p => p.productMasterId === id);
    if (cartData == undefined || cartData == null) {
      cartData = {};
    }
  }
  // let quantity = 1;

  //  CHECK CART DATA ARRAY LENGTH
  if (Object.keys(cartData).length > 0) {
    if (type === 1) {
      cartData.quantity = quantity; //  INCREMENT
    } else {
      cartData.quantity = (cartData.quantity - cartData.quantity); //  DECREMENT
      window.location.reload('false')
    }
    cartData.price = cartData.quantity * productUnitPrice;
  } else if (type === 1) {
    let price = quantity * productUnitPrice;
    let newCartProduct = { productMasterId: id, quantity, price };
    await cartList.push(newCartProduct);
  }
  cartList = await cartList.filter(c => c.quantity > 0);

  let subTotal = 0;
  if (cartList.length > 0) {
    await cartList.forEach(product => {
      subTotal += product.price;
    });
  }

  return { cartList, subTotal };
};


export const removeBulkorder = (product) => async (dispatch, getState) => {
  if (product !== undefined && product !== null) {
    //  PRODUCT LIST
    let cartList = await getState().cart.cart_product_list;

    let result = await updateBulkCart({ product, cartList, type: 2 });
    if (result) {
      let { cartList, subTotal } = result;
      //  STORE SUBTOTAL DATA
      await setLocalStorageData({ key: "cartSubTotal", value: subTotal });
      dispatch({ type: types.CART_SUB_TOTAL, payload: subTotal });
      localStorage.setItem("cart_product_list", JSON.stringify(cartList));

      dispatch({ type: types.CART_PRODUCT_LIST, payload: cartList });
      dispatch({ type: types.CART_COUNT, payload: cartList.length });
      
    }
  }
};

////////////////////////////////////////////////Add bulk order/////////////////////////////////////////////////////////////////////////
