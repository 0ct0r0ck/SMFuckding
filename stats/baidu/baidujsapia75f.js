//var _hmt = _hmt || [];
$(function() {
    //baidu-jsapi-start
    $("a,button,input,label,li").on('click',function(){
        var baidujsapi = $(this).attr('baidujsapi');
        if(typeof(baidujsapi)!='undefined'){
            var svals = baidujsapi.split('_');
            var type = svals[0];
            switch(type){
                case 'event':
                    //category：要监控的目标的类型名称，通常是同一组目标的名字，比如"视频"、"音乐"、"软件"、"游戏"等等。该项必填，不填、填"-"的事件会被抛弃。
                    var category = svals[1];
                    //action：用户跟目标交互的行为，如"播放"、"暂停"、"下载"等等。该项必填，不填、填"-"的事件会被抛弃。
                    var action = svals[2];
                    //opt_label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项选填，不填、填"-"代表此项为空。
                    var opt_label = svals[3];
                    //opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。
                    var opt_value = svals[4];
                    //push
                    _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
                    break;
                case 'pageview':
                    //pageURL：指定要统计PV的页面URL。此项必选。
                    var pageURL = svals[1];
                    //push
                    _hmt.push(['_trackPageview', pageURL]);
                    //URL必须是以"/"（斜杠）开头的相对路径
                    //由于使用_trackPageview跟踪的页面无法作为其他页面的上游页面，因此在页面转化目标功能中不能将AJAX页面作为入口页或中间页，但可以作为目标页。
                    break;
            }
        } 
    });
    //baidu-jsapi-end

    //search-start
    var pathname = window.location.pathname;
    if(pathname.lastIndexOf('/biaoqian',0)===0 || pathname.lastIndexOf('/tag',0)===0){
        var pathnames = pathname.split('/');
        //var keywords = pathnames[2];
        //_hmt.push(['_trackPageview', pathname]);
        _hmt.push(['_trackEvent', 'search', pathnames[1], pathname]);
    }
    //search-end

});