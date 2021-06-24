<!--<template>-->
<!--  <div>-->

<!--    &lt;!&ndash;回退区&ndash;&gt;-->

<!--    &lt;!&ndash;  2.算法动态展示区域  &ndash;&gt;-->
<!--    <div id="visual-visual_programming">-->
<!--      <el-row :gutter="24">-->
<!--        <h2 class="h2-style">{{route_name}}算法动态演示</h2>-->

<!--        <el-col :span="24" calss="col-style">-->
<!--          <h3 class="h3-style">Echart算法动态展示部分</h3>-->
<!--          &lt;!&ndash;<p>工作栏包含：按钮栏，动态展示</p>&ndash;&gt;-->
<!--          &lt;!&ndash;  按钮栏&ndash;&gt;-->
<!--          <div id="buttonBar">-->
<!--            <el-row>-->
<!--              <button id="runButton" class="btn" style="margin-left: 0" @click="isActive=1"-->
<!--                      :class="{select:isActive===1}">运行代码-->
<!--              </button>-->
<!--              <button id="stopButton" class="btn" @click="isActive=2" :class="{select:isActive===2}">暂停运行</button>-->
<!--              <button id="continueButton" class="btn" @click="isActive=3" :class="{select:isActive===3}">继续运行</button>-->
<!--              <button id="overButton" class="btn" @click="isActive=0">结束</button>-->
<!--            </el-row>-->
<!--          </div>-->
<!--          &lt;!&ndash; 展示栏&ndash;&gt;-->
<!--          <div id="showBar">-->
<!--            动态展示块-->
<!--          </div>-->
<!--        </el-col>-->

<!--      </el-row>-->
<!--      <el-row :gutter="24">-->
<!--        &lt;!&ndash; 2.1 左侧的工具栏&ndash;&gt;-->
<!--        <el-col :span="24" class="col-style">-->
<!--          <h3 class="h3-style">BlocklyWorkspace</h3>-->
<!--          <div id="blocklyDiv">-->

<!--          </div>-->
<!--        </el-col>-->

<!--      </el-row>-->

