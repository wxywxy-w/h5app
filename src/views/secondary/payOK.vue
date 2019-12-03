<template>
    <div class="payOK">
        <div class="header">
            <van-nav-bar
                    title="支付成功"
            />
        </div>
        <div class="cont">
            <p><img src="@/assets/home/OrderPay/exchange_shop_iamge_success@2x.png" alt=""></p>
            <br>
            <p>支付成功</p>
            <p>物流详情在个人订单内查看哦</p>
            <p>
                <router-link to="/home/privilege">
                    <button >查看我的特权</button>
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
	export default {
		name: "payOK"
	}
</script>


<style scoped lang="scss">
    .payOK{
        .cont{
            box-sizing: border-box;
            padding-top: 100px;
            text-align: center;
            p{
                img{
                    width: 120px;
                }
                button{
                    width: 176px;
                    height: 44px;
                    background:linear-gradient(90deg,rgba(254,142,46,1),rgba(241,90,55,1));
                    box-shadow:0px 2px 4px 0px rgba(241,90,55,0.3);
                    border-radius:22px;
                    border: 0;
                    color: #fff;
                    margin-top: 30px;
                    margin-left: 0;
                }
            }
        }
    }
</style>
<style lang="scss">
    .payOK{
        box-sizing: border-box;
        padding-top: 50px;
        .header{
            width: 100%;
            position: fixed;
            left: 0px;
            top: 0px;
            .van-nav-bar{
                .van-nav-bar__left{
                    .van-icon{
                        color:#323233!important;
                    }
                }
            }
        }
    }
</style>
