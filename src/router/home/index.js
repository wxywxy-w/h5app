export default [
  {
    name: "index",
    path: "index",
    meta: {
      title: '首页',
        keepAlive:true

    },
    component: () =>
      import('@/views/index/index.vue')
  },
  {
    name: "privilege",
    path: "privilege",
    meta: {
      title: '我的特权',
	    keepAlive:true
    },
    component: () =>
      import('@/views/index/privilege.vue')
  },
  {
    name: "my",
    path: "my",
    meta: {
      title: '我的',
	    keepAlive:true

    },
    component: () =>
      import('@/views/index/my.vue')
  }

]
