<template>
  <div style="position: relative;">
    <table class="my-chart-table" ref='table'>
      <thead>
        <tr>
          <td v-for='(item, index) of timeList' class="label" :key='index' :colspan="item.precision_details.length" v-if="item.precision_details.length > 0"
            v-html="item.precision">
          </td>
        </tr>
        <tr>
          <template v-for='(item, index) of timeList'>
            <td v-for='(_item, _index) of item.precision_details' :key="index + '_' + _index" class="label" v-html="_item"></td>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in data" :key='key'>
          <td :colspan="tdLength" style="position: relative;">
            <div style="position: relative; overflow: hidden; height: 100%;">
              <div class="rect" 
                v-for="(_item, _index) of item" 
                :key="_index"
                :class="_item.$guid"
                :style='rectStyle(_item)'
                @click='handleClick(_item)'
                @mouseover='handleMouseover(_item)'
                @mouseout='handleMouseout(_item)'>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <gante-tooltips ref="tooltips" v-show="tooltips.show">{{tooltips.text}}</gante-tooltips>
  </div>
</template>

<script>
  import * as utils from './utils.js'
  import ganteTooltips from './gante-tooltips.vue'
  export default{
    name: 'gante-main',
    components: {
      ganteTooltips
    },
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
        tooltips: {
          text: '',
          show: false
        }
      }
    },
    watch: {
      options: {
        handler: function (val) {
          this.tooltips.show = val.tooltips.show
          let $guid = val.tooltips.data.$guid || ''
          if ($guid) {
            this.tooltips.text = val.tooltips.data.id
            let _target = document.getElementsByClassName($guid)[0]
            let _left = _target.offsetLeft
            let _top = _target.offsetParent.offsetParent.offsetTop
            this.$refs.tooltips.$el.style.left = _left - 165 + 'px'
            this.$refs.tooltips.$el.style.top = _top -24 + 'px'
          }
          let startTime = val.tooltips.data.startTime || 0
          if (!startTime) {return}
          let _posLength = this.getPosition(startTime)
          let _width = this.$refs.table.offsetWidth * (_posLength / this.rectAllLength) -165
          this.$parent.scrollleft(_width)
        },
        deep: true
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
        if (this.precision.active === 'day') {
          ret = this.getDayList()
        } else if (this.precision.active === 'month') {
          ret = this.getMonthList()
        } else if (this.precision.active === 'year') {
          ret = this.getYearList()
        }
        return ret
      },
      tdLength () {
        let L = 0
        this.timeList.forEach(item => {
          L += item.precision_details.length
        })
        return L
      },
      rectAllLength () {
        let ret = ''
        if (this.precision.active === 'day') {
          ret = 60 * 60 * 1000 * this.tdLength * this.precision.hour
        } else if (this.precision.active === 'month') {
          ret = 24 * 60 * 60 * 1000 * this.tdLength
        } else if (this.precision.active === 'year') {
          ret = 30 * 24 * 60 * 60 * 1000 * this.tdLength
        }
        return ret
      }
    },
    methods: {
      getDayList () {
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
          _obj.precision = item
          if (_ret.length === 1) {
            _obj.precision_details = _arr.slice(Math.floor(S.hour/this.precision.hour), Math.ceil(E.hour/this.precision.hour))
          } else {
            _obj.precision_details = index === 0 ? _arr.slice(Math.floor(S.hour/this.precision.hour)) : index === _ret.length - 1 ? _arr.slice(0, Math.ceil(E.hour/this.precision.hour)) : _arr
          }
          ret.push(_obj)
        })
        return ret
      },
      getMonthList () {
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
          _obj.precision = item
          if (_ret.length === 1) { // _arr从1开始 day所对应的下标应减一 结束日期若不大于0点应不包含在内
            _obj.precision_details = _arr.slice(S.day - 1, E.hour > 0 || E.minutes > 0 ? E.day : E.day - 1)
          } else {
            let _Y = item.split('-')[0]
            let _M = item.split('-')[1]
            if (index === 0) {
              if (__arr.includes(_M)) { // 大月
                _obj.precision_details = _arr.slice(S.day - 1)
              } else if (___arr.includes(_M)) { // 小月
                _obj.precision_details = _arr.slice(S.day - 1, 30)
              } else { // 二月
                if (_Y % 4 == 0 && _Y % 100 != 0 || _Y % 400 == 0) { // 闰年
                  _obj.precision_details = _arr.slice(S.day - 1, 29)
                } else { // 平年
                  _obj.precision_details = _arr.slice(S.day - 1, 28)
                }
              }
            } else if (index === _ret.length - 1) {
              _obj.precision_details = _arr.slice(0, E.hour > 0 || E.minutes > 0 ? E.day : E.day - 1)
            } else {
              if (__arr.includes(_M)) { // 大月
                _obj.precision_details = _arr
              } else if (___arr.includes(_M)) { // 小月
                _obj.precision_details = _arr.slice(0, 30)
              } else { // 二月
                if (_Y % 4 == 0 && _Y % 100 != 0 || _Y % 400 == 0) { // 闰年
                  _obj.precision_details = _arr.slice(0, 29)
                } else { // 平年
                  _obj.precision_details = _arr.slice(0, 28)
                }
              }
            }
          }
          ret.push(_obj)
        })
        return ret
      },
      getYearList () {
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
          _obj.precision = item
          if (_ret.length === 1) { // month 从0开始 需加1取到结束月份
            _obj.precision_details = _arr.slice(S.month, E.month + 1)
          } else {
            _obj.precision_details = index === 0 ? _arr.slice(S.month) : index === _ret.length - 1 ? _arr.slice(0, E.month + 1) : _arr
          }
          ret.push(_obj)
        })
        return ret
      },
      getPosition (startTime) {
        if (this.precision.active === 'day') {
          let _posLength = new Date(startTime).getTime() - new Date(this.startTime).getTime()
          if (this.precision.hour && this.precision.hour != 1) {
            let S = this.timeList[0].precision + ' ' + this.timeList[0].precision_details[0].split('~')[0]
            _posLength = new Date(startTime).getTime() - new Date(S).getTime()
          }
          return _posLength
        } else if (this.precision.active === 'month') {
          // 偏移量从开始0点算起
          let S = utils.getNewDate(new Date(this.startTime))
          let _S = utils.getDate({year: S.year, month: S.month, day: S.day, hour: 0, minutes: 0, seconds: 0}).getTime()
          let _posLength = new Date(startTime).getTime() - _S
          return _posLength
        } else if (this.precision.active === 'year') {
          // 偏移量从开始月的第一天算起
          let S = utils.getNewDate(new Date(this.startTime))
          let _S = utils.getDate({year: S.year, month: S.month, day: 1, hour: 0, minutes: 0, seconds: 0}).getTime()
          let _posLength = new Date(startTime).getTime() - _S
          return _posLength
        }
      },
      rectStyle ({startTime, endTime, status}) {
        let _timeLength = new Date(endTime).getTime() - new Date(startTime).getTime()
        let _posLength = this.getPosition(startTime)
        let _width = (_timeLength / this.rectAllLength) * 100 + '%'
        let _left = (_posLength / this.rectAllLength) * 100 + '%'
        let _background = this.options.legend.find(item => item.key === status) && this.options.legend.find(item => item.key === status).color || 'grey'
        let ret = {width: _width, left: _left, borderColor: _background, background: _background}
        return ret
      },
      handleClick (data) {
        alert(JSON.stringify(data))
        this.$emit('click-success', data)
      },
      handleMouseover (data) {
        this.tooltips.text = data.id
        this.tooltips.show = true
        let _left = event.target.offsetLeft
        let _top = event.target.offsetParent.offsetParent.offsetTop
        this.$refs.tooltips.$el.style.left = _left - 165 + 'px'
        this.$refs.tooltips.$el.style.top = _top -24 + 'px'
        this.$emit('mouseover-success', data)
      },
      handleMouseout (data) {
        this.tooltips.show = false
        this.$emit('mouseout-success', data)
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
  .rect:hover{
    box-shadow: 0px 0px 5px #888888;
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
  