<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('views')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-reading card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总阅读量
          </div>
          <count-to :start-val="0" :end-val="views" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('blog')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-document card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            文章总数
          </div>
          <count-to :start-val="0" :end-val="blog" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('comment')">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-chat-dot-square card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            评论总数
          </div>
          <count-to :start-val="0" :end-val="comment" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('message')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-message card-panel-icon"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            留言总数
          </div>
          <count-to :start-val="0" :end-val="message" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {
    total,
  } from "@/api/cms/charts";
export default {
  components: {
    CountTo
  },
  data() {
    return{
      views: 0,
      blog: 0,
      comment: 0,
      message: 0,
    }
  },
  created() {
    this.getTotal();
  },
  methods: {
    getTotal(){
      total().then(response => {
        console.log(response)
        this.views = response.views;
        this.blog = response.blog;
        this.comment = response.comment;
        this.message = response.message;
      });
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
