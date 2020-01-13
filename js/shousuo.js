$(function () {
        $(".shousuo").click(function () {
            var val = $('.inpt').val()
            console.log(val)
            if($('.inpt').val() == ''){
                alert("搜索不能为空");
            }else{
                location.href = "shousuo_list.html?val=" + val;
            }
        
        })

})