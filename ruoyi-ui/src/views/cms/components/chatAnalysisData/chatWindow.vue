<!-- RankChart.vue -->
<template>
  <div ref="chart" :style="{ width: '760px', height: '520px' }"></div>
</template>

<script>
import * as echarts from 'echarts';

//定义Vue组件的配置对象
export default {
  name: 'lineChart',//组件的名称
  //组件接受一个名为data的属性，它是一个数组，包含图表数据。
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  //组件挂载后立即初始化图表
  mounted() {
    this.initChart();
  },
  // 当data属性变化时，调用updateChart方法更新图表。
  watch: {
    data: {
      handler: 'updateChart',
      deep: true
    }
  },
  methods: {
    //初始化ECharts图表实例
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.updateChart();
    },
    //根据当前的data属性更新图表选项
    updateChart() {
      const option = this.getChartOption(this.data);
      this.chart.setOption(option);
    },
    //生成一个介于min和max之间的随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (min - max) + max);
    },
    // 将数字num四舍五入到最近的十位数
    roundDown(num) {
      const n = Math.floor(Math.log10(Number(num)));
      return Math.floor(num / Math.pow(10, n)) * Math.pow(10, n);
    },
    //根据传入的data生成图表的配置选项
    getChartOption(data) {

      const Data = ['1月', '2月', '3月', '4月', '5月', '6月']
      const sjlData = [200, 250, 370, 150, 350, 110]
      const bjlData = [150, 140, 300, 110, 260, 100]
      const balData = [80, 70, 80, 70, 80, 70, 80]
      const bjl2Data = [70, 60, 70, 60, 70, 90, 70]
      return {

        backgroundColor: "#000",
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(13,5,30,.6)',
          borderWidth: 1,
          borderColor: '#4ddd8f',
          padding: 5,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          top: 60,
          right: 30,
          icon: 'rect',
          textStyle: {
            color: '#c7d3e5'
          }
        },
        grid: {
          top: '25%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: Data,
            axisPointer: {
              type: 'shadow'
            },
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: 'rgba(199,211,229,0.5)'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(199,211,229,0.5)'
              }
            },
            axisLabel: {
              color: '#c7d3e5'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: 500,
            nameTextStyle: {
              color: '#c7d3e5'
            },
            axisLabel: {
              color: '#c7d3e5'
            },
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: 'rgba(64,136,254,1)'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(199,211,229,0.3)',
                width: 1,
                type: 'dashed'
              }
            }
          },
          {
            type: 'value',
            scale: true,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(199,211,229,0.3)'
              }
            },
            max: 100,
            min: 0,
            axisLabel: {
              formatter: '{value}%',  //右侧以百分比进行展示
              show: true,
              textStyle: {
                color: '#c7d3e5',
              }
            },
            nameTextStyle: {
              color: '#c7d3e5'
            },
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: 'rgba(64,136,254,1)'
              }
            },
          }
        ],
        series: [
          {
            name: '零售额',
            type: 'bar',
            barWidth: 14,
            data: sjlData,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(11, 160, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(11, 160, 255, 0)",
                },
              ]),
            }
          },
          {
            name: '乡村零售额',
            type: 'bar',
            barWidth: 14,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(245, 213, 39, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(245, 213, 39, 0)",
                },
              ]),
            },
            data: bjlData
          },
          {
            name: '零售额同比',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            data: balData,
            itemStyle: {
              color: '#2DF3E2'
            }
          },
          {
            name: '乡村零售额同比',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            data: bjl2Data,
            itemStyle: {
              color: '#885DFF'
            }
          }
        ]
      }
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<style scoped>
</style>
