<template>
  <div>
    <div id="main" style="width:100%;height:500px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default{
  name: 'VueCharts',
  props: {
    options: Object
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('main'))
    
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.options)
  },
  watch: {
    options () {
      var myChart = echarts.init(document.getElementById('main'))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.options)
    }
  }
}
</script>
