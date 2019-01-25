<template>
  <div class="solve">
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
            :src="banner.solve"
            :mode="mode"
            lazy-load
          ></image>
          <div class="title">{{title}}</div>
        </div>

        <!-- 按钮组 -->
        <div class="btn-group">
          <div
            :class="action == item.id?'item action':'item'"
            v-for="(item,index) in category.categorys"
            :key="index"
            :data-id="item.id"
            @click="changeActon"
          >
            {{item.categoryname}}
          </div>
        </div>

        <!-- 列表 -->
        <div class="uni-flex uni-row list">
          <div
            v-for="(item,index) in category.list"
            :key="index"
            :data-id="item.id"
            @click="gotoDesc"
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
              <div class="itemDesc">{{item.categoryname}}</div>

            </div>
          </div>
        </div>

        <!-- 分页 -->
        <pagebox
          :change="pageChange"
          :current="nowPage"
          :total="allpage"
        ></pagebox>

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
import pagebox from "../../components/pagebox";
export default {
  data() {
    return {
      // 页面需要的参数
      mode: "widthFix",
      show: 0,
      action: 0,
      nowPage: 1,
      allpage: 1,
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      category: {}
    };
  },
  mounted() {
    this.getData();
    this.$ee.on("descback", res => {
      this.action = res.action;
      this.nowPage = 1;
      this.getData();
      // console.log(res)
    });
  },
  components: {
    load,
    cutting,
    headerbox,
    footerbox,
    pagebox
  },
  methods: {
    gotoDesc(e) {
      let id = e.currentTarget.dataset.id;
      uni.navigateTo({
        url: `desc?id=${id}`
      });
    },
    changeActon(e) {
      let id = e.currentTarget.dataset.id;
      this.action = id;
      this.nowPage = 1;
      //   console.log(id);
      this.getData();
    },
    pageChange(data) {
      // console.log(data);
      this.nowPage = data.current;
      this.getData();
    },
    getData() {
      // console.log("cid " + this.action);
      // console.log("nowPage " + this.nowPage);
      // this.show = 0;
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=solveapi",
        data: {
          page: this.nowPage,
          cid: this.action
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
            this.category = dt.category;
            this.allpage = dt.allpage;
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
.solve {
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
    background: #f9f9f9;
    flex-wrap: wrap;
    .item {
      padding: 7.5px;
      box-sizing: border-box;
      width: 50%;
      display: inline-block;
      .bg {
        background: #fff;
        padding-bottom: 10px;
        .itemIcon {
          width: 100%;
        }
        .itemTitle {
          color: #333;
          padding: 0px 10px;
        }
        .itemDesc {
          color: #999;
          padding: 0px 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
