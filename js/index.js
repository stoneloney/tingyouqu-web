$(function(){
    $.ajax({
        type: "get",
        url: "http://118.25.191.234/tingyouqu/channel/index",
        dataType: "json",
        success: function (res) {
            console.log(res);
            create1(res)

        }

    })
    function create1(res) {
        console.log(res);
        var index_list = res.map(function (item) {
            console.log(item);
            return `               <li class="img" data-id="${item.id}" data-name="${item.name}">
            <img class="img_a" src="http://118.25.191.234${item.image}" alt="">
            <div class="name">${item.name}</div>
            <div class="img-title">
                <img src="images/suosuo2.png" alt="">
                <div>${item.name}</div>
            </div>
        </li>`;
        }).join("");
        $(".list_ul").html(index_list);

    }
      // 轮播图
    //   carousel(
    //     $('.demo1'), //必选， 要轮播模块(id/class/tagname均可)，必须为jQuery元素
    //     {
    //         type: 'fade', //可选，默认左右(leftright) - 'leftright' / 'updown' / 'fade' (左右/上下/渐隐渐现)
    //         arrowtype: 'move', //可选，默认一直显示 - 'move' / 'none'  (鼠标移上显示 / 不显示 )
    //         autoplay: true, //可选，默认true - true / false (开启轮播/关闭轮播)
    //         time: 5000 //可选，默认3000
    //     }
    // );
    // $(".shousuo2").click(function () {
    //     var val = $('.inpt2').val()
    //     console.log(val)
    //     if($('.inpt2').val() == ''){
    //         alert("搜索不能为空");
    //     }else{
    //         location.href = "shousuo_list.html?val=" + val;
    //     }
    
    // })

    $(".list_ul").on("click", "li", function () {
        // var uid = this.getAttribute('data-id');  
        var uid = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        // console.log(uid);
        location.href = "list.html?id=" + uid +"&name=" +name;

    })
})