/**
 * 定义 stack 的相关块 基于 lists 实现
 * 2020.3.14 修改
 * @wanzhuang1996@163.com
 */

Blockly.Blocks['stacks_create_empty'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('创建空栈');
        this.setOutput(true, 'Array');
        this.setColour(200);
    }
};
Blockly.Blocks['stacks_isEmpty'] = {
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array');
        this.appendDummyInput()
            .appendField('是否为空');
        this.setOutput(true, 'Boolean');
        this.setColour(200);
    }
};
Blockly.Blocks['stacks_length'] = {
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array');
        this.appendDummyInput()
            .appendField('的长度');
        this.setOutput(true, 'Number');
        this.setColour(200);
    }
};
Blockly.Blocks['stacks_push'] = {
    init: function () {
        this.setColour(200);
        this.appendValueInput("VALUE")
            .setCheck("Array")
            .appendField('向栈');
        this.appendValueInput("TO")
            .appendField('加入');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
Blockly.Blocks['stacks_pop']= {
    init: function(){
        this.setColour(200);
        this.appendValueInput("VALUE")
            .setCheck("Array")
            .appendField('从栈');
        this.appendDummyInput()
            .appendField('出栈一个元素');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
Blockly.Blocks['stacks_top'] ={
    init: function () {
        this.setColour(200);
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField('返回栈');
        this.appendDummyInput()
            .appendField('顶元素');
        this.setOutput(true,'null');
    }
};

Blockly.Blocks['stacks_create_with'] = {
    init: function () {
        this.setColour(200);
        this.itemCount_ =3; 
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['stacks_create_with_item']))
    },
    mutationToDom: function() {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('stacks_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('stacks_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (var i = 0; i < this.itemCount_; i++) {
            var connection = this.getInput('ADD' + i).connection.targetConnection;
            if (connection && connections.indexOf(connection) == -1) {
                connection.disconnect();
            }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
    },
    saveConnections: function(containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function() {
        if (this.itemCount_ && this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
            this.appendDummyInput('EMPTY')
                .appendField('创建空栈');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField('创建栈包含');
                }
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    }
};


Blockly.Blocks['stacks_create_with_container'] = {
    init: function () {
        this.setColour(200);
        this.appendDummyInput()
            .appendField('栈');
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    }
};

Blockly.Blocks['stacks_create_with_item'] = {
    init: function () {
        this.setColour(200);
        this.appendDummyInput()
            .appendField('元素');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};
