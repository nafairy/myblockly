<template>
  <div>
    <div class="scroll" :class="{show:isActive}">
      <div id="toTop" @click="toTop(step)"><</div>
      <div id="toBottom" @click="toBottom(step)">></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "BackTop",props:{
        step:{ //此数据是控制动画快慢的
          type:Number,
          default:50
        }
      },
      data(){
        return {
          isActive:false,
        }
      },
      methods:{
        toTop(i){
          //参数i表示间隔的幅度大小，以此来控制速度
          document.documentElement.scrollTop-=i;
          if (document.documentElement.scrollTop>0) {
            var c=setTimeout(()=>this.toTop(i),16);
          }else {
            clearTimeout(c);
          }
        },
        toBottom(i){
          var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
          var scrollHeight=document.documentElement.scrollHeight;
          var height=scrollHeight-clientHeight; //超出窗口上界的值就是底部的scrolTop的值
          document.documentElement.scrollTop+=i;
          if (document.documentElement.scrollTop<height) {
            var c=setTimeout(()=>this.toBottom(i),16);
          }else {
            clearTimeout(c);
          }
        }
      },
      created(){
        var vm=this;
        window.οnscrοll=function(){
          if (document.documentElement.scrollTop>60) {
            vm.isActive=true;
          }else {
            vm.isActive=false;
          }
        }
      }

    }
</script>

<style scoped>
  .scroll{
    position: fixed;
    right: 10px;
    bottom: 60px;
    width: 45px;
    height: 90px;
    cursor: pointer;
    display: none;
  }
  .scroll>div{
    width: 45px;
    height: 45px;
    transform: rotate(90deg);
    line-height: 45px;
    text-align: center;
    font-size: 35px;
    font-family: "黑体";
    background-color: rgba(0,0,0,.2);
    color: #fff;
  }
  .scroll>div:hover{
    background-color: rgba(0,0,0,.5);
  }
  .show{
    display: block;
  }
</style>
