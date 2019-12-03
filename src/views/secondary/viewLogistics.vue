<!--查看物流-->
<template>
  <div class="webllologistics">
    <!--商品物流-->
    <div class="viewLogistics_headr">
      <van-nav-bar title="物流详情" left-arrow @click-left="onClickLeft" class="header" />
      <div class="a"></div>
      <div class="backall">
        <div class="gooddetails">
          <div class="details">
            <img :src="good.goodsImg" alt />
            <div class="Location">
              <p>{{ post.length && post[0].scanType}}</p>
              <p>{{good.goodsName}}</p>
              <p class="locat">{{good.goodsNum}}个</p>
              <span class="locat">¥{{good.goodsPrice}}</span>
              <span class="locat">x{{good.goodsNum}}</span>
            </div>
          </div>
        </div>
        <!--已签收状态-->
        <div>
          <div class="gooddetails">
            <div class="details">
              <span class="locat">中通快递</span>
              <span class="locat">{{good.payOrderId}}</span>
              <button class="copywebllion" @click="copyordertd($event,good.payOrderId)">复制</button>
            </div>
          </div>

          <div class="gooddetails">
            <van-steps direction="vertical" :active="0">
              <p>物流详情</p>
              <van-step v-for="item in post" :key="item.value">
                <p>{{item.acceptTime}}</p>
                <p>{{item.scanType }}</p>
                <p>{{item.remark}}</p>
                <!-- v-show="indexOf('电话:item.remark' data-clipboard-text="($event,good.payOrderId)") > -1"-->
                <button
                  v-show="item.remark.indexOf('电话:') > -1"
                  class="copyiphone"
                  @click="copy($event,item.remark)"
                >复制手机号</button>
              </van-step>
            </van-steps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getviewLogistics } from "@/api/me.js";
import Clipboard from "clipboard";
export default {
  name: "viewLogistics",
  data() {
    let infoGet = this.$route.query;
    console.log("获取参数:", infoGet);
    return {
      info: infoGet,
      good: infoGet.good, //商品
      waybillNo: infoGet.good.waybillNo, // //接收物流单号
      data: [], //查询到的运单信息
      post: [], //订单的显示信息,
      data1: [
        {
          acceptAddress: infoGet.acceptAddress,
          acceptTime: infoGet.acceptTime,
          scanType: infoGet.scanType,
          remark: infoGet.remark
        }
      ]
      //   post_Type: [
      //     {
      //       value: "0",
      //       label: "百世"
      //     },
      //     {
      //       value: "1",
      //       label: "中通"
      //     },
      //     {
      //       value: "2",
      //       label: "圆通"
      //     }
      //   ],
      //   post_Status: [
      //     {
      //       value: "0",
      //       label: "收件"
      //     },
      //     {
      //       value: "1",
      //       label: "发件"
      //     },
      //     {
      //       value: "2",
      //       label: "到件"
      //     },
      //     {
      //       value: "3",
      //       label: "派件"
      //     },
      //     {
      //       value: "4",
      //       label: "入库"
      //     },
      //     {
      //       value: "5",
      //       label: "签收"
      //     }
      //   ]
    };
  },

  created() {
    this.viewLogistics();
  },
  mounted() {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    copyordertd(ele, payOrderId) {
      ele.currentTarget.setAttribute("data-clipboard-text", payOrderId);
      let clipboard = new Clipboard(".copywebllion");
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
    //复制手机号
    copy(ele, remark) {
      let phonenumber = remark.split("电话:")[1].substr(0, 11); //截取出电话号码
      ele.currentTarget.setAttribute("data-clipboard-text", phonenumber); //设置元素复制文本为 电话号码
      let clipboard = new Clipboard(".copyiphone");
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
    viewLogistics() {
      getviewLogistics({
        method: "Get",
        data: {
          waybillNo: 9896115335728 // this.good.waybillNo //物流号 9896115335728
        },
        qs: false
      }).then(res => {
        this.post = JSON.parse(res.data[0].postJson); //转换运单信息为JSON对象
        // console.log("运单信息（运单过程）："+ this.postJson.length);
        console.log("数据：" + this.post[0].remark.toString());
      });
    }
  }
};
</script>
<style scoped lang="scss">
.webllologistics {
  .backall {
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .a {
    width: 100%;
    height: 10px;
    background: rgba(245, 245, 245, 1);
  }
  .gooddetails {
    width: 300px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 20px;
    padding: 10px;
    flex-direction: column;
  }
  .details {
    border-radius: 0.266667rem;
    background: rgba(255, 255, 255, 1);
    display: flex;
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
  .copywebllion {
    width: 40px;
    height: 20px;
    color: rgba(128, 128, 128, 1);
    background: rgba(240, 240, 240, 1);
    border-radius: 20px;
  }
  .details > img {
    width: 120px;
    height: 120px;
    border-radius: 0.15rem;
    margin-bottom: 10px;
  }
  .Unshipped {
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    margin-bottom: 197px;
  }
  .weimg {
    width: 330px;
    margin-bottom: 20px;
  }
  .wenAn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .copyiphone {
    width: 80px;
    height: 25px;
    background: rgba(240, 240, 240, 1);
    border-radius: 22px;
    margin-left: 171px;
  }
}
</style>
