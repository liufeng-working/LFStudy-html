function $(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
}

// 当网页加载完毕
window.onload = function () {
    // 瀑布流布局
    waterFall('main', 'box');

    document.body.onresize = function () {
        waterFall('main', 'box');
        // window.confirm(123);
        // window.alert(123);
        // window.prompt(123);
    };
};

function waterFall(parentId, sonClass) {

    // 获取父盒子
    var mainBox = $(parentId);

    // 获取子盒子
    var sonBox = mainBox.getElementsByClassName(sonClass);

    if (sonBox.length <= 0) {
        return;
    }

    // 子盒子宽度
    var sonWidth = sonBox[0].offsetWidth;

    // 浏览器宽度
    var screenWidth = document.body.offsetWidth;

    // 求出列数
    var column = Math.floor(screenWidth/sonWidth);
    // 父盒子居中
    mainBox.style.width = sonWidth*column + 2 + 'px';
    mainBox.style.margin = '0 auto';

    // 子盒子定位
    // 高度数据
    var heightArr = [];
    for (var i = 0; i < sonBox.length; i++) {
        // 求出单独盒子的高度
        var boxHeight = sonBox[i].offsetHeight;

        // 取出第一行
        if (i < column) {
            heightArr.push(boxHeight);
        }else {
            var minHeight = Math.min.apply(Math.min, heightArr);
            var minIndex = getMinIndex(minHeight, heightArr);

            // 定位
            var currentBox = sonBox[i];
            currentBox.style.position = 'absolute';
            currentBox.style.top = minHeight + 'px';
            currentBox.style.left = minIndex*sonWidth + 'px';

            // 更新最矮盒子高度
            heightArr[minIndex] += boxHeight;
        }
    }
}

function getMinIndex(min, heights) {
    for (var i = 0; i < heights.length; i++) {
        if (min === heights[i]) {
            return i;
        }
    }
}
