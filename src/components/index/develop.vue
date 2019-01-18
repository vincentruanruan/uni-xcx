<template>
  <view class='index-group develop-group' v-if="!develop"></view>
  <view class='index-group develop-group' v-else>
    <view class='title'>
      <view class='dot'></view>{{develop.titlekflc}}
    </view>
    <view class="bgBlue"></view>
    <view
      class="uni-flex uni-row develop"
      style="flex-wrap: wrap;"
    >
      <view
        v-for="(item,index) in develop.developments"
        :key="index"
        class="item"
      >
        <view class="bg">
          <image
            class="itemIcon"
            :mode="mode"
            :src="item.image"
            lazy-load
          ></image>
          <view class="itemTitle">{{item.title}}</view>
          <view class="itemDesc">{{item.miaoshu}}</view>
          <view class="itemDot"></view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  props: {
    develop: Object
  },
  data() {
    return {
      mode: "widthFix"
    };
  },
  mounted() {}
};
</script>



<style lang="scss" scoped>
// 服务
.index-group.develop-group {
  padding: 7.5px;
  .title {
    margin-bottom: 1rem;
    z-index: 1;
    color: #fff;
    .dot {
      background: #fff;
    }
  }
  .bgBlue {
    top: 0;
    left: 0;
    position: absolute;
    background: #2596e9;
    height: 14rem;
    display: block;
    width: 100%;
    z-index: 0;
  }
  .develop {
    margin-top: 30px;

    .item {
      width: 100%;
      padding: 7.5px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .bg {
        background: #fff;
        position: relative;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 15px;
        padding: 30px 0;

        .itemIcon {
          width: 80px;
        }

        .itemTitle {
          font-size: 18px;
          // margin-bottom: 10px;
        }

        .itemDesc {
          font-size: 14px;
          color: #999;
        }

        .itemDot {
          width: 40px;
          height: 3px;
          background: #ffc600;
          line-height: 0;
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -20px;
        }
      }
    }
  }
}
</style>