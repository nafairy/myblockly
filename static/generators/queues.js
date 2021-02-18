/**
 * 创建queue块相关的js代码解析
 * 2019.5.14 修改
 * @wanzhuang1996@163.com
 */
goog.provide('Blockly.JavaScript.queues');

goog.require('Blockly.JavaScript');

// Blockly.JavaScript['queues_create_empty'] = function(block) {
//     // 创建空队列
//     var code = '[]';
//     return [code, Blockly.JavaScript.ORDER_NONE];
// };
Blockly.JavaScript['queues_create_empty'] = function (block) {
    // 创建空队列
    return ["[]", Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['queues_create_with'] = function (block) {
    // 创建带数据的队列
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.JavaScript.valueToCode(block, "ADD" + i, Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var code = "[" + elements.join(",") + "]";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['queues_length'] = function (block) {
    // 返回队列的长度
    var queue = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return [queue + ".length", Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['queues_isEmpty'] = function (block) {
    // 返回队列是否为空
    var queue = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return ["!" + queue + ".length", Blockly.JavaScript.ORDER_LOGICAL_NOT];
};
Blockly.JavaScript['queues_pop_return'] = function(block){
    // 出队且有返回值
    var queue = Blockly.JavaScript.valueToCode(block,"VALUE", Blockly.JavaScript.ORDER_MEMBER) ||"[]";
    return [queue+".shift()", Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['queues_pop'] = function (block) {
    //  出队,单语句不会出现嵌套
    var queue = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return queue + ".shift();"
};

Blockly.JavaScript['queues_push'] = function (block) {
    // 入队
    var queue = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    var item = Blockly.JavaScript.valueToCode(block, "TO", Blockly.JavaScript.ORDER_NONE) || "null";
    return queue + ".push(" + item + ");\n";

};

Blockly.JavaScript['queues_front'] = function (block) {
    // 查看队首元素
    var queue = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return [queue + "[0]", Blockly.JavaScript.ORDER_MEMBER]
};

Blockly.JavaScript['queues_back'] = function (block) {
    // 查看对尾元素
    var queue = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_MEMBER) || "[]";
    return [queue + ".slide(-1)[0]", Blockly.JavaScript.ORDER_MEMBER];
};
