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
var LinkListDeleteChart = {};
// 定义当前图表数据和改变索引
LinkListDeleteChart.initData = [];
LinkListDeleteChart.arrNow = [];
LinkListDeleteChart.showChart = null;
LinkListDeleteChart.dataChangeIndex = null;
LinkListDeleteChart.linklistObjectArr = [];
LinkListDeleteChart.linklistObjectLinks = [];

LinkListDeleteChart.changeChart = null;   //(函数)图表改变时的执行函数

//=================================================================================
//普通节点：红，前置节点：黄，当前节点：蓝
LinkListDeleteChart.linklistDataChangeIndex = [-1, -1, -1];  //搜索到的链表[之前位置，当前位置，数组改变的位置]
LinkListDeleteChart.linklistSearchValue = -1; //需要搜索的值
LinkListDeleteChart.linklistFlag = 0; //链表改变标志
//=================================================================================
/* 清除所有数据 */
LinkListDeleteChart.dataClear = function () {
    LinkListDeleteChart.initData = [];
    LinkListDeleteChart.arrNow = [];
    LinkListDeleteChart.showChart = null;
    LinkListDeleteChart.dataChangeIndex = null;
    LinkListDeleteChart.linklistObjectArr = [];
    LinkListDeleteChart.linklistObjectLinks = [];

    LinkListDeleteChart.changeChart = null;   //(函数)图表改变时的执行函数

    LinkListDeleteChart.linklistDataChangeIndex = [-1, -1, -1];  //搜索到的链表[之前位置，当前位置，数组改变的位置]
    LinkListDeleteChart.linklistSearchValue = -1; //需要搜索的值
    LinkListDeleteChart.linklistFlag = 0; //链表改变标志
}
/* 获取图表初始化的数据 */
LinkListDeleteChart.getArrInitData = function (codeStr) {
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
            LinkListDeleteChart.initData.push(parseInt(dateList[num]));
        }

        ustc_vp.utils.sourceToDest(LinkListDeleteChart.initData, LinkListDeleteChart.arrNow);
    }
}

