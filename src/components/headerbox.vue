<template>
  <view class="header-box">
    <view>
      <view
        class="paddingBox"
        v-if="hasPadding"
      ></view>
      <view
        :class="drop?'floatNav drop':'floatNav'"
        v-if="show"
      >
        <image
          v-if="drop"
          class="logo"
          :src="header.logo[1]"
          :mode="mode"
        ></image>
        <image
          v-else
          class="logo"
          :src="header.logo[0]"
          :mode="mode"
        ></image>
        <uni-icon
          class="navBtn"
          type="bars"
          size="25"
          :color="drop?navColor1:navColor2"
          @click="navbarClick"
        ></uni-icon>
      </view>

      <uni-drawer
        :visible="drawer"
        :mode="modedrawer"
        @close="navbarClick"
      >
        <view style="padding:30upx;">
          <view class="uni-title">导航菜单</view>
          <view class="uni-list uni-common-mt">
            <view
              v-for="(item,index) in header.nav"
              :key="index"
              :data-do="item.do"
              @click="menuClick"
              class="uni-list-cell"
              hover-class="uni-list-cell-hover"
            >
              <view class="uni-list-cell-navigate uni-navigate-right">{{item.title}}</view>
            </view>
          </view>
        </view>
      </uni-drawer>
    </view>
  </view>
</template>


<script>
import uniIcon from "./uni/uni-icon.vue";
import uniDrawer from "./uni/uni-drawer.vue";
export default {
  props: {
    header: Object,
    drop: {
      default: false
    },
    hasPadding: {
      default: false
    }
  },
  data() {
    return {
      show: false,
      mode: "aspectFit",
      navColor1: "#999",
      navColor2: "#fff",
      drawer: false,
      modedrawer: "right"
    };
  },
  components: {
    uniIcon,
    uniDrawer
  },
  updated() {
    if (this.header) {
      this.show = true;
    }
  },
  methods: {
    menuClick(e) {
      let goto = e.currentTarget.dataset.do;
      let pages = getCurrentPages();
      this.$store.commit("navGoto", {
        goto: goto,
        pages: pages
      });
      this.drawer = false;
    },
    navbarClick() {
      this.drawer = !this.drawer;
    }
  }
};
</script>


<style lang="scss">
.header-box {
  .floatNav {
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    // background: red;
    z-index: 9;
    transition: all 0.3s;
    .logo {
      position: relative;
      height: 40px;
      width: 100px;
      top: 10px;
      left: 15px;
    }
    .uni-icon {
      position: absolute;
      top: 17.5px;
      right: 15px;
      font-weight: bold;
    }
  }
  .floatNav.drop {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 5px;
  }
}
.paddingBox {
  widows: 100%;
  height: 59px;
}
</style>
