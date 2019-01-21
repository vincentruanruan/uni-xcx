<template>
    <view @click="next"> desc </view>
</template>
    
<script>
export default {
    methods:{
        next:()=>{
            uni.redirectTo({
                url:'/pages/about/index'
            })
        }
    }
}
</script>

<style lang="scss">
    
</style>
