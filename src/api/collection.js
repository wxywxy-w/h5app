import request from "@/utils/request.js";
const api = {
    getfavorite:'/favorite/auth/getFavoriteGoodsByUserId'
}

export function getfavorite(obj) {
    return request({
        url: api.getfavorite,
        method: obj.method,
        data: obj.data,
        qs:obj.qs
    });
}
