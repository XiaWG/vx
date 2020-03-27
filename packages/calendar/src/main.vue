
<template>
  <div>
    <div class='calendar calendar-container'>
      <div class='calendar-top-container'>
        <template v-for="n in 10">
          <div :key="n" class="top-border-container">
            <div class="top-border"></div>
          </div>
        </template>
      </div>      
      <div class='calendar-header-container' v-show="type=='top'">
        <vue-calendar-header
        :time="time"
        @handleToday="handleToday"
        @handlePrevMonth="handlePrevMonth"
        @handleNextMonth="handleNextMonth"
        />
      </div>
      <div class='calendar-body-container'>
        <div class='calendar-body-slider-container' v-show="type=='slider'">
          <div class="date-container">
            <div>
              <span class="y-m-container">{{selectTime.year + '年' + (selectTime.month + 1) + '月'}}</span>
              <span class="day-container">{{selectTime.day}}</span>
            </div>
          </div>
          <div class="btn-group-container">
            <div class="btn-group prev-month" title="上个月" @click="handlePrevMonth"></div>
            <div class="btn-group back-today" title="今天" @click="handleToday"></div>
            <div class="btn-group next-month" title="下个月" @click="handleNextMonth"></div>
          </div>
          <div class="select-day-info">
            <slot name="select-day-info"></slot>
          </div>
        </div>
        <div class='calendar-body-main-container'>
          <vue-calendar-month
          ref="calendarMonth"
          :time="time"
          @click-day-success="handleClickDay"
          @hover-later-success="hoverLaterSuccess"
          @hover-later-error="hoverLaterError"
          @show-modal="showModal">
          <template slot="default-appearance" slot-scope="{data}">
            <slot name="default-appearance" :data="data"></slot>
          </template>
          </vue-calendar-month>
        </div>
      </div>
      <div class="calendar-modal-container"
      v-show="false && modal.show"
      :style="{top: modal.position.top + 'px', left: modal.position.left + 'px'}">

      </div>
    </div>
  </div>
</template>

<script>
import VueCalendarHeader from './parts/calendar-header'
import VueCalendarMonth from './parts/calendar-month'
import * as utils from './utils.js'
export default{
  name: 'VueCalendar',
  components: {
    VueCalendarHeader,
    VueCalendarMonth
  },
  data() {
    let {year, month, day} = utils.getNewDate(new Date())
    return {
      type: "slider",
      time: {year, month, day},
      selectTime: {year, month, day},
      modal: {
        show: false,
        position: {
          top: 10,
          left:10
        }
      }
    }
  },
  methods: {
    // 上一个月
    handlePrevMonth () {
      let prevMonth = utils.getDate(this.time.year,this.time.month,1)
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      this.time = utils.getNewDate(prevMonth)
      this.selectTime = this.time
    },
    // 下一个月
    handleNextMonth () {
      let nextMonth = utils.getDate(this.time.year,this.time.month,1)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      this.time = utils.getNewDate(nextMonth)
      this.selectTime = this.time
    },
    // 点击回到今天
    handleToday () {
      this.time = utils.getNewDate(new Date())
      this.selectTime = this.time
    },
    // 点击某一天
    handleClickDay (item) {
      this.selectTime = {
        year: item.year,
        month: item.month -1,
        day: item.day
      }
      this.$emit('click-day-success', item)
    },
    hoverLaterSuccess (item) {
      this.$emit('hover-later-success', item)
    },
    hoverLaterError (item) {
      this.$emit('hover-later-error', item)
    },
    showModal (item) {
      this.modal.show = item.show
      this.modal.position.top = item.top
      this.modal.position.left = item.left
    },
    getDateList () { // 对外暴露当前也所有日期
      return this.$refs.calendarMonth.calendarList
    }
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
  width:80%;
  margin:10px auto;
  padding: 70px 10px 10px 10px;
  overflow: hidden;
  text-align:center;
  position:relative;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.calendar::before{
  content: '';
  position: absolute;
  width: 100%;
  height:5px;
  left:0;
  bottom:2px;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
}
.calendar::after{
  content: '';
  position: absolute;
  width: 100%;
  height:5px;
  left:0;
  bottom:5px;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
}
.calendar-body-container{
  width:100%;
  height:640px;
  /* overflow: hidden; */
}
.calendar-body-slider-container{
  float:left;
  width:150px;
}
.calendar-body-main-container{
  float:left;
  width:calc(100% - 150px);
}
.calendar-header-container{
  width:100%;
  overflow: hidden;
  position: relative;
}
.calendar-modal-container{
  position:absolute;
  min-width:200px;
  width:20%;
  min-height:300px;
  border:1px solid #ccc;
  border-radius:5px;
  top:0;
  background:#fff;
  box-shadow:0 0 9px 3px #ccc;
}
.calendar-top-container{
  width:100%;
  position: absolute;
  left:0;
  top:10px;
  height:30px;
  border-bottom:1px solid #ccc;
  z-index:9;
}
.top-border-container{
  float:left;
  width:10%;
  height:60px;
  position: relative;
}
.top-border{
  position: absolute;
  width: 10px;
  height:40px;
  top: 10px;
  left: 50%;
  margin-left:-5px;
  border: 1px solid #ccc;
  border-radius:15px;
  background: #fff;
}
.top-border::before{
  content: '';
  position: absolute;
  width: 20px;
  height:20px;
  top:-10px;
  left:-6px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: #000;
  z-index:-1;
}
.top-border::after{
  content: '';
  position: absolute;
  width: 20px;
  height:20px;
  top:30px;
  left:-6px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: #000;
  z-index:-1;
}
.date-container{
  width:140px;
  height:250px;
  background:#c72f2f;
  position: relative;
  top: -30px;
}
.date-container::after{
  content:'';
  position: absolute;
  bottom:0;
  left:0;
  border: 70px solid transparent;
  border-bottom: 70px solid #fff;
}
.y-m-container{
  position: absolute;
  width: 100%;
  left: 0;
  top: 60px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  z-index: 1;
}
.day-container{
  position: absolute;
  width: 100%;
  left: 0;
  top: 80px;
  text-align: center;
  font-size: 60px;
  color: #fff;
  z-index: 1;
}
.btn-group-container{
  width: 140px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height:30px;
}
.btn-group{
  width:33.3%;
  float:left;
  height:100%;
  border-right:1px solid #ccc;
  cursor: pointer;
  position: relative;
}
.next-month{
  border:0;
}
.btn-group:hover{
  background: #ccc;
}
.prev-month::before{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -12.5px;
  margin-top: -10px;
  content: '';
  border: 10px solid transparent;
  border-right: 10px solid #303030;
}
.next-month::before{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -2.5px;
  margin-top: -10px;
  content: '';
  border: 10px solid transparent;
  border-left: 10px solid #303030;
}
.back-today::before{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -10px;
  margin-top: -10px;
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background:#303030;
}
.select-day-info{
  width: 140px;
  height: 350px;
  margin-top: 10px;
  border: 1px solid #ccc;
}
</style>
