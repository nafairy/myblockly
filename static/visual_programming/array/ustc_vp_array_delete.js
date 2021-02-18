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
    } else if (typeof (ustc_vp) == 'undefined') {
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
var ArrayDeleteChart = {};
// 定义当前图表数据和改变索引
ArrayDeleteChart.initData = [];
ArrayDeleteChart.arrNow = [];
ArrayDeleteChart.showChart = null;
ArrayDeleteChart.dataChangeIndex = null;
ArrayDeleteChart.arrayObjectArr = [];

ArrayDeleteChart.changeChart = null;   //(函数)图表改变时的执行函数

//=================================================================================
ArrayDeleteChart.arrayDataChangeIndex = [-1];  //图表改变时记录变化索引
ArrayDeleteChart.arrayDeleteIndex = -1;     //数组删除的位置
//=================================================================================
/* 清除所有数据 */
ArrayDeleteChart.dataClear = function () {
    ArrayDeleteChart.initData = [];
    ArrayDeleteChart.arrNow = [];
    ArrayDeleteChart.showChart = null;
    ArrayDeleteChart.dataChangeIndex = null;
    ArrayDeleteChart.arrayObjectArr = [];

    ArrayDeleteChart.changeChart = null;   //(函数)图表改变时的执行函数
    ArrayDeleteChart.arrayDataChangeIndex = [-1];  //图表改变时记录变化索引
    ArrayDeleteChart.arrayDeleteIndex = -1;     //数组删除的位置
}

/* 获取图表初始化的数据 */
ArrayDeleteChart.getArrInitData = function (codeStr) {
    //从codeStr获取arr=[x,x,...]
    if (codeStr == null || codeStr == undefined || codeStr == '') {
        throw Error("getArrInitData()：获取初始化图表数据失败，Blockly未完全加载！！！");
    } else {
        let codeList = codeStr.split(";");
        let arrIndex = -1;

        for (let key in codeList) {
            arrIndex = codeList[key].indexOf("arr = [");

            if (arrIndex != -1) {
                arrIndex = key;
                break;
            }
        }

        if (arrIndex == -1) {
            throw Error("getArrInitData()：没有数据！！！");
        }
        let arr = codeList[arrIndex];

        let dateList = arr.split("[")[1].split("]")[0].split(",");
        for (let num in dateList) {
            ArrayDeleteChart.initData.push(parseInt(dateList[num]));
        }

        ustc_vp.utils.sourceToDest(ArrayDeleteChart.initData, ArrayDeleteChart.arrNow);
    }
}

/* 初始化数组图表的数据和属性 */
ArrayDeleteChart.initArrayDataChart = function (showItem, chartAttr) {
    console.log("initArrayChart");

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(showItem);
    console.log(chartAttr.chartTitle);

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
                symbolSize: [chartAttr.nodeWidth, chartAttr.nodeHeight], //节点宽和高
                legendHoverLink: true,//是否启用图例 hover(悬停) 时的联动高亮。
                hoverAnimation: true,//是否开启鼠标悬停节点的显示动画
                roam: false,//不开启鼠标缩放和平移漫游。
                width: chartAttr.seriesWidth, //组件的宽度。
                symbol: 'rect', //节点形状
                label: { //图形上的文本标签
                    show: true,//是否显示标签。
                    position: 'inside',//标签的位置。
                    textStyle: { //标签的字体样式
                        color: '#ffffff', //字体颜色
                        fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight: 'normal',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily: 'sans-serif', //文字的字体系列
                        fontSize: 15, //字体大小
                    }
                },
                itemStyle: {//图形样式
                    color: chartAttr.itemColor[0],
                    borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    borderColor: 'black', //设置图形边框颜色
                    borderWidth: 2, //图形的描边线宽。
                },
                data: chartAttr.charData
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(chartOption);
    return myChart;
}

/* 初始化数组算法图表 */
ArrayDeleteChart.initArrayChart = function (showItem) {
    ArrayDeleteTools.setGraphData(ArrayDeleteTools.arrayAttr, ArrayDeleteChart.arrNow, ArrayDeleteBlockly.latestCode, ArrayDeleteChart.arrayObjectArr);
    return ArrayDeleteChart.initArrayDataChart(showItem, ArrayDeleteTools.setGraphAttr(ArrayDeleteTools.arrayAttr));
}

/* 修改副标题函数 */
ArrayDeleteChart.changeSubtext = function () {
    var str = "";
    if (ArrayDeleteChart.arrayDeleteIndex != -1) {
        str = "删除的位置为：" + ArrayDeleteChart.arrayDeleteIndex;
    } else {
        str = "";
    }

    return str;
}

/* 数据改变时设置数组图表 */
ArrayDeleteChart.setArrayChartOption = function (chart, data, dataChangeIndex, chartAttr) {

    chart.setOption({
        title: {
            text: chartAttr.chartTitle,
            subtext: ArrayDeleteChart.changeSubtext(), //副标题 
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
                symbolSize: [chartAttr.nodeWidth, chartAttr.nodeHeight], //节点宽和高
                legendHoverLink: true,//是否启用图例 hover(悬停) 时的联动高亮。
                hoverAnimation: true,//是否开启鼠标悬停节点的显示动画
                roam: false,//不开启鼠标缩放和平移漫游。
                width: chartAttr.seriesWidth, //组件的宽度。
                symbol: 'rect', //节点形状
                label: { //图形上的文本标签
                    show: true,//是否显示标签。
                    position: 'inside',//标签的位置。
                    textStyle: { //标签的字体样式
                        color: '#ffffff', //字体颜色
                        fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight: 'normal',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily: 'sans-serif', //文字的字体系列
                        fontSize: 15, //字体大小
                    }
                },
                itemStyle: {//图形样式
                    color: (dataChangeIndex[0] != -1) ? function (params) {
                        var colorList = [];
                        for (var i = 0; i < data.length; i++) {
                            if (i == dataChangeIndex[0]) {
                                colorList.push(chartAttr.itemColor[1]);
                            }
                            else {
                                colorList.push(chartAttr.itemColor[0]);
                            }
                        }

                        return colorList[params.dataIndex]
                    } : chartAttr.itemColor[0],
                    borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    borderColor: 'black', //设置图形边框颜色
                    borderWidth: 2, //图形的描边线宽。
                },
                data: data
            }
        ]
    });
}

