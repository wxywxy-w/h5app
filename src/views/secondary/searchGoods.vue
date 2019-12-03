<template>
    <div class="searchGoods">
        <div class="header">
            <form action="/">
                <van-search
                        v-model="value"
                        placeholder="请输入搜索关键词"
                        show-action
                >
                    <div v-show="value.length == 0" slot="action" @click="onCancel">取消</div>
                    <div v-show="value.length != 0" slot="action" @click="onSearch">搜索</div>
                </van-search>
            </form>
        </div>
        <van-tabs v-model="active">
            <van-tab title="淘宝天猫">
                <div style="position:absolute;left: 0px;top: 0px;width: 100%;height: 100%;" v-show="tianmaoListShow">
                    <div style="margin:30% auto 0 auto;text-align: center;color: #808080">
                        <img style="width: 170px" src="@/assets/home/goodsDetails/iicon- blank@2x.png" alt="">
                        <p style="text-align: center">抱歉，淘宝天猫暂无相关宝贝，可以去拼多多看看</p>
                    </div>
                </div>
                <div class="goodsCont">
                    <van-list
                            v-model="loading1"
                            :finished="finished1"
                            finished-text="没有更多了"
                            @load="onLoad1"
                            :offset="800"
                            v-if="tianmaoList.length>0"

                    >

                        <ul class="clearfix">
                            <li v-for="(item,index) in tianmaoList" :key="index" @click="goodsDetails(item)">
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
                                <p class="activity"><span class="bg" v-if="item.hasCoupon">￥{{item.couponDiscount / 100}}</span> <span class="bt">补贴{{item.predictPromotion / 100}}</span></p>
                                <p class="priceprice"><span>¥{{(item.minNormalPrice / 100 - item.couponDiscount / 100).toFixed(2)}}</span> <s>￥{{item.minGroupPrice / 100}}</s> <span>月售{{item.soldQuantity}}件</span></p>
                            </li>
                        </ul>
                    </van-list>
                </div>
            </van-tab>

            <!--===========================-->
            <van-tab title="拼多多">
                <div style="position:absolute;left: 0px;top: 0px;width: 100%;height: 100%;" v-show="pinduoduoListShow">
                    <div style="margin:30% auto 0 auto;text-align: center;color: #808080">
                        <img style="width: 170px" src="@/assets/home/goodsDetails/iicon- blank@2x.png" alt="">
                        <p style="text-align: center">抱歉，拼多多暂无相关宝贝，可以去淘宝天猫看看</p>
                    </div>
                </div>
                <div class="goodsCont">
                    <van-list
                            v-model="loading2"
                            :finished="finished2"
                            finished-text="没有更多了"
                            @load="onLoad2"
                            :offset="500"
                            v-if="pinduoduoList.length>0"

                    >

                    <ul class="clearfix">

                        <li v-for="(item,index) in pinduoduoList" :key="index" @click="goodsDetails(item)">
                            <div class="goodsImg">
                                <img :src="item.goodsThumbnailUrl">
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
                            <p class="activity"><span class="bg" v-if="item.hasCoupon">￥{{item.couponDiscount / 100}}</span> <span class="bt">补贴{{item.predictPromotion / 100}}</span></p>
                            <p class="price"><span>¥{{(item.minNormalPrice / 100 - item.couponDiscount / 100).toFixed(2)}}</span> <s>￥{{item.minGroupPrice / 100}}</s> <span>月售{{item.soldQuantity}}件</span></p>
                        </li>
                    </ul>
                    </van-list>
                </div>
            </van-tab>
        </van-tabs>
        <!--遮罩层-->
        <van-overlay :show="show" style="z-index: 99999999999;display: flex;justify-content: center;align-items: center">
            <div style="color: rgb(242,242,242);font-size: 16px">
                <h1>加载中·····</h1>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import {earchGoods} from '@/api/index.js'
    export default {
		name: "searchGoods",
		data() {
			return {
				value:'',
				active: 2,
                //淘宝
                data1:{
	                keyword:'',
	                page:1,
	                pageSize:10,
	                sortType:0,
	                platformType:0
                },
                // 拼多多
				data2:{
					keyword:'',
					page:1,
					pageSize:10,
					sortType:0,
					platformType:2
				},
				loading1: false,
				finished1: false,
				loading2: false,
				finished2: false,
                tianmaoList:[],
                pinduoduoList:[],
				tianmaoListShow:false,
				pinduoduoListShow:false,
				toast1:false,
				toast2:false,
				show:true
			};
		},
        created(){
	        let sousuoValue = JSON.parse(localStorage.getItem("sousuo"));
            this.value = sousuoValue
            this.taobao()
            this.Pdd()
	        let active = JSON.parse(localStorage.getItem("active"));
	        if(active != undefined){
	        	this.active = active
            }

        },

	    methods:{
		    onLoad1(){
		    	console.log(1)
			    this.loading1 = true
			    this.data1.page ++
			    this.taobao()
            },
		    onLoad2(){
			    this.loading2 = true
			    this.data2.page ++
			    this.Pdd()
            },
	        onSearch() {
                this.data1.keyword = this.value
		        this.data1.page = 1
		        this.data2.keyword = this.value
		        this.data2.page = 1
                this.tianmaoList = []
                this.pinduoduoList = []
		        this.taobao()
		        this.Pdd()
	        },
	        onCancel() {
		        localStorage.removeItem('active');
		        this.$router.go(-1)
	        },

            // 淘宝 天猫
	        taobao(){
	        	this.data1.keyword = this.value
		        earchGoods({
			        method: "get",
			        data:this.data1,
			        qs:false
                }).then(res=>{
                    if(res.code == '0'){
                    	console.log(res.code)
	                    this.tianmaoList = this.tianmaoList.concat(res.data)
                        if(this.tianmaoList == null){
                        	this.tianmaoListShow = true
                        }
	                    this.loading1 = false;
	                    this.toast1 = true
                        if(this.toast2 == true){
	                        this.show = false
                        }
	                    if(res.data.length < 10){
		                    this.finished1 = true;
	                    }
                    }
                })
            },
            // 拼多多
	        Pdd(){
		        this.data2.keyword = this.value
		        earchGoods({
			        method: "get",
			        data:this.data2,
			        qs:false
		        }).then(res=>{
			        if(res.code == '0'){
			        	console.log(res.data)
                        if(res.data != null){
	                        this.pinduoduoList = this.pinduoduoList.concat(res.data)
                            if(this.pinduoduoList == null){
                            	this.pinduoduoListShow = true
                            }
	                        if(res.data.length < 10){
	                            this.finished2 = true;
	                        }
                        }
				        this.loading2 = false;
				        this.toast2 = true
				        if(this.toast1 == true){
					        this.show = false
				        }

			        }
		        })
	        },
	        // 第三方商品详情   自营商品详情 0淘宝 1天猫 2拼多多 3自营
	        goodsDetails(item){
		        if(item.platformType != 3){
			        localStorage.setItem("active", JSON.stringify(this.active))
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
.searchGoods{
    .header{
        width: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
        z-index: 9999999;
    }
}
</style>

<style lang="scss">
    .searchGoods{
        box-sizing: border-box;
        padding-top: 100px;
        .goodsCont{
            box-sizing: border-box;
            padding:0 15px;
            position: relative;
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
                        span.bg{
                            display: inline-block;
                            width: 50px;
                            height: 16px;
                            background: url("~@/assets/home/platform/list_coupons_small@2x.png");
                            background-size: 100% 100%;
                            color: #fff;
                        }
                        span.bt{
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
        height: 100%;
        .van-tabs{
            .van-tabs__wrap{
                z-index: 9999999;
            }
            .van-hairline--top-bottom{
                width: 100%;
                position: fixed;
                left: 0;
                top: 50px;
                border-bottom: 5px solid rgb(245,245,245);;


            }
            .van-tab--active {
                color: #ee0a24;
                font-weight: 500;
            }
            height: calc(100% - 54px)!important;
            .van-tabs__content{
                height: 100%;
                height: calc(100% - 54px)!important;
            }
        }
    }
</style>
