import request from "@/utils/request.js";
const api = {
    getBanners:"/banner/getHomePlates", //获取轮播数据
	getHomeGoods:"goods/getHomeGoods",   //首页爆款
	getGoodsDetail:"/goods/getGoodsDetail", //商品详情接口   拼多多
	getTbkGoodsDetail:"/tbk/getTbkGoodsDetail", //商品详情接口  淘宝 天猫
	generateShortUrl:"shortUrl/auth/generateShortUrl",   //商品详情生成短链接
	getHotSearch:"search/getHotSearch",  //搜索页 热门搜索
	earchGoods:"/goods/searchGoods",  //商品查询
	getTopGoodsList:"goods/getTopGoodsList",     //全网爆款
	getFavoriteGoodsByUserId:"favorite/auth/getFavoriteGoodsByUserId",     //我的收藏
	addFavorite:"/favorite/auth/addFavorite",       //添加拼多多收藏
	addFavoriteTb:"/favorite/auth/addFavoriteTb",       //添加淘宝客收藏
	deleteFavorite:"/favorite/auth/deleteFavorite",      //取消商品收藏
	getHomePlatesType:"/banner/getHomePlates?plateId=3", //获取轮播数据
}

//
// goods/getTopGoodsList?sortType=1
// goods/getTopGoodsList?sortType=4 收益榜
// /goods/getBigTypeList?sortType=3 全民嗨吃
// favorite/auth/getFavoriteGoodsByUserId 我的收藏
export function getBanners(obj) {
  return request({
    url: api.getBanners,
    method: obj.method,
    data: obj.data,
    qs:obj.qs
  });
}

export function getHomeGoods(obj) {
	return request({
		url: api.getHomeGoods,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function getGoodsDetail(obj) {
	return request({
		url: api.getGoodsDetail,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function getTbkGoodsDetail(obj) {
	return request({
		url: api.getTbkGoodsDetail,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function generateShortUrl(obj) {
	return request({
		url: api.generateShortUrl,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function getHotSearch(obj) {
	return request({
		url: api.getHotSearch,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function earchGoods(obj) {
	return request({
		url: api.earchGoods,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

export function getTopGoodsList(obj) {
	return request({
		url: api.getTopGoodsList,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function getFavoriteGoodsByUserId(obj) {
	return request({
		url: api.getFavoriteGoodsByUserId,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
export function addFavorite(obj) {
	return request({
		url: api.addFavorite,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

export function addFavoriteTb(obj) {
	return request({
		url: api.addFavoriteTb,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

export function deleteFavorite(obj) {
	return request({
		url: api.deleteFavorite,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}

export function getHomePlatesType(obj) {
	return request({
		url: api.getHomePlatesType,
		method: obj.method,
		data: obj.data,
		qs:obj.qs
	});
}
