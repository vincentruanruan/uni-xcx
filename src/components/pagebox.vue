<template>
  <div class="page-box">

    <div class="pageNum">{{current}} / {{total}}</div>

    <button
      type="default"
      class="left"
      v-if="current>1"
      @click="prev"
    >上一页</button>
    <button
      type="default"
      class="left"
      disabled="true"
      v-if="current==1"
    >上一页</button>

    <button
      type="default"
      class="right"
      v-if="current<total"
      @click="next"
    >下一页</button>
    <button
      type="default"
      class="right"
      disabled="true"
      v-if="current==total"
    >下一页</button>
  </div>
</template>


<script>
export default {
  props: {
    total: {
      default: 1
    },
    current: {
      default: 1
    },
    change: Object
  },
  methods: {
    prev() {
      let data = { current: this.current - 1 };
      this.change(data);
    },
    next() {
      let data = { current: this.current + 1 };
      this.change(data);
    }
  }
};
</script>

<style lang="scss">
.page-box {
  position: relative;
  overflow: hidden;
  padding: 15px;
  .pageNum {
    position: absolute;
    text-align: center;
    left: 0;
    top: 0;
    line-height: 65px;
    width: 100%;
  }
  button {
    display: inline-block;
    font-size: 14px;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
</style>