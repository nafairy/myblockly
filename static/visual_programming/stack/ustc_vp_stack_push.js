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
var StackPushChart = {};
// 定义当前图表数据和改变索引
StackPushChart.initData = [];
StackPushChart.arrNow = [];
StackPushChart.showChart = null;
StackPushChart.dataChangeIndex = null;
StackPushChart.stackObjectArr = [];

StackPushChart.changeChart = null;   //(函数)图表改变时的执行函数

//=================================================================================
StackPushChart.stackDataChangeIndex = [-1];  //图表改变时记录变化索引
//=================================================================================
/* 清除所有数据 */
StackPushChart.dataClear = function () {
    StackPushChart.initData = [];
    StackPushChart.arrNow = [];
    StackPushChart.showChart = null;
    StackPushChart.dataChangeIndex = null;
    StackPushChart.stackObjectArr = [];

    StackPushChart.changeChart = null;   //(函数)图表改变时的执行函数
    StackPushChart.stackDataChangeIndex = [-1];  //图表改变时记录变化索引
}
/* 获取图表初始化的数据 */
StackPushChart.getArrInitData = function(codeStr){
    //从codeStr获取arr=[x,x,...]
    if(codeStr == null || codeStr == undefined || codeStr == ''){
        throw Error("getArrInitData()：获取初始化图表数据失败，Blockly未完全加载！！！");
    }else{
        let codeList = codeStr.split(";");
        let arrIndex = -1;

        for(let key in codeList){
            arrIndex = codeList[key].indexOf("arr = [");

            if(arrIndex != -1){
                arrIndex = key;
                break;
            }
        }

        if(arrIndex == -1){
            throw Error("getArrInitData()：没有数据！！！");
        }
        let arr = codeList[arrIndex];

        let dateList = arr.split("[")[1].split("]")[0].split(",");
        for(let num in dateList){
            if(isNaN(dateList[num])){
                StackPushChart.initData.push(parseInt(dateList[num]));
            }
        }

        ustc_vp.utils.sourceToDest(StackPushChart.initData,StackPushChart.arrNow);
    }
}

