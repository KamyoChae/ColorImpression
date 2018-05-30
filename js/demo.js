var rows = 4, // 默认 4 X 4
    cols = 4, // 测试时修改
    wincont = mids = rows * cols / 2, // wincont 用于判断剩余节点 mids用于循环 
    nums = rows * cols, // nums 用于循环
    conts = 0; //得分
var levels = 1; // 关卡
var flag = true; // 初始化开关
var mark = null; // 存储第一次点击的id
var key = true; // 开关

var btnDiv = document.getElementById('btn-div') // 开始按钮
var starDiv = document.getElementsByClassName('star-div')[0] // 开始按钮的遮罩
var boxDiv = document.getElementById('box-div') // 生成格子的div
var sTitle = document.getElementsByClassName('title-span')[0] // 首页游戏字体
var topDiv = document.getElementsByClassName('top-div')[0] // 游戏界面顶部
var oUl = document.getElementsByTagName('ul')[0] // 获取 简单 中等 困难 三个等级选项
var back = document.getElementsByClassName('reset') // 获取返回按钮
var setTime = document.getElementsByClassName('set-time')[0] // 获取时间
var overBack = document.getElementsByClassName('overBack')[0] // 获取游戏结束遮罩层
var gameWin = document.getElementsByClassName('gameWin')[0] // 获取游戏胜利遮罩层
var cont = document.getElementsByClassName('cont')[0] // 获取得分
var level = document.getElementsByClassName('level')[0] // 获取关卡
var next = document.getElementsByClassName('next')[1] // 获取 下一关 按钮
var p = document.getElementsByTagName('p')[0]
var gameReady = document.getElementsByClassName('game-ready')[0]

btnDiv.addEventListener('click', load, false)
btnDiv.addEventListener('click', init, false)
oUl.addEventListener('click', pick, false)
back[0].addEventListener('click', getBack, false) // 游戏界面 返回主页按钮
back[1].addEventListener('click', getBack, false) // 游戏失败界面 返回主页按钮
back[2].addEventListener('click', getBack, false)
next.addEventListener('click', nextlevel, false)

// 计时器
var add = 90;
function callTime() {

    this.timer = setInterval(function () {
        if (add == 1) { // 超过3分钟 则游戏结束
            clearInterval(timer)
            gameOver();
        }
        add--;
        setTime.innerHTML = add;
    }, 1000)
}

// 倒计时5秒
var read = 5;
function ready() {
    this.reading = setInterval(function () {
        read--;
        setTime.innerHTML = read;
        if (read < 1) {
            clearInterval(this.reading);
            var getChilds = document.getElementsByClassName('conChild');
                for (var i = 0; i < getChilds.length; i++) {
                    getChilds[i].style.display = 'block';
                    if (getChilds[getChilds.length - 1].style.display == 'block') {
                        gameReady.style.display = 'none'; // 遮罩层 启动时 禁止点击
                        read = 5;
                        callTime();
                    }
                }
        }
    }, 1000)
}

// 定时器 5s后覆盖方块
function setCover() {
    ready();
}



// 关卡函数
function nextlevel() {
    gameWin.style.display = 'none';
    clearInterval(timer);
    init();
    levels++;
    add = 90;
    level.innerHTML = levels;
    setTime.innerHTML = 5;
}

function gameOver() {

    // 游戏结束 弹出遮罩

    clearInterval(timer)
    overBack.style.height = window.innerHeight + 'px';
    overBack.style.display = 'block';
    document.onmousewheel = function () {
        return false;
    }
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
}
function gameWins() {

    // 游戏胜利 弹出遮罩
    clearInterval(timer)
    gameWin.style.height = window.innerHeight + 'px';
    gameWin.style.display = 'block';
    document.onmousewheel = function () {
        return false;
    }
}

function addcont() {

    // 游戏加分
    conts += 10;
    cont.innerHTML = conts;
}
function delcont() {

    // 游戏扣分
    conts -= 4;
    cont.innerHTML = conts;
}

