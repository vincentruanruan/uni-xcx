<template>
    <view @click="next"> desc </view>
</template>
    
<script>
import headerbox from "../../components/headerbox";
import footerbox from "../../components/footerbox";
export default {
  data() {
    return {
      // 页面需要的参数
        mode: "widthFix",
        show:false,
      // 下面是接口参数

    };
  },
  mounted() {
    this.getData();
  },
  components: {
    headerbox,
    footerbox
  },
  methods: {
    getData() {
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=newsapi",
        data: {},
        method: "POST",
        success: res => {
          console.log(res.data);
          if (res.data.code == 200) {
            let dt = res.data.list;
            console.log(dt);
            this.header = dt.header;
            this.footer = dt.footer;
            this.title = dt.title;

          }
          this.show = true
          uni.setNavigationBarTitle({
            title: this.title
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
    
</style>
