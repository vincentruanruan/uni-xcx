<template>
  <view
    class='index-group server-group'
    v-if="!list"
  >
  </view>
  <view
    class='index-group server-group'
    v-else
  >
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
            lazy-load
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
  },
  mounted() {}
};
</script>



<style lang="scss" scoped>
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
</style>