$(function () {
    let url = 'http://118.25.191.234/tingyouqu'
    // let url = 'http://chinaboatfun.com/api'
    // 图片：http://chinaboatfun.com
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    var uid = $.getUrlParam('id');
    var name = $.getUrlParam('name');
    var resc = location.search.slice(1);
    console.log(name)
    console.log(uid)
    $(".list_h2").html(name+">");
    $.ajax({
        type: "get",
        url: url + "/product/detail",
        dataType: "json",
        data: {
            id: uid
        },
        success: function (res) {
            console.log(res);
            // create1(res)
            create2(res)
            create3(res)
            product_name(res)
            params(res)
            image_list(res)
        }

    })
    function product_name(res){
        var product_name = res.data.product[0].name
        $(".yt_name").html(product_name);
    }
    // function create1(res) {
    //     var list_product = res.data.product
    //     var list_product = list_product.map(function (item) {
    //         var img1 = (item.images)[0];//切割图片
    //         return `
    //         <img class="tupian" src="http://chinaboatfun.com${img1}" alt="">       
    //         <div class="img-title">
    //             <img src="images/suosuo2.png" alt="">
    //             <div>查看图片</div>
    //         </div>`;
    //     }).join("");
    //     $(".tupian_a").html(list_product);
    // }

    function create3(res) {
        var list_product = res.data.product
        var list_content = list_product.map(function (item) {

            return `<li>${item.content}</li>
            `;
        }).join("");

        $(".letter_a").html(list_content);
    }

    function image_list(res) {
        var image_list = []
        var list_img = res.data.product[0].images.slice(0,8)
        for (var i = 0; i < list_img.length; i++) {

            image_list = list_img
        }
        // console.log(list_img.slice(4))
        console.log(res)
        console.log(list_img)
        var image_list = list_img.map(function (item) {
            return `          <div class="cover">
            <img class="tupian" src="http://118.25.191.234${item}" alt="">
            <div class="img-title">
                <img style="width: 28px;height: 28px;" src="images/suosuo2.png" alt="">
                <div>查看图片</div>
            </div>

        </div>
       `;
        }).join("");

        $(".tupian_a").html(image_list);
    }
    function create2(res) {
        var list_product = res.data.product
        console.log(list_product)
        var list_name = list_product.map(function (item) {
            if(item.model == null){
                item.model = ''
              }
            return `
                 <p>${item.model}</p>
                  <p>${item.name}</p>
                <img class="shanbiao" src="http://118.25.191.234${item.brandImage}" alt="">
                <div class="mone">￥${item.price/10000}万</div>`;
        }).join("");
        $(".explain_a").html(list_name);
    }
    function params(res){
        var params = res.data.params
    
        // var productsParams = {};
        for(var key in params) {
            if(params[key] === '' || params[key]=== 'null'|| params[key]== null) {
              delete params[key]
            }
         }
         if((Object.keys(params).length) < 7){
            $('.more').css("display","none")
            $('.sdsd').css("display","none")
        }
        // for (var i in params) {
        //   console.log((params[i]));  
        //   productsParams[i] = []
        //    productsParams[i].push(params[i] == "null" || params[i] == "" ? '--' : params[i])
     
        // //  }
        // }
        console.log(params);
        // console.log(productsParams);

        con = "";
        coc= ""
             $.each(params, function(index, item){
               con += "<li class='idxx'><div> "+index+"</li>";
            });
            $.each(params, function(index, item){
                coc += "<li class='itmm'>"+item+"</li>";
             });
            $(".model_a").html(con); //把内容入到这个div中即完成
            $(".model_b").html(coc); //把内容入到这个div中即完成
    }
    
    $.ajax({
        type: "get",
        url: url + "/product/guess",
        dataType: "json",
        data: {
            id: uid,
            plat:'web'
        },
        success: function (res) {
            // console.log(res);
            var love_list = res.data.list

            console.log(love_list)
            var rel = love_list.map(function (item) {
                var img = (item.images).split(",")[0];//切割图片
                if(item.model == null){
                    item.model = ''
                  }
                return `     <li data-id="${item.id}">
                <div class="imgcc"><img src="http://118.25.191.234${img}" alt=""></div>
                <p>${item.model}</p>
                <p>${item.name}</p>
                <p class="ck">参考价</p>
                <p class="mone">￥${item.price/10000}万</p>
                    </li>`;
            }).join("");
            // console.log(rel);
            $(".other_list").html(rel);
        }

    })
    $(".more").on("click", function () {
        // console.log('uid');:gt(index)
     
        if ($(".idxx:gt(7)").css("display") == "none") {
            $('.idxx:gt(7)').show(600)
            $('.itmm:gt(7)').show(600)
            $(".imcg").attr("src","images/cs2.png");
        }else{
            $('.idxx:gt(7)').hide(600)
            $('.itmm:gt(7)').hide(600)
            $(".imcg").attr("src","images/cs1.png");
        }
          console.log($('.idxx:gt(7)'))

    })
    $(".other_list").on("click", "li", function () {
        // var uid = this.getAttribute('data-id');  
        var uid = $(this).attr("data-id");
        // console.log(uid);
        location.href = "details.html?id=" + uid+"&name=" +name;

    })
    //数据渲染
    // function create(res) {
    //     var arr = JSON.parse(res.data.list);//把数据转成对象
    //     console.log(arr)
    //     // var rel = res.map(function (item) {
    //     //     //图片
    //     //     // var img1 = (item.img).split("&")[0];//切割图片
    //     //     // var img2 = (item.img).split("&")[1];//切割图片
    //     //     // var img3 = (item.img).split("&")[2];//切割图片
    //     //     // console.log(img1, img2, img3);
    //     //     return `
    //     //             <h3>
    //     //                 <span style="color: #ff4482;">今日特卖</span>
    //     //                 ${item.content}
    //     //             </h3>`

    //     // }).join("");
    //     // $(".mian3").html(rel);
    // }






    // $('.videolist').each(function () { //遍历视频列表
    //     // $(this).hover(function(){ //鼠标移上来后显示播放按钮
    //     //     $(this).find('.videoed').show();
    //     // },function(){
    //     //     $(this).find('.videoed').hide();
    //     // });
    //     $(this).click(function () { //这个视频被点击后执行
    //         console.log('123')
    //         var img = $(this).attr('vpath');//获取视频预览图
    //         var video = $(this).attr('ipath');//获取视频路径
    //         $('.videos').html("<video id=\"video\" poster='" + img + "' style='width: 1200px;height: 570px;' src='" + video + "' preload=\"auto\" controls=\"controls\" autoplay=\"autoplay\"></video><img onClick=\"close1()\" id=\"vclose\" src=\"images/close_black.png\" width=\"25\" height=\"25\"/>");
    //         $('.videos').show();
    //     });
    // });

    // function close1(){
    //     var v = document.getElementById('video');//获取视频节点
    //     $('.videos').hide();//点击关闭按钮关闭暂停视频
    //     v.pause();
    //     $('.videos').html();
    // }
    //图片查看
    $('.image-list').on('click', '.cover', function () {
        var this_ = $(this);
        var images = this_.parents('.image-list').find('.cover');
        var imagesArr = new Array();
        $.each(images, function (i, image) {
            imagesArr.push($(image).children('img').attr('src'));
        });
        $.pictureViewer({
            images: imagesArr, //需要查看的图片，数据类型为数组
            initImageIndex: this_.index() + 1, //初始查看第几张图片，默认1
            scrollSwitch: true //是否使用鼠标滚轮切换图片，默认false
        });
    });




})