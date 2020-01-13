$(function(){
    $(".evaluate-btn").off().on("click", function() {
		$("#evaluateHTML").show();
	});

	function evaluate() {
		var html = '<div class="ui-pop order-pop" id="evaluateHTML" style="display:none;"><div class="content"><div class="close evaluate-close">×</div><div class="order-wrap"><div class="inner"><div class="title"><h3><img src="images/logo2.png" alt=""></h3></div>';
		html += '<div class="row"><input type="text" class="inputt" placeholder="您的手机号码" name="phone" /><div class="get-code captchaimg" style="display:;width:70px;height:20px;top:10px;">获取验证码</div></div>';
		html += '<div class="row"><input type="text" class="inputt" placeholder="输入验证码" name="captcha" /></div>';
		html += '<div class="btn-wrap"><a href="javascript:;" class="ui-button evaluate-submit">登录</a></div>';
		html += '<input type="hidden" name="captchaid" class="captchaid">';
		html += '</div></div></div></div>';

		var evaluateHtml = document.getElementById("evaluateHTML");
    	if (!evaluateHtml) {
    		$("body").append(html);
    	}
    	evaluateEvent();
    }
    function evaluateEvent() {
		$(".ui-select").off().on("click", function() {
			$(".ui-select").removeClass("active");
			$(this).addClass("active");
		});

		$(".evaluate-close").off().on("click", function() {
			$("#evaluateHTML").hide();//隐藏 
		});

		// 点击非选择区域 关闭选项
	    $(document).mouseup(function(e){
	      var _con = $(".ui-select");
	      if(!_con.is(e.target) && _con.has(e.target).length === 0) { 
	          $(".ui-select").removeClass("active");
	      }
	    });
    }
    evaluate();
})