<template>
  <div id="algs">
    <!-- 回到顶部的按钮 -->
    <BackTop></BackTop>

    <!--   容器-->
    <el-container>
      <!--   侧边栏-->
      <el-aside class="el-aside" style="width: 200px">
        <Sidebar></Sidebar>
      </el-aside>
      <!--  放卡片 -->
      <el-main class="el-main">
        <CategoryCards></CategoryCards>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import CategoryCards from "@/components/common/CategoryCards";
  import Sidebar from "@/components/common/Sidebar";
  import BackTop from "@/components/common/BackTop"

  export default {
    name: "Algs",
    components: {
      CategoryCards, //:()=>import("@/components/common/CategoryCards")
      Sidebar, //:()=>import("@/components/common/Sidebar")
      BackTop  //:()=>import("@/components/common/BackTop")

    },
  }
</script>

<style scoped>
  .el-aside {
    float: left;
    display: inline-block;
    color: #333;
    text-align: center;
    margin-top: 22px;
    position: fixed;
    width: 100%;
    left: 85px;
    top: 82px;
    z-index: 1000;

  }

  .el-main {
    overflow: hidden;
    padding: 0;
    margin-left: 250px;
    margin-top: 0;
  }
</style>
