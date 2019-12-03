<!--平台订单-->
<template>
  <div class="bady">
    <div class="platformorder_header">
      <van-nav-bar title="平台订单" left-arrow @click-left="onClickLeft" />
    </div>

    <!--顶部按钮-->
    <van-tabs v-model="active" @click="tabClick">
      <div class="backimg"></div>
      <van-tab title="全部" class="active"></van-tab>
      <van-tab title="已完成"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="已失效"></van-tab>
    </van-tabs>

    <!--已完成时没有订单的显示-->
    <div class="notcomplete" v-show="isShow">
      <img src="@/assets/me/notorderId.png" />
      <p>竟然还没有订单~赶紧边买边赚吧</p>
    </div>

    <!--商品列表-->
    <div class="goodsList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="getMyGoods.length>0"
        :offset="500"
      >
        <ul class="clearfix">
          <li v-for="item in getMyGoods" :key="item.value">
            <div class="tail div before">
              <div class="title">
                <img src="@/assets/me/zu20.png" />
                <p>{{item.orderSn}}</p>
                <button class="copyformorderSn" @click="copyformordertdId($event,item.orderSn)">复制</button>
                <p>{{item.orderStatus}}</p>
              </div>
              <div class="Yangshi"></div>
              <div class="div befo">
                <div class="robbed">
                  <img v-bind:src="item.goodsThumbnailUrl" />
                </div>
                <div class="wenan">
                  <p class="desc">{{item.goodsName}}</p>
                  <p>创建时间</p>
                  <p class="cjtime">{{getFormatDate(item.orderCreateTime,"yyyy-MM-dd hh:mm:ss")}}</p>
                  <span class="yuanjia">{{item.orderStatusDesc}}</span>
                  <div class="money">
                    <span class="bt">
                      约补贴
                      <span>{{item.userCommission}}</span>金币
                    </span>
                    <span class="price">¥{{item.goodsPrice / 100}}</span>
                  </div>
                </div>
              </div>
              <div class="Yangshi"></div>
              <div>
                <div class="tomoney">
                  <span>{{item.exl}}</span>
                  <button class="btn" @click="tobuy">再次购买</button>
                  <p></p>
                </div>
              </div>
              <div class="backimg"></div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/views/common/date.js";
import { getMyGoodsOrders } from "@/api/me.js";
import qs from "qs";
import Clipboard from "clipboard";
export default {
  name: "platformorder",
  data() {
    return {
      active: "",
      isShow: false,
      getMyGoods: [], //商品显示列表
      getPage: {
        //查询分页条件
        userid: "", //用户id
        orderStatus: "", //1已支付 2已失效 3已结算 不传是全部
        orderType: "1", //1个人 2团队
        page: 1,
        pageSize: 10,
        text: "" //查询字段
      },
      index: 0, //记录当前页面位置
      isBalance: "", //是否结算的条件
      loading: false, //载入
      finished: false //完成
    };
  },
  created() {
    this.getGoodsOrders(); //默认加载
  },
  // 头部返回上一级
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.loading = true;
      this.getPage.page++;
      this.getGoodsOrders();
    },
    tobuy() {},

    //复制运单号
    copyformordertdId(ele, formordertdId) {
      ele.currentTarget.setAttribute("data-clipboard-text", formordertdId);
      let clipboard = new Clipboard(".copyformorderSn");
      clipboard.on("success", e => {
        console.log("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        //释放内存
        clipboard.destroy();
      });
    },

    //点击按钮
    tabClick(index) {
      if (this.index != index) {
        this.isShow = false;
        //只有切换页面才执行查询新条件
        this.index = index; //切换页面位置
        this.isBalance = ""; //是否结算的条件
        switch (
          index //判断查询条件
        ) {
          case 1: //已完成
            this.getPage.orderStatus = "1";
            this.isBalance = "1"; //设置结算
            console.log("---切换页面已完成,1已支付 1已结算");
            break;
          case 2: //已支付
            this.getPage.orderStatus = "1";
            this.isBalance = "0"; //设置结算
            console.log("---切换页面已支付,1已支付 0未结算");
            break;
          case 3: //已失效
            this.getPage.orderStatus = "2";
            console.log("---切换页面已失效的，2已失效");
            break;
          default:
            //默认显示所有，查所有
            this.getPage.orderStatus = "";
            console.log("---切换页面全部");
            break;
        }
        this.getPage.page = 1; //初始化分页数据
        this.getPage.pageSize = 10;
        this.getMyGoods = [];
        this.loading = false; //载入
        this.finished = false; //完成
        this.getGoodsOrders(); //执行查询
      }
    },

    //平台订单
    getGoodsOrders() {
      let isBalance = this.isBalance; //判断是否结算
      getMyGoodsOrders({
        //请求
        method: "GET",
        data: this.getPage,
        qs: false
      }).then(res => {
        if (res.code == 0) {
          if (null == isBalance || isBalance == "") {
            //不查询结算
            this.getMyGoods = this.getMyGoods.concat(res.data); //新数据追加到商品列表之后
          } else {
            for (let i in res.data) {
              if (res.data[i].isBalance == isBalance) {
                //匹配结算情况
                this.getMyGoods.push(res.data[i]);
              }
            }
          }

          this.loading = false;
          if (res.data.length < 10) {
            //数据分页
            this.finished = true;
          }
          this.isShow = this.getMyGoods.length < 1;
          console.log(
            "分页:" +
              this.getPage.page +
              "/数据" +
              res.data.length +
              ",显示" +
              this.getMyGoods.length
          );
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //时间转换
    getFormatDate(time, fmt) {
      return formatDate(time, fmt);
    }
  }
};
</script>
<style scoped lang="scss">
.bady {
  [class*="van-hairline"]::after {
    border: none !important;
  }
  .active {
    margin-bottom: 20px;
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .title > img {
    width: 25px;
    height: 25px;
  }

  .title > button {
    width: 40px;
    color: #808080;
    background: rgba(240, 240, 240, 1);
    border-radius: 20px;
  }

  .title > img,
  p,
  button {
    margin-left: 0.5rem;
  }

  .befo {
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .Yangshi {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 10px;
  }

  .before {
    background: rgba(255, 255, 255, 1);
    margin-top: 20px;
  }

  .yuanjia,
  .bt {
    color: red;
  }

  .robbed > img {
    width: 120px;
    height: 120px;
    border-radius: 0.15rem;
    margin-bottom: 10px;
  }

  .wenan {
    margin-left: 15px;
    font-size: 15px;
  }

  .cjtime {
    margin-bottom: 15px;
  }

  .desc {
    margin-bottom: 5px;
  }

  .btn {
    width: 70px;
    height: 30px;
    position: relative;
    left: 62px;
    color: #fff;
    border: 1px solid #f15a37;
    background-color: #f15a37;
    border-radius: 26px;
  }

  .money,
  .tomoney {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tomoney {
    padding: 10px;
  }

  .backimg {
    width: 100%;
    height: 10px;
    background: rgba(245, 245, 245, 1);
  }

  .a {
    color: black;
  }
  .notcomplete {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .notcomplete > img {
    margin-bottom: 20px;
  }
  .notcomplete > p {
    font-size: 0.45rem;
  }
}
</style>
