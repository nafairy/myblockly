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
var LinkListSearchChart = {};
// 定义当前图表数据和改变索引
LinkListSearchChart.initData = [];
LinkListSearchChart.arrNow = [];
LinkListSearchChart.showChart = null;
LinkListSearchChart.dataChangeIndex = null;
LinkListSearchChart.linklistObjectArr = [];
LinkListSearchChart.linklistObjectLinks = [];

LinkListSearchChart.changeChart = null;   //(函数)图表改变时的执行函数

//=================================================================================
LinkListSearchChart.linklistDataChangeIndex = [-1];  //搜索到的链表位置
LinkListSearchChart.linklistSearchValue = -1; //需要搜索的值
//=================================================================================
/* 清除所有数据 */
LinkListSearchChart.dataClear = function () {
    LinkListSearchChart.initData = [];
    LinkListSearchChart.arrNow = [];
    LinkListSearchChart.showChart = null;
    LinkListSearchChart.dataChangeIndex = null;
    LinkListSearchChart.linklistObjectArr = [];
    LinkListSearchChart.linklistObjectLinks = [];

    LinkListSearchChart.changeChart = null;   //(函数)图表改变时的执行函数
    LinkListSearchChart.linklistDataChangeIndex = [-1];  //搜索到的链表位置
    LinkListSearchChart.linklistSearchValue = -1; //需要搜索的值
}
/* 获取图表初始化的数据 */
LinkListSearchChart.getArrInitData = function (codeStr) {
    //从codeStr获取arr=[x,x,...]
    if (codeStr == null || codeStr == undefined || codeStr == '') {
        throw Error("getArrInitData()：获取初始化图表数据失败，Blockly未完全加载！！！");
    } else {
        let codeList = codeStr.split(";");
        let arrIndex = -1;

        for (let key in codeList) {
            arrIndex = codeList[key].indexOf("linklistsCreateWithList([");

            if (arrIndex != -1) {
                arrIndex = key;
                break;
            }
        }

        if (arrIndex == -1) {
            throw Error("getArrInitData()：没有数据！！！");
        }
        let arr = codeList[arrIndex];

        console.log("获取初始数据：" + arr);
        let dateList = arr.split("[")[1].split("]")[0].split(",");
        for (let num in dateList) {
            LinkListSearchChart.initData.push(parseInt(dateList[num]));
        }

        ustc_vp.utils.sourceToDest(LinkListSearchChart.initData, LinkListSearchChart.arrNow);
    }
}

