<template>
  <div class="chat-input">
    <el-input type="text" v-model="inputText" @keyup.enter="sendMessage"></el-input>
    <el-button @click="sendMessage">Send</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
    };
  },
  methods: {
    sendMessage() {
      this.$emit('message', {id: Date.now(), text: this.inputText});
      this.inputText = '';
    },
  },
}
</script>

<style>
.chat-input {
  margin-top: 10px;
}
</style>
