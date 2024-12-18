<template>
  <div>

    <Echart
      :options="options"
      id="centreLeft1Chart"
      height="320px"
      width="260px"
    ></Echart>
  </div>
</template>

<script>
import Echart from '../../../../common/echart'
export default {
  data () {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    },
  },
  watch: {
    cdata: {
      handler (newData) {
        this.options = {
          color: [
            "#37a2da",
            "#32c5e9",
            "#9fe6b8",
            "#ffdb5c",
            "#ff9f7f",
            "#fb7293",
            "#e7bcf3",
            "#8378ea"
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} "
          },
          toolbox: {
            show: true
          },
          calculable: true,
          legend: {
            orient: "horizontal",
            icon: "circle",
            bottom: 0,
            x: "center",
            data: ["0-14岁","15-59岁","60岁以上"],
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              name: "购买人群占比",
              type: "pie",
              radius: [10, 50],
              roseType: "radius",
              center: ["50%", "40%"],
              data: [{value: 30, name: "0-14岁"},
                {value: 55, name: "15-59岁"},
                {value: 15, name: "60岁以上"},
                // {value: 10, name: "研究生"},
                // {value: 50, name: "其他"}
              ]
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
