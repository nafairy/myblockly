let titleMap=new Map();
let stackPopTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
          "<p>小风上小学了，写数学题时总是括号比配出错，有一次他的作业中有个式子为((a+b)*(1+2)+1*a)),你能帮他检验作业中括号配置是否正确吗？" +
          "</p>"+
          "</div>"
};
let stackPushTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>小风上小学三年级了，小括号比配已经运用熟练，不会出错，但是学了中括号和大括号后又犯迷糊了，有一次他的作业中有个式子为{[(a+b)+3]+(a+c]},你能帮他检验作业中括号配置是否正确吗？" +
        "</p>"+
        "</div>"
};
let stackOverAllTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>小风对数学四则运算不太熟练，作业中有一道题3+5*6/2-1=?,你能用栈帮他计算出答案吗？" +
        "</p>"+
        "</div>"
};
let queuePushTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>一个管道中恰好可以放入一个小球（管道直径恰好等于小球直径），刚开始管道为空，" +
        "每隔1min在管道一端随机放入一个红球（用0表示）或者白球（用1表示），经过5min后，管道中有多少白球？" +
        "</p>"+
        "</div>"
};
let queuePopTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>一个管道中恰好可以放入一个小球（管道直径恰好等于小球直径），刚开始管道中有4个白球4个红球，红球用0表示，" +
        "白球用1表示，初始管道中球的分布为【0，1，1，0，0，0，1，1】，每隔1min在管道左端拿出一个球，经过一个随机x(1<=x<=8且为整数）min ，管道中有多少白球？" +
        "</p>"+
        "</div>"
};
let queueOverAllTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>一个管道中恰好可以放入一个小球（管道直径恰好等于小球直径），刚开始管道为空，" +
        "每隔1min在管道一端随机放入一个红球（用0表示）或者白球（用1表示），每隔2min在管道另一端拿出一个球，经过10min后，管道中有多少白球？" +
        "</p>"+
        "</div>"
};

let ArrayDeleteTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>小明和小红玩纸牌游戏，小明手中有8张牌，分别为[3,44,38,27,16,23,11,8],小红随机抽取小明手中的一张牌，小明手中按照原顺序" +
        "还剩下那些牌？请你用程序模拟这一过程。"+
        "</p>"+
        "</div>"
};

let ArrayInsertTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p> 小明去图书馆还书，已知书架上的书编号及相对位置为[3,44,38,27,16,23,11,8],小明需要将编号为x=11的书放到书架左边的第3个位置，你请用程序模拟该过程。"+
        "</p>"+
        "</div>"
};

let BubbleSortTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>小明想用冒泡排序对下面的序列进行排序，你能帮他完成吗？"+
        "</p>"+
        "</div>"
};

let InsertSortTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>小明想用插入排序对下面的序列进行排序，你能帮他完成吗？"+
        "</p>"+
        "</div>"
};

let QuickSortTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>小明学习排序算法后，想写出一个最好情况下时间复杂度为O(nlgn),最坏情况下时间复杂度为O(n^2)的排序算法对" +
        "以下序列排序，你能帮他完成吗？"+
        "</p>"+
        "</div>"
};

let SelectSortTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>小明最近学习了选择排序算法，但是忘记了具体实现过程，你能帮他完成选择排序算法的编写吗？"+
        "</p>"+
        "</div>"
};

let linklistSearchTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>一辆火车有n节车厢，不同车厢中装有价值不同的货物，" +
        "从第1节车厢开始的各节车厢货物价值分别是[3,4,1,2,7,9]，小明从第一节车厢开始查找货物价值为x=4的车厢，至少需要查找多少节车厢" +
        "</p>"+
        "</div>"
};

let linklistInsertTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>科学家为了研究RNA病毒，现需要向一段RNA序列‘A->G—>C->U->A’中的第二个碱基后插入" +
        "A（腺嘌呤）,请你用代码模拟该过程。(其中A、C、G、U分别用0，1，2，3表示)"+
        "</p>"+
        "</div>"
};


let linklistDeleteTitle={
    title:"<div style='text-align: left; text-indent: 2em;font-size: 16px'> " +
        "<p>一辆火车有n节车厢，不同车厢中有不同的货物，从第1节车厢开始的各节车厢货物价值分别是[3,4,1,2,7,9]，货物价值为x=4的车厢所装货物为化学" +
        "物质，为了安全考虑，现决定卸下这节车厢，请你用代码模拟该过程" +
        "</p>"+
        "</div>"
};

titleMap.set("arrayDeleteAlg",ArrayDeleteTitle);
titleMap.set("arrayInsertAlg",ArrayInsertTitle);
titleMap.set("bubbleSortAlg",BubbleSortTitle);
titleMap.set("selectSortAlg",SelectSortTitle);
titleMap.set("quickSortAlg",QuickSortTitle);
titleMap.set("insertSortAlg",InsertSortTitle);

titleMap.set("stackPopAlg",stackPopTitle);
titleMap.set("stackPushAlg",stackPushTitle);
titleMap.set("stackOverAllAlg",stackOverAllTitle);

titleMap.set("queuePopAlg",queuePopTitle);
titleMap.set("queuePushAlg",queuePushTitle);
titleMap.set("queueOverAllAlg",queueOverAllTitle);

titleMap.set("linklistSearchAlg",linklistSearchTitle);
titleMap.set("linklistInsertAlg",linklistInsertTitle);
titleMap.set("linklistDeleteAlg",linklistDeleteTitle);
export {titleMap}








