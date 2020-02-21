<template>
  <div class="tooltips_container">
    <slot></slot>
    <div class='_proto_'></div>
  </div>
</template>

<script>
export default{
  name: 'gante-tooltips'
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.tooltips_container{
  min-width: 100px;
  /* height: 40px; */
  line-height: 30px;
  text-align: center;
  /* border: 1px solid #fff; */
  /* border-radius: 10px; */
  /* padding: 10px; */
  position: absolute;
  background: #000;
  opacity: 0.6;
  top: 0px;
  color: #fff;
  font-size: 12px;
  padding: 0 20px 0 10px;
  z-index: 999;
}
.tooltips_container::after{
  content: '';
  position: absolute;
  top:4px;
  left:4px;
  width:calc(100% - 10px);
  height:calc(100% - 10px);
  border: 1px dashed #fff;
  /* border-radius:10px; */
}
.tooltips_container::before{
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  top: 10px;
  right: 7px;
}
._proto_{
  width: 50px;
  height: 20px;
  border: 1px solid #000;
  position: absolute;
  top: 15px;
  right: -50px;
  transform: skew(50deg);
  border-left: 0;
  border-bottom: 0;
}
</style>
