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
var LinkListInsertChart = {};
// 定义当前图表数据和改变索引
LinkListInsertChart.initData = [];
LinkListInsertChart.arrNow = [];
LinkListInsertChart.showChart = null;
LinkListInsertChart.dataChangeIndex = null;
LinkListInsertChart.linklistObjectArr = [];
LinkListInsertChart.linklistObjectLinks = [];

LinkListInsertChart.changeChart = null;   //(函数)图表改变时的执行函数

//=================================================================================
//普通节点：红，前置节点：黄，当前节点：蓝
LinkListInsertChart.linklistDataChangeIndex = [-1, -1];  //搜索到的链表[当前位置，需要插入的位置]
LinkListInsertChart.linklistInsertValue = -1; //需要插入的值
LinkListInsertChart.linklistFlag = 0; //链表改变标志
//=================================================================================
/* 清除所有数据 */
LinkListInsertChart.dataClear = function () {
    LinkListInsertChart.initData = [];
    LinkListInsertChart.arrNow = [];
    LinkListInsertChart.showChart = null;
    LinkListInsertChart.dataChangeIndex = null;
    LinkListInsertChart.linklistObjectArr = [];
    LinkListInsertChart.linklistObjectLinks = [];

    LinkListInsertChart.changeChart = null;   //(函数)图表改变时的执行函数
    LinkListInsertChart.linklistDataChangeIndex = [-1, -1];  //搜索到的链表[当前位置，需要插入的位置]
    LinkListInsertChart.linklistInsertValue = -1; //需要插入的值
    LinkListInsertChart.linklistFlag = 0; //链表改变标志
}
/* 获取图表初始化的数据 */
LinkListInsertChart.getArrInitData = function (codeStr) {
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
            LinkListInsertChart.initData.push(parseInt(dateList[num]));
        }

        ustc_vp.utils.sourceToDest(LinkListInsertChart.initData, LinkListInsertChart.arrNow);
    }
}

