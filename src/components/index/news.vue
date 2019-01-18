<template>
  <view class="index-group news-group">
    <view class="title">
      <view class="dot"></view>
      {{news.titlexwzx}}
    </view>
    <view v-if="show" class="uni-flex uni-row news" style="flex-wrap: wrap;">
      <view v-for="(item,index) in news.news" :key="index" class="item">
        <view class="bg uni-flex uni-row">
          <view class="left">
            <view class="month">{{item.month}}</view>
            <view class="year">{{item.year}}</view>
          </view>
          <view class="right">
            <view class="inner">
              <view class="bg">
                <view class="itemTitle">{{item.title}}</view>
                <view class="itemDesc">{{item.abstract}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  props: {
    news: Object
  },
  data() {
    return {
      show:false
    };
  },
  mounted() {},
  updated() {
    if (this.news) {
      this.show = true;
    }
  }
};
</script>



<style lang="scss">
// 服务
.index-group.news-group {
  padding: 7.5px;
  background: #f9f9f9;
  .title {
    margin-bottom: 1rem;
  }

  .item {
    width: 100%;
    padding: 7.5px;
    box-sizing: border-box;
    .bg {
      // background: red;
      position: relative;
      // text-align: center;
      .left {
        // background: red;
        flex: 20%;
        padding-top: 0.3rem;
        padding-right: 0.3rem;
        text-align: right;

        .month {
          font-size: 1rem;
          display: inline-block;
          color: #777;
        }

        .year {
          font-size: 0.8rem;
          color: #999;
        }
      }

      .right {
        // background: yellowgreen;
        flex: 80%;
        .inner {
          padding: 0.3rem;

          .bg {
            // background: red;
            position: relative;
            // text-align: center;

            .itemIcon {
              width: 80%;
            }

            .itemTitle {
              font-size: 1rem;
              margin-bottom: 0.2rem;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }

            .itemDesc {
              font-size: 0.8rem;
              color: #999;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
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