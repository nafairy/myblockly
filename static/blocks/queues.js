
/**
 * 定义 queue 的相关块 基于 lists 实现
 * 2020.5.25 修改
 * @wanzhuang1996@163.com
 */

Blockly.Blocks['queues_create_empty'] = {
    // 创建空队列
    init: function () {
        this.appendDummyInput()
            .appendField('创建空的队列');
        this.setOutput(true, "Array");
        this.setColour(200);
    }
};
Blockly.Blocks['queues_isEmpty'] = {
    // 判断队列是否为空
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Array");
        this.appendDummyInput()
            .appendField('是否为空');
        this.setOutput(true, 'Boolean');
        this.setColour(200);
    }
};
Blockly.Blocks['queues_length'] = {
    // 返回队列的长度
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array');
        this.appendDummyInput()
            .appendField('的长度');
        this.setOutput(true, 'Number');
        this.setColour(200);
        this.setTooltip(Blockly.Msg['QUEUES_LENGTH_TITLE'])
    }
};
Blockly.Blocks['queues_pop_return'] = {
    // 从队列中出队,带返回值
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField('队列');
        this.appendDummyInput()
            .appendField('出队,且返回出队值');
        this.setColour(200);
        this.setOutput(true,null);
        // this.setNextStatement(true);
        // this.setPreviousStatement(true);
    }
};
Blockly.Blocks['queues_pop'] = {
    // 从队列中出队
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField('队列');
        this.appendDummyInput()
            .appendField('出队');
        this.setColour(200);
        // this.setOutput(true,null);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
    }
};
Blockly.Blocks['queues_push'] = {
    // 向队列中加入元素
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField('向队列');
        this.appendValueInput('TO')
            .appendField('中加入');

        this.setColour(200);
        this.setNextStatement(true);
        this.setPreviousStatement(true);
    }
};
Blockly.Blocks['queues_front'] = {
    // 返回队列的首部
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField('从队列中');
        this.appendDummyInput()
            .appendField('获取队首元素');
        this.setOutput(true, null);
        this.setColour(200);
    }
};
Blockly.Blocks['queues_back'] = {
    //  返回队列的尾部
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField('从队列中');
        this.appendDummyInput()
            .appendField('获取队尾元素');
        this.setOutput(true,null);
        this.setColour(200);
    }
};


Blockly.Blocks['queues_create_with'] = {
    //  创建带元素的队列
    init: function () {
        this.setColour(200);
        this.itemCount_ =3;
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['queues_create_with_item']))
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
        var containerBlock = workspace.newBlock('queues_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('queues_create_with_item');
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
                .appendField('创建空队列');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField('创建队列包含');
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

Blockly.Blocks['queues_create_with_container'] = {
    init: function () {
        this.setColour(200);
        this.appendDummyInput()
            .appendField('队列');
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    }
};

Blockly.Blocks['queues_create_with_item'] ={
    init: function () {
        this.setColour(220);
        this.appendDummyInput()
            .appendField('元素');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};
