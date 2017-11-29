 var ListBox, ImgList, Imgnavi, aImg, oPrev, oNext, pagewidth, pageheight;

window.onload = function () {

    ListBox = getByClass(document.body, 'floating_list')[0];
    ImgList = getByClass(document.body, 'list_slider')[0];
    Imgnavi = getByClass(document.body, 'list_navigation')[0];
    aImg = ImgList.getElementsByTagName('li');

    oPrev = getByClass(document.body, 'list_prev')[0];
    oNext = getByClass(document.body, 'list_next')[0];
    sNext = getByClass(document.body, 'scroll_next')[0];
    sBack = getByClass(document.body, 'scroll_back')[0];
    sSize = getByClass(document.body, 'screen_size')[0];

    pagewidth = document.documentElement.clientWidth;
    pageheight = document.documentElement.clientHeight;
    ListBox.style.width = pagewidth + 'px';
    ListBox.style.height = pageheight + 'px';
    ImgList.style.height = pageheight + 'px';
    ImgList.style.width = pagewidth + 'px';
    Imgnavi.style.width = pagewidth + 'px';
    Imgnavi.style.height = 200 + 'px';
    var scale1 = ImgList.style.transform;
    var isFolded = true;
    var IsCategory = true;//标识列表当前状态，true为分类列表，false为内容列表
    var ArrayName = 'Category';
    var ArrayLen = 5; //标识列表当前数组大小
    var Cur_id = 1;//标识当前列表起始位置所对应数组位置
    //sSize.innerHTML = pagewidth + 'px ' + '\n' + pageheight + 'px' + scale1;

    var Index = ["#Section1", "#Section2", "#Section3", "#Section4", "#Section5", "#Section6", "#Section7"];
    var CIndex = ["#Category1", "#Category2", "#Category3", "#Category4", "#Category5", "#Category6", "#Category7"];
    var Scale_init = [1.0, 1.0, 0.94, 0.74, 0.6, 0.48, 0.20];
    var Scale_prev = [0.20, 1.0, 1.064, 1.270, 1.233, 1.25, 2.4];
    var Scale_next = [1.0, 0.94, 0.787, 0.811, 0.8, 0.417, 5];
    var Css = [];
    Css[0] = { left: -700 + 'px', top: 860 + 'px', width: 500 + 'px', height: 500 + 'px', opacity: 0.0};//, filter: 'blur(20px)'};
    Css[1] = { left: -200 + 'px', top: 360 + 'px', width: 500 + 'px', height: 500 + 'px', opacity: 0.7}; //, filter: 'blur(15px)'};
    Css[2] = { left: 230 + 'px', top: 170 + 'px', width: 500 + 'px', height: 500 + 'px', opacity: 1.0}; //, filter: 'blur(0px)'}, filter: 'blur(0px)' };
    Css[3] = { left: 560 + 'px', top: 100 + 'px', width: 500+ 'px', height: 500 + 'px', opacity: 0.7}; //, filter: 'blur(10px)' };
    Css[4] = { left: 790 + 'px', top: 120 + 'px', width: 500 + 'px', height: 500 + 'px', opacity: 0.5}; //, filter: 'blur(15px)' };
    Css[5] = { left: 980 + 'px', top: 170 + 'px', width: 500 + 'px', height: 500 + 'px', opacity: 0.3}; //, filter: 'blur(20px)' };
    Css[6] = { left: 1280 + 'px', top: 300 + 'px', width: 500 + 'px', height: 500 + 'px', opacity: 0.0}; //, filter: 'blur(30px)' };

    //以下为初始化内容

    //初始化分类列表
    for (var i = 0; i < 7; i++) {
        $(CIndex[i]).css('left', Css[i]['left']); 
        $(CIndex[i]).css('top', Css[i]['top']);
        $(CIndex[i]).css('width', Css[i]['width']);
        $(CIndex[i]).css('height', Css[i]['height']);
        $(CIndex[i]).css('opacity', Css[i]['opacity']);
        $(CIndex[i]).css('transform', 'scale(' + Scale_init[i] + ')');
    }

    //初始化内容列表
    for(var i = 0;i < 7; i++)
    {
        $(Index[i]).css('left', Css[6]['left']);1
        $(Index[i]).css('top', Css[6]['top']);
        $(Index[i]).css('width', Css[6]['width']);
        $(Index[i]).css('height', Css[6]['height']);
        $(Index[i]).css('opacity', Css[6]['opacity']);
        $(Index[i]).css('transform', 'scale(' + Scale_init[6] + ')');
    }


        $(Index[0]).css('z-index', 7);
        $(Index[1]).css('z-index', 6);
        $(Index[2]).css('z-index', 5);
        $(Index[3]).css('z-index', 4);
        $(Index[4]).css('z-index', 3);
        $(Index[5]).css('z-index', 2);
        $(Index[6]).css('z-index', 1);

        $(CIndex[0]).css('z-index', 7);
        $(CIndex[1]).css('z-index', 6);
        $(CIndex[2]).css('z-index', 5);
        $(CIndex[3]).css('z-index', 4);
        $(CIndex[4]).css('z-index', 3);
        $(CIndex[5]).css('z-index', 2);
        $(CIndex[6]).css('z-index', 1);


    var PreAnim = function(){
        $(Index[0]).css('left', Css[6]['left']);
        $(Index[0]).css('top', Css[6]['top']);
        $(Index[0]).css('width', Css[6]['width']);
        $(Index[0]).css('height', Css[6]['height']);
        $(Index[0]).css('opacity', Css[6]['opacity']);
        $(Index[0]).css('transform', 'scale(' + Scale_prev[6] + ')');
        //$(Index[0]).css('transform', 'scale(' + Scale_prev[0] + ')');
        //$(Index[0]).css('filter', Css[6]['filter']);
        $(Index[1]).animate(Css[0], 300);
        $(Index[1]).css('transform', 'scale(' + Scale_init[0] + ')');
        $(Index[2]).animate(Css[1], 300);
        $(Index[2]).css('transform', 'scale(' + Scale_init[1] + ')');
        $(Index[3]).animate(Css[2], 300);
        $(Index[3]).css('transform', 'scale(' + Scale_init[2] + ')');
        $(Index[4]).animate(Css[3], 300);
        $(Index[4]).css('transform', 'scale(' + Scale_init[3] + ')');
        $(Index[5]).animate(Css[4], 300);
        $(Index[5]).css('transform', 'scale(' + Scale_init[4] + ')');
        $(Index[6]).animate(Css[5], 300);
        $(Index[6]).css('transform', 'scale(' + Scale_init[5] + ')');

        var head = Index[0];
        for(var i = 0; i < 6; i++)
        {
            Index[i] = Index[i + 1];
        }
        Index[6] = head;
        $(Index[0]).css('z-index', 7);
        $(Index[1]).css('z-index', 6);
        $(Index[2]).css('z-index', 5);
        $(Index[3]).css('z-index', 4);
        $(Index[4]).css('z-index', 3);
        $(Index[5]).css('z-index', 2);
        $(Index[6]).css('z-index', 1);
    }

    var CPreAnim = function () {
        $(CIndex[0]).css('left', Css[6]['left']);
        $(CIndex[0]).css('top', Css[6]['top']);
        $(CIndex[0]).css('width', Css[6]['width']);
        $(CIndex[0]).css('height', Css[6]['height']);
        $(CIndex[0]).css('opacity', Css[6]['opacity']);
        $(CIndex[0]).css('transform', 'scale(' + Scale_prev[6] + ')');
        //$(Index[0]).css('transform', 'scale(' + Scale_prev[0] + ')');
        //$(Index[0]).css('filter', Css[6]['filter']);
        $(CIndex[1]).animate(Css[0], 300);
        $(CIndex[1]).css('transform', 'scale(' + Scale_init[0] + ')');
        $(CIndex[2]).animate(Css[1], 300);
        $(CIndex[2]).css('transform', 'scale(' + Scale_init[1] + ')');
        $(CIndex[3]).animate(Css[2], 300);
        $(CIndex[3]).css('transform', 'scale(' + Scale_init[2] + ')');
        $(CIndex[4]).animate(Css[3], 300);
        $(CIndex[4]).css('transform', 'scale(' + Scale_init[3] + ')');
        $(CIndex[5]).animate(Css[4], 300);
        $(CIndex[5]).css('transform', 'scale(' + Scale_init[4] + ')');
        $(CIndex[6]).animate(Css[5], 300);
        $(CIndex[6]).css('transform', 'scale(' + Scale_init[5] + ')');

        var head = CIndex[0];
        for (var i = 0; i < 6; i++) {
            CIndex[i] = CIndex[i + 1];
        }
        CIndex[6] = head;
        $(CIndex[0]).css('z-index', 7);
        $(CIndex[1]).css('z-index', 6);
        $(CIndex[2]).css('z-index', 5);
        $(CIndex[3]).css('z-index', 4);
        $(CIndex[4]).css('z-index', 3);
        $(CIndex[5]).css('z-index', 2);
        $(CIndex[6]).css('z-index', 1);
    }

    oPrev.onclick = function () {
        if (IsCategory)
        {
            CPreAnim();
        }
        else
        {
            if (!isFolded) {
                var id = Index[2].substring(8, Index[2].length);
                var id_cur = "#infoDiv" + id;
                var video = document.getElementById("infoVideo" + id);
                $(id_cur).animate({
                    width: parseInt($(id_cur).css('width'), 10) == 0 ? 700 : 0,
                }, function () {
                    isFolded = !isFolded;
                    video.load();
                    PreAnim();
                    if (Cur_id + 5 <= ArrayLen)
                        CellFunction(7, Cur_id + 5, ArrayName);
                    else
                        CellFunction(7, (Cur_id + 5) % ArrayLen, ArrayName);
                    Cur_id++;
                    if (Cur_id > ArrayLen)
                        Cur_id = Cur_id % ArrayLen;
                });
            }
            else {
                PreAnim();
            }
        }
    }

    var NextAnim = function(){
        $(Index[6]).css('left', Css[0]['left']);
        $(Index[6]).css('top', Css[0]['top']);
        $(Index[6]).css('width', Css[0]['width']);
        $(Index[6]).css('height', Css[0]['height']);
        $(Index[6]).css('opacity', Css[0]['opacity']);
        $(Index[6]).css('transform', 'scale(' + Scale_init[0] + ')');
        //$(Index[6]).css('filter', Css[0]['filter']);
        $(Index[0]).animate(Css[1], 300);
        $(Index[0]).css('transform', 'scale(' + Scale_init[1] + ')');
        $(Index[1]).animate(Css[2], 300);
        $(Index[1]).css('transform', 'scale(' + Scale_init[2] + ')');
        $(Index[2]).animate(Css[3], 300);
        $(Index[2]).css('transform', 'scale(' + Scale_init[3] + ')');
        $(Index[3]).animate(Css[4], 300);
        $(Index[3]).css('transform', 'scale(' + Scale_init[4] + ')');
        $(Index[4]).animate(Css[5], 300);
        $(Index[4]).css('transform', 'scale(' + Scale_init[5] + ')');
        $(Index[5]).animate(Css[6], 300);
        $(Index[5]).css('transform', 'scale(' + Scale_init[6] + ')');
   
        var tail = Index[6];
        for (var i = 6; i > 0; i--) {
            Index[i] = Index[i - 1];
        }
        Index[0] = tail;
        $(Index[0]).css('z-index', 7);
        $(Index[1]).css('z-index', 6);
        $(Index[2]).css('z-index', 5);
        $(Index[3]).css('z-index', 4);
        $(Index[4]).css('z-index', 3);
        $(Index[5]).css('z-index', 2);
        $(Index[6]).css('z-index', 1);
    }

    var CNextAnim = function () {
        $(CIndex[6]).css('left', Css[0]['left']);
        $(CIndex[6]).css('top', Css[0]['top']);
        $(CIndex[6]).css('width', Css[0]['width']);
        $(CIndex[6]).css('height', Css[0]['height']);
        $(CIndex[6]).css('opacity', Css[0]['opacity']);
        $(CIndex[6]).css('transform', 'scale(' + Scale_init[0] + ')');
        //$(Index[6]).css('filter', Css[0]['filter']);
        $(CIndex[0]).animate(Css[1], 300);
        $(CIndex[0]).css('transform', 'scale(' + Scale_init[1] + ')');
        $(CIndex[1]).animate(Css[2], 300);
        $(CIndex[1]).css('transform', 'scale(' + Scale_init[2] + ')');
        $(CIndex[2]).animate(Css[3], 300);
        $(CIndex[2]).css('transform', 'scale(' + Scale_init[3] + ')');
        $(CIndex[3]).animate(Css[4], 300);
        $(CIndex[3]).css('transform', 'scale(' + Scale_init[4] + ')');
        $(CIndex[4]).animate(Css[5], 300);
        $(CIndex[4]).css('transform', 'scale(' + Scale_init[5] + ')');
        $(CIndex[5]).animate(Css[6], 300);
        $(CIndex[5]).css('transform', 'scale(' + Scale_init[6] + ')');

        var tail = CIndex[6];
        for (var i = 6; i > 0; i--) {
            CIndex[i] = CIndex[i - 1];
        }
        CIndex[0] = tail;
        $(CIndex[0]).css('z-index', 7);
        $(CIndex[1]).css('z-index', 6);
        $(CIndex[2]).css('z-index', 5);
        $(CIndex[3]).css('z-index', 4);
        $(CIndex[4]).css('z-index', 3);
        $(CIndex[5]).css('z-index', 2);
        $(CIndex[6]).css('z-index', 1);
    }

    oNext.onclick = function () {
        if (IsCategory)
        {
            CNextAnim();
        }
        else
        {
            if(!isFolded)
            {
                var id=Index[2].substring(8,Index[2].length);
                var id_cur = "#infoDiv" + id;
                var video=document.getElementById("infoVideo"+id);
                $(id_cur).animate({
                    width: parseInt($(id_cur).css('width'), 10) == 0 ? 700 : 0,
                }, function () {
                    isFolded = !isFolded;
                    video.load();
                    if (Cur_id - 1 < 1)
                        CellFunction(1, ArrayLen, ArrayName);
                    else
                        CellFunction(1, Cur_id - 1, ArrayName);
                    Cur_id--;
                    if (Cur_id == 0)
                        Cur_id = ArrayLen;
                    NextAnim();
                });
            }
            else{
                NextAnim();
            }
        }
    }

    sNext.onclick = function () {

    }

    var init = function(array,len,pos){
        CellsFunction(1, pos, array);
        Cur_id = pos;
        ArrayName = array;
        ArrayLen = len;
    }

    $("#cellImg1").click(function () {
        var video=document.getElementById("infoVideo1");
        if(Index[2] == "#Section1")
            $("#infoDiv1").animate({
                width: parseInt($("#infoDiv1").css('width'), 10) == 0 ? 700 : 0,
            }, function () {
                isFolded = !isFolded;
                video.load();
            });
    });

    $("#cellImg2").click(function () {
        var video=document.getElementById("infoVideo2");
        if (Index[2] == "#Section2")
            $("#infoDiv2").animate({
                width: parseInt($("#infoDiv2").css('width'), 10) == 0 ? 700 : 0,
            }, function () {
                isFolded = !isFolded;
                video.load();
            });
    });

    $("#cellImg3").click(function () {
        var video=document.getElementById("infoVideo3");
        if (Index[2] == "#Section3")
            $("#infoDiv3").animate({
                width: parseInt($("#infoDiv3").css('width'), 10) == 0 ? 700 : 0,
            }, function () {
                isFolded = !isFolded;
                video.load();
            });
    });

    $("#cellImg4").click(function () {
        var video=document.getElementById("infoVideo4");
        if (Index[2] == "#Section4")
            $("#infoDiv4").animate({
                width: parseInt($("#infoDiv4").css('width'), 10) == 0 ? 700 : 0,
            }, function () {
                isFolded = !isFolded;
                video.load();
            });
    });

    $("#cellImg5").click(function () {
        var video=document.getElementById("infoVideo5");
        if (Index[2] == "#Section5")
            $("#infoDiv5").animate({
                width: parseInt($("#infoDiv5").css('width'), 10) == 0 ? 700 : 0,
            }, function () {
                isFolded = !isFolded;
                video.load();
            });
    });

    $("#cellImg6").click(function () {
        var video=document.getElementById("infoVideo6");
        if (Index[2] == "#Section6")
            $("#infoDiv6").animate({
                width: parseInt($("#infoDiv6").css('width'), 10) == 0 ? 700 : 0,
            }, function () {
                isFolded = !isFolded;
                video.load();
            });
    });

    $("#cellImg7").click(function () {
        var video=document.getElementById("infoVideo7");
        if (Index[2] == "#Section7")
            $("#infoDiv7").animate({
                width: parseInt($("#infoDiv7").css('width'), 10) == 0 ? 700 : 0,
            }, function () {
                isFolded = !isFolded;
                video.load();
            });
    });

    var CategoryToList=function(arrayName){
        //点击类别块转入游戏列表************************************************************************************
        var data = {
            data:JSON.stringify({
                'cmd': 'CategoryToList',
                'category': arrayName
            })
        };
        $.ajax({
            url: '/',
            type: 'post',
            datatype: 'JSON',
            data: data,
            error:function(){
                alert("Enter List Fail!");
            },
            success:function(data){
                ArrayName = arrayName;
                IsCategory = false;
                for (var i = 0; i < 7; i++) {
                    $(CIndex[i]).css('left', Css[6]['left']);
                    $(CIndex[i]).css('top', Css[6]['top']);
                    $(CIndex[i]).css('width', Css[6]['width']);
                    $(CIndex[i]).css('height', Css[6]['height']);
                    $(CIndex[i]).css('opacity', Css[6]['opacity']);
                    $(CIndex[i]).css('transform', 'scale(' + Scale_init[6] + ')');
                }

                //初始化内容列表
                for (var i = 0; i < 7; i++) {
                    $(Index[i]).css('left', Css[i]['left']); 
                    $(Index[i]).css('top', Css[i]['top']);
                    $(Index[i]).css('width', Css[i]['width']);
                    $(Index[i]).css('height', Css[i]['height']);
                    $(Index[i]).css('opacity', Css[i]['opacity']);
                    $(Index[i]).css('transform', 'scale(' + Scale_init[i] + ')');
                }
                init(ArrayName,data.len,1);
            }
        });
    }
    
    $("#categoryCellImg1").click(function (){
        CategoryToList('rpg');
    });
    $("#categoryCellImg2").click(function (){
        CategoryToList('cards');
    });
    $("#categoryCellImg3").click(function (){
        CategoryToList('leisure');
    });
    $("#categoryCellImg4").click(function (){
        CategoryToList('parkour');
    });
    $("#categoryCellImg5").click(function (){
        CategoryToList('puzzle');
    });
    $("#categoryCellImg6").click(function (){
        CategoryToList('riddle');
    });

    $("#categoryCellImg7").click(function (){
        CategoryToList('sport');
    });

    $("#backBtn").click(function () {
        //初始化分类列表
        IsCategory = true;
        for (var i = 0; i < 7; i++) {
            $(CIndex[i]).css('left', Css[i]['left']);
            $(CIndex[i]).css('top', Css[i]['top']);
            $(CIndex[i]).css('width', Css[i]['width']);
            $(CIndex[i]).css('height', Css[i]['height']);
            $(CIndex[i]).css('opacity', Css[i]['opacity']);
            $(CIndex[i]).css('transform', 'scale(' + Scale_init[i] + ')');
        }

        //初始化内容列表
        for (var i = 0; i < 7; i++) {
            $(Index[i]).css('left', Css[6]['left']); 1
            $(Index[i]).css('top', Css[6]['top']);
            $(Index[i]).css('width', Css[6]['width']);
            $(Index[i]).css('height', Css[6]['height']);
            $(Index[i]).css('opacity', Css[6]['opacity']);
            $(Index[i]).css('transform', 'scale(' + Scale_init[6] + ')');
        }
    });
    //================================================================================
    var isInfo=false;
    var isLogin=false;
    var userID;

    //main
    $("#userImage").click(function(){
        if(!isInfo&&isLogin){
            $("#userImage").animate({
                width:parseInt($("#userImage").css('width'),10)==100?200:100,
                height:parseInt($("#userImage").css('height'),10)==100?200:100,
                right:parseInt($("#userImage").css('right'),10)==0?100:0,
                bottom:parseInt($("#userImage").css('bottom'),10)==0?100:0
            });
            $("#userNameLabel").animate({
                width:parseInt($("#userNameLabel").css('width'),10)==100?200:100,
                height:parseInt($("#userNameLabel").css('height'),10)==20?40:20,
                right:parseInt($("#userNameLabel").css('right'),10)==0?100:0,
                bottom:parseInt($("#userNameLabel").css('bottom'),10)==5?105:5
            });
            $("#userName").animate({
                fontSize:parseInt($("#userName").css('font-size'),10)==15?20:15
            });
            $("#libImage").animate({
                width:parseInt($("#libImage").css('width'),10)==50?100:50,
                height:parseInt($("#libImage").css('height'),10)==50?100:50,
                right:parseInt($("#libImage").css('right'),10)==0?270:0,
                bottom:parseInt($("#libImage").css('bottom'),10)==0?270:0
            });
            $("#libNameLabel").animate({
                width:parseInt($("#libNameLabel").css('width'),10)==50?100:50,
                height:parseInt($("#libNameLabel").css('height'),10)==20?40:20,
                right:parseInt($("#libNameLabel").css('right'),10)==0?270:0,
                bottom:parseInt($("#libNameLabel").css('bottom'),10)==-10?250:-10
            });
            $("#libName").animate({
                fontSize:parseInt($("#libName").css('font-size'),10)==15?20:15
            });
            $("#userInfoImage").animate({
                width:parseInt($("#userInfoImage").css('width'),10)==50?100:50,
                height:parseInt($("#userInfoImage").css('height'),10)==50?100:50,
                right:parseInt($("#userInfoImage").css('right'),10)==0?270:0,
                bottom:parseInt($("#userInfoImage").css('bottom'),10)==0?-20:0
            });
            $("#userInfoNameLabel").animate({
                width:parseInt($("#userInfoNameLabel").css('width'),10)==50?100:50,
                height:parseInt($("#userInfoNameLabel").css('height'),10)==20?40:20,
                right:parseInt($("#userInfoNameLabel").css('right'),10)==0?270:0,
                bottom:parseInt($("#userInfoNameLabel").css('bottom'),10)==-10?-40:-10
            });
            $("#userInfoName").animate({
                fontSize:parseInt($("#userInfoName").css('font-size'),10)==15?20:15
            });
        }
        if(!isLogin){
            $("#loginDiv").css('width',"1920px");
            $("#loginDiv").css('height',"1080px");
            $("#loginDiv").animate({
                opacity:parseInt($("#loginDiv").css('opacity'),10)==0?1:0
            })
        }
    });

    $("#libImage").click(function(){
        if(isLogin){
            $("#userImage").animate({
                width:parseInt($("#userImage").css('width'),10)==100?200:100,
                height:parseInt($("#userImage").css('height'),10)==100?200:100,
                right:parseInt($("#userImage").css('right'),10)==0?100:0,
                bottom:parseInt($("#userImage").css('bottom'),10)==0?100:0
            });
            $("#userNameLabel").animate({
                width:parseInt($("#userNameLabel").css('width'),10)==100?200:100,
                height:parseInt($("#userNameLabel").css('height'),10)==20?40:20,
                right:parseInt($("#userNameLabel").css('right'),10)==0?100:0,
                bottom:parseInt($("#userNameLabel").css('bottom'),10)==5?105:5
            });
            $("#userName").animate({
                fontSize:parseInt($("#userName").css('font-size'),10)==15?30:15
            });
            $("#libImage").animate({
                width:parseInt($("#libImage").css('width'),10)==50?100:50,
                height:parseInt($("#libImage").css('height'),10)==50?100:50,
                right:parseInt($("#libImage").css('right'),10)==0?270:0,
                bottom:parseInt($("#libImage").css('bottom'),10)==0?270:0
            });
            $("#libNameLabel").animate({
                width:parseInt($("#libNameLabel").css('width'),10)==50?100:50,
                height:parseInt($("#libNameLabel").css('height'),10)==20?40:20,
                right:parseInt($("#libNameLabel").css('right'),10)==0?270:0,
                bottom:parseInt($("#libNameLabel").css('bottom'),10)==-10?250:-10
            });
            $("#libName").animate({
                fontSize:parseInt($("#libName").css('font-size'),10)==15?20:15
            });
            $("#userInfoImage").animate({
                width:parseInt($("#userInfoImage").css('width'),10)==50?100:50,
                height:parseInt($("#userInfoImage").css('height'),10)==50?100:50,
                right:parseInt($("#userInfoImage").css('right'),10)==0?270:0,
                bottom:parseInt($("#userInfoImage").css('bottom'),10)==0?-20:0
            });
            $("#userInfoNameLabel").animate({
                width:parseInt($("#userInfoNameLabel").css('width'),10)==50?100:50,
                height:parseInt($("#userInfoNameLabel").css('height'),10)==20?40:20,
                right:parseInt($("#userInfoNameLabel").css('right'),10)==0?270:0,
                bottom:parseInt($("#userInfoNameLabel").css('bottom'),10)==-10?-40:-10
            });
            $("#userInfoName").animate({
                fontSize:parseInt($("#userInfoName").css('font-size'),10)==15?20:15
            });

            //将List更换为Lib*****************************************************************
            var data = {
                data:JSON.stringify({
                    'cmd': 'Lib',
                    'userID': userID
                })
            };

            $.ajax({
                url: '/',
                async: false,
                type: 'post',
                datatype: 'JSON',
                data: data,
                error:function(){
                    alert("Enter Lib Fail!");
                },
                success:function(data){
                    ArrayName = 'Lib';
                    IsCategory = false;
                    for (var i = 0; i < 7; i++) {
                        $(CIndex[i]).css('left', Css[6]['left']);
                        $(CIndex[i]).css('top', Css[6]['top']);
                        $(CIndex[i]).css('width', Css[6]['width']);
                        $(CIndex[i]).css('height', Css[6]['height']);
                        $(CIndex[i]).css('opacity', Css[6]['opacity']);
                        $(CIndex[i]).css('transform', 'scale(' + Scale_init[6] + ')');
                    }

                    //初始化内容列表
                    for (var i = 0; i < 7; i++) {
                        $(Index[i]).css('left', Css[i]['left']);
                        $(Index[i]).css('top', Css[i]['top']);
                        $(Index[i]).css('width', Css[i]['width']);
                        $(Index[i]).css('height', Css[i]['height']);
                        $(Index[i]).css('opacity', Css[i]['opacity']);
                        $(Index[i]).css('transform', 'scale(' + Scale_init[i] + ')');
                    }
                    init(ArrayName,data.len,1);
                }
            });
        }
    });

    $("#userInfoImage").click(function(){
        if(isLogin){
            $("#userImage").css('box-shadow','0px 0px 5px white');
            $("#userImage").animate({
                right:parseInt($("#userImage").css('right'),10)==250?100:250,
                bottom:parseInt($("#userImage").css('bottom'),10)==250?100:250
            },function(){
                $("#logoutBtn").animate({
                    width:parseInt($("#logoutBtn").css('width'),10)==0?100:0,
                    right:parseInt($("#logoutBtn").css('right'),10)==300?350:300
                });
                $("#userInfoDivImg").css('z-index','4');
                $("#userInfoDivImg").animate({
                    width:parseInt($("#userInfoDivImg").css('width'),10)==380?0:380,
                    height:parseInt($("#userInfoDivImg").css('height'),10)==380?0:380,
                    bottom:parseInt($("#userInfoDivImg").css('bottom'),10)==210?350:210,
                    right:parseInt($("#userInfoDivImg").css('right'),10)==80?400:80
                },function(){
                    $("#infoText").animate({
                        width:parseInt($("#infoText").css('width'),10)==350?0:350,
                        right:parseInt($("#infoText").css('right'),10)==70?300:70
                    });
                    $("#userBackBtn").animate({
                        opacity:parseInt($("#userBackBtn").css('opacity'),10)==0?1:0
                    });
                });
            });
            $("#userNameLabel").animate({
                right:parseInt($("#userNameLabel").css('right'),10)==250?100:250,
                bottom:parseInt($("#userNameLabel").css('bottom'),10)==255?105:255
            });
            $("#libImage").animate({
                opacity:parseInt($("#libImage").css('opacity'),10)==0?1:0
            },function(){
                $("#libImage").css('width','0px');
            });
            $("#libNameLabel").animate({
                opacity:parseInt($("#libNameLabel").css('opacity'),10)==0?1:0
            },function(){
                $("#libNameLabel").css('width','0px');
            });
            $("#userInfoImage").animate({
                opacity:parseInt($("#userInfoImage").css('opacity'),10)==0?1:0
            },function(){
                $("#userInfoImage").css('width','0px');
            });
            $("#userInfoNameLabel").animate({
                opacity:parseInt($("#userInfoNameLabel").css('opacity'),10)==0?1:0
            },function(){
                $("#userInfoNameLabel").css('width','0px');
            });
            isInfo=true;        
        }
    });

    var UserBack=function(){
        if(isInfo&&isLogin){
            $("#userBackBtn").animate({
                opacity:parseInt($("#userBackBtn").css('opacity'),10)==0?1:0
            });
            $("#infoText").animate({
                width:parseInt($("#infoText").css('width'),10)==350?0:350,
                right:parseInt($("#infoText").css('right'),10)==70?300:70
            },function(){
                $("#logoutBtn").animate({
                    width:parseInt($("#logoutBtn").css('width'),10)==0?100:0,
                    right:parseInt($("#logoutBtn").css('right'),10)==300?350:300
                });
                $("#userInfoDivImg").animate({
                    width:parseInt($("#userInfoDivImg").css('width'),10)==380?0:380,
                    height:parseInt($("#userInfoDivImg").css('height'),10)==380?0:380,
                    bottom:parseInt($("#userInfoDivImg").css('bottom'),10)==210?350:210,
                    right:parseInt($("#userInfoDivImg").css('right'),10)==80?400:80
                },function(){
                    $("#userImage").animate({
                        width:parseInt($("#userImage").css('width'),10)==200?100:200,
                        height:parseInt($("#userImage").css('height'),10)==200?100:200,
                        right:parseInt($("#userImage").css('right'),10)==250?0:250,
                        bottom:parseInt($("#userImage").css('bottom'),10)==250?0:250,
                        boxShadow:'none'
                    });
                    $("#userNameLabel").animate({
                        width:parseInt($("#userNameLabel").css('width'),10)==200?100:200,
                        height:parseInt($("#userNameLabel").css('height'),10)==40?20:40,
                        right:parseInt($("#userNameLabel").css('right'),10)==250?0:250,
                        bottom:parseInt($("#userNameLabel").css('bottom'),10)==255?5:255
                    });
                    $("#userName").animate({
                        fontSize:parseInt($("#userName").css('font-size'),10)==15?20:15
                    });
                    $("#libImage").css('width','200px');
                    $("#libImage").animate({
                        width:parseInt($("#libImage").css('width'),10)==50?100:50,
                        height:parseInt($("#libImage").css('height'),10)==50?100:50,
                        right:parseInt($("#libImage").css('right'),10)==0?270:0,
                        bottom:parseInt($("#libImage").css('bottom'),10)==0?270:0
                    },function(){
                        $("#libImage").animate({opacity:parseInt($("#libImage").css('opacity'),10)==0?1:0});
                    });
                    $("#libNameLabel").css('width','200px');
                    $("#libNameLabel").animate({
                        width:parseInt($("#libNameLabel").css('width'),10)==50?100:50,
                        height:parseInt($("#libNameLabel").css('height'),10)==20?40:20,
                        right:parseInt($("#libNameLabel").css('right'),10)==0?270:0,
                        bottom:parseInt($("#libNameLabel").css('bottom'),10)==-10?250:-10
                    },function(){
                        $("#libNameLabel").animate({opacity:parseInt($("#libNameLabel").css('opacity'),10)==0?1:0});
                    });
                    $("#libName").animate({
                        fontSize:parseInt($("#libName").css('font-size'),10)==15?20:15
                    });
                    $("#userInfoImage").css('width','200px');
                    $("#userInfoImage").animate({
                        width:parseInt($("#userInfoImage").css('width'),10)==50?100:50,
                        height:parseInt($("#userInfoImage").css('height'),10)==50?100:50,
                        right:parseInt($("#userInfoImage").css('right'),10)==0?270:0,
                        bottom:parseInt($("#userInfoImage").css('bottom'),10)==0?-20:0,
                    },function(){
                        $("#userInfoImage").animate({opacity:parseInt($("#userInfoImage").css('opacity'),10)==0?1:0});
                    });
                    $("#userInfoNameLabel").css('width','200px');
                    $("#userInfoNameLabel").animate({
                        width:parseInt($("#userInfoNameLabel").css('width'),10)==50?100:50,
                        height:parseInt($("#userInfoNameLabel").css('height'),10)==20?40:20,
                        right:parseInt($("#userInfoNameLabel").css('right'),10)==0?270:0,
                        bottom:parseInt($("#userInfoNameLabel").css('bottom'),10)==-10?-40:-10,
                    },function(){
                        $("#userInfoNameLabel").animate({opacity:parseInt($("#userInfoNameLabel").css('opacity'),10)==0?1:0});
                    });
                    $("#userInfoName").animate({
                        fontSize:parseInt($("#userInfoName").css('font-size'),10)==15?20:15
                    });
                });
            });
        }
        isInfo=false;
    }

    $("#userBackBtn").click(function(){
        UserBack();
    });

    $("#userBackBtn").hover(function(){
        if(isLogin){
            if(isInfo){
                $("#userBackBtn").css('cursor',"pointer");
                $("#userBackBtn").css('text-shadow',"0px 0px 10px white");
            }else{
                $("#userBackBtn").css('cursor',"default");
            }           
        }
    },function(){
        if(isLogin){
            $("#userBackBtn").css('cursor',"default");
            $("#userBackBtn").css('text-shadow',"none");
        }
    });

    //login
    $("#loginBtn").click(function(){
        var data = {
            data:JSON.stringify({
                'cmd': 'login',
                'account': $("#accountBar").val(),
                'password': $("#passwordBar").val()
            })
        };
        $.ajax({
            url: '/',
            type: 'post',
            datatype: 'JSON',
            data: data,
            error:function(){
                alert("Login Fail!");
            },
            success:function(data){
                if(data.result=="true"){
                    isLogin=true;
                }
                $("#loginDiv").animate({
                    opacity:parseInt($("#loginDiv").css('opacity'),10)==0?1:0
                },function(){
                    $("#loginDiv").css('width',"0px");
                    $("#loginDiv").css('height',"0px");
                })
                $("#userName").html(data.userName);
                $("#userImage").css('background-image',"url("+data.userImg+")");
                $("#userNameInfo").html(data.userName);
                $("#balanceInfo").html(data.balanceInfo);
                $("#stockSizeInfo").html(data.stockSizeInfo);
                userID=data.userID;//当前登陆的用户id*********************************************************************************

                IsCategory = true;
                for (var i = 0; i < 7; i++) {
                    $(CIndex[i]).css('left', Css[i]['left']);
                    $(CIndex[i]).css('top', Css[i]['top']);
                    $(CIndex[i]).css('width', Css[i]['width']);
                    $(CIndex[i]).css('height', Css[i]['height']);
                    $(CIndex[i]).css('opacity', Css[i]['opacity']);
                    $(CIndex[i]).css('transform', 'scale(' + Scale_init[i] + ')');
                }

                //初始化内容列表
                for (var i = 0; i < 7; i++) {
                    $(Index[i]).css('left', Css[6]['left']); 1
                    $(Index[i]).css('top', Css[6]['top']);
                    $(Index[i]).css('width', Css[6]['width']);
                    $(Index[i]).css('height', Css[6]['height']);
                    $(Index[i]).css('opacity', Css[6]['opacity']);
                    $(Index[i]).css('transform', 'scale(' + Scale_init[6] + ')');
                }
            }
        });
    });
    $("#loginCancelBtn").click(function(){
        $("#loginDiv").animate({
            opacity:parseInt($("#loginDiv").css('opacity'),10)==0?1:0
        },function(){
            $("#loginDiv").css('width',"0px");
            $("#loginDiv").css('height',"0px");
        });
    });

    //logout
    $("#logoutBtn").click(function(){
        UserBack();
        $("#userName").animate({
            opacity:'0'
        },function(){
            $("#userName").html('Login');
            $("#userImage").css('background-image',"url(../static/images/ui/emptyUser.png)");
            $("#userName").animate({
                opacity:'1'
            })
            $("#userNameInfo").html("");
            $("#balanceInfo").html("");
            $("#stockSizeInfo").html("");
        })
        isLogin=false;

        //初始化分类列表
        IsCategory = true;
        for (var i = 0; i < 7; i++) {
            $(CIndex[i]).css('left', Css[i]['left']);
            $(CIndex[i]).css('top', Css[i]['top']);
            $(CIndex[i]).css('width', Css[i]['width']);
            $(CIndex[i]).css('height', Css[i]['height']);
            $(CIndex[i]).css('opacity', Css[i]['opacity']);
            $(CIndex[i]).css('transform', 'scale(' + Scale_init[i] + ')');
        }

        //初始化内容列表
        for (var i = 0; i < 7; i++) {
            $(Index[i]).css('left', Css[6]['left']); 1
            $(Index[i]).css('top', Css[6]['top']);
            $(Index[i]).css('width', Css[6]['width']);
            $(Index[i]).css('height', Css[6]['height']);
            $(Index[i]).css('opacity', Css[6]['opacity']);
            $(Index[i]).css('transform', 'scale(' + Scale_init[6] + ')');
        }
    })

    //css
    $("#userImage").hover(function(){
        if(!isInfo){
            $("#userImage").css('cursor',"pointer");
            $("#userImage").css('box-shadow',"0px 0px 100px #836FFF");
        }
    },function(){
        $("#userImage").css('cursor',"default");
        if(!isInfo){
            $("#userImage").css('box-shadow',"none");
        }
    });

    //search=====================================================================================
    $("#searchBtn").click(function(){
        //搜索返回前端data.arrayName,data.len,data.pos************************************************************************
        var data = {
            data:JSON.stringify({
                'cmd': 'Search',
                'text': $("#searchInput").val()
            })
        };

        $.ajax({
            url: '/',
            async: false,
            type: 'post',
            datatype: 'JSON',
            data: data,
            error:function(){
                alert("Enter Search Fail!");
            },
            success:function(data){
                ArrayName = 'Search';
                IsCategory = false;
                for (var i = 0; i < 7; i++) {
                    $(CIndex[i]).css('left', Css[6]['left']);
                    $(CIndex[i]).css('top', Css[6]['top']);
                    $(CIndex[i]).css('width', Css[6]['width']);
                    $(CIndex[i]).css('height', Css[6]['height']);
                    $(CIndex[i]).css('opacity', Css[6]['opacity']);
                    $(CIndex[i]).css('transform', 'scale(' + Scale_init[6] + ')');
                }

                //初始化内容列表
                for (var i = 0; i < 7; i++) {
                    $(Index[i]).css('left', Css[i]['left']);
                    $(Index[i]).css('top', Css[i]['top']);
                    $(Index[i]).css('width', Css[i]['width']);
                    $(Index[i]).css('height', Css[i]['height']);
                    $(Index[i]).css('opacity', Css[i]['opacity']);
                    $(Index[i]).css('transform', 'scale(' + Scale_init[i] + ')');
                }
                init(ArrayName,data.len,1);
            }
        });
    })
}

    