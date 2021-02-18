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
var InsertSortChart = {};
// 定义当前图表数据和改变索引
InsertSortChart.initData = [];
InsertSortChart.arrNow = [];
InsertSortChart.showChart = null;
InsertSortChart.dataChangeIndex = null;

InsertSortChart.changeChart = null;   //(函数)charts改变时的函数

//=================================================================================
InsertSortChart.insertDataChangeIndex = [-1, -1];
//=================================================================================
/* 清除所有数据 */
InsertSortChart.dataClear = function () {
    InsertSortChart.initData = [];
    InsertSortChart.arrNow = [];
    InsertSortChart.showChart = null;
    InsertSortChart.dataChangeIndex = null;
    
    InsertSortChart.changeChart = null;   //(函数)charts改变时的函数
    InsertSortChart.insertDataChangeIndex = [-1, -1];
}
/* 获取图表初始化的数据 */
InsertSortChart.getArrInitData = function(codeStr){
    //从InsertSortBlockly.latestCode获取arr=[x,x,...]
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
            InsertSortChart.initData.push(parseInt(dateList[num]));
        }

        ustc_vp.utils.sourceToDest(InsertSortChart.initData,InsertSortChart.arrNow);
    }
}

/* 初始化排序类图表 */
InsertSortChart.initSortChart = function (showItem, chartAttr) {
    console.log("initSortChart");
    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(showItem);

    console.log(chartAttr.chartTitle);
    // 指定图表的配置项和数据
    var chartOption = {
        title: {
            text: chartAttr.chartTitle
        },
        tooltip: {},
        legend: {
            data: []
        },
        xAxis: {
            show: false,
            data: []
        },
        yAxis: {
            show: false,
        },
        series: [{
            name: chartAttr.chartName,
            type: chartAttr.chartType,
            data: chartAttr.charData,
            itemStyle: {
                normal: {
                    color: chartAttr.itemColor,
                    label: {
                        show: true, //开启显示
                        position: chartAttr.labPos, //在上方显示
                        textStyle: { //数值样式
                            color: chartAttr.textColor,
                            fontSize: 15
                        }
                    }
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(chartOption);
    return myChart;
}

/* 数据改变时设置排序类图表 */
InsertSortChart.setSortChartOption = function (chart, data, dataChangeIndex, chartAttr) {
    chart.setOption({
        xAxis: {
            show: false,
            data: []
        },
        series: [{
            // 根据名字对应到相应的系列
            name: chartAttr.name,
            data: data,
            itemStyle: {
                normal: {
                    color: (dataChangeIndex[0] != -1) && (dataChangeIndex[1] != -1) ? function (params) {
                        var colorList = [];
                        for (var i = 0; i < data.length; i++) {
                            if (i == dataChangeIndex[0] || i == dataChangeIndex[1]) {
                                colorList.push(chartAttr.color[1]);
                            }
                            else {
                                colorList.push(chartAttr.color[0]);
                            }
                        }

                        return colorList[params.dataIndex]
                    } : chartAttr.color[0],
                    label: {
                        show: true, //开启显示
                        position: chartAttr.pos, //在上方显示
                        textStyle: { //数值样式
                            color: chartAttr.textColor,
                            fontSize: 15
                        }
                    }
                }
            }
        }]
    });
}

/* 初始化插入排序图表 */
InsertSortChart.initInsertChart = function (showItem) {
    return InsertSortChart.initSortChart(showItem, InsertSortTools.setBarData(InsertSortTools.insertAttr, InsertSortChart.arrNow));
}

/* 改变插入排序图表数据和样式 */
InsertSortChart.insertChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }
        ustc_vp.utils.sourceToDest(InsertSortChart.initData,data);
    }
    //在数据改变时设置插入排序图表
    InsertSortChart.setSortChartOption(chart, data, dataChangeIndex,InsertSortTools.insertAttr);
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
var InsertSortBlockly = {};
InsertSortBlockly.workspace = null;
InsertSortBlockly.outputArea = null;
InsertSortBlockly.showCodeArea = null;
InsertSortBlockly.hasMoreCode = true;
InsertSortBlockly.highlightPause = false;
InsertSortBlockly.codeInterpreter = null;
InsertSortBlockly.latestCode = '';
InsertSortBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',InsertSortBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',InsertSortBlockly.printStrWrapper]
}
*/
InsertSortBlockly.customizeApi = {};

InsertSortBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
InsertSortBlockly.dataClear = function () {
    InsertSortBlockly.workspace = null;
    InsertSortBlockly.outputArea = null;
    InsertSortBlockly.showCodeArea = null;
    InsertSortBlockly.hasMoreCode = true;
    InsertSortBlockly.highlightPause = false;
    InsertSortBlockly.codeInterpreter = null;
    InsertSortBlockly.latestCode = '';
    InsertSortBlockly.addCode = '';   // 添加代码字符串
    InsertSortBlockly.customizeApi = {};
    
    InsertSortBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}
/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
InsertSortBlockly.getWorkspaceXML = function (XMLpath) {
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
InsertSortBlockly.initBlockly = function (blocklyDiv, mediaLocation) {
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
InsertSortBlockly.injectCustomizeApi = function(){
    //添加Api
    InsertSortBlockly.algAddCode();
    //生成添加代码字符串
    InsertSortBlockly.generateAddCodeToString(InsertSortBlockly.customizeApi);
}
/* 动态更新展示代码 */
InsertSortBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
InsertSortBlockly.resetStepUi = function (clearOutput) {
    InsertSortBlockly.workspace.highlightBlock(null);
    InsertSortBlockly.highlightPause = false;

    if (clearOutput) {
        InsertSortBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
InsertSortBlockly.highlightBlock = function (id) {
    InsertSortBlockly.workspace.highlightBlock(id);
    InsertSortBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
InsertSortBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        InsertSortBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(InsertSortBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in InsertSortBlockly.customizeApi) {  
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(InsertSortBlockly.customizeApi[key][1]));
    }
}

/* 添加自定义Api函数 */
InsertSortBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
InsertSortBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {  
        InsertSortBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
InsertSortBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode;
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    InsertSortBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    InsertSortBlockly.resetStepUi(true);
    
}

//=======================================
/* 自定义API：获得柱状图数组函数 */
InsertSortBlockly.getBarArrayWrapper = function (arr) {
    if (arr != undefined) {
        var arrChange = [];

        ustc_vp.utils.objToArr(arr.a, arrChange);

        if (InsertSortTools.getBarChangeIndex(arrChange, InsertSortChart.arrNow, InsertSortChart.dataChangeIndex)) {
            InsertSortChart.arrNow = [].concat(arrChange);

            // 填入数据
            InsertSortChart.changeChart(InsertSortBlockly.hasMoreCode, InsertSortChart.showChart, InsertSortChart.arrNow, InsertSortChart.dataChangeIndex);
        }
    }
}
/* 自定义API：控制台打印字符串 */
InsertSortBlockly.printStrWrapper = function(str){
    console.log(str);
}
/* 排序类算法需要添加的代码 */
InsertSortBlockly.sortAlgAddCode = function () {
    InsertSortBlockly.addApi(InsertSortBlockly.customizeApi, 'getBarArray', 'getBarArray(arr);\n', InsertSortBlockly.getBarArrayWrapper);
    //InsertSortBlockly.addApi(InsertSortBlockly.customizeApi, 'myprint', 'myprint(%1);\n', InsertSortBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var InsertSortTools = {};
//========================================================================
InsertSortTools.insertAttr = { title: '插入排序', name: 'InsertSort', type: 'bar', color: ['#409EFF', 'red'], pos: 'top', textColor: 'black' };
//====================================================================================
/* 设置柱状图数据和属性 */
InsertSortTools.setBarData = function (attr, data) {

    //获取到数据设置arrNow
    InsertSortChart.getArrInitData(InsertSortBlockly.latestCode);

    var chartAttr = {
        chartTitle: attr.title,
        chartName: attr.name,
        chartType: attr.type,
        charData: data,
        itemColor: attr.color[0],
        labPos: attr.pos,
        textColor: attr.textColor
    }
    return chartAttr;
}

/* 获得柱状图数组改变的索引值 */
InsertSortTools.getBarChangeIndex = function (newData, oldData, dataChangeIndex) {

    for (let i = 0; i < dataChangeIndex.length - 1; i++) {
        dataChangeIndex[i] = dataChangeIndex[i + 1];
    }
    if (newData.length != oldData.length) {
        return false;
    } else {
        for (let i = 0; i < newData.length; i++) {
            if (newData[i] != oldData[i]) {
                dataChangeIndex[dataChangeIndex.length - 1] = i;
                return true;
            }
        }
        return false;
    }
}

/******************************执行包***********************************/
var InsertSortExecute = {};

/* 执行设置Blockly */
InsertSortExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {
    
    // 定义Blockly工作空间
    InsertSortBlockly.workspace = InsertSortBlockly.initBlockly(blocklyDiv, mediaPath);

    // 通过xml文件路径获取xml对象
    let workspaceXML = InsertSortBlockly.getWorkspaceXML(XMLpath);

    // 定义预定义块
    Blockly.Xml.domToWorkspace(workspaceXML, InsertSortBlockly.workspace);  

}

/* 执行设置代码输出 */
InsertSortExecute.setOutputArea = function(outputDiv){

    //定义结果输出区域
    InsertSortBlockly.outputArea = outputDiv;  
}

/* 执行设置按钮功能 */
InsertSortExecute.setButton = function(runButton, stopButton, continueButton, overButton){
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
InsertSortExecute.setShowCodeArea = function(showCodeDiv){

    InsertSortExecute.setCodeInject();
    InsertSortBlockly.showCodeArea = showCodeDiv;
    InsertSortBlockly.workspace.addChangeListener(InsertSortBlockly.updateShowCode(InsertSortBlockly.workspace, InsertSortBlockly.showCodeArea));

}

/* 设置代码注入 */
InsertSortExecute.setCodeInject = function(){
    //定义注入的API
    InsertSortBlockly.algAddCode = InsertSortBlockly.sortAlgAddCode;

    //注入API
    InsertSortBlockly.injectCustomizeApi();

    //生成新代码
    InsertSortBlockly.generateCodeAndLoadIntoInterpreter(InsertSortBlockly.addCode, InsertSortBlockly.workspace);
    
    //工作空间绑定监听事件
    InsertSortBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            InsertSortBlockly.generateCodeAndLoadIntoInterpreter(InsertSortBlockly.addCode, InsertSortBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
InsertSortExecute.setShowChart = function(showDiv){
    
    InsertSortChart.showChart = InsertSortChart.initInsertChart(showDiv);
    InsertSortChart.dataChangeIndex = InsertSortChart.insertDataChangeIndex;
    InsertSortChart.changeChart = InsertSortChart.insertChangeChart;
}

/* 执行赋值 */
InsertSortExecute.setExtend = function(){
    ustc_vp.Chart = InsertSortChart;
    ustc_vp.Blockly = InsertSortBlockly;
    ustc_vp.tools = InsertSortTools;
    ustc_vp.Execute = InsertSortExecute;

    //清空图表和块数据
    InsertSortChart.dataClear();
    InsertSortBlockly.dataClear();
}