/* 初始化栈图表的数据和属性 */
StackPushChart.initStackDataChart = function (showItem, chartAttr) {
    console.log("initStackChart");

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(showItem);
    console.log(chartAttr.chartTitle);

    // 指定图表的配置项和数据
    var chartOption = {
        title: {
            text: chartAttr.chartTitle
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
                height: chartAttr.seriesHeight, //组件的高度。
                bottom: 0,  //组件离容器下侧的距离。
                symbol:'rect', //节点形状
                label : { //图形上的文本标签
                    show : true,//是否显示标签。
                    position : 'inside',//标签的位置。
                    textStyle : { //标签的字体样式
                        color : '#ffffff', //字体颜色
                        fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight : 'normal',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily : 'sans-serif', //文字的字体系列
                        fontSize : 15, //字体大小
                    }
                },
                itemStyle : {//图形样式
                    color: chartAttr.itemColor[0],
                    borderType : 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    borderColor : 'black', //设置图形边框颜色
                    borderWidth : 2, //图形的描边线宽。
                },
                data: chartAttr.charData
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(chartOption);
    return myChart;
}

/* 初始化栈算法图表 */
StackPushChart.initStackChart = function (showItem) {
    StackPushTools.setGraphData(StackPushTools.stackAttr, StackPushChart.arrNow, StackPushBlockly.latestCode, StackPushChart.stackObjectArr)
    return StackPushChart.initStackDataChart(showItem, StackPushTools.setGraphAttr(StackPushTools.stackAttr));
}

/* 数据改变时设置栈图表 */
StackPushChart.setStackChartOption = function (chart, data, dataChangeIndex, chartAttr) {
    chart.setOption({
        title: {
            text: chartAttr.chartTitle,
            subtext: "当前操作：" + (dataChangeIndex[0] == 1 ? "入栈" : (dataChangeIndex[0] == 2 ? "出栈" : "")), //副标题
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
                height: chartAttr.seriesHeight, //组件的高度。
                bottom: 0,  //组件离容器下侧的距离。
                symbol:'rect', //节点形状
                label : { //图形上的文本标签
                    show : true,//是否显示标签。
                    position : 'inside',//标签的位置。
                    textStyle : { //标签的字体样式
                        color : '#ffffff', //字体颜色
                        fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight : 'normal',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily : 'sans-serif', //文字的字体系列
                        fontSize : 15, //字体大小
                    }
                },
                itemStyle : {//图形样式
                    color: chartAttr.itemColor[0],
                    borderType : 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    borderColor : 'black', //设置图形边框颜色
                    borderWidth : 2, //图形的描边线宽。
                },
                data: data
            }
        ]
    });
}

/* 改变栈图表数据和样式：
StackPushChart.changeChart(StackPushBlockly.hasMoreCode, StackPushChart.showChart, StackPushChart.arrNow, StackPushChart.dataChangeIndex);
*/
StackPushChart.stackChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {

    //重新执行或者结束的时候重置数据
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }

        ustc_vp.utils.sourceToDest(StackPushChart.initData,data);
    }

    //修改容器高度
    StackPushTools.stackAttr.seriesHeight =  StackPushTools.stackAttr.nodeHeight * (data.length - 1) + 1;

    //抽取图标数据
    StackPushTools.arrToStackChartDataObjArr(data, StackPushChart.stackObjectArr, StackPushTools.stackAttr.nodeHeight);

    // 在数据改变时设置栈图表
    StackPushChart.setStackChartOption(chart, StackPushChart.stackObjectArr, dataChangeIndex, StackPushTools.setGraphAttr(StackPushTools.stackAttr));
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
var StackPushBlockly = {};
StackPushBlockly.workspace = null;
StackPushBlockly.outputArea = null;
StackPushBlockly.showCodeArea = null;
StackPushBlockly.hasMoreCode = true;
StackPushBlockly.highlightPause = false;
StackPushBlockly.codeInterpreter = null;
StackPushBlockly.latestCode = '';
StackPushBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',StackPushBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',StackPushBlockly.printStrWrapper]
}
*/
StackPushBlockly.customizeApi = {};

StackPushBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
StackPushBlockly.dataClear = function () {
    StackPushBlockly.workspace = null;
    StackPushBlockly.outputArea = null;
    StackPushBlockly.showCodeArea = null;
    StackPushBlockly.hasMoreCode = true;
    StackPushBlockly.highlightPause = false;
    StackPushBlockly.codeInterpreter = null;
    StackPushBlockly.latestCode = '';
    StackPushBlockly.addCode = '';   // 添加代码字符串
    StackPushBlockly.customizeApi = {};

    StackPushBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}
