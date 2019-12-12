
<template>
  <div>
    <div class='calendar calendar-container'>
      <div class='calendar-header-container'>
        <vue-calendar-header
        :time="time"
        @handleToday="handleToday"
        @handlePrevMonth="handlePrevMonth"
        @handleNextMonth="handleNextMonth"
        />
      </div>
      <div class='calendar-body-container'>
        <vue-calendar-month
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
      <div class="calendar-modal-container"
      v-show="modal.show"
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
      time: {year, month, day},
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
    },
    // 下一个月
    handleNextMonth () {
      let nextMonth = utils.getDate(this.time.year,this.time.month,1)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      this.time = utils.getNewDate(nextMonth)
    },
    // 点击回到今天
    handleToday () {
      this.time = utils.getNewDate(new Date())
    },
    // 点击某一天
    handleClickDay (item) {
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
  width:100%;
  overflow: hidden;
  text-align:center;
  position:relative;
}
.calendar-body-container{
  width:100%;
  overflow: hidden;
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
</style>
