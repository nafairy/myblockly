<template>
  <div id="footer">
    <span id="logo"><img class="el-image" src="../../assets/ustc60.jpg" alt="footerlogo"></span>
    <span class="footer-span">Copyright  © 2020:软件学院工程实践小组</span>
    <!--        <h4>Copyright  © 2019 xxx</h4>-->
  </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
  #logo {
    height: 60px;
    display: inline-block;
    float: left;
  }

  .footer-span {

    float: right;
    padding-top: 15px;
    margin-right: 50px;
  }

  #footer {
    border-top: 1px solid #dcdfe6;
    padding-top: 3px;
    padding-left: 5%;
    padding-right: 5%;
  }
</style>
