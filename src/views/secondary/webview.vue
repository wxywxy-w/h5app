<template>
  <div class="webview">
    <div class="header">
      <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="html">
      <iframe id="iframe" height="100%" width="100%" scrolling frameborder="0" :src="url"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "webview",
  data() {
    return {
      title: "外部链接",
      url: "",
      goods: []
    };
  },

  created() {
    this.goods = JSON.parse(localStorage.getItem("swipeGo"));
    this.title = this.goods.name;
    this.url = `${this.goods.linkUrl}` + `${this.goods.params}`;
  },
  mounted() {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped lang="scss">
.webview {
  box-sizing: border-box;
  padding-top: 45px;
  height: 100%;
  width: 100%;
  .header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .html {
    height: 100%;
    width: 100%;
  }
}
</style>



<style lang="scss">
.webview {
  .header {
    .van-nav-bar {
      .van-nav-bar__left {
        .van-icon {
          color: #323233 !important;
        }
      }
    }
  }
}
</style>
