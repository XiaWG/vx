
<template>
  <div>
    <div>
      <div v-for='(item,index) in calendarTitleArr' :key='index' class='calendar-week-container'>
        {{item}}
      </div>
    </div>
    <div style="width:100%;overflow: hidden;border-left:1px solid #ccc;border-top:1px solid #ccc;">
      <div v-for='(item,index) in visibleCalendar' :key='index'
      :class="[item.isWeekend ? 'relax' : '', 'calendar-day-container']"
      @mouseenter="handleMouseIn($event.target, item)"
      @click.stop="handleClickDay($event.target, item)">
        <slot v-bind:data="item" name="default-appearance">
          <span :class="[item.isCurrentMonth ? '' : 'color-grey', 'localDate']">{{item.local}}</span>
          <span :class="[item.isCurrentMonth ? '' : 'color-grey', item.isCurrentDay ? 'color-red' : '', 'normalDate']">{{item.day}}</span>
        </slot>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import * as utils from '../utils.js'
  import MyDate from '../local.js'
  import HoverLater from '../hover-later.js'
  export default{
    name: 'VueCalendar-Month',
    props: {
      time: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        calendarTitleArr: [
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
          '星期日 '
        ],
        calendarList: [],
        showTip: false
      }
    },
    computed: {
      visibleCalendar () {
        let calendatArr = []
        let {year, month} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1))
        let currentFirstDay = utils.getDate(year, month, 1)
        // 获取当前月第一天星期几
        let weekDay = currentFirstDay.getDay()
        if (weekDay === 0) { weekDay = 7 }
        let startTime = currentFirstDay - (weekDay - 1) * 24 * 60 * 60 * 1000
  
        let monthDayMaxNum = 42
        for (let i = 0; i < monthDayMaxNum; i++) {
          let date = new Date(startTime + i * 24 * 60 * 60 * 1000)
          let yy = utils.getNewDate(date).year
          let mm = utils.getNewDate(date).month + 1
          let dd = date.getDate()
          let isWeekend = date.getDay() === 6 || date.getDay() === 0 ? true : false
          let local = new MyDate(date).getLocalDate()
          let _date = {date, year: yy, month: mm, day: dd, local, isSelected: false, isCurrentMonth: false, isCurrentDay: false, isWeekend}
          if (this.isPreMonth(date) || this.isCurrentMonth(date)) {
            if (this.isCurrentMonth(date)) {
              _date.isCurrentMonth = true
              if (this.isCurrentDay(date)) {
                _date.isCurrentDay = true
              }
            }
            calendatArr.push(_date)
          } else if (this.isNextMonth(date)) {
            if (calendatArr.length % 7 != 0) {
              calendatArr.push(_date)
            } else {
              break
            }
          }
        }
        let $els = document.querySelectorAll('.selected')
        $els.forEach($el => {
          let classNames = $el.className.split(' ')
          let ind = classNames.findIndex(cls => cls === 'selected')
          classNames.splice(ind, 1)
          $el.className = classNames.join(' ')
        })
        return calendatArr
      }
    },
    methods: {
      // 是否是当前月
      isCurrentMonth (date) {
        let {year: currentYear, month: currentMonth} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1))
        let {year, month} = utils.getNewDate(date)
        return currentYear == year && currentMonth == month
      },
      // 是否是上一个月
      isPreMonth (date) {
        let {year: currentYear, month: currentMonth} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1))
        let {year, month} = utils.getNewDate(date)
        // 同一年上一个月 || 上一年12月
        return (currentYear == year && currentMonth == (month + 1)) || (currentYear == (year + 1) && month == 11)
      },
      // 是否是下一个月
      isNextMonth (date) {
        let {year: currentYear, month: currentMonth} = utils.getNewDate(utils.getDate(this.time.year, this.time.month, 1))
        let {year, month} = utils.getNewDate(date)
        // 同一年下一个月 || 下一年1月
        return currentYear == year && currentMonth == (month - 1) || (currentYear == (year - 1) && month == 0)
      },
      // 是否是今天 
      isCurrentDay (date) {
        let {year: currentYear, month: currentMonth, day: currentDay} = utils.getNewDate(new Date())
        let {year, month, day} = utils.getNewDate(date)
        return currentYear == year && currentMonth == month && currentDay == day
      },
      // 点击某一天
      handleClickDay ($el, item) {
        item.isSelected = !item.isSelected
        let classNames = $el.className.split(' ')
        while (!classNames.includes('calendar-day-container')) {
          $el = $el.parentNode
          classNames = $el.className.split(' ')
        }
        if (classNames.includes('selected')) {
          let ind = classNames.findIndex(cls => cls === 'selected')
          classNames.splice(ind, 1)
        } else {
          classNames.push('selected')
        }
        $el.className = classNames.join(' ')
        this.$emit('click-day-success', item)
      },
      handleMouseIn (item, val) {
        let $me = this
        let fn1 = function (event) {
          let top = event.clientY
          let left = event.clientX
          $me.$emit('show-modal', {show: true, top, left})
          $me.$emit('hover-later-success', val)
        }
        let fn2 = function () {
          $me.$emit('show-modal', {show: false})
          $me.$emit('hover-later-error', val)
        }
        let hoverDom = new HoverLater(item, 500, fn1, fn2)
        hoverDom.HoverBegLis()
      }
    },
    created () {
      this.calendarList = this.visibleCalendar
    }
  }
  </script>
  
  <style scoped>
  *{
    padding:0;
    margin:0;
    box-sizing: border-box;
  }
  .calendar{
    width:100%;
    overflow: hidden;
    text-align:center;
  }
  .calendar-body-container{
    width:100%;
    overflow: hidden;
    border-left:1px solid #ccc;
    border-top:1px solid #ccc;
  }
  .calendar-header-container{
    width:100%;
    overflow: hidden;
    position: relative;
  }
  .calendar-day-container{
    float:left;
    width:14.285%;
    height:100px;
    border-right:1px solid #ccc;
    border-bottom:1px solid #ccc;
    position: relative;
  }
  .relax::before{
    content: '休';
    width: 20px;
    height: 20px;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #c72f2f;
    color: #fff;
    border-radius: 3px;
  }
  .calendar-day-container.selected{
    background:url('../img/check.png') no-repeat center center;
    background-size: 40%;
  }
  .calendar-week-container{
    float:left;
    width:14.285%;
    line-height:40px;
  }
  .prev,.next{
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #000;  
    border-top: 0;
    border-right: 0;
    cursor: pointer;
  }
  .prev{
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .next{
    -webkit-transform: rotate(225deg);
    transform: rotate(225deg);
  }
  .nowDate{
    cursor: default;
    display: inline-block;
    margin:10px 0px 20px;
    width:250px;
    font-size:25px;
  }
  .localDate{
    float:left;
    line-height:30px;
    padding:10px;
  }
  .normalDate{
    float:right;
    line-height:30px;
    text-align: center;
    margin:10px;
    border-radius:50%;
    width:30px;
    height:30px;
  }
  .backToday{
    border: 1px solid #ccc;
    line-height: 25px;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    position: absolute;
    left:10px;
    top:10px;
  }
  .backToday:hover{
    background:#bcc3d4
  }
  .color-grey{
    color: #ccc;
  }
  .color-red{
    background:#303030;
    color:#fff;
  }
  </style>
  