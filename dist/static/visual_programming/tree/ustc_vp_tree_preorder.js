/******************************模块预处理单元***********************************/
/*
主要工作：
    1.检查是否引入Echarts.js、Blockly.js和基础ustc_vp_baseLib.js的工具包
    2.检测环境中是否有echarts、Blockly和ustc_vp对象
*/
//检测是否引入Echarts和Blockly
(function () {
    if (typeof (echarts) == 'undefined') {
        throw Error("未引入Echarts，需要先引入Echarts");
    }
    else if (typeof (Blockly) == 'undefined') {
        throw Error("未引入Blockly，需要先引入Google Blockly");
    }else if(typeof (ustc_vp) == 'undefined') {
        throw Error("未引入ustc_vp，需要先引入ustc_vp_baseLib.js");
    }

})();

/******************************图表包***********************************/
/*
主要工作：
    1.在指定的div处初始化图表
    2.获取图表数据的改变信息
    3.根据改变后的数据重绘图表
*/
var TreePreorderChart = {};
// 定义当前图表数据和改变索引
TreePreorderChart.initData = [];
TreePreorderChart.arrNow = [];
TreePreorderChart.showChart = null;
TreePreorderChart.dataChangeIndex = null;
TreePreorderChart.treepreorderObjectArr = [];
TreePreorderChart.treepreorderObjectLinks = [];

TreePreorderChart.changeChart = null;   //(函数)图表改变时的执行函数

