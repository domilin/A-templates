/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：ndex
 */

$(function () {
    // 解决IE不支持placeholder的问题
    let supportPlaceholder = 'placeholder' in document.createElement('input')
    let placeholder = function (input) {
        let text = input.attr('placeholder')
        let defaultValue = input.defaultValue
        if (!defaultValue) {
            input.val(text).addClass('phcolor')
        }
        input.focus(function () {
            if (input.val() === text) {
                $(this).val('')
            }
        })
        input.blur(function () {
            if (input.val() === '') {
                $(this).val(text).addClass('phcolor')
            }
        })

        // 输入的字符不为灰色
        input.keydown(function () {
            $(this).removeClass('phcolor')
        })
    }
    // 当浏览器不支持placeholder属性时，调用placeholder函数
    if (!supportPlaceholder) {
        $('input, textarea').each(function () {
            // let text = $(this).attr('placeholder')
            if ($(this).attr('type') === 'text' || $(this).attr('placeholder')) {
                placeholder($(this))
            }
        })
    }
})

let hink = function (text) {
    $('.hink').html(text).show()
    setTimeout(function () {
        $('.hink').hide()
    }, 1500)
}
let ajaxFrom = function () {
    $.ajax({
        type: 'GET',
        url: 'http://opm.8864.com/api/barrage/insertjoin',
        data: {
            tel: $('.phone').val(),
            email: $('.wechat').val(),
            name: $('input.name').val(),
            message: $('.msg').val(),
            region: $('.add').val(),
            website_id: 107
        },
        dataType: 'jsonp',
        success: function (data) {
            if (data.code === 'suceess') {
                hink('提交成功！！')
            } else if (data.code === '100') {
                hink('请误多次提交！！')
            }
        }
    })
}
$('.submit').on('click', function () {
    let name = $('input.name').val()
    let add = $('input.add').val()
    let wechat = $('input.wechat').val()
    let msg = $('#msg').val()
    let phone = $('input.phone').val()
    if (name.trim() === '') {
        hink('姓名不能为空')
        return false
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        hink('请输入正确的手机号')
        return false
    }
    if (add.trim() === '') {
        hink('加盟区域不能为空')
        return false
    }
    if (wechat.trim() === '') {
        hink('微信号/邮箱不能为空')
        return false
    }
    if (msg === '') {
        hink('留言不能为空')
        return false
    }
    ajaxFrom()
})
