/**
 *
 *
 */

goog.provide('Blockly.JavaScript.trees');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['trees_node'] = function(block){
    // 创建节点，可以嵌套
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var left = Blockly.JavaScript.valueToCode(block, 'LEFT',Blockly.JavaScript.ORDER_MEMBER) || 'null';
    var right = Blockly.JavaScript.valueToCode(block, 'RIGHT',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var create = Blockly.JavaScript.provideFunction_(
        'TreeNode',
        [
            'function '+ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(val,left,right) {',
            '    this.value = val;',
            '    if(this.left == undefined){',
            '       this.left = null;',
            '    }else{',
            '       this.left = left;',
            '    }',
            '    if(this.right == undefined){',
            '       this.right = null;',
            '    }else{',
            '       this.right = right;',
            '    }',
            '}',
        ]
    );

    var code = ['new ' + create + "("+ value +","+ left +","+right+")",Blockly.JavaScript.ORDER_FUNCTION_CALL];
    return code
};
Blockly.JavaScript['trees_node_getVal'] = function(block) {
    var node = Blockly.JavaScript.valueToCode(block, 'NODE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return [node +".value",Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['trees_node_getLeft'] = function(block) {
    var node = Blockly.JavaScript.valueToCode(block, 'NODE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return [node +".left",Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['trees_node_getRight'] = function(block) {
    var node = Blockly.JavaScript.valueToCode(block, 'NODE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return [node +".right",Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['trees_node_setVal'] = function (block) {
    var node = Blockly.JavaScript.valueToCode(block, 'NODE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return node+".value= " + value + ";\n"
};
Blockly.JavaScript['trees_node_setLeft'] = function (block) {
    var node = Blockly.JavaScript.valueToCode(block, 'NODE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return node+".left= " + value + ";\n"
};
Blockly.JavaScript['trees_node_setRight'] = function (block) {
    var node = Blockly.JavaScript.valueToCode(block, 'NODE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return node+".right= " + value + ";\n"
};
Blockly.JavaScript['binary_tree_serialize'] = function(block) {
    var root = Blockly.JavaScript.valueToCode(block, 'TREE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var serialize  = Blockly.JavaScript.provideFunction_(
        'serialize',
        [
            'function '+ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(root){',
            '   if(!root){',
            '      return [];',
            '   }',
            '   var res = []',
            '   var node = root',
            '   var queue = [node];',
            '   while (queue.length){',
            '      var front = queue.shift();',
            '      if (front){',
            '         res.push(front.value);',
            '         queue.push(front.left);',
            '         queue.push(front.right);',
            '      }else{',
            '         res.push(null);',
            '      }',
            '   }',
            '   return res;',
            '};'
        ]
    );
    return [serialize+'('+ root + ')',Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript['binary_tree_create_empty'] = function(block){
    // Create a new empty binary tree
    var create = Blockly.JavaScript.provideFunction_(
        'TreeNode',
        [
            'function '+ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(val,left,right) {',
            '    this.value = val;',
            '    if(this.left == undefined){',
            '       this.left = null;',
            '    }else{',
            '       this.left = left;',
            '    }',
            '    if(this.right == undefined){',
            '       this.right = null;',
            '    }else{',
            '       this.right = right;',
            '    }',
            '}',
        ]
    );
    return ["new "+ create +"(null)",Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['binary_tree_create_with'] = function (block) {
    // 创建标准遵循leetcode实现
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.JavaScript.valueToCode(block, "ADD" + i,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var list = "[" + elements.join(", ") + "]";
    var create = Blockly.JavaScript.provideFunction_(
        'TreeNode',
        [
            'function '+ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(val,left,right) {',
            '    this.value = val;',
            '    if(this.left == undefined){',
            '       this.left = null;',
            '    }else{',
            '       this.left = left;',
            '    }',
            '    if(this.right == undefined){',
            '       this.right = null;',
            '    }else{',
            '       this.right = right;',
            '    }',
            '}',
        ]
    );
    var createTreeWith = Blockly.JavaScript.provideFunction_(
        'deserialize',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(nodes){',
            '    if (nodes.length == 0){',
            '       return null;',
            '    }',
            '    var root = new TreeNode(nodes[0]);',
            '    nodes.shift();',
            '    var queue = [root];',
            '    while(queue.length>0){',
            '        var node = queue.shift();',
            '        var leftval = nodes.shift();',
            '        if(leftval != null){',
            '           node.left = new TreeNode(leftval);',
            '           queue.push(node.left);',
            '        }',
            '        var rightval = nodes.shift();',
            '        if(rightval != null){',
            '           node.right = new TreeNode(rightval);',
            '           queue.push(node.right);',
            '        }',
            '    }',
            '    return root;',
            '}',
        ]
    );
    return [createTreeWith+'('+ list + ')',Blockly.JavaScript.ORDER_FUNCTION_CALL];
}
Blockly.JavaScript['binary_tree_preorder_dfs'] = function (block){
    // 先序遍历
    var root = Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var preorderTraversal = Blockly.JavaScript.provideFunction_(
        'preorderTraversal',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(node) {',
            '    var list = [];',
            '    var stack = [];',
            '    if(node)stack.push(node); ',
            '    while (stack.length > 0){',
            '        var curNode = stack.pop();',
            '        list.push(curNode.value);',
            '        if(curNode.right !== null){stack.push(curNode.right);}',
            '        if(curNode.left !== null){stack.push(curNode.left);}',
            '    }',
            '    return list',
            '};'
        ],
    );
    var code = [preorderTraversal+'('+root+')',Blockly.JavaScript.ORDER_FUNCTION_CALL];
    return code
};
Blockly.JavaScript['binary_tree_isEmpty'] = function(block) {
    var root = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var isEmpty = Blockly.JavaScript.provideFunction_(
        'isEmpty',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+ '(root)',
            '     if(root){',
            '        return true',
            '     }',
            '     return false',
            '}',
        ]
    );
    return [isEmpty+'('+root+')',Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript['binary_tree_inorder_dfs'] = function (block){
    // 中序遍历
    var root = Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var inorderTraversal = Blockly.JavaScript.provideFunction_(
        'inorderTraversal',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(node) {',
            '    var list = [];',
            '    function inorderTreeTraversal (node){',
            '        if(node!==null){',
            '             inorderTreeTraversal(node.left);',
            '             list.push(node.value);',
            '             inorderTreeTraversal(node.right);',
            '        }',
            '    }',
            '    inorderTreeTraversal(node);',
            '    return list',
            '};'
        ],
    );
    var code = [inorderTraversal+'('+root+')',Blockly.JavaScript.ORDER_FUNCTION_CALL];
    return code
};
Blockly.JavaScript['binary_tree_posorder_dfs'] = function (block) {
    // 后续遍历
    var root = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER)||'null';
    var posorderTraversal = Blockly.JavaScript.provideFunction_(
        'posorderTraversal',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(node) {',
            '    var list = [];',
            '    function posorderTreeTraversal (node){',
            '        if(node !== null){',
            '             inorderTreeTraversal(node.left);',
            '             inorderTreeTraversal(node.right);',
            '             list.push(node.value);',
            '        }',
            '    }',
            '    posorderTreeTraversal(node);',
            '    return list',
            '};'
        ]
    );
    return [posorderTraversal + '(' + root + ')',Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript['binary_tree_bfs'] = function(block){
    var root = Blockly.JavaScript.valueToCode(block, 'TREE', Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var bfsTraversal = Blockly.JavaScript.provideFunction_(
        'bfsTraversal',
        [
            'function '+ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(root)',
            '     var list = [];',
            '     var queue = [];',
            '     if(root) queue.push(root);',
            '     while(queue.length>0){',
            '         var temp = [];',
            '         for(var i=0; i<queue.length; i++) {',
            '             list.append(queue[i].value);',
            '             if(queue[i].left!==null) temp.append(queue.left);',
            '             if(queue[i].right!==null) temp.append(queue.right);',
            '         }',
            '         queue = temp;',
            '     }',
            '     return list;',
            '};',
        ]
    );
    return [bfsTraversal+'('+root+")", Blockly.JavaScript.ORDER_FUNCTION_CALL];
}


