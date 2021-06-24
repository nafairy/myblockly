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

var index = mathRandomInt(0, arr.length);
var value = mathRandomInt(0, 50);

for (let i = arr.length; i > index; i--) {
    arr[i] = arr[i - 1];
}

arr[index] = value;

alert(arr);
