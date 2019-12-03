<template>
    <div class="goodsList">
        <div class="header">
            <van-nav-bar
                    :title=title
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <!--商品列表-->
        <div class="goodsCont">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    v-if="goodsList.length>0"
                    :offset="500"
            >
            <ul class="clearfix">
                <li v-for="(item,index) in goodsList" :key="index" @click="goodsDetails(item)">
                    <div class="goodsImg">
                        <img :src="item.goodsThumbnailUrl + '_200x200.jpg'">
                    </div>
                    <p class="name">
                        <!--自营-->
                        <img v-if="item.platformType == 3" src="@/assets/home/platform/details_icon_proprietary@2x.png" alt="">
                        <!--拼多多-->
                        <img v-if="item.platformType == 2" src="@/assets/home/platform/home_tab_pin_small@2x.png" alt="">
                        <!--淘宝-->
                        <img v-if="item.platformType == 0" src="@/assets/home/platform/home-rob_goods_icon_taobao@2x.png" alt="">
                        <!--天猫-->
                        <img v-if="item.platformType == 1" src="@/assets/home/platform/home-rob_goods_icon_tmall@2x.png" alt="">

                        {{item.goodsName}}
                    </p>
                    <p class="activity"><span v-if="item.hasCoupon">￥{{item.couponDiscount / 100}}</span> <span>补贴{{item.predictPromotion / 100}}</span></p>
                    <p class="price"><span>¥{{(item.minNormalPrice / 100 - item.couponDiscount / 100).toFixed(2)}}</span> <s>￥{{item.minGroupPrice / 100}}</s> <span>月售{{item.soldQuantity}}件</span></p>
                </li>
            </ul>
            </van-list>
        </div>
        <!--遮罩层-->
        <van-overlay :show="show" style="z-index: 99999999999;display: flex;justify-content: center;align-items: center">
            <div style="color: rgb(242,242,242);font-size: 16px">
                <h1>加载中·····</h1>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import { getTopGoodsList,} from '@/api/index.js'
	export default {
		name: "goodsList",
        data(){
			return{
				title:'',
                list:{
	                page: 1,
	                pageSize: 10,
	                sortType:''
                },
                goodsList:[],
				loading: false,
				finished: false,
				show:true
            }
        },
        created(){
	        //index :1全网爆款 2收益榜  3全民嗨吃
	        let title = this.$route.query.title
	        if(title == 0){
            	this.title = '全网爆款'
		        document.title = '全网爆款'
                this.list.sortType = 1
		        this.getGoodslist()

	        }else if(title == 1){
	            this.title = '收益榜'
		        document.title = '收益榜'
		        this.list.sortType = 4
		        this.getGoodslist()


	        }else if(title == 2){
	            this.title = '全民嗨吃'
		        document.title = '全民嗨吃'
		        this.list.sortType = 3
		        this.getGoodslist()
	        }
        },
        methods:{
	        onClickLeft(){
		        this.$router.go(-1)
	        },
	        onLoad(){
		        this.loading = true
		        this.list.page ++
		        this.getGoodslist()
            },
            getGoodslist(){
	            getTopGoodsList({
		            method: 'get',
		            data:this.list,
		            qs: false
	            }).then(res=>{
	            	if(res.code == '0'){
			            this.show=false
			            this.goodsList = this.goodsList.concat(res.data)
			            this.loading = false;
			            if(res.data.length < 10){
				            this.finished = true;
			            }
		            }else{
			            this.$toast(res.message);
		            }
	            })
            },
	        // 第三方商品详情   自营商品详情 0淘宝 1天猫 2拼多多 3自营
	        goodsDetails(item){
		        if(item.platformType != 3){
			        localStorage.setItem("goodsDetails", JSON.stringify(item))
			        this.$router.push({
				        name: "goodsDetails",
			        });
		        }
	        }
        }
	}
</script>
<style scoped lang="scss">
    .goodsCont{
        box-sizing: border-box;
        padding:0 15px;
        ul{
            li{
                float: left;
                margin-bottom: 10px;
                width: 48%;
                height: 270px;
                .goodsImg{
                    img{
                        width: 100%;
                        height: 168px;
                    }
                }
                p.name{
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    color: #191919;
                    img{
                        width: 18px;
                        height: 18px;
                        vertical-align:middle;

                    }
                }
                p.activity{
                    margin: 8px 0;
                    span{
                        font-size: 12px;
                        text-align: center;
                    }
                    span:nth-child(1){
                        display: inline-block;
                        width: 50px;
                        height: 16px;
                        background: url("~@/assets/home/platform/list_coupons_small@2x.png");
                        background-size: 100% 100%;
                        color: #fff;
                    }
                    span:nth-child(2){
                        display: inline-block;
                        width: 77px;
                        height: 16px;
                        background: #FEEEEB;
                        color: #F15A37;
                        border-radius:5px;
                    }
                }
                p.price{
                    span:nth-child(1){
                        color: #F15A37;
                        font-size: 14px;
                    }
                    s:nth-child(2){
                        color: #878787;
                    }
                    span:nth-child(3){
                        color: #878787;
                        float: right;
                    }
                }
            }
            li:nth-child(2n){
                margin-left: 4%;
            }
        }
    }
</style>
<style lang="scss">
.goodsList{
    box-sizing: border-box;
    padding-top: 50px;
    .header{
        width: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
        .van-nav-bar{
            .van-nav-bar__left{
                .van-icon{
                    color:#323233!important;
                }
            }
        }
    }
}
</style>
