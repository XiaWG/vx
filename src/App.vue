
<template>
  <div id="app" style="height:100%">
    <!-- <GTT/> -->
    <VueWorkFlow ref='ddd' @saveFlow="saveFlow"></VueWorkFlow>
  </div>
</template>

<script>
// import GTT from './modules/GTT/main.vue'
export default {
  name: 'app',
  components: {
    // GTT
  },
  methods: {
    saveFlow (data) {
      console.log(data)
    }
  },
  mounted () {
    let json = {
  "nodeList": [
    {
      "type": "x-lane",
      "nodeName": "横向泳道",
      "icon": "XLaneIcon",
      "Icon": "swap",
      "id": "x-lane-a87cf084ca9a41a8a6994ad90b0d57a1",
      "height": 200,
      "x": 3060,
      "width": 600,
      "y": 3150
    },
    {
      "type": "start",
      "nodeName": "开始",
      "icon": "StartIcon",
      "Icon": "play-circle",
      "id": "start-983709ec304d4e0884d12c669dbb3db6",
      "height": 50,
      "x": 3145,
      "width": 50,
      "y": 3215
    },
    {
      "type": "end",
      "nodeName": "结束",
      "icon": "EndIcon",
      "Icon": "poweroff",
      "id": "end-0bf2000859cb472489ad5babf8d77851",
      "height": 50,
      "x": 3465,
      "width": 50,
      "y": 3215
    }
  ],
  "linkList": [],
  "attr": {
    "id": "flow-d517f40ad7574ccbb1a6e00ee99172d2"
  },
  "config": {
    "showGrid": true,
    "showGridText": "隐藏网格",
    "showGridIcon": "eye"
  },
  "status": "2",
  "remarks": []
}
    this.$refs.ddd.loadFlow(JSON.stringify(json))
  }
}
</script>

<style>
</style>