<!--&lt;!&ndash;      <el-row :gutter="24">&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; 2.1 左侧的工具栏&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <el-col :span="24" class="col-style">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <div id="show"&ndash;&gt;-->
<!--&lt;!&ndash;               style="float:left;height: 500px;width: 600px;text-align: center;border-style:solid;border-width: 1px;border-color: rgb(197, 195, 195);">&ndash;&gt;-->
<!--&lt;!&ndash;            <h2>动态展示代码内容</h2>&ndash;&gt;-->
<!--&lt;!&ndash;            <textarea id="showCodeArea" disabled="disabled"&ndash;&gt;-->
<!--&lt;!&ndash;                      style="display: inline-block; height: 400px; width: 595px;margin-top: 10px;"></textarea>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        </el-col>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;      </el-row>&ndash;&gt;-->
<!--    </div>-->
<!--&lt;!&ndash;    <div id="show"&ndash;&gt;-->
<!--&lt;!&ndash;         style="display:none; float:left;height: 800px;width: 599px;text-align: center;border-style:solid;border-width: 1px;border-color: rgb(197, 195, 195);">&ndash;&gt;-->
<!--&lt;!&ndash;      <h2>动态展示代码内容</h2>&ndash;&gt;-->
<!--&lt;!&ndash;      <textarea id="showCodeArea" disabled="disabled"&ndash;&gt;-->
<!--&lt;!&ndash;                style="display: inline-block; height: 400px; width: 595px;margin-top: 10px;"></textarea>&ndash;&gt;-->
<!--&lt;!&ndash;      <textarea id="output" disabled="disabled"&ndash;&gt;-->
<!--&lt;!&ndash;                style="display: inline-block; height: 200px; width: 595px;margin-top: 10px;"></textarea>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <Collapse :algname=this.$route.params.name></Collapse>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--  // 数组相关算法-->
<!--  import {ArrayInsertExecute} from "../../static/visual_programming/array/ustc_vp_array_insert";-->
<!--  import {ArrayDeleteExecute} from "../../static/visual_programming/array/ustc_vp_array_delete";-->
<!--  // 排序算法-->
<!--  import {BubbleSortExecute} from "../../static/visual_programming/sort/ustc_vp_bubble_sort";-->
<!--  import {InsertSortExecute} from "../../static/visual_programming/sort/ustc_vp_insert_sort";-->
<!--  import {SelectSortExecute} from "../../static/visual_programming/sort/ustc_vp_select_sort";-->
<!--  import {QuickSortExecute} from "../../static/visual_programming/sort/ustc_vp_quick_sort";-->
<!--  // 链表相关算法-->
<!--  import {LinkListInsertExecute} from "../../static/visual_programming/linklist/ustc_vp_linklist_insert"-->
<!--  import {LinkListSearchExecute} from "../../static/visual_programming/linklist/ustc_vp_linklist_search";-->
<!--  import {LinkListDeleteExecute} from "../../static/visual_programming/linklist/ustc_vp_linklist_delete";-->
<!--  // 树相关算法-->
<!--  import {TreeBfsExecute} from "../../static/visual_programming/tree/ustc_vp_tree_bfs";-->
<!--  import {TreeInorderExecute} from "../../static/visual_programming/tree/ustc_vp_tree_inorder";-->
<!--  import {TreePosorderExecute} from "../../static/visual_programming/tree/ustc_vp_tree_posorder";-->
<!--  import {TreePreorderExecute} from "../../static/visual_programming/tree/ustc_vp_tree_preorder";-->
<!--  // 栈相关算法-->
<!--  import {StackOverAllExecute} from "../../static/visual_programming/stack/ustc_vp_stack_overall";-->
<!--  import {StackPushExecute} from "../../static/visual_programming/stack/ustc_vp_stack_push";-->
<!--  import {StackPopExecute} from "../../static/visual_programming/stack/ustc_vp_stack_pop"-->
<!--  // 队列相关算法-->
<!--  import {QueueOverAllExecute} from "../../static/visual_programming/queue/ustc_vp_queue_overall";-->
<!--  import {QueuePushExecute} from "../../static/visual_programming/queue/ustc_vp_queue_push"-->
<!--  import {QueuePopExecute} from "../../static/visual_programming/queue/ustc_vp_queue_pop"-->
<!--  //折叠块-->
<!--  import {algMap} from "../../static/common/alg_map"-->
<!--  import Collapse from "./common/collapse"-->

