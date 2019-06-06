<template>
  <view class="news">
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
            :src="banner.news"
            :mode="mode"
          ></image>
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

        <view
          class="uni-flex uni-row news"
          style="flex-wrap: wrap;"
        >
          <view
            v-for="(item,index) in list"
            :key="index"
            class="item"
            :data-id="item.id"
            @click="gotoDesc"
          >
            <view class="bg uni-flex uni-row">
              <view class="left">
                <view class="month">{{item.month}}</view>
                <view class="year">{{item.year}}</view>
              </view>
              <view class="right">
                <view class="inner">
                  <view class="bg">
                    <view class="itemTitle">{{item.title}}</view>
                    <view class="itemDesc">{{item.abstract}}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

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

  </view>
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
      // 下面是接口参数
      header: {},
      footer: {},
      title: "",
      banner: {},
      categorys: {},
      list: [],
      allpage: 1,
      next: "",
      prev: ""
    };
  },
  onLoad(option) {
    if (option.action) {
      this.action = option.action;
    }
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
      // console.log(id)
      uni.navigateTo({
        url: `desc?id=${id}`
      });
    },
    pageChange(data) {
      // console.log(data);
      this.nowPage = data.current;
      this.getData();
    },
    changeActon(e) {
      let id = e.currentTarget.dataset.id;
      this.action = id;
      this.nowPage = 1;
      //   console.log(id);
      this.getData();
    },
    getData() {
      // console.log("cid " + this.action);
      // console.log("nowPage " + this.nowPage);
      uni.request({
        url:
          this.$store.state.baseUrl +
          "/web/index.php?c=account&a=welcome&do=newsapi",
        data: {
          cid: this.action,
          page: this.nowPage
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
            this.list = dt.lists;
            this.allpage = dt.allpage;
            this.next = dt.next;
            this.prev = dt.prev;
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
.news {
  .banner {
    .bg {
      width: 100%;
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
  .news {
    .item:active {
      background: #f0f0f0;
    }
    .item {
      width: 100%;
      padding: 7.5px;
      box-sizing: border-box;
      .bg {
        // background: red;
        position: relative;
        // text-align: center;
        .left {
          // background: red;
          flex: 20%;
          padding-top: 0.3rem;
          padding-right: 0.3rem;
          text-align: right;

          .month {
            font-size: 1rem;
            display: inline-block;
            color: #777;
          }

          .year {
            font-size: 0.8rem;
            color: #999;
          }
        }

        .right {
          // background: yellowgreen;
          flex: 80%;
          .inner {
            padding: 0.3rem;

            .bg {
              // background: red;
              position: relative;
              // text-align: center;

              .itemIcon {
                width: 80%;
              }

              .itemTitle {
                font-size: 1rem;
                margin-bottom: 0.2rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }

              .itemDesc {
                font-size: 0.8rem;
                color: #999;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
}
</style>
