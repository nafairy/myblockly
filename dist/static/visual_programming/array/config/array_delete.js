/*
函数功能：随机[a到b]
*/
function mathRandomInt(a, b) {
    if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

var arr = [3, 44, 38, 5, 47, 15, 38, 16];
if (arr.length > 0) {
    var index = mathRandomInt(0, arr.length - 1);

    for (let i = index; i < arr.length - 1; i++) {
        //数组是引用赋值不这么写会导致最后一个数字为undefined
        let tmp = arr.slice(i + 1, i + 2)[0];
        arr[i] = tmp;
    }
    arr.pop();
}

alert(arr);