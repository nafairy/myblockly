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
var QueuePopChart = {};
// 定义当前图表数据和改变索引
QueuePopChart.initData = [];
QueuePopChart.arrNow = [];
QueuePopChart.showChart = null;
QueuePopChart.dataChangeIndex = null;
QueuePopChart.queueObjectArr = [];

QueuePopChart.changeChart = null;   //(函数)图表改变时的执行函数

//=================================================================================
QueuePopChart.queueDataChangeIndex = [-1];  //图表改变时记录变化索引
//=================================================================================
/* 清除所有数据 */
QueuePopChart.dataClear = function () {
    QueuePopChart.initData = [];
    QueuePopChart.arrNow = [];
    QueuePopChart.showChart = null;
    QueuePopChart.dataChangeIndex = null;
    QueuePopChart.queueObjectArr = [];

    QueuePopChart.changeChart = null;   //(函数)图表改变时的执行函数
    QueuePopChart.queueDataChangeIndex = [-1];  //图表改变时记录变化索引
}
/* 获取图表初始化的数据 */
QueuePopChart.getArrInitData = function (codeStr) {
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
            if(isNaN(dateList[num])){
                QueuePopChart.initData.push(parseInt(dateList[num]));
            }
        }

        ustc_vp.utils.sourceToDest(QueuePopChart.initData, QueuePopChart.arrNow);
    }
}

/* 初始化队列图表的数据和属性 */
QueuePopChart.initQueueDataChart = function (showItem, chartAttr) {
    console.log("initQueueChart");

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

/* 初始化队列算法图表 */
QueuePopChart.initQueueChart = function (showItem) {
    QueuePopTools.setGraphData(QueuePopTools.queueAttr, QueuePopChart.arrNow, QueuePopBlockly.latestCode, QueuePopChart.queueObjectArr);
    return QueuePopChart.initQueueDataChart(showItem, QueuePopTools.setGraphAttr(QueuePopTools.queueAttr));
}

/* 数据改变时设置队列图表 */
QueuePopChart.setQueueChartOption = function (chart, data, dataChangeIndex, chartAttr) {

    chart.setOption({
        title: {
            text: chartAttr.chartTitle,
            subtext: "当前操作：" + (dataChangeIndex[0] == 1 ? "入队" : (dataChangeIndex[0] == 2 ? "出队" : "")), //副标题
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
                    color: chartAttr.itemColor[0],
                    borderType: 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                    borderColor: 'black', //设置图形边框颜色
                    borderWidth: 2, //图形的描边线宽。
                },
                data: data
            }
        ]
    });
}

/* 改变队列图表数据和样式：
QueuePopChart.changeChart(QueuePopBlockly.hasMoreCode, QueuePopChart.showChart, QueuePopChart.arrNow, QueuePopChart.dataChangeIndex);
*/
QueuePopChart.queueChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {

    //重新执行或者结束的时候重置数据
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }

        ustc_vp.utils.sourceToDest(QueuePopChart.initData, data);
    }

    //修改容器高度
    QueuePopTools.queueAttr.seriesWidth = QueuePopTools.queueAttr.nodeWidth * (data.length - 1) + 1;

    //抽取图标数据
    QueuePopTools.arrToQueueChartDataObjArr(data, QueuePopChart.queueObjectArr, QueuePopTools.queueAttr.nodeWidth);

    // 在数据改变时设置队列图表
    QueuePopChart.setQueueChartOption(chart, QueuePopChart.queueObjectArr, dataChangeIndex, QueuePopTools.setGraphAttr(QueuePopTools.queueAttr));
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
var QueuePopBlockly = {};
QueuePopBlockly.workspace = null;
QueuePopBlockly.outputArea = null;
QueuePopBlockly.showCodeArea = null;
QueuePopBlockly.hasMoreCode = true;
QueuePopBlockly.highlightPause = false;
QueuePopBlockly.codeInterpreter = null;
QueuePopBlockly.latestCode = '';
QueuePopBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',QueuePopBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',QueuePopBlockly.printStrWrapper]
}
*/
QueuePopBlockly.customizeApi = {};

QueuePopBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
QueuePopBlockly.dataClear = function () {
    QueuePopBlockly.workspace = null;
    QueuePopBlockly.outputArea = null;
    QueuePopBlockly.showCodeArea = null;
    QueuePopBlockly.hasMoreCode = true;
    QueuePopBlockly.highlightPause = false;
    QueuePopBlockly.codeInterpreter = null;
    QueuePopBlockly.latestCode = '';
    QueuePopBlockly.addCode = '';   // 添加代码字符串
    QueuePopBlockly.customizeApi = {};

    QueuePopBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}