function load() {
    gameReady.style.display = 'block';
    boxDiv.style.display = 'block';
    starDiv.style.display = 'none';
    sTitle.style.display = 'none';
    topDiv.style.display = 'block';
    p.style.display = 'none';

}
function getBack() {

    // 返回主界面 恢复默认
    rows = 4; // 默认 4 X 4
    cols = 4;
    cont.innerHTML = 0;
    level.innerHTML = 1;
    levels = 1;
    conts = 0;
    setTime.innerHTML = 5;
    add = 90;
    read = 5;
    clearInterval(reading);
    clearInterval(timer)
    boxDiv.innerHtml = '';
    boxDiv.style.display = 'none';
    starDiv.style.display = 'block';
    sTitle.style.display = 'block';
    topDiv.style.display = 'none';
    gameWin.style.display = 'none';
    p.style.display = 'block';
    overBack.style.display = 'none';
}

function pick(e) {
    try {

        var event = e || window.event;
        cont.innerHTML = 0;
        add = 90;
        conts = 0;
        read = 5;
        clearInterval(reading);
    //    clearTimeout(cover)
        clearInterval(timer);
        flag = true;
        switch (event.target.innerHTML) {
            case '简单': easy(); break;
            case '中等': middle(); break;
            case '困难': hard(); break;
        }
    } catch (error) {
        console.log(error)
    }
}

function easy() {
    // 简单模式

    rows = 4;
    cols = 4;
    setTime.innerHTML = read;
    init(rows, cols);
}
function middle() {
    // 中等模式

    rows = 6;
    cols = 5;
    setTime.innerHTML = read;
    init(rows, cols);
}
function hard() {
    // 困难模式
    rows = 8;
    cols = 5;
    setTime.innerHTML = read;
    init(rows, cols);
}

// 初始化函数
function init() {
    /**
     * 第一步 生成一百个格子 绑定div 并插入div中  
     * 第二步 循环先给前面一半的格子加颜色
     * 第三步 循环读取前面的格子 随机生成一个数 这个数绑定div 把格子里面的颜色赋给随机格子
     *
     */
    gameReady.style.display = 'block'; // 遮罩层 启动时 禁止点击
    var count = 0;
    wincont = mids = rows * cols / 2;
    nums = rows * cols;

    flag = true;
    var bWidth = boxDiv.style.width;

    if (flag) {
        var d = document.createElement('div');
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {

                var con = document.createElement('div');
                var conChild = document.createElement('img');
                conChild.classList.add('conChild');
                conChild.setAttribute('data', count); // 父子标记 绑定id
                conChild.setAttribute('src', 'images/logo.png'); // 设置图片覆盖
                con.classList.add('con');
                con.setAttribute('id', count);
                count++;
                con.appendChild(conChild);
                d.appendChild(con);
            }
        }// 循环结束
        boxDiv.innerHTML = d.innerHTML;
        addColor(mids);
    }

}



// 添加颜色函数
function addColor() {
    // 给前五十个元素加颜色

    for (var i = 0; i < mids; i++) {
        var getcon = document.getElementById(i)
        var color = '' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255)
        var bg = 'background:rgb(' + color + ')';
        getcon.setAttribute('style', bg);

    }

    // 给后五十个元素加颜色

    while (mids) {
        /**
         * 循环前五十个元素 的同时 随机生成一个值 用于后50个数 绑定div
         * 先判断 随机生成的值里面有没有标识符 即 'set'
         * 如果已经有了标识符 则重新生成一个随机数
         * 如果随机生成的这个值没有标识符 则进入条件判断
         * 在条件判断之前 先获取本次循环的一个值 用于前50个数 绑定div
         * 如果本次循环的div含有标识符或是随机生成的div数含有一个标识符（这是不可能的）
         * 则不会进行下一步判断
         * 否则 进行背景色的传递 并同时打上标识符 ‘set’ 
         * 剩余未传递颜色的方块总数减一
        */
        for (var i = 0; i < nums / 2; i++) {
            var setColor = null, // 用于存储[0.5, 1]区间的数
                getCon2 = null; // 用于存储[0.5, 1]区间的元素
            setColor = Math.floor(Math.random() * nums / 2 + nums / 2);
            getCon2 = document.getElementById(setColor); // 第50-100个元素
            if (getCon2.classList.contains('set')) {

                // 如果后半数的区间内 元素已经有标识符 则再随机一个数
                setColor = Math.floor(Math.random() * nums / 2 + nums / 2);
            } else {
                var getCon1 = document.getElementById(i); // 获取前面50个元素
                if (!getCon1.classList.contains('set') || !getCon1.classList.contains('set')) {
                    // getCon1前半数 getCon2后半数
                    getCon2.style.background = getCon1.style.background;
                    getCon1.classList.add('set');
                    getCon2.classList.add('set');
                    mids--;
                }
            }
        }
    }
    flag = false;

    setCover();

}



