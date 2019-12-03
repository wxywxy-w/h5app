import request from "@/utils/request.js";
const api = {
    getuser: "/user/auth/getUser", //获取用户信息
    getEstimateEarnings: "myWallet/auth/getEstimateEarnings",  //获取钱包信息的
    getMyGoodsOrders: "/order/auth/getMyGoodsOrders", //获取订单列表 平台
    getList: "payOrder/auth/getList", //获取订单列表  自营
    deleteorder: "payOrder/auth/updateShow", //删除订单  自营
    getorderdetails: "payOrder/auth/getDetail", //订单详情  自营
    getdaaressList: "/deliveryAddress/auth/list",   //收货地址列表
    deliveryAddress: "/deliveryAddress/auth/update", //修改收货地址
    deliveryAddressDel: "/deliveryAddress/auth/del",  //删除收货地址
    deliveryAddressAdd: "/deliveryAddress/auth/insert", //新增收货地址
    directBuyH5: "payOrder/auth/appPay/directBuyH5",
    getviewLogistics: "delivery/auth/payOrderDelivery"//查看物流
}

export function getuser(obj) {
    return request({
        url: api.getuser,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}
export function getEstimateEarnings(obj) {
    return request({
        url: api.getEstimateEarnings,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}

export function getMyGoodsOrders(obj) {
    return request({
        url: api.getMyGoodsOrders,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}


export function getList(obj) {
    return request({
        url: api.getList,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}

export function deleteorder(obj) {
    return request({
        url: api.deleteorder,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}


export function getorderdetails(obj) {
    return request({
        url: api.getorderdetails,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}

export function getdaaressList(obj) {
    return request({
        url: api.getdaaressList,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}

export function deliveryAddress(obj) {
    return request({
        url: api.deliveryAddress,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}


export function deliveryAddressDel(obj) {
    return request({
        url: api.deliveryAddressDel,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}


export function deliveryAddressAdd(obj) {
    return request({
        url: api.deliveryAddressAdd,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}

export function directBuyH5(obj) {
    return request({
        url: api.directBuyH5,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}

export function getviewLogistics(obj) {
    return request({
        url: api.getviewLogistics,
        method: obj.method,
        data: obj.data,
        qs: obj.qs
    });
}