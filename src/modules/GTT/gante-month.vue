<template>
  <table class="my-chart-table">
    <thead>
      <tr>
        <td v-for='(item, index) of timeList' class="label" :key='index' :colspan="item.days.length" v-if="item.days.length > 0"
          v-html="item.month">
        </td>
      </tr>
      <tr>
        <template v-for='(item, index) of timeList'>
          <td v-for='(_item, _index) of item.days' :key="index + '_' + _index" class="label" v-html="_item"></td>
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
        let C = utils.getDate({year: S.year, month: S.month, day: 1, hour: 0, minutes: 0, seconds: 0}).getTime()
        while (C <= utils.getDate(E).getTime()) {
          let _C = utils.getNewDate(new Date(C))
          _ret.push(_C.year + '-' + (_C.month + 1))
          C = utils.getDate({year: _C.year, month: _C.month + 1, day: 1, hour: 0, minutes: 0, seconds: 0}).getTime()
        }
        let _arr = [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
          '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
        ]
        let __arr = ['1', '3', '5', '7', '8', '10', '12']
        let ___arr = ['4', '6', '9', '11']
        _ret.forEach((item, index) => {
          let _obj = {}
          _obj.month = item
          if (_ret.length === 1) { // _arr从1开始 day所对应的下标应减一 结束日期若不大于0点应不包含在内
            _obj.days = _arr.slice(S.day - 1, E.hour > 0 || E.minutes > 0 ? E.day : E.day - 1)
          } else {
            let _Y = item.split('-')[0]
            let _M = item.split('-')[1]
            if (index === 0) {
              if (__arr.includes(_M)) { // 大月
                _obj.days = _arr.slice(S.day - 1)
              } else if (___arr.includes(_M)) { // 小月
                _obj.days = _arr.slice(S.day - 1, 30)
              } else { // 二月
                if (_Y % 4 == 0 && _Y % 100 != 0 || _Y % 400 == 0) { // 闰年
                  _obj.days = _arr.slice(S.day - 1, 29)
                } else { // 平年
                  _obj.days = _arr.slice(S.day - 1, 28)
                }
              }
            } else if (index === _ret.length - 1) {
              _obj.days = _arr.slice(0, E.hour > 0 || E.minutes > 0 ? E.day : E.day - 1)
            } else {
              if (__arr.includes(_M)) { // 大月
                _obj.days = _arr
              } else if (___arr.includes(_M)) { // 小月
                _obj.days = _arr.slice(0, 30)
              } else { // 二月
                if (_Y % 4 == 0 && _Y % 100 != 0 || _Y % 400 == 0) { // 闰年
                  _obj.days = _arr.slice(0, 29)
                } else { // 平年
                  _obj.days = _arr.slice(0, 28)
                }
              }
            }
          }
          ret.push(_obj)
        })
        return ret
      },
      tdLength () {
        let L = 0
        this.timeList.forEach(item => {
          L += item.days.length
        })
        return L
      },
      rectAllLength () {
        return 24 * 60 * 60 * 1000 * this.tdLength
      }
    },
    methods: {
      rectStyle ({startTime, endTime, status}) {
        let _timeLength = new Date(endTime).getTime() - new Date(startTime).getTime()
        // 偏移量从开始0点算起
        let S = utils.getNewDate(new Date(this.startTime))
        let _S = utils.getDate({year: S.year, month: S.month, day: S.day, hour: 0, minutes: 0, seconds: 0}).getTime()
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