<!--  export default {-->
<!--    name: "AlgDetail",-->
<!--    watch: {-->
<!--      $route: function (newVal, oldVal) {-->
<!--        if (newVal !== oldVal) {-->
<!--          let algName = this.$route.params.name;-->
<!--          this.route_name = algMap.get(algName).a_name;-->
<!--        }-->
<!--      },-->
<!--      'isActive': function (newValue) {-->
<!--        if (newValue) {-->
<!--          console.log(this.isActive)-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    components: {-->
<!--      Collapse-->
<!--    },-->
<!--    props: {-->
<!--      msg: String,-->
<!--    },-->
<!--    data: function () {-->
<!--      return {-->
<!--        route_name: "",-->
<!--        isActive: 0,-->
<!--      }-->
<!--    },-->

<!--    created: function () {-->
<!--      // 初始化算法描述信息-->
<!--      // this.alg = this.initDescription(this.$route.params.name);-->
<!--    },-->
<!--    mounted: function () {-->

<!--      this.init();-->
<!--      /*this.$router.afterEach((to, from, next) => {-->
<!--        window.scrollTo(0, 0)-->
<!--      });*/-->
<!--    },-->
<!--    methods: {-->
<!--      disable(event) {-->
<!--        // console.log(event.target)-->
<!--        event.target.disabled = "disabled";-->
<!--      },-->
<!--      /**-->
<!--       * 总的初始化函数-->
<!--       */-->
<!--      init() {-->
<!--        // 获取路由中的算法名称-->
<!--        let algName = this.$route.params.name;-->
<!--        // 根据名称初试化算法-->
<!--        this.initWorkspace(algName);-->
<!--        this.route_name = algMap.get(algName).a_name;-->
<!--      },-->
<!--      /**-->
<!--       * 初始化blockly工作空间-->
<!--       * @params algName：算法标识-->
<!--       * @return  无-->
<!--       */-->
<!--      initWorkspace(algName) {-->
<!--        //获取分类-->
<!--        // 获取算法名称-->
<!--        // alert(this.$route.path);-->
<!--        // console.log(algName);-->
<!--        // 1. 获取组件对应的id-->
<!--        let blocklyDiv = document.getElementById('blocklyDiv');-->
<!--        let runButton = document.getElementById('runButton');-->
<!--        let stopButton = document.getElementById('stopButton');-->

<!--        let continueButton = document.getElementById('continueButton');-->
<!--        let overButton = document.getElementById('overButton');-->
<!--        let outputArea = document.getElementById('output');-->
<!--        let showCodeArea = document.getElementById('showCodeArea');-->
<!--        let showBar = document.getElementById('showBar');-->
<!--        let xmlPath = "";-->

<!--        // 2. 根据传递的路由的算法名称选择对应的js库，绑定对应的xml-->
<!--        let alg = algMap.get(algName);-->
<!--        alg.obj.setExtend();-->
<!--        xmlPath = alg.xml;-->
<!--        console.log(alg);-->
<!--        // 3. 对动态工作空间进行初试化-->
<!--        ustc_vp.Execute.setBlockly(blocklyDiv, 'static/media', xmlPath);-->
<!--        ustc_vp.Execute.setOutputArea(outputArea);-->
<!--        ustc_vp.Execute.setButton(runButton, stopButton, continueButton, overButton);-->
<!--        ustc_vp.Execute.setShowCodeArea(showCodeArea);-->
<!--        ustc_vp.Execute.setShowChart(showBar);-->
<!--      },-->
<!--      /**-->
<!--       * 初始化算法描述-->
<!--       * @param algName: 路由的算法标识-->
<!--       * @returns Object:-->
<!--       */-->
<!--      /*initDescription(algName) {-->
<!--        //Todo:添加完整数据，实现对每个算法的数据绑定-->
<!--        let algDescMap = new Map([-->
<!--          ["arrayDeleteAlg", {-->

<!--            name: "数组删除",-->
<!--            idea: "<h3>算法思想</h3>" +-->
<!--              "<p>4. </p>",-->
<!--            timeComplexity: "<h4>时间复杂度:O(n)</h4>",-->
<!--            spaceComplexity: "",-->
<!--            code: ""-->
<!--          }],-->
<!--          ["arrayInsertAlg", {-->

<!--            name: "数据插入",-->
<!--            idea: "",-->
<!--            timeComplexity: "",-->
<!--            spaceComplexity: "",-->
<!--            code: "#include" + '\\<' + "iostream" + "\\>"-->
<!--          }],-->
<!--          ["arrayAlg", {-->
<!--            name: "数据插入",-->
<!--            idea: "",-->
<!--            timeComplexity: "",-->
<!--            spaceComplexity: "",-->
<!--            code: ""-->
<!--          }]-->
<!--        ]);-->
<!--        // 获取对应算法描述-->
<!--        let alg = algDescMap.get(algName);-->
<!--        if (alg === undefined) {-->
<!--          console.log("算法描述无法初始化，请正确检查！");-->
<!--        }-->
<!--        console.log(algDescMap.get(algName));-->
<!--        return alg;-->
<!--      }*/-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--  .btn:hover {-->
<!--    background-color: #409EFF;-->
<!--    border-color: #409EFF;-->
<!--    color: #fff;-->
<!--  }-->

<!--  button[disabled] {-->
<!--    cursor: not-allowed;-->
<!--    background-color: #409EFF;-->
<!--    border-color: #409EFF;-->
<!--    color: #fff;-->
<!--    opacity: 0.6;-->
<!--  }-->

<!--  .btn {-->
<!--    line-height: 1;-->
<!--    /*position: relative;*/-->
<!--    display: inline-block;-->
<!--    font-weight: 400;-->
<!--    white-space: nowrap;-->
<!--    text-align: center;-->
<!--    cursor: pointer;-->
<!--    /*user-select: none;*/-->
<!--    /*touch-action: manipulation;*/-->
<!--    height: 40px;-->
<!--    padding: 12px 20px;-->
<!--    font-size: 14px;-->
<!--    border-radius: 4px;-->
<!--    color: rgb(236, 245, 255);-->
<!--    background-color: rgb(64, 158, 255);-->
<!--    border: rgb(181, 217, 255) solid 1px;-->
<!--    margin-left: 10px;-->
<!--  }-->

<!--  .select {-->
<!--    background-color: #409EFF;-->
<!--    color: white;-->
<!--  }-->

<!--  .el-page-header {-->
<!--    color: white;-->
<!--    border: solid 2px;-->
<!--    border-radius: 30px;-->
<!--    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);-->
<!--    background-color: #409EFF;-->
<!--    position: fixed;-->
<!--    right: 50px;-->
<!--    top: 100px;-->
<!--    z-index: 3000;-->
<!--    width: 200px;-->
<!--    margin-right: -180px;-->
<!--    padding: 0 5px;-->
<!--    font-size: 20px;-->
<!--  }-->

<!--  .h2-style {-->
<!--    /*text-align: left;*/-->
<!--    border-bottom: #eee solid 1px;-->
<!--    text-align: left;-->
<!--    padding-bottom: 5px;-->
<!--  }-->

<!--  .h3-style {-->
<!--    border-bottom: #eee solid 1px;-->
<!--    padding-bottom: 2px;-->
<!--    margin-bottom: 0;-->
<!--  }-->

<!--  #buttonBar {-->
<!--    padding: 10px;-->
<!--  }-->

<!--  #showBar {-->
<!--    margin-right: 0;-->
<!--    height: 634px;-->
<!--    padding: 10px;-->
<!--    margin-top: 2px;-->
<!--    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);-->
<!--  }-->

<!--  #blocklyDiv {-->
<!--    height: 700px;-->
<!--    padding: 10px;-->
<!--    width: 99%;-->
<!--    margin-top: 10px;-->
<!--    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);-->
<!--  }-->
<!--</style>-->
<template>
  <div>

    <!--题目区-->
    <Title :algname=this.$route.params.name></Title>
    <br>
    <!--  2.算法动态展示区域  -->
    <div id="visual-visual_programming">
      <el-row :gutter="24">
        <h3 class="h3-style">算法动态展示部分</h3>
        <el-col :span="24" class="col-style">
          <!--  按钮栏-->
          <div id="buttonBar">
            <button id="runButton" class="btn" style="margin-left: 0" @click="isActive=1"
                    :class="{select:isActive===1}">运行代码
            </button>
            <button id="stopButton" class="btn" @click="isActive=2" :class="{select:isActive===2}">暂停运行</button>
            <button id="continueButton" class="btn" @click="isActive=3" :class="{select:isActive===3}">继续运行</button>
            <button id="overButton" class="btn" @click="isActive=0">结束</button>
          </div>
          <!-- 展示栏-->
          <div id="showBar" style="height: 600px">
            动态展示块
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="24">
<!--        <h2 class="h2-style">{{route_name}}算法动态演示</h2>-->
        <!-- 2.1 左侧的工具栏-->
        <el-col :span="24" class="col-style">
          <h3 class="h3-style">BlocklyWorkspace</h3>
          <div id="blocklyDiv" style="height: 500px">

          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12" class="col-style">
