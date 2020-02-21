<template>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-card class="box-card">
        <el-form ref="form" :model="form" :inline="true" label-width="80px">
          <el-form-item label="车间">
            <el-select v-model="form.room" placeholder="请选择车间">
              <el-option label="车间一" value="room1"></el-option>
              <el-option label="车间二" value="room2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产线">
            <el-select v-model="form.line" placeholder="请选择产线">
              <el-option label="产线一" value="line1"></el-option>
              <el-option label="产线二" value="line2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="form.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSearch">查询并生成图表</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card" style="margin: 10px 0">
        <gante :options="options" :data="data"/>
        <!-- <VueCharts :options="options"/> -->
      </el-card>
      <el-card class="box-card">
        <el-table :data="tableData" @row-click="rowClick" style="width: 100%">
          <el-table-column
            prop="type"
            label="计划类型">
          </el-table-column>
          <el-table-column
            prop="id"
            label="工单编码">
          </el-table-column>
          <el-table-column
            prop="line"
            label="产线编码">
          </el-table-column>
          <el-table-column
            prop="product"
            label="成品编码">
          </el-table-column>
          <el-table-column
            prop="status"
            label="生产状态">
            <template slot-scope="scope">
              {{ formatter(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="计划数量">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>  
</template>

<script>
import data from './data.js'
import mixin from './mixin.js'
import gante from './gante.vue'
export default{
  name: 'GTT',
  mixins: [mixin],
  components: {
    gante
  },
  data () {
    let legend = [
      {key: '_Cur', text: '在产', color: 'green'},
      {key: '_Wait', text: '队列', color: 'grey'}
    ]
    return {
      tableData: [],
      data: {},
      form: {
        room: '',
        line: '',
        time: []
      },
      options: {
        show: false,
        startTime: '',
        endTime: '',
        legend,
        tooltips: {}
      },
      timeout: null
    }
  },
  watch: {
    form: {
      handler: function (val) {
        this.options.startTime = val.time[0]
        this.options.endTime = val.time[1]
      },
      deep: true
    }
  },
  methods: {
    formatter (key) {
      let item = this.options.legend.find(item => item.key === key)
      return item ? item.text : ''
    },
    doSearch () {
      this.tableData = data
      this.options.show = true
      this.data = this.setOption(this.tableData)
    },
    setOption (data) {
      let ret = {}
      let rooms = []
      let lines = []      
      let hash = []
      data.forEach((item, index) => {
        item.$guid = '$guid' + index
        rooms.includes(item.room) ? '' : rooms.push(item.room)
        lines.includes(item.line) ? '' : rooms.push(item.line)
        let _key = item.room + '_' + item.line
        if (!hash[_key]) {
          ret[_key] = []
          ret[_key].push(item)
          hash[_key] = true
        } else {
          ret[_key].push(item)
        }
      })
      return ret
    },
    rowClick (row) {
      this.options.tooltips = {
        data: row,
        show: true
      },
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {this.options.tooltips.show = false}, 3000)
    }
  }
}
</script>

<style>

</style>
