<template>
  <view class="content">

    <view>
      <text class="title">{{title}}

        <text class="asd">asdasdsa</text>
      </text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style >
/* lang="scss" scoped="" type="text/css" */
.content {
  text-align: center;
  height: 400upx;
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}
.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