<!--          <div id="show"-->
<!--               style="float:left;height: 800px;width: 599px;text-align: center;border-style:solid;border-width: 1px;border-color: rgb(197, 195, 195);">-->
            <h2>代码内容</h2>
            <button v-on:click="showCode()">Show JavaScript</button>
            <textarea id="showCodeArea" v-model="code" style="display: inline-block; height: 400px; width: 595px;margin-top: 10px;" disabled="disabled"></textarea>
<!--            <textarea id="output" disabled="disabled"-->
<!--                      style="display: inline-block; height: 200px; width: 595px;margin-top: 10px;"></textarea>-->
<!--          </div>-->
        </el-col>

        <el-col :span="12" class="col-style">
<!--          <div id="show2"-->
<!--               style="float:left;height: 800px;width: 599px;text-align: center;border-style:solid;border-width: 1px;border-color: rgb(197, 195, 195);">-->
            <h2>输出</h2>
            <br>
            <textarea id="output" disabled="disabled"
                      style="display: inline-block; height: 400px; width: 595px;margin-top: 10px;"></textarea>
<!--          </div>-->
        </el-col>
      </el-row>

    </div>

<!--    <div id="show"-->
<!--         style="float:left;height: 800px;width: 599px;text-align: center;border-style:solid;border-width: 1px;border-color: rgb(197, 195, 195);">-->
<!--      <h2>动态展示代码内容</h2>-->
<!--      <button v-on:click="showCode()">Show JavaScript</button>-->
<!--      <textarea id="showCodeArea" v-model="code" style="display: inline-block; height: 400px; width: 595px;margin-top: 10px;" disabled="disabled"></textarea>-->
<!--      <textarea id="output" disabled="disabled"-->
<!--                style="display: inline-block; height: 200px; width: 595px;margin-top: 10px;"></textarea>-->
<!--    </div>-->
    <Collapse :algname=this.$route.params.name></Collapse>

  </div>
