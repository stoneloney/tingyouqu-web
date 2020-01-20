$(function () {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
    var uid = $.getUrlParam('id');
    var name = $.getUrlParam('name');
    $(".list_h1").html(name);
    $(".list_h2").html(name);
    console.log(name)
    console.log(uid)
    var page = 1;//第几页开始
    var pagenum = 8;//每一页的数量
    var count;//总条数
    var pagecount;
    init(1);
    function init(page) {
        $.ajax({
            type: "get",
            url: "http://chinaboatfun.com/api/product/index",
            dataType: "json",
            async: false,
            data: {
                id: uid,
                plat: 'web',
                page: page, // 页码
                pagenum: pagenum  // 数量

            },
            success: function (res) {
                if (res.data.productList.length == 0) {
                    $(".option_div").css('display', 'none')
                    $(".list_h1").html('没有相关产品哦~').css({ "text-align":"center",'font-size': '16px','margin-top': '50px'});
                }
                console.log(res.data);
                create1(res)
                create2(res)
                paramsList = res.data.paramsList
                pagecount = res.count
            }
        })
    }
    //渲染数据
    function create1(res) {
        var productList = res.data.productList
        console.log(productList);
        var productsParams = [];
        for (var i in productList) {
          console.log(productList[i].model);
        //   productsParams[i] = []
        //   for (var j = 0, len = params[i].length; j < len; j++) {
            // console.log(j)
           productsParams.push(productList[i].model == "null" ? '--' : productList[i])
     
        //  }
        }
        console.log(productsParams);
        var productList = productList.map(function (item) {
            var img1 = (item.images)[0];//切割图片
            if(item.model == null){
              item.model = ''
            }
            return `
            <li data-id="${item.id}">
                  <div class="div_img"><img class="list_img" src="http://chinaboatfun.com${img1}" alt=""></div>
                        <p class="tex1">${item.model}</p>
                        <p class="tex2">${item.name}</p>                     
                        <div class="tex3_a"><img class="tex3" src="http://chinaboatfun.com${item.brandImage}" alt="">  </div>
                        <p class="ck">参考价</p>
                        <p class="tex4">￥${item.price/10000}万</p>
                    </li>`;
        }).join("");
        $(".list_a").html(productList);
        count = Math.ceil(res.count / pagenum);
    }

    //渲染数据
    function create2(res) {
        var paramsList = res.data.paramsList
        var paramsList = paramsList.map(function (item) {
            var options = item.options

            var str = '';
            for (var i = 0; i < options.length; i++) {
                $("#cc").data("bigimg");
                str += '<label class="eec"><input type="checkBox" class="eec2" name="check"  data-cid=' + options[i].id + ' value=' + options[i].id + ' data-cname=' + options[i].name + '><span>' + options[i].name + "</span></label>"

            }
            return ` <div class="option_a" data-id="${item.id}">
            <div class="option_name" data-id="${item.id}" data-name="${item.name}:">
            <p class="id_name">${item.name}</p>
            <div class="back_img"></div>
            </div>
            <div class="xuanxian" data-id="${item.id}">
                <div class="checkBox" id="box">
                ${str}
      
                </div>
                <div class="anniu">
                    <button class="quxiao">取消</button>
                    <button class="queding">确定</button>
                </div>
            </div>
        </div>`;
        }).join("");
        $(".option").html(paramsList);

    }
    //点击显示隐藏
    var cID
    var nameval
    $(".option_name").click(function (e) {
        $(".option_cd").find('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')
        $(".option_cd").find('.id_name').css('color', 'rgba(3,18,54,1)')

        if ($(".xuanxian").eq($(this).parent().index()).css("display") == "none") {

            $('.id_name').eq($(this).parent().index())
                .css('color', 'rgba(13, 94, 255, 1)')
                .parent().parent().siblings('').find('.option_name').find('.id_name').css('color', 'rgba(3,18,54,1)')
            $('.back_img').eq($(this).parent().index())
                .css('background', 'url("images/gdxiala2.png") #fff no-repeat 0 12px')
                .parent().parent().siblings('').find('.option_name').find('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')
            $('.xuanxian').eq($(this).parent().index())
                .show()
                .parent().siblings().find('.xuanxian')
                .hide();
            $(".xuanxian2").css('display', 'none')
            var id = $(this).data("id");
            var name = $(this).data("name");
            cID = id
            nameval = name
        } else {
            $('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')
            $('.id_name').css('color', 'rgba(3,18,54,1)')
            $(".xuanxian").hide();
            $(".xuanxian2").css('display', 'none')

        }
        console.log(nameval)
    });
    $(".option_cd").click(function (e) {
        $(".xuanxian").hide();
        $('.option_name').find('.id_name').css('color', 'rgba(3,18,54,1)')
        $('.option_name').find('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')

        if ($(".xuanxian2").css("display") == "none") {
            $('.xuanxian2').css('display', 'block')
            $(".option_cd").find('.back_img').css('background', 'url("images/gdxiala2.png") #fff no-repeat 0 12px')
            $(".option_cd").find('.id_name').css('color', 'rgba(13, 94, 255, 1)')

        } else {
            $(".xuanxian2").hide();
            $(".option_cd").find('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')
            $(".option_cd").find('.id_name').css('color', 'rgba(3,18,54,1)')
        }
    });


    //点击存勾选id 和name
    var paramsList;
    console.log(paramsList)
    var selectedParams = []//存筛选id 和cid
    var selecname = {}//存筛选idname 和cidname
    $(".eec2").click(function (e) {
        var id = $(this).data("cid");
        var cname = $(this).data("cname");
        // var dd =[]
        if ($(this).prop("checked") == true) {

            var selectPindex = String(cID);
            var selectPcname = String(nameval);
            if (typeof selecname[selectPcname] == "undefined") {//添加名字
                selecname[selectPcname] = [];
            }
            selecname[nameval].push(cname);

            if (typeof selectedParams['params_' + selectPindex] == "undefined") {//添加id
                selectedParams['params_' + selectPindex] = [];
            }
            selectedParams['params_' + selectPindex].push(id);
            // selectedParams.push(dd)
            // console.log(dd);
            console.log(selectedParams);
            console.log(selecname)
      


        } else {
            console.log("未勾选");
            // 删除指定参数
            var selectPindex = String(cID);
            var selectPcname = String(nameval);
            var arrIndex = selecname[selectPcname].indexOf(cname);
            if (arrIndex > -1) {
                selecname[selectPcname].splice(arrIndex, 1);
            }

            var arrIndex = selectedParams['params_' + selectPindex].indexOf(id);
            console.log(arrIndex)
            if (arrIndex > -1) {
                selectedParams['params_' + selectPindex].splice(arrIndex, 1);
            }
        
            console.log(selectedParams);
            console.log(selecname);
        }
    });
    console.log(cID)

    //点击外面 隐藏下拉菜单
    $(document).click(function (e) {
        if (!$(e.target).is('.option_a')) {
            var e = e || window.event;
            var elem = e.target || e.srcElement;
            while (elem) {
                if (elem.className && elem.className === 'option_a') {
                    return;
                }
                elem = elem.parentNode;
            }
            $('.xuanxian').css('display', 'none');
            $('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')
            $('.id_name').css('color', 'rgba(3,18,54,1)')
            $(".xuanxian2").hide();
        }
    });

$(".quxiao").click(function(){
    $('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')
    $('.id_name').css('color', 'rgba(3,18,54,1)')
    $(".xuanxian").hide();
    $(".xuanxian2").css('display', 'none')
})

// var selecname = {}
    //点击筛选功能
    $(".queding").click(function () {
        $('.back_img').css('background', 'url("images/gdxiala.png") #fff no-repeat 0 12px')
        $('.id_name').css('color', 'rgba(3,18,54,1)')
        $(".xuanxian").hide();
        $(".xuanxian2").css('display', 'none')
     if($(".length_m_min").val() || $(".length_m_max").val() || $(".length_ft_min").val() || $(".length_ft_max").val() != ''){
      
         var name = $('.xuanxian2').data("name")
         var selectPcname = String(name);
         if (typeof selecname[selectPcname] == "undefined") {//添加名字
            selecname[selectPcname] = [];
        }
         console.log(name)
         selecname[name]
     }
     console.log(selecname)
        var params = "";
        for (let i in selectedParams) {
            params += i + '=' + selectedParams[i].join(',') + '&';
        }
        var con = "";
   
        $.each(selecname, function (index, item) {
            con += "<div class='lassify_a' data-name=" + index + "><p>" + index + '' + item + "</p><img class='bindimg' data-name=" + index + " src='images/shancu.png' alt=''/></div>";

        });
  
        $(".classify").html(con);
        console.log(params)

        $.ajax({
            type: "get",
            url: "http://chinaboatfun.com/api/product/screen?" + params,
            dataType: "json",
            async: false,
            data: {
                channelid: uid,
                plat: 'web',
                page: page, // 页码
                pagenum: pagenum,  // 数量
                length_m_min:$(".length_m_min").val(),    // 最小长度  单位m
                length_m_max:$(".length_m_max").val(),   // 最大长度  单位m
                length_ft_min:$(".length_ft_min").val(),    // 最小长度  单位ft
                length_ft_max:$(".length_ft_max").val()    // 最小长度  单位ft

            },
            success: function (res) {
                console.log(res.data)
                if(res.data.length == 0){
                    $(".cpnode").css('display', 'block')
                    console.log('asd')
                }else{
                    $(".cpnode").css('display', 'none')
                }
                var productList = res.data.map(function (item) {
                    var img1 = (item.images)[0];//切割图片
                    if(item.model == null){
                        item.model = ''
                      }
                    return `
                    <li data-id="${item.id}">
                          <div class="div_img"><img class="list_img" src="http://chinaboatfun.com${img1}" alt=""></div>
                                <p class="tex1">${item.model}</p>
                                <p class="tex2">${item.name}</p>
                                <div class="tex3_a"><img class="tex3" src="http://chinaboatfun.com${item.brandImage}" alt="">  </div>
                                <p class="ck">参考价</p>
                                <p class="tex4">￥${item.price/10000}万</p>
                            </li>`;
                }).join("");
              
                $(".list_a").html(productList);
                count = Math.ceil(res.count / pagenum);
                console.log(count)
                pagecount = res.count
                if(count = 1){
                    $("#page").css('display', 'none')
                }
                $("#page").paging({
                    pageNum: 1, // 当前页面
                    totalNum: count, // 总页码
                    totalList: pagecount, // 记录总数量
                    callback: function (num) { //回调函数
                        // console.log(num); 
                        window.scrollTo(0, 0);
                        init(num);
                    }
                });
            }
        })

    });
    //点击删除勾选
    $(".classify").on("click", ".bindimg", function () {
        var name = $(this).data("name")
        let index = $(this).parent().index();
        console.log(index);

       
            $(".option_name[data-name='"+$(this).data("name")+"']").siblings('.xuanxian').find("input[name='check']").prop("checked", false);

            var iddd = 'params_' + $(".option_name[data-name='"+$(this).data("name")+"']").siblings('.xuanxian').data("id")
            console.log(iddd);

       $(".xuanxian2[data-name='"+$(this).data("name")+"']").find("input[name='val']").val("")
        delete selectedParams[iddd];
        delete selecname[name];
        $(this).parent().remove();
        console.log(selectedParams)
        console.log(selecname)

        var params = "";
        for (let i in selectedParams) {
            params += i + '=' + selectedParams[i].join(',') + '&';
        }

        $.ajax({
            type: "get",
            url: "http://chinaboatfun.com/api/product/screen?" + params,
            dataType: "json",
            async: false,
            data: {
                channelid: uid,
                plat: 'web',
                page: page, // 页码
                pagenum: pagenum,  // 数量
                length_m_min:$(".length_m_min").val(),    // 最小长度  单位m
                length_m_max:$(".length_m_max").val(),   // 最大长度  单位m
                length_ft_min:$(".length_ft_min").val(),    // 最小长度  单位ft
                length_ft_max:$(".length_ft_max").val()    // 最小长度  单位ft

            },
            success: function (res) {
                console.log(res.data)
                if(res.data.length == 0){
                    $(".cpnode").css('display', 'block')
                    console.log('asd')
                }else{
                    $(".cpnode").css('display', 'none')
                }
                var productList = res.data.map(function (item) {
                    var img1 = (item.images)[0];//切割图片
                    if(item.model == null){
                        item.model = ''
                      }
                    return `
                    <li data-id="${item.id}">
                          <div class="div_img"><img class="list_img" src="http://chinaboatfun.com${img1}" alt=""></div>
                                <p class="tex1">${item.model}</p>
                                <p class="tex2">${item.name}</p>
                                <div class="tex3_a"><img class="tex3" src="http://chinaboatfun.com${item.brandImage}" alt="">  </div>
                                <p class="ck">参考价</p>
                                <p class="tex4">￥${item.price/10000}万</p>
                            </li>`;
                }).join("");
                $(".list_a").html(productList);
                count = Math.ceil(res.count / pagenum);
           
                pagecount = res.count
                console.log(count)
                if(count != 1){
            
                    $("#page").css('display', 'block')
                    $("#page").paging({
                        pageNum: 1, // 当前页面
                        totalNum: count, // 总页码
                        totalList: pagecount, // 记录总数量
                        callback: function (num) { //回调函数
                            // console.log(num); 
                            window.scrollTo(0, 0);
                            init(num);
                        }
                    });
                }else{
                    console.log('11')
                    $("#page").css('display', 'none')
                }
         
            }
        })
    })
    //分页
    $("#page").paging({
        pageNum: 1, // 当前页面
        totalNum: count, // 总页码
        totalList: pagecount, // 记录总数量
        callback: function (num) { //回调函数
            // console.log(num); 
            window.scrollTo(0, 0);
            init(num);
        }
    });
    //跳转
    $(".list_a").on("click", "li", function () {
        // var uid = this.getAttribute('data-id');  
        var uid = $(this).attr("data-id");
        // console.log(uid);
        location.href = "details.html?id=" + uid+"&name=" +name;

    })
})
