$(function () {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }

    var orderno = $.getUrlParam('orderno');
    var id = $.getUrlParam('id');
console.log(orderno)
console.log(id)
    $.ajax({
        type: "post",
        url: "http://118.25.191.234/tingyouqu/member/ticketDetail",
        dataType: "json",
        data: {
            orderno: orderno
        },
        success: function (res) {
            console.log(res);
            create1(res)
            create2(res)
            create3(res)
            if(res.data.ticket.coupon_code[id].status == 0){
                var stt = "<text class='piao'>" + '有效票' + "</text>"
                $(".zt").append(stt);
            }else{
                var stt = "<text class='piao'>" + '无效票' + "</text>"
                $(".zt").append(stt);
            }
        }

    })

    function create1(res) {
        console.log(res.data.activity)
        var activity = res.data.activity
        var str = "<div>";
        str += "<div class='h1'>" + activity.name + "</div>";
        str += "<div class='shijian top'><img src='images/shijian.png' alt=''><div>" + activity.starttime + '～' + activity.endtime + "</div></div>"

        str += "<div class='shijian top2'><img src='images/dizhi.png' alt=''><div>" + activity.province + '' + activity.city + '' + activity.address + "</div></div>"

        str += "</div>";
        $(".hed_a").append(str);
    }

    function create2(res) {
        console.log(res.data.ticket)
        var ticket = res.data.ticket
        var str = "<div>";
        str += "<div><text style='margin-left:0;display: inline-block;   overflow: hidden;'>" + '票种' + ':' + "</text><text class='piaoz'>" + ticket.name + "</text></div>"
        str += "<div>" + '票价' + ':' + "<text>" + ticket.price + "</text></div>"
        str += "<div>" + '实付' + ':' + "<text>" + ticket.pay + '.00' + "</text></div>"
        str += "</div>";

      
        $(".trunk_b").append(str);
    }
    function create3(res) {
        console.log(res.data.user)
        var user = res.data.user
        var stt = "<text>" + user.realname + "</text>"
        var sdd = "<text>" + user.phone + "</text>"
        $(".xm").append(stt);
        $(".dh").append(sdd);
    }
})