

// 导入组件，组件必须声明 name
import Chess from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
Chess.install = function (Vue) {
  Vue.component(Chess.name, Chess)
}

export default Chess