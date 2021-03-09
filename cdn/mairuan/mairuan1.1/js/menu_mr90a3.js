$(function() {

    var cjProtocol = window.location.protocol.split(':')[0];
    if (cjProtocol === 'https') {
        var API = 'https://api2.mairuan.com/api.php';
        cjProtocol = 'https:';
    }else{
        var API = 'http://api2.mairuan.com/api.php';
        cjProtocol = 'http:';
    }
    var regphone = /^[1][1-9][0-9]{9}$/;
    var regemail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    /*
    *  SITE_ALIAS:
    *  {
    *   'sales":[触发方式,ID触发的DOM ID, ID出发的script, 链接出发的地址],
    *   'cservice":[触发方式,ID触发的DOM ID, ID出发的script, 链接出发的地址],
    *   }
    *  触发方式：1-ID出发 , 2-链接出发
    */ 
    var QIYEQQ =
    {
        'CorelDRAW':
        {
        'sales':[1,'im_qd_sales_cdgs', '<script id="qd28521566900567af0d605aa5efd0fd7e6440b887b0" src="https://wp.qiye.qq.com/qidian/2852156690/0567af0d605aa5efd0fd7e6440b887b0" charset="utf-8" async defer></script>', 'http://q.url.cn/ABeHQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_cdgs', '<script id="qd28521566903280dcceb534961163f43a39f02113a0" src="https://wp.qiye.qq.com/qidian/2852156690/3280dcceb534961163f43a39f02113a0" charset="utf-8" async defer></script>', ''],
        },
        'vsp':
        {
        'sales':[1,'im_qd_sales_hshy', '<script id="qd2852156690ea355bdbf91af32be596d29cc2be860a" src="https://wp.qiye.qq.com/qidian/2852156690/ea355bdbf91af32be596d29cc2be860a" charset="utf-8" async defer></script>', 'http://q.url.cn/CDpZPl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_hshy', '<script id="qd2852156690c28437ced74fb7db7453d3a09996164a" src="https://wp.qiye.qq.com/qidian/2852156690/c28437ced74fb7db7453d3a09996164a" charset="utf-8" async defer></script>', ''],
        },
        'BarTender':
        {
        'sales':[1,'im_qd_sales_bartender', '<script id="qd285215669089da1023fddbd266964ef3095826620e" src="https://wp.qiye.qq.com/qidian/2852156690/89da1023fddbd266964ef3095826620e" charset="utf-8" async defer></script>', 'http://q.url.cn/ABlHQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_bartender', '<script id="qd2852156690c12cf142a507cdfe105d157313ef2b9b" src="https://wp.qiye.qq.com/qidian/2852156690/c12cf142a507cdfe105d157313ef2b9b" charset="utf-8" async defer></script>', ''],
        },
        'MindManager':
        {
        'sales':[1,'im_qd_sales_mindmanager', '<script id="qd2852156690ffac7869638f5b689a2ec42aa62e53b0" src="https://wp.qiye.qq.com/qidian/2852156690/ffac7869638f5b689a2ec42aa62e53b0" charset="utf-8" async defer></script>', 'http://q.url.cn/ABhHQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_mindmanager', '<script id="qd28521566907780e37cc8607137fc632ba46d49cdac" src="https://wp.qiye.qq.com/qidian/2852156690/7780e37cc8607137fc632ba46d49cdac" charset="utf-8" async defer></script>', ''],
        },
        'yuanchengxiezuo':
        {
        'sales':[1,'im_qd_sales_teamviewer', '<script id="qd28521566900ae347c6fde480fa8a5310910b6ca3db" src="https://wp.qiye.qq.com/qidian/2852156690/0ae347c6fde480fa8a5310910b6ca3db" charset="utf-8" async defer></script>', 'http://q.url.cn/CDbZPl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_teamviewer', '<script id="qd2852156690ca650fe38e698d9c3781f4257f36e1d4" src="https://wp.qiye.qq.com/qidian/2852156690/ca650fe38e698d9c3781f4257f36e1d4" charset="utf-8" async defer></script>', ''],
        },
        'ABBYY':
        {
        'sales':[1,'im_qd_sales_abbyy', '<script id="qd28521566904ddc80e768c0433e47c794b218c0905f" src="https://wp.qiye.qq.com/qidian/2852156690/4ddc80e768c0433e47c794b218c0905f" charset="utf-8" async defer></script>', 'http://q.url.cn/CDGnPl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_abbyy', '<script id="qd2852156690e1d80754b0cbe8e0fdc844ef0db65dc7" src="https://wp.qiye.qq.com/qidian/2852156690/e1d80754b0cbe8e0fdc844ef0db65dc7" charset="utf-8" async defer></script>', ''],
        },
        'zbrushcn':
        {
        'sales':[1,'im_qd_sales_zbrush', '<script id="qd2852156690cbd8abd0719785ce9bf27b0fc106f390" src="https://wp.qiye.qq.com/qidian/2852156690/cbd8abd0719785ce9bf27b0fc106f390" charset="utf-8" async defer></script>', 'http://q.url.cn/abwhtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_zbrush', '<script id="qd2852156690ad8f94c625b42384e62aff09f693b14e" src="https://wp.qiye.qq.com/qidian/2852156690/ad8f94c625b42384e62aff09f693b14e" charset="utf-8" async defer></script>', ''],
        },
        'flstudiochina':
        {
        'sales':[1,'im_qd_sales_fl', '<script id="qd28521566902cd099e704d97219bb6d179c7ab7f05f" src="https://wp.qiye.qq.com/qidian/2852156690/2cd099e704d97219bb6d179c7ab7f05f" charset="utf-8" async defer></script>', 'http://q.url.cn/cdEoul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_fl', '<script id="qd28521566909fd1660b6228686d04c779d124b1b59a" src="https://wp.qiye.qq.com/qidian/2852156690/9fd1660b6228686d04c779d124b1b59a" charset="utf-8" async defer></script>', ''],
        },
        'EDIUS':
        {
        'sales':[1,'im_qd_sales_edius', '<script id="qd2852156690774d3fdc31919dba533b78fff8d87e7f" src="https://wp.qiye.qq.com/qidian/2852156690/774d3fdc31919dba533b78fff8d87e7f" charset="utf-8" async defer></script>', 'http://q.url.cn/abphtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_edius', '<script id="qd28521566905c89fb63cbe2279c94a397fb79480289" src="https://wp.qiye.qq.com/qidian/2852156690/5c89fb63cbe2279c94a397fb79480289" charset="utf-8" async defer></script>', ''],
        },
        'chemdraw':
        {
        'sales':[1,'im_qd_sales_chemdraw', '<script id="qd2852156690277c70fda46fd0c5c063b250d9990104" src="https://wp.qiye.qq.com/qidian/2852156690/277c70fda46fd0c5c063b250d9990104" charset="utf-8" async defer></script>', 'http://q.url.cn/cdfoul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_chemdraw', '<script id="qd2852156690c2a484ca01671aaf63f149d2a33db174" src="https://wp.qiye.qq.com/qidian/2852156690/c2a484ca01671aaf63f149d2a33db174" charset="utf-8" async defer></script>', ''],
        },
        'bingdianhuanyuan':
        {
        'sales':[1,'im_qd_sales_bingdianhuanyuan', '<script id="qd285215669051d174efd8cdb0fc8d53f76d2384a52c" src="https://wp.qiye.qq.com/qidian/2852156690/51d174efd8cdb0fc8d53f76d2384a52c" charset="utf-8" async defer></script>', 'http://q.url.cn/abhhtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_bingdianhuanyuan', '<script id="qd285215669089c9fc96c00738a83f3635ce9c061d31" src="https://wp.qiye.qq.com/qidian/2852156690/89c9fc96c00738a83f3635ce9c061d31" charset="utf-8" async defer></script>', ''],
        },
        'Vegas':
        {
        'sales':[1,'im_qd_sales_vegas', '<script id="qd28521566900707fa01647af0b26cec1f075dacd214" src="https://wp.qiye.qq.com/qidian/2852156690/0707fa01647af0b26cec1f075dacd214" charset="utf-8" async defer></script>', 'http://q.url.cn/ABEUQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_vegas', '<script id="qd28521566905a543bcb41941211448657484630ed36" src="https://wp.qiye.qq.com/qidian/2852156690/5a543bcb41941211448657484630ed36" charset="utf-8" async defer></script>', ''],
        },
        'imindmap':
        {
        'sales':[1,'im_qd_sales_imindmap', '<script id="qd28521566900d58783a358ced684ed00c681667f371" src="https://wp.qiye.qq.com/qidian/2852156690/0d58783a358ced684ed00c681667f371" charset="utf-8" async defer></script>', 'http://q.url.cn/abWhtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_imindmap', '<script id="qd285215669074f57d6cd2524d872aa061f039c4f2f1" src="https://wp.qiye.qq.com/qidian/2852156690/74f57d6cd2524d872aa061f039c4f2f1" charset="utf-8" async defer></script>', ''],
        },
        'ntfs':
        {
        'sales':[1,'im_qd_sales_pntfs', '<script id="qd2852156690561cad87b94da887d2bb066b1185b8e5" src="https://wp.qiye.qq.com/qidian/2852156690/561cad87b94da887d2bb066b1185b8e5" charset="utf-8" async defer></script>', 'http://q.url.cn/abbhtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_pntfs', '<script id="qd2852156690aa266c773dea39850a8088eb16c8b8fc" src="https://wp.qiye.qq.com/qidian/2852156690/aa266c773dea39850a8088eb16c8b8fc" charset="utf-8" async defer></script>', ''],
        },
        'mathtype':
        {
        'sales':[1,'im_qd_sales_mathtype', '<script id="qd285215669030da1492326ef2f154ff21a717c1c87a" src="https://wp.qiye.qq.com/qidian/2852156690/30da1492326ef2f154ff21a717c1c87a" charset="utf-8" async defer></script>', 'http://q.url.cn/cdQoul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_mathtype', '<script id="qd28521566900d33f86cac2a50285e887811f379a34e" src="https://wp.qiye.qq.com/qidian/2852156690/0d33f86cac2a50285e887811f379a34e" charset="utf-8" async defer></script>', ''],
        },
        'zhzzx':
        {
        'sales':[1,'im_qd_sales_zhzzx', '<script id="qd28521566907ea4ec1f22527e9e569093fca5a2c284" src="https://wp.qiye.qq.com/qidian/2852156690/7ea4ec1f22527e9e569093fca5a2c284" charset="utf-8" async defer></script>', 'http://q.url.cn/ABkUQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_zhzzx', '<script id="qd2852156690b21ec0ec3fe09f31446028438c652bbf" src="https://wp.qiye.qq.com/qidian/2852156690/b21ec0ec3fe09f31446028438c652bbf" charset="utf-8" async defer></script>', ''],
        },
        'jihehuaban':
        {
        'sales':[1,'im_qd_sales_jihehuaban', '<script id="qd28521566905fae412e0d823ff2781f52cf3ef755d6" src="https://wp.qiye.qq.com/qidian/2852156690/5fae412e0d823ff2781f52cf3ef755d6" charset="utf-8" async defer></script>', 'http://q.url.cn/ABsUQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_jihehuaban', '<script id="qd2852156690a474506ba23c7bc80162dcbb2e78298a" src="https://wp.qiye.qq.com/qidian/2852156690/a474506ba23c7bc80162dcbb2e78298a" charset="utf-8" async defer></script>', ''],
        },
        'CODESOFT':
        {
        'sales':[1,'im_qd_sales_codesoft', '<script id="qd28521566904fd49de6fb5c1a8168a6121ad45c9f33" src="https://wp.qiye.qq.com/qidian/2852156690/4fd49de6fb5c1a8168a6121ad45c9f33" charset="utf-8" async defer></script>', 'http://q.url.cn/abVqtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_codesoft', '<script id="qd285215669037149914cb3ea2ce07d30b3f8edf065e" src="https://wp.qiye.qq.com/qidian/2852156690/37149914cb3ea2ce07d30b3f8edf065e" charset="utf-8" async defer></script>', ''],
        },
        'Guitar':
        {
        'sales':[1,'im_qd_sales_guitarpro', '<script id="qd2852156690c3d7828b04c03f3dea153505059404b6" src="https://wp.qiye.qq.com/qidian/2852156690/c3d7828b04c03f3dea153505059404b6" charset="utf-8" async defer></script>', 'http://q.url.cn/abcqtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_guitarpro', '<script id="qd285215669053644d2b94fe5de19fbd5198360bff94" src="https://wp.qiye.qq.com/qidian/2852156690/53644d2b94fe5de19fbd5198360bff94" charset="utf-8" async defer></script>', ''],
        },
        'easyrecoverychina':
        {
        'sales':[1,'im_qd_sales_easyrecovery', '<script id="qd285215669036f66d21e5135354d9c9d0c5256d6985" src="https://wp.qiye.qq.com/qidian/2852156690/36f66d21e5135354d9c9d0c5256d6985" charset="utf-8" async defer></script>', 'http://q.url.cn/CD1vPl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_easyrecovery', '<script id="qd2852156690d34ad1516496361a4bdc284eae4cf7d1" src="https://wp.qiye.qq.com/qidian/2852156690/d34ad1516496361a4bdc284eae4cf7d1" charset="utf-8" async defer></script>', ''],
        },
        'mindmapper':
        {
        'sales':[1,'im_qd_sales_mindmapper', '<script id="qd28521566909cdb8eefdc7300d61009b93e1787e992" src="https://wp.qiye.qq.com/qidian/2852156690/9cdb8eefdc7300d61009b93e1787e992" charset="utf-8" async defer></script>', 'http://q.url.cn/ABpUQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_mindmapper', '<script id="qd2852156690a13124c415bbf799e893ef42c7d0f99b" src="https://wp.qiye.qq.com/qidian/2852156690/a13124c415bbf799e893ef42c7d0f99b" charset="utf-8" async defer></script>', ''],
        },
        'xshellcn':
        {
        'sales':[1,'im_qd_sales_xmanager', '<script id="qd2852156690713a5e40f8bec0202f8af729248f9f12" src="https://wp.qiye.qq.com/qidian/2852156690/713a5e40f8bec0202f8af729248f9f12" charset="utf-8" async defer></script>', 'http://q.url.cn/ABtUQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_xmanager', '<script id="qd28521566901a684209ec0056936fcd5694895769db" src="https://wp.qiye.qq.com/qidian/2852156690/1a684209ec0056936fcd5694895769db" charset="utf-8" async defer></script>', ''],
        },
        'formysql':
        {
        'sales':[1,'im_qd_sales_navicat', '<script id="qd2852156690f4259a4c34f12e2792d4abdc54059c2d" src="https://wp.qiye.qq.com/qidian/2852156690/f4259a4c34f12e2792d4abdc54059c2d" charset="utf-8" async defer></script>', 'http://q.url.cn/cdmeul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_navicat', '<script id="qd2852156690efd4307fdeab030795855e8d8af8b296" src="https://wp.qiye.qq.com/qidian/2852156690/efd4307fdeab030795855e8d8af8b296" charset="utf-8" async defer></script>', ''],
        },
        'Tuxera NTFS':
        {
        'sales':[1,'im_qd_sales_tuxerantfs', '<script id="qd2852156690c4dba17a10f320a45db500a054e2e2c6" src="https://wp.qiye.qq.com/qidian/2852156690/c4dba17a10f320a45db500a054e2e2c6" charset="utf-8" async defer></script>', 'http://q.url.cn/ab1qtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_tuxerantfs', '<script id="qd28521566903a95c196cb2c21eab5bc3632422e6041" src="https://wp.qiye.qq.com/qidian/2852156690/3a95c196cb2c21eab5bc3632422e6041" charset="utf-8" async defer></script>', ''],
        },
        'mycleanmymac':
        {
        'sales':[1,'im_qd_sales_cmm', '<script id="qd28521566907f095e7cdfe7ec43894684ce922d8f6a" src="https://wp.qiye.qq.com/qidian/2852156690/7f095e7cdfe7ec43894684ce922d8f6a" charset="utf-8" async defer></script>', 'http://q.url.cn/cdyeul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_cmm', '<script id="qd2852156690c53aefd98f4d4ad0fb5d3e71740fbfae" src="https://wp.qiye.qq.com/qidian/2852156690/c53aefd98f4d4ad0fb5d3e71740fbfae" charset="utf-8" async defer></script>', ''],
        },
        'keyshot':
        {
        'sales':[1,'im_qd_sales_keyshot', '<script id="qd2852156690536d97a3029dd4dc1c26cbc6a41f3fce" src="https://wp.qiye.qq.com/qidian/2852156690/536d97a3029dd4dc1c26cbc6a41f3fce" charset="utf-8" async defer></script>', 'http://q.url.cn/CDbnPl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_keyshot', '<script id="qd28521566908dc75115bba05a4b723c7dfc72f98b72" src="https://wp.qiye.qq.com/qidian/2852156690/8dc75115bba05a4b723c7dfc72f98b72" charset="utf-8" async defer></script>', ''],
        },
        'beyondcompare':
        {
        'sales':[1,'im_qd_sales_beyondcompare', '<script id="qd285215669002ed17476c7ef2d8702286b517e10eee" src="https://wp.qiye.qq.com/qidian/2852156690/02ed17476c7ef2d8702286b517e10eee" charset="utf-8" async defer></script>', 'http://q.url.cn/ABhUQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_beyondcompare', '<script id="qd2852156690c4c7b4d73610eb2e4f82bc0f9316eafd" src="https://wp.qiye.qq.com/qidian/2852156690/c4c7b4d73610eb2e4f82bc0f9316eafd" charset="utf-8" async defer></script>', ''],
        },
        'overturechina':
        {
        'sales':[1,'im_qd_sales_overture', '<script id="qd2852156690cb6b715d0cf0d4f32e8e6a88e543bf53" src="https://wp.qiye.qq.com/qidian/2852156690/cb6b715d0cf0d4f32e8e6a88e543bf53" charset="utf-8" async defer></script>', 'http://q.url.cn/cdYeul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_overture', '<script id="qd2852156690b4108a9767cfdf3a283667285306c3c4" src="https://wp.qiye.qq.com/qidian/2852156690/b4108a9767cfdf3a283667285306c3c4" charset="utf-8" async defer></script>', ''],
        },
        'earmaster':
        {
        'sales':[1,'im_qd_sales_earmaster', '<script id="qd2852156690f646dd763df64300a54987dde42e7eed" src="https://wp.qiye.qq.com/qidian/2852156690/f646dd763df64300a54987dde42e7eed" charset="utf-8" async defer></script>', 'http://q.url.cn/ABGMQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_earmaster', '<script id="qd2852156690548c6a12f5c929b6819da7c932ec441b" src="https://wp.qiye.qq.com/qidian/2852156690/548c6a12f5c929b6819da7c932ec441b" charset="utf-8" async defer></script>', ''],
        },
        'kingdeecn':
        {
        'sales':[1,'im_qd_sales_kingdee', '<script id="qd285215669060cad720ea6b62d7873fe6a3839eb04e" src="https://wp.qiye.qq.com/qidian/2852156690/60cad720ea6b62d7873fe6a3839eb04e" charset="utf-8" async defer></script>', 'http://q.url.cn/abUqtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_kingdee', '<script id="qd28521566907abc600de4fc10058e37a53619a8a5eb" src="https://wp.qiye.qq.com/qidian/2852156690/7abc600de4fc10058e37a53619a8a5eb" charset="utf-8" async defer></script>', ''],
        },
        'PhotoZoom':
        {
        'sales':[1,'im_qd_sales_photozoom', '<script id="qd2852156690b8c35d09a94b279b5c97b09cc6672e6d" src="https://wp.qiye.qq.com/qidian/2852156690/b8c35d09a94b279b5c97b09cc6672e6d" charset="utf-8" async defer></script>', 'http://q.url.cn/cdjeul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_photozoom', '<script id="qd2852156690a4816236486f155cd39787227346e99b" src="https://wp.qiye.qq.com/qidian/2852156690/a4816236486f155cd39787227346e99b" charset="utf-8" async defer></script>', ''],
        },
        'BetterZip':
        {
        'sales':[1,'im_qd_sales_betterzip', '<script id="qd2852156690304f35ea7bf82434cf8659f4ae2f499e" src="https://wp.qiye.qq.com/qidian/2852156690/304f35ea7bf82434cf8659f4ae2f499e" charset="utf-8" async defer></script>', 'http://q.url.cn/abtqtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_betterzip', '<script id="qd2852156690d37f1b52306911bcc80e8e78d553adf4" src="https://wp.qiye.qq.com/qidian/2852156690/d37f1b52306911bcc80e8e78d553adf4" charset="utf-8" async defer></script>', ''],
        },
        'dongmansoft':
        {
        'sales':[1,'im_qd_sales_youdongman', '<script id="qd2852156690bbc347e586f8ca828848003bb8f2fd3e" src="https://wp.qiye.qq.com/qidian/2852156690/bbc347e586f8ca828848003bb8f2fd3e" charset="utf-8" async defer></script>', 'http://q.url.cn/CDYjPl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_youdongman', '<script id="qd28521566903ebabd5444db73f7b1265692ce22e2fb" src="https://wp.qiye.qq.com/qidian/2852156690/3ebabd5444db73f7b1265692ce22e2fb" charset="utf-8" async defer></script>', ''],
        },
        'CrossOver':
        {
        'sales':[1,'im_qd_sales_crossover', '<script id="qd285215669075563960ff3528735564ee9b4262465a" src="https://wp.qiye.qq.com/qidian/2852156690/75563960ff3528735564ee9b4262465a" charset="utf-8" async defer></script>', 'http://q.url.cn/ab7qtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_crossover', '<script id="qd28521566901dd3dad88b5f982b3abd39892875a70d" src="https://wp.qiye.qq.com/qidian/2852156690/1dd3dad88b5f982b3abd39892875a70d" charset="utf-8" async defer></script>', ''],
        },
        'nicelabel':
        {
        'sales':[1,'im_qd_sales_nicelabel', '<script id="qd2852156690cd2297423613c4331020b3dbb0169a20" src="https://wp.qiye.qq.com/qidian/2852156690/cd2297423613c4331020b3dbb0169a20" charset="utf-8" async defer></script>', 'http://q.url.cn/AB8MQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_nicelabel', '<script id="qd2852156690055285bda484e605c1e317250067a7e7" src="https://wp.qiye.qq.com/qidian/2852156690/055285bda484e605c1e317250067a7e7" charset="utf-8" async defer></script>', ''],
        },
        'logoshejishi':
        {
        'sales':[1,'im_qd_sales_logoshejishi', '<script id="qd28521566906b079d922879ad2728ef8b2a65a2bfef" src="https://wp.qiye.qq.com/qidian/2852156690/6b079d922879ad2728ef8b2a65a2bfef" charset="utf-8" async defer></script>', 'http://q.url.cn/CD6jPl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_logoshejishi', '<script id="qd2852156690b970a860a105215d621fc71c7b8390e1" src="https://wp.qiye.qq.com/qidian/2852156690/b970a860a105215d621fc71c7b8390e1" charset="utf-8" async defer></script>', ''],
        },
        '3DSMax':
        {
        'sales':[1,'im_qd_sales_xy3dsmax', '<script id="qd285215669054af44ca39d97a2bbfdb90daf9cfe91e" src="https://wp.qiye.qq.com/qidian/2852156690/54af44ca39d97a2bbfdb90daf9cfe91e" charset="utf-8" async defer></script>', 'http://q.url.cn/abDWtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_xy3dsmax', '<script id="qd2852156690228b60a06a99c09a55b5cf01503f9c8a" src="https://wp.qiye.qq.com/qidian/2852156690/228b60a06a99c09a55b5cf01503f9c8a" charset="utf-8" async defer></script>', ''],
        },
        'pdfexpert':
        {
        'sales':[1,'im_qd_sales_pdfexpert', '<script id="qd28521566904863eed47ac1ba3704df72640c8b3830" src="https://wp.qiye.qq.com/qidian/2852156690/4863eed47ac1ba3704df72640c8b3830" charset="utf-8" async defer></script>', 'http://q.url.cn/abVWtl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_pdfexpert', '<script id="qd28521566902a785296fb97ea6adccbe298afab3dfa" src="https://wp.qiye.qq.com/qidian/2852156690/2a785296fb97ea6adccbe298afab3dfa" charset="utf-8" async defer></script>', ''],
        },
        'shankejingling':
        {
        'sales':[1,'im_qd_sales_shankejingling', '<script id="qd28521566907046ea16710ea578229097270030e269" src="https://wp.qiye.qq.com/qidian/2852156690/7046ea16710ea578229097270030e269" charset="utf-8" async defer></script>', 'http://q.url.cn/cdzeul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_shankejingling', '<script id="qd28521566901f362e36afb9854e0c09faf6952cdf44" src="https://wp.qiye.qq.com/qidian/2852156690/1f362e36afb9854e0c09faf6952cdf44" charset="utf-8" async defer></script>', ''],
        },
        'hypersnap':
        {
        'sales':[1,'im_qd_sales_hypersnap', '<script id="qd2852156690ba42a863e908a29791d974da7e25f10b" src="https://wp.qiye.qq.com/qidian/2852156690/ba42a863e908a29791d974da7e25f10b" charset="utf-8" async defer></script>', 'http://q.url.cn/cdbeul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_hypersnap', '<script id="qd2852156690d7e625afbe39363038693a5a56f36ea2" src="https://wp.qiye.qq.com/qidian/2852156690/d7e625afbe39363038693a5a56f36ea2" charset="utf-8" async defer></script>', ''],
        },
        'iconworkshop':
        {
        'sales':[1,'im_qd_sales_iconworkshop', '<script id="qd28521566902879fda245d60a04c0395a9f91cf00cb" src="https://wp.qiye.qq.com/qidian/2852156690/2879fda245d60a04c0395a9f91cf00cb" charset="utf-8" async defer></script>', 'http://q.url.cn/ABwMQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_iconworkshop', '<script id="qd2852156690405194a79f411fed1fa6194bf856f0bb" src="https://wp.qiye.qq.com/qidian/2852156690/405194a79f411fed1fa6194bf856f0bb" charset="utf-8" async defer></script>', ''],
        },
        'alienskins':
        {
        'sales':[1,'im_qd_sales_alienskins', '<script id="qd2852156690497b519316d9ac6629aa13b3d56ea5b2" src="https://wp.qiye.qq.com/qidian/2852156690/497b519316d9ac6629aa13b3d56ea5b2" charset="utf-8" async defer></script>', 'http://q.url.cn/ABeMQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_alienskins', '<script id="qd28521566902e74e3765b65aa247c97263ce7074365" src="https://wp.qiye.qq.com/qidian/2852156690/2e74e3765b65aa247c97263ce7074365" charset="utf-8" async defer></script>', ''],
        },
        'www.mairuan.com':
        {
        'sales':[1,'im_qd_sales_mairuan', '<script id="qd28521566901d78f29d34d4eeda013b5bfda6c5c1ca" src="https://wp.qiye.qq.com/qidian/2852156690/1d78f29d34d4eeda013b5bfda6c5c1ca" charset="utf-8" async defer></script>', 'http://q.url.cn/ABiMQl?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_mairuan', '<script id="qd28521566907234344c6ead087ae5ebaf48b9fc71bb" src="https://wp.qiye.qq.com/qidian/2852156690/7234344c6ead087ae5ebaf48b9fc71bb" charset="utf-8" async defer></script>', ''],
        },
        'Advanced Office Password Recovery':
        {
        'sales':[1,'im_qd_sales_aopr', '<script id="qd2852156690765de9193ef5b93373075ce84f608b4c" src="https://wp.qiye.qq.com/qidian/2852156690/765de9193ef5b93373075ce84f608b4c" charset="utf-8" async defer></script>', 'http://q.url.cn/CD08ul?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_aopr', '<script id="qd28521566905a75cbaf798675f873dd7b2563eb3b1a" src="https://wp.qiye.qq.com/qidian/2852156690/5a75cbaf798675f873dd7b2563eb3b1a" charset="utf-8" async defer></script>', ''],
        },
        'goldwave':
        {
        'sales':[1,'im_qd_sales_goldwave', '<script id="qd28521566906142a5e6c91bf640288cc1f7ca00bcbb" src="https://wp.qiye.qq.com/qidian/2852156690/6142a5e6c91bf640288cc1f7ca00bcbb" charset="utf-8" async defer></script>', 'http://q.url.cn/abrC9l?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_goldwave', '<script id="qd2852156690cbcecdf9eadbab4d9c6ce5fd1d991062" src="https://wp.qiye.qq.com/qidian/2852156690/cbcecdf9eadbab4d9c6ce5fd1d991062" charset="utf-8" async defer></script>', ''],
        },
        'wshop':
        {
        'sales':[1,'im_qd_sales_wshop', '<script id="qd2852156690679dc488c709c8414a40caac0f2b7ae1" src="https://wp.qiye.qq.com/qidian/2852156690/679dc488c709c8414a40caac0f2b7ae1" charset="utf-8" async defer></script>', 'http://q.url.cn/CDz62S?_type=wpa&qidian=true'], 
        'cservice':[1,'im_qd_cservice_wshop', '<script id="qd2852156690f1260d04679879202187a54f47ff8c99" src="https://wp.qiye.qq.com/qidian/2852156690/f1260d04679879202187a54f47ff8c99" charset="utf-8" async defer></script>', ''],
        },
        'camtasia':
        {
        'sales':[1,'im_qd_sales_camtasia', '<script id="qd28521566903240f592a6f59b0d97938a21c8ab63a0" src="https://wp.qiye.qq.com/qidian/2852156690/3240f592a6f59b0d97938a21c8ab63a0" charset="utf-8" async defer></script>', ''], 
        'cservice':[1,'im_qd_cservice_camtasia', '<script id="qd28521566905dafa16cb8b9dcd44155c38f12094b18" src="https://wp.qiye.qq.com/qidian/2852156690/5dafa16cb8b9dcd44155c38f12094b18" charset="utf-8" async defer></script>', ''],
        },
        'minitab':
        {
        'sales':[1,'im_qd_sales_minitab', '<script id="qd2852156690a773d5186b97f1ab702835505450189c" src="https://wp.qiye.qq.com/qidian/2852156690/a773d5186b97f1ab702835505450189c" charset="utf-8" async defer></script>', ''], 
        'cservice':[1,'im_qd_cservice_minitab', '<script id="qd285215669012d68559964b0ade773308ff873efd00" src="https://wp.qiye.qq.com/qidian/2852156690/12d68559964b0ade773308ff873efd00" charset="utf-8" async defer></script>', ''],
        },
        'idm':
        {
        'sales':[1,'im_qd_sales_idm', '<script id="qd2852156690f0793e8454f14a851e0428ee672d8cd2" src="https://wp.qiye.qq.com/qidian/2852156690/f0793e8454f14a851e0428ee672d8cd2" charset="utf-8" async defer></script>', ''], 
        'cservice':[1,'im_qd_cservice_idm', '<script id="qd2852156690cb372f49ffb6c85976c829fa45244232" src="https://wp.qiye.qq.com/qidian/2852156690/cb372f49ffb6c85976c829fa45244232" charset="utf-8" async defer></script>', ''],
        },
        'soundforge':
        {
        'sales':[1,'im_qd_sales_Sound', '<script id="qd2852156690f33891589333a904fc25aa3fca6d7ee4" src="https://wp.qiye.qq.com/qidian/2852156690/f33891589333a904fc25aa3fca6d7ee4" charset="utf-8" async defer></script>', ''], 
        'cservice':[1,'im_qd_cservice_Sound', '', ''],
        },
        'imazingchina':
        {
        'sales':[1,'im_qd_sales_imazing', '', ''], 
        'cservice':[1,'im_qd_cservice_imazing', '<script id="qd2852156690c31f8fc843551b7e09d7770889f0798e" src="https://wp.qiye.qq.com/qidian/2852156690/c31f8fc843551b7e09d7770889f0798e" charset="utf-8" async defer></script>', ''],
        },
        'ccleaner':
        {
        'sales':[1,'im_qd_sales_ccleaner', '', ''], 
        'cservice':[1,'im_qd_cservice_ccleaner', '<script id="qd2852156690910e738f9855be083187dbd1c5f74467" src="https://wp.qiye.qq.com/qidian/2852156690/910e738f9855be083187dbd1c5f74467" charset="utf-8" async defer></script>', ''],
        },
        'Hype':
        {
        'sales':[1,'im_qd_sales_Hype', '', ''], 
        'cservice':[1,'im_qd_cservice_Hype', '<script id="qd2852156690afbd6ea27f648f899050568084539cca" src="https://wp.qiye.qq.com/qidian/2852156690/afbd6ea27f648f899050568084539cca" charset="utf-8" async defer></script>', ''],
        },
        'boom3d':
        {
        'sales':[1,'im_qd_sales_Boom', '', ''], 
        'cservice':[1,'im_qd_cservice_Boom', '<script id="qd285215669044a6182a0994b8518120ec4269d791eb" src="https://wp.qiye.qq.com/qidian/2852156690/44a6182a0994b8518120ec4269d791eb" charset="utf-8" async defer></script>', ''],
        },
        'folx':
        {
        'sales':[1,'im_qd_sales_Folx', '', ''], 
        'cservice':[1,'im_qd_cservice_Folx', '<script id="qd28521566903cb4257dbbafb887121e2a08c62b9f3c" src="https://wp.qiye.qq.com/qidian/2852156690/3cb4257dbbafb887121e2a08c62b9f3c" charset="utf-8" async defer></script>', ''],
        },
        'rayfire':
        {
        'sales':[1,'im_qd_sales_Rayfire', '', ''], 
        'cservice':[1,'im_qd_cservice_Rayfire', '<script id="qd2852156690d8c57cb7f9613045e307562ec3b8fe0b" src="https://wp.qiye.qq.com/qidian/2852156690/d8c57cb7f9613045e307562ec3b8fe0b" charset="utf-8" async defer></script>', ''],
        },
        'pdffactory':
        {
        'sales':[1,'im_qd_sales_pdfFactor', '', ''], 
        'cservice':[1,'im_qd_cservice_pdfFactory', '<script id="qd28521566900dcc5e565f95b714c3020646a2e729aa" src="https://wp.qiye.qq.com/qidian/2852156690/0dcc5e565f95b714c3020646a2e729aa" charset="utf-8" async defer></script>', ''],
        },
        'anydesk':
        {
        'sales':[1,'im_qd_sales_anydesk', '<script id="qd285215669053ce013721008345dbd7ba0b6bb80ca0" src="https://wp.qiye.qq.com/qidian/2852156690/53ce013721008345dbd7ba0b6bb80ca0" charset="utf-8" async defer></script>', ''], 
        'cservice':[1,'im_qd_cservice_anydesk', '', ''],
        },
        'studioone':
        {
        'sales':[1,'im_qd_sales_studioone', '', ''], 
        'cservice':[1,'im_qd_cservice_studioone', '<script id="qd2852156690bc7e6636098a38ead58e6ec61da5f19b" src="https://wp.qiye.qq.com/qidian/2852156690/bc7e6636098a38ead58e6ec61da5f19b" charset="utf-8" async defer></script>', ''],
        },
        'prodad':
        {
        'sales':[1,'im_qd_sales_proDAD', '', ''], 
        'cservice':[1,'im_qd_cservice_proDAD', '<script id="qd28521566903b512793948d033150a51c55fe161993" src="https://wp.qiye.qq.com/qidian/2852156690/3b512793948d033150a51c55fe161993" charset="utf-8" async defer></script>', ''],
        },
        'ultraedit':
        {
        'sales':[1,'im_qd_sales_proDAD', '', ''], 
        'cservice':[1,'im_qd_cservice_ultraedit', '<script id="qd28521566909347de041a70f3b83244647bfd031cba" src="https://wp.qiye.qq.com/qidian/2852156690/9347de041a70f3b83244647bfd031cba" charset="utf-8" async defer></script>', ''],
        },
        'aida64':
        {
        'sales':[1,'im_qd_sales_proDAD', '', ''], 
        'cservice':[1,'im_qd_cservice_aida64', '<script id="qd2852156690720ec1baa6db7735d875a7870592a772" src="https://wp.qiye.qq.com/qidian/2852156690/720ec1baa6db7735d875a7870592a772" charset="utf-8" async defer></script>', ''],
        },
        'ibmspss':
        {
        'sales':[1,'im_qd_sales_IBM', '<script id="qd2852156690b6ccdf77a57c4bd89113b03419aea1e6" src="https://wp.qiye.qq.com/qidian/2852156690/b6ccdf77a57c4bd89113b03419aea1e6" charset="utf-8" async defer></script>', ''], 
        'cservice':[1,'im_qd_cservice_IBM', '', ''],
        },  
        'borisFX':
        {
        'sales':[1,'im_qd_sales_Borisfx', '<script id="qd28521566902e4e19e27227de8daedccad7adc05808" src="https://wp.qiye.qq.com/qidian/2852156690/2e4e19e27227de8daedccad7adc05808" charset="utf-8" async defer></script>', ''], 
        'cservice':[1,'im_qd_cservice_IBM', '', ''],
        },
        'ayoa':
        {
        'sales':[1,'im_qd_sales_ayoa', '', ''], 
        'cservice':[1,'im_qd_cservice_ayoa', '<script id="qd28521566907bacc151102ddaa501533e8af0f226fa" src="https://wp.qiye.qq.com/qidian/2852156690/7bacc151102ddaa501533e8af0f226fa" charset="utf-8" async defer></script>', ''],
        },
        'Sibelius':
        {
        'sales':[1,'im_qd_sales_Sibelius', '', ''], 
        'cservice':[1,'im_qd_cservice_Sibelius', '<script id="qd2852156690a71a475200a6eb283a92a3f54b3f8b52" src="https://wp.qiye.qq.com/qidian/2852156690/a71a475200a6eb283a92a3f54b3f8b52" charset="utf-8" async defer></script>', ''],
        },
    }

    var sitekfcate = '';

    if($.inArray(SITE_ALIAS,['easyrecoverychina','mycleanmymac','ntfs','Tuxera NTFS','pdfexpert','BetterZip','CrossOver','betterzipnet','Advanced Office Password Recovery','beyondcompare','camtasia','ccleaner','earmaster','alienskins','goldwave','Guitar','hypersnap','iconworkshop','idm','imindmap','logoshejishi','mathtype','MindManager','mindmapper','overturechina','PhotoZoom','yuanchengxiezuo','vsp','kingdeecn','shankejingling','dongmansoft','zhzzx','CODESOFT','keyshot','minitab','formysql','nicelabel','imazingchina','Hype','boom3d','folx','rayfire','pdffactory','studioone','prodad','ultraedit','aida64','ayoa','Sibelius'])>=0){
        //在线咨询 - sh
        sitekfcate = 'sh';
    }else if($.inArray(SITE_ALIAS,['ABBYY','BarTender','chemdraw','CorelDRAW','EDIUS','flstudiochina','Vegas','xshellcn','zbrushcn','bingdianhuanyuan','soundforge','anydesk','ibmspss','borisFX'])>=0){
        //购买咨询 - sq
        sitekfcate = 'sq';
    }

    //20200618 yugao
    var yugao = 0;
    // if($.inArray(SITE_ALIAS,['flstudiochina','ntfs','camtasia'])>=0){
    //     yugao = 1;
    // }

    //20201208 fenxiao
    var fenxiao = 0;
    // if($.inArray(SITE_ALIAS,['vsp','CorelDRAW','MindManager','imindmap','mycleanmymac','camtasia','Guitar','Vegas','flstudiochina'])>=0){
    //     fenxiao = 1;
    // }

    //*** static-mr-common-start ***
    if(location.pathname=='/shishengji.html' || (SITE_ALIAS=='vsp' && ($.inArray(location.pathname,['/testloading2018.html','/hh2018.html','/newloading2018.html'])>=0)) || (SITE_ALIAS=='imindmap' && ($.inArray(location.pathname,['/lp.html','/haizixuexigongju.html'])>=0)) || (SITE_ALIAS=='MindManager' && ($.inArray(location.pathname,['/lp1.html','/lp2a.html','/lp2b.html','/mindmanagerruanjian.html','/siweidaoturuanjian.html'])>=0)) || (SITE_ALIAS=='Hype' && ($.inArray(location.pathname,['/667.html','/release_notes/667.html'])>=0))){ 
    //排除法
    }else{
        $('body').prepend('<div class="static-mr-login"></div>');
        $('body').prepend('<div class="static-mr-common"></div>');
        $('body').prepend('<div class="static-fixed-height"></div>');
        var mr_common_load_url = 'cdn/mairuan/top_mairuan_1.1.html';
        if($.inArray(location.pathname,['/newbuy.html','/newbuye.html','/paysuccess.html'])>=0){
            if(SITE_ALIAS=='CorelDRAW'){
                var mr_common_load_url = 'cdn/mairuan/top_mairuan_2.1.html';
            }else{
                var mr_common_load_url = 'cdn/mairuan/top_mairuan_2.1_all.html';
            }
        }else{
            if(sitekfcate=='sh'){
                var mr_common_load_url = 'cdn/mairuan/top_mairuan_20200310.html';
            }else if(sitekfcate=='sq'){
                var mr_common_load_url = 'cdn/mairuan/top_mairuan_20200325.html';
            }
        }

        //console.log('mr_common_load_url:'+mr_common_load_url);
        $('.static-mr-common').load('https://cdn.mairuan.com/'+mr_common_load_url,function(){
            //load 完，再做相关操作
            $(".static-fixed-height").height(30);
            //zhishichanquan start
            //var tmyDate = new Date;
            //var tdate = tmyDate.getDate();
            //var thour = tmyDate.getHours();
            //console.log('tdate:'+tdate);
            //console.log('thour:'+thour);
            //var widz = $(window).width();
            //if (widz >= 768 && tdate==26){
                // var zhishichanquan = '';
                // zhishichanquan += '<div style="width: 100%; height: 70px; text-align: center; background-image: url(https://pic.mairuan.com/zhishichanquan/hengfu.jpg!p100); background-repeat: no-repeat; background-position: center 0px;"></div>';
                // $('.static-mr-common').after(zhishichanquan);
                //zhishichanquan end
                //zhishichanquan icon start
                // if($.inArray(location.pathname,['/',''])>=0){
                //     var zhishichanquan_icon = '';
                //     zhishichanquan_icon += '<img src="https://pic.mairuan.com/zhishichanquan/icon.png!p100" style=" position: fixed; top: 215px; left: 15%; z-index: 1001">';
                //     $('.static-mr-common').after(zhishichanquan_icon);
                // }
            //}
            //zhishichanquan icon end

            if(sitekfcate=='sh'){
                $(".pos_info .li6").remove();
            }

            if(yugao==0){
                $(".pos_info .li13").remove();
            }

            if(fenxiao==1){
                //$(".pos_info .li9").remove();
                $(".pos_info .li15").show();
                $('.li15 .sbox .ewm').find('img').attr('src','https://pic.mairuan.com/fenxiao20201208/'+SITE_ALIAS+'.png');
            }

            //shouqian-shouhou
            if($.inArray(location.pathname,['/newbuy.html','/newbuye.html','/paysuccess.html'])>=0){
                if(sitekfcate=='sh'){
                    $(".pos_info .qq").removeClass("shouqian");
                    $(".pos_info .qq").addClass("shouhou");
                    $(".pos_info .tel").remove();
                    $(".pos_info .qq").css('border-bottom','0px');
                }else if(sitekfcate=='sq'){
                    $(".pos_info .qq").removeClass("shouhou");
                    $(".pos_info .qq").addClass("shouqian");
                }
            }
            // 判断用户登录情况
            var nickname = 'unknow',
                coupon_num = 0;
            getUserInfo(function(res){
                nickname = res.nickname;
                coupon_num = res.coupon_num;
                document.cookie = 'mobile='+ res.mobile+';path=/;';
                if(res.auth_token!=null　&& $("#newbuy_cklogined").val()==0){
                    setCookie('auth_token',res.auth_token);
                    window.location.reload();
                }
                $('input[name="uid"]').val(res.uid);
                if(/(gendan){1}(\d*)\.html/.test(location.pathname)){
                    $('input[name="user_email"]').val(res.email);
                    $('input[name="user_mobile"]').val(res.mobile);
                }
                $('.top1 .tleft .alr_log_btn').show().children('span').text(nickname);
                $('.top1 .tleft .tlt4_alr_yhq').show().children('font').text(coupon_num);
                $('.top1 .tleft .exit_log').show();

                // 需要跟单的商品购买页，提交跟单按钮状态 
                $('.gdsubmitbtn_dis').removeClass('gdsubmitbtn_dis').addClass('gdsubmitbtn').next('span').hide();
                // getOrdersNum(function(res){
                //     var waitpay_num = res.data.waitpay_num;
                //     var waiteva_num = res.data.waiteva_num;
                //     $('.top1_box .li3 a font').text(waitpay_num);
                //     $('.top1_box .li4 a font').text(waiteva_num);
                // });
                $('.top1_box .li3 a font').text(res.waitpay_num);
                //waitpay_info
                if(res.waitpay_info && res.waitpay_info.orderid>0){
                    var opaystr = '';
                    opaystr += '<div class="static-opay-common"><div class="opayjoin dn">您有一笔订单还未支付，将于 ';
                    opaystr += '<span class="opay_countdown" endTime="'+res.waitpay_info.endTime+'" type="opay"><font class="opay_fen"></font>分 <font class="opay_miao"></font>秒</span> 后失效。 ';
                    opaystr += '应付金额 ¥'+res.waitpay_info.payprice;
                    if(res.waitpay_info.discount>0){
                        opaystr += '，已优惠 ¥'+res.waitpay_info.discount;
                    }
                    opaystr += '<a class="nowtopay" href="https://user.mairuan.com/orderpay/'+res.waitpay_info.orderid+'" target="_blank" baidujsapi="event_buy_click_未付款提示立即支付">立即付款</a>';
                    opaystr += '</div></div>';
                    $('.static-mr-common').after(opaystr);
                    $(".static-fixed-height").height(60);
                    $(".static-opay-common").css("top","30px");

                    var opay_endTime = parseInt($('.opay_countdown').attr('endTime'))*1000;
                    var timer = setInterval(function() {
                        opay_endTime = opay_endTime - 1000;
                        if(opay_endTime<=0){
                            $('.static-opay-common').remove();
                            $(".static-fixed-height").height(30);
                            clearInterval(timer);
                        }else{
                            var time_days = Math.floor(opay_endTime / 86400000);
                            var time_hours = Math.floor((opay_endTime - time_days*86400000)/3600000);
                            var time_mins = Math.floor((opay_endTime - time_days*86400000-time_hours*3600000)/60000);
                            var time_sec = Math.floor((opay_endTime - time_days*86400000-time_hours*3600000-time_mins*60000)/1000);
                            $('.opay_fen').text(time_mins);
                            $('.opay_miao').text(time_sec);
                            $('.opayjoin').fadeIn(150);
                        }
                    },1000);
                }
            },function(res){
                $('.top1 .tleft .to_log_btn').show();
                $('.top1 .tleft .tlt4').show();
                $('.top1 .tleft .tlt3').show();

                $('.tright .trt5 .li1 a').removeAttr("href");
                $('.pos_info .li1 a').removeAttr("href");

                if(GetCookieValue('checkkey')){
                    DelCookie('checkkey');
                }
                if(GetCookieValue('mobile')){
                    DelCookie('mobile');
                }
                if(GetCookieValue('auth_token')){
                    DelCookie('auth_token');
                }
            });
            //dave_newbox_right_fixed
            if($.inArray(location.pathname,['/newbuy.html','/newbuye.html'])>=0){
                $(window).scroll(function(){
                    posi_other_box();
                });
            }
            //ps_left
            if(true){
                var n1 = $('.ps_left .buttons .li7.shouqian');
                var n2 = $('.ps_left .buttons .li7.shouhou');
                var qiyeObj = QIYEQQ[SITE_ALIAS];
                if(qiyeObj){
                    if(isPhone){
                        //$('.menu_kefu.openKefu').attr('href',qiyeObj['sales'][3]);
                        $('.menu_kefu.openKefu').attr('href','https://url.cn/58FAn8d?_type=wpa&qidian=true');
                    }
                    // 售前
                    switch(qiyeObj['sales'][0]){
                        case 1:
                            n1.children('a.qiyeqq').attr('id',qiyeObj['sales'][1]).append(qiyeObj['sales'][2]);
                        break;
                        case 2:
                            n1.children('a.qiyeqq').prop({
                                'href': qiyeObj['sales'][3],
                                'target':'_blank'
                            });
                        break;
                        default:;          
                    }
                    // 售后
                    switch(qiyeObj['cservice'][0]){
                        case 1:
                            n2.children('a.qiyeqq').attr('id',qiyeObj['cservice'][1]).append(qiyeObj['cservice'][2]);
                        break;
                        case 2:
                            n2.children('a.qiyeqq').prop({
                                'href': qiyeObj['cservice'][3],
                                'target':'_blank'
                            });
                        break;
                        default:;
                    }
                }
                $(".click_kefu_sales").click(function(){
                    $("#im_qd_sales_"+SITE_ALIAS)[0].click();
                });
                $(".click_kefu_cservice").click(function(){
                    $("#im_qd_cservice_"+SITE_ALIAS)[0].click();
                });
            }
            //$('.static-mr-common').find('.join').css('width','100px');
            // 点击 登录 跳转到 用户中心 注册页面
            $('.to_log_btn').click(function(){
               //to_login_reg( uchost +'/login');
               //loadqrcode();
               loadmobile();
            });
            $('.tright .trt5 .li1 a').click(function(){
                if(!$(this).attr('href')){
                    //loadqrcode();
                    loadmobile();
                }
            });
            $('.pos_info .li1 a').click(function(){
                if(!$(this).attr('href')){
                    //loadqrcode();
                    loadmobile();
                }
            });
            // 注册部分
            // 点击 注册 跳转到 用户中心 注册页面
            $('.to_reg_btn').click(function(){
                //to_login_reg( uchost +'/reg');
                $('.loginbox_bg').show();
                $('.login_box_saoma').hide();
                $('.login_box_mobile').hide();
                $('.login_box_reg').show();
            });
            // 退出登录部分
            $('.exit_log').click(function(){
                layer.confirm('确定退出？',{icon: 3,title: '提示'},function(confirm){
                    if(GetCookieValue('checkkey')){
                        DelCookie('checkkey');
                    }
                    if(GetCookieValue('mobile')){
                        DelCookie('mobile');
                    }
                    if(GetCookieValue('auth_token')){
                        DelCookie('auth_token');
                    }
                    to_login_reg(uchost+"/loginout");
                });
            });
            // 右侧浮动-定高
            var winwidth=$(window).width();
            var winheight=$(window).height();
            //console.log('winheight:'+winheight);
            $(".pos_info").height(winheight);
            var buttonsheight=$(".pos_info .buttons").height();
            //console.log('buttonsheight:'+buttonsheight);
            $(".pos_info .buttons").css("margin-top",((winheight-buttonsheight)/2));
            $(".pos_info .cart_no .tishi").css("margin-top",((winheight-buttonsheight)/2));
            // 右侧浮动-滑出
            $(".ps_left li .nx").hover(function(){
                if($(this).hasClass('dis')){
                    return;
                }
                var spanw=parseInt($(this).find(".n2").attr("dataw"))+90;
                $(this).closest("li").find(".n2").stop(true).animate({width:spanw+'px'},150);
            },function(){
                if($(this).hasClass('dis')){
                    return;
                }
                $(this).closest("li").find(".n2").stop(true).animate({width:"0px"},150);
            });
            var zixun = '';
            $('.ps_left .qiyeqq').hover(function(){
                zixun = $(this).children('.n1').text();
                $(this).children('.n1').css({
                    width:'190px',
                    backgroundPosition:'168px center'
                }).delay(200).text('客服QQ：4008765888');
            },function(){
                $(this).children('.n1').css({
                    width:'105px',
                    backgroundPosition:'78px center'
                }).delay(200).text(zixun);
            });
            // 改变客服热线号码
            var webhost = window.location.host;
            var iphonetxt = '400-8765-888';
            switch (webhost) {
                case "www.zuoqudashi.net" : 
                iphonetxt = '0512-88869352';
                break;
                case "www.coreldrawchina.com" : 
                iphonetxt = '400-9283-655';
                break;
            }
            $('.pos_info .ps_left .singledn .n2').html('<font class="pr" style="width:1px;height:1px;left:-110px;bottom:80px;"></font>'+iphonetxt);
            // 右侧浮动-二维码-滑出
            $(".ps_left .li9 .nx").hover(function(){
                $(this).closest("li").find(".sbox").show();
                $(this).closest("li").find(".info").stop(true).animate({marginLeft:'0px'},150);
            },function(){
                $(this).closest("li").find(".info").stop(true).animate({marginLeft:'272px'},150,function(){
                    $(this).closest("li").find(".sbox").hide();
                });
            });
            // 右侧浮动-分销二维码-滑出
            $(".ps_left .li15 .nx").hover(function(){
                $(this).closest("li").find(".sbox").show();
                $(this).closest("li").find(".info").stop(true).animate({marginLeft:'0px'},150);
            },function(){
                $(this).closest("li").find(".info").stop(true).animate({marginLeft:'272px'},150,function(){
                    $(this).closest("li").find(".sbox").hide();
                });
            });
            // 右侧浮动-2020618-yugao-滑出
            $(".ps_left .li13 .nx").hover(function(){
                $(this).closest("li").find(".sbox").show();
                //$(this).closest("li").find(".info").stop(true).animate({marginLeft:'0px'},150);
            },function(){
                $(this).closest("li").find(".info").stop(true).animate({marginLeft:'272px'},150,function(){
                    $(this).closest("li").find(".sbox").hide();
                });
            });
            $(".ps_left .li13 .nx").click(function(){
                $(this).closest("li").find(".info").stop(true).animate({marginLeft:'0px'},150);
            });

            //b-yemian
            $(".ps_left li.qq").hover(function(){
                $(this).find(".abs").show(50);
                $(this).find(".h").show(50);
            },function(){
                $(this).find(".abs").hide();
                $(this).find(".h").hide();
            });
            $(".ps_left li.tel").hover(function(){
                $(this).find(".abs").show(50);
            },function(){
                $(this).find(".abs").hide();
            });
            // 更新右侧客服
            $("#shrinkHide").click(function(){
                $(".pos_info").animate({right:'-313px'},150);
                $('.pos_info').find("li a").addClass("dn");
                $("#shrinkShow").removeClass("layui-hide");
            });
            $("#shrinkShow").click(function(){
                $(".pos_info").animate({right:'-298px'},150);
                $('.pos_info').find("li a").removeClass("dn");
                $("#shrinkShow").addClass("layui-hide");
            });
            $("#shrinkShow").hover(function(){
                $(this).find("i").text("+展开").css("width" , "50px").css("left" , "-42px");
            } , function(){
                $(this).find("i").text("+").css("width" , "14px").css("left" , "-6px");
            });
            // 返回顶部
            $('#toTop').click(function(){
                $('html ,body').animate({scrollTop: 0}, 300);
            });
        });

        //login
        var timerlin;
        var mr_login_load_url = 'cdn/mairuan/login.html?v='+Date.parse(new Date());
        $('.static-mr-login').load('https://cdn.mairuan.com/'+mr_login_load_url,function(){
            /*refreshbtn*/
            $("#refreshbtn").click(function(){
                loadqrcode();
            });
            //loginbox 定位登录块距顶高度
            $('.loginbox').css('top',((($(window).height()-421)/2)-50));
            //close
            $('.loginbox .close').click(function(){
                $('.loginbox_bg').hide();
                clearInterval(timerlin);
            });
            //切换扫码登录
            $('.tab_saoma').click(function(){
                loadqrcode();
            });
            //切换手机验证码登录
            $('.tab_mobile').click(function(){
                $('.login_box_saoma').hide();
                $('.login_box_mobile').show();
                $('.login_box_reg').hide();
                $('.login_box_mobile .tab_mobile').addClass("active");
                $('.login_box_mobile').find('#log_form1').show();
                $('.login_box_mobile .tab_account').removeClass("active");
                $('.login_box_mobile').find('#log_form2').hide();
                clearInterval(timerlin);
            });
            //切换账号登录
            $('.tab_account').click(function(){
                $('.login_box_saoma').hide();
                $('.login_box_mobile').show();
                $('.login_box_reg').hide();
                $('.login_box_mobile .tab_mobile').removeClass("active");
                $('.login_box_mobile').find('#log_form1').hide();
                $('.login_box_mobile .tab_account').addClass("active");
                $('.login_box_mobile').find('#log_form2').show();
                clearInterval(timerlin);
            });
            //切换注册
            $('.tab_reg').click(function(){
                $('.login_box_saoma').hide();
                $('.login_box_mobile').hide();
                $('.login_box_reg').show();
                clearInterval(timerlin);
            });
            /*清除帐号*/
            $(".clear_txt").click(function(){
                $(".txtinput").val('');
            });
            //注册 显示密码
            $('.showpw_btn').mousedown(function(){
                $(this).addClass('active');
                $(this).siblings('input').attr('type','text');
            });
             $('.showpw_btn').mouseup(function(){
                $(this).removeClass('active');
                $(this).siblings('input').attr('type','password');
            });
            //dun
            var username;
            var captchaIns;
            var captchaId = '536ea9bea3aa45cc90b230c0aa594f90';
            initNECaptcha({
                element: '#captcha_login',
                captchaId: captchaId,
                mode: 'bind',
                onVerify: function(err){
                    // todo
                    if(!err){
                        mrloginyzmmobilesends(captchaIns.username);
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
            $(".yzm_btn").click(function(){
                captchaIns && captchaIns.verify();// 手动调用verify方法
                var username = $(this).closest(".forms").find("input[name='username']").val();
                captchaIns.username = username;
            });
            function mrloginyzmmobilesends(username){
                var loading = layer.load();
                NECaptchaValidate = $("#captcha_login").find("input[name='NECaptchaValidate']").val();
                var isphone = /^[1][1-9][0-9]{9}$/.test(username);
                var isemail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(username);
                if(!isphone && !isemail){
                    layer.close(loading);
                    layer.msg("手机号/邮箱输入有误");
                    return;
                }
                if(isphone){
                    var datas = {type:1, mobile:username, captchaId:captchaId, NECaptchaValidate:NECaptchaValidate};
                    var apiurl = '/Yzm/mobilesends';
                }
                if(isemail){
                    var datas = {type:2, email:username, captchaId:captchaId, NECaptchaValidate:NECaptchaValidate};
                    var apiurl = '/Yzm/emailsends';
                }
                $.ajax({
                    method: 'POST',
                    url: API + apiurl,
                    data: datas,
                    dataType: 'json',
                    xhrFields:{
                        withCredentials:true
                    },
                    success: function(res){
                        layer.close(loading);
                        if(res.code==200){
                            $(".yzm_daojishi").html("119s后重新获取");
                            $(".yzm_btn").hide();
                            $(".yzm_daojishi").show();

                            var count = 118;
                            var myCountDown = self.setInterval(function(){
                                $(".yzm_daojishi").html(count +"s后重新获取");
                                if(count==0){
                                    clearInterval(myCountDown);
                                    count = 118;
                                    $(".yzm_daojishi").hide();
                                    $(".yzm_btn").show();
                                }
                                count--;
                            },1000);
                        }else{
                            layer.msg(res.message,{time:1000,shift:-1});
                            return;
                        }
                    },
                    error: function(err){
                        layer.close(loading);
                        return;
                    }
                });
            }

            /*手机验证码登录提交*/
            $("#log_form1 .loginbtn").click(function(){
                var loading = layer.load();
                var form = $("#log_form1");
                var types = form.find("#types").val();
                var username = form.find("input[name='username']").val();
                var yzm = form.find("input[name='yzm']").val();
                var datas = {types:types,username:username,yzm:yzm};
                if( !regphone.test(datas["username"]) && !regemail.test(datas["username"]) ){
                    layer.close(loading);
                    layer.msg("手机号/邮箱输入有误");
                    return;
                }
                $.ajax({
                    method: 'POST',
                    url: API + '/Login/index',
                    data: datas,
                    dataType: 'json',
                    xhrFields:{
                        withCredentials:true
                    },
                    success: function(res){
                        layer.close(loading);
                        if(res.code==200){
                            $.cookie('auth_token',res.auth_token,{path: '/'});
                            var rediurl = $.base64.encode(location.href);
                            location.href = API+'/web/userautologin/auth_token/'+res.auth_token+'/goto/sitelogin/rediurl/'+rediurl;
                            //location.reload();
                        }else{
                            layer.msg(res.message,{time:1000,shift:-1});
                            return;
                        }
                    },
                    error: function(err){
                        layer.close(loading);
                        return;
                    }
                });
            });
            /*账号登录提交*/
            $("#log_form2 .loginbtn").click(function(){

                var loading = layer.load();
                var form = $("#log_form2");
                var types = form.find("#types").val();
                var username = form.find("input[name='username']").val();
                var password = form.find("input[name='password']").val();
                var datas = {types:types,username:username,password:password};
                if( !regphone.test(datas["username"]) && !regemail.test(datas["username"]) ){
                    layer.close(loading);
                    layer.msg("手机号/邮箱输入有误");
                    return;
                }
                $.ajax({
                    method: 'POST',
                    url: API + '/Login/index',
                    data: datas,
                    dataType: 'json',
                    xhrFields:{
                        withCredentials:true
                    },
                    success: function(res){
                        layer.close(loading);
                        if(res.code==200){
                            $.cookie('auth_token',res.auth_token,{path: '/'});
                            var rediurl = $.base64.encode(location.href);
                            location.href = API+'/web/userautologin/auth_token/'+res.auth_token+'/goto/sitelogin/rediurl/'+rediurl;
                            //location.reload();
                        }else{
                            layer.msg(res.message,{time:1000,shift:-1});
                            return;
                        }
                    },
                    error: function(err){
                        layer.close(loading);
                        return;
                    }
                });
            });
            /*服务协议*/
            $(".showfuwuxieyi").on('click',function(){
                $(".fuwuxieyi_bg").show();
                $(".fuwuxieyi").show();
                $(".fuwuxieyi .conbox").load("https://agreement.mairuan.com/user.html?v="+Date.parse(new Date()));
            });
            $(".fwxy_close").on('click',function(){
                $(".fuwuxieyi_bg").hide();
                $(".fuwuxieyi").hide();
            });
            $(".fuwuxieyi .tongyi").on('click',function(){
                $(".fuwuxieyi_ck").prop("checked",true);
                $(".fwxy_close").click();
            });
            /*注册-下一步*/
            $("#reg_form1 .next").click(function(){
                var loading = layer.load();
                var form = $("#reg_form1");
                var types = form.find("#types").val();
                var username = form.find("input[name='username']").val();
                var password = form.find("input[name='password']").val();
                var datas = {types:types,username:username,password:password};
                if(!regphone.test(datas["username"]) && !regemail.test(datas["username"])){
                    layer.close(loading);
                    layer.msg("手机号/邮箱输入有误");
                    return;
                }
                $.ajax({
                    method: 'POST',
                    url: API + '/Reg/step1',
                    data: datas,
                    dataType: 'json',
                    xhrFields:{
                        withCredentials:true
                    },
                    success: function(res){
                        layer.close(loading);
                        if(res.code==200){
                            $("#reg_form1").hide();
                            $("#reg_form2").show();
                            return;
                        }else{
                            layer.msg(res.message,{time:1000,shift:-1});
                            return;
                        }
                    },
                    error: function(err){
                        layer.close(loading);
                        return;
                    }
                });
            });
            /*注册提交*/
            $("#reg_form2 .regbtn").click(function(){
                var loading = layer.load();
                var form1 = $("#reg_form1");
                var types = form1.find("#types").val();
                var username = form1.find("input[name='username']").val();
                var password = form1.find("input[name='password']").val();
                var form2 = $("#reg_form2");
                var yzm = form2.find("input[name='yzm']").val();
                var datas = {types:types,username:username,password:password,yzm:yzm};
                if(!regphone.test(datas["username"]) && !regemail.test(datas["username"])){
                    layer.close(loading);
                    layer.msg("手机号/邮箱输入有误");
                    return;
                }
                $.ajax({
                    method: 'POST',
                    url: API + '/Reg/index',
                    data: datas,
                    dataType: 'json',
                    xhrFields:{
                        withCredentials:true
                    },
                    success: function(res){
                        if(res.code==200){
                            $.cookie('auth_token',res.auth_token,{path: '/'});
                            var rediurl = $.base64.encode(location.href);
                            location.href = API+'/web/userautologin/auth_token/'+res.auth_token+'/goto/sitelogin/rediurl/'+rediurl;
                            //location.reload();
                        }else{
                            layer.close(loading);
                            layer.msg(res.message,{time:1000,shift:-1});
                            return;
                        }
                    },
                    error: function(err){
                        layer.close(loading);
                        return;
                    }
                });
            });
            // 绑定手机号码
            $('#bangdingbtn').click(function(){
                var loading = layer.load();
                var form3 = $("#qrcode_form3");
                var username = form3.find("input[name='username']").val();
                var yzm = form3.find("input[name='yzm']").val();
                var datas = {mobile:username,yzm:yzm,qrid:$.cookie('qrid')};
                if(!regphone.test(username)){
                    layer.close(loading);
                    layer.msg("手机号输入有误");
                    return;
                }
                $.ajax({
                        method: 'POST',
                        url: API + '/Bindmobile/index',
                        data: datas,
                        dataType: 'json',
                        xhrFields:{
                            withCredentials:true
                        },
                        success: function(res){
                        if(res.code == 200){
                            $.cookie('uid',res.data.uid,{path: '/'});
                            $.cookie('auth_token',res.auth_token,{path: '/'});
                            var rediurl = $.base64.encode(location.href);
                            location.href = API+'/web/userautologin/auth_token/'+res.auth_token+'/goto/sitelogin/rediurl/'+rediurl;
                            //location.reload();
                        }else{
                            layer.close(loading);
                            layer.msg(res.message,{time:1000,shift:-1});
                            if(res.code == 429){
                                $('#qrcode_form3 input[name="yzm"]').val('');
                            }
                            return;
                        }
                    },
                    error: function(err){
                        layer.close(loading);
                        console.log(err);
                    }
                });
            });
        });
    }
    //*** static-mr-common-end ***

    //augustine_newbuy_jiajiagou
    if($.inArray(location.pathname,['/newbuy.html','/newbuye.html'])>=0){
        //展开
        $(".jjg_listdown").click(function(){
            $(".jiajiagou_list").css("height",'auto');
            $(".jjg_listdown").hide();
            $(".jjg_listdown_btm").hide();
            $(".jjg_listup").show();
            posi_other_box();
        });
        //收起
        $(".jjg_listup").click(function(){
            $(".jiajiagou_list").css("height",'200px');
            $(".jjg_listdown").show();
            $(".jjg_listdown_btm").show();
            $(".jjg_listup").hide();
            posi_other_box();
        });
    }

    //zhengzhaoxinxi
    $('.zhengzhaoxinxi').click(function(){
        var yyzzurl = $(this).attr('data');
        layer.open({
            type: 1,
            shade: false,
            title: false,
            area: ['1000px', '707px'], //宽高
            content: '<img src="'+yyzzurl+'">',
            cancel: function(){
                console.log(111);
                //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', {time: 5000, icon:6});
            }
        });
    });

    var GD_API = cjProtocol+'//center2.makeding.com/api.php/Gd/addsource';
    var INITDATE = new Date(); // 初始时间
    var INITTIME = INITDATE.getTime(); // 初始时间戳

    // 隐藏auth_token，并存入cookie
    (function() {
        var search = location.search;
        if(search.indexOf('auth_token') != -1){
            var pathname = location.pathname;
            var token = search.substring(search.indexOf('auth_token'));
            var tokenarr = token.split('=');
            // 设置cookie
            setCookie('auth_token',tokenarr[1]);
            var rep = search.substring(search.indexOf('auth_token')-1);
            history.pushState({},'',pathname + search.replace(rep ,''));
        }        
    })();

    // 改变客服热线号码
    // var webhost = window.location.host;
    // var iphonetxt = '400-8765-888';
    // switch (webhost) {
    //     case "www.zuoqudashi.net" : 
    //     iphonetxt = '0512-88869352';
    //     break;

    //     case "www.coreldrawchina.com" : 
    //     iphonetxt = '400-9283-655';
    //     break;
    // }
    // $('.pos_info .ps_left .singledn .n2').html('<font class="pr" style="width:1px;height:1px;left:-110px;bottom:80px;"></font>'+iphonetxt);


    // hostname2 接口地址：获取下载试用软件的信息
    var hostname2 = cjProtocol+'//center2.makeding.com/api.php/Index';

    // 产品页proalias
    var proalias = $('#SITE_ALIAS').val();

    // /*右侧浮动-定高*/
    // var winwidth=$(window).width();
    // var winheight=$(window).height();
    // $(".pos_info").height(winheight);
    // var buttonsheight=$(".pos_info .buttons").height();
    // $(".pos_info .buttons").css("margin-top",((winheight-buttonsheight)/2));
    // $(".pos_info .cart_no .tishi").css("margin-top",((winheight-buttonsheight)/2));
    /*右侧浮动-滑出*/
    // $(".ps_left li .nx").hover(function(){
    //     if($(this).hasClass('dis')){
    //         return;
    //     }
    //     var spanw=parseInt($(this).find(".n2").attr("dataw"))+90;
    //     $(this).closest("li").find(".n2").stop(true).animate({width:spanw+'px'},150);
    // },function(){
    //     if($(this).hasClass('dis')){
    //         return;
    //     }
    //     $(this).closest("li").find(".n2").stop(true).animate({width:"0px"},150);
    // });

    // var zixun = '';
    // $('.ps_left .qiyeqq').hover(function(){
    //     zixun = $(this).children('.n1').text();
    //     $(this).children('.n1').css({
    //         width:'190px',
    //         backgroundPosition:'168px center'
    //     }).delay(200).text('客服QQ：4008765888');
    // },function(){
    //     $(this).children('.n1').css({
    //         width:'105px',
    //         backgroundPosition:'78px center'
    //     }).delay(200).text(zixun);
    // });

    // 400电话限时开通（显示）
    if(fnClose400Phone()){
        $('.ps_left .buttons li.li6 .nx>*').each(function() {
            $(this).css('backgroundColor', '#333333');
        });
    }

    var tips;
    $('.ps_left .buttons li.li6').hover(function() {
        if(fnClose400Phone()){
            var ele = $(this).find('.n2 font').eq(0);
            tips = layer.tips('非工作时间电话客服不在线，请联系QQ客服，电话客服工作时间（周一至周五09:00-17:30）', ele,{
                tips:[4,'#e83a17'],
                time:60000
            });
        }
    },function() {
        layer.close(tips);
    });

    // 400电话限时开通（显示）
    function fnClose400Phone() {
        // 节假日
        var holiday = ['5/1','6/7','6/8','6/9','9/13','9/14','9/15','10/1','10/2','10/3','10/4','10/5','10/6','10/7'];
        // 加班日
        var overtime = ['4/28','5/5','9/29','10/12'];
        var nowDate = new Date();

        var month = nowDate.getMonth()+1;
        var date = nowDate.getDate();
        var day = nowDate.getDay();
        var hours = nowDate.getHours();
        var min = nowDate.getMinutes();

        var md = month+'/'+date;
        if(holiday.indexOf(md) != -1){
            // 节假日
            return true;
        }else if(overtime.indexOf(md) != -1){
            // 加班日
            return false;
        }else if([0,6].indexOf(day) != -1){
            // 周六、日
            return true;
        }else if(hours<9 || hours>17 || (hours==17&&min>29)){
            // 09：00~17：30之外
            return true;            
        }else{
            return false;            
        }
    }

    /*右侧浮动-logo-滑出*/

    $(".ps_left .li8 .nx").hover(function(){

        $(this).closest("li").find(".imgbox").show();

        $(this).closest("li").find("img").stop(true).animate({marginLeft:'0px'},150);

    },function(){

        $(this).closest("li").find("img").stop(true).animate({marginLeft:'206px'},150,function(){

            $(this).closest("li").find(".imgbox").hide();

        });

    })



    // /*右侧浮动-二维码-滑出*/

    // $(".ps_left .li9 .nx").hover(function(){

    //     $(this).closest("li").find(".sbox").show();

    //     $(this).closest("li").find(".info").stop(true).animate({marginLeft:'0px'},150);

    // },function(){

    //     $(this).closest("li").find(".info").stop(true).animate({marginLeft:'272px'},150,function(){

    //         $(this).closest("li").find(".sbox").hide();

    //     });

    // })



    /*右侧浮动-右展开*/

    $(".ps_left .buttons .li2 .nx").click(function(){

        $(".pos_info").animate({right:'0px'},150);

        $(".ps_left .li2 .nx .n1").addClass('open').css('background-color','#e83a17');

        // getCartInfo();

    })

    /*右侧浮动-右关闭*/
    $(".ps_right .cartclose").click(closePsRight);

    function closePsRight(){
        //$(".pos_info").animate({right:'-292px'},150);
        $(".ps_left .li2 .nx .n1").removeClass('open').css('background-color','#333333');
    }

    /*展开顶部收索栏*/
    $('#search_btn').click(function(){
        $('.search_box').show();
        $('#search_inp').animate({
            width:'282px'
        },300);
    });

    $('#close').click(function(){
        $('#search_inp').animate({
            width:'0'
        },300);
        $('.search_box').hide(300);
    });

    /*20190930更新右侧客服-start*/
    // $("#shrinkHide").click(function(){
    //     $(".pos_info").animate({right:'-313px'},150);
    //     $('.pos_info').find("li a").addClass("dn");
    //     $("#shrinkShow").removeClass("layui-hide");
    // });
    // $("#shrinkShow").click(function(){
    //     $(".pos_info").animate({right:'-298px'},150);
    //     $('.pos_info').find("li a").removeClass("dn");
    //     $("#shrinkShow").addClass("layui-hide");
    // });
    // $("#shrinkShow").hover(function(){
    //     $(this).find("i").text("+展开").css("width" , "50px").css("left" , "-42px");
    // } , function(){
    //     $(this).find("i").text("+").css("width" , "14px").css("left" , "-6px");
    // });
    /*20190930更新右侧客服-end*/

    /*返回顶部*/
    // $('#toTop').click(function(){
    //     $('html ,body').animate({scrollTop: 0}, 300);
    // });

    /*返回按钮：注册第二步返回到第一步*/
    $('.reg_popup .box .prev').click(function(){
        $('.reg_popup .step-1').show();
        $('.reg_popup .step-2').hide();
    });

    // /*图片加载失败显示默认图片*/
    // $('img').on('error',function(){
    //     $(this).attr('src','uploads/images/menu/error.png');
    // });

    /*客服按钮*/
    $('.ps_left .buttons .li7').click(function(){

        if(true){
            return;
        }

        if(['CorelDRAW','EDIUS','chemdraw','BarTender','ABBYY','bingdianhuanyuan','flstudiochina','yuanchengxiezuo','alienskins','EarMaster','ccleaner','goldwave'].indexOf(SITE_ALIAS)!=-1){
            easemobim.bind({
                            configId: 'c3732d6b-edcf-4c32-9832-22a01cdb7c60',
                            visitor:{
                                userNickname: location.host || ''
                            }
                        });
        }else{
            getUserInfo(function(data){ 

                var description = "性别："+ (data.email=='1'?"先生; ":"女士; ")+"昵称："+data.nickname;

                easemobim.bind({
                                configId: 'c3732d6b-edcf-4c32-9832-22a01cdb7c60',
                                visitor:{
                                    phone: data.mobile || '',
                                    userNickname: location.host || '',
                                    email: data.email || '',
                                    description: description
                                }
                            });               
            },function(err) {
                if(err.code == 403){
                    var hereurl = location.href;
                    location.href = uchost+'/login?rediurl='+hereurl;
                }else{
                    layer.msg(err.message);
                }
            });
        }
    });
   
    /*
        在线咨询自动弹出
        需求明细：
        1， 当用户在访问产品网站超过1分钟时，弹出环信客服窗口；
        2， 当用户关闭环信客服窗口后，当用户继续浏览网站超过2分钟时，再次弹出环信客服窗口。
        3， 一次会话期间，最多弹出两次环信客服窗口。
    */ 

    if(['CorelDRAW','EDIUS','xshellcn','CODESOFT','nicelabel','chemdraw','BarTender','formysql','ABBYY','bingdianhuanyuan','keyshot','Vegas','flstudiochina','yuanchengxiezuo','zbrushcn','alienskins','EarMaster','ccleaner','goldwave'].indexOf(SITE_ALIAS)!=-1 && getCookie('isshoweasemobim')!="3"){
        var isShow = false;
        var interval = setInterval(function(){ 
            var nowTime = new Date().getTime();
            if(55<((nowTime-INITTIME)/1000) && ((nowTime-INITTIME)/1000)<65 && !isShow){
                $('.ps_left .buttons .li7').trigger('click');
                setCookie('isshoweasemobim','1');
                isShow = true;
            }else if(175<((nowTime-INITTIME)/1000) && ((nowTime-INITTIME)/1000)<185 && $('iframe[id^=easemob-iframe]').hasClass('easemobim-hide')){
                $('.ps_left .buttons .li7').trigger('click');
                setCookie('isshoweasemobim','3');
            }else if(175<((nowTime-INITTIME)/1000) && ((nowTime-INITTIME)/1000)<185 && !$('iframe[id^=easemob-iframe]').hasClass('easemobim-hide')){
                setCookie('isshoweasemobim','3');
            }

            if(getCookie('isshoweasemobim')==3){
                clearInterval(interval);
            }
        },1000);
    }

    /*点击右侧购物车外区域，购物车隐藏*/

    $(document).click(function(event){

        var evt = event || window.event;

        var target = evt.target || evt.srcElement;



        // length == 0 说明存在，则收起右侧购物车

        var length = $(target).parents('.join .pos_info').length;

      

        if(length==0){

            closePsRight();

        }

    });



    /* 购物车鼠标悬停改变background-color */

    $('.ps_left .li2 .n1').hover(function(){

        if(!$(this).hasClass('open')){   // 判断侧边栏是否展开，展开则不启用

            $(this).css('background-color', '#e83a17');

        } 

    },function(){

        if(!$(this).hasClass('open')){   // 判断侧边栏是否展开，展开则不启用

            $(this).css('background-color', '#333');

        } 

    });



    /* 滚动购物车到顶、底时，阻止页面滚动 */

    $('.psi_cart_list').scrollUnique();


    /*升级购买*/
    $('.upgrade').click(function(){
        getUserInfo(function(data){
            var mobile = $(this).attr('mobile');
            var email = $(this).attr('email');
            var proid = $(this).attr('proid');
            var goodsid = $(this).attr('goodsid');
            $.ajax({
                type: 'get',
                url: cjProtocol+'//center2.makeding.com/api.php/Index/check_upgrades/proid/'+proid+'/email/'+email+'/goodsid/'+goodsid+'/mobile/'+mobile,
                xhrFields:{
                    withCredentials: true
                },
                success: function(res){
                    console.log(res);
                },
                error:function(err){
                    console.log(err);
                }
            });
        },function(err) {
            if(err.code == 403){
                var hereurl = location.href;
                location.href = uchost+'/login?rediurl='+hereurl;
            }else{
                layer.msg(err.message);
            }
        });
    });



// ----------------------------------------------------------------------- 

 

    var regPhone = /^1[34578]\d{9}$/;                                 //手机号正则

    var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;   //邮箱正则

    var regImg = /^[A-Za-z0-9]{4}$/;                                     //图片验证码正则



    // 获取图片验证码  点击图片切换图片

    var imgyzm_url = '/Imgyzm/login';

    var img_src = apihost + imgyzm_url +'?rnd='+Math.random();

    var $imgyzm_log = $('.login_popup .main .img_yzm .img');    //登录弹框的图片验证码

    var $imgyzm_reg = $('.reg_popup .main .img_yzm .img');      //注册弹框的图片验证码

    var countdown = 60; //计时器



    changeYzmImage(img_src);



    $imgyzm_log.click(function(){ 

        img_src = apihost + imgyzm_url +'?rnd='+Math.random();

        changeYzmImage(img_src);

    });

    $imgyzm_reg.click(function(){

        img_src = apihost + imgyzm_url +'?rnd='+Math.random();

        changeYzmImage(img_src);

    });



    function changeYzmImage(img_src){

        $imgyzm_log.attr('src', img_src);

        $imgyzm_reg.attr('src', img_src);

    }


    // getCartInfo();

    // // 登录部分
    // // 点击 登录 跳转到 用户中心 注册页面
    // $('.to_log_btn').click(function(){
    // //$(document).on('click','.to_log_btn',function(){
    //    to_login_reg( uchost +'/login');
    // });

    // // 注册部分
    // // 点击 注册 跳转到 用户中心 注册页面
    // $('.to_reg_btn').click(function(){
    // //$(document).on('click','.to_reg_btn',function(){
    //     to_login_reg( uchost +'/reg');
    // });

    // 下载试用部分
    // 显示下载弹框
    $('.ps_left .li3 a').click(function(){



        if(!(uid&&clientid&&token)){

            to_login_reg(cjProtocol+'//user.mairuan.com/login');

            return;

        }

        

        // 获取下载试用软件信息

        getGoodsSofts(proalias);



        $('.reg_popup').hide();

        $('.login_popup').hide();

        $('.download_popup').show();

    });

    

    // 关闭下载弹框

    $('.download_popup .box .close').click(function(){       

        $('.download_popup').hide();

    }); 



    // 点击下载地址，计数

    $('.download_popup .main').on('click','.down_url',function(){

        var goodsid = $('.proalias').data('goodsid'),

            num = $(this).val();

        $.get(hostname2+'/update_goods_softs_num/goods_id/'+ goodsid + '/num/' +num,function(res){

            console.log(res);

        }); 

    });

// 下载试用包安装地址
    // 移动端不可下载
    var flagIsPhone = isPhone();
    if(flagIsPhone){
        $('[xz_gid]').text('请到PC端下载').css('background', '#bbb');
        if($('[xz_gzh_gid]').children('img').length > 0){
            return;
        }else{
            $('[xz_gzh_gid]').text('请到PC端下载').css('background', '#bbb');            
        }
    }

    // 需要扫码
    var SITE_ALIAS_JSON = {
        'cd':['CorelDRAW'],
        'mac':['pdfexpert','mycleanmymac','ntfs','Tuxera NTFS','CrossOver','BetterZip'],
        'vegas':['Vegas'],
        'edu':['mathtype','jihehuaban'],
        'mairuan':['PhotoZoom','zhzzx','zbrushcn','keyshot','iconworkshop','logoshejishi','shankejingling','hypersnap','Advanced Office Password Recovery','ABBYY'],
        'music':['Guitar','overturechina',''],
        'mind':['imindmap','mindmapper',]
    }

    var qrcode = {
        'cd':'//cdn.mairuan.com/cdn_old/mairuan1.1/images/QRcode/qrcode_cd.jpg',
        'mac':'//cdn.mairuan.com/cdn_old/mairuan1.1/images/QRcode/qrcode_mac.jpg',
        'vegas':'//cdn.mairuan.com/cdn_old/mairuan1.1/images/QRcode/qrcode_vegas.jpg',
        'edu':'//cdn.mairuan.com/cdn_old/mairuan1.1/images/QRcode/qrcode_edu.png',
        'mairuan':'//cdn.mairuan.com/cdn_old/mairuan1.1/images/QRcode/qrcode_mairuan.jpg',
        'music':'//cdn.mairuan.com/cdn_old/mairuan1.1/images/QRcode/qrcode_music.jpg',
        'mind':'//cdn.mairuan.com/cdn_old/mairuan1.1/images/QRcode/qrcode_mind.jpg'
    }       

    var qrcodeurl = '';
    var isNeedLogin = true;
    var special = ['CorelDRAW'];
    try{
        $.each(SITE_ALIAS_JSON,function(index, el) {
            if(el.indexOf(SITE_ALIAS) != -1){

                // 特殊处理：需要登录且会弹出二维码
                isNeedLogin = special.indexOf(SITE_ALIAS)!=-1?true:false;

                if(typeof(GZH_CODE_IMG)!="undefined"){             
                    qrcodeurl = GZH_CODE_IMG;
                }else{
                    qrcodeurl = qrcode[index];
                }
                return false;
            }
        });        
    }catch(err){
        // console.log(err)
    }

    $('[xz_gid]').click(function() {
        var _this = this;

        if(isPhone()) return;

        if(isNeedLogin){
            // 需要登录，弹出下载信息列表
            getUserInfo(function(data){
                var gid =   $(_this).attr('xz_gid');
                var pid =   $(_this).attr('xz_pid');

                var packages = gettrialpackage(gid);

                if(packages.length > 0){
                    var tr = ''
                    packages.forEach(function(i,v) {
                        tr += '<tr>'+
                                '<td class="w50p oh tal pl20">'+i.name+'</td>'+
                                '<td class="w30p">'+i.size+'</td>'+
                                '<td class="w20p"><a class="gdDowmloadBtn" data-uid="'+data.uid+'" data-gid="'+gid+'" data-pid="'+pid+'" data-url="'+i.url+'">下载</a></td>'+
                              '</tr>';
                    });

                    layer.open({
                        type: 1,
                        title: '下载试用包', 
                        skin: 'layui-layer-rim', //加上边框
                        area: ['650px', '350px'], //宽高
                        content:    '<table class="w100p tac mt20 mb20 lh40" style="color:#333;">'+tr+'</table>',
                    });
                }else{
                    layer.msg('暂无试用包');
                }
            },function(err) {
                if(err.code == 403){
                    var hereurl = location.href;
                    location.href = uchost+'/login?rediurl='+hereurl;
                }else{
                    layer.msg(err.message);
                }
            });  
            
        }else{
            // 不用登录，弹出下载信息列表
            var gid =   $(_this).attr('xz_gid');
            var packages = gettrialpackage(gid);
            if(packages.length > 0){
                var tr = ''
                packages.forEach(function(i,v) {
                    tr += '<tr>'+
                            '<td class="w50p oh tal pl20">'+i.name+'</td>'+
                            '<td class="w30p">'+i.size+'</td>'+
                            '<td class="w20p"><a class="gdDowmloadBtn" data-url="'+i.url+'">下载</a></td>'+
                          '</tr>';
                });

                layer.open({
                    type: 1,
                    title: '下载试用包', 
                    skin: 'layui-layer-rim', //加上边框
                    area: ['650px', '350px'], //宽高
                    content:    '<table class="w100p tac mt20 mb20 lh40" style="color:#333;">'+tr+'</table>',
                });
            }else{
                layer.msg('暂无试用包');
            }
        }
    });
    
    $(document).on('click', '.gdDowmloadBtn', function(event) {
        event.preventDefault();
        var _this = $(this);
        window.open(_this.data('url'));

        // 需要登录 
        if(isNeedLogin){
            addGendan(2,_this.data('uid'),_this.data('pid'),_this.data('gid'));    
        }

        // 不需要登录 或者 需要弹出二维码（特殊）
        if(!isNeedLogin||special.indexOf(SITE_ALIAS)!=-1){
            var layer_w,layer_h;

            if(typeof(GZH_CODE_IMG)=="undefined"){             
                layer_w = '344px';
                layer_h = '344px';
            }else{
                layer_w = typeof(o_img_w)!='undefined'? o_img_w : '500px';
                layer_h = typeof(o_img_h)!='undefined'? o_img_h : '500px';
            }

            layer.open({
                type: 1,
                title: false,
                closeBtn: 1,
                area: [layer_w, layer_h],
                skin: 'layui-layer-nobg', //没有背景色
                shadeClose: true,
                content: '<div class="pr"><img class="pa" src="'+qrcodeurl+'"/></div>'
            });   
        }
    });

// 退出登录

    // $('.top1 .tleft .exit_log').click(function(){

    //     layer.confirm('确定退出？',{icon: 3,title: '提示'},function(confirm){

    //         if(GetCookieValue('checkkey')){

    //             DelCookie('checkkey');

    //         }
            
    //         if(GetCookieValue('mobile')){

    //             DelCookie('mobile');

    //         }

    //         if(GetCookieValue('auth_token')){
                
    //             DelCookie('auth_token');

    //         }

    //         // var rediurl = location.href;

    //         // if(){

    //         // }
    //         to_login_reg(uchost+"/loginout");
    //         // location = encodeURI("http://user.mairuan.com/loginout?rediurl="+rediurl);

    //         // $.ajax({

    //         //     type: "POST",

    //         //     url: apihost + '/Login/logout',

    //         //     xhrFields : {

    //         //         withCredentials : true

    //         //     },

    //         //     success: function(res){

    //         //         layer.close(confirm);

    //         //         if(res.code == 200){

    //         //             if(GetCookieValue('checkkey')){

    //         //                 DelCookie('checkkey');

    //         //             }
                        
    //         //             if(GetCookieValue('mobile')){

    //         //                 DelCookie('mobile');

    //         //             }

    //         //             if(GetCookieValue('auth_token')){
                            
    //         //                 DelCookie('auth_token');

    //         //             }

    //         //             window.location.reload();

    //         //         }else{

    //         //             layer.msg(res.message);

    //         //         }

    //         //     },

    //         //     error : function(err){

    //         //         layer.close(confirm);

    //         //         console.log(err)

    //         //     }

    //         // });

    //     })

    // });

//------定义函数

    //定位 other_box
    function posi_other_box(){
        var g_box_height = $("#g_box").height();
        var other_box_height = $("#other_box").height();
        if(g_box_height>other_box_height){
            var winwidth = $(window).width();
            var scrolltop = $(window).scrollTop();
            //console.log('scrolltop:'+scrolltop);
            var mainpart_top = $('.mainpart').offset().top;
            //console.log('mainpart_top:'+mainpart_top);
            var static_fixed_height = $('.static-fixed-height').height();
            //console.log('static_fixed_height:'+static_fixed_height);
            var subcon_top = $(".subcon").offset().top;
            //console.log('subcon_top:'+subcon_top);
            var other_box_height = $("#other_box").height();

            //console.log('other_box-offset-top:'+$("#other_box").offset().top);

            if(scrolltop>(mainpart_top-static_fixed_height) && scrolltop<=(subcon_top-static_fixed_height-50-other_box_height)){
                $("#other_box").addClass("other_box_fixed");
                $("#other_box").removeClass("other_box_absolute");
                $("#other_box").css('top',static_fixed_height);
                $("#other_box").css('right',(winwidth-1200)/2);
                $("#other_box").css('bottom','auto');
            }else if(scrolltop>(subcon_top-static_fixed_height-50-other_box_height)){
                $("#other_box").removeClass("other_box_fixed");
                $("#other_box").addClass("other_box_absolute");
                $("#other_box").css('top','auto');
                $("#other_box").css('right','0px');
                $("#other_box").css('bottom','0px');
            }else{
                $("#other_box").removeClass("other_box_fixed");
                $("#other_box").removeClass("other_box_absolute");
                $("#other_box").css('top','auto');
                $("#other_box").css('right','auto');
                $("#other_box").css('bottom','auto');
            }
        }else{
            $("#other_box").removeClass("other_box_fixed");
            $("#other_box").removeClass("other_box_absolute");
            $("#other_box").css('top','auto');
            $("#other_box").css('right','auto');
            $("#other_box").css('bottom','auto');
        }
    }

    // 组成 点击登录、注册事件的跳转地址

    function to_login_reg(host){
        var url = location.href;
        location.href = host + '?rediurl='+ url;
    }

    //重载扫码登录
    function loadqrcode(){
        var loading = layer.load();
        $.ajax({
            method: 'POST',
            url: API + '/Logintc/index',
            data: {},
            dataType: 'json',
            xhrFields:{
                withCredentials:true
            },
            success: function(res){
                layer.close(loading);
                if(res.code==200){
                    $('.loginbox_bg').show();
                    $('.login_box_saoma').show();
                    $('.login_box_mobile').hide();
                    $('.login_box_reg').hide();
                    $('.qrcode_imgurl').show();
                    $('#refreshbtn').hide();
                    $('.qrcode_imgurl').attr('src',res.data.qrcode_imgurl);
                    $.cookie('qrid',res.data.qrid,{path: '/'});
                    checksm(timerlin);
                }else{
                    layer.msg(res.message,{time:1000,shift:-1});
                    return;
                }
            },
            error: function(err){
                layer.close(loading);
                return;
            }
        });
    }

    //手机验证码登录
    function loadmobile(){
        $('.loginbox_bg').show();
        $('.login_box_saoma').hide();
        $('.login_box_mobile').show();
        $('.login_box_reg').hide();
        $('.login_box_mobile .tab_mobile').addClass("active");
        $('.login_box_mobile').find('#log_form1').show();
        $('.login_box_mobile .tab_account').removeClass("active");
        $('.login_box_mobile').find('#log_form2').hide();
    }

    function checksm(){
        // 轮询扫码结果
        var deadline = new Date().getTime() + 60000;
        timerlin = setInterval(function(){
            var nowtime = new Date().getTime();
            if(nowtime>deadline){
                clearInterval(timerlin);
                $('#refreshbtn').show().prev('img').hide();
            }
            var datas = {qrid:$.cookie('qrid')};
            $.ajax({
                method: 'POST',
                url: API + '/Checksm/index',
                data: datas,
                dataType: 'json',
                xhrFields:{
                    withCredentials:true
                },
                success: function(res){
                    if(res.code==200){
                        var data = res.data;
                        clearInterval(timerlin);
                        $('#qrcode_form1').hide();
                        $('#qrcode_form2').show();
                        $('#qrcode_form2 .headpic img').attr('src',data.headimg);
                        $('#qrcode_form2 .nickname').text(data.nickname);
                        var loading = layer.load();
                        setTimeout(function(){
                            layer.close(loading);
                            var datanew = data.new;
                            if(datanew == 0){
                                $.cookie('auth_token',res.auth_token,{path: '/'});
                                location.reload();
                            }else if(datanew == 1){
                                $('#qrcode_form2').hide();
                                $('#qrcode_form3').show();
                            }
                        },3000)
                    }
                },
                error: function(err){
                    return;
                }
            });
        },1000);
    }



    // 获取指定cookie

    function getCookie(cookieName) {

        var strCookie = document.cookie; 

        var arrCookie = strCookie.split("; ");

        for(var i = 0; i < arrCookie.length; i++){

            var arr = arrCookie[i].split("=");

            if(cookieName == arr[0]){

                return arr[1];

            }

        }

        return "";

    }



    // 获取验证码(手机短信或邮箱)

    function getYzm(yzm_User ,yzm_img, _this){

        var yzm_url = '';

        var param = {};

        var imgyzmkey = getCookie('imgyzmkey');



        if(!regImg.test(yzm_img)){

            layer.msg('请输入合法图片验证码');

            return;

        }

        if(!imgyzmkey){

            console.log("图片验证cookie不合法");

            return;

        }



        if(regPhone.test(yzm_User)){

            yzm_url = '/Yzm/mobilesend';

            param = {

                mobile : yzm_User,

                imgyzm : yzm_img,

                imgyzmkey : imgyzmkey

            }

        }

        else if(regEmail.test(yzm_User)){

            yzm_url = '/Yzm/emailsend';

            param = {

                email : yzm_User,

                imgyzm : yzm_img,

                imgyzmkey : imgyzmkey

            }

        }

        else{ 

            layer.msg('请输入有效的手机号或邮箱');

        }



        if(yzm_url){

            

            $.ajax({

                type: "POST",

                url: apihost + yzm_url,

                data: param,

                xhrFields : {

                    withCredentials : true

                },

                success: function(res){

                    if(res.code!=200){

                        layer.msg(res.message);  

                    }

                    if(res.code==200){ 

                        settime($(_this));

                    }

                },

                error : function(err){

                    console.log(err)

                }

            });          

        }

    }

    // 获取用户信息

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



    // 获取各类订单数量

    function getOrdersNum(callback){

        $.ajax({

            type: 'post',

            url: apihost + '/user/info',

            xhrFields:{

                withCredentials: true

            },

            success: function(res){

                callback != undefined && callback(res);

            },

            error:function(err){

                console.log(err)

            }

        });

    }



    // 发送验证码暂停：定时器读秒

    function settime(obj) { //发送验证码倒计时 
        if (countdown == 0) { 
            obj.css('background-color','').attr('disabled',false).val("获取验证码");
            countdown = 60; 
            return;
        } else {
            obj.css('background-color','#d0d0d0').attr('disabled',true).val("重新发送(" + countdown + ")");
            countdown--; 
        }
        setTimeout(function(){settime(obj)},1000); 
    }

    // 设置cookie
    function setCookie(name,value){ 
        var Days = 30; 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
        document.cookie = name + "="+ value + ";expires=" + exp.toGMTString()+";path=/";
    }


    //获取cookie

    function GetCookieValue(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }



    // 删除某个cookie

    function DelCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var cval = GetCookieValue(name);
        document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
    }



    // 判断购物车是否为空，为空不现实数字

    function showCartNum(sum){

        sum = sum>99 ? '···':sum; 

        if(sum == 0){

            $('.ps_left .li2 .n3').hide().animate({

                width: '0px',

                height: '0px'

            },300).text('');



        }else{

            $('.ps_left .li2 .n3').show().animate({

                width: '16px',

                height: '16px'

            },300).text(sum);

        }        

    }



    // ajax获取下载试用软件信息，并生成dom

    function getGoodsSofts(p){ 



        $.get( hostname2 + '/get_goods_softs/proalias/'+ p,function(res){

            var data = res[""];

            var str = '';

            if(data.trial_32_url){

                str +=   "<div>"+

                            "<a value='32' class='down_url fr' href='"+data.trial_32_url+"'>下载</a>"+

                            "<p class='name'>"+data.trial_32_name+"</p>"+

                            "<p>"+

                                "<span class='size'>文件大小：<font>"+data.trial_32_size+"</font></span>"+

                            "</p>"

                        "</div>";

            }

            if(data.trial_64_url){

                str +=   "<div>"+

                            "<a value='64' class='down_url fr' href='"+data.trial_64_url+"'>下载</a>"+

                            "<p class='name'>"+data.trial_64_name+"</p>"+

                            "<p>"+

                                "<span class='size'>文件大小：<font>"+data.trial_64_size+"</font></span>"+

                            "</p>"

                        "</div>";

            }



            if(data.trial_32_url || data.trial_64_url){

                str = "<div class='proalias' data-goodsid=" + data.id + ">" +

                        str + 

                        "</div>";



            }

            $('.download_popup .main').html(str);

        });

    }

    // 添加跟单
    // sourceid: 1未付款订单2试用下载9申请购买
    function addGendan(sourceid,uid,pid,gid) {
        var param ={'sourceid':sourceid ,'user_id':uid, 'info':{}};
        param['info'][pid] = gid;
        $.ajax({
            url: GD_API,
            type: 'POST',
            data: 'gdinfo='+JSON.stringify(param),
            xhrFields: {
                    withCredentials:true
                },
        })
        .done(function(data) {
            console.log(data);
        })
        .fail(function(err) {
            console.log(err);
        });
        
    }


    // 获取试用包下载地址
    function gettrialpackage(gid) {
        var url;
        $.ajax({
            url: apihost+'/download/trialpackagelist',
            type: 'GET',
            async: false,
            contentType: 'application/x-www-form-urlencoded',
            data: {goodsid:gid},
        })
        .done(function(data){
            if(data.code == 200){
                url = data.data.trialpackagelist;
            }else{
                layer.msg(data.message);
                url = '';
            }
        });
        return url
    }

    // 判断是不是移动端
    function isPhone() {
        if(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent)){
            return true;
        }else{
            return false;
        }
    }


});



    // 滚动购物车到顶、底时，阻止页面滚动

    $.fn.scrollUnique = function(){

        return $(this).each(function(){

            var eventType = 'mousewheel';

            if(document.mozHidden!==undefined){

                eventType = 'DOMMouseScroll';

            }

            $(this).on(eventType,function(event){

                var scrollTop = this.scrollTop,

                    scrollHeight = this.scrollHeight,

                    height = this.clientHeight;

                var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detial || 0);



                if((delta>0 && scrollTop<=delta) || (delta<0 && scrollHeight - height - scrollTop <= -1 * delta)){

                    this.scrollTop = delta > 0? 0: scrollHeight;

                    event.preventDefault();

                }   

            });

        });

    }