</template>

<script>

// 数组相关算法
import {ArrayInsertExecute} from "../../static/visual_programming/array/ustc_vp_array_insert";
import {ArrayDeleteExecute} from "../../static/visual_programming/array/ustc_vp_array_delete";
// 排序算法
import {BubbleSortExecute} from "../../static/visual_programming/sort/ustc_vp_bubble_sort";
import {InsertSortExecute} from "../../static/visual_programming/sort/ustc_vp_insert_sort";
import {SelectSortExecute} from "../../static/visual_programming/sort/ustc_vp_select_sort";
import {QuickSortExecute} from "../../static/visual_programming/sort/ustc_vp_quick_sort";
// 链表相关算法
import {LinkListInsertExecute} from "../../static/visual_programming/linklist/ustc_vp_linklist_insert"
import {LinkListSearchExecute} from "../../static/visual_programming/linklist/ustc_vp_linklist_search";
import {LinkListDeleteExecute} from "../../static/visual_programming/linklist/ustc_vp_linklist_delete";
// 树相关算法
import {TreeBfsExecute} from "../../static/visual_programming/tree/ustc_vp_tree_bfs";
import {TreeInorderExecute} from "../../static/visual_programming/tree/ustc_vp_tree_inorder";
import {TreePosorderExecute} from "../../static/visual_programming/tree/ustc_vp_tree_posorder";
import {TreePreorderExecute} from "../../static/visual_programming/tree/ustc_vp_tree_preorder";
// 栈相关算法
import {StackOverAllExecute} from "../../static/visual_programming/stack/ustc_vp_stack_overall";
import {StackPushExecute} from "../../static/visual_programming/stack/ustc_vp_stack_push";
import {StackPopExecute} from "../../static/visual_programming/stack/ustc_vp_stack_pop";
// 队列相关算法
import {QueueOverAllExecute} from "../../static/visual_programming/queue/ustc_vp_queue_overall"
import {QueuePushExecute} from "../../static/visual_programming/queue/ustc_vp_queue_push";
import {QueuePopExecute} from "../../static/visual_programming/queue/ustc_vp_queue_pop";

//折叠块
import {algMap} from "../../static/common/alg_map"
import Collapse from "./common/collapse"
import Title from "./common/Title";
// import BlocklyJS from 'blockly/javascript';

