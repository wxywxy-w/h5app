<template>
<div class="addressList">
    <div class="header">
        <van-nav-bar
                title="收货地址"
                right-text="保存"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"

        />
    </div>
    <div class="container">
        <p v-if="kongshow" style="text-align: center;margin-top: 100px"><img src="@/assets/home/kong.png" alt=""></p>
        <p v-if="kongshow" style="text-align: center;color: #8a8a8a">你还没有收货地址，快去添加一个吧！</p>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @add="onAdd"
                @edit="onEdit"
                @select="moren"
        />
    </div>
</div>
</template>

<script>
    import {getdaaressList,deliveryAddress} from '@/api/me.js'
	export default {
		name: "addressList",
        data(){
			return{
				chosenAddressId:'',
				list: [],
                type:null,
                kongshow:null
            }
        },
        created(){
            this.getdaaressList()
            this.type = this.$route.query.type
        },
        methods:{
			//获取收货地址
	        getdaaressList(){
		        getdaaressList({
			        method: 'get',
			        data: {},
			        qs: false
		        }).then(res=>{
		        	if(res.data.length > 0){
                        this.kongshow = false
                    }else{
				        this.kongshow = true
			        }
                    for(let i in res.data){
                    	if(res.data[i].isDefault == 1){
                    		this.chosenAddressId = i
                        }
	                    let obj = {
		                    id:i,
		                    name:res.data[i].name,
		                    tel:res.data[i].phone,
		                    address:res.data[i].address,
		                    userId:res.data[i].userId,
		                    ids:res.data[i].id,

                        }
                        this.list.push(obj)


                    }



                })
            },
	        onClickLeft(){
                // console.log(1)
		        // history.back();
                if(this.type == 'index'){
	                this.$router.go(-1)
                }else{
	                this.$router.push({name:'OrderPay'})
                }
            },
	        onClickRight(){
                let data = this.list[this.chosenAddressId]
                data.id = data.ids
                data.isDefault = 1
		        deliveryAddress({
			        method: "post",
			        data:data,
			        qs:true
                }).then(res=>{
                	if(res.code == 0){
		                this.$toast('修改成功');
		                this.getdaaressList();
		                this.list = []
                    }
                	// console.log(res)
                })

            },
	        onAdd() {
		        this.$router.push({name:'Address'})
	        },

	        onEdit(item, index) {
	        	console.log(item)
		        localStorage.setItem("upAddress", JSON.stringify(item))
		        this.$router.push({
			        name: "upAddress",
		        });
	        },
	        moren(item, index){
		        this.$toast('默认:' + index);
	        }

        }
	}
</script>

<style scoped lang="scss">
.addressList{
    box-sizing: border-box;
    padding-top: 42px;
    background: #f0f0f0;
    .container{
        ul{
            li{
                width: 100%;
                height: 132px;
                background: #fff;
                margin-top: 8px;
                box-sizing: border-box;
                padding: 10px 15px;
                color: #000000;
                p{
                    font-size: 16px;
                    span.phone{
                        float: right;
                        position: relative;
                        top:3px;
                    }
                }
                p.name{
                    font-size: 14px;
                    color: #808080;
                    margin: 8px 0;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>
<style lang="scss">
    .addressList{
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
