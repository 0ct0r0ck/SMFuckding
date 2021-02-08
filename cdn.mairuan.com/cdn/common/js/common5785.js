//扩展设置
layui.config({
    base:'//cdn.mairuan.com/cdn/layui_extend/' //扩展目录
});

/*加载layui模块*/
layui.use(['layer', 'form', 'cycle'], function() {
    var lay_form = layui.form;
    /*----------表单验证 begin ----------*/
    lay_form.verify({
        required: function(value, item) { //[重写源生required]
            value = $.trim(value);
            if (!new RegExp("[\\S]+").test(value)) {
                return $(item).attr('verify-title') + '不能为空！';
            }
        },
        checked: function(value, item) { //必选
            if (!$(item).prop('checked')) {
                return '必选项不能为空！';
            }
        },
        phone: function(value, item) { //[重写源生phone]
            value = $.trim(value);
            if (new RegExp("[\\S]+").test(value) && !new RegExp('^1\\d{10}$').test(value)) {
                return $(item).attr('verify-title') + '格式错误！';
            }
        },
        email: function(value, item) { //[重写源生email]
            value = $.trim(value);
            if (new RegExp("[\\S]+").test(value) && !new RegExp('^[a-zA-Z0-9_\\-\\.]+@([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,5}$').test(value)) {
                return $(item).attr('verify-title') + '格式错误！';
            }
        },
        number_len: function(value, item) { //value：表单的值、item：表单的DOM对象
            value = $.trim(value);
            var len = $(item).attr('verify-len');
            var lenMsg = '';
            var default_max = '';
            if (!len) {
                len = '2';
                default_max = ',', lenMsg = '以上';
            } else if (len.indexOf(",") > -1 && !new RegExp(",[\\d]+").test(len)) {
                len = len.replace(',', '');
                default_max = ',';
                lenMsg = '以上';
            }
            var regStr = '^[0-9]{' + len + default_max + '}$';
            if (new RegExp("[\\S]+").test(value) && !new RegExp(regStr).test(value)) {
                return $(item).attr('verify-title') + '必须' + len.replace(',', '到') + '位' + lenMsg + '数字！';
            }
        },
        word_len: function(value, item) {
            value = $.trim(value);
            var len = $(item).attr('verify-len');
            var lenMsg = '';
            var default_max = '';
            if (!len) {
                len = '2';
                default_max = ',', lenMsg = '以上';
            } else if (len.indexOf(",") > -1 && !new RegExp(",[\\d]+").test(len)) {
                len = len.replace(',', '');
                default_max = ',';
                lenMsg = '以上';
            }
            var regStr = '^[\\w]{' + len + default_max + '}';
            if (new RegExp("[\\S]+").test(value) && !new RegExp(regStr).test(value)) {
                return $(item).attr('verify-title') + '必须' + len.replace(',', '到') + '位' + lenMsg + '字母和数字！';
            }
        },
        str_len: function(value, item) {
            value = $.trim(value);
            var len = $(item).attr('verify-len');
            var lenMsg = '';
            var default_max = '';
            if (!len) {
                len = '2';
                default_max = ',', lenMsg = '以上';
            } else if (len.indexOf(",") > -1 && !new RegExp(",[\\d]+").test(len)) {
                len = len.replace(',', '');
                default_max = ',';
                lenMsg = '以上';
            }
            var regStr = '^[\\S]{' + len + default_max + '}';
            if (new RegExp("[\\S]+").test(value) && !new RegExp(regStr).test(value)) {
                return $(item).attr('verify-title') + '必须' + len.replace(',', '到') + '位' + lenMsg + '字符！';
            }
        },
        notNumber: function(value, item) {
            value = $.trim(value);
            if (new RegExp("[\\S]+").test(value) && !new RegExp('[\\D]+').test(value)) {
                return $(item).attr('verify-title') + '不能是数字';
            }
        },
        notEmail: function(value, item) {
            value = $.trim(value);
            if (new RegExp("[\\S]+").test(value) && new RegExp('^[a-zA-Z0-9_\\-\\.]+@([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,5}$').test(value)) {
                return $(item).attr('verify-title') + '不能是邮箱';
            }
        }
    });
    /*----------表单验证 end ----------*/

    $(function() {
        var wd = $(window).width();

        /***************cycle2 begin***************/
        $('.cycle2').cycle({
            log: false,
        });

        if (wd > 767) {
            $('.cycle2PC').cycle({
                log: false,
            });
        }

        /************自定义  pager联动 cycle2************/
        $('[bindCycle2] > *').click(function() {
            var cycle2Box = $(this).parent().attr('bindCycle2');
            $('.cycle2[bindCycle2Filter="' + cycle2Box + '"]').cycle('goto', $(this).index());
        });
        $('[bindCycle2PC] > *').click(function() {
            var cycle2PCBox = $(this).parent().attr('bindCycle2PC');
            $('.cycle2PC[bindCycle2PCFilter="' + cycle2PCBox + '"]').cycle('goto', $(this).index());
        });
        /************自定义  cycle2联动 pager************/
        $('.cycle2').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
            var pagerBox = $(this).attr('cycle2Bind');
            if (pagerBox) {
                var index = optionHash.nextSlide;
                var pagerBoxes = pagerBox.split(',');
                for (var i = 0; i < pagerBoxes.length; i++) {
                    $('[cycle2BindFilter="' + pagerBoxes[i] + '"] > *').eq(index).addClass('active').siblings().removeClass('active');
                }
            }
        });
        $('.cycle2PC').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
            var pagerPCBox = $(this).attr('cycle2PCBind');
            if (pagerPCBox) {
                var index = optionHash.nextSlide;
                var pagerPCBoxes = pagerPCBox.split(',');
                for (var i = 0; i < pagerPCBoxes.length; i++) {
                    $('[cycle2PCBindFilter="' + pagerPCBoxes[i] + '"] > *').eq(index).addClass('active').siblings().removeClass('active');
                }
            }
        });
        /***************cycle2 end***************/
    });
});


