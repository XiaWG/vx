<template>
  <table class="my-chart-table">
    <thead>
      <tr>
        <td v-for='(item, index) of timeList' class="label" :key='index' :colspan="item.months.length" v-if="item.months.length > 0"
          v-html="item.year">
        </td>
      </tr>
      <tr>
        <template v-for='(item, index) of timeList'>
          <td v-for='(_item, _index) of item.months' :key="index + '_' + _index" class="label" v-html="_item"></td>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in data" :key='key'>
        <td :colspan="tdLength" style="position: relative;overflow: hidden;">
          <div class="rect" v-for="(_item, _index) of item" :key="_index" :style='rectStyle(_item)'></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import * as utils from './utils.js'
  export default{
    name: 'gante-day',
    props: {
      options: {
        type: Object
      },
      data: {
        type: Object
      },
      precision: {
        type: Object
      }
    },
    data () {
      return {
        
      }
    },
    computed: {
      startTime () {
        return this.options.startTime
      },
      endTime () {
        return this.options.endTime
      },
      timeList () {
        let ret = []
        let _ret = []
        let S = utils.getNewDate(new Date(this.startTime))
        let E = utils.getNewDate(new Date(this.endTime))
        let C = S.year
        while (C <= E.year) {
          _ret.push(C)
          C += 1
        }
        let _arr = [
          '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
        ]
        _ret.forEach((item, index) => {
          let _obj = {}
          _obj.year = item
          if (_ret.length === 1) { // month 从0开始 需加1取到结束月份
            _obj.months = _arr.slice(S.month, E.month + 1)
          } else {
            _obj.months = index === 0 ? _arr.slice(S.month) : index === _ret.length - 1 ? _arr.slice(0, E.month + 1) : _arr
          }
          ret.push(_obj)
        })
        return ret
      },
      tdLength () {
        let L = 0
        this.timeList.forEach(item => {
          L += item.months.length
        })
        return L
      },
      rectAllLength () { // 粗略计算 按照每个月30天
        return 30 * 24 * 60 * 60 * 1000 * this.tdLength
      }
    },
    methods: {
      rectStyle ({startTime, endTime, status}) {
        let _timeLength = new Date(endTime).getTime() - new Date(startTime).getTime()
        // 偏移量从开始月的第一天算起
        let S = utils.getNewDate(new Date(this.startTime))
        let _S = utils.getDate({year: S.year, month: S.month, day: 1, hour: 0, minutes: 0, seconds: 0}).getTime()
        let _posLength = new Date(startTime).getTime() - _S
        let _width = (_timeLength / this.rectAllLength) * 100 + '%'
        let _left = (_posLength / this.rectAllLength) * 100 + '%'
        let _background = this.options.legend.find(item => item.key === status) && this.options.legend.find(item => item.key === status).color || 'grey'
        let ret = {width: _width, left: _left, borderColor: _background, background: _background}
        return ret
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
