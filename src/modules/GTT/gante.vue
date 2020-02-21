<template>
  <div>
    <div v-if='!startTime || !endTime || new Date(startTime)>= new Date(endTime) || !options.show' class="no-data-tip">
      请选择查询时间!
    </div>
    <div v-else>
      <div class="basic-setting">
        <div class="legend-container">
          <span v-for="item of options.legend" :key="item.key">
            {{item.text}}
            <b class="legend" :style='{background: item.color}'></b>
          </span>
        </div>
        <div class="precision-container">
          <span>精度</span>
          <div class="precision-container-section">
            <span :class="['precision', precision.active === 'year' ? 'active' : '', ]" @click='precision.active="year"'>年</span>
            <span :class="['precision', precision.active === 'month' ? 'active' : '', ]" @click='precision.active="month"'>月</span>
            <span :class="['precision', precision.active === 'day' ? 'active' : '', ]" @click='precision.active="day"'>
              日
              <input class="precision-h" v-model="precision.hour" type="text"><i>h</i>
            </span>
          </div>
        </div>
      </div>
      <div class="main">
        <div style="width:100px;position:absolute;z-index: 1;">
          <table class="my-chart-table">
            <thead>
              <tr>
                <td class="label" style="height:100px;">
                  产线
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in data" :key='key'>
                <td class="label" style="width:100px;">{{key}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="overflow: auto;padding-left:100px" id='scrollleft'>
          <template>
            <gante-main
            :options="options"
            :data="data"
            :precision="precision"></gante-main>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ganteMain from './gante-main.vue'
export default {
  name: 'gante',
  components: {
    ganteMain
  },
  props: {
    options: {
      type: Object
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      precision: {
        active: 'day',
        hour: 1,
      },
      timeout: null
    }
  },
  methods: {
    scrollleft (N) {
      scrollleft.scrollLeft = N
      // console.log(N)
      // console.log(scrollleft.scrollLeft)
      // let _N = N - scrollleft.scrollLeft
      // clearInterval(this.timeout)
      // let step = _N / 1000
      // console.log(_N)
      // this.timeout = setInterval(() => {
      //   scrollleft.scrollLeft += step
      //   if (scrollleft.scrollLeft === N) {
      //     clearInterval(this.timeout)
      //   }
      // }, 1)
    }
  },
  computed: {
    startTime () {
      return this.options.startTime
    },
    endTime () {
      if (((new Date(this.options.endTime) - new Date(this.options.startTime)) / (24*3600*1000)) > 30) {
        this.precision.active = 'month'
        this.precision.hour = 1
      }
      if (((new Date(this.options.endTime) - new Date(this.options.startTime)) / (24*3600*1000)) > 365) {
        this.precision.active = 'year'
        this.precision.hour = 1
      }
      return this.options.endTime
    }
  }
}
</script>

<style scoped>
  *{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  .no-data-tip{
    width:100%;
    text-align:center;
    line-height: 100px;
    color: #a26f6f;
    font-weight:bold;
    font-size: 14px;
  }
  .basic-setting {
    width: 100%;
    padding:10px;
    margin-bottom:5px;
    border-radius:5px;
    border: 1px solid #ebeef5;
    overflow: hidden;
  }
  .legend-container{
    display: inline-block;
    line-height: 30px;
    font-weight:bold;
    font-size: 14px;
  }
  .legend{
    display: inline-block;
    width: 30px;
    height:20px;
    border-radius: 15px;
    vertical-align: middle;
  }
  .precision-container{
    float:right;
    font-size: 14px;
    font-weight: bold;
  }
  .precision-container-section{
    display: inline-block;
    border:1px solid #ebeef5;
    border-radius:5px;
    overflow: hidden;
    vertical-align: middle;
    margin-left:10px;
  }
  .precision{
    display:inline-block;
    min-width:30px;
    padding:0 10px;
    height:30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border-right:1px solid #ebeef5;
  }
  .precision:last-child{
    border-right:0px solid #ebeef5;
  }
  .precision.active{
    background: #409eff !important;
    color: #fff;
  }
  .precision:hover{
    background: #F5F7FA;
  }
  .precision i{
    display:none;
  }
  .precision-h{
    display:none;
    width:20px;
    height:16px;
    text-align:center;
    border-radius:5px;
    border:1px solid #ebeef5;
  }
  .precision.active .precision-h,
  .precision.active i{
    display:inline-block;
  }
  .my-chart-table{
    border-collapse: collapse;
    text-align: center;
    width:100%;
  }
  .my-chart-table td{
    border: 1px solid #ebeef5;
    height: 50px;
    min-width:80px;
  }
  .my-chart-table td.label{
    background:#F5F7FA;
    color: #909399;
    font-weight:bold;
    font-size: 14px;
  }
  .my-chart-table tbody tr:hover{
    background: #F5F7FA;
  }
  .my-chart-table tbody td{
    height: 60px;
  }
  .rect{
    position:absolute;
    height:20px;
    border-color: pink; 
    background: pink;
    top:10px;
    width:0;
    left:0;
    transition: width 1s ease-in-out 0s;
    cursor:pointer;
  }
  .rect::before{
    content: "";
    position: absolute;
    top: 100%;
    left:0;
    border-top: 3px solid black;
    border-top-color: inherit;
    border-left: 3px solid transparent;
    border-left-color: inherit;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }
  .rect::after{
    content: "";
    position: absolute;
    top: 100%;
    right:0;
    border-top: 3px solid black;
    border-top-color: inherit;
    border-right: 3px solid transparent;
    border-right-color: inherit;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }
</style>
