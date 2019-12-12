
<template>
  <div>
    <span class='backToday' @click='handleToday'>今天</span>
    <b class='prev' @click='handlePrevMonth'></b>
    <span class='nowDate'>{{time.year}}年{{time.month+1}}月</span>
    <b class='next' @click='handleNextMonth'></b>
  </div>
</template>

<script>
export default{
  name: 'VueCalendar-header',
  props: {
    time: {
      type: Object,
      required: true,
    }
  },
  methods: {
    // 上一个月
    handlePrevMonth () {
      this.$emit('handlePrevMonth')
    },
    // 下一个月
    handleNextMonth () {
      this.$emit('handleNextMonth')
    },
    // 点击回到今天
    handleToday () {
      this.$emit('handleToday')
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
  height:120px;
  border-right:1px solid #ccc;
  border-bottom:1px solid #ccc;
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
  background:red;
  color:#fff;
}
</style>
