<template>
  <div id="app">
    <!-- app布局-->
    <el-container>
      <!-- header布局-->
      <el-header style="position: sticky;top: 0;z-index: 3000;background-color: white">
        <Header/>
      </el-header>
      <!-- body布局-->
      <el-main id="el-main">
        <router-view/>
      </el-main>
      <!-- footer布局-->
      <el-footer >
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Header from "./components/common/Header"
  import Footer from "./components/common/Footer";

  export default {
    name: 'app',
    components: {
      Footer,
      Header
    },
    created: function () {
      // this.axios.get('http://localhost:8080/static/media/stack_alg.xml')
      //     .then((response) => {
      //         console.log(response.data)
      //     }).catch((error) => {
      //     console.log(error)
      // });
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* 这里给app一个滚动效果 */
  }

  #el-main {
   padding-top: 0;
    /*padding-bottom:0;*/
    margin: 0px 5%;
  }
</style>