$(function() {

    var cjProtocol = window.location.protocol.split(':')[0];
    if (cjProtocol === 'https') {
        var API = 'https://api2.mairuan.com/api.php';
    }else{
        var API = 'http://api2.mairuan.com/api.php';
    }

    var wd = $(window).width();
    var user_agent = navigator.userAgent.toLowerCase(); // detect the user agent
    var ios_devices = user_agent.match(/(iphone|ipod|ipad)/)  ? "touchstart" : "click"; //check if the devices are ios devices

    if(ios_devices == 'touchstart'){
        FastClick.attach(document.body);
    }

    /*********刷新验证码 begin*********/
    $('body').on('click', '.yzm, #yzm', function() {
        $(this).attr('src', 'yzm.php?t=' + Math.random());
    });
    /*********刷新验证码 end*********/

    /*********站点地图 begin*********/
    $('.openSitemap').click(function() {
        var id = $(this).attr('title');
        $('#' + id).fadeToggle();
        if ($(this).html() == '点击关闭') {
            $(this).html('点击展开');
        } else {
            $(this).html('点击关闭');
        }
    });
    /*********站点地图 end*********/

    // /*********客服 begin*********/
    // $('.openKefu').click(function() {
    //     easemobim.bind({configId: 'c3732d6b-edcf-4c32-9832-22a01cdb7c60'});
    // });
    // /*********客服 end*********/

    /*********销量计数 begin*********/
    $(".saleNumC2").each(function() {
        var ele = $(this);
        var baseNum = ele.attr('baseNum');
        var topNum = ele.attr('topNum');
        var baseGoods = ele.attr('baseGoods');
        var type = ele.attr('type');
        if (!baseGoods) { baseGoods = ''; }
        if (!baseNum) { baseNum = 0; }
        $.post(API+"/web/getsalesnum", { id: baseGoods }, function(d) {
            if (type == 'jian') {
                var sy = parseInt(baseNum) - parseInt(d.data.salesnum);
                sy = sy < 1 ? 1 : sy;
            } else {
                var sy = parseInt(d.data.salesnum) - parseInt(baseNum);
                sy = sy < 0 ? 0 : sy;
                if (topNum) {
                    topNum = parseInt(topNum);
                    sy = sy > topNum ? topNum - 1 : sy;
                }
            }
            ele.html(sy);
        });
    });
    /*********销量计数 end*********/

    /*********销量计数 begin*********/
    $(".saleNumC3").each(function() {
        var ele = $(this);
        var baseNum = ele.attr('baseNum');
        var topNum = ele.attr('topNum');
        var baseGoods = ele.attr('baseGoods');
        var type = ele.attr('type');
        if (!baseGoods) { baseGoods = ''; }
        if (!baseNum) { baseNum = 0; }
        $.post(API+"/sucai/getsalesnum", { id: baseGoods }, function(d) {
            if (type == 'jian') {
                var sy = parseInt(baseNum) - parseInt(d.data.salesnum);// 
                sy = sy < 1 ? 1 : sy;
            } else {
                var sy = parseInt(d.data.salesnum) - parseInt(baseNum); // sa 188 
                sy = sy < 0 ? 0 : sy;
                if (topNum) {
                    topNum = parseInt(topNum);
                    sy = sy > topNum ? topNum - 1 : sy;
                }
            }
            ele.html(sy);
        });
    });
    /*********销量计数 end*********/

    /*********倒计时 begin*********/
    layui.use(['util'], function() {
        $(".countdown").each(function() {
            var ele = $(this);
            var type = ele.attr('type');
            var webFrom = ele.attr('from');
            var endTime = new Date(ele.attr('endTime').replace(/-/g, '/')).getTime();
            $.ajax({
                complete: function (XMLHttpRequest, textStatus) {
                    var serverTime = new Date(XMLHttpRequest.getResponseHeader("Date")).getTime();
                    layui.util.countdown(endTime, serverTime, function(date, serverTime, timer) {
                        if(webFrom && webFrom == "mairuan"){
                            for (var i = 0; i < date.length; i++) {
                                date[i] = layui.util.digit(date[i], 2);
                            }
                            // 麦软
                            if(type == 'clock'){
                                if(date[1] == date[2] && date[2] == date[3] && date[3] == 0){
                                    window.location.reload();
                                }else{
                                    var str = '<span>'+date[1].slice(0,1)+'</span><span>'+ date[1].slice(1) +'</span>:<span>'+date[2].slice(0,1)+'</span><span>'+ date[2].slice(1) +'</span>:<span>'+date[3].slice(0,1)+'</span><span>'+date[3].slice(1)+'</span>';
                                }
                            }else if(type == 'color'){
                                if(date[1] == date[2] && date[2] == date[3] && date[3] == 0){
                                    window.location.reload();
                                }else{
                                    var str = '<span>'+date[0]+'</span>天<span>'+date[1]+'</span>时<span>'+date[2]+'</span>分<span>'+date[3]+'</span>秒';
                                }
                            }else if(type == 'hour'){
                                if(date[1] == date[2] && date[2] == date[3] && date[3] == 0){
                                    window.location.reload();
                                }else{
                                    var str = '<span>'+date[0].slice(0,1)+'</span><span>'+ date[0].slice(1) +'</span>天<span>'+date[1].slice(0,1)+'</span><span>'+ date[1].slice(1) +'</span>时<span>'+date[2].slice(0,1)+'</span><span>'+ date[2].slice(1) +'</span>分<span>'+date[3].slice(0,1)+'</span><span>'+date[3].slice(1)+'</span>秒';
                                }
                            }else if(type == 'hour2'){
                                if(date[1] == date[2] && date[2] == date[3] && date[3] == 0){
                                    window.location.reload();
                                }else{
                                    var str = '<label><span>'+date[0].slice(0,1)+'</span><span>'+ date[0].slice(1) +'</span>天</label><label><span>'+date[1].slice(0,1)+'</span><span>'+ date[1].slice(1) +'</span>时</label><label><span>'+date[2].slice(0,1)+'</span><span>'+ date[2].slice(1) +'</span>分</label><label><span>'+date[3].slice(0,1)+'</span><span>'+date[3].slice(1)+'</span>秒</label>';
                                }
                            }
                        }else{
                            // 倒计时为0 => 隐藏倒计时元素
                            if( date[0] == date[1] && date[1] == date[2] && date[2] == date[3] && date[3] == 0 ){
                                $(".countdown").parents("[time_over_hidden]").addClass("layui-hide");
                            }
                            // 产品站
                            if (type == 'day') {
                                var str = date[0] + 1;
                            } else {
                                for (var i = 0; i < date.length; i++) {
                                    date[i] = layui.util.digit(date[i], 2);
                                }
                                if(type == 'hour' && date[0] == '00'){
                                    var str = date[1] + '时' + date[2] + '分' + date[3] + '秒';
                                }else if(type == 'ab_hour'){
                                    var str = date[1] + '时' + date[2] + '分' + date[3] + '秒';
                                }else if(type == 'color'){
                                    var str = '<span>'+date[0]+'</span>天<span>'+date[1]+'</span>时<span>'+date[2]+'</span>分<span>'+date[3]+'</span>秒';
                                }else if(type == 'clock'){
                                    var str = '<span>'+date[1].slice(0,1)+'</span><span>'+ date[1].slice(1) +'</span>:<span>'+date[2].slice(0,1)+'</span><span>'+ date[2].slice(1) +'</span>:<span>'+date[3].slice(0,1)+'</span><span>'+date[3].slice(1)+'</span>';
                                }else if(type == 'hour2'){
                                    var str = '<span>'+date[1]+'</span>时<span>'+date[2]+'</span>分<span>'+date[3]+'</span>秒';
                                }else if(type == 'timeOutUpdate'){
                                    if(date[0] == 0 && date[1] == 0 && date[2] == 0 && date[3] == 0){
                                        window.location.reload();
                                    }else{
                                        var str = '<label><span>'+date[0]+'</span>天</label><label><span>'+date[1]+'</span>时</label><label><span>'+date[2]+'</span>分</label><label><span>'+date[3]+'</span>秒</label>';
                                    }
                                }else{
                                    var str = date[0] + '天' + date[1] + '时' + date[2] + '分' + date[3] + '秒';
                                }
                            }
                        }
                        ele.html(str);
                    });
                }
            });
        });
    });
    /*********倒计时 end*********/

    /*********placeholder IE9及以下提示 begin*********/
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var version = (navigator.appVersion).split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0") {
            $('[placeholder]').each(function(i) {
                $(this).val($(this).attr('placeholder')).addClass('c7');
            });
            $('[placeholder]').focus(function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('').removeClass('c7');
                }
            });
            $('[placeholder]').blur(function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val($(this).attr('placeholder')).addClass('c7');
                } else {
                    $(this).removeClass('c7');
                }
            });
        }
    }
    /*********placeholder IE9及以下提示 end*********/

    /**********hoverShow / noHoverHide begin**********/
    if (wd > 767) {
        $('[hoverShowPC]').hover(function() {
            var element = $(this).attr('hoverShowBind');
            if (!element) {
                $(this).addClass('hoverActive').find('.layui-hide').each(function(i, dom) {
                    $(dom).addClass($(dom).attr('animated'));
                });
            } else {
                $('[hoverShowBindFilter="' + element + '"]').removeClass('layui-hide');
            }
            var toggle = $(this).attr('hoverShowToggleBind');
            if (toggle) {
                $('[hoverShowToggleFilter="' + toggle + '"]').addClass('layui-hide');
            }
        });
        $('[noHoverHidePC]').hover(function() {}, function() {
            var element = $(this).attr('noHoverHideBind');
            if (!element) {
                $(this).removeClass('hoverActive');
                $(this).not('[hoverShowPC]').addClass('layui-hide');
            } else {
                $('[noHoverHideBindFilter="' + element + '"]').addClass('layui-hide');
            }
            var toggle = $(this).attr('hoverShowToggleBind');
            if (toggle) {
                $('[hoverShowToggleFilter="' + toggle + '"]').removeClass('layui-hide');
            }
        });
    }

    $('[hoverShow]').hover(function() {
        var element = $(this).attr('hoverShowBind');
        if (!element) {
            $(this).addClass('hoverActive').find('.layui-hide').each(function(i, dom) {
                $(dom).addClass($(dom).attr('animated'));
            });
        } else {
            $('[hoverShowBindFilter="' + element + '"]').removeClass('layui-hide');
        }
        var toggle = $(this).attr('hoverShowToggleBind');
        if (toggle) {
            $('[hoverShowToggleFilter="' + toggle + '"]').addClass('layui-hide');
        }
    });
    $('[noHoverHide]').hover(function() {}, function() {
        var element = $(this).attr('noHoverHideBind');
        if (!element) {
            $(this).removeClass('hoverActive');
            $(this).not('[hoverShow]').addClass('layui-hide');
        } else {
            $('[noHoverHideBindFilter="' + element + '"]').addClass('layui-hide');
        }
        var toggle = $(this).attr('hoverShowToggleBind');
        if (toggle) {
            $('[hoverShowToggleFilter="' + toggle + '"]').removeClass('layui-hide');
        }
    });
    /**********hoverShow / noHoverHide end**********/

    /**********hoverHide / noHoverShow begin**********/
    $('[hoverHide]').hover(function() {
        $(this).removeClass('hoverActive')
    });
    $('[noHoverShow]').hover(function() {}, function() {
        $(this).addClass('hoverActive');
    });
    /**********hoverShow / noHoverHide end**********/

    /**********imgToggle begin**********/
    $('[imgSrcToggle]').hover(function() {
        var hoverImg = $(this).attr('hoverImg');
        $(this).attr('src', hoverImg);
    },function(){
        var noHoverImg = $(this).attr('noHoverImg');
        $(this).attr('src', noHoverImg);
    });
    /**********imgToggle end**********/

    /**********clickShow begin**********/
    $('[clickShow]').click(function() {
        var element = $(this).attr('clickShowBind');
        var animated = $(this).attr('animated');
        $(this).addClass('active');
        if (element) {
            $('[clickShowBindFilter="' + element + '"]').removeClass('layui-hide').addClass(animated);
        }
    });
    /**********clickShow end**********/

    /**********clickToggle begin**********/
    $('[clickToggle]').click(function() {
        var element = $(this).attr('clickToggleBind');
        var animated = $(this).attr('animated');
        $(this).toggleClass('active');
        if (element) {
            $('[clickToggleBindFilter="' + element + '"]').toggleClass('layui-hide').addClass(animated);
        }
    });
    /**********clickToggle end**********/

    /**********clickHide begin**********/
    $('[clickHide]').click(function() {
        var element = $(this).attr('clickHideBind');
        if (element) {
            $('[clickHideBindFilter="' + element + '"]').addClass('layui-hide');
        }
    });
    /**********clickHide end**********/

    /**********tabShow begin**********/
    $('[tabShow] > *').not($('[noTab]')).bind(ios_devices, function() {
        var element = $(this).parent().attr('tabShowBind');
        var animated = $(this).parent().attr('animated');
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        if (element) {
            $('[tabShowBindFilter="' + element + '"]').each(function(){
                $(this).children().eq(index).removeClass('layui-hide').addClass(animated).siblings().addClass('layui-hide');
            });
        }
    });
    /**********tabShow end**********/

    /**********tabShowHover hover begin**********/
    $('[tabShowHover] > *').not($('[noTab]')).hover(function() {
        var element = $(this).parent().attr('tabShowHoverBind');
        var animated = $(this).parent().attr('animated');
        $(this).addClass('hoverActive').siblings().removeClass('hoverActive');
        var index = $(this).index();
        if (element) {
            $('[tabShowHoverBindFilter="' + element + '"]').each(function(){
                $(this).children().eq(index).removeClass('layui-hide').addClass(animated).siblings().addClass('layui-hide');
            });
        }
    });
    /**********tabShow hover end**********/

    /********** tab切换 start *************/
    $("*[tabname^='pro_menu_s']").click(function(){

        $(this).addClass("active").siblings().removeClass('active');

        var index = $(this).index() + 1;

        $("*[tabbox^='pro_show_box']").hide().addClass('layui-hide');

        $("*[tabbox='pro_show_box"+index+"']").show().removeClass('layui-hide');

    });
    /********** tab end *************/
});



