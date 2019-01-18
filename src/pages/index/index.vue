<template>
  <view class="index">

    <!-- 案例 -->
    <!-- <cases :cases="cases" /> -->

    <!-- 轮播 -->
    <banner :carouse="carouse" />

    <!-- 服务 -->
    <server :list="list" />

    <!-- 开发 -->
    <develop :develop="developments" />

    <!-- 新闻 -->
    <!-- <news :news="news" /> -->

  </view>
</template>

<script>
import banner from "../../components/index/banner";
import server from "../../components/index/server";
import develop from "../../components/index/develop";
import news from "../../components/index/news";
import cases from "../../components/index/cases";

export default {
  data() {
    return {
      header: {},
      footer: {},
      title: "",
      carouse: [],
      cases: {},
      developments: {},
      list: {},
      news: {}
    };
  },
  components: {
    banner,
    server,
    develop,
    news,
    cases
  },
  onLoad() {
    this.getData();
  },
  mounted() {
    // console.log(this.$store.state.baseUrl);
    
  },

  methods: {
    getData() {
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=indexapi",
        data: {},
        method: "POST",
        success: res => {
          // console.log(res.data);
          if (res.data.code == 200) {
            let dt = res.data.data;
            console.log(dt);
            this.header = dt.header;
            this.footer = dt.footer;
            this.title = dt.title;
            this.carouse = dt.carouse;
            this.cases = dt.cases;
            this.developments = dt.developments;
            this.list = dt.list;
            this.news = dt.news;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
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