/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
QueuePopBlockly.getWorkspaceXML = function (XMLpath) {
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
QueuePopBlockly.initBlockly = function (blocklyDiv, mediaLocation,workspaceXML) {
    console.log("initBlockly");

    // 基础配置项
    var options = {
        toolbox: workspaceXML,
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
QueuePopBlockly.injectCustomizeApi = function () {
    //添加Api
    QueuePopBlockly.algAddCode();
    //生成添加代码字符串
    QueuePopBlockly.generateAddCodeToString(QueuePopBlockly.customizeApi);
}
/* 动态更新展示代码 */
QueuePopBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
QueuePopBlockly.resetStepUi = function (clearOutput) {
    QueuePopBlockly.workspace.highlightBlock(null);
    QueuePopBlockly.highlightPause = false;

    if (clearOutput) {
        QueuePopBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
QueuePopBlockly.highlightBlock = function (id) {
    QueuePopBlockly.workspace.highlightBlock(id);
    QueuePopBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
QueuePopBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        QueuePopBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(QueuePopBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in QueuePopBlockly.customizeApi) {
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(QueuePopBlockly.customizeApi[key][1]));
    }
}
/* 添加自定义Api函数 */
QueuePopBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
QueuePopBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {
        QueuePopBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
QueuePopBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode;
    Blockly.JavaScript.STATEMENT_SUFFIX='alert(arr);\n'+addCode;
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    QueuePopBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    QueuePopBlockly.resetStepUi(true);

}

//=======================================
/* 自定义API：控制台打印字符串 */
QueuePopBlockly.printStrWrapper = function (str) {
    console.log(str);
}

/* 自定义API：获得Graph图数组函数 */
QueuePopBlockly.getGraphArrayWrapper = function (arr) {

    if (arr != undefined) {
        var arrChange = [];

        ustc_vp.utils.objToArr(arr.a, arrChange);

        //图表改变时执行内部语句
        if (QueuePopTools.getGraphChangeIndex(arrChange, QueuePopChart.arrNow, QueuePopChart.dataChangeIndex)) {

            QueuePopChart.arrNow.splice(0, QueuePopChart.arrNow.length);
            for (let i = 0; i < arrChange.length; i++) {
                QueuePopChart.arrNow.push(arrChange[i]);
            }

            // 填入数据
            QueuePopChart.changeChart(QueuePopBlockly.hasMoreCode, QueuePopChart.showChart, QueuePopChart.arrNow, QueuePopChart.dataChangeIndex);
        }
    }
}

/* 队列类算法需要添加的代码 */
QueuePopBlockly.queueAlgAddCode = function () {

    QueuePopBlockly.addApi(QueuePopBlockly.customizeApi, 'getGraphArray', 'getGraphArray(arr);\n', QueuePopBlockly.getGraphArrayWrapper);
    //QueuePopBlockly.addApi(QueuePopBlockly.customizeApi, 'myprint', 'myprint(index);\n', QueuePopBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var QueuePopTools = {};
//========================================================================
QueuePopTools.queueAttr = { title: '队列基本操作', type: 'graph', nodeWidth: 80, nodeHeight: 50, seriesWidth: 0, color: ['#409EFF', 'red'] };
//====================================================================================
/* 将数组转化为队列算法的图表数据对象组数 */
QueuePopTools.arrToQueueChartDataObjArr = function (arr, objArr, size) {

    let objLen = objArr.length;
    let arrLen = arr.length;

    //第一次初始化objArr
    if (Math.abs(arrLen - objLen) > 1) {
        //清空传入objArr
        objArr.splice(0, objArr.length);
        if (arrLen == 1) {
            objArr.push({ id: 0, name: '队头,队尾：\n' + arr[0], x: 0, y: 300 });
        } else {
            for (let i = 0; i < arrLen; i++) {
                if (i == 0) {
                    objArr.push({ id: i, name: '队头：' + arr[i], x: size * i, y: 300 });
                } else if (i == arrLen - 1) {
                    objArr.push({ id: i, name: '队尾：' + arr[i], x: size * i, y: 300 });
                } else {
                    objArr.push({ id: i, name: '' + arr[i], x: size * i, y: 300 });
                }
            }
        }
    } else {
        if (arrLen == objLen + 1) {
            if (arrLen == 1) {
                objArr.push({ id: 0, name: '队头,队尾：\n' + arr[0], x: 0, y: 300 });
            } else {
                let tmp = objArr.pop();
                if (arrLen == 2) {
                    tmp.name = "队头：\n" + tmp.name.split("\n")[1];
                    objArr.push(tmp);
                } else {
                    tmp.name = tmp.name.split("\n")[1];
                    objArr.push(tmp);
                }
                objArr.push({ id: objArr[objLen - 1].id + 1, name: '队尾：\n' + arr[arrLen - 1], x: objArr[objLen - 1].x + size, y: 300 });
            }
        } else if (arrLen == objLen - 1) {
            if (arrLen == 1) {
                let tmp = objArr.pop();
                tmp.name = "队头,队尾：\n" + tmp.name.split("：")[1];
                objArr.pop();
                objArr.push(tmp);
            } else {
                objArr.shift();
                if (arrLen != 0) {
                    objArr[0].name = "队头：\n" + objArr[0].name;
                }
            }
        }
    }
}

/* 设置graph数据 */
QueuePopTools.setGraphData = function (attr, data, codeStr, queueObjectArr) {

    //获取到数据设置arrNow
    QueuePopChart.getArrInitData(codeStr);

    //设置容器Height
    attr.seriesWidth = attr.nodeWidth * (data.length - 1) + 1;

    //抽取图标数据
    QueuePopTools.arrToQueueChartDataObjArr(data, queueObjectArr, attr.nodeWidth);
}

/* 设置graph属性 */
QueuePopTools.setGraphAttr = function (attr) {
    var chartAttr = {
        chartTitle: attr.title,
        chartType: attr.type,
        charData: QueuePopChart.queueObjectArr,
        nodeWidth: attr.nodeWidth,
        nodeHeight: attr.nodeHeight,
        seriesWidth: attr.seriesWidth,
        itemColor: attr.color
    }
    return chartAttr;
}

/* 获得Graph图数组改变的索引值 */
QueuePopTools.getGraphChangeIndex = function (newData, oldData, dataChangeIndex) {

    //如果是入队列
    if (newData.length == oldData.length + 1) {
        dataChangeIndex[0] = 1;
        return true;
    } else {  //其他情况，dataChangeIndex置零

        //出队
        if (newData.length == oldData.length - 1) {
            dataChangeIndex[0] = 2;
        } else {
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
var QueuePopExecute = {};

/* 执行设置Blockly */
QueuePopExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {


    // 通过xml文件路径获取xml对象
    let workspaceXML = QueuePopBlockly.getWorkspaceXML(XMLpath);

    // 定义Blockly工作空间
    QueuePopBlockly.workspace = QueuePopBlockly.initBlockly(blocklyDiv, mediaPath,workspaceXML);

    let initworksapceXML=QueuePopBlockly.getWorkspaceXML("static/xml/queues/queue_pop_init_workspace.xml");

    // 定义预定义块
    Blockly.Xml.domToWorkspace(initworksapceXML, QueuePopBlockly.workspace);

}

/* 执行设置代码输出 */
QueuePopExecute.setOutputArea = function (outputDiv) {

    //定义结果输出区域
    QueuePopBlockly.outputArea = outputDiv;
}

/* 执行设置按钮功能 */
QueuePopExecute.setButton = function (runButton, stopButton, continueButton, overButton) {
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
QueuePopExecute.setShowCodeArea = function (showCodeDiv) {

    QueuePopExecute.setCodeInject();
    QueuePopBlockly.showCodeArea = showCodeDiv;
    QueuePopBlockly.workspace.addChangeListener(QueuePopBlockly.updateShowCode(QueuePopBlockly.workspace, QueuePopBlockly.showCodeArea));

}

/* 设置代码注入 */
QueuePopExecute.setCodeInject = function () {
    //定义注入的API
    QueuePopBlockly.algAddCode = QueuePopBlockly.queueAlgAddCode;

    //注入API
    QueuePopBlockly.injectCustomizeApi();

    //生成新代码
    QueuePopBlockly.generateCodeAndLoadIntoInterpreter(QueuePopBlockly.addCode, QueuePopBlockly.workspace);

    //工作空间绑定监听事件
    QueuePopBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            QueuePopBlockly.generateCodeAndLoadIntoInterpreter(QueuePopBlockly.addCode, QueuePopBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
QueuePopExecute.setShowChart = function (showDiv) {

    QueuePopChart.showChart = QueuePopChart.initQueueChart(showDiv);
    QueuePopChart.dataChangeIndex = QueuePopChart.queueDataChangeIndex;
    QueuePopChart.changeChart = QueuePopChart.queueChangeChart;
}

/* 执行赋值 */
QueuePopExecute.setExtend = function () {
    ustc_vp.Chart = QueuePopChart;
    ustc_vp.Blockly = QueuePopBlockly;
    ustc_vp.tools = QueuePopTools;
    ustc_vp.Execute = QueuePopExecute;

    //清空图表和块数据
    QueuePopChart.dataClear();
    QueuePopBlockly.dataClear();
}
