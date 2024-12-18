<template xmlns="">
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">抓拍数据</span>
          <div style="font-size: large;"></div>
          <dv-decoration-1 class="dv-dec-1"/>
        </div>
      </div>
      <div class="d-flex jc-center">
        <Echart
            :options="options"
            height="480px"

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
      options: {
          series: {
          type: 'sankey',
          layout:'none',
          label:{
            formatter:"{b}-{c}",
            color: '#fff'
          },
          focusNodeAdjacency: 'allEdges',
          data: [{
            name: '抓拍人次',
            value:2877
          }, {
            name: '顾客抓拍人次',
            value:2794

          }, {
            name: '顾客抓拍人数',
            value:2248
          }, {
            name: '男',
            value:994
          }, {
            name: '女',
            value:989
          }, {
            name:"男性儿童",
            value:280
          },{
            name:"男性成人",
            value:714
          }, {
            name:"女性儿童",
            value:198
          },{
            name:"女性成人",
            value:791
          }, {
            name: '未知',
            value:265
          },{
            name: '重复抓拍',
            value:546
          }, {
            name: '店员抓拍人次',
            value:65
          }, {
            name: '外卖抓拍人次',
            value:18
          }],
          links: [{
            source: '抓拍人次',
            target: '顾客抓拍人次',
            value: 2794
          }, {
            source: '抓拍人次',
            target: '店员抓拍人次',
            value: 65
          }, {
            source: '抓拍人次',
            target: '外卖抓拍人次',
            value: 18
          }, {
            source: '顾客抓拍人次',
            target: '顾客抓拍人数',
            value: 2248
          }, {
            source: '顾客抓拍人次',
            target: '重复抓拍',
            value: 546
          }, {
            source: '顾客抓拍人数',
            target: '男',
            value: 994
          }, {
            source: '顾客抓拍人数',
            target: '女',
            value: 989
          }, {
            source: '顾客抓拍人数',
            target: '未知',
            value: 258
          }, {
            source: '男',
            target: '男性儿童',
            value: 280
          }, {
            source: '男',
            target: '男性成人',
            value: 714
          }, {
            source: '女',
            target: '女性儿童',
            value: 198
          }, {
            source: '女',
            target: '女性成人',
            value: 791
          }]
        }
      }
    }
  },
  components: {
    Echart
  },
  created() {
    /*this.options = {
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
        data: ["高中","中专","大专","本科","研究生","其他"],//res.data.map(item => item.label),
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
          data: [{value: 20, name: "高中"},
                 {value: 15, name: "中专"},
                 {value: 30, name: "大专"},
                 {value: 10, name: "研究生"},
                 {value: 50, name: "其他"}]
          //     res.data.map(item => {
          //   return { value: item.num, name: item.label }
          // })

        }
      ]
    }
    /!*if (1 === 1) {
      return
    }*!/
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

    })*/
  }
};
</script>

<style lang="scss" scoped>
#centerLeft1 {
  $box-width: 100%;
  $box-height: 520px;
  padding: 14px 16px;
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
