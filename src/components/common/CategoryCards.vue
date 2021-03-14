<template>
  <div style="width:99%" id="block">
    <el-row :gutter="20" v-for="categoryData in categoryDatas " :key="categoryData.index"
            :id="'anchor-'+categoryData.index">
      <!--   行  -->
      <h2 class="h2-style">
        <a href="" aria-hidden="true" class="header-anchor">¶</a>
        {{categoryData.categoryName}}
      </h2>
      <el-col :span="8" v-for="card in categoryData.cards" :key="card.id" v-bind:card="card"
              style="padding-bottom: 20px">
        <router-link :to="{name:'alg',params:{name:card.name}}" style="text-decoration: none;">
          <el-card class="el-card" :body-style="{ padding: '0px' }">
            <!--  存放图片  -->
            <img :src="card.imgUrl" class="image" style="border: solid 1px white;border-bottom: solid 1px black">
            <div id="card-buttom" style="padding:10px 10px 10px 10px; height:50px">
              <!--  卡片显示  -->
              <div style="float: left; text-align: center;margin-left:20px">

                <el-link type="primary" style="font-size:16px; font-weight:bold;" :underline="false">
                  {{card.title}}
                </el-link>

                <!--              <span >{{card.title}}</span>-->
<!--                <div class="bottom clearfix">-->
<!--                  &lt;!&ndash;                <time class="time">{{card.createdTime}}</time>&ndash;&gt;-->
<!--                  <time class="time">2021</time>-->

<!--                </div>-->
              </div>
              <router-link :to="{name:'alg',params:{name:card.name}}" style="text-decoration: none;">
                <el-button style="float: right;margin-right:20px" type="danger" circle v-if="card.difficulty==='hard'">难
                </el-button>
                <el-button style="float: right;margin-right:20px" type="warning" circle
                           v-else-if="card.difficulty==='medium'">中
                </el-button>
                <el-button style="float: right;margin-right:20px" type="success" circle
                           v-else="card.difficulty==='easy'">
                  易
                </el-button>
              </router-link>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import bus from "../../busEvents/bus"

  export default {
    name: "CategoryCards",
    props: {
      // categoryName: String,
      // categoryIndex: Number,
      // cards: Array,
    },
    created() {
      console.log("created");
      bus.$on('rowId', function (id) {
        let anchor = this.$el.querySelector('#' + id);
        document.documentElement.scrollTop = anchor.offsetTop - 66;
        // console.log(anchor.offsetTop - 66);
      }.bind(this))
    },
    data: function () {
      return {
        categoryDatas: [
          {
            index: 1,
            category: "array",
            categoryName: "数组",
            cards: [
              {
                id: 1,
                difficulty: "easy",
                name: 'arrayInsertAlg',
                imgUrl: require('../../assets/c1.gif'),
                createdTime: '2020.1.30',
                title: "数组插入"
              },
              {
                id: 2,
                difficulty: "easy",
                name: 'arrayDeleteAlg',
                imgUrl: require('../../assets/c2.gif'),
                createdTime: '2020.1.30',
                title: "数组删除"
              },
              {
                id: 3,
                difficulty: "medium",
                name: 'bubbleSortAlg',
                imgUrl: require('../../assets/c3.gif'),
                createdTime: '2020.1.30',
                title: "冒泡排序"
              },
              {
                id: 4,
                difficulty: "medium",
                name: 'insertSortAlg',
                imgUrl: require('../../assets/c4.gif'),
                createdTime: '2020.1.31',
                title: "插入排序"
              },
              {
                id: 5,
                difficulty: "medium",
                name: 'selectSortAlg',
                imgUrl: require('../../assets/c5.gif'),
                createdTime: '2020.1.32',
                title: '选择排序'
              },
              {
                id: 6,
                difficulty: "hard",
                name: 'quickSortAlg',
                imgUrl: require('../../assets/c6.gif'),
                createdTime: '2020.1.30',
                title: "快速排序"
              }
            ]
          },
          {
            index: 2,
            category: "stack",
            categoryName: "栈",
            cards: [
              {
                id: 1,
                name: 'stackPopAlg',
                difficulty: "easy",
                imgUrl: require('../../assets/c7.gif'),
                createdTime: '2020.1.30',
                title: "括号匹配Ⅰ"
              },
              {
                id: 2,
                name: "stackPushAlg",
                difficulty: "easy",
                imgUrl: require('../../assets/c8.gif'),
                createdTime: '2020.1.31',
                title: "括号匹配Ⅱ"
              },
              {
                id: 3,
                name: "stackOverAllAlg",
                difficulty: "hard",
                imgUrl: require('../../assets/c9.gif'),
                createdTime: '2020.1.32',
                title: '四则运算'
              }
            ]
          },
          {
            index: 3,
            category: "queue",
            categoryName: "队列",
            cards: [
              {
                id: 1,
                name: "queuePushAlg",
                difficulty: "easy",
                imgUrl: require('../../assets/c10.gif'),
                createdTime: '2020.1.30',
                title: "入队"
              },
              {
                id: 2,
                name: "queuePopAlg",
                difficulty: "easy",
                imgUrl: require('../../assets/c11.gif'),
                createdTime: '2020.1.31',
                title: "出队"
              },
              {
                id: 3,
                name: "queueOverAllAlg",
                difficulty: "medium",
                imgUrl: require('../../assets/c12.gif'),
                createdTime: '2020.1.32',
                title: '队列综合算法'
              }
            ]
          },
          {
            index: 4,
            category: "linklist",
            categoryName: "链表",
            cards: [
              {
                id: 1,
                name: "linklistSearchAlg",
                difficulty: "easy",
                imgUrl: require('../../assets/c15.gif'),
                createdTime: '2020.1.32',
                title: '链表查询'

              },
              {
                id: 2,
                name: "linklistDeleteAlg",
                difficulty: "hard",
                imgUrl: require('../../assets/c14.gif'),
                createdTime: '2020.1.31',
                title: "链表删除"
              },
              {
                id: 3,
                name: "linklistInsertAlg",
                difficulty: "hard",
                imgUrl: require('../../assets/c13.gif'),
                createdTime: '2020.1.30',
                title: "链表插入"

              }
            ]
          },
          {
            index: 5,
            category: "tree",
            categoryName: "树",
            cards: [
              {
                id: 1,
                name: "treeBfsAlg",
                difficulty: "medium",
                imgUrl: require('../../assets/c16.gif'),
                createdTime: '2020.1.30',
                title: "广度优先遍历"
              },
              {
                id: 2,
                name: "treePreOrderAlg",
                difficulty: "medium",
                imgUrl: require('../../assets/c17.gif'),
                createdTime: '2020.1.31',
                title: "先序遍历"
              },
              {
                id: 3,
                name: "treeInOrderAlg",
                difficulty: "medium",
                imgUrl: require('../../assets/c18.gif'),
                createdTime: '2020.1.32',
                title: '中序遍历'
              },
              {
                id: 4,
                name: "treePosOrderAlg",
                difficulty: "hard",
                imgUrl: require('../../assets/c19.gif'),
                createdTime: '2020.1.31',
                title: '后序遍历'
              }
            ]
          }
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .h2-style {
    text-align: left;
    border-bottom: #eee 1px solid;

  }

  .el-card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    margin-bottom: 25px;
    transition: all 250ms cubic-bezier(.02, .01, .47, 1);
  }

  .el-card:hover {
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -7px);
    transition-delay: 0s !important;
  }
</style>
