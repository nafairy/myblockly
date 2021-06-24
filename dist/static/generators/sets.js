/** 
 * 集合对应的js代码
 * 2020.6.6
 * wanzhuang1996@163.com
*/

goog.provide('Blockly.JavaScript.Set');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['sets_create_empty'] = function(block) {
    
    return ["[]",Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sets_add'] = function(block) {
    var set = Blockly.JavaScript.valueToCode(block, 'SET',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var value = Blockly.JavaScript.valueToCode(block, 'ADD',Blockly.JavaScript.ORDER_ATOMIC)|| 'null';

    return set +".push("+value+");\n"
};

Blockly.JavaScript['sets_has'] = function (block) {
    var set = Blockly.JavaScript.valueToCode(block, 'SET',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER)||'null';
    var has = Blockly.JavaScript.provideFunction_(
        'has',
        [
            'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +'(set,value) {',
            '   if(set.indexOf(value) == -1){',
            '      return false',
            '   }',
            '   return true',
            '}'
        ]
    );

    return [has+"("+set+","+value+")", Blockly.JavaScript.ORDER_ATOMIC];
};