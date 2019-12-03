<template>
    <div class="privilege">
        <iframe id="iframes" :src="url" width="100%" height="100%" frameborder="0"></iframe>
    </div>

</template>

<script>
	export default {
		name: "privilege",
        data(){
			return{
				url:''
            }
        },
        created(){

	        let user = JSON.parse(localStorage.getItem("user"));
	        // let user = {
	        // 	userId:'6133',
            //     ticket:'VFhwRlBRPT07TENrc0xDNHA7MzEzMQ=='
            // }

	        // this.url = `file:///Users/yongzhen/Desktop/pay/myPriviege/index.html?type=web&userId=${user.userId}&ticket=${user.ticket}`
	        // this.url = `http://49.234.229.202/active/VIP/privilege/myPriviege/index.html?type=web&userId=${user.userId}&ticket=${user.ticket}`
	        this.url = `http://test.laifadan.com/active/VIP/privilege/myPriviege/index.html?type=web&userId=${user.userId}&ticket=${user.ticket}`

        },
        mounted(){
			let that = this
	        window.addEventListener('message', function(e) {
	        	console.log(e)
                    if(e.data.goodsName != undefined){
	                    localStorage.setItem("OrderPay", JSON.stringify(e.data))
	                    that.$router.push({path: '/OrderPay'})
                    }

	        });


	        },
        methods:{

        }
	}
</script>

<style scoped lang="scss">
.privilege{
    height: 93%;
    iframe{
        width: 100%;
        height: 100%;
    }
}
</style>
