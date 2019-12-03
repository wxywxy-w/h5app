<template>
  <div>
    <div id="box">
      <div class="header">
        <div class="nav">
          <h2>个人中心</h2>
        </div>

        <div class="portrait">
          <div class="left">
            <div class="userImg">
              <img :src="list.headImg" alt />
            </div>
            <div class="userDetail">
              <p>会员昵称 : {{list.nickName}}</p>
              <!-- <p>邀请码 : {{list.userId}}</p>
              <button class="copyYqm">复制</button>-->
            </div>
          </div>
        </div>
      </div>

      <div class="tab_1">
        <div class="upper">
          <i>
            <img src="@/assets/me/mine_icon_save@2x.png" alt />
          </i>
          <p>
            小绿蓝已为你省
            <span>{{(wallet.accumulateEarnings/100).toFixed(2)}}</span>元
          </p>
        </div>
        <div class="lower">
          <!--跳转-->
          <div class="lower_left" @click="toWallet">
            <p>{{lastMonthEstimateEarnings.sum}}</p>
            <p>上月估计（金币）</p>
          </div>
          <div class="middle"></div>
          <!--跳转-->
          <div class="lower_right" @click="toWallet">
            <p>{{thisMonthEstimateEarnings.sum}}</p>
            <p>本月估计（金币）</p>
          </div>
        </div>
      </div>

      <div class="withdrawal">
        <div class="paid">
          <i>
            <van-icon name="paid" size="22" />
          </i>
          <p>提现</p>
        </div>

        <div class="arrow">
          <van-icon name="arrow" size="17" />
        </div>
      </div>

      <div class="tab_2">
        <div class="orders">
          <p>个人订单</p>
        </div>
        <div class="platform">
          <div class="platform_left" @click="platformorder">
            <p>
              平台订单
              <i>
                <img src="@/assets/me/me_icon_rihgt@2x.png" alt />
              </i>
            </p>
            <p>天猫、淘宝、拼多多</p>
          </div>
          <div class="middle"></div>
          <div class="platform_right" @click="selfrunorder">
            <p>
              精选订单
              <i>
                <img src="@/assets/me/me_icon_left@2x (1).png" alt />
              </i>
            </p>
            <p>小绿蓝app内部精选</p>
          </div>
        </div>
      </div>

      <div class="tab_3">
        <ul>
          <li>
            <p>
              <i>
                <img src="@/assets/me/mine_icon_myvip@2x (1).png" alt />
              </i>我的会员
            </p>
            <span>
              <img src="@/assets/me/mine_icon_forward_small@2x.png" alt />
            </span>
          </li>
          <li @click="$router.push({name:'addressList',query: {type: 'index'}})">
            <p>
              <i>
                <img src="@/assets/me/mine_icon_address@2x (2).png" alt />
              </i>收获地址
            </p>
            <span>
              <img src="@/assets/me/mine_icon_forward_small@2x.png" alt />
            </span>
          </li>
          <li>
            <p>
              <i>
                <img src="@/assets/me/mine_icon_authorization@2x (1).png" alt />
              </i>淘宝授权认证
            </p>
            <span>
              未认证
              <img src="@/assets/me/mine_icon_forward_small@2x.png" alt />
            </span>
          </li>
          <li @click="$router.push({name:'customerService'})">
            <p>
              <i>
                <img src="@/assets/me/mine_icon_service@2x (1).png" alt />
              </i>专属客服
            </p>
            <span>
              <img src="@/assets/me/mine_icon_forward_small@2x.png" alt />
            </span>
          </li>
          <li @click="$router.push({name:'collection'})">
            <p>
              <i>
                <img src="@/assets/me/mine_icon_collection@2x (1).png" alt />
              </i>收藏
            </p>
            <span>
              <img src="@/assets/me/mine_icon_forward_small@2x.png" alt />
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getuser, getEstimateEarnings } from "@/api/me.js";
export default {
  name: "my",
  data() {
    return {
      list: "",
      lastMonthEstimateEarnings: [],
      thisMonthEstimateEarnings: [],
      wallet: []
    };
  },
  methods: {
    toWallet() {
      this.$router.push({ path: "/wallet" });
    },
    platformorder() {
      this.$router.push({ path: "/platformorder" });
    },
    selfrunorder() {
      this.$router.push({ path: "/selfrunorder" });
    }
  },
  created() {
    console.log(getuser);
    getuser({
      method: "get",
      data: {},
      qs: true
    }).then(res => {
      if (res.code == "0") {
        this.list = res.data;
      } else {
        this.$toast(res.message);
      }
    });

    getEstimateEarnings({
      method: "get",
      data: {},
      qs: true
    }).then(res => {
      if (res.code == "0") {
        this.lastMonthEstimateEarnings = res.data.lastMonthEstimateEarnings;
        this.thisMonthEstimateEarnings = res.data.thisMonthEstimateEarnings;
        this.wallet = res.data.wallet;
      } else {
        this.$toast(res.message);
      }
    });
  }
};
</script>