// 绑定事件
boxDiv.addEventListener('click', checking, false)

// 核心逻辑
var bit = 2; // 设置只能点击两次的开关 
function checking(e) {
    /**
     * 第一次点击该元素 所点击元素为img 
     * 第二次点击该元素 所点击元素为div 用id编码绑定
     * 
     * 如果第一次点击该元素 则需保留该img元素的 标识符data 隐藏img
     * 如果第二次点击该元素 保留第二次点击div元素的标识符id 获取子元素节点 显示 
     * 如果两次标识符一致(父id 子data) 则还原初始状态

     * 如果在这之前点击过其他元素 则将两元素显示出色块div 3s后背景进行对比 若相等则移除该节点
    */
  //  clearInterval(cover)
    var event = e || window.event;
    var eTarget = event.target;
    // var eStyle = event.target.style;

    var eData = event.target.getAttribute('data'); // 父子标识符
    eId = parseInt(event.target.parentElement.id); // 获得第二次点击的图片的父节点的id

    // 第一种情况，点击自身
    function test1() {
        if (key) { // key = true
            mark = eData;  // 把图片的data标识符传给mark储存
            eTarget.style.opacity = 0; // 把图片设成全透明
            // eStyle.borderColor = '#fff';
            key = false;
            bit--; // 点击第一次 bit = 1

        } else if (!key) { // key = false
            if (eId == mark) {
                var parent = document.getElementById(eId); // 通过父节点id 控制img显示
                parent.firstElementChild.style.opacity = 1; // 对象改变 获取 div的子元素
                key = !key; // key = true
                mark = null;
                bit++; // 还原bit

            } else {
                // 第二种情况 点击不同
                // eMark 第一次点击的img的div   eMarks 第二次点击的div
                var eMark = document.getElementById(mark); // 获取的是div的id 不是img
                var eMarks = document.getElementById(eData); // 获取第二次点击的img的 data 标识符，通过该标识符获取父元素节点 用于判断第二次点击的div背景色
                eTarget.style.opacity = 0; // 显示第二次点击到的img元素的div
                bit--; // bit = 0 

                /**
                 * 此处是另一种点击自身的方法
                 * if (eMark == eMarks) {
                 *    var own = document.getElementsByClassName('conChild')[eData]
                 *    own.style.opacity = 1; // 对象改变 获取 div的子元素
                 *    eMark.firstChildElement.style.opacity = 1;
                 * }
                */

                var show = setTimeout(function () {

                    if (eMarks.style.background == eMark.style.background) {

                        //  boxDiv.removeChild(eMarks)
                        //  boxDiv.removeChild(eMark)
                        eMark.style.opacity = 0;
                        eMarks.style.opacity = 0;

                        addcont();
                        wincont--; // 剩余节点统计
                        key = !key; // key = true
                        mark = null; // 恢复初始化
                        bit = 2; // 还原初始值
                        if (wincont == 0) { // 如果所有节点都被清除 则游戏结束 弹出祝贺界面 然后进入第二关
                            gameWins()
                        }
                    } else {
                        eMark.firstChild.style.opacity = 1;
                        eMarks.firstChild.style.opacity = 1;
                        key = !key; // key = true
                        mark = null; // 恢复初始化
                        bit = 2; // 还原初始值
                        delcont(); // 扣分函数
                    }
                    clearTimeout(show)
                }, 1000)
            }
        }
    };
    if (bit) {
        test1();
    }
}


