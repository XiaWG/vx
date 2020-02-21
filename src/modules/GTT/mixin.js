export default{
  methods: {
    setOptions (data) {
      var option = {
        backgroundColor: "#fff",
        title: {
          text: "甘特图示例",
          padding: 20,
          textStyle: {
            fontSize: 17,
            fontWeight: "bolder",
            color: "#333"
          },
          subtextStyle: {
            fontSize: 13,
            fontWeight: "bolder"
          }
        },
        // legend: {
        //   data: ["计划工期", "A工单", "B工单", "C工单", "D工单", "E工单"],
        //   align: "right",
        //   right: 80,
        //   top: 50
        // },
        // grid: {
        //   containLabel: true,
        //   show: false,
        //   right: 130,
        //   left: 40,
        //   bottom: 40,
        //   top: 90
        // },
        xAxis: {
          type: "time",
          axisLabel: {
            "show": true,
            "interval": 0
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function(value, index) {
              return value
            }
          },
          data: ["产线一", "产线二", "产线三", "产线四", "产线五", "产线六"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var res = "";
            var name = "";
            var start0 = "";
            var start = "";
            var end0 = "";
            var end = "";
            for (var i in params) {
              var k = i % 2;
              if (!k) { //偶数
                end0 = params[i].data
                end = end0.getFullYear() + "-" + (end0.getMonth() + 1) + "-" + end0.getDate();
              }
              if (k) { //奇数
                name = params[i].seriesName;
                start0 = params[i].data;
                start = start0.getFullYear() + "-" + (start0.getMonth() + 1) + "-" + start0.getDate();
                res += name + " : " + start + "~" + end + "</br>";
              }
            }
            return res;
          }
        },
        series: [
          // {
          //   name: "计划工期",
          //   type: "bar",
          //   stack: "总量1",
          //   label: {
          //     normal: {
          //       show: true,
          //       color: "#000",
          //       position: "insideRight",
          //       formatter: function(params) {
          //         return params.seriesName
          //       }
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "grey",
          //       borderColor: "#fff",
                
          //     }
          //   },
          //   zlevel: -10,
          //   data: [new Date("2018-05-01"), new Date("2018-03-14"), new Date("2018-05-01"), new Date("2018-05-01"), new Date("2018-03-14"), new Date("2018-05-01")]
          // },
          // {
          //   name: "计划工期",
          //   type: "bar",
          //   stack: "总量1",
          //   itemStyle: {
          //     normal: {
          //       color: "white",
          //       borderColor: "#fff",
                
          //     }
          //   },
          //   zlevel: -10,
          //   z: 3,
          //   data: [new Date("2018-01-01"), new Date("2018-01-01"), new Date("2018-03-15"), new Date("2018-01-01"), new Date("2018-01-01"), new Date("2018-03-15")]
          // },
          {
            name: "A工单",
            type: "bar",

            barWidth: 5,
            stack: "总量",
            label: {
              normal: {
                show: false,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "green",
                borderColor: "#fff",
                
              }
            },
            zlevel: -1,
            data: [new Date("2018-01-10"), new Date("2018-01-10"), new Date("2018-03-30"), new Date("2018-01-10"), new Date("2018-01-10"), new Date("2018-03-30")]
          },
          {
            name: "A工单",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "white",
                borderColor: "#fff",
                
              }
            },
            zlevel: -1,
            z: 3,
            data: [new Date("2018-01-02"), new Date("2018-01-02"), new Date("2018-03-16"), new Date("2018-01-02"), new Date("2018-01-02"), new Date("2018-03-16")]
          },
          {
            name: "B工单",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: false,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "red",
                borderColor: "#fff",
                
              }
            },
            zlevel: -2,
            data: [new Date("2018-02-20"), new Date("2018-01-20"), new Date("2018-04-10"), new Date("2018-02-20"), new Date("2018-01-20"), new Date("2018-04-10")]
          },
          {
            name: "B工单",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "white",
                borderColor: "#fff",
                
              }
            },
            zlevel: -2,
            z: 3,
            data: [new Date("2018-02-01"), new Date("2018-01-12"), new Date("2018-04-01"), new Date("2018-02-01"), new Date("2018-01-12"), new Date("2018-04-01")]
          },
          {
            name: "C工单",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: false,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "brown",
                borderColor: "#fff",
                
              }
            },
            zlevel: -3,
            data: [new Date("2018-03-09"), new Date("2018-01-25"), new Date("2018-04-20"), new Date("2018-03-09"), new Date("2018-01-25"), new Date("2018-04-20")]
          },
          {
            name: "C工单",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "white",
                borderColor: "#fff",
                
              }
            },
            zlevel: -3,
            z: 3,
            data: [new Date("2018-02-25"), new Date("2018-01-21"), new Date("2018-04-11"), new Date("2018-02-25"), new Date("2018-01-21"), new Date("2018-04-11")]
          },
          {
            name: "D工单",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: false,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                borderColor: "#fff",
                
              }
            },
            zlevel: -4,
            data: [new Date("2018-03-12"), new Date("2018-02-15"), new Date("2018-04-30"), new Date("2018-03-12"), new Date("2018-02-15"), new Date("2018-04-30")]
          },
          {
            name: "D工单",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "white",
                borderColor: "#fff",
                
              }
            },
            zlevel: -4,
            z: 3,
            data: [new Date("2018-03-10"), new Date("2018-01-26"), new Date("2018-04-21"), new Date("2018-03-10"), new Date("2018-01-26"), new Date("2018-04-21")]
          },
          {
            name: "E工单",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: false,
                color: "#000",
                position: "right",
                formatter: function(params) {
                  return params.seriesName
                }
              }
            },
            itemStyle: {
              normal: {
                color: 'orange',
                borderColor: "#fff",
                
              }
            },
            zlevel: -5,
            data: [new Date("2018-05-02"), new Date("2018-03-13"), new Date("2018-05-10"), new Date("2018-03-30"), new Date("2018-03-13"), new Date("2018-05-01")]
          },
          {
            name: "E工单",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: 'white',
                borderColor: "#fff",
                
              }
            },
            zlevel: -5,
            z: 3,
            data: [new Date("2018-03-15"), new Date("2018-02-16"), new Date("2018-04-30"), new Date("2018-03-15"), new Date("2018-02-16"), new Date("2018-04-30")]
          },
        ]
      }
      this.setSeries(data)
      return option
    },
    setSeries (data) {
      let series = []
      this.formatterData(data)
      return series
    },
    formatterData (data) {
      let ret = []
      let y_line = []
      data.forEach(item => {
        let _label = item.room + '_' + item.line
        y_line.includes(_label) ? '' : y_line.push(_label)
      })
      console.log(y_line)
    }
  }
}