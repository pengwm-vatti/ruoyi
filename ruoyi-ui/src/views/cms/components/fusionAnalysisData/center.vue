<template>
  <div id="center">
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
        <div>
          <dv-digital-flop
            class="dv-dig-flop ml-1 mt-2 pl-3"
            :config="item.number"
          />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1 pl-3">top10累计销售</span>
        <dv-scroll-ranking-board class="dv-scr-rank-board mt-1" :config="ranking" />
      </div>
<!--      <div class="percent">-->
<!--        <div class="item bg-color-black">-->
<!--          <span>今日任务通过率</span>-->
<!--          <CenterChart-->
<!--            :id="rate[0].id"-->
<!--            :tips="rate[0].tips"-->
<!--            :colorObj="rate[0].colorData"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="item bg-color-black">-->
<!--          <span>今日任务达标率</span>-->
<!--          <CenterChart-->
<!--            :id="rate[1].id"-->
<!--            :tips="rate[1].tips"-->
<!--            :colorObj="rate[1].colorData"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="water">-->
<!--          <dv-water-level-pond class="dv-wa-le-po" :config="water" />-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import CenterChart from '../../../../components/echart/center/centerChartRate'

export default {
  data() {
    return {
      titleItem: [
        {
          title: ' ',
          number: {
            number: [5624407.4],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: ' ',
          number: {
            number: [120],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: ' ',
          number: {
            number: [2],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: ' ',
          number: {
            number: [410],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: ' ',
          number: {
            number: [106],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: ' ',
          number: {
            number: [100],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        }
      ],
      ranking: {
        data: [
          {"name": "河源市源城区鸿利食品商行", "value": 5624407.4},
          {"name": "和平县怡和天叶商行", "value": 4126932.56},
          {"name": "紫金县龙窝镇家有便利店", "value": 2679490.52},
          {"name": "河源市源城区金金食品商行", "value": 1704643},
          {"name": "紫金县蓝塘镇秋平副食店", "value": 1301967.1},
          {"name": "河源市源城区帝豪酒庄", "value": 1139810.2},
          {"name": "紫金县义容镇鸿基副食批发部", "value": 1087498.48},
          {"name": "河源市源城区敬城食品商行", "value": 1002357.64},
          {"name": "紫金县城宏发商店", "value": 910639.14}
        ],
        carousel: 'single',
        unit: '元'
      },
      water: {
        data: [24, 45],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 3
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: 'centerRate1',
          tips: 60,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: 40,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad'
              }
            }
          }
        }
      ]
    }
  },
  components: {
    CenterChart
  }
}
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 32%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 100%;
      .dv-scr-rank-board {
        height: 225px;
      }
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>
