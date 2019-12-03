<template>
    <div class="upAddress">
        <div class="header">
            <van-nav-bar
                    title="编辑收货地址"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="container">
            <van-address-edit
                    :area-list="areaList"
                    show-delete
                    show-set-default
                    @save="onSave"
                    @delete="onDelete"
                    :address-info="upAddress"
                    @change-area="onChangeArea"
                    @change-detail="onChangeDetail"
            />
        </div>
    </div>
</template>
<script>
	import areaList from "@/utils/area.js";
	import {deliveryAddress,deliveryAddressDel} from '@/api/me.js'

	export default {
		name: "upAddress",
		data() {
			return {
				areaList,
				searchResult: [],
				upAddress:[],
                dizhi:""
			}
		},
        created(){
	        let upAddress = JSON.parse(localStorage.getItem("upAddress"));
	        let dizhi = upAddress.address.split(' ')
            let data = {
	            id:upAddress.id,
	            ids:upAddress.ids,
	            name:upAddress.name,
	            tel:upAddress.tel,
	            addressDetail:dizhi[1],
	            isDefault:true,
            }
	        this.upAddress = data
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
	                id:cont.ids
                }
                console.log(data)
		        deliveryAddress({
			        method: 'post',
			        data: data,
			        qs: true
                }).then(res=>{
                	if(res.code == '0'){
		                // this.$router.push({
			            //     name: "addressList",
		                // });
		                this.$router.go(-2)

	                }else{
		                this.$toast(res.message);
	                }
                })


	        },
	        onDelete() {
		        this.$toast('delete');
		        deliveryAddressDel({
			        method: "post",
			        data: {
			        	id:this.upAddress.ids
                    },
			        qs:true
                }).then(res=>{
                	if(res.code == '0'){
		                this.$toast('删除成功');
		                this.$router.go(-1)
	                }
                })
	        },
	        onChangeDetail(val) {
                this.searchResult = val
	        },
	        onChangeArea(val){
            },
        }
	}
</script>

<style lang="scss" scoped>
    .upAddress{
        box-sizing: border-box;
        padding-top: 42px;
        background: #f0f0f0;
    }
</style>

<style lang="scss">
    .upAddress{
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
