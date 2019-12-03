<template>
    <div class="search">
        <div class="header">
            <form action="/">
                <van-search
                        v-model="value"
                        placeholder="请输入搜索关键词"
                        show-action
                >
                    <div v-show="value.length == 0" slot="action" @click="onCancel">取消</div>
                    <div v-show="value.length != 0" slot="action" @click="onSearch">搜索</div>
                </van-search>
            </form>
        </div>
        <hr style="height: 7px;background: #F5F5F5;border: 0">
        <div class="hot">
            <p>热门搜索</p>
            <ul class="clearfix">
                <li @click="goodsList(item)" v-for="(item,index) in hot" :key="index">{{item}}</li>
            </ul>
        </div>
        <div class="history" v-if="his.length > 0">
            <p>搜索历史</p>
            <ul>
                <li v-for="(item,index) in his" :key="index">
                    <img src="@/assets/home/his.png" alt="">&nbsp;&nbsp;{{item}} <img @click="del(index)" class="guan" src="@/assets/home/guan.png" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import {getHotSearch} from "@/api/index.js"

	export default {
		name: "search",
        data(){
            return{
                value:'',
                hot:[],
                his:[]
            }
        },
        created(){
	        this.getHotSearch()
        },
        mounted(){
        },
		methods: {
			onSearch() {
                //搜索
				localStorage.setItem("sousuo", JSON.stringify(this.value))
				this.$router.push({path:'/searchGoods'})
			},
			onCancel() {
				this.$router.go(-1)
			},
			del(index){
				this.his.splice(index,1)
            },
			goodsList(name){
				localStorage.setItem("sousuo", JSON.stringify(name))
				this.$router.push({path:'/searchGoods'})
			},
            //获取热门搜索
			getHotSearch(){
				getHotSearch({
					method: "get",
					data:{},
					qs:false
                }).then(res=>{
                    console.log(res,'热门搜索')
                    if(res.code == '0'){
                    	this.hot = res.data
                    }
                })
            },




		}
	}
</script>

<style lang="scss">
.search{
    .hot{
        box-sizing: border-box;
        padding: 15px;
        color: #333;
        ul{
            li{
                border: 1px solid #ccc;
                float: left;
                margin: 5px;
                padding:3px 5px;
                border-radius: 20px;
            }
            li:nth-child(-n+2){
                color: #F15A37;
                border: 1px solid #F15A37;
            }
        }
    }
    .history{
        box-sizing: border-box;
        padding: 15px;
        color: #333;
        ul{
            li{
                color: #969799;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #F7F8FA;
                position: relative;
                img{
                    width: 15px;
                    vertical-align:middle;
                }
                .guan{
                    position: absolute;
                    right: 10px;
                    top:8px;
                }
            }
        }
    }
}
</style>