//=================================================================================
//普通节点：红，当前节点：黄
TreePreorderChart.treepreorderDataChangeIndex = [-1];  //搜索到的树前序遍历[当前位置]
TreePreorderChart.posIdMap = new Map();     //Map对象保存（pos,id）关系
//=================================================================================
/* 清除所有数据 */
TreePreorderChart.dataClear = function () {
    TreePreorderChart.initData = [];
    TreePreorderChart.arrNow = [];
    TreePreorderChart.showChart = null;
    TreePreorderChart.dataChangeIndex = null;
    TreePreorderChart.treepreorderObjectArr = [];
    TreePreorderChart.treepreorderObjectLinks = [];
    
    TreePreorderChart.changeChart = null;   //(函数)图表改变时的执行函数
    TreePreorderChart.treepreorderDataChangeIndex = [-1];  //搜索到的树前序遍历[当前位置]
    TreePreorderChart.posIdMap = new Map();     //Map对象保存（pos,id）关系
}
/* 初始化树前序遍历图表的数据和属性 */
TreePreorderChart.initTreePreorderDataChart = function (showItem, chartAttr) {
    console.log("initTreePreorderChart");
 
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(showItem);

    // console.log(chartAttr);

    // 指定图表的配置项和数据
    var chartOption = {
        title: {
            text: chartAttr.chartTitle,
        },
        tooltip: {        
            formatter: function (x) {
                return x.data.name;//设置提示框的内容和格式 节点和边都显示name属性
            }
        },
        animationDurationUpdate: 300,  //数据更新动画的时长。
        animationEasingUpdate: 'quinticInOut',  //数据更新动画的缓动效果。
        series: [
            {
                type: chartAttr.chartType,
                layout: 'none',//图的布局
                symbolSize: [chartAttr.nodeWidth,chartAttr.nodeHeight], //节点宽和高
                legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
                hoverAnimation : true,//是否开启鼠标悬停节点的显示动画
                roam : false,//不开启鼠标缩放和平移漫游。
                width: chartAttr.seriesWidth, //组件的宽度。
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                label : { //图形上的文本标签
                    show : true,//是否显示标签。
                    position : 'inside',//标签的位置。
                    textStyle : { //标签的字体样式
                        color : '#130c0e', //字体颜色
                        fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight : 'bold',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily : 'sans-serif', //文字的字体系列
                        fontSize : 15, //字体大小
                    }
                },
                itemStyle : {//图形样式
                    color: chartAttr.itemColor[0],
                },
                data: chartAttr.chartData,
                links: chartAttr.chartLinks,
                lineStyle: {
                    color: '#409EFF',
                    opacity:1,
                    width: 3,
                    curveness: 0
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(chartOption);
    return myChart;
}

/* 初始化树前序遍历算法图表 */
TreePreorderChart.initTreePreorderChart = function (showItem) {
    TreePreorderTools.setGraphData(TreePreorderChart.arrNow, TreePreorderBlockly.latestCode, TreePreorderChart.treepreorderObjectArr, TreePreorderChart.treepreorderObjectLinks);
    return TreePreorderChart.initTreePreorderDataChart(showItem, TreePreorderTools.setGraphAttr(TreePreorderTools.treepreorderAttr));
}

/* 数据改变时设置树前序遍历图表 */
TreePreorderChart.setTreePreorderChartOption = function (chart, data, dataChangeIndex, chartAttr) {
    // console.log("setTreePreorderChartOption:");
    // console.log(chartAttr);
    // console.log(dataChangeIndex);
    chart.setOption({
        title: {
            text: chartAttr.chartTitle,
            subtext: "", //副标题 
            subtextStyle: {//主标题的属性
                color: 'blue',//颜色
                fontWeight: 'bold',
                fontSize: 20,//大小
            },
        },
        series: [
            {
                type: chartAttr.chartType,
                layout: 'none',//图的布局
                symbolSize: [chartAttr.nodeWidth,chartAttr.nodeHeight], //节点宽和高
                legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
                hoverAnimation : true,//是否开启鼠标悬停节点的显示动画
                roam : false,//不开启鼠标缩放和平移漫游。
                width: chartAttr.seriesWidth, //组件的宽度。
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                label : { //图形上的文本标签
                    show : true,//是否显示标签。
                    position : 'inside',//标签的位置。
                    textStyle : { //标签的字体样式
                        color : '#130c0e', //字体颜色
                        fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight : 'bold',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily : 'sans-serif', //文字的字体系列
                        fontSize : 15, //字体大小
                    }
                },
                itemStyle : {//图形样式
                    color: (dataChangeIndex[0] != -1) ? function (params) {
                        var colorList = [];
                        for (var i = 0; i < data.length; i++) {
                            if (i == dataChangeIndex[0]) {
                                colorList.push(chartAttr.itemColor[1]);
                            }else {
                                colorList.push(chartAttr.itemColor[0]);
                            }
                        }
                        return colorList[params.dataIndex];
                    } : chartAttr.itemColor[0],
                },
                data: data,
                links: chartAttr.chartLinks,
                lineStyle: {
                    opacity:1,
                    width: 3,
                    curveness: 0
                }
            }
        ]
    });
}

/* 改变树前序遍历图表数据和样式：
TreePreorderChart.changeChart(TreePreorderBlockly.hasMoreCode, TreePreorderChart.showChart, TreePreorderChart.arrNow, TreePreorderChart.dataChangeIndex); 
*/
TreePreorderChart.treepreorderChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {

    //重新执行或者结束的时候重置数据
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }

        //清空原始数据和连接关系
        TreePreorderChart.treepreorderObjectArr.splice(0,TreePreorderChart.treepreorderObjectArr.length);
        TreePreorderChart.treepreorderObjectLinks.splice(0,TreePreorderChart.treepreorderObjectLinks.length);
        ustc_vp.utils.sourceToDest(TreePreorderChart.initData,data);
    }

    // console.log(dataChangeIndex);
    
    
    //抽取图表数据
    TreePreorderTools.arrToTreePreorderChartDataObjArr(data, TreePreorderChart.treepreorderObjectArr);
    
    //获得连接
    TreePreorderChart.treepreorderObjectLinks.splice(0, TreePreorderChart.treepreorderObjectLinks.length);
    
    let len = TreePreorderChart.treepreorderObjectArr.length;

    for (let i = 1; i < len; i++) {
        let thisPos = TreePreorderChart.treepreorderObjectArr[i].pos;
        let parentPos = thisPos >> 1;
        if(TreePreorderChart.posIdMap.get(parentPos) == undefined){
            throw Error("当前节点没有父节点");
        }else{
            TreePreorderChart.treepreorderObjectLinks.push({source: TreePreorderChart.posIdMap.get(parentPos), target: TreePreorderChart.treepreorderObjectArr[i].id, label: { normal: { show: true, formatter: TreePreorderChart.treepreorderObjectArr[i].direction} } });
        }
        
    }

    // 在数据改变时设置树前序遍历图表
    TreePreorderChart.setTreePreorderChartOption(chart, TreePreorderChart.treepreorderObjectArr, dataChangeIndex, TreePreorderTools.setGraphAttr(TreePreorderTools.treepreorderAttr));
}
/******************************工作块包***********************************/
/*
主要工作：
    1.Blockly的工作空间初始化
    2.Blockly的输出结果区域（实际可无）
    3.Blockly的展示代码区域（实际可无）
    4.UI更新和代码高亮
    5.函数的功能：自定义API（getBarArrayWrapper），自定义API的添加程序（设置到自定义API列表中customizeApi），注入所有自定义API（initInterpretApi）
    6.函数的名称：自定义API名称(getBarArray)

    注：三个定义
        例：
            1.函数名：getBarArray
            2.函数字符串：getBarArray(arr)
            3.函数定义：getBarArrayWrapper
        会将函数字符串getBarArray(arr)添加到字符串代码中，然后解释器会根据函数名getBarArray对应函数定义getBarArrayWrapper来执行
*/
var TreePreorderBlockly = {};
TreePreorderBlockly.workspace = null;
TreePreorderBlockly.outputArea = null;
TreePreorderBlockly.showCodeArea = null;
TreePreorderBlockly.hasMoreCode = true;
TreePreorderBlockly.highlightPause = false;
TreePreorderBlockly.codeInterpreter = null;
TreePreorderBlockly.latestCode = '';
TreePreorderBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',TreePreorderBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',TreePreorderBlockly.printStrWrapper]
}
*/
TreePreorderBlockly.customizeApi = {};

TreePreorderBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
TreePreorderBlockly.dataClear = function () {
    TreePreorderBlockly.workspace = null;
    TreePreorderBlockly.outputArea = null;
    TreePreorderBlockly.showCodeArea = null;
    TreePreorderBlockly.hasMoreCode = true;
    TreePreorderBlockly.highlightPause = false;
    TreePreorderBlockly.codeInterpreter = null;
    TreePreorderBlockly.latestCode = '';
    TreePreorderBlockly.addCode = '';   // 添加代码字符串
    TreePreorderBlockly.customizeApi = {};
    
    TreePreorderBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}
/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
TreePreorderBlockly.getWorkspaceXML = function (XMLpath) {
    var xmlDoc = null;
    try {
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject('Msxml2.DOMDocument');
            xmlDoc.async = false;
            xmlDoc.load(XMLpath);
        }
        else if (document.implementation && document.implementation.createDocument) {
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", XMLpath, false);
            xmlhttp.send(null);
            xmlDoc = xmlhttp.responseXML.documentElement;
        }
        else {
            throw Error("浏览器无内建的XML解析器！");
        }
    } catch (e) {
        throw Error("XML文件读取失败！" + e);
    }

    if (xmlDoc == null) {
        throw Error("XML文件读取失败！");
    } else {
        console.log("获取xml对象成功！");
    }

    return xmlDoc;
}

/* 初始化Blockly块 */
TreePreorderBlockly.initBlockly = function (blocklyDiv, mediaLocation) {
    console.log("initBlockly");
    
    // 基础配置项
    var options = {
        collapse: true,
        comments: false,
        disable: true,
        maxBlocks: Infinity,
        trashcan: false,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        media: mediaLocation,
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: true,
    };
    return Blockly.inject(blocklyDiv, options);

}

