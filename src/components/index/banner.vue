<template>
  <view class="uni-padding-wrap index-swiper">
    <view class="page-section swiper">
      <view class="page-section-spacing">
        <swiper
          class="swiper"
          indicator-dots
          autoplay
          circular
          :interval="3000"
          :duration="500"
          :indicator-active-color="activeColor"
        >
          <swiper-item
            v-for="(item,index) in carouse"
            :key="index"
          >
            <view class="swiper-item">
              <image
                class="swiper-image"
                :mode="mode"
                :src="item"
                
              ></image>
            </view>
          </swiper-item>

        </swiper>
      </view>
    </view>
  </view>
</template>


<script>
export default {
  props: {
    carouse: Array
  },
  data() {
    return {
      activeColor: '#fff',
      mode:'widthFix'
    };
  },
  mounted() {
  }
};
</script>



<style lang="scss" scoped>
// 轮播
.uni-padding-wrap {
  padding: 0;
  width: 100%;
  swiper {
    height: 220px;
    .swiper-image {
      width: 100%;
    }
  }
}
</style>