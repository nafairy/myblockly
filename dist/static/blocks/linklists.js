/**
 * 定义 linklist 相关的块
 * 修改：2020.6.5
 * @wanzhuang1996@163.com
 */
Blockly.Blocks['linkLists_node'] = {
    // 定义链表节点
    init: function () {
        this.appendDummyInput()
            .appendField('创建链表节点');
        this.appendValueInput('VALUE')
            .appendField('节点的值')
            .setCheck(null);
        this.appendValueInput('NEXT')
            .appendField('下一节点')
            .setCheck('LNode');
        this.setOutput(true,'LNode');
        this.setColour(200);
    }
};
Blockly.Blocks['linkLists_node_val'] = {
    // 获取节点的value值
    init: function(){
        this.appendValueInput("VALUE")
            .setCheck('LNode')
            .appendField("获取节点");
        this.appendDummyInput()
            .appendField("的值");
        this.setOutput(true,null);
        this.setColour(65);
    }
};
Blockly.Blocks['linkLists_node_next'] = {
    // 获取节点的next值
    init: function(){
        this.appendValueInput("VALUE")
            .setCheck('LNode')
            .appendField("获取节点");
        this.appendDummyInput()
            .appendField("的Next");
        this.setOutput(true,null);
        this.setColour(65);
    }
};
Blockly.Blocks['linkLists_node_setVal'] ={
    // 设置节点的value
    init: function () {
        this.setColour(65);
        this.appendValueInput('VALUE')
            .setCheck("LNode")
            .appendField("设置节点");
        this.appendValueInput('SET')
            .setCheck(null)
            .appendField("的值");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
Blockly.Blocks['linkLists_node_setNext'] ={
    // 设置节点的next
    init: function () {
        this.setColour(65);
        this.appendValueInput('VALUE')
            .setCheck("LNode")
            .appendField("设置节点");
        this.appendValueInput('SET')
            .setCheck(null)
            .appendField("的Next");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
Blockly.Blocks['linkLists_setHead'] = {
    // 设置链表的表头
    init: function() {
      this.appendValueInput("VALUE")
          .setCheck("LinkList")
          .appendField("设置链表");
      this.appendValueInput("SET")
          .setCheck(null)
          .appendField("head为");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
    }
};
Blockly.Blocks['linkLists_setLength'] = {
    // 设置链表的长度
    init: function() {
      this.appendValueInput("VALUE")
          .setCheck("LinkList")
          .appendField("设置链表");
      this.appendValueInput("SET")
          .setCheck(null)
          .appendField("长度加");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
    }
};
Blockly.Blocks['linkLists_create_empty'] = {
    //  定义空链表
    init: function() {
        this.appendDummyInput()
            .appendField("创建一个空的链表");
        this.setOutput(true, "LinkList");
        this.setColour(230);
    }
};

Blockly.Blocks['linkLists_getHead'] ={
    // 返回链表的表头
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("LinkList")
            .appendField("链表");
        this.appendDummyInput()
            .appendField("的表头");
        this.setOutput(true, "LNode");
        this.setColour(230);
    }
};

Blockly.Blocks['linkLists_append'] = {
    // 添加链表中的元素
    init: function () {
        this.setColour(230);
        this.appendValueInput('VALUE')
            .setCheck("LinkList")
            .appendField("向链表中");
        this.appendValueInput('TO')
            .setCheck(null)
            .appendField("加入元素");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
Blockly.Blocks['linkLists_isEmpty'] = {
    //  检查链表是否为空
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("LinkList")
            .appendField("链表");
        this.appendDummyInput()
            .appendField("是否为空");
        this.setOutput(true, "Boolean");
        this.setColour(230);
    }
};

Blockly.Blocks['linkLists_length'] = {
    //  返回链表的长度
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("LinkList")
            .appendField("链表");
        this.appendDummyInput()
            .appendField("的长度");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};

Blockly.Blocks['linkLists_getElem'] = {
    //  获取链表元素
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("LinkList")
            .appendField("返回链表");
        this.appendDummyInput()
            .appendField("第")
            .appendField(new Blockly.FieldNumber(1, 1), "NO")
            .appendField("个元素");
        this.setOutput(true, null);
        this.setColour(230);
    }
};

Blockly.Blocks['linkLists_locateElem'] = {
    //  定位链表元素的位置
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("LinkList")
            .appendField("返回链表");
        this.appendValueInput("TO")
            .setCheck(null)
            .appendField("中值为");
        this.appendDummyInput()
            .appendField("的位置");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};

Blockly.Blocks['linkLists_locateElemPre'] = {
    // 返回链表元素的前一个位置
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("LinkList")
            .appendField("返回链表");
        this.appendValueInput("TO")
            .setCheck(null)
            .appendField("中值为");
        this.appendDummyInput()
            .appendField("前面的位置");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};
Blockly.Blocks['linkLists_locateElemNext'] = {
    // 返回链表元素的后一个位置
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck("LinkList")
            .appendField("返回链表");
        this.appendValueInput('TO')
            .setCheck(null)
            .appendField('中值为');
        this.appendDummyInput()
            .appendField('后面的位置');
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};
Blockly.Blocks['linkLists_insert'] = {
    // 向链表中插入元素
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck("LinkList")
            .appendField("向链表");
        this.appendDummyInput()
            .appendField("第")
            .appendField(new Blockly.FieldNumber(1, 1), "NO")
            .appendField("个元素后插入");
        this.appendValueInput('TO')
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
    }
};
Blockly.Blocks['linkLists_remove'] = {
    // 删除链表中的元素
    init: function () {
        this.setColour(230);
        this.appendValueInput('VALUE')
            .setCheck("LinkList")
            .appendField("从链表");
        this.appendValueInput('TO')
            .setCheck(null)
            .appendField("删除元素");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
Blockly.Blocks['linkLists_print_linklist']= {
    init: function() {
        this.appendValueInput("VALUE")
            .appendField("返回链表数组")
            .setCheck(true,'LinkList');
        this.setOutput(true);
        this.setColour(230);
    }

}
Blockly.Blocks['linkLists_create_with'] = {
    // 创建带有初值的链表
    init: function () {
        this.setColour(200);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['linkLists_create_with_item']))
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
        var containerBlock = workspace.newBlock('linkLists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('linkLists_create_with_item');
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
                .appendField('创建空链表');
        }
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField('创建链表包含');
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

Blockly.Blocks['linkLists_create_with_container'] = {
    init: function () {
        this.setColour(200);
        this.appendDummyInput()
            .appendField('链表');
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    }
};

Blockly.Blocks['linkLists_create_with_item'] ={
    init: function () {
        this.setColour(220);
        this.appendDummyInput()
            .appendField('元素');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};
