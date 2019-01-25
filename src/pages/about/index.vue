<template>
  <view class="about">

    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
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
            :src="banner.about"
            :mode="mode"
          ></image>
        </div>

        <!-- 简介 -->
        <div class="desc">{{banner.contend}}</div>

        <!-- 内容 团队 -->
        <div class="about-group teams">
          <div class="title-cn">{{teamstitle.title}}</div>
          <div class="title-en">{{teamstitle.subhead}}</div>
          <view
            class="uni-flex uni-row list"
            style="flex-wrap: wrap;"
          >
            <view
              v-for="(item,index) in teams"
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
                <view class="itemTitle">{{item.name}}</view>
                <view class="itemDesc">{{item.zhiwei}}</view>
              </view>
            </view>
          </view>
        </div>

        <!-- 内容 证书 -->
        <div class="about-group carts">
          <div class="title-cn">{{teamstitle.title}}</div>
          <div class="title-en">{{teamstitle.subhead}}</div>
          <view
            class="uni-flex uni-row list"
            style="flex-wrap: wrap;"
          >
            <view
              v-for="(item,index) in teams"
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
                <view class="itemTitle">{{item.name}}</view>
                <view class="itemDesc">{{item.zhiwei}}</view>
              </view>
            </view>
          </view>
        </div>

        <!-- 底部 -->
        <footerbox :footer="footer" />
      </div>
      <cutting
        :rs="getData"
        v-if="show==2"
      />
    </transition>

  </view>
</template>

<script>
import cutting from "../../components/cutting";
import load from "../../components/load";
import headerbox from "../../components/headerbox";
import footerbox from "../../components/footerbox";
export default {
  data() {
    return {
      // 页面需要的参数
      mode: "widthFix",
      show: 0,
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      teamstitle: {},
      teams: {},
      certstitle: {},
      certs: {}
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    load,
    cutting,
    headerbox,
    footerbox
  },
  methods: {
    getData() {
      this.show = 0;
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=aboutapi",
        data: {},
        method: this.$store.state.baseUrl.method,
        header: this.$store.state.baseUrl.header,
        success: res => {
          console.log(res.data);
          if (res.data.code == 200) {
            let dt = res.data.list;
            console.log(dt);
            this.header = dt.header;
            this.footer = dt.footer;
            this.title = dt.title;
            this.banner = dt.banner;
            this.teamstitle = dt.teamstitle;
            this.teams = dt.teams;
            this.certstitle = dt.certstitle;
            this.certs = dt.certs;
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
.about {
  .banner {
    .bg {
      width: 100%;
    }
  }
  .desc {
    padding: 15px;
    text-indent: 2em;
    font-size: 15px;
    color: #999;
  }
  .about-group {
    margin: 20px 0;
    text-align: center;
    .title-cn {
      font-size: 30px;
      color: #333;
    }
    .title-en {
      font-size: 20px;
      color: #999;
    }
    .list {
      padding: 7.5px;
      .item {
        padding: 7.5px;
        box-sizing: border-box;
        width: 50%;

        margin: 10px 0;
        .itemIcon {
          width: 80%;
        }
        .itemTitle {
          margin-top: 10px;
          margin-bottom: 3px;
          color: #333;
        }
        .itemDesc {
          color: #999;
        }
      }
    }
  }
  .about-group.teams {
    .list {
      .item {
        .itemIcon {
          border-radius: 50%;
          box-shadow: rgba(64, 158, 255, 0.2) 1px 1px 20px;
        }
      }
    }
  }
  .about-group.carts {
    .list {
      .item {
        .itemIcon {
          border-radius: 7px;
          box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 20px;
        }
      }
    }
  }
}
</style>
