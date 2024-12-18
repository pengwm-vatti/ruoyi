<template>
  <div id="container"  ref="chartsDOM">


  </div>
</template>
<script>
//import Echart from "../../common/echart/index.vue";

import * as echarts from 'echarts';
import * as HYGis from "./gis";

//import GetHeYuanMap from "../../../api/GetHeYuanMap";
import HeYuan from "./HeYuan.json"


export default {


  data() {
    return {
      }
  },
  mounted() {
    // 初始化统计图对象
    var myChart = echarts.init(this.$refs["chartsDOM"]);
    var mapData = [{
      name: '源城区',
      custVlue:246,
      totalAmount:45001919.08,
      //coordinate: [114.696828,23.746255]
    }, {
      name: '紫金县',
      custVlue:456,
      totalAmount:45001919.08,
     // coordinate: [115.184383,23.633744]
    }, {
      name: '龙川县',
      custVlue:5770,
      totalAmount:28757069.55,
    //  coordinate: [115.256415,24.101174]
    }, {
      name: '连平县',
      custVlue:2787,
      totalAmount:19233646.62,
   //   coordinate: [114.495952,24.364227]
    }, {
      name: '东源县',
      custVlue:309,
      totalAmount:32867246.92,
   //   coordinate: [114.742711,23.789093]
    }, {
      name: '和平县',
      custVlue:432,
      totalAmount:26817703.66,
    //  coordinate: [114.941473,24.44318]
    }];
    // 显示 loading 动画
    myChart.showLoading();
    // 再得到数据的基础上，进行地图绘制
   // GetHeYuanMap.then(res => {
      // 得到结果后，关闭动画
      myChart.hideLoading();

    // 注册地图(数据放在axios返回对象的data中哦)
    //echarts.registerMap('HY', res.data);
    echarts.registerMap('HY', HeYuan);


      var option = {
        backgroundColor: "#030528",
        title: {
          text: '河源烟草销售GDP统计图(/元)',
          //color: "#ffffff",
          textStyle: {
            color: "#fff",
            fontFamily: "等线",
            fontSize: 24,
          },
        },
        tooltip: {
          trigger: 'item',
          position: function (point, params, dom, rect, size) {
            var x = 0; // x坐标位置
            var y = 0; // y坐标位置
            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];

            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = pointX + 10;
            } else { // 左边放的下
              x = pointX - boxWidth - 10;
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else { // 上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          },
          show: true,
          enterable: true,
          textStyle: {
            fontSize: 13,
            color: '#fff',
          },
          backgroundColor: 'rgba(0,2,89,0.8)',
          formatter: function (params) {
           // console.log(params)

            var tipHtml = '';
            tipHtml = `
                    <div class="ui-map-img">
                        <div class='ui-maptxt'>${params.name}</div>
                        <div class='ui-mapNum'>总金额:${params.data.totalAmount}</div>
                        <div class='ui-mapNum'>商家数:${params.data.custVlue}</div>
                    </div>
                `
            return tipHtml;
          },
        },
        geo: [{
          map: "HY",
          aspectScale: 1,
          zoom: 0.65,
          layoutCenter: ["50%", "50%"],
          layoutSize: "150%",
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#c0f3fb",
              borderWidth: 1,
              shadowColor: "#8cd3ef",
              shadowOffsetY: 10,
              shadowBlur: 120,
              areaColor: "transparent",
            },
          }
        },
          // 重影
          {
            type: "map",
            map: "HY",
            zlevel: -1,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ["50%", "51%"],
            layoutSize: "150%",
            roam: false,
            silent: true,
            itemStyle: {
              normal: {
                borderWidth: 1,
                // borderColor:"rgba(17, 149, 216,0.6)",
                borderColor: "rgba(58,149,253,0.8)",
                shadowColor: "rgba(172, 122, 255,0.5)",
                shadowOffsetY: 5,
                shadowBlur: 15,
                areaColor: "rgba(5,21,35,0.1)",
              },
            },
          }, {
            type: "map",
            map: "HY",
            zlevel: -2,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ["50%", "52%"],
            layoutSize: "150%",
            roam: false,
            silent: true,
            itemStyle: {
              normal: {
                borderWidth: 1,
                // borderColor: "rgba(57, 132, 188,0.4)",
                borderColor: "rgba(58,149,253,0.6)",
                shadowColor: "rgba(65, 214, 255,1)",
                shadowOffsetY: 5,
                shadowBlur: 15,
                areaColor: "transpercent",
              },
            },
          }, {
            type: "map",
            map: "HY",
            zlevel: -3,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ["50%", "53%"],
            layoutSize: "150%",
            roam: false,
            silent: true,
            itemStyle: {
              normal: {
                borderWidth: 1,
                // borderColor: "rgba(11, 43, 97,0.8)",
                borderColor: "rgba(58,149,253,0.4)",
                shadowColor: "rgba(58,149,253,1)",
                shadowOffsetY: 15,
                shadowBlur: 10,
                areaColor: "transpercent",
              },
            },
          }, {
            type: "map",
            map: "HY",
            zlevel: -4,
            aspectScale: 1,
            zoom: 0.65,
            layoutCenter: ["50%", "54%"],
            layoutSize: "150%",
            roam: false,
            silent: true,
            itemStyle: {
              normal: {
                borderWidth: 5,
                // borderColor: "rgba(11, 43, 97,0.8)",
                borderColor: "rgba(5,9,57,0.8)",
                shadowColor: "rgba(29, 111, 165,0.8)",
                shadowOffsetY: 15,
                shadowBlur: 10,
                areaColor: "rgba(5,21,35,0.1)",
              },
            },
          },
        ],
        series: [{
          name: "河源市数据",
          type: "map",
          map: "HY", // 自定义扩展图表类型
          aspectScale: 1,
          zoom: 0.65, // 缩放
          showLegendSymbol: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "120%"
              },
            },
            emphasis: {
              // show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: {
                type: "linear",
                x: 1200,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: "rgba(3,27,78,0.75)", // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "rgba(58,149,253,0.75)", // 50% 处的颜色
                }, ],
                global: true, // 缺省为 false
              },
              borderColor: "#fff",
              borderWidth: 0.2,
            },
            emphasis: {
              show: false,
              color: "#fff",
              areaColor: "rgba(0,254,233,0.6)",
            },
          },
          layoutCenter: ["50%", "50%"],
          layoutSize: "150%",
          markPoint: {
            symbol: "none",
          },
          data: mapData,
        }, ],
      };
      myChart.setOption(option);
   // })
    myChart.on('click', function(params) {
      //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
      console.log(params)
      // 更新 tooltip 的内容
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // 根据点击的区域返回自定义的提示框内容
            if (params.seriesName === '河源市数据') {
              return `${params.name}<br>总金额: ${params.data.totalAmount}<br>商家数: ${params.data.custVlue}`;
            }
          }
        }
      });
    });
    /*myChart.on('dblclick', function(params) {
      //console.log(params.data.name)
     // console.log(HYGis.gisData[0])
      // 筛选符合条件的数据
      const filteredData = HYGis.gisData.filter(item => item.area_name === params.data.name);
    // 生成新的JSON数组
     // const newJsonArray = JSON.stringify(filteredData, null, 2);
    // 从新的JSON数组随机获取一个数据
      const randomData = filteredData[Math.floor(Math.random() * filteredData.length)];

      //console.log(newJsonArray);
      //console.log(randomData);
      // 更新 tooltip 的内容
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function () {
            // 根据点击的区域返回自定义的提示框内容
           // if (params.seriesName === '河源市数据') {
              return `${params.data.name}<br>商家名称: ${randomData.cust_name}`;
            //}
          }
        }
      });
    });*/
  },
  methods :{
    mouseover(event){
      console.log(event)
    }
  }
}




</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
