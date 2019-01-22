<template>
  <view class="contact">

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
        :src="banner"
        :mode="mode"
      ></image>
    </div>

    <!-- 内容 -->
    <div
      class="inner"
      v-if="show"
    >

      <div class="p1">{{contact.company}}</div>
      <div class="p2">{{contact.url}}</div>
      <div class="p3">{{contact.dianhua}}</div>
      <div class="p4">
        <div class="it">Phone: {{contact.shouji}}</div class="it">
        <div class="it">QQ: {{contact.qq}}</div class="it">
      </div>

      <div class="p5">{{contact.email}}</div>
      <div class="p6">{{contact.dizhi}}</div>
      <div class="qrcode">
        <image
          class="icon"
          :src="contact.erweima"
          :mode="mode"
        ></image>
        <div class="title">扫一扫 关注我</div>
      </div>
    </div>

    <!-- 地图 -->
    <view
      class="uni-common-mt"
      v-if="show"
    >
      <view class="mapBg">
        <map
          class="map-box"
          :latitude="latitude"
          :longitude="longitude"
          :markers="covers"
          scale="14"
        >
        </map>
      </view>
    </view>

    <!-- 底部 -->
    <footerbox :footer="footer" />
  </view>
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
      latitude: 39.909,
      longitude: 116.39742,
      covers: [
        {
          latitude: 39.9085,
          longitude: 116.39747,
          iconPath: "../../static/location.png"
        }
      ],
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: "",
      contact: {}
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
          "/web/index.php?c=account&a=welcome&do=contactapi",
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
            this.contact = dt.data;
          }
          let loc = this.contact.ditu.split(",");
          this.covers[0].longitude = loc[0];
          this.covers[0].latitude = loc[1];
          this.longitude = loc[0];
          this.latitude = loc[1];
          this.show = true;
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
.contact {
  .banner {
    .bg {
      width: 100%;
    }
  }
  .inner {
    color: #444;
    padding: 15px;
    .p1 {
      font-size: 24px;
      font-weight: bold;
    }
    .p2 {
      color: rgb(64, 158, 255);
      font-size: 18px;
      margin-bottom: 20px;
    }
    .p3 {
      font-size: 24px;
    }
    .p4 {
      margin-bottom: 20px;
      .it {
        color: #999;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .p5 {
      font-size: 20px;
    }
    .p6 {
      margin-bottom: 20px;
      font-size: 20px;
    }
    .qrcode {
      .icon {
        width: 40%;
      }
      .title {
        font-size: 16px;
        padding-left: 10px;
      }
    }
  }
  .mapBg {
    padding: 0 15px;
    margin-bottom: 30px;
    .map-box {
      width: 100%;
      margin: 0 auto;
      height: 300px;
    }
  }
}
</style>
