/**
 * 定义 linklist 块相关的js代码
 * 修改时间：2020.6.5
 * @wanzhuang1996@163.com
 */
goog.provide('Blockly.JavaScript.linklists');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['linkLists_node'] = function (block) {
    // 创建节点
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var next = Blockly.JavaScript.valueToCode(block, 'NEXT',Blockly.JavaScript.ORDER_MEMBER) || 'null';

    var create = Blockly.JavaScript.provideFunction_(
        'LNode',
        [
            'function '+ Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'(value,next) {',
            '    if(value == undefined){',
            '        this.value = null;',
            '    }else{',
            '        this.value = value;',
            '    }',
            '    if(next == undefined){',
            '        this.next = null;',
            '    }else{',
            '        this.next = next;',
            '    }',
            '}',
        ]
    );

    var code = ['new ' + create + "("+ value +","+ next +")",Blockly.JavaScript.ORDER_FUNCTION_CALL];
    return code
};

Blockly.JavaScript['linkLists_node_val'] = function(block) {
    // 返回节点的值
    var node = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return [node + ".value",Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['linkLists_node_next'] = function(block) {
    // 返回节点的next值
    var node = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return [node + ".next",Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['linkLists_create_empty'] = function (block) {
    // 创建空链表
    var createNode = Blockly.JavaScript.provideFunction_(
        'LNode',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
            '(value,next) {',
            '    if(value == undefined){',
            '        this.value = null;',
            '    }else{',
            '        this.value = value;',
            '    }',
            '    if(next == undefined){',
            '        this.next = null;',
            '    }else{',
            '        this.next = next;',
            '    }',
            '}'
        ]
    );
    var createLinkListEmpty = Blockly.JavaScript.provideFunction_(
        'LinkList',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'() {',
            '   this.length = 0;',
            '   this.head=null;',
            '   this.append =function(value){',
            '       var node = new LNode(value);',
            '       if (this.head == null){',
            '          this.head = node;',
            '       }else{',
            '           var current = this.head;',
            '           while(current.next){',
            '              current = current.next;',
            '           }',
            '           current.next = node;',
            '       }',
            '       this.length++;',
            '   };',
            '};'
        ]
    );
    return ["new "+ createLinkListEmpty+"()", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.JavaScript['linkLists_create_with'] = function (block) {
    // 创建带初值的链表
    var element = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++){
        element[i] = Blockly.JavaScript.valueToCode(block, "ADD" + i, Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var list = "["+element.join(", ")+"]";
    var createNode = Blockly.JavaScript.provideFunction_(
        'LNode',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +'(value,next) {',
            '    if(value == undefined){',
            '        this.value = null;',
            '    }else{',
            '        this.value = value;',
            '    }',
            '    if(next == undefined){',
            '        this.next = null;',
            '    }else{',
            '        this.next = next;',
            '    }',
            '}'
        ]
    );
    var createLinkListEmpty = Blockly.JavaScript.provideFunction_(
        'LinkList',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+'() {',
            '   this.length = 0;',
            '   this.head=null;',

            '   this.append =function(value){',
            '       var node = new LNode(value);',
            '       if (this.head == null){',
            '          this.head = node;',
            '       }else{',
            '           var current = this.head;',
            '           while(current.next){',
            '              current = current.next;',
            '           }',
            '           current.next = node;',
            '       }',
            '       this.length++;',
            '   };',
            '};'
        ]
    );
    var createLinkListWith = Blockly.JavaScript.provideFunction_(
        'linklistsCreateWithList',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +'(list) {',
            '   var linklist = new LinkList();',
            '   for(var i =0;i<list.length;i++){',
            '        linklist.append(list[i]);',
            '   };',
            '   return linklist',
            '}'
        ]
    );
    // return list;
    return [createLinkListWith+'('+list+')',Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript['linkLists_getHead'] = function(block){
    // 获取链表的表头节点
    var linklist = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    return [linklist+'.head',Blockly.JavaScript.ORDER_ATOMIC];

};
Blockly.JavaScript['linkLists_setHead'] = function(block) {
    var linklist = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var head = Blockly.JavaScript.valueToCode(block, 'SET', Blockly.JavaScript.ORDER_ATOMIC)||'null';

    return linklist+".head =" + head + ";\n"
};
Blockly.JavaScript['linkLists_setLength'] = function(block) {
    var linklist = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var change = Blockly.JavaScript.valueToCode(block, 'SET', Blockly.JavaScript.ORDER_ATOMIC)||'null';
    return linklist+".length +=" + change+";\n"
}
Blockly.JavaScript['linkLists_node_setVal'] = function(block) {
    // 设置节点值
    var node = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var val = Blockly.JavaScript.valueToCode(block, 'SET',Blockly.JavaScript.ORDER_ATOMIC)|| 'null';
    return node+".value =" +val+";\n"
};
Blockly.JavaScript['linkLists_node_setNext'] = function(block) {
    // 设置节点的next值
    var node = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var val = Blockly.JavaScript.valueToCode(block, 'SET',Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    return node+".next =" +val+";\n"
};
Blockly.JavaScript['linkLists_append'] = function(block) {
    // 向链表尾部添加元素
    var linklist = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    return linklist+'.append();\n'
}
Blockly.JavaScript['linkLists_isEmpty'] = function (block) {
    // 判断链表是否为空
    var linklist = Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_MEMBER) || "null";
    return [linklist +".isEmpty()", Blockly.JavaScript.ORDER_MEMBER];
};
Blockly.JavaScript['linkLists_length'] = function(block) {
    // 返回链表的长度
    var linklist = Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_MEMBER) || 'null';
    return [linklist +".length",Blockly.JavaScript.ORDER_MEMBER];

};

Blockly.JavaScript['linkLists_locateElem'] = function(block) {
    // 查找特定值的位置
    var linklist = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || 'null';
    var element = Blockly.JavaScript.valueToCode(block, 'TO',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var code = "Number("+linklist+".indexOf("+element+"))";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['linkLists_insert'] = function(block) {
    // 链表的插入
    var linklist = Blockly.JavaScript.valueToCode(block,'VALUE', Blockly.JavaScript.ORDER_MEMBER) || 'null';
    var position = Number(block.getFieldValue('NO'))||1;
    var value = Blockly.JavaScript.valueToCode(block,'TO',Blockly.JavaScript.ORDER_MEMBER)||"null";
    return linklist+".insert("+position+","+value+");\n"
};

Blockly.JavaScript['linkLists_remove'] = function(block) {
    // 从链表移除特定的值
    var linklist = Blockly.JavaScript.valueToCode(block,'VALUE', Blockly.JavaScript.ORDER_MEMBER)||'null';
    var val = Blockly.JavaScript.valueToCode(block,'TO',Blockly.JavaScript.ORDER_MEMBER)||'null';
    return linklist+".remove("+val+");\n"
};

Blockly.JavaScript['linkLists_locateElemPre'] =function(block){
    // 返回特定元素的前一个位置
    var linklist = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var element = Blockly.JavaScript.valueToCode(block, 'TO',Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var code = "Number("+linklist+".indexOf("+element+"))-1";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['linkLists_locateElemNext'] = function(block) {
    // 返回特定元素的后一个位置
    var linklist = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var element = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_MEMBER)|| 'null';
    var code = "Number("+linklist+".indexOf("+element+"))+1";
    return [code,Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['linkLists_getElem'] = function(block){
    // 返回特定位置的值
    var linklist = Blockly.JavaScript.valueToCode(block,'VALUE',Blockly.JavaScript.ORDER_MEMBER)||"null";
    var position = Number(block.getFieldValue('NO'))||0;
    return [linklist+".findAt("+position+")",Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript['linkLists_print_linklist'] = function(block){
    var linklist = Blockly.JavaScript.valueToCode(block,'VALUE', Blockly.JavaScript.ORDER_MEMBER)||'null';
    var print = Blockly.JavaScript.provideFunction_(
        'printLinklist',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +"(linklist){",
            '   var node = linklist.head;',
            '   var list = [];',
            '   while(node){',
            '      list.push(node.value);',
            '      node = node.next;',
            '   }',
            '   return list;',
            '}',
        ]
    );
    return [print+'('+ linklist + ')',Blockly.JavaScript.ORDER_FUNCTION_CALL]
};
