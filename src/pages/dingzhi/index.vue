<template>
  <div class="dingzhi">

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
        :src="banner.dingzhi"
        :mode="mode"
      ></image>
      <div class="title">{{title}}</div>
    </div>

    <!-- 我们能为您做什么 -->
    <div class="uni-row group cando">
      <div class="title-cn">{{cando.title}}</div>
      <div class="title-en">{{cando.subhead}}</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in cando.cando"
          :key="index"
        >
          <div class="bg">
            <image
              class="itemIcon"
              :mode="mode"
              :src="item.image"
              lazy-load
            ></image>
            <div class="right">
              <div class="itemTitle">{{item.title}}</div>
              <div class="itemDesc">{{item.miaoshu}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 我们的优势 -->
    <div class="group youshi">
      <div class="title-cn">{{youshi.title}}</div>
      <div class="title-en">{{youshi.subhead}}</div>
      <div class="list uni-row uni-flex">
        <div
          class="item uni-flex-item"
          v-for="(item,index) in youshi.youshi"
          :key="index"
        >
          <div class="bg">
            <div class="circle"></div>
            <div class="num">{{item.num}}</div>
            <div class="itemTitle">{{item.title}}</div>
            <div class="itemDesc">
              <wxParse :content="item.miaoshu" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 定制服务流程 -->
    <div class="group process">
      <div class="title-cn">{{process.title}}</div>
      <div class="title-en">{{process.subhead}}</div>
      <div class="bg">
        <image
          class="itemIcon"
          :mode="mode"
          :src="process.dzt"
          lazy-load
        ></image>
      </div>
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
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      cando: {},
      youshi: {},
      process: {}
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    headerbox,
    footerbox,
    wxParse
  },
  methods: {
    prefixInteger: function(num, length) {
      return (Array(length).join("0") + num).slice(-length);
    },
    getData() {
      // console.log("cid " + this.action);
      // console.log("nowPage " + this.nowPage);
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=customizeapi",
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
            this.cando = dt.cando;
            this.youshi = dt.youshi;
            this.process = dt.process;
          }
          this.show = true;
          uni.setNavigationBarTitle({
            title: this.title
          });

          for (let i = 0; i < this.youshi.youshi.length; i++) {
            this.youshi.youshi[i].num = this.prefixInteger(i + 1, 2);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.dingzhi {
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
  .cando {
    .list {
      padding: 7.5px;
      box-sizing: border-box;
      .item {
        margin-top: 15px;
        padding: 7.5px;
        display: inline-block;
        box-sizing: border-box;
        width: 50%;
        text-align: center;
        position: relative;

        .itemIcon {
          width: 100px;
        }
        .itemTitle {
          color: #444;
        }
        .itemDesc {
          color: #999;
          font-size: 13px;
        }
      }
    }
  }
  .youshi {
    .list {
      padding: 7.5px;
      box-sizing: border-box;
      flex-wrap: wrap;
      .item {
        padding: 7.5px;
        display: inline-block;
        box-sizing: border-box;
        flex: 50%;
        .bg {
          //   background: red;
          box-shadow: rgba($color: #000000, $alpha: 0.1) 1px 1px 15px;
          padding: 10px;
          box-sizing: border-box;
          min-height: 270px;
          position: relative;
          .circle {
            z-index: -1;
            position: absolute;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            display: inline-block;
            top: 27px;
            left: 10px;
            background: #d3efff;
          }
          .num {
            font-size: 40px;
            color: #108bec;
            padding-left: 10px;
          }
          .itemTitle {
          }
          .itemDesc {
            color: #999;
          }
        }
      }
    }
  }
  .process {
    margin-bottom: 40px;
    .bg {
      text-align: center;
      .itemIcon {
        width: 80%;
      }
    }
  }
}
</style>
