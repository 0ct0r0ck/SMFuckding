$(function() {
	var TOKEN = $.cookie('auth_token');
    if(TOKEN){
        $.ajaxSetup({
            data: {auth_token:TOKEN},
        });        
    }
});