function addCookie(objName, objValue, objHours) { //添加cookie
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) { //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str + ";path=/";
}

function delCookie(name) { //删除cookie
    document.cookie = name + "=;expires=" + (new Date(0)).toGMTString() + ";path=/";
}

function getCookie(objName) { //获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName)
            return unescape(temp[1]);
    }
}


function countSecond(ele, time, txt) {
    ele.prop('disabled', true).addClass('layui-btn-disabled');
    t = setInterval(function() {
        if (time <= 0) {
            clearInterval(t);
            ele.removeProp('disabled').html(txt).removeClass('layui-btn-disabled');
            return;
        }
        ele.html(txt + '(' + time + 's)');
        --time;
    }, 1000);
}


function CheckData(dom, strTitle, strInput, strType, blNeed) { //js正则判断
    switch (strType) {
        case "pname":
            var pattern = /^.{2,200}$/;
            var msg = strTitle + "必须2位以上字符！";
            break;
        case "email":
            var pattern = /^[a-zA-Z0-9_\-\.]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,5}$/;
            var msg = strTitle + "格式错误！";
            break;
        case "phone":
            var pattern = /^1\d{10}$/;
            var msg = strTitle + "格式错误！";
            break;
    }

    strInput = strInput.replace(/(^\s*)|(\s*$)/g, "");
    if ((strInput == "") && blNeed) {
        layui.layer.tips(strTitle + "不能为空！", dom, { tips: 1 });
        return false;
    }

    if (strInput != "") {
        var result = strInput.match(pattern);
        if (result == null) {
            layui.layer.tips(msg, dom, { tips: 1 });
            return false;
        }
    }
    return true;
}

