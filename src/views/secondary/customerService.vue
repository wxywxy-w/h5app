<template>
    <div class="customerService">
        <div class="header">
            <van-nav-bar
                    title="客服"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="cont">
            <h3>猜你想问？</h3>
            <van-collapse v-model="activeNames">
                <van-collapse-item name="1">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_wrong.png" alt="">商品不想要了/信息有误如何去取消
                    </div>
                    在商品未发货前，可进入进入个人中心—“个人订单”—精选订单—点击“退款”通过qq或微信联系客服处理。
                </van-collapse-item>

                <van-collapse-item name="2">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_address.png" alt="">修改收货信息
                    </div>
                    进入个人订单—“联系客服”—通过QQ或微信与客服沟通后修改收货地址
                </van-collapse-item>

                <van-collapse-item name="3">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_return.png" alt="">退换流程</div>
                    进入个人中心—“个人订单”—精选订单—点击要处理的订单—点击“申请售后”通过qq或微信联系客服处理。
                </van-collapse-item>

                <van-collapse-item name="4">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_withdrawal.png" alt="">金币提现温馨提示
                    </div>
                    提现温馨提示: 每月25日结算淘宝、天猫、拼多多已确认收货的订单，提现时间为1~3个工作日， 已经提现的小伙伴们不要着急。
                </van-collapse-item>

                <van-collapse-item name="5">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_found.png" alt="">小绿蓝精选订单如何查看
                    </div>
                    进入小绿蓝APP，点击【我的】-【个人订单】-【精选订单】，即可查看您提交的订单。
                </van-collapse-item>

                <van-collapse-item name="6">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_delivery_time.png" alt="">精选订单发货时间
                    </div>
                    您下单支付成功后3个工作日内可以发货（工作日不含周末、法定节假日）。 温馨提示：若遇大型活动或是预售商品时，商家销售的商品订单发货量大，
                    发货时间一般会在商品详情页面注明发货时间，给您带来不便，请谅解）。
                </van-collapse-item>

                <van-collapse-item name="7">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_fruit.png" alt="">水果生鲜售后注意事项
                    </div>
                    生鲜类商品（蔬菜水果、水产海鲜、肉禽蛋奶）由于受季节、气候、生长环境等因素，不同批次略有差异属正常现象。2、生鲜类商品，买家拒绝签收的，导致生鲜类商品出现损坏、变质、腐烂死亡情形的，相关运费以及商品相应损失买家承担，不支持售后。3、生鲜售后申请时效在收到商品的48小时内拍照并申请售后，APP进入【我的】-【我的订单】-【精选订单】提交售后。若该商品极易受时间、环境等客观因素影响而发生变质，买家逾期举证的，小绿蓝不支持售后。收到商品时间以快递公司系统记录签收时间为准。
                </van-collapse-item>

                <van-collapse-item name="8">
                    <div slot="title"><img class="left_img" src="@/assets/me/service_icon_return.png" alt="">关于七天无理由退货说明
                    </div>
                    在商品完好不影响二次销售的情况下，支持签收之日起的无理由退货（生鲜类，食品类，海淘产品不支持无理由）退换货及无理由拒签，运费由买家承担。因商品质量问题，破损错发等非买家原因导致的退货（过敏快递延误等除外），支持签收后内7天内退货，退货运费由小绿蓝承担
                </van-collapse-item>
            </van-collapse>


            <div class="wx_qq">
                <div @click="serve('qq')">
                    <p><img src="@/assets/me/service_icon_qq.png" alt="">QQ联系</p>
                </div>
                <div @click="serve('wx')">
                    <p><img src="@/assets/me/service_icon_wachat.png" alt="">微信联系</p>
                </div>
            </div>

            <a href="tel:17348534928">
                <div class="phone">
                    <p><img src="@/assets/me/service_icon_phone.png" alt="">客服热线</p>
                    <p>客服工作时间：9：30 - 18：30</p>
                </div>
            </a>


        </div>
    </div>
</template>

<script>
	export default {
		name: "customerService",
		data() {
			return {
				activeNames: ['0']
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1)
				// history.back();
			},
			serve(type) {
				let that = this
				let value = ''
				if (type == 'qq') {
					value = '3007291321'
					setTimeout(function () {
						that.$toast("请前往QQ添加客服！");
					}, 500)

				} else {
					value = '17348534928'
					setTimeout(function () {
						that.$toast("请前往微信添加客服！");
					}, 500)
				}
				const input = document.createElement("input");
				input.readOnly = 'readonly';
				input.value = value;
				document.body.appendChild(input);
				input.select();
				input.setSelectionRange(0, input.value.length);
				document.execCommand('Copy');
				document.body.removeChild(input);
			}
		}
	}
</script>

<style scoped lang="scss">
    .customerService {
        box-sizing: border-box;
        padding-top: 50px;
        .cont {
            .wx_qq {
                box-sizing: border-box;
                padding: 0 30px;
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                div {
                    width: 150px;
                    height: 50px;
                    border-radius: 50px;
                    box-shadow: 1px 3px 7px 1px rgba(37, 182, 61, 0.2);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    img {
                        width: 25px;
                        vertical-align: middle;
                    }
                }
                div:nth-child(1) {
                    background: linear-gradient(270deg, rgba(6, 210, 234, 1), rgba(6, 162, 234, 1));
                }
                div:nth-child(2) {
                    background: linear-gradient(270deg, rgba(2, 211, 179, 1), rgba(37, 182, 61, 1));
                }
            }
            .phone{
                width: 100%;
                height: 50px;
                margin-top: 10px;
                text-align: center;
                position: fixed;
                left: 0px;
                bottom: 0px;
                p{
                    color: #000;
                    vertical-align: middle;
                    img{
                        width: 18px;
                        vertical-align: middle;
                    }
                }
            }
            h3 {
                box-sizing: border-box;
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
            }
            .left_img {
                vertical-align: middle;
                width: 30px;
                height: 30px;
                margin-right: 25px;

            }
        }
    }
</style>
<style lang="scss">
    .customerService {
        .header {
            width: 100%;
            position: fixed;
            left: 0px;
            top: 0px;
            .van-nav-bar {
                .van-nav-bar__left {
                    .van-icon {
                        color: #323233 !important;
                    }
                }
                .van-nav-bar__right {
                    .van-nav-bar__text {
                        color: #323233 !important;
                    }
                }
            }
        }
    }
</style>
