/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：ndex
 */

import { videoPlay, browserTips } from '../../libs/js/utils'

if (navigator.userAgent.match('MSIE') && window.ActiveXObject) {
    let u = window.navigator.userAgent.toLocaleLowerCase()
    let reg = /10\.0/
    let reg11 = /(trident)\/([\d.]+)/
    let str = navigator.userAgent
    if (!reg.test(str) || !u.match(reg11)) {
        browserTips()
    }
}

const light = () => {
    const $light = $('#breathLight span')
    const lightAll = $light.length
    const animateTime = 200
    $light.removeClass('active green')

    $light.each(function (i, d) {
        const $this = $(this)
        if (i <= 5) {
            setTimeout(function () {
                $this.addClass('active')
            }, animateTime + i * 80)
        } else {
            setTimeout(function () {
                $this.addClass('active')
            }, animateTime + (lightAll - i) * 80)
        }
    })

    setTimeout(function () {
        $light.removeClass('active green')

        $light.each(function (i, d) {
            const num = i + 1
            setTimeout(function () {
                if (i === 5) {
                    $light.eq(num - 1).addClass('active green')
                } else {
                    $light.eq(num - 1).addClass('active')
                }

                setTimeout(function () {
                    $light.eq(num - 1).removeClass('active')
                }, animateTime)
            }, animateTime + i * 80)
        })
    }, Math.ceil(lightAll / 2) * 80 + animateTime)
}

$(function () {
    // 首屏切换
    const $xqNav = $('#xqNav')
    const $helloXiaoqing = $('#helloXiaoqing')
    const $helloChange = $('#helloChange li')

    $helloChange.click(function () {
        $helloChange.removeClass('active')
        $(this).addClass('active')

        $helloXiaoqing.removeClass('blue').removeClass('white').addClass($(this).data('type'))
        $xqNav.removeClass('blue').removeClass('white').addClass($(this).data('type'))
    })

    // 产品切换
    const swiper = new Swiper('#productWrap', {
        pagination: {
            el: '#productWrap .swiper-pagination',
            clickable: true,
            autoplay: true
        }
    })
    swiper.init()

    // 灯效果
    light()
    setInterval(function () {
        light()
    }, 3000)

    // 硬件展开
    const $musicBodyMask = $('#musicBodyMask')
    const $trumpet = $('#trumpet')
    const $trumpetDetail = $('#trumpetDetail')

    $(window).scroll(function () {
        const scrollTop = $(this).scrollTop()
        const trumpetTop = $trumpet.offset().top

        if (scrollTop >= trumpetTop) {
            setTimeout(function () {
                $musicBodyMask.addClass('active')
                $trumpetDetail.addClass('active')
            }, 200)
        }
    })
    $('#videoPlayBtn').on('click', function () {
        if ($(this).data('src') === '') {
            alert('敬请期待')
        } else {
            videoPlay('#videoPlayBtn')
        }
    })

    $(window).on('scroll', function () {
        oAni('.animate', 'upward')
    })
})

function oAni (obj, Class) {
    $(obj).each(function () {
        let fold = $(window).height() + $(window).scrollTop() - 100
        if ($(this).offset().top <= fold) {
            $(this).addClass(Class)
        }
    })
}
