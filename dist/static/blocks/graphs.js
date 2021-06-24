/** 
 * 构建 图的相关块，使用临接矩阵表示。
 * 
 * 
*/
Blockly.Blocks['type_graph'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('图');
        this.appendValueInput('VERTEX')
            .appendField('图的顶集')
            .setCheck(true,'Array');
        this.appendValueInput('ADJ')
            .appendField('图的临接链表');
        this.setOutput(true,'Graph');
        this.setColour(150);
    }
};
Blockly.Blocks['type_vertex'] ={
    init: function () {
        this.appendValueInput('VALUE')
            .appendField('图的节点');
        this.setColour(150);
        this.setOutput(true,'Array');
    }
};
Blockly.Blocks['type_adjacency_matrix'] ={
    init: function () {
        this.appendValueInput('VALUE')
            .appendField("创建临接矩阵");
        this.setOutput(true,null);
        this.setColour(150);
    }
};


Blockly.Blocks['graphs_'] = {
    init: function () {
        this.appendValueInput('VALUE')
            .appendField("创建临接矩阵");
        this.setOutput(true,null);
        this.setColour(150);
    }
}