/* 初始化链表图表的数据和属性 */
LinkListInsertChart.initLinkListDataChart = function (showItem, chartAttr) {
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
                    color: '#409EFF',
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
LinkListInsertChart.initLinkListChart = function (showItem) {
    LinkListInsertTools.setGraphData(LinkListInsertTools.linklistAttr, LinkListInsertChart.arrNow, LinkListInsertBlockly.latestCode, LinkListInsertChart.linklistObjectArr, LinkListInsertChart.linklistObjectLinks);
    return LinkListInsertChart.initLinkListDataChart(showItem, LinkListInsertTools.setGraphAttr(LinkListInsertTools.linklistAttr));
}

/* 修改副标题函数 */
LinkListInsertChart.changeSubtext = function (dataChangeIndex) {

    if (LinkListInsertChart.linklistInsertValue != -1) {
        str1 = "插入值为：" + LinkListInsertChart.linklistInsertValue;
    } else {
        str1 = "";
    }

    if (dataChangeIndex[1] != -1) {
        str2 = "，插入位置为：" + dataChangeIndex[1];
    } else {
        str2 = "";
    }

    if (dataChangeIndex[0] == -1) {
        str3 = "";
    } else {
        //当前位置已经到达插入位置前一个位置时并且已经插入
        //或者当前位置为0，需要插入位置为0时
        if ((dataChangeIndex[0] == (dataChangeIndex[1] - 1) && (LinkListInsertChart.linklistFlag == 2))
            || ((dataChangeIndex[0] == 1) && (dataChangeIndex[1] == 0))) {
            str3 = "，成功插入位置：" + dataChangeIndex[1];
        } else {
            str3 = "，当前搜索到位置为：" + dataChangeIndex[0];
        }
    }

    return str1 + str2 + str3;
}
/* 数据改变时设置链表图表 */
LinkListInsertChart.setLinkListChartOption = function (chart, data, dataChangeIndex, chartAttr) {
    // console.log("setLinkListChartOption:");
    // console.log(chartAttr);
    // console.log(dataChangeIndex);
    chart.setOption({
        title: {
            text: chartAttr.chartTitle,
            subtext: LinkListInsertChart.changeSubtext(dataChangeIndex), //副标题
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
                    color: ((dataChangeIndex[0] != -1) || (dataChangeIndex[1] != -1)) ? function (params) {
                        var colorList = [];
                        for (var i = 0; i < data.length; i++) {
                            if (i == dataChangeIndex[0]) {
                                colorList.push(chartAttr.itemColor[1]);
                            } else if ((i == dataChangeIndex[1]) && (LinkListInsertChart.linklistFlag != 0)) {  //插入位置存在并且插入flag不为0
                                colorList.push(chartAttr.itemColor[2]);
                            }
                            else {
                                colorList.push(chartAttr.itemColor[0]);
                            }
                        }
                        return colorList[params.dataIndex];
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
LinkListInsertChart.changeChart(LinkListInsertBlockly.hasMoreCode, LinkListInsertChart.showChart, LinkListInsertChart.arrNow, LinkListInsertChart.dataChangeIndex);
*/
LinkListInsertChart.linklistChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {

    //重新执行或者结束的时候重置数据
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }

        LinkListInsertChart.linklistInsertValue = -1;

        //清空原始数据和连接关系
        LinkListInsertChart.linklistObjectArr.splice(0, LinkListInsertChart.linklistObjectArr.length);
        LinkListInsertChart.linklistObjectLinks.splice(0, LinkListInsertChart.linklistObjectLinks.length);
        //清空链表的改变标记
        LinkListInsertChart.linklistFlag = 0;
        ustc_vp.utils.sourceToDest(LinkListInsertChart.initData, data);
    }

    // console.log(dataChangeIndex);

    //修改容器宽度
    LinkListInsertTools.linklistAttr.seriesWidth = (LinkListInsertTools.linklistAttr.lineLength + LinkListInsertTools.linklistAttr.nodeWidth) * (data.length - 1) + 1;
    //抽取图表数据
    LinkListInsertTools.arrToLinkListChartDataObjArr(data, LinkListInsertChart.linklistObjectArr, LinkListInsertTools.linklistAttr.nodeWidth + LinkListInsertTools.linklistAttr.lineLength);

    //获得连接
    LinkListInsertChart.linklistObjectLinks.splice(0, LinkListInsertChart.linklistObjectLinks.length);

    let len = LinkListInsertChart.linklistObjectArr.length;

    for (let i = 0; i < len - 1; i++) {
        //插入节点连接线染色
        if ((dataChangeIndex[1] == i) && (LinkListInsertChart.linklistFlag != 0)) {
            LinkListInsertChart.linklistObjectLinks.push({ source: i, target: i + 1, lineStyle: { color: LinkListInsertTools.linklistAttr.color[2] } });
        } else if (dataChangeIndex[0] == i) {  //当前节点连接线染色
            if (LinkListInsertChart.linklistFlag == 1) {
                LinkListInsertChart.linklistObjectLinks.push({ source: i, target: i + 2, lineStyle: { color: LinkListInsertTools.linklistAttr.color[1] } });
            } else {
                LinkListInsertChart.linklistObjectLinks.push({ source: i, target: i + 1, lineStyle: { color: LinkListInsertTools.linklistAttr.color[1] } });
            }
        } else {  //普通节点连接线染色
            LinkListInsertChart.linklistObjectLinks.push({ source: i, target: i + 1, lineStyle: { color: '#409EFF' } });
        }
    }

    // 在数据改变时设置链表图表
    LinkListInsertChart.setLinkListChartOption(chart, LinkListInsertChart.linklistObjectArr, dataChangeIndex, LinkListInsertTools.setGraphAttr(LinkListInsertTools.linklistAttr));
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
var LinkListInsertBlockly = {};
LinkListInsertBlockly.workspace = null;
LinkListInsertBlockly.outputArea = null;
LinkListInsertBlockly.showCodeArea = null;
LinkListInsertBlockly.hasMoreCode = true;
LinkListInsertBlockly.highlightPause = false;
LinkListInsertBlockly.codeInterpreter = null;
LinkListInsertBlockly.latestCode = '';
LinkListInsertBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',LinkListInsertBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',LinkListInsertBlockly.printStrWrapper]
}
*/
LinkListInsertBlockly.customizeApi = {};

LinkListInsertBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
LinkListInsertBlockly.dataClear = function () {
    LinkListInsertBlockly.workspace = null;
    LinkListInsertBlockly.outputArea = null;
    LinkListInsertBlockly.showCodeArea = null;
    LinkListInsertBlockly.hasMoreCode = true;
    LinkListInsertBlockly.highlightPause = false;
    LinkListInsertBlockly.codeInterpreter = null;
    LinkListInsertBlockly.latestCode = '';
    LinkListInsertBlockly.addCode = '';   // 添加代码字符串
    LinkListInsertBlockly.customizeApi = {};

    LinkListInsertBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}
/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
LinkListInsertBlockly.getWorkspaceXML = function (XMLpath) {
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
LinkListInsertBlockly.initBlockly = function (blocklyDiv, mediaLocation,workspaceXML) {
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
LinkListInsertBlockly.injectCustomizeApi = function () {
    //添加Api
    LinkListInsertBlockly.algAddCode();
    //生成添加代码字符串
    LinkListInsertBlockly.generateAddCodeToString(LinkListInsertBlockly.customizeApi);
}
/* 动态更新展示代码 */
LinkListInsertBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
LinkListInsertBlockly.resetStepUi = function (clearOutput) {
    LinkListInsertBlockly.workspace.highlightBlock(null);
    LinkListInsertBlockly.highlightPause = false;

    if (clearOutput) {
        LinkListInsertBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
LinkListInsertBlockly.highlightBlock = function (id) {
    LinkListInsertBlockly.workspace.highlightBlock(id);
    LinkListInsertBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
LinkListInsertBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        LinkListInsertBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(LinkListInsertBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in LinkListInsertBlockly.customizeApi) {
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(LinkListInsertBlockly.customizeApi[key][1]));
    }
}
/* 添加自定义Api函数 */
LinkListInsertBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
LinkListInsertBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {
        LinkListInsertBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
LinkListInsertBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode;
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    LinkListInsertBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    LinkListInsertBlockly.resetStepUi(true);

}

//=======================================
/* 自定义API：控制台打印字符串 */
LinkListInsertBlockly.printStrWrapper = function (str) {
    console.log(str);
}

/* 将链表对象转换为数组 */
LinkListInsertBlockly.linkList2Arr = function (linklist) {
    var arr = [];

    //console.log(linklist);
    if (linklist.head != null) {

        var cur = linklist.head;
        while (cur != null) {
            arr.push(cur.a.value);
            cur = cur.a.next;
        }
    }
    // console.log(arr);
    return arr;
}

/* 自定义API：获得Graph图数组函数 */
LinkListInsertBlockly.getGraphArrayWrapper = function (linklist) {

    if (linklist != undefined) {
        var arrChange = LinkListInsertBlockly.linkList2Arr(linklist.a);

        //图表改变时执行内部语句
        if (LinkListInsertTools.getGraphChangeIndex(arrChange, LinkListInsertChart.arrNow)) {

            LinkListInsertChart.arrNow.splice(0, LinkListInsertChart.arrNow.length);
            for (let i = 0; i < arrChange.length; i++) {
                LinkListInsertChart.arrNow.push(arrChange[i]);
            }
            return true;
        }
    }

    return false;
}

/* 自定义API：获得需要删除的val函数 */
LinkListInsertBlockly.getValueWrapper = function (val) {

    if (val != undefined && val != LinkListInsertChart.linklistInsertValue) {
        LinkListInsertChart.linklistInsertValue = val;

        //返回需要修改数据
        return true;
    }

    return false;
}

/* 自定义API：获得当前搜索到的位置curr */
LinkListInsertBlockly.getCurrWrapper = function (linklist, curr) {

    if (curr != undefined) {
        let pos = 0;
        let tmp = linklist.a.head;
        while (tmp != null && tmp != curr) {
            tmp = tmp.a.next;
            pos++;
        }

        LinkListInsertChart.dataChangeIndex[0] = pos;

        if (tmp == null || curr.a.value != tmp.a.value) {
            LinkListInsertChart.dataChangeIndex[0] = -1;
        }

        //返回需要修改数据
        return true;
    }

    return false;
}

/* 自定义API：获得需要插入的位置position */
LinkListInsertBlockly.getPosWrapper = function (position) {
    if (position != undefined && position != LinkListInsertChart.dataChangeIndex[1]) {
        LinkListInsertChart.dataChangeIndex[1] = position;
        return true;
    }

    return false;
}


/* 自定义API：获得所有链表删除变量 */
LinkListInsertBlockly.getlinklistArgsWrapper = function (linklist, val, position, curr) {

    var linklistFlag = LinkListInsertBlockly.getGraphArrayWrapper(linklist);
    var valFlag = LinkListInsertBlockly.getValueWrapper(val);
    var currFlag = LinkListInsertBlockly.getCurrWrapper(linklist, curr);
    var positionFlag = LinkListInsertBlockly.getPosWrapper(position);

    if (linklistFlag || valFlag || currFlag || positionFlag) {
        // 填入数据
        //console.log(LinkListInsertChart.dataChangeIndex);
        LinkListInsertChart.changeChart(LinkListInsertBlockly.hasMoreCode, LinkListInsertChart.showChart, LinkListInsertChart.arrNow, LinkListInsertChart.dataChangeIndex);
    }
}

/* 链表类算法需要添加的代码 */
LinkListInsertBlockly.linklistAlgAddCode = function () {
    LinkListInsertBlockly.addApi(LinkListInsertBlockly.customizeApi, 'getlinklistArgs', 'getlinklistArgs(linklist, val, position, curr);\n', LinkListInsertBlockly.getlinklistArgsWrapper);
    //LinkListInsertBlockly.addApi(LinkListInsertBlockly.customizeApi, 'myprint', 'myprint(index);\n', LinkListInsertBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var LinkListInsertTools = {};
//========================================================================
LinkListInsertTools.linklistAttr = { title: '链表插入算法', type: 'graph', nodeWidth: 50, nodeHeight: 50, seriesWidth: 0, lineLength: 50, color: ['#d71345', '#ffe600', '#009ad6'] };    //普通节点：红，当前节点：黄，需要插入节点：蓝
//====================================================================================
/* 将数组转化为链表算法的图表数据对象组数 */
LinkListInsertTools.arrToLinkListChartDataObjArr = function (arr, objArr, size) {

    let objLen = objArr.length;
    let arrLen = arr.length;

    //console.log(objArr);
    // console.log(arr);
    if ((arrLen > objLen) && (objLen == 0)) {  //初始化
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
    } else if ((arrLen == objLen + 1) || (LinkListInsertChart.linklistFlag == 1)) { //需要插入时或正在插入时
        //获得到插入的位置和值
        let pos = LinkListInsertChart.dataChangeIndex[1];
        let newVal = arr[pos];

        if (LinkListInsertChart.linklistFlag == 1) {
            objArr[pos].y = 300;
            if (pos == 0) {   //要插入的位置为0
                objArr[pos].name = "head：\n" + objArr[pos].name;
                if (objArr.length > 1) {
                    objArr[pos + 1].name = objArr[pos + 1].name.split("：\n")[1];
                }
            }

            LinkListInsertChart.linklistFlag = 2;
        } else if (LinkListInsertChart.linklistFlag == 0) {
            //插入位置为追加在数组末尾
            if (pos == objArr.length) {
                objArr.splice(pos, 0, { id: pos, name: newVal, x: size * pos, y: 200 });
            } else {
                objArr.splice(pos, 0, { id: pos, name: "" + newVal, x: size * pos, y: 200 });

                for (let i = pos + 1; i < objArr.length; i++) {
                    objArr[i].id = i;
                    objArr[i].x = size * i;
                    objArr[i].y = 300;
                }
            }
            LinkListInsertChart.linklistFlag = 1;
        }
    }
}

/* 设置graph数据和连接 */
LinkListInsertTools.setGraphData = function (attr, data, codeStr, linklistObjectArr, linklistObjectLinks) {

    //获取到数据设置arrNow
    LinkListInsertChart.getArrInitData(codeStr);

    //设置容器Height
    attr.seriesWidth = (attr.lineLength + attr.nodeWidth) * (data.length - 1) + 1;

    //抽取图标数据
    LinkListInsertTools.arrToLinkListChartDataObjArr(data, linklistObjectArr, attr.nodeWidth + attr.lineLength);

    //获得连接
    let len = linklistObjectArr.length;
    for (let i = 0; i < len - 1; i++) {
        //当需要插入
        if ((LinkListInsertChart.linklistFlag == 1) && (i == (LinkListInsertChart.dataChangeIndex[1] - 1))) {
            linklistObjectLinks.push({ source: i, target: i + 2 });
        } else {
            linklistObjectLinks.push({ source: i, target: i + 1 });
        }
    }
}

/* 设置graph属性 */
LinkListInsertTools.setGraphAttr = function (attr) {
    var chartAttr = {
        chartTitle: attr.title,
        chartType: attr.type,
        chartData: LinkListInsertChart.linklistObjectArr,
        chartLinks: LinkListInsertChart.linklistObjectLinks,
        nodeWidth: attr.nodeWidth,
        nodeHeight: attr.nodeHeight,
        seriesWidth: attr.seriesWidth,
        itemColor: attr.color
    }
    return chartAttr;
}

/* 获得Graph图数组改变的索引值 */
LinkListInsertTools.getGraphChangeIndex = function (newData, oldData) {

    //当插入链表元素时
    if (newData.length == oldData.length + 1) {
        return true;
    }

    return false;
}

/******************************执行包***********************************/
var LinkListInsertExecute = {};

/* 执行设置Blockly */
LinkListInsertExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {

    // 通过xml文件路径获取xml对象
    let workspaceXML = LinkListInsertBlockly.getWorkspaceXML(XMLpath);
    let initworkspaceXML=LinkListInsertBlockly.getWorkspaceXML("static/xml/linklists/linklist_insert_init_workspace.xml");
    // 定义Blockly工作空间
    LinkListInsertBlockly.workspace = LinkListInsertBlockly.initBlockly(blocklyDiv, mediaPath,workspaceXML);

    // 定义预定义块
    Blockly.Xml.domToWorkspace(initworkspaceXML, LinkListInsertBlockly.workspace);

}

/* 执行设置代码输出 */
LinkListInsertExecute.setOutputArea = function (outputDiv) {

    //定义结果输出区域
    LinkListInsertBlockly.outputArea = outputDiv;
}

/* 执行设置按钮功能 */
LinkListInsertExecute.setButton = function (runButton, stopButton, continueButton, overButton) {
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
LinkListInsertExecute.setShowCodeArea = function (showCodeDiv) {

    LinkListInsertExecute.setCodeInject();
    LinkListInsertBlockly.showCodeArea = showCodeDiv;
    LinkListInsertBlockly.workspace.addChangeListener(LinkListInsertBlockly.updateShowCode(LinkListInsertBlockly.workspace, LinkListInsertBlockly.showCodeArea));

}

/* 设置代码注入 */
LinkListInsertExecute.setCodeInject = function () {
    //定义注入的API
    LinkListInsertBlockly.algAddCode = LinkListInsertBlockly.linklistAlgAddCode;

    //注入API
    LinkListInsertBlockly.injectCustomizeApi();

    //生成新代码
    LinkListInsertBlockly.generateCodeAndLoadIntoInterpreter(LinkListInsertBlockly.addCode, LinkListInsertBlockly.workspace);

    //工作空间绑定监听事件
    LinkListInsertBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            LinkListInsertBlockly.generateCodeAndLoadIntoInterpreter(LinkListInsertBlockly.addCode, LinkListInsertBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
LinkListInsertExecute.setShowChart = function (showDiv) {

    LinkListInsertChart.showChart = LinkListInsertChart.initLinkListChart(showDiv);
    LinkListInsertChart.dataChangeIndex = LinkListInsertChart.linklistDataChangeIndex;
    LinkListInsertChart.changeChart = LinkListInsertChart.linklistChangeChart;
}

/* 执行赋值 */
LinkListInsertExecute.setExtend = function () {
    ustc_vp.Chart = LinkListInsertChart;
    ustc_vp.Blockly = LinkListInsertBlockly;
    ustc_vp.tools = LinkListInsertTools;
    ustc_vp.Execute = LinkListInsertExecute;

    //清空图表和块数据
    LinkListInsertChart.dataClear();
    LinkListInsertBlockly.dataClear();
}
