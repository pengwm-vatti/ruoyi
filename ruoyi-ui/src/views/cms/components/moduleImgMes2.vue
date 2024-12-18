
<template>

  <div class="body-box">
    <!-- 第1行数据 -->
    <div class="content-box">
      <div>
        <dv-border-box-12 style="width:100%;height:580px;">
          <div class="list">
            <div style="font-size: larger;">
              <span>视频列表</span>
            </div>
            <dv-scroll-board :config="config" class="list-1" @click="skipto"  />
          </div>
        </dv-border-box-12>
      </div>
      <div>
        <dv-border-box-12 style="width:100%;height:580px;">
          <div class="course_video">
            <video-player

                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true">
            </video-player>
          </div>
        </dv-border-box-12>
      </div>


    </div>

    <!-- 第2行数据 -->
    <div class="bototm-box">
      <dv-border-box-12 style="width:100%;height:360px;">
<!--        <div class="slide" v-on:mouseover="stop()" v-on:mouseout="move()">
          <div class="slideshow">
            <transition-group tag="ul" name="image">
              <li v-for="(img, index) in imgArray" v-show="index===mark" :key="index">
                <a href="#">
                  <img :src='img' alt="">
                </a>
              </li>
            </transition-group>
          </div>
          <div class="bullet">
      <span v-for="(item, index) in imgArray" :class="{ 'active':index===mark }"
            @click="change(index)" :key="index"></span>
          </div>
        </div>-->
        <div class="container">
          <div class="lunbo" @mouseenter="clear" @mouseleave="run">
            <div class="img">
              <img :src="dataList[currentIndex]" alt="" />
            </div>
            <div class="dooted" v-if="this.dataList.length">
              <ul class="doo" >
                <li
                    v-for="(item, index) in this.dataList"
                    :key="index"
                    :class="{ current: currentIndex == index }"
                    @click="gotoPage(index)"
                ></li>
              </ul>
            </div>
            <div class="right turn" @click="next()">
              <i class="el-icon-arrow-right"></i>
            </div>
            <div class="left turn" @click="up()">
              <i class="el-icon-arrow-left"></i>
            </div>
          </div>

        </div>
      </dv-border-box-12>
      <dv-border-box-12 style="width:100%;height:360px;">
        <div class="list">
          <div style="font-size: larger;">
            <span>识别销售信息</span>
            <div class="sbxx">
              {{ mes }}
            </div>
          </div>
        </div>
      </dv-border-box-12>
    </div>
  </div>

</template>

<script>
import { videoPlayer } from 'vue-video-player';
//import videojs from 'video.js'
import 'vue-video-player/src/custom-theme.css';
// 根据官方文档配置发现没有效果
import 'video.js/dist/video-js.css'


let _this;
export default {
  components: {

    videoPlayer
  },

  data(){
    return{
      config: {
        headerBGC: "#003B51",
        oddRowBGC: "transparent",
        evenRowBGC: "transparent",
        header: ['<span style="color:#37a2da;">时间</span>',
          '<span style="color:#37a2da;">名称</span>',],
        columnWidth: [200, 322],
        align:['left','center'],
        rowNum: 10,
        data: [
          ["20231130", "out1.map4"],
          ["20231130", "out2.map4"],
          ["20231130", "out3.map4"],
          ["20231130", "out4.map4"],
          ["20231130", "out5.map4"],
          ["20231130", "out6.map4"],
          ["20231130", "out7.map4"],
          ["20231130", "out8.map4"],
          ["20231130", "out9.map4"],
          ["20231130", "out10.map4"],
          ["20231130", "out11.map4"],
        ],
      },
      playerOptions: {
        // videojs options
        muted: true,
        aspectRatio: "18:9",
        fluid: true,
        language: 'en',
        playbackRates: [ 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src:require("../../../assets/video/out1.mp4")
        }],
        // poster: "/static/images/author.jpg",
      },
      mes:"光头娃一根葱零食膨化食品葱香番茄味儿时味道休闲8090后怀旧  *  1,薯我一族老牌子袋装辣条干货面制品好想吃空心脆辣条 * 1",
      //timer: null, //定时器
      mark: 0, //比对图片索引的变量

      dataList: [require('../../../assets/img/1-2.png'),
        require('../../../assets/img/1-3.png'),
        require('../../../assets/img/1-4.png'),
        require('../../../assets/img/1-5.png'),
        require('../../../assets/img/1-6.png')
      ],
      currentIndex: 0, // 默认显示图片
      timer: null // 定时器

    }

  },
  created () {
    _this=this
    this.run()
  },
