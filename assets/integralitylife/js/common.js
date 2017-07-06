/**
 * Created by YarB on 17.06.2017.
 */

$(document).ready(function () {
    var offset = $("#contents").offset();
    var topPadding = 0;
    $(window).scroll(function () {
        if ($(window).scrollTop() > offset.top) {
            $("#contents").stop().animate({marginTop: $(window).scrollTop() - offset.top + topPadding});
        }
        else {
            $("#contents").stop().animate({marginTop: 0});
        }
    });
});
