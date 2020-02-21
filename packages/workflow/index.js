
// 导入组件，组件必须声明 name
import WorkFlow from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
WorkFlow.install = function (Vue) {
  Vue.component(WorkFlow.name, WorkFlow)
}

export default WorkFlow