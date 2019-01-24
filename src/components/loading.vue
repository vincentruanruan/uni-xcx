<template>
  <div class="loading">
    <div class="item">
      <image
        class="loadingImage"
        :mode="mode"
        :src="loadingImage"
        lazy-load
      ></image>
      <!-- <div class="tip">
        加载中
      </div> -->
    </div>
  </div>

</template>


<script>
export default {
  props: {},
  data() {
    return {
      mode: "widthFix",
      loadingImage: "../../static/cutting.png"
    };
  },
  methods: {}
};
</script>


<style lang="scss">
.loading {
  background: #f0f0f0;
  height: 100%;
  width: 100%;
  position: absolute;
  text-align: center;
  .item {
    display: inline-block;
    margin: 0 auto;
    margin-top: 30%;
    vertical-align: middle;
    .loadingImage {
      width: 120px;
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