/* 改变数组图表数据和样式：
ArrayDeleteChart.changeChart(ArrayDeleteBlockly.hasMoreCode, ArrayDeleteChart.showChart, ArrayDeleteChart.arrNow, ArrayDeleteChart.dataChangeIndex); 
*/
ArrayDeleteChart.arrayChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {

    //重新执行或者结束的时候重置数据
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }

        ustc_vp.utils.sourceToDest(ArrayDeleteChart.initData, data);
    }

    //修改容器高度
    ArrayDeleteTools.arrayAttr.seriesWidth = ArrayDeleteTools.arrayAttr.nodeWidth * (data.length - 1) + 1;

    //抽取图标数据
    ArrayDeleteTools.arrToArrayChartDataObjArr(data, ArrayDeleteChart.arrayObjectArr, ArrayDeleteTools.arrayAttr.nodeWidth);

    // 在数据改变时设置数组图表
    ArrayDeleteChart.setArrayChartOption(chart, ArrayDeleteChart.arrayObjectArr, dataChangeIndex, ArrayDeleteTools.setGraphAttr(ArrayDeleteTools.arrayAttr));
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
var ArrayDeleteBlockly = {};
ArrayDeleteBlockly.workspace = null;
ArrayDeleteBlockly.outputArea = null;
ArrayDeleteBlockly.showCodeArea = null;
ArrayDeleteBlockly.hasMoreCode = true;
ArrayDeleteBlockly.highlightPause = false;
ArrayDeleteBlockly.codeInterpreter = null;
ArrayDeleteBlockly.latestCode = '';
ArrayDeleteBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',ArrayDeleteBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',ArrayDeleteBlockly.printStrWrapper]
}
*/
ArrayDeleteBlockly.customizeApi = {};

ArrayDeleteBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
ArrayDeleteBlockly.dataClear = function () {
    ArrayDeleteBlockly.workspace = null;
    ArrayDeleteBlockly.outputArea = null;
    ArrayDeleteBlockly.showCodeArea = null;
    ArrayDeleteBlockly.hasMoreCode = true;
    ArrayDeleteBlockly.highlightPause = false;
    ArrayDeleteBlockly.codeInterpreter = null;
    ArrayDeleteBlockly.latestCode = '';
    ArrayDeleteBlockly.addCode = '';   // 添加代码字符串
    ArrayDeleteBlockly.customizeApi = {};
    ArrayDeleteBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}

