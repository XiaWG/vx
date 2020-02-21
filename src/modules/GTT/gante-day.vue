<template>
  <table class="my-chart-table">
    <thead>
      <tr>
        <td v-for='(item, index) of timeList' class="label" :key='index' :colspan="item.hours.length" v-if="item.hours.length > 0"
          v-html="item.day">
        </td>
      </tr>
      <tr>
        <template v-for='(item, index) of timeList'>
          <td v-for='(_item, _index) of item.hours' :key="index + '_' + _index" class="label" v-html="_item"></td>
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
        let C = utils.getDate({year: S.year, month: S.month, day: S.day, hour: 0, minutes: 0, seconds: 0}).getTime()
        while (C <= utils.getDate(E).getTime()) {
          let _C = utils.getNewDate(new Date(C))
          _ret.push(_C.year + '-' + (_C.month + 1) + '-' + _C.day)
          C += 24 * 60 * 60 * 1000
        }
        let arr = [
          '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
          '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
        ]
        let _arr = [], _beg = 0, _end = 0, _str = ''
        if (this.precision.hour == 1) {
          _arr = arr
        } else {
          arr.forEach((item, index) => {
            if (index % this.precision.hour === 0) {
              _beg = index
            } else {
              _end = index
            }
            if ((index+1) % this.precision.hour === 0) {
              _str = arr[_beg] + '~' + arr[_end]
              _arr.push(_str)
            }
          })
        }
        _ret.forEach((item, index) => {
          let _obj = {}
          _obj.day = item
          if (_ret.length === 1) {
            _obj.hours = _arr.slice(Math.floor(S.hour/this.precision.hour), Math.ceil(E.hour/this.precision.hour))
          } else {
            _obj.hours = index === 0 ? _arr.slice(Math.floor(S.hour/this.precision.hour)) : index === _ret.length - 1 ? _arr.slice(0, Math.ceil(E.hour/this.precision.hour)) : _arr
          }
          ret.push(_obj)
        })
        return ret
      },
      tdLength () {
        let L = 0
        this.timeList.forEach(item => {
          L += item.hours.length
        })
        return L
      },
      rectAllLength () {
        return 60 * 60 * 1000 * this.tdLength * this.precision.hour
      }
    },
    methods: {
      rectStyle ({startTime, endTime, status}) {
        let _timeLength = new Date(endTime).getTime() - new Date(startTime).getTime()
        let _posLength = new Date(startTime).getTime() - new Date(this.startTime).getTime()
        if (this.precision.hour && this.precision.hour != 1) {
          let S = this.timeList[0].day + ' ' + this.timeList[0].hours[0].split('~')[0]
          _posLength = new Date(startTime).getTime() - new Date(S).getTime()
        }
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
