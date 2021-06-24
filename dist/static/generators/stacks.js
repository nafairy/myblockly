/**
 * 创建 stack 块对应的 js 代码解析
 * 2020.3.14 修改
 * @wanzhuang1996@163.com
 */
goog.provide('Blockly.JavaScript.stacks');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['stacks_create_empty'] = function (block) {
    // 创建空栈
    return ["[]", Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.JavaScript['stacks_create_with'] = function (block) {
    // 创建带初值的栈
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.JavaScript.valueToCode(block, "ADD" + i,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var code = "[" + elements.join(", ") + "]";

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['stacks_length'] = function (block) {
    // 返回栈的元素
    var stack = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return [stack + ".length", Blockly.JavaScript.ORDER_MEMBER]
};

Blockly.JavaScript['stacks_isEmpty'] = function (block) {
    // 返回栈是否为空
    var stack = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || "[]";

    return ["!" + stack + ".length", Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript['stacks_top'] = function (block) {
    // 返回栈顶元素
    var stack = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return [stack + ".slice(-1)[0]", Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['stacks_pop'] = function (block) {
    //  出栈
    var stack = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return stack + ".pop();\n";
};

Blockly.JavaScript['stacks_push'] = function (block) {
    // 入栈
    var stack = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    var pushItem = Blockly.JavaScript.valueToCode(block, "TO", Blockly.JavaScript.ORDER_NONE) || "null";
    var code  = stack + ".push(" + pushItem + ");\n";
    return code;
};
