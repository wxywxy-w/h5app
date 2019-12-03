<template>
  <div>
      <router-view/>
    <van-tabbar v-model="active" active-color="#F46A31" inactive-color="#000" @change="act">
      <van-tabbar-item to="/home/index">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"

          :src="props.active ? index[0].normal : index[0].active"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/home/privilege">
        <span>我的特权</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? index[1].normal : index[1].active"
        >
      </van-tabbar-item>
      <!--<van-tabbar-item to="/home/collection">-->
        <!--<span>收藏</span>-->
        <!--<img-->
          <!--slot="icon"-->
          <!--slot-scope="props"-->
          <!--:src="props.active ? index[2].normal : index[2].active"-->
        <!--&gt;-->
      <!--</van-tabbar-item>-->
      <van-tabbar-item to="/home/my">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? index[3].normal : index[3].active"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
	export default {
		name: "appHome",
    data() {
      return {
      	transitionName: '',
        active: 0,
        index: [
          {
            normal: require('@/assets/home/baner/home_click@2x.png'),
            active: require('@/assets/home/baner/tabber_icon_home_normal@2x.png')
          },
          {
            normal: require('@/assets/home/baner/privilege_click@2x.png'),
            active: require('@/assets/home/baner/privilege_icon@2x.png')
          },
          {
            normal: require('@/assets/home/baner/collect_click@2x.png'),
            active: require('@/assets/home/baner/tabber_icon_love_normal@2x.png')

          },
          {
            normal: require('@/assets/home/baner/tabber_icon_mine_selectedl@2x.png'),
            active: require('@/assets/home/baner/mine_icon@2x.png')

          }
        ]
      }
    },
        created(){
	        this.active = JSON.parse(localStorage.getItem("active"));
        },
        methods:{
	        act(index){
		        localStorage.setItem("active", JSON.stringify(index))
	        }
        }
	}
</script>

<style scoped>

</style>
