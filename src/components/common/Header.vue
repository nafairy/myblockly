<template>
  <div id="header">
    <a id="logo" >
      <router-link to="/algs">
        <img src="../../assets/logo.png" alt="website's logo" >
      </router-link>

    </a>
    <el-menu
      :default-active="this.$route.path"
      :router=true
      class="el-nav"
      mode="horizontal">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/algs">算法学习</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {

            }
        },
        mounted: function () {

        },
        methods: {}
    }
</script>

<style scoped>
  #header {
    height: 60px;
    border-bottom: 2px solid #dcdfe6;
    /*box-shadow: 0 0 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    padding: 0 10%;
  }

  .el-nav {
    float: right;
    background: rgba(255, 255, 255, 0);
  }

  #logo {
    display: inline-block;
    float: left;
    left: 50px;
    height: 60px;;
  }
</style>
