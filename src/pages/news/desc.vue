<template>
  <div class="desc">

    <transition
      :enter-active-class="$store.state.enterActice"
      :leave-active-class="$store.state.leaveActice"
    >
      <load v-if="show==0" />
      <div v-if="show==1">
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
            :src="banner.news"
            :mode="mode"
          ></image>
        </div>

        <!-- 按钮组 -->
        <div class="btn-group">
          <div
            :class="action == item.id?'item action':'item'"
            v-for="(item,index) in categorts"
            :key="index"
            :data-id="item.id"
            @click="changeActon"
          >
            {{item.categoryname}}
          </div>
        </div>

        <!-- info -->
        <div class="info">
          <div class="title">{{info.title}}</div>
          <div class="addtime">{{info.addtime}}</div>
          <div class="content">
            <wxParse :content="info.content" />
          </div>
        </div>

        <!-- newstj -->
        <div class="newstj">
          <div class="title">
            推荐新闻
          </div>
          <div class="list">
            <div
              class="item"
              v-for="(item,index) in newstj"
              :key="index"
              :data-id="item.id"
            >
              <div class="dot">·</div>
              <text
                @click="changeId"
                :data-id="item.id"
              >{{item.title}}</text>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <footerbox :footer="footer" />
      </div>
      <cutting
        :rs="getData"
        v-if="show==2"
      />
    </transition>

  </div>
</template>
    
<script>
import cutting from "../../components/cutting";
import load from "../../components/load";
import headerbox from "../../components/headerbox";
import footerbox from "../../components/footerbox";
import wxParse from "mpvue-wxparse";

export default {
  data() {
    return {
      // 页面需要的参数
      mode: "widthFix",
      show: 0,
      id: 0,
      action: 0,
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      categorts: {},
      info: {},
      newstj: {}
    };
  },
  onLoad(option) {
    this.id = option.id;
    // this.id = 21;
    this.getData();
  },
  components: {
    load,
    cutting,
    headerbox,
    footerbox,
    wxParse
  },
  methods: {
    changeActon(e) {
      let pages = getCurrentPages();
      let nowRoute = pages[pages.length - 2].route;
      let id = e.currentTarget.dataset.id;
      this.action = id;
      console.log(nowRoute);
      if (nowRoute == "pages/index/index") {
        this.$ee.fire("gotoindex", {
          url: `/pages/news/index?action=${id}`
        });
        uni.navigateBack({
          delta: 999
        });
      } else {
        this.$ee.fire("gotoindex", { action: id });
        uni.navigateBack({
          delta: 1
        });
      }
    },
    changeId(e) {
      let id = e.currentTarget.dataset.id;
      this.id = id;
      this.getData();
      console.log(id);
    },
    getData() {
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=newsdetailapi",
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
            this.categorts = dt.categorts;
            this.info = dt.info;
            this.newstj = dt.newstj;
            this.show = 1;
            uni.setNavigationBarTitle({
              title: this.title
            });
            uni.pageScrollTo({
              scrollTop: 0,
              duration: 300
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
.desc {
  .banner {
    .bg {
      width: 100%;
    }
  }
  .btn-group {
    padding: 3px 15px;
    .item {
      padding: 3px 0px;
      margin: 0 5px;
      //   margin-right: 5px;
      font-size: 15px;
      display: inline-block;
      border-bottom: #fff 1px solid;
    }
    .action {
      border-bottom: rgb(64, 158, 255) 1px solid;
    }
  }
  .info {
    padding: 0 15px;
    .title {
      font-size: 22px;
      color: #444;
      font-weight: bold;
      margin-top: 15px;
    }
    .addtime {
      font-size: 14px;
      color: #999;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .content {
      padding: 15px 0;
      width: 100% !important;
    }
  }
  .newstj {
    padding: 15px;
    .title {
      padding: 5px 0;
      font-weight: bold;
      font-size: 20px;
      color: #555;
    }
    .list {
      padding-left: 15px;
      .item {
        margin: 5px 0;
        position: relative;
        text-indent: 1em;
        .dot {
          display: inline-block;
          font-size: 20px;
          position: absolute;
          top: 0;
          left: -0.8em;
          line-height: 22px;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
