<template>
    <div class="goodsDetails">
        <div class="go" @click="onCancel()">
            <img src="@/assets/home/go.png" alt="">
        </div>
        <div class="headerImg">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in GoodsDetail.goodsGalleryUrls" :key="index">
                    <img :src="item" alt="">
                </van-swipe-item>
            </van-swipe>
            <!--<img src="@/assets/home/goodsDetails/details_image_top_default_ing_big@2x.png" alt="">-->
        </div>
        <div class="goodsPrice">
            <p class="rob"><span>限时抢购</span> <s>{{GoodsDetail.minNormalPrice / 100}}</s> <span>已拼{{GoodsDetail.soldQuantity}}件</span></p>
            <p class="preferentialPrice">小绿蓝券后 ￥<span>{{GoodsDetail.minGroupPrice / 100}}</span> <span>去美母婴专营店</span></p>
        </div>
        <div class="name">
            <p class="names">
                <!--自营-->
                <img v-if="GoodsDetail.platformType == 3" src="@/assets/home/platform/details_icon_proprietary@2x.png" alt="">
                <!--拼多多-->
                <img v-if="GoodsDetail.platformType == 2" src="@/assets/home/platform/home_tab_pin_small@2x.png" alt="">
                <!--淘宝-->
                <img v-if="GoodsDetail.platformType == 0" src="@/assets/home/platform/home-rob_goods_icon_taobao@2x.png" alt="">
                <!--天猫-->
                <img v-if="GoodsDetail.platformType == 1" src="@/assets/home/platform/home-rob_goods_icon_tmall@2x.png" alt="">
                {{GoodsDetail.goodsName}}
            </p>
            <p class="rules">补贴说明<img src="@/assets/home/goodsDetails/mine_gold_icon_instructions@2x.png" alt=""> <span>使用期限:{{formatTime(GoodsDetail.couponStartTime,'Y.M.D')}}-{{formatTime(GoodsDetail.couponEndTime,'Y.M.D')}}</span></p>

            <div class="subsidies">
                <div class="left">
                    <p>约补贴</p>
                    <p>￥<span>{{GoodsDetail.predictPromotion / 100}}</span></p>
                </div>
                <div class="center" @click="toTher()">
                    立即领劵
                </div>
                <div class="right" @click="toTher()">
                    <p>￥<span>{{GoodsDetail.couponDiscount / 100}}</span></p>
                    <p>小绿蓝专享券</p>
                </div>
            </div>

            <!--优质文案-->
            <div class="text">
                <p><img src="@/assets/home/goodsDetails/details_sign_text@2x.png" alt="">优质文案 <span>复制</span></p>
                <p>{{GoodsDetail.goodsDesc}}</p>
            </div>
        </div>
        <!--图文介绍-->
        <div class="introduce">
            <yysl_wujs></yysl_wujs>
        </div>

        <!--底部导航-->
        <div class="button">
            <!--首页-->
            <div class="home" @click="$router.push({path:'/home/index'})">
                <img src="@/assets/home/baner/tabber_icon_home_normal@2x.png" alt="">
                <p>首页</p>
            </div>
            <!--收藏-->
            <div class="shoucang">
                <img @click="delshoucang()" v-show="shoucang == true" src="@/assets/home/baner/collect_click@2x.png" alt="">
                <img @click="addshoucang()"  v-show="shoucang == false" src="@/assets/home/baner/tabber_icon_love_normal@2x.png" alt="">
                <p>收藏</p>
            </div>
            <!--立即领劵-->
            <div class="pay">
                <div @click="toTher()">
                    领劵购买
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {getGoodsDetail,getTbkGoodsDetail,generateShortUrl,addFavorite,addFavoriteTb,deleteFavorite} from '@/api/index.js'
	import qs from 'qs'

	export default {
		name: "goodsDetails",
        data(){
			return{
				goodsData:"",
				GoodsDetail:[],
                shoucang:false
            }
        },

        created(){
	        let goodsData = JSON.parse(localStorage.getItem("goodsDetails"));
            console.log(goodsData.platformType)
            if(goodsData.platformType == 2){
	            this.getGoodsDetail(goodsData.goodsId)
            }else{
            	this.getTbkGoodsDetail(goodsData.goodsId)
            }
        },
        methods:{
			//拼多多
	        getGoodsDetail(id){
	        	let data = {
			        goodsId:id,
			        userId:'1',
			        memberType:'1'
                }
		        getGoodsDetail({
			        method: 'get',
			        data: data,
			        qs: true
                }).then(res=>{
                	if(res.code == '0'){
		                this.GoodsDetail = res.data.goodsDTO
		                console.log(res)
                    }else{
		                this.$toast(res.message);
                    }

                })
            },
            // 淘宝 天猫
	        getTbkGoodsDetail(id){
		        let data = {
			        goodsId:id,
			        userId:'1',
			        memberType:'1'
		        }
		        getTbkGoodsDetail({
			        method: 'get',
			        data: data,
			        qs: true
                }).then(res=>{
			        if(res.code == '0'){
				        this.GoodsDetail = res.data.goodsDTO
                        this.shoucang = res.data.favorite
			        }else{
				        this.$toast(res.message);
                    }
                })
            },
	        formatTime(number, format) {

		        var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
		        var returnArr = [];

		        var date = new Date(number * 1000);
		        returnArr.push(date.getFullYear());
		        returnArr.push(this.formatNumber(date.getMonth() + 1));
		        returnArr.push(this.formatNumber(date.getDate()));

		        returnArr.push(this.formatNumber(date.getHours()));
		        returnArr.push(this.formatNumber(date.getMinutes()));
		        returnArr.push(this.formatNumber(date.getSeconds()));

		        for (var i in returnArr) {
			        format = format.replace(formateArr[i], returnArr[i]);
		        }
		        return format;
	        },

            //数据转化
	        formatNumber(n) {
		        n = n.toString()
		        return n[1] ? n : '0' + n
	        },
            //跳转第三放领劵
	        toTher(){
		        // let url = ''
                // if(this.GoodsDetail.coupon != undefined){
                // 	url = this.GoodsDetail.coupon
                // }else{
	            //     url = this.GoodsDetail.goodsUrl
                // }
                // let relationId = ''
		        // if(this.GoodsDetail.relationId != undefined){
			    //     relationId = this.GoodsDetail.relationId
		        // }
                //
                //
		        // let text = JSON.stringify([{
			    //     goodsId:this.GoodsDetail.goodsId,
			    //     optId:this.GoodsDetail.optId,
			    //     memberType:'1',
			    //     goodsName:this.GoodsDetail.goodsName,
			    //     url:url + relationId
		        // }])
                window.location.href = this.GoodsDetail.goodsUrl
		        // generateShortUrl({
			    //     method: 'post',
			    //     data:qs.stringify({type:2, text}),
			    //     qs: false
                // }).then(res=>{
                // 	console.log(res)
			    //     // window.location.href = res.data
		        // })
            },
	        onCancel(){
		        this.$router.go(-1)
	        },
            //取消收藏拼多多
	        delshoucang(){
	        	let data = {
			        goodsId:this.GoodsDetail.goodsId,
			        platformType:this.GoodsDetail.platformType
                }
		        deleteFavorite({
			        method: 'post',
			        data: data,
			        qs: true
                }).then(res=>{
			        this.shoucang = false
		        })
            },


            addshoucang(){
	        	console.log(this.GoodsDetail)
	            if(this.GoodsDetail.platformType != 2){
		            let text= JSON.stringify(this.GoodsDetail)
	            	let data = {
			            goodsId:this.GoodsDetail.goodsId,
			            platformType:this.GoodsDetail.platformType,
			            goodsName:this.GoodsDetail.goodsName,
                        text
                    }
                    //添加收藏淘宝天猫收藏
		            addFavoriteTb({
			            method: 'post',
			            data: data,
			            qs: true
                    }).then(res=>{
                    	if(res.code == '0'){
                    		this.shoucang = true
		                    this.$toast('收藏成功！');

	                    }
                    })


                }else{
		            //添加收藏拼多多
		            let text= JSON.stringify(this.GoodsDetail)
		            let user = JSON.parse(localStorage.getItem("user"));
		            let data = {
			            userId:user.userId,
			            goodsId:this.GoodsDetail.goodsId,
			            platformType:this.GoodsDetail.platformType,
			            goodsName:this.GoodsDetail.goodsName,
			            text
		            }
		            addFavoriteTb({
			            method: 'post',
			            data: data,
			            qs: true
                    }).then(res=>{
			            if(res.code == '0'){
				            this.shoucang = true
				            this.$toast('收藏成功！');
			            }
                    })
                }
            }
        }
	}
