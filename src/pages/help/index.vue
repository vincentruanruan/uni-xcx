<template>
  <div class="help">

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
            :src="banner.help"
            :mode="mode"
          ></image>
          <div class="title">{{title}}</div>
          <view class='inputGroup'>
            <input
              class='keyword'
              placeholder="请输入你要查询的内容"
              :value="keyword"
              @input="keywordChage"
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

        <!-- 列表 -->
        <div class="lists">
          <div class="bg">
            <div
              class="item"
              v-for="(item,index) in lists"
              :key="index"
              :data-id="item.id"
              @click="gotoDesc"
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
      allpage: "1",
      nowpage: "1",
      keyword: "",
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      categorys: {},
      lists: {}
    };
  },
  onLoad() {
    this.getData();
    this.$ee.on("acback", res => {
      this.action = res.action;
      this.keyword = "";
      this.getData();
    });
    this.$ee.on("kwback", res => {
      console.log(res);
      this.keyword = res.keyword;
      this.action = 0;
      console.log("kwback");
      this.getData();
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
      //   console.log(id);
      uni.navigateTo({
        url: `desc?id=${id}`
      });
    },
    keywordChage(e) {
      //   console.log(e.detail);
      this.keyword = e.detail.value;
      this.nowPage = 1;
      (this.action = 0), this.getData();
    },
    changeActon(e) {
      let id = e.currentTarget.dataset.id;
      this.action = id;
      this.nowPage = 1;
      //   console.log(id);
      this.getData();
    },
    pageChange(data) {
      this.nowPage = data.current;
      this.getData();
    },
    getData() {
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=helpapi",
        data: {
          cid: this.action,
          page: this.nowPage,
          keyword: this.keyword
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
            this.lists = dt.lists;
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
  .lists {
    padding: 7.5px;
    .item {
      padding: 7.5px;
      .bg {
        box-shadow: rgba($color: #000000, $alpha: 0.1) 1px 1px 10px;
        padding: 15px;
        border-radius: 5px;
        background: #fff;
        position: relative;
        .icon {
          width: 120px;
        }
        .right {
          position: absolute;
          width: 100%;
          padding-left: 150px;
          padding-right: 10px;
          top: 15px;
          left: 0;
          box-sizing: border-box;
          .desc {
            font-size: 13px;
            color: #999;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
        .time {
          position: absolute;
          bottom: 13px;
          left: 150px;
          color: #999;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
