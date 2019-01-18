<template>
  <view class="index-group server-group">
    <view class="title">
      <view class="dot"></view>
      {{cases.titleourservice}}
    </view>

    <view v-if="show" class="btnList">
      <text
        v-for="(item,index) in cases.casemenu"
        :key="index"
        :class="casesAction==item.id?'action btn':'btn'"
        :data-id="item.id"
        @click="chageCasesAction"
      >{{item.categoryname}}</text>
    </view>

    <view v-if="show" class="uni-flex uni-row cases" style="flex-wrap: wrap;">
      <view v-for="(item,index) in cases.list[casesAction].cases" :key="index" class="item">
        <view class="bg">
          <image class="itemIcon" :mode="mode" :src="item.image" lazy-load></image>
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
    cases: Object
  },
  data() {
    return {
      show: false,
      casesAction: 0,
      mode: "widthFix"
    };
  },
  methods: {
    chageCasesAction(e) {
      let id = e.currentTarget.dataset.id;
      // console.log(id);
      this.casesAction = id;
    }
  },

  updated() {
    if (this.cases) {
      this.show = true;
    }
  }
};
</script>



<style lang="scss" scoped>

// 服务
.index-group.server-group {
  padding: 7.5px;
  .title {
    margin-bottom: 10px;
  }

  .btnList {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    padding: 10px;

    .btn {
      display: inline-block;
      border: 1px solid #eaeaea;
      color: #999;
      margin: 8px 5px;
      display: inline-block;
      padding: 3px 10px;
      font-size: 14px;
      border-radius: 0.9rem;
    }

    .btn.action {
      background: #108bec;
      border: 1px #108bec solid;
      color: #fff;
    }
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
        width: 100%;
        border-radius: 5px;
      }

      .itemTitle {
        font-size: 14px;
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