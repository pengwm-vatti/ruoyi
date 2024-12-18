<template>
  <div id="index" ref="appRef">
      <div class="host-body">

        <div class="yancao-social">
          <div class="lefts">
            <dv-border-box-12 class="lefts-1">
              <div style="font-size: large;">东源县常住人口年龄构成</div>
              <Echart :options="l1Config" width="460px" height="410px"></Echart>
            </dv-border-box-12>
            <dv-border-box-12 class="lefts-2">
              <div style="font-size: large; margin-bottom: 10px;">
                东源县劳动年龄（16-59周岁）人口受教育程度
              </div>
              <Echart :options="l2Config" width="460px" height="410px"></Echart>
            </dv-border-box-12>
          </div>
          <div class="mids">
            <div class="mids-1">
              <div style="font-size: x-large;">
                2022年河源市社会消费品零售总额3780141.0万元
              </div>
              <br />
              <div style="font-size: x-large;">
                2023年东源县社会消费品零售总额435163.6万元
              </div>
            </div>
            <div class="mids-2">
              <div class="titleText">
                河源市社会消费品零售总额累计增长走势图
              </div>
              <Echart :options="m2Config" width="880px" height="410px"></Echart>
            </div>
          </div>
          <div class="rights">
            <dv-border-box-12 class="rights-1">
              <div style="font-size: large;">各地区人口年龄构成</div>
              <Echart :options="r1Config" width="460px" height="410px"></Echart>
            </dv-border-box-12>
            <dv-border-box-12 class="rights-2">
              <div style="font-size: large;">
                东源县人口性别比、出生率和死亡率情况
              </div>
              <Echart
                :options="r2Config"
                width="440px"
                height="390px"
                style="margin: 10px;"
              ></Echart>
            </dv-border-box-12>
          </div>
        </div>
  </div>
  </div>
</template>

<script>
import drawMixin from "../../../utils/drawMixin";
import { formatTime } from "../../../utils";
import Echart from "../../common/echart/index.vue";
import * as yancaoSocialData from "./yancao-social";

export default {
  mixins: [drawMixin],
  components: {
    Echart,
  },
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      decorationColor: ["#568aea", "#000000"],
      cdata: {},

      l1Config: {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            label: {
              normal: {
                fontSize: 16,
              },
            },
            label: {
              normal: {
                show: true,
                formatter: " ● {b}\n{d}%",
              },
            },
            data: yancaoSocialData.l1Data,
          },
        ],
      },
      l2Config: {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        title: {
          text: "总计",
          top: "43%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 10,
            fontWeight: "100",
          },
          subtext: "206, 262人",
          subtextStyle: {
            color: "#fff",
            fontSize: 15,
            fontWeight: "600",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["25%", "70%"],
            label: {
              normal: {
                show: true,
                formatter: " ● {b}\n{d}%",
              },
            },
            data: yancaoSocialData.l2Data,
          },
        ],
      },

      m2Config: {
        xAxis: {
          name: "",
          data: yancaoSocialData.m2XAxisData,
        },
        yAxis: [
          {
            min: -10,
            max: 30,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        legend: {
          data: ["2021年", "2022年"],
        },
        series: [
          {
            name: "2021年",
            type: "line",
            smooth: false,
            data: yancaoSocialData.m2SeriesData1,
          },
          {
            name: "2022年",
            type: "line",
            smooth: false,
            data: yancaoSocialData.m2SeriesData2,
          },
        ],
      },

      r1DataIndex: 0,
      r1Config: {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}%",
        },
        title: {
          top: "44%",
          left: "center",
          subtext: yancaoSocialData.r1Title[0],
          subtextStyle: {
            color: "#fff",
            fontSize: 22,
            fontWeight: "600",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["25%", "70%"],
            roseType: true,
            label: {
              normal: {
                show: true,
                formatter: " ● {b}\n{c}%",
              },
            },
            data: yancaoSocialData.r1Data[0],
          },
        ],
      },

      r2Config: {
        xAxis: {
          name: "",
          data: yancaoSocialData.r2XAxisData,
        },
        yAxis: [
          {
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        legend: {
          data: ["6普", "7普"],
        },
        series: [
          {
            name: "6普",
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: yancaoSocialData.r2SeriesData1,
          },
          {
            name: "7普",
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: yancaoSocialData.r2SeriesData2,
          },
        ],
      },
    };
  },
  mounted() {
    this.r1Change();

    this.timeFn();
    this.cancelLoading();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    r1Change() {
      setInterval(() => {
        if (this.r1DataIndex < yancaoSocialData.r1Data.length) {
          this.r1DataIndex += 1;
        }
        if (this.r1DataIndex == yancaoSocialData.r1Data.length) {
          this.r1DataIndex = 0;
        }
        this.r1Config.series[0].data =
          yancaoSocialData.r1Data[this.r1DataIndex];
        this.r1Config.title.subtext =
          yancaoSocialData.r1Title[this.r1DataIndex];
      }, 5000);
    },

    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
#index {
/*  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;*/



  position: absolute;
  top: 50%;
  left: 50%;
 // transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
margin: 20px;
  .host-body {
    // 第二行
    .yancao-social {
      color: white;
      display: flex;
      justify-content: space-between;
      .lefts {
        width: 500px;
        .lefts-1 {
          margin: 20px 0;
          padding: 20px 20px;
          height: 450px;
        }
        .lefts-2 {
          margin: 20px 0;
          padding: 20px 20px;
          height: 450px;
        }
      }

      .mids {
        flex: auto;
        margin: auto;
        text-align: center;
        .mids-1 {
          margin-bottom: 100px;
        }
        .mids-2 {
        }
      }
      .rights {
        width: 500px;
        .rights-1 {
          margin: 20px 0;
          padding: 20px 20px;
          height: 450px;
        }
        .rights-2 {
          margin: 20px 0;
          padding: 20px 20px;
          height: 450px;
        }
      }

    }
    .titleText{
      text-align: left;
      font-size: large;
      margin: 0 0 20px 50px;
    }
  }
}
</style>
