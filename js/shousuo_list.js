$(function () {
    let url = 'http://118.25.191.234/tingyouqu'
    let http = 'http://118.25.191.234'
    // let url = 'http://chinaboatfun.com/api'
    // let http = 'http://chinaboatfun.com'
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }

    var val = $.getUrlParam('val');
    console.log(val)
    var page = 1;//第几页开始
    var pagenum = 8;//每一页的数量
    var count;//总条数
    var pagecount;
    init(1);
    function init(page) {
        $.ajax({
            type: "get",
            url: url+"/search/find",
            dataType: "json",
            async: false,
            data: {
                keyword:val,
                plat:'web',
                page: page, // 页码
                pagenum: pagenum  // 数量

            },
            success: function (res) {
                console.log(res);
                $(".list_h2").html(val);
                if(res.data.length <1){
                    $(".list_h1").html('没有相关产品哦~').css({ "text-align":"center",'font-size': '16px','margin-top': '50px'});
                    $("#page").css('display', 'none')
   
                }else{
                    $("#page").css('display', 'block')
                    create1(res)
                    pagecount = res.count
                    $(".list_h1").html(val);
                }
             
            }
        })
    }
    function create1(res) {
        var productList = res.data
        console.log(productList)
        var productList = productList.map(function (item) {
            var img1 = (item.images)[0];//切割图片
            if(item.model == null){
                item.model = ''
              }
            return `
            <li data-id="${item.id}">
            <div class="div_img"><img class="list_img" src="${http}${img1}" alt=""></div>
                        <p class="tex1">${item.model}</p>
                        <p class="tex2">${item.name}</p>
                        <div class="tex3_a"><img class="tex3" src="${http}${item.brandImage}" alt="">  </div>
                        <p class="ck">参考价</p>
                        <p class="tex4">￥${item.price/10000}万</p>
                    </li>`;
        }).join("");
        $(".list_a").html(productList);
        count = Math.ceil(res.count/ pagenum);
    }

    $("#page").paging({
        pageNum: 1, // 当前页面
        totalNum: count, // 总页码
        totalList: pagecount, // 记录总数量
        callback: function (num) { //回调函数
            console.log(num);
            init(num);
        }
    });


    $(".list_a").on("click", "li", function () {
        // var uid = this.getAttribute('data-id');  
        var uid = $(this).attr("data-id");
        // console.log(uid);
        location.href = "details.html?id=" + uid+"&name=" +val;

    })
})