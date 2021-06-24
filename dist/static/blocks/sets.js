/** 
 * 集合的实现
 * 
 */

Blockly.Blocks['sets_create_empty'] = {
    // 创建空集合
    init: function () {
        this.setColour(80);
        this.appendDummyInput()
            .appendField('创建空集合');
        this.setOutput(true,'Set');
    }
};

Blockly.Blocks['sets_add'] = {
    // 向集合中添加元素
    init: function () {
        this.setColour(80);
        this.appendValueInput('SET')
            .setCheck('Set')
            .appendField('向集合中加入');
        this.appendValueInput('ADD')
            .setCheck(null)
            .appendField('值');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
Blockly.Blocks['sets_has'] = {
    // 集合是否包含元素
    init: function () {
        this.setColour(80);
        this.appendValueInput('SET')
            .setCheck('Set')
            .appendField('集合');
        this.appendValueInput('VALUE')
            .appendField('是否包含元素');
        this.setOutput(true,'Boolean');
    }
};