function checkType(strInput, strType) { //输入内容类型
    var flag = false;

    switch (strType) {
        case "company":
            var pattern = /[厂|公司|集团]+/;
            break;
    }

    if (strInput != "") {
        var result = strInput.match(pattern);
        if (result != null) {
            flag = true;
        }
    }
    return flag;
}


function searchUrl(id) {
    var reg = /^(\s*)$/g;
    if (reg.test(document.getElementById(id).value)){
        var res = '\'\'';
        layer.tips('搜索内容不能为空', '#'+ id, {time:1000});
    }
    else{
        res = document.getElementById(id).value;
        window.location.href = '//' + location.hostname + '/biaoqian/' + res;
    }
    console.log('//' + location.hostname + '/biaoqian/' + res);
}

/*20200819*/
//keydown
//keypress
$('#searchValueId').keypress(function (event) {
    if (event.keyCode == 13) {
        $(this).closest('div').find('.searchButtom').triggerHandler('click');
    }
});
$('#searchValueMenu').keypress(function (event) {
    if (event.keyCode == 13) {
        $(this).closest('div').find('.searchButtom').triggerHandler('click');
    }
});
$('#searchSupport').keypress(function (event) {
    if (event.keyCode == 13) {
        $(this).closest('div').find('#searchSupportBtn').triggerHandler('click');
    }
});

