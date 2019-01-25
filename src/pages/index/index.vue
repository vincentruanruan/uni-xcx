<template>

  <transition
    style="animation-duration:0.2s !important;"
    :enter-active-class="$store.state.enterActice"
    :leave-active-class="$store.state.leaveActice"
  >
    <load v-if="show==0" />
    <div v-if="show==1">
      <view class="index">

        <!-- 头部 -->
        <headerbox
          :header="header"
          :drop="drop"
        />

        <!-- 轮播 -->
        <banner :carouse="carouse" />

        <!-- 服务 -->
        <server :list="list" />

        <!-- 案例 -->
        <cases :cases="cases" />

        <!-- 开发 -->
        <develop :develop="developments" />

        <!-- 新闻 -->
        <news :news="news" />

        <!-- 底部 -->
        <footerbox :footer="footer" />
      </view>
    </div>
    <cutting
      :rs="getData"
      v-if="show==2"
    />
  </transition>

</template>

<script>
import headerbox from "../../components/headerbox";
import footerbox from "../../components/footerbox";
import cutting from "../../components/cutting";
import load from "../../components/load";
import banner from "../../components/index/banner";
import server from "../../components/index/server";
import develop from "../../components/index/develop";
import news from "../../components/index/news";
import cases from "../../components/index/cases";

export default {
  data() {
    return {
      // 页面需要的参数
      drop: false,
      gotoUrl: "",
      show: 0,
      // 下面是接口参数
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
    load,
    cutting,
    headerbox,
    footerbox,
    banner,
    server,
    develop,
    news,
    cases
  },
  onShow() {
    if (this.gotoUrl) {
      console.log("gotoUrl: " + this.gotoUrl);
      let url = this.gotoUrl;
      this.gotoUrl = "";
      uni.navigateTo({
        url: url
      });
    }
  },
  onLoad() {
    this.getData();
    this.$ee.on("gotoindex", res => {
      // console.log("gotoindex");
      // console.log(res);
      this.gotoUrl = res.url;
    });
  },
  mounted() {
    // console.log(this.$store.state.baseUrl);
  },
  onPageScroll(obj) {
    // console.log(obj); //实时获取到滚动的值
    obj.scrollTop > 30 ? (this.drop = true) : (this.drop = false);
  },
  methods: {
    getData() {
      this.show = 0;
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
            this.show = 1;
            uni.setNavigationBarTitle({
              title: this.title
            });
          } else {
            this.show = 2;
          }
        },
        fail: err => {
          // console.log(err)
          this.show = 2;
        }
      });
    }
  }
};
</script>

<style lang="scss">
headerbox {
  z-index: 99;
}
banner {
  z-index: -1;
}
</style>
