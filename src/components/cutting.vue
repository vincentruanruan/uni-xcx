<template>
  <div class="cutting">
    <div
      class="item"
      @click="restartFun"
    >
      <image
        class="cuttingImage"
        :mode="mode"
        :src="cuttingImage"
        lazy-load
      ></image>
      <div class="tip">
        网络似乎断开链接<br />点击刷新
      </div>
    </div>
  </div>

</template>


<script>
export default {
  props: {
    rs: Object
  },
  data() {
    return {
      mode: "widthFix",
      cuttingImage: "/static/cutting.png"
    };
  },
  methods: {
    restartFun() {
      this.rs();
    }
  }
};
</script>


<style lang="scss">
.cutting {
  background: #f0f0f0;
  height: 100%;
  width: 100%;
  position: absolute;
  text-align: center;
  .item {
    display: inline-block;
    margin: 0 auto;
    margin-top: 50%;
    vertical-align: middle;
    .cuttingImage {
      width: 60px;
      display: inline-block;
    }
    .tip {
      padding: 20px 15px;
      font-size: 15px;
      color: #999;
    }
  }
}
</style>