/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
StackPushBlockly.getWorkspaceXML = function (XMLpath) {
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
StackPushBlockly.initBlockly = function (blocklyDiv, mediaLocation,workspaceXML) {
    console.log("initBlockly");

    // 基础配置项
    var options = {
        toolbox:workspaceXML,
        // collapse: true,
        // comments: false,
        // disable: true,
        maxBlocks: Infinity,
        // trashcan: false,
        // horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        media: mediaLocation,
        // rtl: false,
        // scrollbars: true,
        // sounds: true,
        // oneBasedIndex: true,
        // zoom:
        //     {controls: true,
        //         wheel: true,
        //         startScale: 1.0,
        //         maxScale: 3,
        //         minScale: 0.3,
        //         scaleSpeed: 1.2,
        //         pinch: true}
    };
    return Blockly.inject(blocklyDiv, options);

}

/* 注入用户API */
StackPushBlockly.injectCustomizeApi = function(){
    //添加Api
    StackPushBlockly.algAddCode();
    //生成添加代码字符串
    StackPushBlockly.generateAddCodeToString(StackPushBlockly.customizeApi);
}
/* 动态更新展示代码 */
StackPushBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
StackPushBlockly.resetStepUi = function (clearOutput) {
    StackPushBlockly.workspace.highlightBlock(null);
    StackPushBlockly.highlightPause = false;

    if (clearOutput) {
        StackPushBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
StackPushBlockly.highlightBlock = function (id) {
    StackPushBlockly.workspace.highlightBlock(id);
    StackPushBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
StackPushBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        StackPushBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(StackPushBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in StackPushBlockly.customizeApi) {
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(StackPushBlockly.customizeApi[key][1]));
    }
}
/* 添加自定义Api函数 */
StackPushBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
StackPushBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {
        StackPushBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
StackPushBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.STATEMENT_SUFFIX = addCode;
    // Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode;
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    StackPushBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    StackPushBlockly.resetStepUi(true);

}

//=======================================

/* 自定义API：控制台打印字符串 */
StackPushBlockly.printStrWrapper = function(str){
    console.log(str);
}

/* 自定义API：获得Graph图数组函数 */
StackPushBlockly.getGraphArrayWrapper = function (arr) {
    if (arr != undefined) {
        var arrChange = [];

        ustc_vp.utils.objToArr(arr.a, arrChange);

        //图表改变时执行内部语句
        if (StackPushTools.getGraphChangeIndex(arrChange, StackPushChart.arrNow, StackPushChart.dataChangeIndex)) {

            StackPushChart.arrNow.splice(0,StackPushChart.arrNow.length);
            for (let i = 0; i < arrChange.length; i++) {
                StackPushChart.arrNow.push(arrChange[i]) ;
            }

            // 填入数据
            StackPushChart.changeChart(StackPushBlockly.hasMoreCode, StackPushChart.showChart, StackPushChart.arrNow, StackPushChart.dataChangeIndex);
        }
    }
}
/* 栈类算法需要添加的代码 */
StackPushBlockly.stackAlgAddCode = function () {
    StackPushBlockly.addApi(StackPushBlockly.customizeApi, 'getGraphArray', 'getGraphArray(arr);\n', StackPushBlockly.getGraphArrayWrapper);
    //StackPushBlockly.addApi(StackPushBlockly.customizeApi, 'myprint', 'myprint(%1);\n', StackPushBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var StackPushTools = {};
//========================================================================
StackPushTools.stackAttr = {title: '栈基本操作', type: 'graph', nodeWidth: 80, nodeHeight: 50, seriesHeight: 0,color: ['#409EFF', 'red']};
//====================================================================================
/* 将数组转化为栈算法的图表数据对象组数 */
StackPushTools.arrToStackChartDataObjArr = function(arr,objArr,size){

    //清空传入objArr
    objArr.splice(0,objArr.length);

    //使用arr数据设置objArr
    let arrLen = arr.length;

    //设置显示位置
    let pos = size * (arrLen - 1) + 1;

    if(arrLen == 1){
        StackPushChart.stackObjectArr.push({id: 0, name:'栈底,栈顶：\n'+ arr[0],x: 300,y: pos});
    }else{
        for(let i = 0; i < arrLen; i++){
            if(i == 0){
                StackPushChart.stackObjectArr.push({id: i, name: '栈底：' + arr[i], x: 300, y: pos - size * i});
            }else if(i == arrLen - 1){
                StackPushChart.stackObjectArr.push({id: i, name: '栈顶：' + arr[i], x: 300, y: pos - size * i});
            }else{
                StackPushChart.stackObjectArr.push({id: i, name: '' + arr[i], x: 300, y: pos - size * i});
            }
        }
    }

}

/* 设置graph数据 */
StackPushTools.setGraphData = function (attr, data, codeStr, stackObjectArr){

    //获取到数据设置arrNow
    StackPushChart.getArrInitData(codeStr);

    //设置容器Height
    attr.seriesHeight = attr.nodeHeight * (data.length - 1) + 1;

    //抽取图标数据
    StackPushTools.arrToStackChartDataObjArr(data, stackObjectArr, attr.nodeHeight);

}

/* 设置graph属性 */
StackPushTools.setGraphAttr = function (attr){
    var chartAttr = {
        chartTitle: attr.title,
        chartType: attr.type,
        charData: StackPushChart.stackObjectArr,
        nodeWidth: attr.nodeWidth,
        nodeHeight: attr.nodeHeight,
        seriesHeight: attr.seriesHeight,
        itemColor: attr.color
    }
    return chartAttr;
}

/* 获得Graph图数组改变的索引值 */
StackPushTools.getGraphChangeIndex = function (newData, oldData, dataChangeIndex) {

    //如果是入栈
    if(newData.length == oldData.length + 1){
        dataChangeIndex[0] = 1;
        return true;
    }else{  //其他情况，dataChangeIndex置零

        //出栈
        if(newData.length == oldData.length - 1){
            dataChangeIndex[0] = 2;
        }else{
            dataChangeIndex[0] = -1;
        }

        //数据未改变不需要更新图表，返回false
        if (newData.length == oldData.length) {
            let flag = false;
            for (let i = 0; i < newData.length; i++) {
                if (newData[i] != oldData[i]) {
                    flag = true;
                    break;
                }
            }

            return flag;
        }

        //数据不同时改变图表，返回true
        return true;
    }


}

/******************************执行包***********************************/
var StackPushExecute = {};

/* 执行设置Blockly */
StackPushExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {

    // 通过xml文件路径获取xml对象
    let workspaceXML = StackPushBlockly.getWorkspaceXML(XMLpath);
    let initworkspaceXML=StackPopBlockly.getWorkspaceXML("static/xml/stacks/stack_push_init_workspace.xml");
    // 定义Blockly工作空间
    StackPushBlockly.workspace = StackPushBlockly.initBlockly(blocklyDiv, mediaPath,workspaceXML);

    // 定义预定义块
    Blockly.Xml.domToWorkspace(initworkspaceXML, StackPushBlockly.workspace);
    return StackPushBlockly.workspace;

}

/* 执行设置代码输出 */
StackPushExecute.setOutputArea = function(outputDiv){

    //定义结果输出区域
    StackPushBlockly.outputArea = outputDiv;
}

/* 执行设置按钮功能 */
StackPushExecute.setButton = function(runButton, stopButton, continueButton, overButton){
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
StackPushExecute.setShowCodeArea = function(showCodeDiv){

    StackPushExecute.setCodeInject();
    StackPushBlockly.showCodeArea = showCodeDiv;
    StackPushBlockly.workspace.addChangeListener(StackPushBlockly.updateShowCode(StackPushBlockly.workspace, StackPushBlockly.showCodeArea));

}

/* 设置代码注入 */
StackPushExecute.setCodeInject = function(){
    //定义注入的API
    StackPushBlockly.algAddCode = StackPushBlockly.stackAlgAddCode;

    //注入API
    StackPushBlockly.injectCustomizeApi();

    //生成新代码
    StackPushBlockly.generateCodeAndLoadIntoInterpreter(StackPushBlockly.addCode, StackPushBlockly.workspace);

    //工作空间绑定监听事件
    StackPushBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            StackPushBlockly.generateCodeAndLoadIntoInterpreter(StackPushBlockly.addCode, StackPushBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
StackPushExecute.setShowChart = function(showDiv){

    StackPushChart.showChart = StackPushChart.initStackChart(showDiv);
    StackPushChart.dataChangeIndex = StackPushChart.stackDataChangeIndex;
    StackPushChart.changeChart = StackPushChart.stackChangeChart;
}

/* 执行赋值 */
StackPushExecute.setExtend = function(){
    ustc_vp.Chart = StackPushChart;
    ustc_vp.Blockly = StackPushBlockly;
    ustc_vp.tools = StackPushTools;
    ustc_vp.Execute = StackPushExecute;

    //清空图表和块数据
    StackPushChart.dataClear();
    StackPushBlockly.dataClear();
}