</script>

<style scoped lang="scss">
.goodsDetails{
    background: #F5F5F5;
    height: 100%;
    .go{
        z-index: 999999999;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        left: 10px;
        top: 10px;
        img{
            width: 100%;
        }
    }
    .headerImg{
        font-size: 0;
        img{
            width: 100%;
        }
    }
    .goodsPrice{
        height: 63px;
        background: #fff;
        box-sizing: border-box;
        padding: 0 15px;
        .rob{
            box-sizing: border-box;
            padding-top: 10px;
            span:nth-child(1){
                display: inline-block;
                width: 66px;
                height: 16px;
                background: #F15A37;
                border-radius: 16px;
                text-align: center;
                color: #fff;
            }
            s:nth-child(2) {
                color: #808080;
            }
            span:nth-child(3) {
                float: right;
                color: #808080;
            }
        }
        .preferentialPrice{
            color: #F15A37;
            line-height: 30px;
            span:nth-child(1){
                font-size: 16px;
            }
            span:nth-child(2) {
                font-size: 12px;
                color: #808080;
                position: absolute;
                right: 15px;
            }
        }
    }
    .name {
        height: 339px;
        background: #fff;
        margin-top: 10px;
        box-sizing: border-box;
        padding: 10px 15px;
        p.names {
            font-size: 14px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #191919;
            img {
                width: 18px;
                height: 18px;
                vertical-align: middle;

            }
        }
        p.rules {
            margin-top: 10px;
            color: #F15A37;
            img {
                width: 13px;
                position: relative;
                top: 2px;
                left: 3px;
            }
            span {
                float: right;
                color: #808080;
            }
        }
        .subsidies{
            display: flex;
            color: #fff;
            text-align: center;
            .left{
                width: 120px;
                height: 81px;
                background: url("~@/assets/home/goodsDetails/details_background_subsidies@2x.png");
                background-size: 100% 100%;
                box-sizing: border-box;
                padding-top: 20px;
                p{
                    text-align: center;
                    span{
                        font-size: 16px;
                    }
                }
                p:nth-child(2){
                    margin-top: 3px;
                }
            }
            .center{
                width: 76px;
                height: 81px;
                background: url("~@/assets/home/goodsDetails/details_background_coupons_left@2x.png");
                background-size: 100% 100%;
                box-sizing: border-box;
                padding: 20px;
                align-items: center;
                text-align: center;
            }
            .right{
                width: 159px;
                height: 81px;
                background: url("~@/assets/home/goodsDetails/details_background_coupons_right@2x.png");
                background-size: 100% 100%;
                box-sizing: border-box;
                padding-top: 20px;
                p{
                    span{
                        font-size: 16px;
                    }
                }
            }
        }
        .level{
            width:345px;
            height:33px;
            background:linear-gradient(90deg,rgba(255,226,194,1),rgba(255,211,155,1));
            border-radius:10px;
            box-sizing: border-box;
            padding: 0px 20px;
            position: relative;
            color: #C4550F;
            p{
                height: 33px;
                line-height: 33px;
                span{
                    position: absolute;
                    right: 20px;
                    img{
                        position: relative;
                        top: 5px;
                        width:20px;
                    }
                }
            }
        }
        .text{
            width: 345px;
            background: #F0F0F0;
            border-radius: 10px;
            margin-top: 20px;
            box-sizing: border-box;
            padding: 10px;
            vertical-align:middle;

            p{
                vertical-align:middle;
                color: #F15A37;
                img{
                    vertical-align:middle;
                    width: 24px;
                }
                span{
                    color: #333;
                    float: right;
                    border: 1px solid #333;
                    padding: 0px 8px;
                    border-radius: 20px;
                }
            }
            p:nth-child(2){
                color: #808080;
                margin-top: 10px;
            }
        }
    }
    .introduce{
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 100px;
    }
    .button{
        box-sizing: border-box;
        padding: 0 10px;
        height: 55px;
        width: 100%;
        position: fixed;
        left: 0px;
        bottom: 0px;
        z-index: 9999999;
        background: #fff;
        display: flex;
        div{
            text-align: center;
            img{
                width: 25px;
                margin-top: 5px;
            }
        }

        div.home{
            width: 15%;

        }
        div.shoucang{
            width: 15%;
        }
        div.pay{
            width: 70%;
            position: relative;
            div{
                width: 150px;
                height: 44px;
                background:linear-gradient(90deg,rgba(240,96,63,1),rgba(241,90,55,1));
                border-radius:22px;
                position: absolute;
                right: 0px;
                top: 6px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
            }
        }
    }
}
</style>
