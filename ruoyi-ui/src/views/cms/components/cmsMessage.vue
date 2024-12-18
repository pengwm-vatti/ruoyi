<template>
  <div id="index" ref="appRef">
      <div class="host-body">


      <!--图片、识别信息-->
      <ModuleImgMes/>
    </div>

  </div>


</template>

<script>
import drawMixin from "../../../utils/drawMixin";
import { formatTime } from "../../../utils";
import ModuleImgMes from './moduleImgMes2.vue';

export default {
  mixins: [drawMixin],
  components: {

    ModuleImgMes,
    //Echart,
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

      l3Flag: [1, 0, 0],
      R1Data: [],
      fatherName:''
    };
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();
    setTimeout(() => {


    }, 2000); // 设置延迟时间，这里是1秒（1000毫秒）
    //this.r1Data = yancaoData.r1Data;
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    yourFunction(){

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
  color: #d3d6dd;
  width: 1920px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
}

</style>
