<template>

  <view class='index-group server-group'>
    <view class='title'>
      <view class='dot'></view>{{list.titleourservice}}
    </view>
    <view
      class="uni-flex uni-row list"
      style="flex-wrap: wrap;"
    >
      <view
        v-for="(item,index) in list.server"
        :key="index"
        class="item"
      >
        <view class="bg">
          <image
            class="itemIcon"
            :mode="mode"
            :src="item.image"
          ></image>
          <view class="itemTitle">{{item.title}}</view>
          <view class="itemDesc">{{item.miaoshu}}</view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  props: {
    list: Object
  },
  data() {
    return {
      mode: "widthFix"
    };
  }
};
</script>

  

<style lang="scss">
// 服务
.index-group.server-group {
  padding: 7.5px;
  .title {
    margin-bottom: 1rem;
  }

  .item {
    width: 50%;
    padding: 7.5px;
    box-sizing: border-box;
    .bg {
      // background: red;
      position: relative;
      text-align: center;

      .itemIcon {
        width: 80%;
      }

      .itemTitle {
        font-size: 18px;
        // margin-bottom: 10px;
      }

      .itemDesc {
        font-size: 14px;
        color: #999;
      }
    }
  }
}

// 首页框
.index-group {
  position: relative;
  padding: 7.5px;
  background: #fff;
  .title {
    font-weight: 500;
    display: block;
    width: 80%;
    text-align: center;
    font-size: 24px;
    line-height: 64px;
    border-bottom: 1px #abe0ff solid;
    margin: 0 auto;
    position: relative;
    color: #333;
    margin-bottom: 20px;

    .dot {
      width: 40px;
      height: 3px;
      background: #108bec;
      line-height: 0;
      display: inline-block;
      position: absolute;
      bottom: -1px;
      left: 50%;
      margin-left: -20px;
    }
  }
}
</style>