<!--订单详情-->
<template>
  <div class="t_body">
    <div class="orderdetails_headr">
      <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" class="header" />
      <!-- <img src="@/assets/me/order_details_nav_icon_service.png" /> -->
    </div>
    <!--头部图片-->
    <!--交易成功状态-->
    <div class="headerimg">
      <!--交易成功状态-->
      <div class="wring">
        <p class="jyok">交易成功</p>
        <p>感谢您对我们的信赖</p>
      </div>

      <img src="@/assets/me/orders_details_top_image_successful_deal.png" />
    </div>

    <div class="centen">
      <div class="position">
        <img src="@/assets/me/order_details_icon_address_location.png" />
        <div class="Location">
          <span>{{detail.deliveryName}}</span>
          <span>{{detail.deliveryPhone}}</span>
          <p class="locat">{{detail.deliveryAddress}}</p>
        </div>
      </div>

      <div class="gooddetails" v-for="item in detail.payOrderDetailList" :key="item.value">
        <div class="details">
          <img :src="item.goodsImg" />
          <div class="Location">
            <p>{{item.goodsName}}</p>
            <p class="locat">{{item.goodsNum}}个</p>
            <p class="locat">¥{{item.goodsPrice}}</p>
            <div class="btnzt">
              <button type="btn" class @click="viewLogistics(item)">查看物流</button>
              <button @click="customerService()">申请售后</button>
            </div>
          </div>
        </div>
        <div class="a"></div>
        <div class="goodprice">
          <div class="priceall">
            <span>商品总价</span>
            <span>¥{{detail.allCcommissionAmount}}</span>
          </div>
          <div class="money">
            <span>实付款</span>
            <span>¥{{item.goodsPrice}}</span>
          </div>
        </div>
      </div>

      <div class="Orderinfor">
        <div>
          <div class="backimgcolor">
            <p class="backimg"></p>
            <span class="detail">订单详情</span>
          </div>
          <div class="orderid">
            <span>订单编号</span>
            <span>{{detail.id}}</span>
          </div>
          <div class="ordertime">
            <span>创建时间</span>
            <span>{{detail.createTime}}</span>
          </div>
          <div class="deliverytime">
            <span>发货时间</span>
            <span>{{detail.deliveryTime}}</span>
          </div>
          <div class="Closingtime">
            <span>成交时间</span>
            <span>{{detail.finishTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getorderdetails } from "@/api/me.js";
export default {
  name: "orderdetails",
  data() {
    let infoGet = this.$route.query; //接收传递过来的数据
    console.log("显示商品id:", infoGet.id);

    return {
      id: infoGet.id, //接收数据为订单id
      detail: [], //保存订单信息
      orderStatus: [] //按钮状态
    };
  },
  created() {
    this.orderdetails(); //创建查询
  },

  // 头部返回上一级
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    viewLogistics(item) {
      this.$router.push({
        path: "/viewLogistics",
        query: {
          // waybillNo: waybillNo //参数是id
          // waybillNo: 9896115335728
          good: item
        }
      });
    },
    customerService() {
      this.$router.push({
        path: "/customerService"
      });
    },

    orderdetails() {
      getorderdetails({
        method: "Get",
        data: {
          id: this.id //订单id 451566388002246
        },
        qs: false
      }).then(res => {
        if (res.code == 0) {
          //请求成功
          this.detail = res.data; //保存数据到detail
        }
        console.log(this.detail);
      });
    }
  }
};
</script>
<style scoped lang="scss">
.t_body {
  background: #f5f5f5;
  .headerimg {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    background: linear-gradient(
      90deg,
      rgba(255, 159, 28, 1),
      rgba(241, 90, 55, 1)
    );
  }
  .headerimg > img {
    width: 120px;
  }
  .wring,
  .Y_Paid,
  .D_Waitingpayment {
    color: #fff;
  }
  .jyok,
  .Paid,
  .Waitingpayment {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .centen {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .position {
    display: flex;
  }
  .position,
  .gooddetails,
  .Orderinfor {
    width: 300px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 20px;
    padding: 10px;
  }
  .gooddetails {
    flex-direction: column;
  }
  .details {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .position > img {
    width: 25px;
    height: 25px;
    margin-top: 10px;
  }
  .Location {
    line-height: 25px;
    padding: 10px;
    font-size: 13px;
  }
  .locat {
    color: darkgray;
  }
  .btnzt {
    display: flex;
  }
  .btnzt > button {
    width: 64px;
    background: rgba(240, 240, 240, 1);
    border-radius: 26px;
  }
  .details > img {
    width: 120px;
    height: 120px;
    border-radius: 0.15rem;
    margin-bottom: 10px;
  }
  .a {
    width: 310px;
    border: 1px solid #f0f0f0;
  }
  .goodprice {
    line-height: 25px;
  }
  .priceall,
  .money {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .orderid,
  .ordertime,
  .deliverytime,
  .Closingtime {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .backimgcolor {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .backimg {
    width: 8px;
    height: 16px;
    background: rgba(241, 90, 55, 1);
    border-radius: 5px;
  }
  .detail {
    margin-left: 10px;
  }
}
</style>