<style scoped lang="scss">
#box {
  width: 100%;
  height: 835px;
  background: rgba(245, 245, 245, 1);
  box-sizing: border-box;
  // padding-top: 20px;
  .header {
    width: 100%;
    height: 183px;
    background: linear-gradient(
      -90deg,
      rgba(241, 90, 55, 1),
      rgba(255, 159, 28, 1)
    );
    .nav {
      display: flex;
      justify-content: center;
      // position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      background: linear-gradient(
        -90deg,
        rgba(241, 90, 55, 1),
        rgba(255, 159, 28, 1)
      );

      h2 {
        height: 46px;
        line-height: 46px;
        color: #fff;
        font-size: 15px;
        font-weight: 400;
      }
      p {
        color: #fff;
        font-size: 25px;
        padding-right: 20px;
      }
    }
    .portrait {
      width: 90%;
      display: flex;
      //   margin: 25px auto;
      padding: 12px;
      justify-content: space-between;
      .left {
        display: flex;
        flex-grow: 1;
        .userImg {
          margin-left: 10px;
          img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
        }
        .userDetail {
          p {
            margin: 10px 20px;
            color: #fff;
          }
        }
        // .copyYqm {
        //   position: relative;
        //   float: right;
        //   top: -28px;
        //   width: 1.066667rem;
        //   color: #fff;
        //   background: #f57051;
        //   border-radius: 0.533333rem;
        // }
      }
    }
  }

  .tab_1 {
    width: 345px;
    // height: 140px;
    background: rgba(255, 255, 255, 1);
    margin: -80px auto;
    border-radius: 10px;
    margin-top: -1.2rem;
    .upper {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      display: flex;
      font-size: 15px;
      border-bottom: 1px solid #f0f0f0;
      i {
        img {
          width: 16px;
          height: 16px;
        }
      }
      p {
        margin-left: 10px;
        color: #3c3c3c;
        span {
          color: #f15a37;
        }
      }
    }
    .lower {
      display: flex;
      width: 300px;
      height: 100px;
      margin: 0 auto;
      align-items: center;
      box-sizing: border-box;
      justify-content: center;
      .lower_left,
      .lower_right {
        p {
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #333;
        }
        p:nth-child(1) {
          color: #f15a37;
          font-size: 20px;
        }
      }
      .lower_left {
        margin-right: 20px;
      }
      .lower_right {
        margin-left: 20px;
      }
      .middle {
        width: 1px;
        height: 50px;
        background: #f0f0f0;
      }
    }
  }

  .withdrawal {
    width: 345px;
    height: 44px;
    background: linear-gradient(
      -90deg,
      rgba(255, 159, 28, 1),
      rgba(241, 90, 55, 1)
    );
    border-radius: 22px;
    margin: 100px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .paid {
      display: flex;
      align-content: center;
      i {
        padding-left: 10px;
      }
      p {
        font-size: 14px;
        padding-left: 11px;
      }
    }
    .arrow {
      padding-right: 10px;
    }
  }

  .tab_2 {
    width: 345px;
    height: 140px;
    background: rgba(255, 255, 255, 1);
    margin: -80px auto;
    border-radius: 10px;
    .orders {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      display: flex;
      font-size: 15px;
      border-bottom: 1px solid #f0f0f0;
      p {
        margin-left: 10px;
      }
    }
    .platform {
      display: flex;
      width: 300px;
      height: 100px;
      margin: 0 auto;
      align-items: center;
      box-sizing: border-box;
      justify-content: center;
      .platform_left,
      .platform_right {
        p {
          height: 30px;
          line-height: 30px;
          color: #333;
          i {
            margin-left: 10px;
            img {
              width: 34px;
              height: 34px;
            }
          }
        }
        p:nth-child(2) {
          color: #808080;
          font-size: 13px;
        }
      }
      .platform_left {
        margin-right: 15px;
      }
      .platform_right {
        margin-left: 10px;
      }
      .middle {
        width: 1px;
        height: 50px;
        background: #f0f0f0;
      }
    }
  }

  .tab_3 {
    width: 345px;
    height: 254px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: 100px auto;
    ul {
      li {
        width: 325px;
        height: 50px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        align-items: center;
        p {
          font-size: 16px;
          display: flex;
          justify-content: center;

          img {
            width: 20px;
            height: 20px;
            padding: 0 8px;
          }
        }
        span {
          font-size: 14px;
          color: rgba(241, 90, 55, 1);
          img {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
}
</style>