export default {
  name: "AlgDetail",
  watch: {
    $route: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        let algName = this.$route.params.name;
        this.route_name = algMap.get(algName).a_name;
      }
    },
    'isActive': function (newValue) {
      if (newValue) {
        console.log(this.isActive)
      }
    }
  },
  components: {
    Title,
    Collapse
  },
  props: {
    msg: String,
  },
  data: function () {
    return {
      route_name: "",
      isActive: 0,
      workspace:null,
      code:''
    }
  },

  created: function () {
    // 初始化算法描述信息
    // this.alg = this.initDescription(this.$route.params.name);
  },
  mounted: function () {

    this.init();
    /*this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0)
    });*/
  },
  methods: {
    disable(event) {
      // console.log(event.target)
      event.target.disabled = "disabled";
    },
    /**
     * 总的初始化函数
     */
    init() {
      // 获取路由中的算法名称
      let algName = this.$route.params.name;
      // 根据名称初试化算法
      this.initWorkspace(algName);
      this.route_name = algMap.get(algName).a_name;
    },
    /**
     * 初始化blockly工作空间
     * @params algName：算法标识
     * @return  无
     */
    initWorkspace(algName) {
      //获取分类
      // 获取算法名称
      // alert(this.$route.path);
      // console.log(algName);
      // 1. 获取组件对应的id
      let blocklyDiv = document.getElementById('blocklyDiv');
      let runButton = document.getElementById('runButton');
      let stopButton = document.getElementById('stopButton');

      let continueButton = document.getElementById('continueButton');
      let overButton = document.getElementById('overButton');
      let outputArea = document.getElementById('output');
      let showCodeArea = document.getElementById('showCodeArea');
      let showBar = document.getElementById('showBar');
      let xmlPath = "";

      // 2. 根据传递的路由的算法名称选择对应的js库，绑定对应的xml
      let alg = algMap.get(algName);
      alg.obj.setExtend();
      xmlPath = alg.xml;
      console.log(alg);
      // 3. 对动态工作空间进行初试化
      ustc_vp.Execute.setBlockly(blocklyDiv, 'static/media', xmlPath);
      ustc_vp.Execute.setOutputArea(outputArea);
      ustc_vp.Execute.setButton(runButton, stopButton, continueButton, overButton);
      ustc_vp.Execute.setShowCodeArea(showCodeArea);
      ustc_vp.Execute.setShowChart(showBar);

      // this.workspace.addChangeListener(this.myUpdateFunction);
      // Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      // Blockly.JavaScript.addReservedWords('highlightBlock');
    },
    showCode(){
      this.code=Blockly.JavaScript.workspaceToCode(this.workspace);
    },
    // myUpdateFunction(event) {
    //   var code = Blockly.JavaScript.workspaceToCode(this.workspace);
    //   this.code=code;
    // }
    // highlightBlock(id) {
    //   workspace.highlightBlock(id);
    // }
  }
}
</script>

<style scoped>
.btn:hover {
  background-color: #409EFF;
  border-color: #409EFF;
  color: #fff;
}

button[disabled] {
  cursor: not-allowed;
  background-color: #409EFF;
  border-color: #409EFF;
  color: #fff;
  opacity: 0.6;
}

.btn {
  line-height: 1;
  /*position: relative;*/
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  /*user-select: none;*/
  /*touch-action: manipulation;*/
  height: 40px;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: rgb(236, 245, 255);
  background-color: rgb(64, 158, 255);
  border: rgb(181, 217, 255) solid 1px;
  margin-left: 10px;
}

.select {
  background-color: #409EFF;
  color: white;
}

.el-page-header {
  color: white;
  border: solid 2px;
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #409EFF;
  position: fixed;
  right: 50px;
  top: 100px;
  z-index: 3000;
  width: 200px;
  margin-right: -180px;
  padding: 0 5px;
  font-size: 20px;
}

.h2-style {
  /*text-align: left;*/
  border-bottom: #eee solid 1px;
  text-align: left;
  padding-bottom: 5px;
}

.h3-style {
  border-bottom: #eee solid 1px;
  padding-bottom: 2px;
  margin-bottom: 0;
}

#buttonBar {
  padding: 10px;
}

#showBar {
  margin-right: 0;
  height: 634px;
  padding: 10px;
  margin-top: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#blocklyDiv {
  height: 700px;
  padding: 10px;
  width: 99%;
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
