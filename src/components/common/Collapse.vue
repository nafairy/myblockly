<template>

  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <h2>算法简介</h2>
        </template>
        <div v-html="Algname.idea"></div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <h2>算法分析</h2>
        </template>
        <div v-html="Algname.algAnalysis"></div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <h2>伪代码实现</h2>
        </template>
        <pre style="margin-top: 0;">
<!--          <code style="font-size: 20px;text-align: left" class="python3">{{Algname.code}}</code>-->
          <code v-html="Algname.code" class="code"></code>>
        </pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import {CollapseMap} from "../../../static/AlgDescriptions/Descriptions";

  export default {
    name: "Collapse",
    props: {
      algname: String
    }

    ,
    data() {
      return {
        activeName: '1',
        Algname: CollapseMap.get(this.algname)
      };
    },
    methods: {},
    created() {
      // console.log(this.Algname)
    }
  }
</script>

<style scoped>
  .content-size {
  font-size: 16px;
  }

  .code {
    margin-top: 0;
    text-align: left;
    overflow-x: auto;
    color: #525252;
    white-space: pre;
    padding: 0 1.4em;
    font-size: 0.85rem;
    line-height: 1.6rem;
    display: block;
  }

</style>
