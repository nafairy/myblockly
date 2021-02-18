<template>
  <div id="home">
    <!-- 轮播图展示-->
    <div id="show-carousel"  >
      <Carousel/>
    </div>
    <!-- google blocks简介-->
  </div>

</template>

<script>
    import Carousel from "@/components/common/Carousel"
    export default {
        name: "Home",
        components: {
            Carousel //:()=>import("@/components/common/Carousel")
        },
    }
</script>

<style scoped>

</style>
