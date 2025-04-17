<template>

  <div id="index" ref="appRef">

    <div class="host-body">

      <div class="index-yancao">
        <div class="left">

          <dv-border-box-12 class="left-2">
            <div style="font-size: larger;">
              <span>识别销售信息</span>

            </div>

            <!--            <div ref="scrollBoardContainer">
                          <dv-scroll-board :config="l2Config"  @mouseover="mouseover" class="left-2-2"></dv-scroll-board>
                          <div ref="hoverTooltip" class="hover-tooltip">
                            &lt;!&ndash; 显示悬浮的单元格数据 &ndash;&gt;
                            <p>{{ hoverData }}</p>
                          </div>
                        </div>-->
            <div @mousemove="handleMouseLeave">
              <dv-scroll-board :config="l2Config" @mouseover="mouseover" class="left-2-2"></dv-scroll-board>
              <el-popover
                placement="bottom"
                title="商店名称"
                width="200"
                trigger="manual"
                :content="cust_name"
                v-model="visible">
              </el-popover>
            </div>
          </dv-border-box-12>
          <dv-border-box-12 class="left-3">
            <div style="font-size: larger;">销量品类占比</div>
            <div class="left-3-2">
              <Echart
                :options="l3Config"
                height="300px"
                width="500px"
              ></Echart>

            </div>
          </dv-border-box-12>
        </div>
        <div class="mid">
          <!--          <dv-flyline-chart-enhanced-->
          <!--            :config="m1Config"-->
          <!--            style=""-->
          <!--            class="mid-1"-->
          <!--          />-->
          <dv-border-box-12 class="mid-map">
            <MapContainer />
          </dv-border-box-12>

          <dv-border-box-12 class="mid-2">
            <div style="font-size: larger;">销售额统计</div>
            <div class="mid-2-2">
              <Echart
                :options="m2Config"
                height="320px"
                width="520px"
              ></Echart>
              <div class="mid-2-2-right">
                <div style="font-size: xx-large; color: white;">
                  105, 091
                </div>
                <div style="font-size: small;">
                    <span
                      class="icon1"
                      style="background: #db5040; color: #db5040;"
                    >0</span
                    >销量总数
                </div>
                <div style="font-size: xx-large; color: white;">
                  7089
                </div>
                <div style="font-size: small;">
                    <span
                      class="icon1"
                      style="background: #e7c82c; color: #e7c82c;"
                    >0</span
                    >本月新增
                </div>
              </div>
            </div>
          </dv-border-box-12>
        </div>
        <div class="right">
          <dv-border-box-12 class="right-1">
            <div class="flex-container">
              <div
                class="left-aligned"
                style="font-size: larger;">销售TOP</div>
              <div class="right-aligned">
                <el-button type="primary" @click="detailSale">详细销售情况</el-button>
              </div>
            </div>
            <Echart
              :options="r3Config"
              height="500px"
              width="430px"

            ></Echart>


          </dv-border-box-12>

          <dv-border-box-12 class="right-3">
            <div style="font-size: larger;">销售数据对比</div>
            <Echart
              :options="r2Config"
              height="310px"
              width="430px"
              style="margin-top: 20px;"
            ></Echart>

          </dv-border-box-12>

        </div>
      </div>
    </div>

  </div>


</template>

<script>
import drawMixin from "../../../utils/drawMixin";
import Echart from "../../common/echart/index.vue";
import * as yancaoData from "./indexYancao";
import MapContainer from "./MapContainer.vue"
import {convertedData} from "./indexYancao";

var titleName=[];
let information = {
  color: "#069DFD",
  area: ["快捷商品", "国台国标（2016）" , "仙湖茶（礼盒装）500g" , "1L酒", "厚工坊好运连连",
    "国台酒（2017年酿造）", "洋河天之蓝绵柔型52度", "乾尊隆酱香型白酒", "英雄颂"],
  dataArray: [21689, 2455, 2399, 1898, 1428, 1142, 1057, 841, 710,],
};

