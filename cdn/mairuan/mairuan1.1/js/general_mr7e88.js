/**************** 下载框 start ******************/ 
    $(function() {

        var cjProtocol = window.location.protocol.split(':')[0];
        if (cjProtocol === 'https') {
            var API = 'https://api2.mairuan.com/api.php';
            cjProtocol = 'https:';
        }else{
            var API = 'http://api2.mairuan.com/api.php';
            cjProtocol = 'http:';
        }

        // 判断是否是下载页
        // if(!/[xiazai|download]\.html/.test(location.pathname)){
        //     return;
        // } 
        var NOWTIME = new Date().Format('yyyy-MM-dd hh:mm');
        var isLog = 0;
        var urlArr = [];

        if(isPhone()){
            $('[xzbox]').text('前往PC端下载');
        }

        if (isIE()) {
            
            var script = document.createElement('script');
            script.type = 'text/javaScript';
            script.src = cjProtocol+'//cdn.mairuan.com/cdn/common/js/bluebird.min.js';console.log(script);
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        // 显示下载框
        $('[xzbox]').on('click', function(event) {
            event.preventDefault();
            if(isPhone()){
                return;
            }

            $('#download_1_0 .content_form').show();
            $('#download_1_0 .content_list').hide();

            // 判断是否登录
            var uid = $('[name="uid"]').val();
            if(uid>0){ //已经是登录状态
                $('#download_1_0 #yzmBox').hide();
            }

            var pgid = $(this).attr('xzbox').split('_');
            $('#download_1_0 [name="pid"]').val(pgid[0]);
            $('#download_1_0 [name="gid"]').val(pgid[1]);

            getDownloadList(pgid[1]).then(function(respro) {

                var isNeedForm = respro[1]==2?true:false;

                if(isNeedForm){ // 需要提交信息
                    $('#download_1_0').fadeIn();
                }                
                else if(!isNeedForm && respro[0]>1){ // 不需要提交信息，且安装包大于一条
                    $('#download_1_0 #list li a.bsc').each(function(index, el) {
                        $(el).attr('href', urlArr[index]).addClass('active');
                    });
                    $('#download_1_0').fadeIn();
                    $('#download_1_0 .content_form').hide();
                    $('#download_1_0 .content_list').fadeIn('fast');
                }
                else if(!isNeedForm && respro[0]==1){ // 不需要提交信息，且安装包等于一条
                    window.location.href = urlArr[0];
                    if($('#download_1_0 .content_qrcode').length>0){
                        $('#download_1_0 .content_form').hide();
                        $('#download_1_0 .content_qrcode').show();
                        $('#download_1_0').fadeIn();
                    }
                }
                else if(respro[0]<=1){ // 没有安装包
                    layer.msg('安装包有误');
                }
            });
        });

        // 隐藏下载框
        $('#download_1_0 .closeDownloadBoxBtn ').click(function(event) {
            $('#download_1_0').fadeOut();
            if($('#download_1_0 .content_xieyi').length>0){
                $('#download_1_0 .content_xieyi').fadeOut();
            }
            if($('#download_1_0 .content_qrcode').length>0){
                $('#download_1_0 .content_qrcode').fadeOut();
            }
            if($('#download_1_0 .content_banner').length>0){
                $('#download_1_0 #couponBanner').fadeIn();
                $('#download_1_0 #getCouponBtn').hide();                            
            }
        });

        // 勾选协议
        $('#download_1_0 .xieyibtn').click(function(event) {
            $(this).toggleClass('active');
            if($(this).hasClass('active')){
                $('#subDownloadInfoBtn').addClass('active');
            }else{
                $('#subDownloadInfoBtn').removeClass('active');
            }
        });

        // 显示协议
        $('#download_1_0 #showXieyiBtn').click(function(event) {
            $('#download_1_0 .content_xieyi').fadeIn('fast');
        });
        // 隐藏协议
        $('#download_1_0 .hideXieyiBtn').click(function(event) {
            $('#download_1_0 .content_xieyi').fadeOut('fast');
        });
        // 显示二维码
        if($('#download_1_0 .content_qrcode').length>0){
            $('#download_1_0').on('click','.urlBtn',function(event) {
                $('#download_1_0 .content_qrcode').fadeIn('fast');
            });
        }
        // 隐藏二维码
        $('#download_1_0 .hideQrcodeBtn').click(function(event) {
            $('#download_1_0 .content_qrcode').fadeOut('fast');
            if($('#download_1_0 .content_list').css('display')=='none'){
                $('#download_1_0').fadeOut();
            }
        });

        // 提交信息
        $('#download_1_0 #subDownloadInfoBtn').on('click', function() {
            event.preventDefault();
            // 判断是否勾选协议
            if(!$(this).hasClass('active')){
                layer.msg('请同意协议');
                return;
            }
            // 获取表单数据
            // var formdata = $('#download_1_0 #form').serializeArray();
            // var param = {};
            // formdata.forEach(function(item,index) {
            //     var name = item['name'];
            //     param[name] = item['value'];
            // });

            var param = {};
            var formObj = $('#download_1_0 #form');
            param['company'] = formObj.find('[name="company"]').val();
            param['contacts'] = formObj.find('[name="contacts"]').val();
            param['user_email'] = formObj.find('[name="user_email"]').val();
            param['user_mobile'] = formObj.find('[name="user_mobile"]').val();
            param['yzm'] = formObj.find('[name="yzm"]').val();
            param['userip'] = formObj.find('[name="userip"]').val();
            param['pid'] = formObj.find('[name="pid"]').val();
            param['gid'] = formObj.find('[name="gid"]').val();
            param['uid'] = formObj.find('[name="uid"]').val();

            if(!param['company'] || !param['user_email'] || !param['contacts'] || !param['user_mobile']){
               layer.msg('请完善信息'); 
               return;
            }

            // 判断是否登录
            var uid = $('[name="uid"]').val();
            var loading = layer.load();  

            if(!uid){ // 未登录状态
                var param1 = {
                    ip: param['userip'],
                    company: param['company'],
                    trueName: param['contacts'],
                    phoneNumber: param['user_mobile'],
                    email: param['user_email'],
                    phoneNumberCode: param['yzm'],
                };

                // 提交表单信息
                funAjax(apihost + '/Web/weblogin',param1).then(function(respro){
                    if(respro.new_login == 1){ // 未登录
                        var auth_token = respro.auth_token;
                        addCookie('auth_token',auth_token);
                        $('[name="uid"]').val(respro.uid);
                        return submitGendan(respro.uid,param);
                    }
                }).then(function(respro) {
                    if(respro == 1){
                        $('#download_1_0 #list li a.bsc').each(function(index, el) {
                            $(el).attr('href', urlArr[index]).addClass('active');
                        });
                        $('#download_1_0 .content_form').hide();
                        $('#download_1_0 .content_list').fadeIn('fast');
                        // 如果需要领优惠券
                        if($('#download_1_0 .content_banner').length>0){
                            $('#download_1_0 #couponBanner').hide();
                            $('#download_1_0 #getCouponBtn').fadeIn();                            
                        }
                    }
                }).catch(function(rej) {
                    if(rej.code!=''&&rej.code>0){
                        layer.msg(rej.message);
                    }
                }).finally(function() {
                    layer.close(loading);
                });
            }else{ // 已经是登录状态
                submitGendan(uid,param).then(function(respro) {
                    if(respro == 1){
                        $('#download_1_0 #list li a.bsc').each(function(index, el) {
                            $(el).attr('href', urlArr[index]).addClass('active');
                        });
                        $('#download_1_0 .content_form').hide();
                        $('#download_1_0 .content_list').fadeIn('fast');
                        // 如果需要领优惠券
                        if($('#download_1_0 .content_banner').length>0){
                            $('#download_1_0 #couponBanner').hide();
                            $('#download_1_0 #getCouponBtn').fadeIn();                            
                        }
                    }
                }).finally(function() {
                    layer.close(loading);
                }); 
            }
        });

        // 点击领取优惠券
        $('#download_1_0 #getCouponBtn').on('click', function(event) {
            event.preventDefault();
            var uid = $('[name="uid"]').val();
            if(!uid){
                layer.close(loading);
                layer.msg('请登录或提交信息')
                return;
            }
            var loading = layer.load(); 
            var couponid = $(this).find('img').attr('couponid');
            funAjax(apihost+'/coupon/memclickgetcoupon',{'couponid':couponid,'auth_token':getCookie('auth_token')}).then(function(respro) {
                if(respro.code!=''&&respro.code==200){
                    $('#download_1_0 #getCouponBtn').hide();
                    $('#download_1_0 #couponSuccess').fadeIn();
                }
            }).catch(function(rej) {
                if(rej.code!=''&&rej.code>0){
                    if(rej.code==487 || rej.code==488){
                        $('#download_1_0 #getCouponBtn').hide();
                        $('#download_1_0 #couponFail').fadeIn();
                    }else{
                        layer.msg(rej.message);
                    }
                }
            }).finally(function() {
                layer.close(loading);
            });
        });

        // 获取下载信息列表
        function getDownloadList(goodsid) {
            return new Promise(function(resolve,reject) {
                funAjax(apihost + '/Download/trialpackagelist',{"goodsid":goodsid}).then(function(res) {
                    var list = res.data.trialpackagelist;
                    var str = '';
                    var num = 0;

                    urlArr.splice(0,urlArr.length);

                    list.forEach(function(item,index) {
                        num++;
                        var name = item['name'];
                        var size = item['size'];
                        // 地址存入数组
                        
                        urlArr.push(item['url']);
                        str += '<li class="df jcsb aic">'+
                                    '<p class="w212"><span class="lh66 overSL db">'+name+'</span></p>'+
                                    '<span class="w119 pl6">'+size+'</span>'+
                                    '<a class="bsc h28 lh28 br3 tac w90 bg_f5 urlBtn">下载</a>'+
                                '</li>';
                    });

                    $('#download_1_0 #list').html(str);
                    return resolve([num,res.data.goods.downloadtype]);
                });                
            });

        }

        // 提交跟单
        function submitGendan(uid,forminfo) {
            var desStr = ['联系人-'+forminfo['contacts'],'电话-'+forminfo['user_mobile'],'邮箱-'+forminfo['user_email'],'公司-'+forminfo['company'],'日期-'+ NOWTIME].join('|');
            var info = {};
            var pid = forminfo['pid'];
            info[pid] = forminfo['gid'];
            var param2 = {
                'sourceid': "2" ,
                'user_id':uid,
                'info':info,
                'ip': forminfo['userip'],
                'des':desStr
            };
            return funAjax(cjProtocol+'//center2.makeding.com/api.php/Gd/addsource','gdinfo='+JSON.stringify(param2));
        }
    });
/**************** 下载框 end ******************/ 

/**************** 直接购买 start ******************/ 
    // 单产品进入newbuy.html 或 弹出申请购买框
    // 搭配进用户中心checkorder
    $(function() {

        var cjProtocol = window.location.protocol.split(':')[0];
        if (cjProtocol === 'https') {
            var API = 'https://api2.mairuan.com/api.php';
            cjProtocol = 'https:';
        }else{
            var API = 'http://api2.mairuan.com/api.php';
            cjProtocol = 'http:';
        }

        var wid = $(window).width();

        $("[lid]").on('click',function(){

            var lidarr = $(this).attr('lid').split('_');

            if(lidarr[1] == 'zydp'){
                // 自由搭配

            }else if(lidarr[1] == 'gddp'){
                // 固定搭配
                buyGudingById(wid,lidarr[0],0,0,1);
            }else if(lidarr[1] == 'shengji'){
                // 升级
                buyShengJiById(wid,lidarr[0],$(this).attr('proid'),$(this).attr('goodsid'));
            }else if(lidarr[1] == 'shengjiv2'){
                // 升级
                buyShengJiByIdv2(lidarr[0]);
            }else if(lidarr[1] == 'scdp'){
                // 素材单品
                buySuCaiDanpinById(wid,lidarr[0],3);
            }else if(lidarr[1] == 'scgddp'){
                // 素材固定搭配
                buyGudingById(wid,lidarr[0],0,0,3);
            }else if(lidarr[1] == 'hhgddp'){
                // 素材+软件 混合固定搭配
                buyHunheGudingById(wid,lidarr[0]);
            }else{
                // 单品
                buyDanpinById(wid,lidarr[0]);
            }

        });

        if($('#applybuy_1_0').length>0){
            // 关闭申请购买弹框
            $('#applybuy_1_0 .closeApplyBuyBoxBtn').click(function(event) {
                $('#applybuy_1_0').fadeOut('fast',function() {
                    $('#applybuy_1_0 .content_form').show();
                    $('#applybuy_1_0 #applysuccess').hide();                    
                });
            });

            // 勾选协议
            $('#applybuy_1_0 .xieyibtn').click(function(event) {
                $(this).toggleClass('active');
                if($(this).hasClass('active')){
                    $('#applybuy_1_0 #subApplyBuyInfoBtn').addClass('active');
                }else{
                    $('#applybuy_1_0 #subApplyBuyInfoBtn').removeClass('active');
                }
            });

            // 显示协议
            $('#applybuy_1_0 #showXieyiBtn').click(function(event) {
                $('#applybuy_1_0 .content_xieyi').fadeIn('fast');
            });

            // 隐藏协议
            $('#applybuy_1_0 .hideXieyiBtn').click(function(event) {
                $('#applybuy_1_0 .content_xieyi').fadeOut('fast');
            });

            // 提交购买申请
            $('#applybuy_1_0 #subApplyBuyInfoBtn').on('click',function(event) {
                
                // 判断是否勾选协议
                if(!$(this).hasClass('active')){
                    layer.msg('请同意协议');
                    return;
                }
                // 获取表单数据
                // var formdata = $('#applybuy_1_0 #form').serializeArray();
                // var param = {};
                // formdata.forEach(function(item,index) {
                //     var name = item['name'];
                //     param[name] = item['value'];
                // });

                var param = {};
                var formObj = $('#applybuy_1_0 #form');
                param['company'] = formObj.find('[name="company"]').val();
                param['contacts'] = formObj.find('[name="contacts"]').val();
                param['user_email'] = formObj.find('[name="user_email"]').val();
                param['user_mobile'] = formObj.find('[name="user_mobile"]').val();
                param['yzm'] = formObj.find('[name="yzm"]').val();
                param['userip'] = formObj.find('[name="userip"]').val();
                param['pid'] = formObj.find('[name="pid"]').val();
                param['gid'] = formObj.find('[name="gid"]').val();
                param['uid'] = formObj.find('[name="uid"]').val();

                if(!param['company'] || !param['user_email'] || !param['contacts'] || !param['user_mobile']){
                   layer.msg('请完善信息'); 
                   return;
                }

                var uid = $('[name="uid"]').val();
                var loading2 = layer.load(); 

                if(!uid){
                    var param1 = {
                        ip: param['userip'],
                        company: param['company'],
                        trueName: param['contacts'],
                        phoneNumber: param['user_mobile'],
                        email: param['user_email'],
                        phoneNumberCode: param['yzm'],
                    };

                    // 提交表单信息
                    funAjax(apihost + '/Web/weblogin',param1).then(function(respro){
                        if(respro.new_login == 1){ // 未登录
                            var auth_token = respro.auth_token;
                            addCookie('auth_token',auth_token);
                            $('[name="uid"]').val(respro.uid);
                            var ibmspss = $('.ibmspss').val();
                            if(ibmspss==1){
                                //console.log("a1");
                                submitGendanIbm(respro.uid,param);
                                $('#applybuy_1_0 .content_form').hide();
                                $('#applybuy_1_0 #applysuccess').fadeIn('fast');
                                layer.close(loading2);
                            }else{
                                return submitGendan(respro.uid,param);
                            }
                        }
                    }).then(function(respro) {
                        if(respro == 1){
                            $('#applybuy_1_0 .content_form').hide();
                            $('#applybuy_1_0 #applysuccess').fadeIn('fast');
                        }
                    }).catch(function(rej) {
                        if(rej.code!=''&&rej.code>0){
                            layer.msg(rej.message);
                        }
                    }).finally(function() {
                        layer.close(loading2);
                    });           
                }else{
                    var ibmspss = $('.ibmspss').val();
                    if(ibmspss==1){
                        //console.log("a2");
                        submitGendanIbm(uid,param);
                        $('#applybuy_1_0 .content_form').hide();
                        $('#applybuy_1_0 #applysuccess').fadeIn('fast');
                        layer.close(loading2);
                    }else{
                        submitGendan(uid,param).then(function(respro) {
                            if(respro == 1){
                                $('#applybuy_1_0 .content_form').hide();
                                $('#applybuy_1_0 #applysuccess').fadeIn('fast');
                            }else{
                                layer.msg('领取失败，请稍后再试');
                            }
                        }).finally(function() {
                            layer.close(loading2);
                        });
                    }                     
                }
            });
        }

        // 单品直接购买
        // wid：判断是否是移动端
        // lid：商品售卖id
        function buyDanpinById(wid,lid,webfrom) {


            // 跳转到后注册流程的购买方式
            // saletype：销售方式：1 在线，2 申请，3 预售
            var loading = layer.load();
            $.ajax({
                url: apihost+'/Web/onlinesimple',
                type: 'post',
                data: {id: lid},
                xhrFields:{ withCredentials:true }
            })
            .done(function(res) {
                if(res.code==200&&res.data){
                    var resdata = res.data;

                    $('#applybuy_1_0 [name="pid"]').val(resdata.online.proid);
                    $('#applybuy_1_0 [name="gid"]').val(resdata.online.goodsidz);

                    if(parseInt(resdata.goods.saletype)==1){ // 跳转到后注册流程的购买方式
                        //if (wid < 768){
                        if (isPhone()){
                            window.location.href = cjProtocol+'//userm.mairuan.com/goumai?lid='+ lid +'&web=1';
                        }else{
                            location.href = '/newbuy.html?onlineid='+lid;
                        }
                        return;              
                    }else if(parseInt(resdata.goods.saletype)==2){ // 申请购买
                        if($('#applybuy_1_0').length>0){
                            funApplyBuy();
                        }
                    }
                }
            })
            .fail(function(err) {
                console.log(err);
            })
            .always(function() {
                layer.close(loading);
            });
            return;
            
            // 进入用户中心checkorder页面的购买方式
            var wd = window.open("");

            var loading = layer.load();

            var datas = {webfrom:webfrom||1,id:lid,num:1,dpid:0,dpid_type:0};
           
            $.ajax({
                url: apihost+'/Order/cheeckkey',
                data: datas,
                method: 'post',
                xhrFields: {withCredentials: true}
            }).done(function(res){
                layer.close(loading);
                if(res.code==200){
                    getUserInfo(function(data1){
                        if (wid >= 768) {
                            wd.location = uchost+'/ordercheck/'+res.data.checkkey;
                        }else{
                            location.href = uchost+'/ordercheck/'+res.data.checkkey;
                        }
                    },function(data2){
                        if(SITE_ALIAS=='vsp'){ //hshy
                            if (wid >= 768) {
                                wd.location = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }else{
                                location.href = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }
                        }else{
                            if (wid >= 768) {
                                wd.location = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }else{
                                location.href = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }
                        }
                    });
                }else{
                    wd.close();
                    layer.msg(res.message,{time:1000,shift:-1});
                    return;
                }
            }).fail(function(err){
                    layer.close(loading);
                    // console.log(err);
            });        
        }  

        // 单独素材直接购买
        // wid：判断是否是移动端
        // lid：商品售卖id
        function buySuCaiDanpinById(wid,lid,webfrom) {
            //if (wid < 768) {
            if(isPhone()){
                window.location.href = cjProtocol+'//userm.mairuan.com/goumai?lid='+ lid +'&web=1';
                return;
            }
            
            // 进入用户中心checkorder页面的购买方式
            var wd = window.open("");

            var loading = layer.load();

            var datas = {webfrom:webfrom||1,id:lid,num:1,dpid:0,dpid_type:0};
           
            $.ajax({
                url: apihost+'/Order/cheeckkey',
                data: datas,
                method: 'post',
                xhrFields: {withCredentials: true}
            }).done(function(res){
                layer.close(loading);
                if(res.code==200){
                    getUserInfo(function(data1){
                        if (wid >= 768) {
                            wd.location = uchost+'/ordercheck/'+res.data.checkkey;
                        }else{
                            location.href = uchost+'/ordercheck/'+res.data.checkkey;
                        }
                    },function(data2){
                        if(SITE_ALIAS=='vsp'){ //hshy
                            if (wid >= 768) {
                                wd.location = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }else{
                                location.href = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }
                        }else{
                            if (wid >= 768) {
                                wd.location = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }else{
                                location.href = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                            }
                        }
                    });
                }else{
                    wd.close();
                    layer.msg(res.message,{time:1000,shift:-1});
                    return;
                }
            }).fail(function(err){
                    layer.close(loading);
                    // console.log(err);
            });        
        } 

        // 升级购买
        // wid：判断是否是移动端
        // lid：产品售卖id
        // gid : 商品售卖id
        function buyShengJiById(wid,lid,proid,goodsid) {
            //if (wid < 768) {
            if (isPhone()){
                return;
            }
            var loading = layer.load();

            getUserInfo(function(data) {

                if(data.mobile || data.email){

                    // 手机、邮箱都存在
                    var params = {
                        'proid' : proid,
                        'email' : data['email'],
                        'mobile' : data['mobile'],
                        'goodsid' : goodsid || 0
                    }

                    isBuyShengjiGoods(params,function() {
                        $.ajax({
                            url: apihost+'/Order/cheeckkey',
                            method: 'post',
                            data: {webfrom:1, id:lid, num:1, dpid:0, dpid_type:0},
                            xhrFields: {withCredentials: true}
                        })
                        .done(function(data1) {
                            if(data1.code==200){
                                location.href = uchost+'/ordercheck/'+data1.data.checkkey;
                            }else{
                                layer.msg(data1.message,{time:1000,shift:-1});
                            }
                        })
                        .fail(function(err) {
                            console.log(err);
                        })
                        .always(function() {
                            layer.close(loading);
                        });                    
                    },function() {
                        layer.close(loading);
                        // layer.msg('尊敬的'+data.nickname+', 升级仅针对老用户',{time:2000},function(){
                        //     location.href = uchost+'/personal';
                        // });
                        layer.confirm('<i class="layui-icon layui-icon-tips"></i><span class="ce8">未检测到您的购买信息</span><br>请核实您是否使用当前的手机号码与电子邮箱进行过购买。',{
                            title: '升级购买身份核实信息',
                            btn: ['更新手机/邮箱','取消'] //按钮
                        }, function(){
                            location.href = uchost+'/personal';
                        }, function(){
                            //
                        });                 
                    })

                }else{
                    // 手机、邮箱都有不存在的
                    layer.close(loading);
                    location.href = uchost+'/personal/safe';
                }
            },function(err) {
                layer.close(loading);
                location.href = uchost+'/login?rediurl='+location.href;
            });       
        }

        // 升级购买v2
        // wid：判断是否是移动端
        // lid：产品售卖id
        function buyShengJiByIdv2(lid) {
            if (isPhone()){
                return;
            }
            location.href = '/shengji.html?lid='+lid;
            // var loading = layer.load();
            // getUserInfo(function(data) {
            //     location.href = '/shengji.html?lid='+lid;
            // },function(err) {
            //     layer.close(loading);
            //     location.href = uchost+'/login?rediurl='+location.protocol+'//'+location.host+'/shengji.html?lid='+lid;
            // });       
        }  

        // 搭配直接购买
        // wid：判断是否是移动端
        // lid：商品售卖id
        // did：自由搭配的时候,已选商品或素材的id，其他情况为 0
        // type：自由搭配的时候,已选商品或素材的类型（0：软件，1：素材）
        function buyGudingById(wid,lid,did,type,webfrom) {
            if (wid >= 768) {
                var wd = window.open("");
            }

            var loading = layer.load();
            var webfrom = webfrom || 1;
            var id = lid;
            var dpid = did || 0;
            var dpid_type = type || 0;
            var num = 1;
            var datas = {webfrom:webfrom,id:id,num:num,dpid:dpid,dpid_type:dpid_type};
           
            $.ajax({
                url: apihost+'/Order/cheeckkey',
                data: datas,
                method: 'post',
                xhrFields: {withCredentials: true}
            }).done(function(res){
                layer.close(loading);
                if(res.code==200){
                    getUserInfo(function(islog){
                        if (wid >= 768) {
                            wd.location = uchost+'/ordercheck/'+res.data.checkkey;
                        }else{
                            location.href = uchost+'/ordercheck/'+res.data.checkkey;
                        }
                        
                    },function(islog){
                        if (wid >= 768) {
                            wd.location = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;                        
                        }else{
                            location.href = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                        }
                    });
                }else{
                    wd.close();
                    layer.msg(res.message,{time:1000,shift:-1});
                    return;
                }
            }).fail(function(err){
                    layer.close(loading);
                    // console.log(err);
            });        
        }   

        // 搭配直接购买
        // wid：判断是否是移动端
        // lid：商品售卖id
        // did：自由搭配的时候,已选商品或素材的id，其他情况为 0
        // type：自由搭配的时候,已选商品或素材的类型（0：软件，1：素材）
        function buyHunheGudingById(wid,lid) {
            if (wid >= 768) {
                var wd = window.open("");
            }

            var loading = layer.load();
            
            var datas = {webfrom:1,num:1,relsid:lid};
          
            $.ajax({
                url: apihost+'/Order/cheeckkey',
                data: datas,
                method: 'post',
                xhrFields: {withCredentials: true}
            }).done(function(res){ 
                layer.close(loading); console.log(res);
                if(res.code==200){
                    getUserInfo(function(islog){
                        if (wid >= 768) {
                            wd.location = uchost+'/ordercheck/'+res.data.checkkey;
                        }else{
                            location.href = uchost+'/ordercheck/'+res.data.checkkey;
                        }
                        
                    },function(islog){
                        if (wid >= 768) {
                            wd.location = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;                        
                        }else{
                            location.href = uchost+'/login?rediurl=/ordercheck/'+res.data.checkkey;
                        }
                    });
                }else{
                    layer.msg(res.message,{time:1000,shift:-1});
                    return;
                }
            }).fail(function(err){
                    layer.close(loading);
                    // console.log(err);
            });        
        }   

        // 判断是否登录
        function getUserInfo(done1,done2){

            $.ajax({

                type: 'get',

                url: apihost + '/Checklogin/index',

                xhrFields:{

                    withCredentials: true

                },

                success: function(res){

                    if(res.code==200){

                        done1 != undefined && done1(res.data);

                    }else{

                        done2 != undefined && done2(res);

                    }

                },

                error:function(err){

                    console.log(err)

                }

            });

        }

        // 判断是否是购买升级产品
        function isBuyShengjiGoods(params,done1,done2) {
            $.ajax({
                type: 'get',
                url: cjProtocol+'//center2.makeding.com/api.php/Index/check_upgrades',
                data: {
                    'proid' : params['proid'],
                    'email' : params['email'],
                    'mobile' : params['mobile'],
                    'goodsid' : params['goodsid'] || 0
                },
                xhrFields:{
                    withCredentials: true
                },
                success: function(res){
                    if(parseInt(res) == 1){
                        done1();
                    }else{
                        done2();
                    }
                },

                error:function(err){

                    console.log(err)

                }

            });
        }

        // 显示申请购买框
        function funApplyBuy(){
            // 判断是否登录
            var uid = $('[name="uid"]').val();
            if(uid>0){ //已经是登录状态
                $('#applybuy_1_0 #yzmBox').hide();
            }
            $('#applybuy_1_0').fadeIn('fast');
        }

        // 提交跟单
        function submitGendan(uid,forminfo) {
            var desStr = ['联系人-'+forminfo['contacts'],'电话-'+forminfo['user_mobile'],'邮箱-'+forminfo['user_email'],'公司-'+forminfo['company'],'日期-'+ new Date().Format('yyyy-MM-dd hh:mm')].join('|');
            var info = {};
            var pid = forminfo['pid'];
            info[pid] = forminfo['gid'];
            var param2 = {
                'sourceid': "9" , // 1未付款订单2试用下载9申请购买
                'user_id':uid,
                'info':info,
                'ip': forminfo['userip'],
                'des':desStr
            };
            return funAjax(cjProtocol+'//center2.makeding.com/api.php/Gd/addsource','gdinfo='+JSON.stringify(param2));
        }

        // 提交跟单
        function submitGendanIbm(uid,forminfo) {
            //proid - goodsid
            var progoodsids = new Array();
            $(".sels-checkbox").each(function(){
                var selschecked = $(this).prop('checked');;
                if(selschecked==true){
                    var ibmproid = $(this).closest('div').find('.proid').text();
                    var ibmgoodsid = $(this).closest('div').find('.goodsid').text();
                    progoodsids.push(ibmproid+','+ibmgoodsid);
                }
            });
            //console.log('console.log(progoodsids);');
            //console.log(progoodsids);
            //progoodsids
            $.each(progoodsids, function(key, val){
                var vals_arr = val.split(',');
                var desStr = ['联系人-'+forminfo['contacts'],'电话-'+forminfo['user_mobile'],'邮箱-'+forminfo['user_email'],'公司-'+forminfo['company'],'日期-'+ new Date().Format('yyyy-MM-dd hh:mm')].join('|');
                var info = {};
                info[vals_arr[0]] = vals_arr[1];
                var param2 = {
                    'sourceid': "9" , // 1未付款订单2试用下载9申请购买
                    'user_id':uid,
                    'info':info,
                    'ip': forminfo['userip'],
                    'des':desStr
                };
                funAjax(cjProtocol+'//center2.makeding.com/api.php/Gd/addsource','gdinfo='+JSON.stringify(param2));
            });
            return 1;
        }

    });
/**************** 直接购买 end ******************/ 

/**************** 竞价咨询 start ******************/
$(function(){

    var cjProtocol = window.location.protocol.split(':')[0];
    if (cjProtocol === 'https') {
        var API = 'https://api2.mairuan.com/api.php';
        cjProtocol = 'https:';
    }else{
        var API = 'http://api2.mairuan.com/api.php';
        cjProtocol = 'http:';
    }

    var NOWTIME = new Date().Format('yyyy-MM-dd hh:mm');

    // 提交信息
    $('#reserve_1_0 #subReserveInfoBtn').on('click', function() {
        event.preventDefault();

        var param = {};
        var formObj = $('#reserve_1_0 #form');
        param['company'] = formObj.find('[name="company"]').val();
        param['contacts'] = formObj.find('[name="contacts"]').val();
        param['user_email'] = formObj.find('[name="user_email"]').val();
        param['user_mobile'] = formObj.find('[name="user_mobile"]').val();
        param['yzm'] = formObj.find('[name="yzm"]').val();
        param['userip'] = formObj.find('[name="userip"]').val();
        param['pid'] = formObj.find('[name="pid"]').val();
        param['gid'] = formObj.find('[name="gid"]').val();
        param['uid'] = formObj.find('[name="uid"]').val();

        if(!param['company'] || !param['user_email'] || !param['contacts'] || !param['user_mobile']){
           layer.msg('请完善信息'); 
           return;
        }

        // 判断是否登录
        var uid = $('[name="uid"]').val();
        var loading = layer.load();  

        if(!uid){ // 未登录状态
            var param1 = {
                ip: param['userip'],
                company: param['company'],
                trueName: param['contacts'],
                phoneNumber: param['user_mobile'],
                email: param['user_email'],
                phoneNumberCode: param['yzm'],
            };

            // 提交表单信息
            funAjax(apihost + '/Web/weblogin',param1).then(function(respro){
                if(respro.new_login == 1){ // 未登录
                    var auth_token = respro.auth_token;
                    addCookie('auth_token',auth_token);
                    $('[name="uid"]').val(respro.uid);
                    return submitGendan(respro.uid,param);
                }
            }).then(function(respro) {
                if(respro == 1){
                    $('#reserve_1_0 #list li a.bsc').each(function(index, el) {
                        $(el).attr('href', urlArr[index]).addClass('active');
                    });
                    // $('#reserve_1_0 .content_form').hide();
                    // $('#reserve_1_0 .content_list').fadeIn('fast');
                    layer.msg('信息提交成功'); 
                    formObj.find('[name="company"]').val("");
                    formObj.find('[name="contacts"]').val("");
                    formObj.find('[name="user_email"]').val("");
                    formObj.find('[name="user_mobile"]').val("");
                    formObj.find('[name="yzm"]').val("");
                }
            }).catch(function(rej) {
                if(rej.code!=''&&rej.code>0){
                    layer.msg(rej.message);
                }
            }).finally(function() {
                layer.close(loading);
            });
        }else{ // 已经是登录状态
            submitGendan(uid,param).then(function(respro) {
                if(respro == 1){
                    $('#reserve_1_0 #list li a.bsc').each(function(index, el) {
                        $(el).attr('href', urlArr[index]).addClass('active');
                    });
                    $('#reserve_1_0 .content_form').hide();
                    $('#reserve_1_0 .content_list').fadeIn('fast');
                }
            }).finally(function() {
                layer.close(loading);
            }); 
        }
    });

    // 提交跟单
    function submitGendan(uid,forminfo) {
        var desStr = ['联系人-'+forminfo['contacts'],'电话-'+forminfo['user_mobile'],'邮箱-'+forminfo['user_email'],'公司-'+forminfo['company'],'日期-'+ NOWTIME].join('|');
        var info = {};
        var pid = forminfo['pid'];
        info[pid] = forminfo['gid'];
        var param2 = {
            'sourceid': "10", // 1未付款订单2试用下载9申请购买10竞价咨询
            'user_id':uid,
            'info':info,
            'ip': forminfo['userip'],
            'des':desStr
        };
        return funAjax(cjProtocol+'//center2.makeding.com/api.php/Gd/addsource','gdinfo='+JSON.stringify(param2));
    }
});
/**************** 竞价咨询 end ******************/ 

/*** 领取优惠码 start ***/ 
$(function(){
    $("#youhuima,.youhuima_extend").click(function(){
        $(".youhuima_bg").removeClass("layui-hide");
    });
    $(".youhuima_bg").click(function(){
        $(this).addClass("layui-hide");
    });
    $(".youhuima_bg .close").click(function(){
        $('.youhuima_bg').addClass("layui-hide");
    });
    $(".youhuima_dialog").click(function(){
        window.event? window.event.cancelBubble = true : e.stopPropagation();      
    });
    $("#copyPromoCode").click(function(e){
        var text = document.getElementById('promoCode');
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
            alert('复制成功');
        }
        document.execCommand('Copy');
        window.event? window.event.cancelBubble = true : e.stopPropagation();                
    });
});
/*** 领取优惠码 end ***/