<template>
    <div class="yysl_wujs">
        <div class="header">
            <img src="@/assets/home/goodsDetails/title_details@2x.png" alt="">
        </div>
        <div class="html">
            <iframe id="test" width="100%" frameborder="0" :src="url"></iframe>
        </div>
    </div>
</template>
<script>
	export default {
		name: "index.vue",
		data(){
			return{
				url:"https://mdetail.tmall.com/templates/pages/desc?id=578555371781"
			}
		},
		created(){

		},
		mounted(){

		}
	}
</script>

<style lang="scss">
    .yysl_wujs {
        height: 100%;
        width: 100%;
        .header {
            box-sizing: border-box;
            height: 44px;
            img{
                width: 100%;
            }
        }
        .html{
            height: 100%;
            iframe{
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }

    }
</style>
