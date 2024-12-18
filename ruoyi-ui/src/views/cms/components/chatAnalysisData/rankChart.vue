<!-- RankChart.vue -->
<template>
  <div ref="chart" :style="{ width: '760px', height: '520px' }"></div>
</template>

<script>
import * as echarts from 'echarts';

//定义Vue组件的配置对象
export default {
  name: 'RankChart',//组件的名称
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

      let pieData = data.sort((a, b) => b.value - a.value);//将data数组按照value属性的值进行降序排序，用于确定条形图的顺序。
      let xAxisData = pieData.map(item => item.name)//根据排序后的数据，提取X轴的标签。
      let seriesData = pieData.map(item => item.value)//提取用于条形图的数据。
      //: 创建一个与seriesData长度相同的数组，每个元素的值是seriesData中第一个元素的值的两倍，用于创建背景条形图。
      let maxSeriesData = new Array(pieData.length).fill(this.roundDown(pieData[0].value) * 2);
      //定义了一系列颜色渐变，用于不同的条形图。
      let barLinearColors = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#EB3B5A" },
          { offset: 1, color: "#FE9C5A" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#FA8231" },
          { offset: 1, color: "#FFD14C" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#F7B731" },
          { offset: 1, color: "#FFEE96" }
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#395CFE" },
          { offset: 1, color: "#2EC7CF" }
        ])
      ]
      //这个函数接受条形图数据作为输入，并返回一个新的数组，其中每个元素都是一个对象，
      // 包含value和itemStyle。itemStyle定义了条形图的颜色，根据条形图的索引选择不同的颜色渐变
      function rankBarColor(cData) {
        let tempData = []
        cData.forEach((item, index) => {
          tempData.push({
            value: item,
            itemStyle: {
              color: index > 3 ? barLinearColors[3] : barLinearColors[index]
            }
          })
        })
        return tempData
      }
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            return params && params[0].marker + params[0].name + ': ' + params[0].value;
          }
        },
        //设置了图表的网格布局
        grid: { left: '8%', top: '2%', bottom: '2%', right: '10%', }, // containLabel: true
        //配置了X轴和Y轴的属性，包括类型、标签、刻度等。
        xAxis: {
          type: "value",
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: { show: false },
            axisTick: { show: false },
            data: xAxisData,
            axisLabel: {
              rich: {
                nt1: {
                  color: "#fff",
                  backgroundColor: '#EB3B5A',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1]
                },
                nt2: {
                  color: "#fff",
                  backgroundColor: '#FA8231',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1]
                },
                nt3: {
                  color: "#fff",
                  backgroundColor: '#F7B731',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1]
                },
                nt: {
                  color: "#fff",
                  backgroundColor: '#00a9c8',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  align: "center",
                  borderRadius: 100,
                  padding: [0, 1, 2, 1]
                }
              },
              formatter: function (value) {
                let idx = xAxisData.indexOf(value) + 1
                if (idx <= 3) {
                  return ["{nt" + idx + "|" + idx + "}"].join("\n");
                } else {
                  return ["{nt|" + idx + "}"].join("\n");
                }
              }
            }
          },
          {//名称
            type: 'category',
            offset: -10,
            inverse: true,
            position: "left",
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: '#333',
              align: "left",
              verticalAlign: "bottom",
              lineHeight: 32,
              fontSize: 12
            },
            data: xAxisData
          },
        ],
        series: [
          {
            zlevel: 1,
            type: "bar",//类型为条形图
            barWidth: 16,//条形图的宽度
            data: rankBarColor(seriesData),
            //条形图的样式，如边框圆角
            itemStyle: {
              normal: {
                barBorderRadius: 30
              }
            },
            // 配置了条形图上的标签显示，包括字体大小和颜色。
            label: {
              show: true,
              fontSize: 12,
              color: "#fff",
              formatter: '{c}'
            }
          },
          {
            type: "bar",
            barWidth: 16,
            barGap: "-100%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: 'rgba(0,0,0,0.04)'
              }
            },
            data: maxSeriesData
          }
        ],
        //添加一个数据缩放的滑块，允许用户通过拖动滑块来选择图表中的特定数据范围。
        // 这对于查看大量数据时非常有用，因为它可以帮助用户聚焦于感兴趣的数据段。
        dataZoom: [{
          type: 'slider',//缩放工具的类型为滑块
          backgroundColor: 'rgba(245,245,245)',
          // backgroundColor: 'transparent',
          brushSelect: false,
          width: 10,
          show: true, //flase直接隐藏图形
          yAxisIndex: [0, 1],
          //left: 'center', //滚动条靠左侧的百分比
          //bottom: 13,
          startValue: 0, //滚动条的起始位置
          endValue: 4, //滚动条的截止位置（按比例分割你的柱状图x轴长度）

          handleStyle: {
            color: '#504646',
            borderColor: '#413a3a',
          },
          fillerColor: '#342b2b',
          borderColor: 'transparent',
          showDetail: false,

          dataBackground: {
            areaStyle: {
              opacity: 0
            },
            lineStyle: {
              color: 'transparent'
            },
          },

        }],
      };
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
