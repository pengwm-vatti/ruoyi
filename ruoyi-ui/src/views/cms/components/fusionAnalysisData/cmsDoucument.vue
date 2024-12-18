<template>
  <div id="index" ref="appRef">


      <div class="host-body">

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <centerLeft1 :cdata="cdata" />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centerLeft2 />
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <centerRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13>
            <dv-border-box-12>
              <centerLeft3 />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import drawMixin from "../../../../utils/drawMixin";
import { formatTime } from '../../../../utils'
import centerLeft1 from './centerLeft1'
import centerLeft2 from './centerLeft2'
import centerRight1 from './centerRight1'
import centerRight2 from './centerRight2'
import center from './center'
import bottomLeft from './bottomLeft'
/*import bottomRight from './bottomRight'*/
import centerLeft3 from './centerLeft3.vue'

export default {
  mixins: [ drawMixin ],
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#568aea', '#000000'],
      cdata: {}
    }
  },
  components: {
    centerLeft1,
    centerLeft2,
    centerRight1,
    centerRight2,
    center,
    bottomLeft,
    /*bottomRight,*/
    centerLeft3
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
    console.log('process',process.env)
    this.$request.request({
      url: process.env.VUE_APP_BASE_URL_API + '/hyc/bad/hy-education-num',
      method: 'get'
    }).then(res=>{
      console.log("cs:"+res)
      console.log(res.data.map(item => item.label))
      this.cdata = {
        xData: res.data.map(item => item.label),
        seriesData: res.data.map(item => {
          return { value: item.num, name: item.label }
        })
      }
    })
  },
  beforeDestroy () {
    clearInterval(this.timing)
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/index';
</style>
