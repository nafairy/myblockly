/******************************模块预处理单元***********************************/
/*
主要工作：
    1.检查是否引入Echarts.js和Blockly.js的工具包
    2.检测环境中是否有echarts和Blockly对象
*/
//检测是否引入Echarts和Blockly
(function () {
    if (typeof (echarts) == 'undefined') {
        throw Error("未引入Echarts，需要先引入Echarts");
    }
    else if (typeof (Blockly) == 'undefined') {
        throw Error("未引入Blockly，需要先引入Google Blockly");
    }

})();

var ustc_vp = {};

/******************************图表包***********************************/
ustc_vp.Chart = {};

/******************************工作块包***********************************/
ustc_vp.Blockly = {};

/******************************操作包***********************************/
ustc_vp.Operate = {};
ustc_vp.Operate.runCodeInterval = null;
ustc_vp.Operate.operationButton = { runButton: false, stopButton: false, continueButton: false, overButton: false, changeBlocklyButton: false }
ustc_vp.Operate.execSpeed = 500;
/* 初始化按钮 */
ustc_vp.Operate.initButton = function (runButton, stopButton, continueButton, overButton, changeBlocklyButton) {
    ustc_vp.Operate.operationButton.runButton = runButton;
    ustc_vp.Operate.operationButton.stopButton = stopButton;
    ustc_vp.Operate.operationButton.continueButton = continueButton;
    ustc_vp.Operate.operationButton.overButton = overButton;
    ustc_vp.Operate.operationButton.changeBlocklyButton = changeBlocklyButton;

    ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.removeAttribute('disabled') : null;
    ustc_vp.Operate.operationButton.stopButton ? ustc_vp.Operate.operationButton.stopButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.continueButton ? ustc_vp.Operate.operationButton.continueButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.overButton ? ustc_vp.Operate.operationButton.overButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.changeBlocklyButton ? ustc_vp.Operate.operationButton.changeBlocklyButton.removeAttribute('disabled') : null;
}


/* 定时器运行函数 */
ustc_vp.Operate.runFunction = function (millisec) {

    ustc_vp.Operate.runCodeInterval = setInterval(() => {
        var codeErr = false;
        if (!ustc_vp.Blockly.codeInterpreter) {
            ustc_vp.Blockly.resetStepUi(true);
            ustc_vp.Blockly.codeInterpreter = new Interpreter(ustc_vp.Blockly.latestCode, ustc_vp.Blockly.initInterpretApi);
            return;
        }
        ustc_vp.Blockly.highlightPause = false;
        do {
            try {
                ustc_vp.Blockly.hasMoreCode = ustc_vp.Blockly.codeInterpreter.step();

            } catch (err) {
                codeErr = true;
                // 设置按钮
                ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.setAttribute("disabled", true) : null;
                ustc_vp.Operate.operationButton.stopButton ? ustc_vp.Operate.operationButton.stopButton.setAttribute("disabled", true) : null;
                ustc_vp.Operate.operationButton.continueButton ? ustc_vp.Operate.operationButton.continueButton.setAttribute("disabled", true) : null;
                ustc_vp.Operate.operationButton.overButton ? ustc_vp.Operate.operationButton.overButton.setAttribute("disabled", true) : null;
                console.log(err);

            } finally {
                if (codeErr) {

                    ustc_vp.Blockly.outputArea.value += '\n\n<< Program complete >>';
                    ustc_vp.Blockly.codeInterpreter = null;

                    ustc_vp.Blockly.resetStepUi(false);
                    clearInterval(ustc_vp.Operate.runCodeInterval);

                    // 柱状图颜色还原
                    ustc_vp.Chart.changeChart(ustc_vp.Blockly.hasMoreCode, ustc_vp.Chart.showChart, ustc_vp.Chart.arrNow, ustc_vp.Chart.dataChangeIndex);
                    throw Error("程序出错！！！");
                }
                // 没有程序了
                if (!ustc_vp.Blockly.hasMoreCode) {

                    // 输出执行结束
                    ustc_vp.Blockly.outputArea.value += '\n\n<< Program complete >>';
                    ustc_vp.Blockly.codeInterpreter = null;
                    ustc_vp.Blockly.resetStepUi(false);

                    // 设置按钮
                    ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.removeAttribute('disabled') : null;
                    ustc_vp.Operate.operationButton.stopButton ? ustc_vp.Operate.operationButton.stopButton.setAttribute("disabled", true) : null;
                    ustc_vp.Operate.operationButton.continueButton ? ustc_vp.Operate.operationButton.continueButton.setAttribute("disabled", true) : null;
                    ustc_vp.Operate.operationButton.overButton ? ustc_vp.Operate.operationButton.overButton.setAttribute("disabled", true) : null;

                    // 定时器关闭
                    clearInterval(ustc_vp.Operate.runCodeInterval);
                    return;
                }
            }
        } while (ustc_vp.Blockly.hasMoreCode && !ustc_vp.Blockly.highlightPause);
    }, millisec);
}
/* 停止运行代码 */
ustc_vp.Operate.stopCode = function () {
    //设置按钮不可用
    ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.removeAttribute('disabled') : null;
    ustc_vp.Operate.operationButton.stopButton ? ustc_vp.Operate.operationButton.stopButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.continueButton ? ustc_vp.Operate.operationButton.continueButton.removeAttribute("disabled") : null;
    ustc_vp.Operate.operationButton.overButton ? ustc_vp.Operate.operationButton.overButton.removeAttribute("disabled") : null;
    clearInterval(ustc_vp.Operate.runCodeInterval);
}
/* 继续执行代码 */
ustc_vp.Operate.continueCode = function () {
    //设置按钮不可用
    ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.removeAttribute('disabled') : null;
    ustc_vp.Operate.operationButton.stopButton ? ustc_vp.Operate.operationButton.stopButton.removeAttribute('disabled') : null;
    ustc_vp.Operate.operationButton.continueButton ? ustc_vp.Operate.operationButton.continueButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.overButton ? ustc_vp.Operate.operationButton.overButton.removeAttribute("disabled") : null;
    ustc_vp.Operate.runFunction(ustc_vp.Operate.execSpeed);
}
/* 执行运行代码 */
ustc_vp.Operate.runCode = function () {
    //设置按钮不可用
    ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.stopButton ? ustc_vp.Operate.operationButton.stopButton.removeAttribute("disabled") : null;
    ustc_vp.Operate.operationButton.continueButton ? ustc_vp.Operate.operationButton.continueButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.overButton ? ustc_vp.Operate.operationButton.overButton.removeAttribute("disabled") : null;

    if (ustc_vp.Operate.operationButton.runButton.innerHTML == "重新开始") {

        clearInterval(ustc_vp.Operate.runCodeInterval);
        ustc_vp.Blockly.hasMoreCode = null;
        ustc_vp.Blockly.codeInterpreter = null;

        ustc_vp.Chart.changeChart(ustc_vp.Blockly.hasMoreCode, ustc_vp.Chart.showChart, ustc_vp.Chart.arrNow, ustc_vp.Chart.dataChangeIndex);

        ustc_vp.Operate.runFunction(ustc_vp.Operate.execSpeed);
    }
    else {

        ustc_vp.Operate.runFunction(ustc_vp.Operate.execSpeed);
    }

    setTimeout(() => {
        ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.innerHTML = "重新开始" : null;
        ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.removeAttribute("disabled") : null;
    }, 1000);
}
/* 结束执行代码 */
ustc_vp.Operate.overCode = function () {
    //设置按钮不可用
    ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.removeAttribute('disabled') : null;
    ustc_vp.Operate.operationButton.stopButton ? ustc_vp.Operate.operationButton.stopButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.continueButton ? ustc_vp.Operate.operationButton.continueButton.setAttribute("disabled", true) : null;
    ustc_vp.Operate.operationButton.overButton ? ustc_vp.Operate.operationButton.overButton.setAttribute("disabled", true) : null;

    clearInterval(ustc_vp.Operate.runCodeInterval);
    ustc_vp.Blockly.hasMoreCode = null;
    ustc_vp.Blockly.codeInterpreter = null;
    ustc_vp.Blockly.resetStepUi(true);
    ustc_vp.Operate.operationButton.runButton ? ustc_vp.Operate.operationButton.runButton.innerHTML = "开始" : null;

    ustc_vp.Chart.changeChart(ustc_vp.Blockly.hasMoreCode, ustc_vp.Chart.showChart, ustc_vp.Chart.arrNow, ustc_vp.Chart.dataChangeIndex);
}

