<template>
  <div id="app">
      <keep-alive>
          <router-view style="height: 100%;width: 100%" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view style="height: 100%;width: 100%" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
