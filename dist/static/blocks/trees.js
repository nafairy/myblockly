/**
 * 定义 Tree 相关的块 
 * 2020.5.30
 * @wanzhuang1996@163.com
 */

Blockly.Blocks['trees_node'] = {
    // 定义tree节点
    init: function () {
        this.appendDummyInput()
            .appendField('创建Tree节点');
        this.appendValueInput('VALUE')
            .appendField('树的值')
            .setCheck(null);
        this.appendValueInput('LEFT')
            .appendField('左节点')
            .setCheck('TreeNode');
        this.appendValueInput('RIGHT')
            .appendField('右节点')
            .setCheck('TreeNode');
        this.setOutput(true,'TreeNode');
        this.setColour(200);
    }
};
Blockly.Blocks['trees_node_getVal'] = {
    init: function () {
        this.appendValueInput('NODE')
            .appendField('获取节点')
            .setCheck('TreeNode');
        this.appendDummyInput()
            .appendField('的值');
        this.setOutput(true);
        this.setColour(200);
    }
};
Blockly.Blocks['trees_node_getLeft'] = {
    init: function () {
        this.appendValueInput('NODE')
            .appendField('获取节点')
            .setCheck('TreeNode');
        this.appendDummyInput()
            .appendField('的左节点');
        this.setOutput(true);
        this.setColour(200);
    }
};
Blockly.Blocks['trees_node_getRight'] = {
    init: function () {
        this.appendValueInput('NODE')
            .appendField('获取节点')
            .setCheck('TreeNode');
        this.appendDummyInput()
            .appendField('的右节点');
        this.setOutput(true);
        this.setColour(200);
    }
};

Blockly.Blocks['trees_node_setVal'] = {
    init: function () {
        this.appendValueInput('NODE')
            .appendField('设置节点')
            .setCheck('TreeNode');
        this.appendValueInput('VALUE')
            .appendField('的值为');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
    }
};
Blockly.Blocks['trees_node_setLeft'] ={
    init: function () {
        this.appendValueInput('NODE')
            .appendField('设置节点')
            .setCheck('TreeNode');
        this.appendValueInput('VALUE')
            .appendField('的左节点为');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
    }
};
Blockly.Blocks['trees_node_setRight'] ={
    init: function () {
        this.appendValueInput('NODE')
            .appendField('设置节点')
            .setCheck('TreeNode');
        this.appendValueInput('VALUE')
            .appendField('的右节点为');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
    }
};
Blockly.Blocks['binary_tree_serialize'] = {
    init: function(){
        this.appendValueInput('TREE')
            .appendField('将二叉树')
            .setCheck('TreeNode');
        this.appendDummyInput()
            .appendField('序列化');
        this.setOutput(true,'Array');
        this.setColour(200);
    }
};
Blockly.Blocks['binary_tree_create_empty'] = {

    init: function() {
        this.appendDummyInput()
            .appendField('创建空树');
        this.setOutput(true,'TreeNode');
        this.setColour(200);
    }
};
Blockly.Blocks['binary_tree_isEmpty'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .appendField('二叉树')
            .setCheck('TreeNode');
        this.appendDummyInput()
            .appendField('是否为空');
        this.setOutput(true,'Boolean');
        this.setColour(200);
    }
};

Blockly.Blocks['binary_tree_bfs'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('TreeNode')
            .appendField('二叉树');
        this.appendDummyInput()
            .appendField('层次遍历');
        this.setOutput(true,'Array');
        this.setColour(200);
    }
};
Blockly.Blocks['binary_tree_preorder_dfs'] = {
    init: function(){
        this.appendValueInput('VALUE')
            .appendField('二叉树')
            .setCheck('TreeNode');
        this.appendDummyInput()
            .appendField('先序遍历');
        this.setOutput(true,'Array');
        this.setColour(200);
    }
};
Blockly.Blocks['binary_tree_inorder_dfs'] ={
    init: function () {
        this.appendValueInput('VALUE')
            .appendField('二叉树')
            .setCheck('TreeNode'); 
        this.appendDummyInput()
            .appendField('中序遍历');
        this.setOutput(true,'Array');
        this.setColour(200);
    }
};
Blockly.Blocks['binary_tree_posorder_dfs'] ={
    init: function () {
        this.appendValueInput('VALUE')
            .appendField('二叉树')
            .setCheck('TreeNode'); 
        this.appendDummyInput()
            .appendField('后序遍历');
        this.setOutput(true,'Array');
        this.setColour(200);
    }
};
Blockly.Blocks['binary_tree_create_with'] = {
    init: function () {
        this.setColour(200);
        this.itemCount_ =3; 
        this.updateShape_();
        this.setOutput(true, 'Array');
        this.setMutator(new Blockly.Mutator(['binary_tree_create_with_item']))
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
        var containerBlock = workspace.newBlock('binary_tree_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('binary_tree_create_with_item');
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
                    input.appendField('创建树包含');
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

Blockly.Blocks['binary_tree_create_with_container'] = {
    init: function () {
        this.setColour(200);
        this.appendDummyInput()
            .appendField('树');
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    }
};

Blockly.Blocks['binary_tree_create_with_item'] = {
    init: function () {
        this.setColour(200);
        this.appendDummyInput()
            .appendField('元素');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};