/*播放视频弹窗*/
function modalVideo(videoUrl, width, height) {

    //console.log('videoUrl:'+videoUrl);

    window.open (videoUrl);
    
    // if (!width) { width = '800px'; }
    // if (!height) { height = '600px'; }
    // var w = $(window).width();
    // if(w <=767){
    //     width = '90%';
    //     height = ($(window).height() - 40) + 'px';
    // }
    // layui.layer.open({
    //     type: 2,
    //     title: false,
    //     area: [width, height],
    //     shade: 0.8,
    //     closeBtn: 1,
    //     shadeClose: false,
    //     content: videoUrl,
    // });
}

/*自定弹窗*/
function modalAjax(url, goodsid, width, height) {
    if (!width) { width = '800px'; }
    if (!height) { height = '530px'; }
    var w = $(window).width();
    if (w <= 767) {
        width = '90%';
        height = ($(window).height() - 40) + 'px';
    }
    layui.layer.open({
        type: 2,
        content: url + '?goodsid=' + goodsid,
        area: [width, height],
        title: false,
    });
}

/* 图片弹窗 */
function modelPic(url , width , height){
    if (!width) { width = '800px'; }
    if (!height) { height = '530px'; }
    var w = $(window).width();
    if (w <= 767) {
        width = '90%';
        height = ($(window).height() - 40) + 'px';
    }
    layer.open({
        type: 1,
        title: false,
        closeBtn: 1,
        shadeClose: true,
        area: [width + 'px', height + 'px'], //宽高
        content: "<img src=" + url + " />"
     });
}

