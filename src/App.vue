
<template>
  <div id="app" style="height:100%">
    <VueCalendar/>
    <!-- <VueWorkFlow ref='ddd' @saveFlow="saveFlow"></VueWorkFlow> -->
  </div>
</template>

<script>
import GTT from './modules/GTT/main.vue'
export default {
  name: 'app',
  components: {
    GTT
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style>
</style>
