/**
 * Author：zhoushuanglong
 * Time：2018-01-09 16:18
 * Description：public
 */

import {pageLoadingHide} from '../../libs/js/utils'

const navBg = () => {
    // 导航滚动
    const $xqNav = $('#xqNav')

    const scrollTop = $(window).scrollTop()

    if (scrollTop === 0) {
        $xqNav.removeClass('active')
    } else {
        $xqNav.addClass('active')
    }

    // 导航点击
    const $xqNavBtn = $('#xqNavBtn')
    const $xqNavLink = $('#xqNavLink')
    const $xqNavClose = $('#xqNavClose')
    $xqNavBtn.click(() => {
        $xqNavLink.addClass('active')
    })
    $xqNavClose.click(() => {
        $xqNavLink.removeClass('active')
    })
}

$(function () {
    pageLoadingHide()

    navBg()

    $(window).scroll(function () {
        navBg()
    })

    $('.share span').on('click', function () {
        $(this).children('div').toggle()
    })

    $('.buy-now').on('click', function (event) {
        event.preventDefault()
        $('.buy').addClass('show')
        $('.shade').addClass('show')
        return false
    })

    $('.shade').on('click', function () {
        $('.buy').removeClass('show')
        $('.shade').removeClass('show')
    })
})
