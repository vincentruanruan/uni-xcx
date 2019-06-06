<template>
  <div class="loading">
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
        加载中...
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
      cuttingImage: "/static/loading.png"
    };
  },
  mounted() {},
  methods: {}
};
</script>


<style lang="scss">
@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading {
  background: #fff;
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
      animation: rotating 1.2s linear infinite;
    }
    .tip {
      padding: 0px 15px;
      font-size: 15px;
      color: #999;
    }
  }
}
</style>
