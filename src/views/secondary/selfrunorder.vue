<!--自营订单-->
<template>
  <div class="selfrunorder">
    <div class="selfrunorder_header">
      <van-nav-bar title="自营订单" left-arrow @click-left="onClickLeft" />
    </div>

    <!--顶部按钮-->
    <van-tabs v-model="active" @click="tabClick">
      <div class="backimg"></div>
      <van-tab title="全部" class="active"></van-tab>
      <van-tab title="待支付"></van-tab>
      <van-tab title="已完成"></van-tab>
      <van-tab title="已付款"></van-tab>
      <van-tab title="已失效"></van-tab>
    </van-tabs>

    <!--已完成时没有订单的显示-->
    <div class="notcomplete" v-show="isShow">
      <img src="@/assets/me/notorderId.png" />
      <p>竟然还没有订单~赶紧边买边赚吧</p>
    </div>

    <div class="goodsList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="getgoodlist.length>0"
        :offset="500"
      >
        <div class="backimg"></div>
        <ul class="clearfix">
          <li v-for="item in getgoodlist" :key="item.value">
            <div class="tail div before">
              <div class="title">
                <img src="@/assets/me/zu20.png" />
                <p>{{item.orderSn}}</p>
                <button class="copyorderSn" @click="copyordertdId($event,item.orderSn)">复制</button>
              </div>
              <div class="div befo">
                <div class="robbed">
                  <img v-bind:src="item.payOrderDetailList[0].goodsImg" />
                </div>
                <div class="wenan">
                  <p class="desc">{{item.payOrderDetailList[0].goodsName}}</p>
                  <p class="allnum">x{{item.payOrderDetailList[0].goodsNum}}</p>
                  <p>创建时间</p>
                  <p>{{getFormatDate(item.createTime,"yyyy-MM-dd hh:mm:ss")}}</p>
                  <span class="jyfy">精英返佣</span>
                  <span class="price">¥{{item.payOrderDetailList[0].goodsPrice}}</span>
                </div>
              </div>
              <div class="ovre">
                <div class="money">
                  <span class="bt">
                    约补贴
                    <span>2</span>金币
                  </span>
                  <span>
                    共
                    <span>{{item.payOrderDetailList[0].goodsNum}}</span> 件商品 合计
                    ¥
                    <span>{{item.payOrderDetailList[0].goodsPrice}}</span>
                  </span>
                </div>
                <div class="to_money">
                  <span>{{item.exl}}</span>
                  <div class="btnAll">
                    <button
                      class="zybtn select"
                      v-if="item.orderStatus!=1 && item.orderStatus!=4"
                      @click="orderdetails(item.id)"
                    >查看订单</button>
                    <button class="zybtn to" v-if="item.orderStatus==1" @click="topay()">前往支付</button>
                    <button
                      class="zybtn del"
                      v-if="item.orderStatus==4"
                      @click="delorder(item.id)"
                    >删除订单</button>
                  </div>
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
import { getList, deleteorder } from "@/api/me.js";
import Clipboard from "clipboard";
import qs from "qs";

export default {
  name: "selfrunorder",
  data() {
    return {
      active: "",
      isShow: false,
      getgoodlist: [], //获取字段
      getPage: {
        //查询数据
        page: 1,
        pageSize: 10,
        orderStatus: "", //1未支付 2已支付 3失效 4完成不传是全部
        keyword: "" //关键字
      },
      index: 0, //记录当前页面位置
      loading: false, //载入
      finished: false, //完成
      id: "" //删除id字段
    };
  },
  created() {
    this.getaddList();
  },

  // 头部返回上一级
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.loading = true;
      this.getPage.page++;
      this.getaddList();
    },
    //查看订单
    orderdetails(id) {
      this.$router.push({
        //跳转详情页面
        path: "/orderdetails",
        query: {
          id: id //参数是id
        }
      });
    },

    //复制运单号
    copyordertdId(ele, ordertdId) {
      ele.currentTarget.setAttribute("data-clipboard-text", ordertdId);
      let clipboard = new Clipboard(".copyorderSn");
      clipboard.on("success", e => {
        console.log("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    //点击按钮
    tabClick(index) {
      if (this.index != index) {
        this.isShow = false;
        this.index = index; //切换页面位置
        this.getPage.orderStatus = index == 0 ? "" : index;
        console.log("--切换显示" + index);
        this.getPage.page = 1; //初始化分页数据
        this.getPage.pageSize = 10;
        this.getgoodlist = [];
        this.loading = false; //载入
        this.finished = false; //完成
        this.getaddList(this.getPage); //查询
      }
    },

    //平台订单
    getaddList() {
      getList({
        method: "GET",
        data: this.getPage,
        qs: false
      }).then(res => {
        if (res.success) {
          this.getgoodlist = this.getgoodlist.concat(res.data); //新数据追加到商品列表之后
          this.loading = false;
          if (res.data.length < 10) {
            //数据不足分页
            this.finished = true;
          }
          this.isShow = this.getgoodlist.length < 1;
          console.log(
            "分页:" +
              this.getPage.page +
              "/数据" +
              res.data.length +
              ",显示" +
              this.getgoodlist.length
          );
        } else {
          this.$Message.error(res.message);
        }
      });
    },

    //时间转换
    getFormatDate(time, fmt) {
      return formatDate(time, fmt);
    },
    //前往支付订单
    topay() {},
    //删除订单
    delorder(id) {
      let that = this;
      deleteorder({
        method: "POST",
        data: {
          id: id
        },
        qs: false
      }).then(res => {
        // console.log(res.data);
        if (res.code == 0) {
          for (let i in this.getgoodlist) {
            //从当前页面显示数据中删除对应id的数据
            if (this.getgoodlist[i].id == id) {
              this.getgoodlist.splice(i, 1);
              that.$toast("删除成功");
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.selfrunorder {
  [class*="van-hairline"]::after {
    border: none !important;
  }

  .active {
    margin-bottom: 20px;
  }
  .price {
    position: relative;
    left: 80px;
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
    margin-right: 46px;
  }

  .before {
    background: rgba(255, 255, 255, 1);
    margin-top: 20px;
  }
  .jyfy {
    margin-left: 20px;
  }
  .jyfy,
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
    font-size: 15px;
  }
  .desc {
    margin-bottom: 10px;
  }
  .allnum {
    position: relative;
    /* float: left; */
    left: 170px;
  }

  .zybtn {
    width: 65px;
    height: 24px;
    border: 1px solid rgba(205, 205, 205, 1);
    border-radius: 26px;
    background-color: #f0f0f0;
  }
  .to {
    width: 65px;
    height: 24px;
    color: #f0f0f0;
    background: rgba(241, 90, 55, 1);
    border: 1px solid rgba(241, 90, 55, 1);
    border-radius: 26px;
  }
  .money,
  .to_money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .backimg {
    width: 100%;
    height: 10px;
    background: rgba(245, 245, 245, 1);
  }

  .ovre {
    padding: 10px;
  }
  .notcomplete {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 4.5rem;
  }
  .notcomplete > img {
    margin-bottom: 20px;
  }
  .notcomplete > p {
    font-size: 0.45rem;
  }
}
</style>
