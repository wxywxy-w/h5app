<template>
    <div class="OrderPay">
        <div class="header">
            <van-nav-bar
                    title="订单确认"
                    left-arrow
                    @click-left="onClickLeft"
            />
            <div class="title_bottom"></div>
        </div>
        <div class="cont">
            <div class="Delivery">
                <p><span></span>&nbsp;&nbsp;&nbsp;包邮配送</p>
                <div v-if="dizhishow == false" class="none" @click="$router.push({name:'Address'})">
                    <img src="@/assets/home/OrderPay/mine_gold_icon_instructions@2x.png" alt="">&nbsp;&nbsp;还未设置收货地址 快去添加吧
                </div>
                <div v-if="dizhishow == true" class="show">
                    <img @click="$router.push({name:'addressList'})" class="go" src="@/assets/home/goodsDetails/mine_icon_forward_small@2x.png" alt="">
                    <p>
                        <img class="dizhi" src="@/assets/home/goodsDetails/exchange_shop_icon_address_location@2x.png" alt="">
                        {{dizhi.name}} {{dizhi.phone}}
                    </p>
                    <p>{{dizhi.address}}</p>
                </div>
            </div>
            <!--商品-->
            <div class="goods">
                <ul>
                    <li>
                        <div class="left">
                            <img :src="goodsData.goodsThumbnailUrl" alt="">
                        </div>
                        <div class="right">
                            <p>{{goodsData.goodsName}}</p>
                            <p class="price">￥{{(goodsData.minGroupPrice / 100).toFixed(2)}} <span>x1</span></p>
                        </div>
                    </li>
                </ul>
                <div class="num">
                    <p>共1件商品  合计 <span>￥{{(goodsData.minGroupPrice / 100).toFixed(2)}}</span></p>
                </div>
            </div>
        </div>
        <div class="pay">
            <p>
                需要支付：<span>￥{{(goodsData.minGroupPrice / 100).toFixed(2)}}</span>
                <button>支付宝付款</button>
                <!--<button @click="pay()">支付宝付款</button>-->
            </p>
        </div>
    </div>
</template>

<script>
    import { getdaaressList,directBuyH5 } from '@/api/me.js'
    import qs from 'qs'

    export default {
		name: "OrderPay",
        data(){
			return{
                goodsData: {},
                dizhi:[],
                dizhishow:true
            }
        },
        created(){
	        let goodsData = JSON.parse(localStorage.getItem("OrderPay"));
	        this.goodsData = goodsData


            this.getdaaressList()


        },
        methods:{
	        onClickLeft(){
	        	this.$router.push({path:'/home/privilege'})
	        },

	        getdaaressList(){
		        getdaaressList({
			        method: 'get',
			        data: {},
			        qs:false
                }).then(res=>{
                	console.log(res)
                	if(res.code == '0'){
                		this.dizhi = res.data[0]
                        if(res.data.length >0){
                        	this.dizhishow = true
                        }else{
	                        this.dizhishow = false
                        }
                    }else{
		                this.$toast(res.message);
	                }
                })
            },
	        pay(){
		        // json数组 格式 id:购物车id（直接购买不用传） plateGoodsId:商品库关联id goodsNum:商品数量  specs：规格

		        let detailList = JSON.stringify([{
			            // plateGoodsId:`${this.goodsData.plateGoodsId}`
			        plateGoodsId:`33`,
			        goodsNum:'1',
		        }])
	        	let data = {
			        detailList,
			        // payAmount:this.goodsData.minGroupPrice, //支付金额 分
			        payAmount:'1', //支付金额 分

			        payType:1,  //支付宝
			        memberType:1, //会员登记信息
			        deliveryAddress:this.dizhi.address,  //收货地址
			        deliveryName:this.dizhi.name,    //收货姓名
			        deliveryPhone:this.dizhi.phone,   //收货人手机号
                }
                // console.log(qs.stringify(data))
		        directBuyH5({
			        method: 'post',
			        data:data,
			        qs:true
                }).then(res=>{

			        const div = document.createElement('div')
			        div.innerHTML = res //此处form就是后台返回接收到的数据
			        document.body.appendChild(div)
			        document.forms[0].submit()

                })
            }
        },
		// 销毁组件，返回刷新
		deactivated() {
			this.$destroy()
		},
	}
</script>

<style scoped lang="scss">
.OrderPay{
    position: relative;
    background: #F5F5F5;
    .header {
        .title_bottom{
            height: 40px;
            background: linear-gradient(-90deg, #f15a37, #ff9f1c);

        }
    }
    .cont{
        width: 100%;
        position: absolute;
        top: 60px;
        z-index: 9999;
        div{
            width: 345px;
            margin: 0 auto;
            border-radius: 10px;
            background: #fff;
        }
        .Delivery{
            div{
                width: 100%;
                height: 88px;
            }
            .none{
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 16px;
                    height: 16px;
                }
            }
            .show{
                vertical-align:middle;
                box-sizing: border-box;
                img.go{
                    width: 40px;
                    position: absolute;
                    right: 20px;
                    top: 60px;

                }
                p{
                    border-bottom: 0 solid #F0F0F0;
                }
                p:nth-child(3){
                    line-height: 18px;
                }
                img.dizhi{
                    vertical-align:middle;
                    width: 20px;
                }
            }
            p{

                height: 44px;
                line-height: 44px;
                box-sizing: border-box;
                padding:0 40px;
                vertical-align:middle;
                font-size: 14px;
                color:rgba(51,51,51,1);
                border-bottom: 1px solid #F0F0F0;
                span{
                    vertical-align:middle;
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background: #F15A37;
                    border-radius: 50%;
                }
            }
        }
        .goods{
            height: 110px;
            margin-top: 10px;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            ul{
                box-sizing: border-box;
                padding: 10px;
                li{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .left{
                        width: 90px;
                        height: 90px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .right{
                        box-sizing: border-box;
                        padding: 10px;
                        width: 220px;
                        height: 90px;
                        font-size: 15px;
                        p.price{
                            width: 100%;
                            margin-top: 25px;
                            color: #F15A37;
                            font-size: 14px;
                            span{
                                float: right;
                                color: #808080;
                                font-size: 14px;
                                font-weight: 400;
                            }
                        }
                    }
                }
            }
            .num{
                border-top-right-radius: 0;
                border-top-left-radius: 0;
                border-top: 1px solid #F0F0F0;
                p{
                    box-sizing: border-box;
                    padding: 0 20px;
                    height: 55px;
                    line-height: 55px;
                    text-align: right;
                    span{
                        color: #F15A37;
                    }

                }
            }
        }
    }
    .pay{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        font-size: 14px;
        p{
            box-sizing: border-box;
            padding:0 15px ;
            height: 66px;
            line-height: 66px;
            span{
                color: #F15A37;
            }
            button{
                float: right;
                border: 0;
                border-radius: 22px;
                width: 132px;
                height: 44px;
                line-height: 50px;
                color: #fff;
                background:linear-gradient(90deg,rgba(254,142,46,1),rgba(241,90,55,1));
                box-shadow:0px 2px 4px 0px rgba(241,90,55,0.3);
                margin-top: 10px;

            }
        }
    }
}
</style>


<style lang="scss">
    .OrderPay {
        [class*=van-hairline]::after {
            border: 0px!important;
        }
        .header {
            .van-nav-bar {
                background: linear-gradient(-90deg, #f15a37, #ff9f1c);
                .van-nav-bar__title{
                    color: #fff !important;
                }
                .van-nav-bar__left {
                    .van-icon {
                        color: #fff !important;
                    }
                }
            }
        }
    }
</style>