/******************************业务相关工具包***********************************/
ustc_vp.tools = {};

/******************************业务无关工具包***********************************/
ustc_vp.utils = {};
/* 对象转换为数组 */
ustc_vp.utils.objToArr = function (obj, arr) {

    //清空arr数组
    while (arr.length > 0) {
        arr.pop();
    }
    for (let i in obj) {
        arr.push(obj[i]);
    }
}
/* 将一个原数组值赋值给目标数组值 */
ustc_vp.utils.sourceToDest = function (source, dest) {
    //清空arr数组
    while (dest.length > 0) {
        dest.pop();
    }
    //将source数组值填充给dest数组值
    for (let i = 0; i < source.length; i++) {
        dest.push(source[i]);
    }
}
/* 设置页面加载完成后可点击 */
ustc_vp.utils.canClickPage = function (divName) {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            divName.classList.remove("notclick");
        }
        else {
            divName.classList.add("notclick");
        }
    }
}
/* 获得树最高的层数，从0开始，输入树节点位置从1开始 */
ustc_vp.utils.getTopY = function (num){

    let y = 0;
    num >>= 1;
    while(num > 0){
        num >>= 1;
        y++;
    }

    return y;
}
/* 获得整个树坐标，输入树最高有yLevel层，从0开始 */
ustc_vp.utils.getTreeCoordinate = function (yLevel){

    if(yLevel == 0){
        return [{x: 0, y: 0}];
    }
    let arr = [];
    let xGain = 50;
    let yGain = -100;
    let disGain = 100;

    let tmp = Math.pow(2, yLevel) - 1;
    tmp = (tmp * disGain) / 2;
    let startx = tmp * (-1);
    let starty = yLevel * 100;

    while(startx != 0 && starty !=0){

        let count = Math.pow(2, yLevel);

        for (let i = count - 1; i >= 0; i--) {
            arr.push({x: startx + disGain * i, y: starty})
        }
        starty += yGain;
        disGain *= 2;
        startx += xGain;
        xGain *= 2;
        yLevel--;
    }

    arr.push({x: 0, y: 0});
    arr.reverse();
    return arr;
}


/******************************执行包***********************************/
ustc_vp.Execute = {};




