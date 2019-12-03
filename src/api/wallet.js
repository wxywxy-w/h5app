import  request  from "@/utils/request.js";

const  api={
    mywallet: "/myWallet/auth/getMyWalletEarningsNew",  //获取钱包收益
    walletgold:"/walletGold/auth/getWalletInfo"    //即将到帐
}

export function mywallet(obj) {
    return request({
        url: api.mywallet,
        method: obj.method,
        data: obj.data,
        qs:obj.qs
    });
}

export function walletgold(obj) {
    return request({
        url: api.walletgold,
        method: obj.method,
        data: obj.data,
        qs:obj.qs
    });
}