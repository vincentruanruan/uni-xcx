<template>
  <div class="xiaochengxu">

    <!-- 头部 -->
    <headerbox
      :header="header"
      drop="false"
      hasPadding="true"
    />

    <!-- banner -->
    <div class="banner">
      <image
        class="bg"
        :src="banner.xiaochengxu"
        :mode="mode"
      ></image>
      <div class="title">{{title}}</div>
    </div>

    <!-- 列表 xiaochengx -->
    <div class="group group-xiaochengx uni-row">
      <div class="title-cn title">{{xiaochengx.titlexcxrk}}</div>
      <div class="title-en title">{{xiaochengx.titlexcxrken}}</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in xiaochengx.rukous"
          :key="index"
        >
          <div class="bg">
            <image
              class="itemIcon"
              :mode="'scaleToFill'"
              :src="item.image"
              lazy-load
            ></image>
            <div class="right">
              <div class="itemTitle">{{item.title}}</div>
              <div class="itemTitle">{{item.abstract}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 列表 case -->
    <div class="group group-case">
      <div class="title-cn">{{xiaochengx.titlexcxrk}}</div>
      <div class="title-en">{{xiaochengx.titlexcxrken}}</div>
      <div class="list"></div>
    </div>

    <!-- 列表 client -->
    <div class="group group-client">
      <div class="title-cn"></div>
      <div class="title-en"></div>
      <div class="list"></div>
    </div>

    <!-- 底部 -->
    <footerbox :footer="footer" />

  </div>
</template>

<script>
import headerbox from "../../components/headerbox";
import footerbox from "../../components/footerbox";
export default {
  data() {
    return {
      // 页面需要的参数
      mode: "widthFix",
      show: false,
      action: 0,
      nowPage: 1,
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      case: {},
      xiaochengx: {},
      client: {}
    };
  },
  mounted() {
    this.getData();
    this.$ee.on("descback", res => {
      this.action = res.action;
      this.nowPage = 1;
      this.getData();
      // console.log(res)
    });
  },
  components: {
    headerbox,
    footerbox
  },
  methods: {
    getData() {
      // console.log("cid " + this.action);
      // console.log("nowPage " + this.nowPage);
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=xiaochengxuapi",
        data: {},
        method: this.$store.state.baseUrl.method,
        header: this.$store.state.baseUrl.header,
        success: res => {
          console.log(res.data);
          if (res.data.code == 200) {
            let dt = res.data.data;
            console.log(dt);
            this.header = dt.header;
            this.footer = dt.footer;
            this.title = dt.title;
            this.banner = dt.banner;
            this.xiaochengx = dt.xiaochengx;
            this.case = dt.case;
            this.client = dt.client;
          }
          this.show = true;
          uni.setNavigationBarTitle({
            title: this.title
          });
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 300
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.xiaochengxu {
  .banner {
    position: relative;
    .bg {
      width: 100%;
    }
    .title {
      position: absolute;
      left: 20px;
      top: 30%;
      font-size: 20px;
      color: #fff;
    }
  }
  .group {
    margin-top: 20px;
    text-align: center;
    .title-cn {
      font-size: 23px;
      color: #333;
      //   font-weight: bold;
    }
    .title-en {
      //   font-weight: bold;
      color: #999;
      font-size: 15px;
    }
    .list {
      margin-top: 20px;
    }
  }
  .group-xiaochengx {
    background: yellow;

    .list {
      text-align: left;
      padding: 7.5px;
      .item {
        display: inline-block;
        box-sizing: border-box;
        padding: 7.5px;
        width: 50%;
        .bg {
          background: #fff;
          padding: 10px;
          position: relative;
          .itemIcon {
            height: 40px;
            width: 40px;
            border-radius: 50%;
          }
          .right {
            position: absolute;
            top: 0;
            padding-left: 50px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
