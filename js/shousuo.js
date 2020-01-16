$(function () {
        $(".shousuo").click(function () {
            var val = $('.inpt').val()
            console.log(val)
            if($('.inpt').val() == ''){
                // alert("搜索不能为空");
            }else{
                location.href = "shousuo_list.html?val=" + val;
            }
        
        })
        $(window).on('scroll',function(){
            var scrollTop = $(window).scrollTop();//获取当前滑动的位置
            if (scrollTop > 0) {
                $(".navbar").addClass("active");
            } else {
                $(".navbar").removeClass("active");

            }

        })

})