/* 初始化链表图表的数据和属性 */
LinkListSearchChart.initLinkListDataChart = function (showItem, chartAttr) {
    console.log("initLinkListChart");

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
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                label: { //图形上的文本标签
                    show: true,//是否显示标签。
                    position: 'inside',//标签的位置。
                    textStyle: { //标签的字体样式
                        color: '#130c0e', //字体颜色
                        fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight: 'bold',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                        fontFamily: 'sans-serif', //文字的字体系列
                        fontSize: 15, //字体大小
                    }
                },
                itemStyle: {//图形样式
                    color: chartAttr.itemColor[0],
                },
                data: chartAttr.chartData,
                links: chartAttr.chartLinks,
                lineStyle: {
                    opacity: 1,
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

/* 初始化链表算法图表 */
LinkListSearchChart.initLinkListChart = function (showItem) {
    LinkListSearchTools.setGraphData(LinkListSearchTools.linklistAttr, LinkListSearchChart.arrNow, LinkListSearchBlockly.latestCode, LinkListSearchChart.linklistObjectArr, LinkListSearchChart.linklistObjectLinks);
    return LinkListSearchChart.initLinkListDataChart(showItem, LinkListSearchTools.setGraphAttr(LinkListSearchTools.linklistAttr));
}

/* 修改副标题函数 */
LinkListSearchChart.changeSubtext = function (dataChangeIndex, data) {
    if (LinkListSearchChart.linklistSearchValue != -1) {
        str1 = "搜索值为：" + LinkListSearchChart.linklistSearchValue;
    } else {
        str1 = "";
    }

    if (dataChangeIndex[0] == -1) {
        str2 = "";
    } else if (dataChangeIndex[0] < data.length) {
        // console.log(data[dataChangeIndex[0]]);
        // console.log(LinkListSearchChart.linklistSearchValue);

        let dataValue = data[dataChangeIndex[0]] != undefined ? parseInt(data[dataChangeIndex[0]].name) : undefined;
        if (dataChangeIndex[0] == 0) {
            dataValue = data[dataChangeIndex[0]].name.split("head：")[1];
        }
        if (dataValue == LinkListSearchChart.linklistSearchValue) {
            str2 = "，成功搜索到位置为" + dataChangeIndex[0];
        } else {
            str2 = ((dataChangeIndex[0] != -1) ? "，当前搜索位置" + dataChangeIndex[0] : "");
        }
    } else if (dataChangeIndex[0] == data.length) {
        str2 = "，搜索结束搜索值未在链表中";
    }

    return str1 + str2;
}
/* 数据改变时设置链表图表 */
LinkListSearchChart.setLinkListChartOption = function (chart, data, dataChangeIndex, chartAttr) {
    // console.log("setLinkListChartOption:");
    // console.log(chartAttr);
    chart.setOption({
        title: {
            text: chartAttr.chartTitle,
            subtext: LinkListSearchChart.changeSubtext(dataChangeIndex, data), //副标题 
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
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                label: { //图形上的文本标签
                    show: true,//是否显示标签。
                    position: 'inside',//标签的位置。
                    textStyle: { //标签的字体样式
                        color: '#130c0e', //字体颜色
                        fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                        fontWeight: 'bold',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
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
                },
                data: data,
                links: chartAttr.chartLinks,
                lineStyle: {
                    opacity: 1,
                    width: 3,
                    curveness: 0
                }
            }
        ]
    });
}

/* 改变链表图表数据和样式：
LinkListSearchChart.changeChart(LinkListSearchBlockly.hasMoreCode, LinkListSearchChart.showChart, LinkListSearchChart.arrNow, LinkListSearchChart.dataChangeIndex); 
*/
LinkListSearchChart.linklistChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {

    //重新执行或者结束的时候重置数据
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }

        LinkListSearchChart.linklistSearchValue = -1;

        ustc_vp.utils.sourceToDest(LinkListSearchChart.initData, data);
    }

    //修改容器宽度
    LinkListSearchTools.linklistAttr.seriesWidth = (LinkListSearchTools.linklistAttr.lineLength + LinkListSearchTools.linklistAttr.nodeWidth) * (data.length - 1) + 1;

    //抽取图表数据
    LinkListSearchTools.arrToLinkListChartDataObjArr(data, LinkListSearchChart.linklistObjectArr, LinkListSearchTools.linklistAttr.nodeWidth + LinkListSearchTools.linklistAttr.lineLength);

    //获得连接
    LinkListSearchChart.linklistObjectLinks.splice(0, LinkListSearchChart.linklistObjectLinks.length);

    let len = LinkListSearchChart.linklistObjectArr.length;
    for (let i = 0; i < len - 1; i++) {
        LinkListSearchChart.linklistObjectLinks.push({ source: i, target: i + 1 })
    }

    // 在数据改变时设置链表图表
    LinkListSearchChart.setLinkListChartOption(chart, LinkListSearchChart.linklistObjectArr, dataChangeIndex, LinkListSearchTools.setGraphAttr(LinkListSearchTools.linklistAttr));
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
var LinkListSearchBlockly = {};
LinkListSearchBlockly.workspace = null;
LinkListSearchBlockly.outputArea = null;
LinkListSearchBlockly.showCodeArea = null;
LinkListSearchBlockly.hasMoreCode = true;
LinkListSearchBlockly.highlightPause = false;
LinkListSearchBlockly.codeInterpreter = null;
LinkListSearchBlockly.latestCode = '';
LinkListSearchBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',LinkListSearchBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',LinkListSearchBlockly.printStrWrapper]
}
*/
LinkListSearchBlockly.customizeApi = {};

LinkListSearchBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
LinkListSearchBlockly.dataClear = function () {
    LinkListSearchBlockly.workspace = null;
    LinkListSearchBlockly.outputArea = null;
    LinkListSearchBlockly.showCodeArea = null;
    LinkListSearchBlockly.hasMoreCode = true;
    LinkListSearchBlockly.highlightPause = false;
    LinkListSearchBlockly.codeInterpreter = null;
    LinkListSearchBlockly.latestCode = '';
    LinkListSearchBlockly.addCode = '';   // 添加代码字符串
    LinkListSearchBlockly.customizeApi = {};

    LinkListSearchBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}
