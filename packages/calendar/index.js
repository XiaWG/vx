

// 导入组件，组件必须声明 name
import Calendar from './src/main.vue'

// 为组件添加 install 方法，用于按需引入
Calendar.install = function (Vue) {
  Vue.component(Calendar.name, Calendar)
}

export default Calendar