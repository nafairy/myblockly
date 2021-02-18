<template>
  <div>
    <el-row>
      <el-col :span="20" class="sidebar-col">
        <h4 style="text-align: center">算法分类</h4>
        <el-menu
          :default-active="this.$route.path"
          class="el-menu"
          >

          <!--                        数组 -->
          <a :id="'anchor-'+1" href="javascript:void(0)" @click="getRowId($event)">
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数组</span>
              </template>
            </el-menu-item>
          </a>
          <!--                          栈-->
          <a :id="'anchor-'+2"  href="javascript:void(0)" @click="getRowId($event)">
            <el-menu-item index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>栈</span>
              </template>
            </el-menu-item>
          </a>
          <!--                        队列 -->

          <a :id="'anchor-'+3" href="javascript:void(0)" @click="getRowId($event)">
            <el-menu-item index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>队列</span>
              </template>
            </el-menu-item>
          </a>
          <!--                        链表 -->
          <a :id="'anchor-'+4" href="javascript:void(0)" @click="getRowId($event)">
            <el-menu-item index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>链表</span>
              </template>
            </el-menu-item>
          </a>
          <!--                        树 -->
          <a :id="'anchor-'+5" href="javascript:void(0)" @click="getRowId($event)">
            <el-menu-item index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>树</span>
              </template>
            </el-menu-item>
          </a>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import bus from "../../busEvents/bus";

  export default {
    name: "Sidebar",
    methods: {
      getRowId(event) {
        bus.$emit('rowId', event.currentTarget.id);
      }
    }
  }
</script>

<style scoped>
  .sidebar-col{
    background-color: #F2F6FC;
    text-align: left;
    border-bottom:1px solid #dcdfe6;
    border-left:1px solid #dcdfe6;
    transition: all 250ms cubic-bezier(.02, .01, .47, 1);
  }
  .sidebar-col:hover {
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0,-5px);
    transition-delay: 0s !important;
  }
  a {
    text-decoration: none
  }
  .el-menu{

    text-color:#000000;
  }
</style>