mounted() {

  },
  beforeDestroy() {
    // clearInterval(this.timer);
  },

  methods :{

    skipto(config){
      setInterval(this.autoPlay, 100)
      console.log('config', config)
      console.log('ceil', config.ceil)
      console.log('hang', config.rowIndex)
      if(config.rowIndex==0){
        _this.playerOptions.sources[0].src=require("../../../assets/video/out1.mp4")
        _this.dataList=[require('../../../assets/img/1.png'),
          require('../../../assets/img/2.png'),
          require('../../../assets/img/3.png')
        ]
        _this.mes="光头娃一根葱零食膨化食品葱香番茄味儿时味道休闲8090后怀旧  *  1,薯我一族老牌子袋装辣条干货面制品好想吃空心脆辣条 * 1"
      }
      else if(config.rowIndex==3){
        _this.playerOptions.sources[0].src=require("../../../assets/video/out3.mp4")
        _this.dataList=[require('../../../assets/img/3-1.png'),
          require('../../../assets/img/3-2.png')
        ]
        _this.mes='统一方便面老坛酸菜牛肉面桶装懒人速食品宵夜泡面宿舍充饥桶面*1,正宗津威饮料95ml开胃饮料贵州特产金威儿童乳酸菌饮品*1'
      }else if(config.rowIndex==8){
        _this.playerOptions.sources[0].src=require("../../../assets/video/out8.mp4")
        _this.dataList=[require('../../../assets/img/8-1.png'),
          require('../../../assets/img/8-2.png')
        ]
        _this.mes='可比香麻辣传奇经典怀旧5毛辣条儿童休闲零食麻辣口味小卖部辣棒*1,双仔吃货辣条经典怀旧面筋食品休闲零食学生8090后2根棒*2'
      }else{
        _this.playerOptions.sources[0].src=require("../../../assets/video/out9.mp4")
        _this.dataList=[require('../../../assets/img/9-1.png'),
          require('../../../assets/img/9-2.png'),
          require('../../../assets/img/9-3.png')
        ]
        _this.mes='奥利奥夹心饼干97g原味草莓巧克力多口味休闲零食*1,卷烟-芙蓉王小盒*1'
      }

    },
    //点击小圆圈切换图片
    gotoPage (index) {
      this.currentIndex = index
    },
    //下一张
    next () {
      if (this.currentIndex === this.dataList.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
    //上一张
    up () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.dataList.length - 1
      } else {
        this.currentIndex--
      }
    },
    //清除定时器
    clear () {
      clearInterval(this.timer)
    },
    // 定时器
    run () {
      this.timer = setInterval(() => {
        this.next()
      }, 2000)
    },

    autoPlay () {
      this.mark++;
      if (this.mark === 3) {
        this.mark = 0
      }
    },
    play () {
      this.timer = setInterval(this.autoPlay, 2500)
    },
    change (i) {
      this.mark = i
    },
    stop () {
      clearInterval(this.timer)
    },
    move () {
      this.timer = setInterval(this.autoPlay, 2500)
    }
  },
/*  created () {
    this.play()
  }*/



}


</script>
<style scoped>

ul li {
  float: left;
  width: 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: rgba(11, 78, 166, 0.8);
  font-size: 14px;
}
.container {
  position: relative;
  height: 340px;
  //width: 402px;
  //margin: 0 400px;
  .img {
    margin: 5px 5px;
    height: 340px;
    //width: 98%;
    border: 0px solid gray;
    img {
      margin: 5px 6px;
      height: 100%;
      width: 98%;
      border-radius:20px;
    }
  }
  .dooted {
    position: absolute;
    bottom: -10px;
    right: 0px;
  }
}
.turn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 7px;
  cursor: pointer;
  background-color: rgba(11, 78, 166, 0.8);
}
.right {
  position: absolute;
  top: 160px;
  right: 0;
}
.left {
  position: absolute;
  top: 160px;
  left: 20px;
}
.current {
  color: #a41b1b;
}

/*.slide {

  height: 340px;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.slideshow {
  width: 100%;
  height: 340px;
}
li {
  position: absolute;
}
img {

  margin: 10px 12px;
  height: 340px;
  width: 100%;
}*/
.bar {
  position: absolute;
  width: 100%;
  height: 340px;
  margin: 0 auto;
  z-index: 10;
  text-align: center;
}
.bar span {
  width: 20px;
  height: 5px;
  border: 1px solid;
  background: white;
  display: inline-block;

}
.active {
  background: red !important;
}
.image-enter-active {
  transform: translateX(0);
  transition: all 1.5s ease;
}
.image-leave-active {
  transform: translateX(-100%);
  transition: all 1.5s ease;
}
.image-enter {
  transform: translateX(100%);
}
.image-leave {
  transform: translateX(0);
}
</style>

<style scoped lang="scss">
.body-box {
  margin-top: 16px;
  display: flex;
  flex-direction: column;

  //下方区域的布局
  .content-box {
    display: grid;
    grid-template-columns: 2fr  3fr;
  }

  // 底部数据
  .bototm-box {
    margin-top: 5px;
    display: grid;
    grid-template-columns: 3fr 4fr;
  }
}

.module-box {
  display:flex;
  justify-content: space-between;
  margin:5px;
}
/*.videoImg {

  padding: 10px 20px;
  .videoImg-1 {

    height: 340px;
    color: #5a76e5;
  }
}*/
.list {

  padding: 30px 40px;
  .sbxx {
    margin-top: 20px;
    padding: 50px 50px;
    height: 280px;
    color: #5a76e5;
  }
}
.module-box {
  display:flex;
  justify-content: space-between;
  margin:5px;
}

.list {

  padding: 30px 40px;
  .list-1 {
    margin-top: 20px;
    height: 380px;
    border-radius: 10px;
    color: #5a76e5;
  }
}
.course_video{
  width: 98%;
  // height: auto;
  padding: 20px 20px;
  margin: 0 auto;
  text-align: center;
}
::v-deep video {
  width: 100% !important;
  /* 我的容器高度设置的是100vh-95px，你们根据你们容器高度设置视频高度即可 */
  //height: calc(100vh - 480px) !important;
  /* 消除两边留白 */
  object-fit: fill;
}
</style>