let style = {
  width: 32,
  height: 24,
  padding: [5, 6, 0, 0],
  fontSize: 20,
  align: "center",
  color: "#ffffff"
}
export default {
  mixins: [drawMixin],
  components: {
    Echart,
    MapContainer
  },
  data() {
    return {
      visible:false,
      cust_name:'',
      tooltipPosition: { x: 0, y: 0 }, // 弹窗位置
      cellData: '', // 存储单元格的所有数据
      hoverData:null,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      decorationColor: ["#568aea", "#000000"],
      cdata: {},

      l3Flag: [1, 0, 0],
      R1Data: [],

      l2Config: {
        headerBGC: "#19191e",
        oddRowBGC: "transparent",
        evenRowBGC: "transparent",
        header: yancaoData.l2Header,
        columnWidth: [120, 260, 80, 80,10],
        rowNum: 9,
        data: yancaoData.l2Data,
      },
      l3Config: {
        color: [
          "#c065e7",
          "#765deb",
          "#3862d8",
          "#6a89e2",
          "#219cf9",
          "#6efbbf",
        ],
        title: {
          text: "销售额",
          top: "42%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 10,
            fontWeight: "100",
          },
          subtext: "15,880元",
          subtextStyle: {
            color: "#fff",
            fontSize: 15,
            fontWeight: "600",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["25%", "80%"],
            roseType: true,
            label: {
              normal: {
                show: true,
                formatter: " ● {b}\n\t\t\t\t{d}%",
                fontSize: 14,
                // color: '#fff'
              },
            },
            // labelLine: {
            //   length: 15,
            //   length2: 40,
            // },
            data: yancaoData.l3Data1,
          },
        ],
      },

      m1Config: {
        points: yancaoData.m1Points,
        lines: yancaoData.m1Lines,
        icon: {
          show: true,
          // src: "/img/flylineChart/mapPoint.png",
        },
        text: {
          show: true,
        },
        k: 0.5,
        bgImgSrc: "./img/map.png",
      },
      m2Config: {
        legend: {},
        tooltip: {},
        xAxis: {
          name: "",
          data: yancaoData.m2XAxisData,
          type: 'category' ,
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: yancaoData.m2SeriesData,
            barCategoryGap: "30%",
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#46eaff" },
                  { offset: 1, color: "#285cdc" },
                ]),
              },
            },
          },
        ],
      },


      r2Config: {
        tooltip: {
          trigger: 'axis',
          backgroundColor:'rgba(255,255,255,0.8)',
          extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
          textStyle:{
            color:'#6a717b',
          },

        },
        xAxis: {
          name: "",
          data: yancaoData.r2XAxisData,
        },
        yAxis: [
          {
            min: 0,
            max: 15000,
            axisLine: {
              show: false,
            },
          },
          {

            axisLine: {
              show: false,
            },
            max: 10000,
            min: 0,
          },
        ],
        legend: {
          data: [
            "易零通销售额",
            "识别销售额",
            "易零通销售数量",
            "识别销售数量",
          ],
        },
        series: [
          {
            name: "易零通销售额",
            type: "bar",
            data: yancaoData.r2SeriesData1,
            barCategoryGap: "70%",
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#0b98f3" },
                  { offset: 1, color: "#010e15" },
                ]),
              },
            },
          },
          {
            name: "识别销售额",
            type: "bar",
            data: yancaoData.r2SeriesData2,
            barCategoryGap: "70%",
            itemStyle: {
              normal: {
                barBorderRadius: 0,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#e9ca25" },
                  { offset: 1, color: "#010e15" },
                ]),
              },
            },
          },
          {
            name: "易零通销售数量",
            type: "line",
            smooth: false,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#2df3e2",
              },
            },
            data: yancaoData.r2SeriesData3,
          },
          {
            name: "识别销售数量",
            type: "line",
            smooth: false,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#885dff",
              },
            },
            data: yancaoData.r2SeriesData4,
          },
        ],
      },
      r3Config: {
        //backgroundColor: "#021032",

        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(9,40,84,0.8)",
          borderColor: "rgba(9,40,84,0.8)",
          textStyle: {
            fontSize: 16,
            color: "#fff",
          },
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            return (
              params[0].name +
              "&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-weight:bold;'>" +
              params[0].value +
              "</span>"
            );
          },
        },
        grid: {
          left: "10%",
          right: "0%",
          top: "2%",
          bottom: "5%", // 特殊
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
            show: false,
          },
        ],
        yAxis: [
          {
            type: "category",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            inverse: true,
            data: information.area,
            axisLabel: {
              color: "#fff",
              // margin: 10,
              formatter: (name, index) => {
                const id = index + 1;
                if (id < 4) {
                  return name;
                } else {
                  return name;
                }
              },

            },
          },
          {
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              color: "#fff",
              fontSize: 16,
              margin: 10,
              formatter: function (value) {
                return value;
              },
            },
            data: information.dataArray,
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: 10, // 柱子宽度
            MaxSize: 0,
            showBackground: true,
            backgroundStyle: {
              color: "rgb(10, 51, 126)",
              borderRadius: 5, //设置背景的圆角
            },
            data: information.dataArray.map((item) => {
              return {
                value: item,
                itemStyle: {
                  borderRadius: 5,
                  color: information.color,
                },
              };
            }),
          },
        ],
      },

    };
  },
  mounted() {

    this.cancelLoading();
    titleName=[];
    this.r1Data = yancaoData.r1Data;
    for(let i in yancaoData.r3Data){
      titleName.push(yancaoData.r3Data[i].name);
    }


  },
  beforeDestroy() {
    clearInterval(this.timing);

  },
  computed: {
    tooltipStyle() {
      return {
        left: this.tooltipPosition.x + 'px',
        top: this.tooltipPosition.y + 'px'
      };
    }
  },
  methods: {

    mouseover(event){
      //console.log(event)
      this.visible=!this.visible;
      this.cust_name=event.row[4];
    },

    handleMouseLeave() {
      // 当鼠标离开单元格时隐藏悬浮窗
      this.visible=!this.visible;

    },
    detailSale(event){
      window.open('https://291b66d1.r11.vip.cpolar.cn/', '_blank');
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);

    },

    changeDataR4(event) {
      let tmp = Object.assign({}, this.r4Config2);
      switch (event.rowIndex) {
        case 0:
          tmp.data = yancaoData.r4Data2;
          break;
        case 1:
          tmp.data = yancaoData.r4Data22;
          break;
        case 2:
          tmp.data = yancaoData.r4Data23;
          break;
        case 3:
          tmp.data = yancaoData.r4Data24;
          break;
      }
      this.r4Config2 = tmp;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-popover {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
}
.hover-tooltip {
  background-color: #0077FF;
  position: absolute;
  left: 3px;
  top: 10px;
  /* 根据需要调整样式 */
}
.flex-container {
  display: flex;
  justify-content: space-between;
}

.left-aligned {
  font-size: larger;
}

.right-aligned {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .flex-container {
    flex-direction: column;
  }
}
#index {


  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;



  .host-body {
    // 第二行

    .index-yancao {
      color: white;
      font-size: large;
      display: flex;

      .left {
        width: 500px;
        .left-1 {
          height: 120px;
          margin-top: 400px;
          .left-1-1 {
            display: flex;
            justify-content: space-between;
            margin: auto 40px;
            padding-top: 40px;
            span {
              margin-top: 10px;
            }
          }
        }
        .left-2 {
          height: 520px;
          margin-top: 20px;
          padding: 30px 40px;
          .left-2-2 {
            height: 440px;
            margin-top: 20px;
            color: #415aac;
          }
          .left-2-3 {
          }
        }
        .left-3 {
          height: 380px;
          margin-top: 20px;
          padding: 30px 40px;
          .left-3-2 {
            display: flex;
            justify-content: left;
            .left-3-2-right {
              margin: 60px 0;
              padding: 30px 20px;
              background-color: #05092a;
              color: #415aac;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
            }
          }
        }
      }

      .mid {
        flex: auto;
        margin: 0 20px;
        .mid-map {
          // background-image: url('../assets/map.png');
          height: 520px;
          margin-top: 20px;
          padding: 20px 20px;

        }
        .mid-2 {
          height: 380px;
          padding: 30px 40px;
          margin-top: 20px;
          .mid-2-2 {
            display: flex;
            justify-content: left;
            .mid-2-2-right {
              margin: 30px 0;
              padding: 40px 40px;
              background-color: #05092a;
              color: #415aac;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
            }
          }
        }
      }
      .right {
        width: 500px;
        .right-text{
          margin-top: 20px;
        }
        .right-1 {
          height: 520px;
          margin: 20px 0;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          font-size: larger;
          .right-1-2 {
            // margin-top: 20px;
            display: flex;
            // justify-content: left;
            .right-1-2-main {
              //margin-right: 60px;
            }
            div {
              padding: 0 0;
            }
          }
        }
        .right-2 {
          height: 285px;
          margin-top: 20px;
          padding: 30px 40px;
          span {
            margin-right: 10px;
          }
        }
        .right-3 {
          height: 380px;
          margin-top: 20px;
          padding: 30px 40px;
          .right-4-main {
            display: flex;
            justify-content: left;
            height: 260px;
            color: #415aac;
            font-size: smaller;
            .right-4-main-left {
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              margin-right: 30px;
              margin-top: 20px;
            }
            .right-4-main-right {
              display: flex;
              justify-content: left;
              margin-top: 20px;
            }
          }
        }

      }
    }
  }
}

.icon1 {
  display: inline-block;
  border-radius: 50em;
  transform: scale(0.7);
  margin-right: 5px;
}
</style>
