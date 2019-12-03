<template>
    <div class="indexHome">
      <!--搜索框-->
      <div class="header">
        <div class="search" @click="toSearch">
          <img src="@/assets/home/search.png" alt="">
          搜商品标题 拿大额优惠返利
        </div>
      </div>

      <!--轮播-->
      <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swipeImgUrl" :key="index">
          <img @click="swipeGo(item)" :src="item.picUrl" alt="">
        </van-swipe-item>
      </van-swipe>

      <!--零元购-->
      <a :href="huodong.linkUrl">
        <div class="zero">
          <img :src="huodong.picUrl" alt="">
        </div>
      </a>


      <!--好货直达-->
      <div class="direct">
        <p><img src="@/assets/home/home_icon_zhida@2x.png" alt=""> 好货直达</p>
        <div class="left" @click="goodsList(0)">
          <img src="@/assets/home/home_middle_image_all_hotlist@2x.png" alt="">
        </div>
        <div class="right">
          <div @click="goodsList(1)">
            <img src="@/assets/home/home_middle_image_earnings@2x.png" alt="">
          </div>
          <div @click="goodsList(2)">
            <img src="@/assets/home/home_middle_image_foods@2x.png" alt="">
          </div>
        </div>

      </div>

      <!--爆款标题组建-->
      <yysl_baokuan class="title"></yysl_baokuan>

      <!--商品列表-->
      <div class="goodsList">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                v-if="HomeGoodsList.length>0"
                :offset="500"
        >
        <ul class="clearfix">

            <li v-for="(item,index) in HomeGoodsList" :key="index" @click="goodsDetails(item)">
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

              <p class="price"><span>¥{{(item.minNormalPrice / 100 - item.couponDiscount / 100).toFixed(2)}}</span> <s>￥{{(item.minGroupPrice / 100).toFixed(2)}}</s> </p>
              <p style="color: #878787"><span>月售{{item.soldQuantity|million}}件</span></p>
              <p class="activity"><span v-if="item.hasCoupon">￥{{item.couponDiscount / 100}}</span> <span>补贴{{item.predictPromotion / 100}}</span></p>

            </li>

        </ul>
        </van-list>

      </div>


    </div>
</template>

<script>
	import {getBanners, getHomeGoods,getHomePlatesType} from '@/api/index.js'

	export default {
		name: "index",
		data() {
			return {
				loading: false,
				finished: false,
				swipeImgUrl: [],
				//首页爆款 请求数据带分页
				HomeGoods:{
					page: 1,
					pageSize: 10,
					memberType: 1
                },
				HomeGoodsList:[],
                huodong:''
			}
		},
		created() {
			//轮播
			getBanners({
				method: 'get',
				data: {
					plateId: '1'
				},
				qs: false
			}).then(res => {
				if (res.code == '0') {
					this.swipeImgUrl = res.data
				}
			})
			getHomePlatesType({
				method: 'get',
				data: {},
				qs: false
			}).then(res=>{
				console.log(res,'活动')
                this.huodong = res.data[0]
            })
            let user = {
	            userId:'6133',
	            ticket:'VFhwRlBRPT07TENrc0xDNHA7MzEzMQ=='
            }

			localStorage.setItem("user", JSON.stringify(user))



			//首页爆款
			this.getHomeGoods();


		},
		filters: {
			//处理过万
			million:function (value){//过万处理
				let num;
				if(value > 9999){//大于9999显示x.xx万
					num=(Math.floor(value/1000)/10) + '万';
				}else if( value < 9999 && value>-9999){
					num=value
				}else if(value<-9999){//小于-9999显示-x.xx万
					num = -(Math.floor(Math.abs(value)/1000)/10)+'万'
				}
				return num;
			},
        },

		methods: {

			onLoad(){
				this.loading = true
				this.HomeGoods.page ++
                console.log(this.HomeGoods.page)
                this.getHomeGoods()
            },
			//首页爆
			getHomeGoods() {
				getHomeGoods({
					method: 'get',
					data: this.HomeGoods,
					qs: false
				}).then(res => {
					if(res.code == 0){
                      this.HomeGoodsList = this.HomeGoodsList.concat(res.data)
						this.loading = false;
						console.log(res.data)
                        if(res.data.length < 10){
	                        this.finished = true;
                        }
					}else{
						this.$toast(res.message);
					}
				})
			},
			toSearch() {
				console.log(1)
				this.$router.push({path: '/search'})
			},
			goodsList(index) {
				//index :1全网爆款 2收益榜  3全民嗨吃

				this.$router.push({
					name: "goodsList",
					query: {
						title: index
					}
				});
			},
			getUrl(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
				if (r != null) return decodeURIComponent(r[2]);
				return null;
			},
			//跳转外部链接
			swipeGo(item) {
				console.log(item)
				switch (item.jumpType) {
					// 1.跳到商品详情
					case 1:
						this.axios({
	                        url:`${item.linkUrl}?${item.params}`,
	                        method: 'get',
                        }).then(res=>{
                            this.goodsDetails(res.data.data.goodsDTO)
                        })
						break;
					// 跳到自己的H5页面
					case 5:
						localStorage.setItem("swipeGo", JSON.stringify(item))
						this.$router.push({
							name: "webview",
						});
						break;
					// 6.跳到第三方的H5页面（1.天猫超市，2天猫国际
					case 6:
						let url = `${item.linkUrl}?${item.params}`
						window.location.href = url
						break;
				}
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
  .indexHome{
    /*margin-bottom: 50px;*/
    box-sizing: border-box;
    padding-top: 50px;
    .header{
      z-index: 99999;
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 50px;
      background:linear-gradient(-90deg,rgba(255,159,28,1),rgba(241,90,55,1));
      display: flex;
      justify-content: center;
      align-items: center;
      .search{
        width: 90%;
        height: 30px;
        border-radius: 5px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #808080;
        img{
          width: 15px;
          position: relative;
          left: -75px;
        }
      }
    }
    .swipe{
      height: 150px;
      width: 100%;
      .van-swipe-item{
        overflow-y: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }

    .zero{
      width: 346px;
      height: 88px;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
    .direct{
      width: 325px;
      height: 203px;
      margin: 10px auto;
      vertical-align:middle;
      .left{
        width:153px;
        height: 164px;
        margin: 5px 0;
        display: inline-block;
        img{
          width: 100%;
        }
      }
      .right{
        margin: 5px 0;
        display: inline-block;
        float: right;
        width: 168px;
        height: 164px;
        div{
          height: 80px;
          img{
            width: 100%;
          }
        }
        div:nth-child(2){
          margin-top: 4px;
        }
      }
      img{
        width: 18px;
        vertical-align:middle;
      }
    }

    .title{
      margin: 10px 0;
    }
    .goodsList{
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
  }

</style>
