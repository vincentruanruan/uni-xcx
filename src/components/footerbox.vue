<template>

  <view class='footer-box'>
    <view class='btnsList'>

      <view
        v-for="(item,index) in footer.menu"
        class='item'
        :key="index"
        :data-do="item.do"
        @click="navTo"
      >{{item.title}}</view>

    </view>

    <view class='info'>
      <view class='item'>
        <AtIcon
          class='icon'
          value='phone'
          size='15'
          color='#9a9ca6'
        ></AtIcon> TEL: {{footer.tel}}
      </view>
      <view class='item'>
        <AtIcon
          class='icon'
          value='mail'
          size='15'
          color='#9a9ca6'
        ></AtIcon> E-mail: {{footer.email}}
      </view>
      <view class='item'>
        <AtIcon
          class='icon'
          value='map-pin'
          size='15'
          color='#9a9ca6'
        ></AtIcon> Add: {{footer.site}}
      </view>
      <view class='item cop'>
        <Text class='tx'>{{footer.copyright.copyright}}</Text>
        <Text class='tx'>{{footer.copyright.records}}</Text>
      </view>
    </view>

    <view class='qrcode'>
      <image
        class="icon"
        src='http://hidsy.maimaitoo.com/attachment/images/1/2018/12/FkZfff1CKzHr3C0577PKP79H5GFk0U.jpg'
        :mode="mode"
        lazyLoad='true'
      />
      <view>扫一扫 关注我</view>
    </view>
  </view>

</template>


<script>
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue";
export default {
  props: {
    footer: Object
  },
  data() {
    return {
      mode: "widthFix"
    };
  },
  methods: {
    navTo(e) {
      let goto = e.currentTarget.dataset.do;
      let pages = getCurrentPages();
      this.$store.commit("navGoto", {
        goto: goto,
        pages: pages
      });
    }
  }
};
</script>

<style lang="scss">
// 底部
.footer-box {
  background: #363a43;
  color: #9a9ca6;
  padding: 30px 15px;
  .btnsList {
    margin-bottom: 15px;
    .item {
      display: inline-block;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .info {
    text-align: center;
    background: #363a43 !important;
    .item {
      display: inline-block;
      margin: 3px 5px;
      font-size: 12px;
      .icon {
        margin-right: 5px;
      }
    }
    .item.cop {
      display: block;
      .tx {
        margin: 0 10px;
      }
    }
  }

  .qrcode {
    margin-top: 10px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    .icon {
      width: 30%;
      margin-bottom: 10px;
    }
  }
}
</style>