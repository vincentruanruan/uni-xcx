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
              <div class="itemDesc">{{item.abstract}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表 case -->
    <div
      class="group group-case"
      v-if="show"
    >
      <div class="title-cn">{{cases.titlebfanzs}}</div>
      <div class="title-en">{{cases.titlebfanzsen}}</div>
      <div class="btnList">
        <div
          :class="item.id==action?'btn action':'btn'"
          v-for="(item,index) in cases.casemenu"
          :key="index"
          :data-id="item.id"
          @click="changeAction"
        >{{item.categoryname}}</div>
      </div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in cases.list[action].cases"
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表 client -->
    <div class="group group-client">
      <div class="title-cn">{{client.titlesykh}}</div>
      <div class="title-en">{{client.titlesykhen}}</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in client.client"
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
            </div>
          </div>
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
      cases: {},
      xiaochengx: {},
      client: {}
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
    changeAction(e) {
      let id = e.currentTarget.dataset.id;
      // console.log(id);
      this.action = id;
    },
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
            this.cases = dt.case;
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
    padding-top: 20px;
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
  .group-xiaochengx {
    background: #f9f9f9;
    padding-bottom: 30px;
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
          height: 60px;
          box-sizing: border-box;
          border-radius: 30px;
          box-shadow: rgba($color: #000, $alpha: 0.1) 1px 1px 5px;
          overflow: hidden;
          .itemIcon {
            height: 40px;
            width: 40px;
            border-radius: 50%;
          }
          .right {
            position: absolute;
            top: 5px;
            padding-left: 50px;
            padding-right: 10px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .itemDesc {
            color: #999;
          }
        }
      }
    }
  }
  .group-case {
    .btnList {
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
      padding: 10px;

      .btn {
        display: inline-block;
        border: 1px solid #eaeaea;
        color: #999;
        margin: 8px 5px;
        display: inline-block;
        padding: 3px 10px;
        font-size: 14px;
        border-radius: 0.9rem;
      }

      .btn.action {
        background: #108bec;
        border: 1px #108bec solid;
        color: #fff;
      }
    }
    .list {
      padding: 7.5px;
      box-sizing: border-box;
      .item {
        padding: 7.5px;
        width: 50%;
        display: inline-block;
        box-sizing: border-box;
        padding-bottom: 15px;
        text-align: center;
        .itemIcon {
          width: 100%;
          border-radius: 5px;
        }
      }
    }
  }
  .group-client {
    .list {
      padding: 7.5px;
      box-sizing: border-box;
      .item {
        padding: 7.5px;
        width: 25%;
        display: inline-block;
        box-sizing: border-box;
        padding-bottom: 15px;
        text-align: center;
        .itemIcon {
          width: 100%;
          border-radius: 5px;
        }
        .itemTitle {
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
</style>
