


<template>
  <div style="margin-bottom: 0;;margin-top: 20px">
    <el-carousel indicator-position="outside" height="530px" type="demonstration">
        <el-carousel-item v-for="item in imgs" :key="item.index" :name="item.title">
          <router-link :to="item.route"><img :src="item.url" alt="main"></router-link>
          <h2>{{item.title}}</h2>
        </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
    export default {
        name: "Carousel",
        data(){
            return {
                imgs:[
                  {index:1,title:"程序展示",url:require('../../assets/main3.jpg'),route:"/algs"},
                  {index:2,title: "关于Google Blockly",url:require('../../assets/mainpage2.png'),route:"/about"},
                  {index:3,title: "惊喜小游戏",url:require('../../assets/main1.jpg'),route:"/algs"},
                ]
            }
        }
    }
</script>

<style scoped>
/** 设置样式 **/
.el-carousel__item h2{
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

</style>