/* 初始化链表图表的数据和属性 */
LinkListDeleteChart.initLinkListDataChart = function (showItem, chartAttr) {
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
LinkListDeleteChart.initLinkListChart = function (showItem) {
    LinkListDeleteTools.setGraphData(LinkListDeleteTools.linklistAttr, LinkListDeleteChart.arrNow, LinkListDeleteBlockly.latestCode, LinkListDeleteChart.linklistObjectArr, LinkListDeleteChart.linklistObjectLinks);
    return LinkListDeleteChart.initLinkListDataChart(showItem, LinkListDeleteTools.setGraphAttr(LinkListDeleteTools.linklistAttr));
}

/* 修改副标题函数 */
LinkListDeleteChart.changeSubtext = function (dataChangeIndex, data) {
    if (LinkListDeleteChart.linklistSearchValue != -1) {
        str1 = "搜索值为：" + LinkListDeleteChart.linklistSearchValue;
    } else {
        str1 = "";
    }

    // console.log(data);
    if ((dataChangeIndex[0] == -1) && (dataChangeIndex[1] == -1) && (dataChangeIndex[2] == -1)) {
        str2 = "";
    } else if (dataChangeIndex[1] != -1) {   //当前搜索值
        // console.log(data[dataChangeIndex[0]]);
        // console.log(LinkListDeleteChart.linklistSearchValue);
        if (dataChangeIndex[0] == data.length - 1) {
            str2 = "，搜索值不在当前链表中，搜索失败！"
        } else {
            str2 = "，当前搜索位置为：" + dataChangeIndex[1];
        }

    } else if (dataChangeIndex[1] == -1 && dataChangeIndex[2] != -1) {
        str2 = "，成功搜索到并删除原位置为：" + dataChangeIndex[2];
    }

    return str1 + str2;
}
/* 数据改变时设置链表图表 */
LinkListDeleteChart.setLinkListChartOption = function (chart, data, dataChangeIndex, chartAttr) {
    // console.log("setLinkListChartOption:");
    // console.log(chartAttr);
    // console.log(data);
    chart.setOption({
        title: {
            text: chartAttr.chartTitle,
            subtext: LinkListDeleteChart.changeSubtext(dataChangeIndex, data), //副标题 
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
                            } else if (i == dataChangeIndex[1]) {
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
LinkListDeleteChart.changeChart(LinkListDeleteBlockly.hasMoreCode, LinkListDeleteChart.showChart, LinkListDeleteChart.arrNow, LinkListDeleteChart.dataChangeIndex); 
*/
LinkListDeleteChart.linklistChangeChart = function (hasMoreCode, chart, data, dataChangeIndex) {

    //重新执行或者结束的时候重置数据
    if (!hasMoreCode) {
        for (let i = 0; i < dataChangeIndex.length; i++) {
            dataChangeIndex[i] = -1;
        }

        LinkListDeleteChart.linklistSearchValue = -1;

        //清空原始数据和连接关系
        LinkListDeleteChart.linklistObjectArr.splice(0, LinkListDeleteChart.linklistObjectArr.length);
        LinkListDeleteChart.linklistObjectLinks.splice(0, LinkListDeleteChart.linklistObjectLinks.length);
        //清空链表的改变标记
        LinkListDeleteChart.linklistFlag = 0;
        ustc_vp.utils.sourceToDest(LinkListDeleteChart.initData, data);
    }

    // console.log(dataChangeIndex);

    //修改容器宽度
    LinkListDeleteTools.linklistAttr.seriesWidth = (LinkListDeleteTools.linklistAttr.lineLength + LinkListDeleteTools.linklistAttr.nodeWidth) * (data.length - 1) + 1;
    //抽取图表数据
    LinkListDeleteTools.arrToLinkListChartDataObjArr(data, LinkListDeleteChart.linklistObjectArr, LinkListDeleteTools.linklistAttr.nodeWidth + LinkListDeleteTools.linklistAttr.lineLength);

    //获得连接
    LinkListDeleteChart.linklistObjectLinks.splice(0, LinkListDeleteChart.linklistObjectLinks.length);

    let len = LinkListDeleteChart.linklistObjectArr.length;

    for (let i = 0; i < len - 1; i++) {
        if (dataChangeIndex[1] == i) {
            LinkListDeleteChart.linklistObjectLinks.push({ source: i, target: i + 1, lineStyle: { color: '#009ad6' } });
        } else if (dataChangeIndex[0] == i) {
            if (LinkListDeleteChart.linklistFlag == 1) {
                LinkListDeleteChart.linklistObjectLinks.push({ source: i, target: i + 2, lineStyle: { color: '#ffe600' } });
            } else {
                LinkListDeleteChart.linklistObjectLinks.push({ source: i, target: i + 1, lineStyle: { color: '#ffe600' } });
            }
        } else {
            LinkListDeleteChart.linklistObjectLinks.push({ source: i, target: i + 1, lineStyle: { color: '#409EFF' } });
        }
    }

    // 在数据改变时设置链表图表
    LinkListDeleteChart.setLinkListChartOption(chart, LinkListDeleteChart.linklistObjectArr, dataChangeIndex, LinkListDeleteTools.setGraphAttr(LinkListDeleteTools.linklistAttr));
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
var LinkListDeleteBlockly = {};
LinkListDeleteBlockly.workspace = null;
LinkListDeleteBlockly.outputArea = null;
LinkListDeleteBlockly.showCodeArea = null;
LinkListDeleteBlockly.hasMoreCode = true;
LinkListDeleteBlockly.highlightPause = false;
LinkListDeleteBlockly.codeInterpreter = null;
LinkListDeleteBlockly.latestCode = '';
LinkListDeleteBlockly.addCode = '';   // 添加代码字符串
// 将自定义的api作为对象放入customizeApi再由initInterpretApi获得
/*例子：注意数组第一项中的参数必须在存在
customzeApi ={
    'getBarArray': ['getBarArray(arr);\n',LinkListDeleteBlockly.getBarArrayWrapper],
    'myprint': ['myprint(%1);\n',LinkListDeleteBlockly.printStrWrapper]
}
*/
LinkListDeleteBlockly.customizeApi = {};

LinkListDeleteBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
//=============================================================
LinkListDeleteBlockly.dataClear = function () {
    LinkListDeleteBlockly.workspace = null;
    LinkListDeleteBlockly.outputArea = null;
    LinkListDeleteBlockly.showCodeArea = null;
    LinkListDeleteBlockly.hasMoreCode = true;
    LinkListDeleteBlockly.highlightPause = false;
    LinkListDeleteBlockly.codeInterpreter = null;
    LinkListDeleteBlockly.latestCode = '';
    LinkListDeleteBlockly.addCode = '';   // 添加代码字符串
    LinkListDeleteBlockly.customizeApi = {};
    
    LinkListDeleteBlockly.algAddCode = null; //(函数)需要不同类型的算法需要添加的API
}
/*
函数功能：获得从文件中读取的xml，
函数参数：workspace的XML文件位置
函数返回：从文件中读取的xml对象
注意：本地需要在浏览器属性之后加上：--allow-file-access-from-files
     防止跨域问题
*/
LinkListDeleteBlockly.getWorkspaceXML = function (XMLpath) {
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
LinkListDeleteBlockly.initBlockly = function (blocklyDiv, mediaLocation) {
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
LinkListDeleteBlockly.injectCustomizeApi = function () {
    //添加Api
    LinkListDeleteBlockly.algAddCode();
    //生成添加代码字符串
    LinkListDeleteBlockly.generateAddCodeToString(LinkListDeleteBlockly.customizeApi);
}
/* 动态更新展示代码 */
LinkListDeleteBlockly.updateShowCode = function (workspace, showCodeArea) {
    showCodeArea.value = Blockly.JavaScript.workspaceToCode(workspace);
}
/* 重置下一步的用户界面 */
LinkListDeleteBlockly.resetStepUi = function (clearOutput) {
    LinkListDeleteBlockly.workspace.highlightBlock(null);
    LinkListDeleteBlockly.highlightPause = false;

    if (clearOutput) {
        LinkListDeleteBlockly.outputArea.value = 'Program output:\n=================';
    }
}
/* 设置高亮块 */
LinkListDeleteBlockly.highlightBlock = function (id) {
    LinkListDeleteBlockly.workspace.highlightBlock(id);
    LinkListDeleteBlockly.highlightPause = true;
}
/* 初始化需要解析的API */
LinkListDeleteBlockly.initInterpretApi = function (interpreter, scope) {
    // 解析执行js中的window.alert(text)程序
    var alertWrapper = function (text) {
        text = arguments.length ? text : '';
        LinkListDeleteBlockly.outputArea.value += '\n' + text;  //每次执行将结果放入textArea中
    }
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));

    // 解析执行js中的highlightBlock程序
    var highlightBlockWrapper = function (id) {
        id = String(id || '');
        return interpreter.createPrimitive(LinkListDeleteBlockly.highlightBlock(id));
    }
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(highlightBlockWrapper));

    for (let key in LinkListDeleteBlockly.customizeApi) {
        interpreter.setProperty(scope, key.toString(), interpreter.createNativeFunction(LinkListDeleteBlockly.customizeApi[key][1]));
    }
}
/* 添加自定义Api函数 */
LinkListDeleteBlockly.addApi = function (customizeApi, execFunctionName, execFunctionString, customizeFunctionName) {
    customizeApi[execFunctionName.toString()] = [execFunctionString, customizeFunctionName];
}
/* 生成添加代码字符串 */
LinkListDeleteBlockly.generateAddCodeToString = function (customizeApi) {
    for (let key in customizeApi) {
        LinkListDeleteBlockly.addCode += customizeApi[key][0];
    }
}
/* 生成并解析代码 */
LinkListDeleteBlockly.generateCodeAndLoadIntoInterpreter = function (addCode, workspace) {
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n' + addCode;
    // 确保函数名和变量名不会冲突（自定义的API可加可不加）
    Blockly.JavaScript.addReservedWords('highlightBlock');
    LinkListDeleteBlockly.latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    LinkListDeleteBlockly.resetStepUi(true);

}

//=======================================
/* 自定义API：控制台打印字符串 */
LinkListDeleteBlockly.printStrWrapper = function (str) {
    console.log(str);
}

/* 将链表对象转换为数组 */
LinkListDeleteBlockly.linkList2Arr = function (linklist) {
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
LinkListDeleteBlockly.getGraphArrayWrapper = function (linklist) {

    if (linklist != undefined) {
        var arrChange = LinkListDeleteBlockly.linkList2Arr(linklist.a);

        //图表改变时执行内部语句
        if (LinkListDeleteTools.getGraphChangeIndex(arrChange, LinkListDeleteChart.arrNow, LinkListDeleteChart.dataChangeIndex)) {

            LinkListDeleteChart.arrNow.splice(0, LinkListDeleteChart.arrNow.length);
            for (let i = 0; i < arrChange.length; i++) {
                LinkListDeleteChart.arrNow.push(arrChange[i]);
            }
            return true;
        }
    }

    return false;
}

/* 自定义API：获得需要删除的val函数*/
LinkListDeleteBlockly.getValueWrapper = function (val) {

    if (val != undefined && val != LinkListDeleteChart.linklistSearchValue) {
        LinkListDeleteChart.linklistSearchValue = val;

        //返回需要修改数据
        return true;
    }

    return false;
}

/* 自定义API：获得curr*/
LinkListDeleteBlockly.getCurrWrapper = function (linklist, curr) {

    if (curr != undefined) {
        let pos = 0;
        let tmp = linklist.a.head;
        while (tmp != null && tmp != curr) {
            tmp = tmp.a.next;
            pos++;
        }

        LinkListDeleteChart.dataChangeIndex[1] = pos;

        if (tmp == null || curr.a.value != tmp.a.value) {
            LinkListDeleteChart.dataChangeIndex[1] = -1;
        }

        //返回需要修改数据
        return true;
    }

    return false;
}

/* 自定义API：获得previous*/
LinkListDeleteBlockly.getPreWrapper = function (linklist, previous) {

    if (previous != undefined) {

        let pos = 0;
        let tmp = linklist.a.head;
        while (tmp != null && tmp != previous) {
            tmp = tmp.a.next;
            pos++;
        }
        LinkListDeleteChart.dataChangeIndex[0] = pos;

        //返回需要修改数据
        return true;
    }

    return false;
}

/* 自定义API：获得所有链表删除变量 */
LinkListDeleteBlockly.getlinklistArgsWrapper = function (linklist, val, curr, previous) {

    var linklistFlag = LinkListDeleteBlockly.getGraphArrayWrapper(linklist);
    var valFlag = LinkListDeleteBlockly.getValueWrapper(val);
    var currFlag = LinkListDeleteBlockly.getCurrWrapper(linklist, curr);
    var previousFlag = LinkListDeleteBlockly.getPreWrapper(linklist, previous);

    if (linklistFlag || valFlag || currFlag || previousFlag) {
        // 填入数据
        //console.log(LinkListDeleteChart.dataChangeIndex);
        LinkListDeleteChart.changeChart(LinkListDeleteBlockly.hasMoreCode, LinkListDeleteChart.showChart, LinkListDeleteChart.arrNow, LinkListDeleteChart.dataChangeIndex);
    }
}

/* 链表类算法需要添加的代码 */
LinkListDeleteBlockly.linklistAlgAddCode = function () {
    LinkListDeleteBlockly.addApi(LinkListDeleteBlockly.customizeApi, 'getlinklistArgs', 'getlinklistArgs(linklist, val, curr, previous);\n', LinkListDeleteBlockly.getlinklistArgsWrapper);
    //LinkListDeleteBlockly.addApi(LinkListDeleteBlockly.customizeApi, 'myprint', 'myprint(index);\n', LinkListDeleteBlockly.printStrWrapper);
}

/******************************业务相关工具包***********************************/
var LinkListDeleteTools = {};
//========================================================================
LinkListDeleteTools.linklistAttr = { title: '链表删除算法', type: 'graph', nodeWidth: 50, nodeHeight: 50, seriesWidth: 0, lineLength: 50, color: ['#d71345', '#ffe600', '#009ad6'] };    //普通节点：红，前置节点：黄，当前节点：蓝
//====================================================================================
/* 将数组转化为链表算法的图表数据对象组数 */
LinkListDeleteTools.arrToLinkListChartDataObjArr = function (arr, objArr, size) {

    let objLen = objArr.length;
    let arrLen = arr.length;


    // console.log(arr);
    if ((arrLen > (objLen - 1)) && (objLen == 0)) {  //初始化
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
    } else if (objLen == arrLen + 1) { //删除时
        //获得到删除的位置
        let pos = -1;
        for (let i = 0; i < arrLen; i++) {
            let tmp;
            if (i == 0) {
                tmp = objArr[i].name.split("：")[1];
            } else {
                tmp = objArr[i].name;
            }
            if (parseInt(tmp) != arr[i]) {
                pos = i;
                break;
            }
        }
        if (pos == -1) {
            pos = objLen - 1;
        }

        if (LinkListDeleteChart.linklistFlag == 1) {
            objArr[pos].y = 300;
            if (pos == 0) {   //要删除的位置为0
                objArr[pos].name = "head：" + objArr[pos + 1].name;
            } else if (pos != objArr.length - 1) {
                objArr[pos].name = objArr[pos + 1].name;
            }
            for (let i = pos + 1; i < objArr.length - 1; i++) {
                objArr[i].name = objArr[i + 1].name;
            }

            objArr.splice(objArr.length - 1, 1);

            LinkListDeleteChart.linklistFlag = 2;
        } else {
            objArr[pos].y = 400;
            LinkListDeleteChart.dataChangeIndex[1] = pos;
            LinkListDeleteChart.linklistFlag = 1;
        }
    }
}

/* 设置graph数据和连接 */
LinkListDeleteTools.setGraphData = function (attr, data, codeStr, linklistObjectArr, linklistObjectLinks) {

    //获取到数据设置arrNow
    LinkListDeleteChart.getArrInitData(codeStr);

    //设置容器Height
    attr.seriesWidth = (attr.lineLength + attr.nodeWidth) * (data.length - 1) + 1;

    //抽取图标数据
    LinkListDeleteTools.arrToLinkListChartDataObjArr(data, linklistObjectArr, attr.nodeWidth + attr.lineLength);

    //获得连接
    let len = linklistObjectArr.length;
    for (let i = 0; i < len - 1; i++) {
        linklistObjectLinks.push({ source: i, target: i + 1 })
    }
}

/* 设置graph属性 */
LinkListDeleteTools.setGraphAttr = function (attr) {
    var chartAttr = {
        chartTitle: attr.title,
        chartType: attr.type,
        chartData: LinkListDeleteChart.linklistObjectArr,
        chartLinks: LinkListDeleteChart.linklistObjectLinks,
        nodeWidth: attr.nodeWidth,
        nodeHeight: attr.nodeHeight,
        seriesWidth: attr.seriesWidth,
        itemColor: attr.color
    }
    return chartAttr;
}

/* 获得Graph图数组改变的索引值 */
LinkListDeleteTools.getGraphChangeIndex = function (newData, oldData, dataChangeIndex) {

    //当删除链表元素时
    if (newData.length == oldData.length - 1) {
        for (let i = 0; i < newData.length; i++) {
            if (oldData[i] != newData[i]) {
                dataChangeIndex[2] = i;
                // console.log(dataChangeIndex[2]);
                return true;
            }
        }

        dataChangeIndex[2] = oldData.length - 1;
        // console.log(dataChangeIndex[2]);
        return true;
    }

    return false;
}

/******************************执行包***********************************/
var LinkListDeleteExecute = {};

/* 执行设置Blockly */
LinkListDeleteExecute.setBlockly = function (blocklyDiv, mediaPath, XMLpath) {

    // 定义Blockly工作空间
    LinkListDeleteBlockly.workspace = LinkListDeleteBlockly.initBlockly(blocklyDiv, mediaPath);

    // 通过xml文件路径获取xml对象
    let workspaceXML = LinkListDeleteBlockly.getWorkspaceXML(XMLpath);

    // 定义预定义块
    Blockly.Xml.domToWorkspace(workspaceXML, LinkListDeleteBlockly.workspace);

}

/* 执行设置代码输出 */
LinkListDeleteExecute.setOutputArea = function (outputDiv) {

    //定义结果输出区域
    LinkListDeleteBlockly.outputArea = outputDiv;
}

/* 执行设置按钮功能 */
LinkListDeleteExecute.setButton = function (runButton, stopButton, continueButton, overButton) {
    runButton.onclick = ustc_vp.Operate.runCode;
    stopButton.onclick = ustc_vp.Operate.stopCode;
    continueButton.onclick = ustc_vp.Operate.continueCode;
    overButton.onclick = ustc_vp.Operate.overCode;

    ustc_vp.Operate.initButton(runButton, stopButton, continueButton, overButton);
}

/* 执行设置代码显示区域 */
LinkListDeleteExecute.setShowCodeArea = function (showCodeDiv) {

    LinkListDeleteExecute.setCodeInject();
    LinkListDeleteBlockly.showCodeArea = showCodeDiv;
    LinkListDeleteBlockly.workspace.addChangeListener(LinkListDeleteBlockly.updateShowCode(LinkListDeleteBlockly.workspace, LinkListDeleteBlockly.showCodeArea));

}

/* 设置代码注入 */
LinkListDeleteExecute.setCodeInject = function () {
    //定义注入的API
    LinkListDeleteBlockly.algAddCode = LinkListDeleteBlockly.linklistAlgAddCode;

    //注入API
    LinkListDeleteBlockly.injectCustomizeApi();

    //生成新代码
    LinkListDeleteBlockly.generateCodeAndLoadIntoInterpreter(LinkListDeleteBlockly.addCode, LinkListDeleteBlockly.workspace);

    //工作空间绑定监听事件
    LinkListDeleteBlockly.workspace.addChangeListener(function (event) {
        if (!(event instanceof Blockly.Events.Ui)) {
            LinkListDeleteBlockly.generateCodeAndLoadIntoInterpreter(LinkListDeleteBlockly.addCode, LinkListDeleteBlockly.workspace);
        }
    });
}

/* 执行设置图表 */
LinkListDeleteExecute.setShowChart = function (showDiv) {

    LinkListDeleteChart.showChart = LinkListDeleteChart.initLinkListChart(showDiv);
    LinkListDeleteChart.dataChangeIndex = LinkListDeleteChart.linklistDataChangeIndex;
    LinkListDeleteChart.changeChart = LinkListDeleteChart.linklistChangeChart;
}

/* 执行赋值 */
LinkListDeleteExecute.setExtend = function () {
    ustc_vp.Chart = LinkListDeleteChart;
    ustc_vp.Blockly = LinkListDeleteBlockly;
    ustc_vp.tools = LinkListDeleteTools;
    ustc_vp.Execute = LinkListDeleteExecute;

    //清空图表和块数据
    LinkListDeleteChart.dataClear();
    LinkListDeleteBlockly.dataClear();
}