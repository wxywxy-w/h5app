<template>
    <div class="Address">
        <div class="header">
            <van-nav-bar
                    title="添加收货地址"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="container">
            <van-address-edit
                    :area-list="areaList"
                    show-set-default
                    @save="onSave"
            />
        </div>
    </div>
</template>
<script>
	import areaList from "@/utils/area.js";
	import {deliveryAddressAdd} from '@/api/me.js'

	export default {
		name: "Address",
		data() {
			return {
				areaList,
				searchResult: [],
				upAddress:[],
			}
		},
		created(){

		},
		methods:{
			onClickLeft(){
				this.$router.go(-2)
				// history.back();
			},

			onSave(cont) {
                console.log(cont)

				let isDefault = 0
				if(cont.isDefault == true){
					isDefault = 1
				}
				let data = {
					phone:cont.tel,
					address:cont.province+cont.city+cont.county+' ' +cont.addressDetail,
					name:cont.name,
					isDefault:isDefault,
				}
				console.log(data)
				deliveryAddressAdd({
					method: 'post',
					data:data,
					qs:true
                }).then(res=>{
                	if(res.code == "0"){
		                this.$router.go(-1)
	                }else{
		                this.$toast(res.message);
	                }
                })

			},
		}
	}
</script>

<style lang="scss" scoped>
    .Address{
        box-sizing: border-box;
        padding-top: 42px;
        background: #f0f0f0;
    }
</style>

<style lang="scss">
    .Address{
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
                .van-nav-bar__right{
                    .van-nav-bar__text{
                        color:#323233!important;
                    }
                }
            }
        }
    }
</style>