/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
LinkListSearchBlockly.getWorkspaceXML = function (XMLpath) {
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
LinkListSearchBlockly.initBlockly = function (blocklyDiv, mediaLocation) {
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
LinkListSearchBlockly.injectCustomizeApi = function () {
    //添加Api
    LinkListSearchBlockly.algAddCode();
    //生成添加代码字符串
    LinkListSearchBlockly.generateAddCodeToString(LinkListSearchBlockly.customizeApi);
}
/* 动态更新展示代码 */
LinkListSearchBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
LinkListSearchBlockly.resetStepUi = function (clearOutput) {
    LinkListSearchBlockly.workspace.highlightBlock(null);
    LinkListSearchBlockly.highlightPause = false;

    if (clearOutput) {
        LinkListSearchBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
LinkListSearchBlockly.highlightBlock = function (id) {
    LinkListSearchBlockly.workspace.highlightBlock(id);
    LinkListSearchBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
LinkListSearchBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        LinkListSearchBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(LinkListSearchBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in LinkListSearchBlockly.customizeApi) {
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(LinkListSearchBlockly.customizeApi[key][1]));
    }
}
/* 添加自定义Api函数 */
LinkListSearchBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
LinkListSearchBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {
        LinkListSearchBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
LinkListSearchBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode;
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    LinkListSearchBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    LinkListSearchBlockly.resetStepUi(true);

}

//=======================================
/* 自定义API：控制台打印字符串 */
LinkListSearchBlockly.printStrWrapper = function (str) {
    console.log(str);
}

/* 自定义API：获得搜索的索引函数*/
LinkListSearchBlockly.getIndexWrapper = function (index) {

    if (index != undefined) {
        LinkListSearchChart.dataChangeIndex[0] = index;
        // 填入数据
        LinkListSearchChart.changeChart(LinkListSearchBlockly.hasMoreCode, LinkListSearchChart.showChart, LinkListSearchChart.arrNow, LinkListSearchChart.dataChangeIndex);
    }
}

/* 自定义API：获得需要搜索的值函数*/
LinkListSearchBlockly.getValueWrapper = function (val) {

    var nowValue = val;
    if (val != undefined && nowValue != LinkListSearchChart.linklistSearchValue) {
        LinkListSearchChart.linklistSearchValue = val;
        // 填入数据
        LinkListSearchChart.changeChart(LinkListSearchBlockly.hasMoreCode, LinkListSearchChart.showChart, LinkListSearchChart.arrNow, LinkListSearchChart.dataChangeIndex);
    }
}

/* 链表类算法需要添加的代码 */
LinkListSearchBlockly.linklistAlgAddCode = function () {
    // LinkListSearchBlockly.addApi(LinkListSearchBlockly.customizeApi, 'getGraphArray', 'getGraphArray(linklist);\n', LinkListSearchBlockly.getGraphArrayWrapper);
    LinkListSearchBlockly.addApi(LinkListSearchBlockly.customizeApi, 'getIndex', 'getIndex(index);\n', LinkListSearchBlockly.getIndexWrapper);
    LinkListSearchBlockly.addApi(LinkListSearchBlockly.customizeApi, 'getValue', 'getValue(val);\n', LinkListSearchBlockly.getValueWrapper);
    //LinkListSearchBlockly.addApi(LinkListSearchBlockly.customizeApi, 'myprint', 'myprint(index);\n', LinkListSearchBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var LinkListSearchTools = {};
//========================================================================
LinkListSearchTools.linklistAttr = { title: '链表搜索算法', type: 'graph', nodeWidth: 50, nodeHeight: 50, seriesWidth: 0, lineLength: 50, color: ['#d71345', '#ffe600'] };
//====================================================================================
/* 将数组转化为链表算法的图表数据对象组数 */
LinkListSearchTools.arrToLinkListChartDataObjArr = function (arr, objArr, size) {

    let objLen = objArr.length;
    let arrLen = arr.length;

    if (objLen != arrLen) {
        //清空传入objArr
        objArr.splice(0, objArr.length);
        if (arrLen == 1) {    //只有一个节点
            objArr.push({ id: 0, name: 'head：\n' + arr[0], x: 0, y: 300 });
        } else {
            for (let i = 0; i < arrLen; i++) {
                if (i == 0) {
                    objArr.push({ id: i, name: 'head：\n' + arr[i], x: size * i, y: 300 });
                } else {
                    objArr.push({ id: i, name: '' + arr[i], x: size * i, y: 300 });
                }
            }
        }
    }

}

/* 设置graph数据和连接 */
LinkListSearchTools.setGraphData = function (attr, data, codeStr, linklistObjectArr, linklistObjectLinks) {

    //获取到数据设置arrNow
    LinkListSearchChart.getArrInitData(codeStr);

    //设置容器Height
    attr.seriesWidth = (attr.lineLength + attr.nodeWidth) * (data.length - 1) + 1;

    //抽取图标数据
    LinkListSearchTools.arrToLinkListChartDataObjArr(data, linklistObjectArr, attr.nodeWidth + attr.lineLength);

    //获得连接
    let len = linklistObjectArr.length;
    for (let i = 0; i < len - 1; i++) {
        linklistObjectLinks.push({ source: i, target: i + 1 })
    }
}

/* 设置graph属性 */
LinkListSearchTools.setGraphAttr = function (attr) {
    var chartAttr = {
        chartTitle: attr.title,
        chartType: attr.type,
        chartData: LinkListSearchChart.linklistObjectArr,
        chartLinks: LinkListSearchChart.linklistObjectLinks,
        nodeWidth: attr.nodeWidth,
        nodeHeight: attr.nodeHeight,
        seriesWidth: attr.seriesWidth,
        itemColor: attr.color
    }
    return chartAttr;
}

/******************************执行包***********************************/
var LinkListSearchExecute = {};

/* 执行设置Blockly */
LinkListSearchExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {

    // 定义Blockly工作空间
    LinkListSearchBlockly.workspace = LinkListSearchBlockly.initBlockly(blocklyDiv, mediaPath);

    // 通过xml文件路径获取xml对象
    let workspaceXML = LinkListSearchBlockly.getWorkspaceXML(XMLpath);

    // 定义预定义块
    Blockly.Xml.domToWorkspace(workspaceXML, LinkListSearchBlockly.workspace);

}

/* 执行设置代码输出 */
LinkListSearchExecute.setOutputArea = function (outputDiv) {

    //定义结果输出区域
    LinkListSearchBlockly.outputArea = outputDiv;
}

/* 执行设置按钮功能 */
LinkListSearchExecute.setButton = function (runButton, stopButton, continueButton, overButton) {
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
LinkListSearchExecute.setShowCodeArea = function (showCodeDiv) {

    LinkListSearchExecute.setCodeInject();
    LinkListSearchBlockly.showCodeArea = showCodeDiv;
    LinkListSearchBlockly.workspace.addChangeListener(LinkListSearchBlockly.updateShowCode(LinkListSearchBlockly.workspace, LinkListSearchBlockly.showCodeArea));

}

/* 设置代码注入 */
LinkListSearchExecute.setCodeInject = function () {
    //定义注入的API
    LinkListSearchBlockly.algAddCode = LinkListSearchBlockly.linklistAlgAddCode;

    //注入API
    LinkListSearchBlockly.injectCustomizeApi();

    //生成新代码
    LinkListSearchBlockly.generateCodeAndLoadIntoInterpreter(LinkListSearchBlockly.addCode, LinkListSearchBlockly.workspace);

    //工作空间绑定监听事件
    LinkListSearchBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            LinkListSearchBlockly.generateCodeAndLoadIntoInterpreter(LinkListSearchBlockly.addCode, LinkListSearchBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
LinkListSearchExecute.setShowChart = function (showDiv) {

    LinkListSearchChart.showChart = LinkListSearchChart.initLinkListChart(showDiv);
    LinkListSearchChart.dataChangeIndex = LinkListSearchChart.linklistDataChangeIndex;
    LinkListSearchChart.changeChart = LinkListSearchChart.linklistChangeChart;
}

/* 执行赋值 */
LinkListSearchExecute.setExtend = function () {
    ustc_vp.Chart = LinkListSearchChart;
    ustc_vp.Blockly = LinkListSearchBlockly;
    ustc_vp.tools = LinkListSearchTools;
    ustc_vp.Execute = LinkListSearchExecute;

    //清空图表和块数据
    LinkListSearchChart.dataClear();
    LinkListSearchBlockly.dataClear();
}
