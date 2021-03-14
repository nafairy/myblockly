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


titleMap.set("stackPopAlg",stackPopTitle);
titleMap.set("stackPushAlg",stackPushTitle);
titleMap.set("stackOverAllAlg",stackOverAllTitle);

export {titleMap}
