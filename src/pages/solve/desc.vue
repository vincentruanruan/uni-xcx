<template>
  <div class="solve">

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
        :src="banner.solve"
        :mode="mode"
        lazy-load
      ></image>
      <div class="title">{{banner.solvetitle}}</div>
    </div>

    <!-- 按钮组 -->
    <div class="btn-group">
      <div
        :class="action == item.id?'item action':'item'"
        v-for="(item,index) in categorys"
        :key="index"
        :data-id="item.id"
        @click="changeActon"
      >
        {{item.categoryname}}
      </div>
    </div>

    <!-- 内容 -->
    <div class="info">
      <div class="header">{{info.title}}</div>
      <div class="time">{{info.addtime}}
        <div class="num">
          <uni-icon
            class="navBtn"
            type="eye"
            size="15"
          ></uni-icon>{{info.count}}
        </div>
      </div>

      <div class="content">
        <wxParse :content="info.content" />
      </div>
    </div>

    <!-- 列表 -->
    <div
      v-if="show"
      class="uni-flex uni-row list"
    >
      <div class="header">相关案例</div>
      <div
        v-for="(item,index) in referrals"
        :key="index"
        class="item"
      >
        <div class="bg">

          <image
            class="itemIcon"
            :mode="mode"
            :src="item.image"
            lazy-load
          ></image>
          <div class="itemTitle">{{item.title}}</div>

        </div>
      </div>
    </div>

    <!-- 底部 -->
    <footerbox :footer="footer" />

  </div>
</template>

<script>
import headerbox from "../../components/headerbox";
import footerbox from "../../components/footerbox";
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
import wxParse from "mpvue-wxparse";
export default {
  data() {
    return {
      // 页面需要的参数
      mode: "widthFix",
      show: false,
      action: 0,
      id: 0,
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      categorys: {},
      referrals: {},
      info: {}
    };
  },
  onLoad(option) {
    this.id = option.id;
    // this.id = 6;
    this.getData();
  },
  components: {
    headerbox,
    footerbox,
    uniIcon,
    wxParse
  },
  methods: {
    changeActon(e) {
      let id = e.currentTarget.dataset.id;
      this.$ee.fire("descback", { action: id });
      uni.navigateBack({
        delta: 1
      });
    },
    getData() {
      // console.log("cid " + this.action);
      // console.log("nowPage " + this.nowPage);
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=solvedetailapi",
        data: {
          id: this.id
        },
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
            this.categorys = dt.categorys;
            this.referrals = dt.referrals;
            this.info = dt.info;
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
.solve {
  background: #f9f9f9;
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
  .btn-group {
    background: #fff;
    padding: 3px 0px;
    .item {
      padding: 3px 0px;
      margin: 0 5px;
      font-size: 15px;
      display: inline-block;
      border-bottom: #fff 1px solid;
    }
    .action {
      border-bottom: rgb(64, 158, 255) 1px solid;
    }
  }
  .list {
    padding: 7.5px;

    flex-wrap: wrap;
    .header {
      font-size: 20px;
      // font-weight: bold;
      padding-left: 5px;
      color: #444;
      display: block;
      width: 100%;
    }
    .item {
      padding: 7.5px;
      box-sizing: border-box;
      width: 50%;
      display: inline-block;
      .bg {
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        padding-bottom: 10px;
        .itemIcon {
          width: 100%;
        }
        .itemTitle {
          color: #333;
          padding: 0px 10px;
          font-size: 13px;
        }
        .itemDesc {
          color: #999;
          padding: 0px 10px;
          font-size: 12px;
        }
      }
    }
  }
  .info {
    background: #fff;
    margin: 20px 0;
    padding: 15px;

    .header {
      font-size: 22px;
      color: #444;
      margin-bottom: 10px;
    }
    .time {
      color: #999;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 10px;
      .num {
        float: right;
        color: #999;
        .uni-icon {
          margin-right: 5px;
        }
      }
    }
    .content {
      padding: 15px 0 20px 0;
    }
  }
}
</style>
