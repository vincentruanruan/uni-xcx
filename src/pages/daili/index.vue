<template>
  <div class="daili">

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
            :src="banner.daili"
            :mode="mode"
          ></image>
          <div class="title">{{title}}</div>
        </div>

        <div class="uni-row group market">
          <div class="title-cn">{{market.title}}</div>
          <div class="title-en">{{market.subhead}}</div>
          <div class="desc">
            <wxParse :content="market.content" />
          </div>
        </div>

        <div class="uni-row group gain">
          <div class="title-cn">{{gain.title}}</div>
          <div class="title-en">{{gain.subhead}}</div>
          <div class="list">
            <div class="bg">
              <div
                class="item"
                v-for="(item,index) in gain.gain"
                :key="index"
              >
                <div class="bg">
                  <image
                    class="icon"
                    :src="item.image"
                    :mode="mode"
                  ></image>
                  <div class="right">
                    <div class="title">{{item.title}}</div>
                    <div class="desc">{{item.content}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="uni-row group daili">
          <div class="title-cn">{{daili.title}}</div>
          <div class="title-en">{{daili.subhead}}</div>
          <div class="list">
            <div
              class="item"
              v-for="(item,index) in daili.condition"
              :key="index"
            >
              <uni-badge
                :text="index+1"
                type="purple"
              ></uni-badge>{{item.title}}
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <footerbox
          :footer="footer"
        />

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
import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue";
export default {
  data() {
    return {
      // 页面需要的参数
      mode: "widthFix",
      show: 0,
      action: 0,
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      market: {},
      gain: {},
      daili: {}
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    load,
    cutting,
    headerbox,
    footerbox,
    wxParse,
    uniBadge
  },
  methods: {
    getData() {
      this.show = 0;
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=dailiapi",
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
            this.market = dt.market;
            this.gain = dt.gain;
            this.daili = dt.daili;
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
.daili {
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
    padding-top: 40px;
    .title-cn {
      font-size: 23px;
      color: #333;
      text-align: center;
      //   font-weight: bold;
    }
    .title-en {
      //   font-weight: bold;
      color: #999;
      font-size: 15px;
      text-align: center;
    }
    .list {
      margin-top: 20px;
    }
  }
  .market {
    padding-bottom: 40px;
    .desc {
      padding: 15px 20px;
      text-align: center;
    }
  }
  .gain {
    background: #f9f9f9;
    padding: 7.5px;
    padding-bottom: 40px;
    .item {
      padding: 7.5px;
      .bg {
        box-shadow: rgba($color: #000000, $alpha: 0.1) 1px 1px 10px;
        padding: 15px;
        border-radius: 5px;
        background: #fff;
        position: relative;
        .icon {
          width: 70px;
        }
        .right {
          position: absolute;
          width: 100%;
          padding-left: 100px;
          padding-right: 10px;
          top: 15px;
          left: 0;
          box-sizing: border-box;
          .desc {
            font-size: 13px;
            color: #999;
          }
        }
      }
    }
  }
  .list {
    padding-bottom: 30px;
    .item {
      padding: 0 20px;
      margin: 10px 0;
      .uni-badge {
        margin-right: 8px;
      }
    }
  }
}
</style>
