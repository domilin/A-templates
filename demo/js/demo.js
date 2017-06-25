$(function () {

    $('a.playvideo').click(function () {
        videoPop($(this));
    });


});



//videoPop
function videoPop(ele) {
    var src = ele.attr('data-video-src');
    var str = '<div class="ui_box" id="uiBox">' +
        '<div class="ui_mask"></div>' +
        '<div class="ui_content">' +
        '<video autoplay name="media" preload="auto" width="100%" height="100%">' +
        '<source src="' + src + '" type="video/mp4;codecs=\'avc1.42E01E, mp4a.40.2\'">' +
        '</video>' +
        '<a class="btn_close" id="btnClose">×</a>' +
        '</div>' +
        '</div>';
    $(str).appendTo($('body'));
    var $ub = $('#uiBox');
    $ub.show();
    $('#btnClose').click(function () {
        $ub.remove();
    });
}
