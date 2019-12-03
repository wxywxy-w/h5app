<template>
<div id="box">
    <div class="wallet_header">
        <van-nav-bar
                title="我的钱包"
                left-arrow
                @click-left="onClickLeft"
                right-text="明细"
        />
    </div>

    <div class="withdrawal">
        <div class="words_1">
            <p>可提现(金币)</p>
        </div>
        <div class="words_2">
            <p>{{wallet.balance}}</p>
            <p><span>提现</span><img src="@/assets/me/mine_icon_forward_small@2x (1).png" alt=""></p>
        </div>
    </div>

    <div class="tips">
           <p><span><img src="@/assets/me/mine_wallet_sign_prompt@2x.png" alt=""></span>本月预估金币将在下月25号结算，建议26号提现</p>
    </div>

    <div class="tab_1">
    <i></i>
    <p>我的收益</p>
</div>
    <div class="tab_2">
        <ul>
            <li>
                <p>{{upcoming}}</p>
                <span>即将到账(金币）</span>
            </li>
            <li>
                <p>{{wallet.accumulateEarnings}}</p>
                <span>累计收益(金币）</span>
            </li>
        </ul>
    </div>
    <div class="tab_1">
        <i></i>
        <p>月份收益</p>
    </div>
    <div class="tab_2">
        <ul>
            <li>
                <p>{{lastMonthEstimateEarnings.sum}}</p>
                <span>上月预估(金币）</span>
            </li>
            <li>
                <p>{{thisMonthEstimateEarnings.sum}}</p>
                <span>本月预估(金币）</span>
            </li>
        </ul>
    </div>
</div>


</template>

<script>
    import {mywallet,walletgold} from '@/api/wallet.js'
	export default {
        name: "wallet",
        data() {
            return {
                currentRate: 0,
                lastMonthEstimateEarnings:[],
                thisMonthEstimateEarnings:[],
                wallet:[],
                upcoming:""
            };
        },
        created(){

            mywallet({
                method: 'get',
                data:{
                },
                qs:true
            }).then(res=>{
              if (res.code == '0'){
                  this.lastMonthEstimateEarnings= res.data.lastMonthEstimateEarnings  //上月预估收益
                  this.thisMonthEstimateEarnings=res.data.thisMonthEstimateEarnings  //本月预估收益
                  this.wallet=res.data.wallet    //余额，累计到账
              }else {
                  this.$toast(res.message);
              }
            })

            walletgold({
                method:'get',
                data:{
                },
                qs:true
            }).then(res=>{
                if (res.code =='0'){
                    this.upcoming=res.data.upcoming    //即将到帐
                }else {
                    this.$toast(res.message);
                }
            })
        },

        computed: {
            text() {
                return this.currentRate.toFixed(0) + '%'
            }
        },
        // 头部返回上一级
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },

        }
    }

</script>

<style scoped lang="scss">
    [class*=van-hairline]::after{
        border: none!important;
    }
#box{
   width: 100%;
    height: 667px;
    background:rgba(245,245,245,1);
    .wallet_header{
        .van-nav-bar{

            height:44px;
            background:rgba(255,255,255,1);
        }
        .van-nav-bar__left{
            i{
                font-size: 22px;
                color: #333;
            }
        }
        .van-nav-bar__title{
            color: #333;
            font-size: 18px;
        }
        .van-nav-bar__text{
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);

        }
    }

    .withdrawal{
        width:345px;
        height:126px;
        background:linear-gradient(-90deg,rgba(255,159,28,1),rgba(241,90,55,1));
        border-radius:10px 10px 0px 0px;
        margin: 20px auto 0;
        .words_1{
            height:16px;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:10px;
            padding: 20px;
        }
        .words_2{
            display: flex;
            justify-content: space-between;
            p:nth-child(1){
                width:109px;
                height:25px;
                font-size:33px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:10px;
                padding: 10px 18px;
            }
            p:nth-child(2){
                width:80px;
                height:30px;
                background:linear-gradient(90deg,rgba(255,159,28,1),rgba(241,90,55,1));
                border-radius:15px 0px 0px 15px;
                line-height: 30px;
                  span{
                      font-size:16px;
                      font-family:PingFang SC;
                      font-weight:400;
                      color:rgba(255,255,255,1);
                      margin: 10px;
                  }
                img{
                    width: 14px;
                    height: 14px;
                    color: #fff;
                }
            }
        }
    }

    .tips{
        width:345px;
        height:36px;
        background:rgba(255,233,229,1);
        border-radius:0px 0px 10px 10px;
        margin: 0px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            display: flex;
            align-content: center;
            font-size:14px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(241,90,55,1);
            span{
                img{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }

    .tab_1{
        width:345px;
        margin: 21px auto;
        display: flex;
        i{
            width:5px;
            height:15px;
            display: block;
            background:rgba(241,90,55,1);
            border-radius:3px;
        }
       p{
            padding-left: 10px;
           font-size:14px;
           font-family:PingFang SC;
           font-weight:400;
           color:rgba(51,51,51,1);
           line-height:10px;
       }
    }
    .tab_2{
        width:345px;
        height:100px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        margin: auto;
        ul{
            width:345px;
            height:100px;
            background:rgba(255,255,255,1);
            border-radius:10px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        li{
            flex: 1;
            list-style: none;
            display: flex;
            flex-direction: column;
            align-items: center;
           p{
               font-size:22px;
               font-family:PingFang SC;
               font-weight:400;
               color:rgba(255,159,28,1);
               line-height:10px;

           }
            span{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(128,128,128,1);
                line-height:10px;
                margin-top: 20px;
            }
        }
        li:nth-child(2){
            p{
                color:rgba(241,90,55,1);
            }
        }

    }
}

</style>
