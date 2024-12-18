<template>
  <el-card>
    <div class="chat-box" ref="chatBox">

      <div>
        <!-- 使用 a 标签进行外部链接跳转 -->

        <a href="https://6fe09bd9.r11.vip.cpolar.cn/" target="_blank">点击跳转推荐大模型</a>
      </div>


      <div v-for="(msg, index) in messages" :key="index" class="message">
        <div v-if="msg.type === 'user'" class="user-message">
          <img :src="avatar" alt="User" class="avatar" />
          <div class="message-content user-message-content">{{ msg.content }}</div>
        </div>
        <div v-if="msg.type === 'bot'" class="bot-message">
          <img :src="avatar_bot" alt="Bot" class="avatar" />
          <div class="message-content bot-message-content">{{ msg.content }}</div>
<!--        <Echart
          :options="options"
            height="500px"
            width="430px"

          ></Echart>-->
          <RankChart :data="rankData"/>
<!--          <line-chart :data="lineData"></line-chart>-->
        </div>
      </div>
    </div>
    <div class="input-area">
      <el-input
        v-model="input"
        placeholder="请输入您的问题..."
        @keyup.enter.native="sendMessage"
        class="input-field"
        :style="{ maxWidth: 'calc(100% - 100px)' }"
      ></el-input>
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </el-card>
</template>
<script>

import Echart from "@/common/echart/index.vue";
import RankChart  from './rankChart.vue';
import lineChart from './chatWindow.vue'

export default {
  components: {
    Echart,
    RankChart,
    lineChart
  },
  data() {
    return {
      rankData: [],
      input: '',
      messages: [],
      avatar: localStorage.getItem('avatar'),
      r3Config: {
      },
    };
  },
  mounted() {


    },
  methods: {
    sendMessage() {
      if (this.input.trim() === '') return;

      this.messages.push({ type: 'user', content: this.input });
      const userInput = this.input;
      this.input = '';

      setTimeout(() => {
        //this.setOptions();
        this.rankData=[
          { name: 'Alice', value: 90 },
          { name: 'Bob', value: 85 },
          { name: 'Charlie', value: 80 },
          { name: 'David', value: 75 },
          { name: 'Boba', value: 100 },
          { name: 'Chadrlie', value: 180 },
          { name: 'Dssavid', value: 715 },
          { name: 'Edsve', value: 702 }
        ];
        this.messages.push({ type: 'bot', content: `
        您说了: ${userInput} \n
        ` });

        this.scrollToBottom();
      }, 500);

      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
      });
    },
    setOptions(){
      this.options ={

        backgroundColor: "#021032",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(9,40,84,0.8)",
          borderColor: "rgba(9,40,84,0.8)",
          textStyle: {
            fontSize: 16,
            color: "#8d3434",
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
              color: "#0b9a67",
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
              color: "#5a0988",
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
      }
    }
  }
};
</script>

<style scoped>
.chat-box {
  height: calc(100vh - 290px);
  overflow-y: auto;
  //padding: 10px;
  border-bottom: 1px solid #2b4fa2;
}
.input-area {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.message {
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.user-message, .bot-message {
  margin-top: 2px;
  display: flex;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  margin-right: 10px;
  width: 50px;
  height: 50px;
}
.input-field {
  flex: 1;
  margin-right: 10px;
  max-width: calc(100% - 100px);
}
.message-content {
  max-width: 100%; /* 确保消息内容框不超过聊天框宽度 */
  background-color: #1a6da8; /* 随意选择背景颜色 */
  border-radius: 5px; /* 圆角 */
  padding: 10px; /* 内边距 */
  overflow-wrap: break-word; /* 使长文本换行 */
  white-space: normal; /* 允许文本在标签内换行 */
  word-wrap: break-word; /* 兼容旧版浏览器 */
}
.user-message-content {
  background-color: #d1e7dd; /* 用户消息的背景颜色 */
}
.bot-message-content {
  background-color: #cfe2ff; /* 机器人消息的背景颜色 */
}
</style>

