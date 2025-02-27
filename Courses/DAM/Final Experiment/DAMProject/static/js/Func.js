﻿function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}

function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var re = new RegExp('\\b' + sClass + '\\b', 'i');

    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className.search(re) != -1) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function startMove(obj, json, fnEnd) {
    clearInterval(obj.timer);
    var attr;
    obj.timer = setInterval(function () {

        var bStop = true;		//是不是都到了，假设所有的都到了

        for (attr in json) {
            var iCur = 0;

            //取当前位置
            if (attr == 'opacity') {
                iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            else if (attr == 'scale'){
                iCur = Math.round(parseFloat(obj, attr)) * 100;
            }
            else {
                iCur = parseInt(getStyle(obj, attr));
            }

            //算速度
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            //到没到

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            }
            else if (attr == 'scale') {
                obj.style.transform = 'scale(' + ((iCur + iSpeed) / 100) + ')';
            }
            else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }

            if (iCur - json[attr] > 1 || iCur - json[attr] < -1) {
                bStop = false;
            }
        }

        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) {
                fnEnd();
            }
        }
    }, 10);
};

function switchCss(id, json) {
    $(id).css('left') = json['left'] + 'px';
}