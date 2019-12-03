<template>
   <div  id="box" >
     <div class="header">
         <van-nav-bar
                 title="我的收藏"
                 left-arrow
                 @click-left="onClickLeft"

         />
     </div>

       <div class="tab_1">
           <van-list
                   v-model="loading"
                   :finished="finished"
                   finished-text="没有更多了"
                   @load="onLoad"
                   :offset="300"
           >
           <ul>
               <li
                       v-for="(item,index) in getfavorite" :key="index"
               >
                   <div>
                       <img :src="item.goodsImageUrl" alt="">
                   </div>
                   <div>
                       <p><img src="@/assets/collection/taobao_icon@2x.png" alt="">{{item.goodsName}}</p>
                       <!--<p>约补贴¥{{item.couponMinOrderAmount}}</p>-->
                       <p class="activity"><span v-if="item.hasCoupon" class="yh">￥{{item.couponDiscount / 100}}</span>&nbsp;&nbsp;<span>约补贴{{item.predictPromotion / 100}}</span></p>
                       <p class="price"><span>¥{{(item.minNormalPrice / 100 - item.couponDiscount / 100).toFixed(2)}}</span> <s>￥{{item.minGroupPrice / 100}}</s></p>

                       <!--<p><span>¥</span>{{item.minNormalPrice}}<span>¥{{item.predictPromotion}}</span></p>-->
                   </div>
               </li>
           </ul>
           </van-list>
       </div>



   </div>
</template>

<script>

    import {getfavorite} from '@/api/collection.js'

	export default {
		name: "collection",
        data(){
           return{
               loading: false,
               finished: false,
               getfavorite:[]
           }
        },
    created(){
        getfavorite({
            method:'get',
            data: {
            },
            qs:true
        }).then(res=>{
            if (res.code == '0'){
                this.getfavorite = this.getfavorite.concat(res.data)
                this.loading = false;
                if(res.data.length < 10){
                    this.finished = true;
                }
            } else{
                this.$toast(res.message);
            }
        })
    },
        methods:{
		    onLoad(){
		        this.loading=true
            },
            onClickLeft() {         //返回上一层
                this.$router.go(-1);
            },

            //收藏


        }
	}
</script>

<style scoped  lang="scss">
    #box{
        height: auto!important;
        background: rgba(240, 240, 240, 1);
        .header {
            width: 100%;
            position: fixed;
            top: 0;
            left: 0px;
            .van-nav-bar{
                background: linear-gradient(90deg, rgba(255, 159, 28, 1), rgba(241, 90, 55, 1));
                i{
                    font-size: 22px;
                    color:rgba(255,255,255,1);
                }
                .van-nav-bar__title{
                    color:rgba(255,255,255,1);
                }
            }
        }

        .tab_1 {
            width: 345px;
            margin: 0 auto ;
            ul{
                 padding-top:45px;
                  li{
                      margin-top: 10px;
                      height: 132px;
                      background: rgba(255, 255, 255, 1);
                      border-radius: 10px;
                      overflow: hidden;
                      div:nth-child(1) {
                          float: left;
                          img {
                              width: 112px;
                              height: 112px;
                             margin: 10px;
                              border-radius:10px;
                          }
                      }
                      div:nth-child(2) {
                          p.activity{
                              margin: 8px 0;
                              span{
                                  font-size: 12px;
                                  text-align: center;
                              }
                              span.yh{
                                  display: inline-block;
                                  width: 50px;
                                  height: 16px;
                                  background: url("~@/assets/home/platform/list_coupons_small@2x.png");
                                  background-size: 100% 100%;
                                  color: #fff;
                              }
                              /*span:nth-child(2){*/
                                  /*display: inline-block;*/
                                  /*width: 77px;*/
                                  /*height: 16px;*/
                                  /*background: #FEEEEB;*/
                                  /*color: #F15A37;*/
                                  /*border-radius:5px;*/
                              /*}*/
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
                          p {
                              overflow: hidden;
                              display: -webkit-box;
                              -webkit-line-clamp: 2;
                              -webkit-box-orient: vertical;
                              vertical-align: middle;
                              font-size: 14px;
                              font-family: PingFang SC;
                              font-weight: 400;
                              color: rgba(51, 51, 51, 1);
                              line-height: 20px;
                              margin: 10px 10px 0px 10px;
                              img {
                                  vertical-align: middle;
                                  width: 14px;
                                  height: 14px;
                              }
                          }
                          p:nth-child(2) {
                              font-size: 12px;
                              font-family: PingFang SC;
                              font-weight: 400;
                              color: rgba(241, 90, 55, 1);
                              line-height: 14px;
                              margin-top: 5px;
                          }
                          p:nth-child(3) {
                              margin-top: 10px;
                              font-size: 16px;
                              font-family: PingFang SC;
                              font-weight: 400;
                              color: rgba(241, 90, 55, 1);
                              line-height: 14px;
                              s{
                                  color: #ccc;
                                  font-size: 12px;
                              }
                              span {
                                  font-size: 12px;
                              }
                              span:nth-child(2) {
                                  font-size: 12px;
                                  font-family: PingFang SC;
                                  font-weight: 400;
                                  color: rgba(128, 128, 128, 1);
                                  line-height: 14px;
                                  text-decoration: line-through;
                                  padding: 5px;
                              }
                          }
                      }
                  }
              }
        }
    }
</style>