// 判断是不是移动端
function isPhone() {
    if(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)){
        return true;
    }else{
        return false;
    }
}

// 判断是不是IE
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}

// ajax
function funAjax(url,param){
    return new Promise(function(resolve,reject){
        $.ajax({
            url: url,
            type: 'POST',
            data: param,
            xhrFields: {
                withCredentials:true
            },
            success: function(res){
                if(res.code == 200 || res == 1){
                    resolve(res);
                }else{
                    reject(res);
                }
            },
            error: function(err){
                reject(err);
            }
        });
    });
}

// 时间格式化
Date.prototype.Format = function(fmt){   
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt; 
}   

$(function() {
    var flag = false;

    if($('#download_1_0 .content_form #form').length>0){
        $('#download_1_0 .content_form #form').append('<div id="captcha"></div>'); 
        flag = true;      
    }
    if($('#applybuy_1_0 .content_form #form').length>0){
        $('#applybuy_1_0 .content_form #form').append('<div id="captcha"></div>');  
        flag = true;
    }
    if($('#downloadboxbd #infoForm').length>0){
        $('#downloadboxbd #infoForm').append('<div id="captcha"></div>');  
        flag = true;
    }
    if($('#reserve_1_0 .content_form #form').length>0){
        $('#reserve_1_0 .content_form #form').append('<div id="captcha"></div>');  
        flag = true;
    }

    if($('.chemoffice_getcode').length>0 || $('.chemoffice_getcode_mobile').length>0 || $('.gongyi_getcode').length>0 || $('.gongyi_getcode_mobile').length>0){
        flag = true;
    }
    
    if(flag){
        var captchaIns;
        var captchaId = '536ea9bea3aa45cc90b230c0aa594f90';
        initNECaptcha({
            element: '#captcha',
            captchaId: captchaId,
            mode: 'bind',
            onVerify: function(err){
                // todo
                if(!err){
                    yzmmobilesends(captchaIns.phoneNumber);
                    captchaIns && captchaIns.refresh();
                }
            }
        }, function(instance){
            captchaIns = instance
        }, function(err){
            //err
            console.log(err);
        });

        //发送验证码
        $("#yzmBtn,.yzmBtn_web").click(function() {
            if($(this).hasClass("gc_chemoffice_yzmBtn")){
                var mobile = $('#gc_mobile').val();
            }else{
                var mobile = $('[name="user_mobile"]').val();
            }
            if(!(/(1[1-9]\d{9}$)/.test(mobile))){
                layer.msg('请输入正确的联系电话！');
                return;
            }
            captchaIns && captchaIns.verify();// 手动调用verify方法
            captchaIns.phoneNumber = mobile;
        });

    }

    function yzmmobilesends(phoneNumber){
        var loading = layer.load();
        //var phoneNumber = $('[name="user_mobile"]').val();
        var reg = /(1[1-9]\d{9}$)/;
        // if(!(/(1[1-9]\d{9}$)/.test(phoneNumber))){
        //     layer.msg('请输入正确的联系电话！');
        //     return;
        // }

        // captchaIns && captchaIns.verify(); // 手动调用verify方法
        var NECaptchaValidate = $("#captcha").find("input[name='NECaptchaValidate']").val();
        var datas = {mobile:phoneNumber,captchaId:captchaId,NECaptchaValidate:NECaptchaValidate};
        $.ajax({
            url: apihost+'/Yzm/mobilesends',
            method: 'post',
            data: datas,
            xhrFields: {withCredentials: true},
            success: function(data){
                layer.close(loading);
                if(data.code==200){
                    $("#yzmBtn,.yzmBtn_web").hide();

                    if(isPhone()){
                        $("#yzm_daojishi").html("59s");
                    }else{
                        $("#yzm_daojishi").html("59s重新获取");
                        $(".gc_chemoffice_yzm_daojishi").html("59s重新获取");
                    }
                    
                    $("#yzm_daojishi").show();
                    $(".gc_chemoffice_yzm_daojishi").show();
                    var count = 58;
                    var myCountDown = self.setInterval(function(){

                        if(isPhone()){
                            $("#yzm_daojishi").html(count +"s");
                        }else{
                            $("#yzm_daojishi").html(count +"s重新获取");
                            $(".gc_chemoffice_yzm_daojishi").html(count +"s重新获取");
                        }
                        
                        if(count==0){
                            clearInterval(myCountDown);
                            count = 58;
                            $("#yzm_daojishi").hide();
                            $(".gc_chemoffice_yzm_daojishi").hide();

                            if(isPhone()){
                                $("#yzmBtn,.yzmBtn_web").html("获取");
                            }else{
                                $("#yzmBtn,.yzmBtn_web").html("重新获取");
                            }

                            $("#yzmBtn,.yzmBtn_web").show();
                        }
                        count--;
                    },1000);
                }else{
                    layer.msg(data.message,{time:1000,shift:-1});
                    return;
                }
            },
            error: function(err){ 
                layer.close(loading);
                console.log(err);
            } 
        })
    }

});