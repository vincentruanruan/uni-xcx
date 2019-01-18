<template>
  <view class='index-group server-group'>
    <view class='title'>
      <view class='dot'></view>{{cases.titleourservice}}
    </view>

    <view class='btnList'>
      <text
        v-for="(item,index) in cases.casemenu"
        :key="index"
        :class='casesAction==item.id?"action btn":"btn"'
        :data-id="item.id"
        @click="chageCasesAction"
      >{{item.categoryname}}</text>
    </view>

    <view
      class="uni-flex uni-row cases"
      style="flex-wrap: wrap;"
    >
      <view
        v-for="(item,index) in cases.casemenu"
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
    cases: Object
  },
  data() {
    return {
      cases: this.cases,
      casesAction: 0,
      mode: "widthFix"
    };
  },
  methods: {
    chageCasesAction(e) {
      let id = e.currentTarget.dataset.id
      // console.log(id);
      this.casesAction = id
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