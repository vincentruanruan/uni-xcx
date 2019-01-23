<template>
  <div class="help">

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
        :src="banner.help"
        :mode="mode"
      ></image>
      <div class="title">{{banner.helptitle}}</div>
      <view class='inputGroup'>
        <input
          class='keyword'
          placeholder="请输入你要查询的内容"
          :value="keyword"
          @confirm="keywordChage"
        />
      </view>
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

    <!-- info -->
    <div class="info">
      <div class="title">{{info.title}}</div>
      <div class="addtime">{{info.addtime}}</div>
      <div class="content">
        <wxParse :content="info.content" />
      </div>
    </div>

    <!-- 列表 -->
    <div class="lists">
      <div class="bg">
        <div
          class="item"
          v-for="(item,index) in lists"
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
              <div class="desc">{{item.abstract}}</div>
            </div>
            <div class="time">{{item.addtime}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-box">

      <button
        type="default"
        class="left"
        v-if="prev.length>0"
      >上一篇：</button>
      <button
        type="default"
        class="left"
        disabled="true"
        v-if="prev.length<=0"
      >上一篇：没有了</button>

      <button
        type="default"
        class="right"
        v-if="next.length>0"
      >下一篇：</button>
      <button
        type="default"
        class="right"
        disabled="true"
        v-if="next.length<=0"
      >下一篇：没有了</button>
    </div>

    <!-- 底部 -->
    <footerbox :footer="footer" />

  </div>
</template>

<script>
import headerbox from "../../components/headerbox";
import footerbox from "../../components/footerbox";
import wxParse from "mpvue-wxparse";
export default {
  data() {
    return {
      // 页面需要的参数
      mode: "widthFix",
      show: false,
      action: 0,

      keyword: "",
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      categorys: {},
      lists: {},
      info: {},
      prev: {},
      next: {}
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.id = 1;
    this.getData();
  },
  components: {
    headerbox,
    footerbox,
    wxParse
  },
  methods: {
    keywordChage(e) {
      // console.log(e.detail.value);
      this.keyword = e.detail.value;
      this.$ee.fire("kwback", { keyword: this.keyword });
      uni.navigateBack({
        delta: 1
      });
    },
    changeActon(e) {
      let id = e.currentTarget.dataset.id;
      this.$ee.fire("acback", { action: id });
      uni.navigateBack({
        delta: 1
      });
    },
    pageChange(data) {
      this.nowPage = data.current;
      this.getData();
    },
    getData() {
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=helpdetailapi",
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
            this.info = dt.info;
            this.prev = dt.prev;
            this.next = dt.next;
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
.help {
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
    .inputGroup {
      position: absolute;
      top: 25px;
      right: 20px;
      border-radius: 3px;
      background: #fff;
      overflow: hidden;
      font-size: 12px;
      padding: 0 10px;
      .keyword {
        line-height: 30px;
        height: 30px;
        width: 140px;
        margin-top: 3px;
        display: inline-block;
        background: #fff;
      }
    }
  }
  .btn-group {
    padding: 3px 0px;
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
    margin-bottom: 20px;
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
      image {
        width: 100% !important;
      }
    }
  }
}
</style>
