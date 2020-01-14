$(function () {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    var uid = $.getUrlParam('id');
    var name = $.getUrlParam('name');
    var resc = location.search.slice(1);
    console.log(name)
    $(".list_h2").html(name+">");
    $.ajax({
        type: "get",
        url: "http://118.25.191.234/tingyouqu/product/detail",
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
    //         <img class="tupian" src="http://118.25.191.234${img1}" alt="">       
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
        var list_img = res.data.product[0].images.slice(0,4)
        for (var i = 0; i < list_img.length; i++) {

            image_list = list_img
        }
        // console.log(list_img.slice(4))
        console.log(res)
        console.log(list_img)
        var image_list = list_img.map(function (item) {
            console.log(item)
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
            return `
                 <p>${item.name}</p>
                  <p>${item.brandName}</p>
                <img class="shanbiao" src="http://118.25.191.234${item.brandImage}" alt="">`;
        }).join("");
        $(".explain_a").html(list_name);
    }
    function params(res){
        var params = res.data.params
        console.log(params);

        var productsParams = {};
        for (var i in params) {
          console.log(typeof(params[i]));
          productsParams[i] = []
        //   for (var j = 0, len = params[i].length; j < len; j++) {
            // console.log(j);
           productsParams[i].push(params[i] == "null" || params[i] == "" ? '--' : params[i])
     
        //  }
        }
        console.log(productsParams);

        con = "";
        coc= ""
             $.each(productsParams, function(index, item){
               con += "<li>"+index+"</li>";
            });
            $.each(productsParams, function(index, item){
                coc += "<li>"+item+"</li>";
             });
            $(".model_a").html(con); //把内容入到这个div中即完成
            $(".model_b").html(coc); //把内容入到这个div中即完成
    }
    $.ajax({
        type: "get",
        url: "http://118.25.191.234/tingyouqu/product/guess",
        dataType: "json",
        data: {
            id: 1
        },
        success: function (res) {
            // console.log(res);
            var love_list = res.data.list

            console.log(love_list)
            var rel = love_list.map(function (item) {
                var img = (item.images).split(",")[0];//切割图片
                return `     <li data-id="${item.id}">
                <img src="http://118.25.191.234${img}" alt="">
                <p>${item.name}</p>
                <p>ECO-TENDER</p>
                    </li>`;
            }).join("");
            // console.log(rel);
            $(".other_list").html(rel);
        }

    })
   
    $(".other_list").on("click", "li", function () {
        // var uid = this.getAttribute('data-id');  
        var uid = $(this).attr("data-id");
        // console.log(uid);
        location.href = "details.html?id=" + uid;

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