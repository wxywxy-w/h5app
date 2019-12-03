import yysl_baokuan from "./yysl-baokuan/index.vue" // 今日爆款标题
import yysl_wujs from "./yysl-wujs/index.vue" // 今日爆款标题


const ds_element = {}

ds_element.install = function (Vue) {
  var obj = {
      yysl_baokuan, // 今日爆款标题
      yysl_wujs
  }
  Object.keys(obj).forEach(element => {
    Vue.component(element, obj[element])
  })
}
export default ds_element
