
// 导入组件，组件必须声明 name
import WaterMask from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
WaterMask.install = function (Vue) {
  Vue.component(WaterMask.name, WaterMask)
}

export default WaterMask