/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
ArrayDeleteBlockly.getWorkspaceXML = function (XMLpath) {
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
ArrayDeleteBlockly.initBlockly = function (blocklyDiv, mediaLocation) {
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
ArrayDeleteBlockly.injectCustomizeApi = function () {
    //添加Api
    ArrayDeleteBlockly.algAddCode();
    //生成添加代码字符串
    ArrayDeleteBlockly.generateAddCodeToString(ArrayDeleteBlockly.customizeApi);
}
/* 动态更新展示代码 */
ArrayDeleteBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
ArrayDeleteBlockly.resetStepUi = function (clearOutput) {
    ArrayDeleteBlockly.workspace.highlightBlock(null);
    ArrayDeleteBlockly.highlightPause = false;

    if (clearOutput) {
        ArrayDeleteBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
ArrayDeleteBlockly.highlightBlock = function (id) {
    ArrayDeleteBlockly.workspace.highlightBlock(id);
    ArrayDeleteBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
ArrayDeleteBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        ArrayDeleteBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(ArrayDeleteBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in ArrayDeleteBlockly.customizeApi) {
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(ArrayDeleteBlockly.customizeApi[key][1]));
    }
}
/* 添加自定义Api函数 */
ArrayDeleteBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
ArrayDeleteBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {
        ArrayDeleteBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
ArrayDeleteBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode + "alert(arr);\n";
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    ArrayDeleteBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    ArrayDeleteBlockly.resetStepUi(true);

}

//=======================================
/* 自定义API：控制台打印字符串 */
ArrayDeleteBlockly.printStrWrapper = function (str) {
    console.log(str);
}

/* 自定义API：获得Graph图数组函数 */
ArrayDeleteBlockly.getGraphArrayWrapper = function (arr) {

    if (arr != undefined) {
        var arrChange = [];

        ustc_vp.utils.objToArr(arr.a, arrChange);

        //图表改变时执行内部语句
        if (ArrayDeleteTools.getGraphChangeIndex(arrChange, ArrayDeleteChart.arrNow, ArrayDeleteChart.dataChangeIndex)) {

            ArrayDeleteChart.arrNow.splice(0, ArrayDeleteChart.arrNow.length);
            for (let i = 0; i < arrChange.length; i++) {
                ArrayDeleteChart.arrNow.push(arrChange[i]);
            }

            // 填入数据
            ArrayDeleteChart.changeChart(ArrayDeleteBlockly.hasMoreCode, ArrayDeleteChart.showChart, ArrayDeleteChart.arrNow, ArrayDeleteChart.dataChangeIndex);
        }
    }
}

ArrayDeleteBlockly.getIndexWrapper = function (index) {
    if (index != undefined && index != ArrayDeleteChart.arrayDeleteIndex) {
        ArrayDeleteChart.arrayDeleteIndex = index;

        //返回需要修改数据
        return true;
    }

    return false;
}

/* 自定义API：获得所有链表删除变量 */
ArrayDeleteBlockly.getArrayArgsWrapper = function (arr, index) {

    var arrFlag = ArrayDeleteBlockly.getGraphArrayWrapper(arr);
    var indexFlag = ArrayDeleteBlockly.getIndexWrapper(index);

    if (arrFlag || indexFlag) {
        // 填入数据
        //console.log(ArrayDeleteChart.dataChangeIndex);
        ArrayDeleteChart.changeChart(ArrayDeleteBlockly.hasMoreCode, ArrayDeleteChart.showChart, ArrayDeleteChart.arrNow, ArrayDeleteChart.dataChangeIndex);
    }
}

/* 数组类算法需要添加的代码 */
ArrayDeleteBlockly.arrayAlgAddCode = function () {

    ArrayDeleteBlockly.addApi(ArrayDeleteBlockly.customizeApi, 'getArrayArgs', 'getArrayArgs(arr, index);\n', ArrayDeleteBlockly.getArrayArgsWrapper);
    //ArrayDeleteBlockly.addApi(ArrayDeleteBlockly.customizeApi, 'myprint', 'myprint(index);\n', ArrayDeleteBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var ArrayDeleteTools = {};
//========================================================================
ArrayDeleteTools.arrayAttr = { title: '数组删除操作(数组位置从0开始)', type: 'graph', nodeWidth: 50, nodeHeight: 50, seriesWidth: 0, color: ['#409EFF', 'red'] };
//====================================================================================
/* 将数组转化为数组算法的图表数据对象组数 */
ArrayDeleteTools.arrToArrayChartDataObjArr = function (arr, objArr, size) {

    let objLen = objArr.length;
    let arrLen = arr.length;

    //清空传入objArr
    objArr.splice(0, objLen);
    for (let i = 0; i < arrLen; i++) {
        objArr.push({ id: i, name: '' + arr[i], x: size * i, y: 300 });
    }

}

/* 设置graph数据 */
ArrayDeleteTools.setGraphData = function (attr, data, codeStr, arrayObjectArr) {

    //获取到数据设置arrNow
    ArrayDeleteChart.getArrInitData(codeStr);

    //设置容器Height
    attr.seriesWidth = attr.nodeWidth * (data.length - 1) + 1;

    //抽取图标数据
    ArrayDeleteTools.arrToArrayChartDataObjArr(data, arrayObjectArr, attr.nodeWidth);
}

/* 设置graph属性 */
ArrayDeleteTools.setGraphAttr = function (attr) {
    var chartAttr = {
        chartTitle: attr.title,
        chartType: attr.type,
        charData: ArrayDeleteChart.arrayObjectArr,
        nodeWidth: attr.nodeWidth,
        nodeHeight: attr.nodeHeight,
        seriesWidth: attr.seriesWidth,
        itemColor: attr.color
    }
    return chartAttr;
}

/* 获得Graph图数组改变的索引值 */
ArrayDeleteTools.getGraphChangeIndex = function (newData, oldData, dataChangeIndex) {

    if (newData.length == oldData.length - 1) {
        dataChangeIndex[0] = oldData.length - 1; //获得改变的位置
        return true;
    } else if (newData.length == oldData.length) {
        for (let i = 0; i < newData.length; i++) {
            if (newData[i] != oldData[i]) {
                dataChangeIndex[0] = i; //获得改变的位置
                return true;
            }
        }
    }

    return false;
}

/******************************执行包***********************************/
var ArrayDeleteExecute = {};

/* 执行设置Blockly */
ArrayDeleteExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {

    // 定义Blockly工作空间
    ArrayDeleteBlockly.workspace = ArrayDeleteBlockly.initBlockly(blocklyDiv, mediaPath);

    // 通过xml文件路径获取xml对象
    let workspaceXML = ArrayDeleteBlockly.getWorkspaceXML(XMLpath);

    // 定义预定义块
    Blockly.Xml.domToWorkspace(workspaceXML, ArrayDeleteBlockly.workspace);

}

/* 执行设置代码输出 */
ArrayDeleteExecute.setOutputArea = function (outputDiv) {

    //定义结果输出区域
    ArrayDeleteBlockly.outputArea = outputDiv;
}

/* 执行设置按钮功能 */
ArrayDeleteExecute.setButton = function (runButton, stopButton, continueButton, overButton) {
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
ArrayDeleteExecute.setShowCodeArea = function (showCodeDiv) {

    ArrayDeleteExecute.setCodeInject();
    ArrayDeleteBlockly.showCodeArea = showCodeDiv;
    ArrayDeleteBlockly.workspace.addChangeListener(ArrayDeleteBlockly.updateShowCode(ArrayDeleteBlockly.workspace, ArrayDeleteBlockly.showCodeArea));

}

/* 设置代码注入 */
ArrayDeleteExecute.setCodeInject = function () {
    //定义注入的API
    ArrayDeleteBlockly.algAddCode = ArrayDeleteBlockly.arrayAlgAddCode;

    //注入API
    ArrayDeleteBlockly.injectCustomizeApi();

    //生成新代码
    ArrayDeleteBlockly.generateCodeAndLoadIntoInterpreter(ArrayDeleteBlockly.addCode, ArrayDeleteBlockly.workspace);

    //工作空间绑定监听事件
    ArrayDeleteBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            ArrayDeleteBlockly.generateCodeAndLoadIntoInterpreter(ArrayDeleteBlockly.addCode, ArrayDeleteBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
ArrayDeleteExecute.setShowChart = function (showDiv) {

    ArrayDeleteChart.showChart = ArrayDeleteChart.initArrayChart(showDiv);
    ArrayDeleteChart.dataChangeIndex = ArrayDeleteChart.arrayDataChangeIndex;
    ArrayDeleteChart.changeChart = ArrayDeleteChart.arrayChangeChart;
}

/* 执行赋值 */
ArrayDeleteExecute.setExtend = function () {

    ustc_vp.Chart = ArrayDeleteChart;
    ustc_vp.Blockly = ArrayDeleteBlockly;
    ustc_vp.tools = ArrayDeleteTools;
    ustc_vp.Execute = ArrayDeleteExecute;

    //清空图表和块数据
    ArrayDeleteChart.dataClear();
    ArrayDeleteBlockly.dataClear();
}