/* 注入用户API */
TreePreorderBlockly.injectCustomizeApi = function(){
    //添加Api
    TreePreorderBlockly.algAddCode();
    //生成添加代码字符串
    TreePreorderBlockly.generateAddCodeToString(TreePreorderBlockly.customizeApi);
}
/* 动态更新展示代码 */
TreePreorderBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
TreePreorderBlockly.resetStepUi = function (clearOutput) {
    TreePreorderBlockly.workspace.highlightBlock(null);
    TreePreorderBlockly.highlightPause = false;

    if (clearOutput) {
        TreePreorderBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
TreePreorderBlockly.highlightBlock = function (id) {
    TreePreorderBlockly.workspace.highlightBlock(id);
    TreePreorderBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
TreePreorderBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        TreePreorderBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(TreePreorderBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in TreePreorderBlockly.customizeApi) {  
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(TreePreorderBlockly.customizeApi[key][1]));
    }
}
/* 添加自定义Api函数 */
TreePreorderBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
TreePreorderBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {  
        TreePreorderBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
TreePreorderBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode;
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    TreePreorderBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    TreePreorderBlockly.resetStepUi(true);
    
}

//=======================================
/* 搜索当前节点在整个树中的位置 */
TreePreorderBlockly.getCurrInTreePosition = function(root, curr){

    //当前节点为树根返回位置1
    if(root == curr){
        TreePreorderChart.dataChangeIndex[0] = 1;
    }else{
        TreePreorderBlockly.dfsInTree(root, curr, 1);
    }
}

/* 深度优先搜索树 */
TreePreorderBlockly.dfsInTree = function(root, curr, pos){
    if(root == curr){
        TreePreorderChart.dataChangeIndex[0] = pos;
        return true;
    }

    //当到叶子节点时还不相同就返回位置0
    if(root == null){
        return false;
    }

    return TreePreorderBlockly.dfsInTree(root.a.left, curr, pos * 2) || TreePreorderBlockly.dfsInTree(root.a.right, curr, pos * 2 + 1);
}

/* 自定义API：获得当前搜索到的位置curr */
TreePreorderBlockly.getCurrWrapper = function(root, curr){

    if (root != undefined && curr != undefined) {

        //获取当前节点在树中的位置放在
        TreePreorderBlockly.getCurrInTreePosition(root, curr);
    
        TreePreorderChart.dataChangeIndex[0] = TreePreorderChart.posIdMap.get(TreePreorderChart.dataChangeIndex[0]);
        
        //返回需要修改数据
        return true;
    }

    return false;
}

/* 自定义API：获得所有树前序遍历变量 */
TreePreorderBlockly.gettreepreorderArgsWrapper = function(root, curr){

    var currFlag = TreePreorderBlockly.getCurrWrapper(root, curr);

    //当前节点发生变化就改变
    if (currFlag) {
        // 填入数据
        //console.log(TreePreorderChart.dataChangeIndex);
        TreePreorderChart.changeChart(TreePreorderBlockly.hasMoreCode, TreePreorderChart.showChart, TreePreorderChart.arrNow, TreePreorderChart.dataChangeIndex);
    }
}

/* 自定义API：控制台打印字符串 */
TreePreorderBlockly.printStrWrapper = function(str){
    console.log(str);
}

/* 树前序遍历类算法需要添加的代码 */
TreePreorderBlockly.treepreorderAlgAddCode = function () {
    TreePreorderBlockly.addApi(TreePreorderBlockly.customizeApi, 'gettreepreorderArgs', 'gettreepreorderArgs(root, curr);\n', TreePreorderBlockly.gettreepreorderArgsWrapper);
    //TreePreorderBlockly.addApi(TreePreorderBlockly.customizeApi, 'myprint', 'myprint(index);\n', TreePreorderBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var TreePreorderTools = {};
//========================================================================
TreePreorderTools.treepreorderAttr = {title: '树前序遍历算法', type: 'graph', nodeWidth: 50, nodeHeight: 50, color: ['#d71345', '#ffe600']};    //普通节点：红，当前节点：黄
//====================================================================================
/* 树节点类 */
TreePreorderTools.TreeNode = function(val, left, right) {
    this.value = val;
    if(this.left == undefined){
       this.left = null;
    }else{
       this.left = left;
    }
    if(this.right == undefined){
       this.right = null;
    }else{
       this.right = right;
    }
}

/* 将数组反序列化为树 */
TreePreorderTools.deserialize = function(nodes){
    if (nodes.length == 0){
       return null;
    }
    let root = new TreePreorderTools.TreeNode(nodes[0]);
    nodes.shift();
    let queue = [root];
    while(queue.length > 0){
        let node = queue.shift();
        let leftval = nodes.shift();
        if(leftval != null){
           node.left = new TreePreorderTools.TreeNode(leftval);
           queue.push(node.left);
        }
        let rightval = nodes.shift();
        if(rightval != null){
           node.right = new TreePreorderTools.TreeNode(rightval);
           queue.push(node.right);
        }
    }
    return root;
}

/* 获得节点在树中的位置 */
TreePreorderTools.getTreeNodePosition = function(root){
    let posArr = [];

    if (root == null) {
        return posArr;
    }
    let queue = [root];
    let idNum = 0;
    posArr.push({id: idNum++, name: "root\n" + root.value, pos: 1, direction: null});

    let tmp = [1];
    while(queue.length > 0){
        let pos = tmp.shift();
        let node = queue.shift();
        let left = node.left;
        if(left != null){
           tmp.push(pos * 2);
           posArr.push({id: idNum++, name: "" + left.value, pos: pos * 2, direction: "left"});
           queue.push(left);
        }

        let right = node.right;
        if(right != null){
            tmp.push(pos * 2 + 1);
            posArr.push({id: idNum++, name: "" + right.value, pos: pos * 2 + 1, direction: "right"});
           queue.push(right);
        }
    }

    return posArr;
}

/* 设置每个节点的显示坐标转换为坐标 */
TreePreorderTools.setTreeNodeCoordinate = function(arrObj){

    //获得树最高的层数
    let topLevel = ustc_vp.utils.getTopY(arrObj[arrObj.length - 1].pos);
    let xyArr = ustc_vp.utils.getTreeCoordinate(topLevel);

    // console.log(xyArr);

    for (let index in arrObj) {
        let pos = arrObj[index].pos;
        arrObj[index].x = xyArr[pos - 1].x;
        arrObj[index].y = xyArr[pos - 1].y;
    }

    return arrObj;
}

/* 获取图表初始化的数据 */
TreePreorderTools.getArrInitData = function(codeStr){
    //从codeStr获取arr=[x,x,...]
    if(codeStr == null || codeStr == undefined || codeStr == ''){
        throw Error("getArrInitData()：获取初始化图表数据失败，Blockly未完全加载！！！");
    }else{
        let codeList = codeStr.split(";"); 
        let arrIndex = -1;

        for(let key in codeList){
            arrIndex = codeList[key].indexOf("deserialize([");
        
            if(arrIndex != -1){
                arrIndex = key;
                break;
            }
        }
        
        if(arrIndex == -1){
            throw Error("getArrInitData()：没有数据！！！");
        }
        let arr = codeList[arrIndex];

        console.log("获取初始数据：" + arr);
        let dateList = arr.split("[")[1].split("]")[0].split(",");
        for(let num in dateList){
            if(dateList[num] != " null"){
                TreePreorderChart.initData.push(parseInt(dateList[num]));
            }else{
                TreePreorderChart.initData.push(null);
            }
        }

        ustc_vp.utils.sourceToDest(TreePreorderChart.initData,TreePreorderChart.arrNow);
    }
}

/* 将数组转化为树前序遍历算法的图表数据对象组数 */
TreePreorderTools.arrToTreePreorderChartDataObjArr = function(arr, objArr){

    let objLen = objArr.length;

    // console.log(objArr);
    // console.log(arr);

    if(objLen == 0){
        let tmp = [];
        ustc_vp.utils.sourceToDest(arr, tmp)
        let root = TreePreorderTools.deserialize(tmp);
        ustc_vp.utils.sourceToDest(TreePreorderTools.setTreeNodeCoordinate(TreePreorderTools.getTreeNodePosition(root)), objArr);

    }

    // console.log(objArr);
}

/* 设置graph数据和连接 */
TreePreorderTools.setGraphData = function (data, codeStr, treepreorderObjectArr,treepreorderObjectLinks){

    //获取到初始数据设置arrNow
    TreePreorderTools.getArrInitData(codeStr);

    //抽取图标数据
    TreePreorderTools.arrToTreePreorderChartDataObjArr(data, treepreorderObjectArr);

    //获得连接
    let len = treepreorderObjectArr.length;
    
    //生成一个Map对象保存（pos,id）关系
    for (let i = 0; i < len; i++) {
        TreePreorderChart.posIdMap.set(treepreorderObjectArr[i].pos, treepreorderObjectArr[i].id);
    }

    // console.log(TreePreorderChart.posIdMap);
    for (let i = 1; i < len; i++) {
        let thisPos = treepreorderObjectArr[i].pos;
        let parentPos = thisPos >> 1;
        if(TreePreorderChart.posIdMap.get(parentPos) == undefined){
            throw Error("当前节点没有父节点");
        }else{
            treepreorderObjectLinks.push({source: TreePreorderChart.posIdMap.get(parentPos), target: treepreorderObjectArr[i].id, label: { normal: { show: true, formatter: treepreorderObjectArr[i].direction} } });
        }
        
    }
}

/* 设置graph属性 */
TreePreorderTools.setGraphAttr = function (attr){
    var chartAttr = {
        chartTitle: attr.title,
        chartType: attr.type,
        chartData: TreePreorderChart.treepreorderObjectArr,
        chartLinks: TreePreorderChart.treepreorderObjectLinks,
        nodeWidth: attr.nodeWidth,
        nodeHeight: attr.nodeHeight,
        itemColor: attr.color
    }
    return chartAttr;
}

/* 获得Graph图数组改变的索引值 */
TreePreorderTools.getGraphChangeIndex = function (newData, oldData) {

    //当插入树前序遍历元素时
    if (newData.length == oldData.length + 1) {
        return true;
    }
    
    return false;   
}

/******************************执行包***********************************/
var TreePreorderExecute = {};

/* 执行设置Blockly */
TreePreorderExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {
    
    // 定义Blockly工作空间
    TreePreorderBlockly.workspace = TreePreorderBlockly.initBlockly(blocklyDiv, mediaPath);

    // 通过xml文件路径获取xml对象
    let workspaceXML = TreePreorderBlockly.getWorkspaceXML(XMLpath);

    // 定义预定义块
    Blockly.Xml.domToWorkspace(workspaceXML, TreePreorderBlockly.workspace);  

}

/* 执行设置代码输出 */
TreePreorderExecute.setOutputArea = function(outputDiv){

    //定义结果输出区域
    TreePreorderBlockly.outputArea = outputDiv;  
}

/* 执行设置按钮功能 */
TreePreorderExecute.setButton = function(runButton, stopButton, continueButton, overButton){
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
TreePreorderExecute.setShowCodeArea = function(showCodeDiv){

    TreePreorderExecute.setCodeInject();
    TreePreorderBlockly.showCodeArea = showCodeDiv;
    TreePreorderBlockly.workspace.addChangeListener(TreePreorderBlockly.updateShowCode(TreePreorderBlockly.workspace, TreePreorderBlockly.showCodeArea));

}
/* 设置代码注入 */
TreePreorderExecute.setCodeInject = function(){
    //定义注入的API
    TreePreorderBlockly.algAddCode = TreePreorderBlockly.treepreorderAlgAddCode;

    //注入API
    TreePreorderBlockly.injectCustomizeApi();

    //生成新代码
    TreePreorderBlockly.generateCodeAndLoadIntoInterpreter(TreePreorderBlockly.addCode, TreePreorderBlockly.workspace);
    
    //工作空间绑定监听事件
    TreePreorderBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            TreePreorderBlockly.generateCodeAndLoadIntoInterpreter(TreePreorderBlockly.addCode, TreePreorderBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
TreePreorderExecute.setShowChart = function(showDiv){
    
    TreePreorderChart.showChart = TreePreorderChart.initTreePreorderChart(showDiv);
    TreePreorderChart.dataChangeIndex = TreePreorderChart.treepreorderDataChangeIndex;
    TreePreorderChart.changeChart = TreePreorderChart.treepreorderChangeChart;
}

/* 执行赋值 */
TreePreorderExecute.setExtend = function(){
    ustc_vp.Chart = TreePreorderChart;
    ustc_vp.Blockly = TreePreorderBlockly;
    ustc_vp.tools = TreePreorderTools;
    ustc_vp.Execute = TreePreorderExecute;

    //清空图表和块数据
    TreePreorderChart.dataClear();
    TreePreorderBlockly.dataClear();
}