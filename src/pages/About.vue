<template>
  <div style="text-align: left">
    <div style="font-size: 17px">
      <h1 style="color: black;text-align: center">Development Team</h1>
      <p><strong>我们是来自中国科学技术大学软件学院的研究生团队，基于Google Blockly的可视化编程技术之上进行了此次项目的开发工作。</strong></p>
      <p><strong>王小雷：</strong><br>
        1.block块简单排序算法的实现并且转化为xml文档，主要包括插入排序、选择排序、冒泡排序、快速排序。<br>
        2.部分数据结构，例如数组block块组合实现数据结构的基本算法。<br>
        3.数据结构算法的详细说明，主要包括:算法思想，算法稳定性，时间复杂度分析，代码实现。<br>
        4.完成开题答辩文档部分编写和汇总与纠错，开题答辩ppt制作以及结题答辩ppt制作。<br>
        5.参与系统测试调试和联调。
      </p>
      <p><strong>王智豪：</strong><br>
        1.对整个项目进行人员与工作的分配，把握项目整体流程规划以及时间安排。<br>
        2.实现每一个算法对应的Echarts工具包，进行可视化展示。<br>
        3.利用Blockly自带工具，编写特定的注入代码进行代码解析实现Blockly工具包。<br>
        4.编写按钮控制工具包，工具类包和控制流程包，构建并实现整个可视化项目的核心库USTC_VP，实现可插拔式的算法展示并不断升级核心库。<br>
        5.帮助Blockly块搭建人员，编写对应算法的JavaScript的程序用于实现块搭建。<br>
        6.使用阿里云在Linux利用Docker搭建Nginx和Apache服务器，用于远程访问。<br>
        7.协助前端人员嵌入Vue和ElementUI，联调项目修改程序漏洞。</p>
      <p><strong>宛&emsp;壮：</strong><br>
        1. 使用git构建项目仓库，部署项目管理工作。<br>
        2. 完成前期项目所需的blocks及对应的Blockly的js代码的编写。包含linklist，stack，queue，tree四部分。<br>
        3. 编写测试网页，实现对构建的blocks和对应js的代码正确性验证工作。<br>
        4. 构建了linklist，stack，queue,tree四个部分所有的算法块的构建工作。<br>
        5. 使用 Vue.js 构建前端项目，构建网站主体框架，完成对项目主体功能的移植工作。</p>
      <p><strong>王智林：</strong><br>
        1.利用<strong>Vue.js</strong>和<strong>Element-UI</strong>实现项目数据的前台展示工作。<br>
        2.协助搭建前端网页整体框架，设计并实现网页主题和布局。<br>
        3.建立前端各个Vue组件，完成组件单元测试工作。<br>
        4.实现Vue组件间的数据通信，将分散的组件构建成整体网页，实现最后的效果展示。<br>
        5.对网页进行美化，协助小组其他成员进行最后的Bug修复和整体调试工作。<br>
      </p>
    </div>

    <!--    表格-->
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-info" style="height: 20px">&nbsp;&nbsp;</i>
          <h2 style="color: #409EFF">what is <strong>Blockly</strong>?</h2>
        </template>
        <div style="font-size: 20px">

          <div style="width: 600px;display: inline-block;">
      <h2>what is <strong>Blockly</strong>?</h2>
      <p><strong>Blockly</strong> is a client-side library for the programming language JavaScript for
        creating block-based visual programming languages (VPLs) and editors.
        It is a project of Google and is free and open-source software released under the
        Apache License 2.0.[1] It typically runs in a web browser, and visually resembles the language Scratch.
        Blockly is also being implemented for the mobile operating systems Android and iOS,
        though not all web browser based features are available for these.</p>
      <p><strong>Blockly</strong>是一个用于创建基于块的可视化编程语言(VPLs)和编辑器的编程语言JavaScript的客户端库。它是谷歌的一个项目，
        是基于Apache License 2.0发布的免费开源软件。它通常在web浏览器中运行，在视觉上类似于Scratch语言。
        Blockly还将在移动操作系统Android和iOS上实现，尽管并非所有基于web浏览器的功能都适用于这些系统。</p>
    </div>
    <img src="../assets/about1.png" style="display: inline-block;margin-left: 50px" height="300" width="481"/>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-info" style="height: 20px">&nbsp;&nbsp;</i>
          <h2 style="color: #409EFF">Informations about Blockly</h2>
        </template>
        <div>
          <el-table :data="tableData" style="width: 100%;font-size: 16px" :show-header="false">
            <el-table-column prop="left"></el-table-column>
            <el-table-column prop="right"></el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-info" style="height: 20px">&nbsp;&nbsp;</i>
          <h2 style="color: #409EFF">History</h2>
        </template>
        <div>
          <p style="font-size: 20px">Blockly development began in summer 2011.
            The first public release was in May 2012 at Maker Faire.
            Blockly was originally designed as a replacement for OpenBlocks in App Inventor.
            Neil Fraser began the project with Quynh Neutron,
            Ellen Spertus, and Mark Friedman as contributors.</p>
          <p style="font-size: 20px">
            <strong>Blockly</strong>开发始于2011年夏天。第一次公开发布是在2012年5月的Maker Faire。<i>(P.s.&nbsp;&nbsp;MakerFaire是美国Make杂志社举办的全世界最大的DIY聚会，是一个展示创意、
            创新与创造的舞台，一个宣扬创客（Maker)文化的庆典，也是一个适合一家人同时参加的周末嘉年华。)</i>
            Blockly最初设计是为了替代App Inventor中的OpenBlocks。Neil Fraser和Quynh Neutron、Ellen Spertus和Mark Friedman
            一起开始了这个项目。
          </p>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-info" style="height: 20px">&nbsp;&nbsp;</i>
          <h2 style="color: #409EFF">User interface</h2>
        </template>
        <div>
          <p style="font-size: 20px">
            The default graphical user interface (GUI) of the Blockly editor consists of a toolbox, which holds
            available blocks,
            and where a user can select blocks, and a workspace, where a user can drag and drop and rearrange blocks.
            The workspace also includes, by default, zoom icons, and a trashcan to delete blocks.
            The editor can be modified easily to customise and limit the available editing features and blocks.
          </p>
          <p style="font-size: 20px">
            <strong>Blockly</strong>编辑器的默认图形用户界面(GUI)包括一个工具箱，其中存放可用的块，用户可以在其中选择块，
            以及一个工作区，用户可以在其中拖放和重新排列块。默认情况下，工作区还包括缩放图标和用于删除块的垃圾桶。
            编辑器可以很容易地被修改来定制和限制可用的编辑功能和块。
          </p>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-info" style="height: 20px">&nbsp;&nbsp;</i>
          <h2 style="color: #409EFF">Customization</h2>
        </template>
        <div>
          <p style="font-size: 20px">
            Blockly includes a set of visual blocks for common operations, and can be customized by adding more blocks.
            New blocks require a block definition and a generator. The definition describes the block's appearance (user
            interface)
            and the generator describes the block's translation to executable code.
            Definitions and generators can be written in JavaScript, or using a visual set of blocks, the Block Factory,
            which allows new blocks to be described using extant visual blocks; the intent is to make creating new
            blocks easier.
          </p>
          <p style="font-size: 20px">
            <strong>Blockly</strong>包括一组用于常见操作的可视化块，可以通过添加更多块进行定制。新块需要一个块定义和一个生成器。
            定义描述块的外观(用户界面)，生成器描述块到可执行代码的转换。定义和生成器可以用JavaScript编写，或者使用一组可视化的块，
            即块工厂，它允许使用现有的可视化块来描述新块;这样做的目的是让创建新区块变得更容易。
          </p>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-info" style="height: 20px">&nbsp;&nbsp;</i>
          <h2 style="color: #409EFF">Applications</h2>
        </template>
        <div>
          <p style="font-size: 20px">
            <strong>Blockly</strong> is used in several notable projects, including:
          </p>
          <ul style="font-size: 16px">
            <li>MIT's App Inventor, to create applications for Android.</li>
            <li>Blockly Games, a set of educational games that teach programming concepts such as loops and
              conditionals.
            </li>
            <li>Code.org, to teach introductory programing to millions of students in their Hour of Code program.</li>
            <li>RoboBlockly, a web-based robot simulation environment for learning coding and math.</li>
            <li>Wonder Workshop, to control their Dot and Dash educational robots.</li>
          </ul>
          <p style="font-size: 20px">
            <strong>Blockly</strong>被应用在一些优秀的项目中，包括:
          </p>
          <ul style="font-size: 16px">
            <li>麻省理工学院的App Inventor，为Android开发应用程序。</li>
            <li>Blockly游戏，一组教育游戏，教编程概念，如循环和条件。</li>
            <li>Code.org,在数以百万计的学生学习编程时教授编程入门。</li>
            <li>RoboBlockly,一个基于web的机器人模拟环境，用于学习编码和数学。</li>
            <li>Wonder Workshop,控制他们的Dot和Dash教育机器人。</li>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-info" style="height: 20px">&nbsp;&nbsp;</i>
          <h2 style="color: #409EFF">Features</h2>
        </template>
        <div>
          <ul style="font-size: 16px">
            <li>Web based using Scalable Vector Graphics (SVG), no Flash</li>
            <li>Completely client side JavaScript</li>
            <li>Support of major web browsers including: Chrome, Firefox, Safari, Opera,Internet Explorer (IE)</li>
            <li>Mobile support on Android and iOS</li>
            <li>Support for many programmatic constructs including variables, functions, arrays</li>
            <li>Minimal type checking supported, designed for weakly typed languages</li>
            <li>Easy to extend with custom blocks. Use the Block Factory to make new blocks</li>
            <li>Clean code generation</li>
            <li>Step-by-step code execution for tracing and debugging code</li>
            <li>Localised into 50+ languages</li>
            <li>Support for left-to-right and right-to-left languages</li>
          </ul>

          <ul style="font-size: 16px;margin-top: 20px;">
            <li>基于Web使用可伸缩矢量图形(SVG)，没有Flash</li>
            <li>完全客户端化的JavaScript</li>
            <li>支持主要浏览器，包括:Chrome, Firefox, Safari, Opera, IE</li>
            <li>支持Android和iOS手机</li>
            <li>支持许多编程构造，包括变量、函数、数组</li>
            <li>支持最小类型检查，专为弱类型语言设计</li>
            <li>易于扩展自定义块。使用积木工厂制造新的积木</li>
            <li>干净的代码生成</li>
            <li>逐步执行代码以跟踪和调试代码</li>
            <li>本地化了50多种语言</li>
            <li>支持从左到右和从右到左的语言</li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>


  </div>
</template>

<script>
  export default {
    name: "About",
    mounted: function () {
    },
    data() {
      return {
        tableData: [
          {
            left: "Original author(s)",
            right: "Neil Fraser,Quynh Neutron, Ellen Spertus, Mark Friedma",
          },
          {
            left: "Developer(s)",
            right: "Google, MIT",
          },
          {
            left: "Initial release",
            right: "May 2012; 8 years ago",
          },
          {
            left: "Stable release",
            right: "1.20190215.0 / 15 February 2019; 16 months ago",
          },
          {
            left: "Preview release",
            right: "1.20190419.0 / 19 April 2019; 14 months ago",
          },
          {
            left: "Repository",
            right: "github.com/google/blockly",
          },
          {
            left: "Written in",
            right: "JavaScript",
          },
          {
            left: "Operating system",
            right: "Android, iOS",
          },
          {
            left: "Platform",
            right: "Web browser",
          },
          {
            left: "Size",
            right: "150 KB",
          },
          {
            left: "Available in",
            right: "50 languages",
          },
          {
            left: "Type",
            right: "Library",
          },
          {
            left: "License",
            right: "Apache 2.0",
          },
          {
            left: "Website",
            right: "developers.google.com/blockly",
          },

        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>


</style>
