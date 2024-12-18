<template xmlns="">
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">2023河源市就业人口</span>
          <div style="font-size: large;"></div>
          <dv-decoration-1 class="dv-dec-1"/>
        </div>
      </div>
      <div class="d-flex jc-center">
        <Echart
            :options="options"
            height="320px"
            width="360px"
        ></Echart>
      </div>
    </div>
  </div>
</template>

<script>
import Echart from '../../../common/echart/index.vue'

export default {
  data() {
    return {
      options: {}
    }
  },
  components: {
    Echart
  },
  created() {
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
        data: ["批发和零售","教育和娱乐","技术","农林牧渔业","制造业","其他"],//res.data.map(item => item.label),
        textStyle: {
          color: "#fff"
        }
      },
      series: [
        {
          name: "就业人口占比",
          type: "pie",
          radius: [10, 50],
          roseType: "radius",
          center: ["50%", "40%"],
          data: [{value: 156223, name: "批发和零售"},
                 {value: 54139, name: "教育和娱乐"},
                 {value: 10653, name: "技术"},
                 {value: 691600, name: "农林牧渔业"},
                 {value: 193298, name: "制造业"},
                 {value: 284187, name: "其他"}]
          //     res.data.map(item => {
          //   return { value: item.num, name: item.label }
          // })

        }
      ]
    }
    /*if (1 === 1) {
      return
    }*/
    this.$request.request({
      url: process.env.VUE_APP_BASE_URL_API + '/hyc/bad/talented-num',
      method: 'get'
    }).then(res => {

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
          data: res.data.map(item => item.label),
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "系统学历录入占比",
            type: "pie",
            radius: [10, 50],
            roseType: "radius",
            center: ["50%", "40%"],
            data: res.data.map(item => {
              return {value: item.num, name: item.label}
            })
          }
        ]
      }

    })
  }
};
</script>

<style lang="scss" scoped>
#centerLeft1 {
  $box-width: 300px;
  $box-height: 410px;
  padding: 16px;
  height: $box-height;
  min-width: $box-width;
  border-radius: 5px;

  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }

  .text {
    color: #c3cbde;
  }

  .dv-dec-1 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .chart-box {
    margin-top: 16px;
    width: 170px;
    height: 170px;

    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
