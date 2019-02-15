/**
 * 页面可需要回弹的dom节点
 * @param {*} domeNode 
 */
export const drawAndAutoBack = (domeNode) => {
    let startY = 0;//刚触摸时手指位置记录为原点
    let centerY = 0;//用来记录每次触摸时上一次的偏移距离
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // touchstart 时，记录手指在 Y 轴上的落点距离可视顶部距离
    let touchstartEvent = (event) => {
        //滚动条总高度可能随着页面操作而改变，每次开始滑动重新初始化滚动条总高度
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        startY = event.changedTouches[0].clientY
    }
    //设置最大滑动高度
    let maxDown = 75
    let maxUp = -75
    //滑动时设置下滑
    let touchmoveEvent = (event) => {
        //滑动过程中重新设置滚动条位置
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        domeNode.style.transition = 'none'
        let dy = event.changedTouches[0].clientY - startY
        //对dy做相应处理防止滑动距离大于设置的醉倒滑动距离，并且尽量使滑动更加平滑
        let tempY = dy > 0 ? maxDown - maxDown / (1 + dy / 60) : maxUp + maxUp / (dy / 60 - 1)
        setTimeout(function () {
            //只有在页面最底部或者最顶部操作时才偏移
            if (scrollTop == 0 || scrollTop + windowHeight === scrollHeight) {
                // 设置 元素 在 Y 轴上的偏移
                domeNode.style.transform = 'translateY(' + tempY + 'px)'
            }
        }, 100)
    }
    //滑动结束设置回弹
    let touchendEvent = () => {
        setTimeout(function () {
            //只有在页面最底部或者最顶部操作时才回弹
            if (scrollTop == 0 || scrollTop + windowHeight === scrollHeight) {
                // 添加过渡
                domeNode.style.transition = 'transform .5s'
                domeNode.style.transform = 'translateY(' + centerY + 'px)'
            }
        }, 100)
    }
    domeNode.addEventListener('touchstart', touchstartEvent)
    domeNode.addEventListener('touchmove', touchmoveEvent)
    domeNode.addEventListener('touchend', touchendEvent)
}

export function drawAndbcak(aimDomTree) {
    var startY = 0; // 刚触碰到屏幕的时的手指信息
    var centerY = 0; // 用来记录每次触摸时上一次的偏移距离
    var maxDown = 75; // 设定一个最大向下滑动的距离
    var maxUp = - maxDown; // 求得一个最大向上滑动的距离
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // touchstart 时，记录手指在 Y 轴上的落点距离可视顶部距离
    aimDomTree.addEventListener('touchstart', function (event) {
        startY = event.changedTouches[0].clientY;
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    })
    // touchmove 时，记录此时手指在 Y 轴上的落点距离可视顶部距离
    aimDomTree.addEventListener('touchmove', function (event) {
        // 清除过渡
        aimDomTree.style.transition = 'none';
        // 获取差值
        var dy = event.changedTouches[0].clientY - startY;
        // 上次的滑动距离加上本次的滑动距离
        var tempY = dy > 0 ? maxDown - maxDown / (1 + dy / 90) : maxUp + maxUp / (dy / 90 - 1)
        console.log('tempY:' + tempY + ' dy:' + dy)
        setTimeout(() => {
            if (scrollTop === 0 || windowHeight + scrollTop === scrollHeight) {
                // 设置  在 Y 轴上的偏移
                aimDomTree.style.transform = 'translateY(' + tempY + 'px)';
            }
        }, 200)
    })

    // touchend 时，记录此时手指在 Y 轴上的落点距离可视顶部距离
    aimDomTree.addEventListener('touchend', function () {
        setTimeout(() => {
            if (scrollTop === 0 || windowHeight + scrollTop === scrollHeight) {
                // 添加过渡
                aimDomTree.style.transition = 'transform .5s';
                aimDomTree.style.transform = 'translateY(' + centerY + 'px)';
            }
        }, 200)

    })
}