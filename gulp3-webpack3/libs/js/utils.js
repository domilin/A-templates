/**
 * Author：zhoushuanglong
 * Time：2017/8/24
 * Description：util tools functions
 */

/**
 * INTRO: <=IE8
 * JS：browserTips()
 */

const userAgent = window.navigator.userAgent.toLowerCase()

const browserTips = () => {
    if ($('#browserTipsMask').length === 0) {
        const browserTipsHtml = `<div class="browser-tips-mask" id="browserTipsMask"></div>
        <div class="browser-tips" id="browserTips">
            <a class="browser-tips-close" id="browserTipsClose"></a>
            <h1>浏览器版本过低</h1>
            <h3>您好，我们检测到您的浏览器版本过低，可能存在安全风险！我们建议您使用以下浏览器，您将获得更好更安全的体验。</h3>
            <p>
                <a href="http://se.360.cn">360安全浏览器</a>
                <a href="http://browser.qq.com">QQ安全浏览器</a>
                <a href="http://ie.sogou.com">搜狗极速浏览器</a>
            </p>
        </div>`
        $('body').append(browserTipsHtml)

        const $browserTipsMask = $('#browserTipsMask')
        const $browserTips = $('#browserTips')
        if ((userAgent.match(/msie\s\d+/) && userAgent.match(/msie\s\d+/)[0]) || (userAgent.match(/trident\s?\d+/) && userAgent.match(/trident\s?\d+/)[0])) {
            const ieVersion = userAgent.match(/msie\s\d+/)[0].match(/\d+/)[0] || userAgent.match(/trident\s?\d+/)[0]
            if (ieVersion < 9) {
                $browserTipsMask.show()
                $browserTips.show()
            }
        }

        $('#browserTipsClose').click(function () {
            $browserTipsMask.hide()
            $browserTips.hide()
        })
    }
}

/**
 * JS：remRootFontSize(24, 640)
 */
const remRootFontSize = (fontSize, designWidth) => {
    (function (doc, win) {
        const docEl = doc.documentElement
        const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
        const recalc = function () {
            const clientWidth = docEl.clientWidth
            if (!clientWidth) return
            docEl.style.fontSize = (clientWidth * fontSize / designWidth).toFixed(5) + 'px'
        }
        recalc()
        if (!doc.addEventListener) return
        win.addEventListener(resizeEvt, recalc, false)
        doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)
}

const isPc = () => {
    const Agents = ['android', 'iphone', 'ipad', 'ipod', 'windows phone']
    let flag = true
    for (let i = 0; i < Agents.length; i++) {
        if (userAgent.indexOf(Agents[i]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

const isIos = () => {
    let flag = false
    if (userAgent.indexOf('iphone') > 0 || userAgent.indexOf('ipad') > 0) {
        flag = true
    }
    return flag
}

const isandroid = () => {
    let flag = false
    if (userAgent.indexOf('android') > 0) {
        flag = true
    }
    return flag
}

const isPad = () => {
    let flag = false
    if (userAgent.indexOf('ipad') > 0) {
        flag = true
    }
    return flag
}

const isWeixin = () => {
    let flag = false
    if (userAgent.indexOf('micromessenger') > 0) {
        flag = true
    }
    return flag
}

const ieVersion = () => {
    return userAgent.match(/msie\s\d+/)[0].match(/\d+/)[0] || userAgent.match(/trident\s?\d+/)[0]
}

/**
 * JS：getQueryString(name)
 */
const getQueryString = (name) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

/**
 * ipad:90或-90横屏; ipad:0或180竖屏; Andriod:0或180横屏; Andriod:90或-90竖屏
 * JS：screenOrient()/$(window).bind('orientationchange', function(e){screenOrient()})
 */
const screenOrient = () => {
    if (window.orientation === 0 || window.orientation === 180) {
        $('body').attr('class', 'portrait')
        window.orientation = 'portrait'
        return false
    } else if (window.orientation === 90 || window.orientation === -90) {
        $('body').attr('class', 'landscape')
        window.orientation = 'landscape'
        return false
    }
}

/**
 * HTML: <audio id="bgm"></audio>
 * JS：weixinAutoPlay('#bgm')
 */
const weixinAutoPlay = (ele) => {
    wx.config({
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    })
    wx.ready(function () {
        $(ele)[0].play()
    })
}

/**
 * JS：goMob('url')
 */
const goToMobile = (url) => {
    if (!isPc()) {
        window.location.href = url
    } else {
        const $pageLoading = $('#pageLoading')
        $pageLoading.removeClass('active')
        setTimeout(() => {
            $pageLoading.remove()
        }, 300)
    }
}

/**
 * HTML：<a id="downloadBtn" data-ios="" data-android=""></a>
 * JS：gameDownloadM('#downloadBtn')
 */
const gameDownloadM = (ele) => {
    if ($('#micromsgTips').length === 0) {
        $('body').append('<div class="micromsg-tips" id="micromsgTips"><div class="micromsg-tips-text"></div></div>')
        $(document).on('click', '#micromsgTips', () => {
            $(this).hide()
        })
    }
    $(document).on('click', ele, function () {
        const $this = $(this)
        if (isWeixin()) {
            $('#micromsgTips').show()
        } else {
            if (isIos()) {
                window.location.href = $this.data('ios')
            } else if (isandroid()) {
                window.location.href = $this.data('android')
            }
        }
        return false
    })
}

/**
 * HTML：<a id="videoPlayBtn" data-src=""></a>
 * JS：videoPlay('#videoPlayBtn')
 */
const videoPlay = (ele, playFn, closeFn) => {
    if ($('#videoplayWrap').length === 0) {
        const videoplayHtml = `<div class="videoplay-wrap" id="videoplayWrap">
        <video src="" controls="controls" autoplay="autoplay">您的浏览器不支持该视频</video>
            <a class="videoplay-close" id="videoplayClose"><img src="../img/videoplay-close.png"></a>
        </div><div class="videoplay-mask" id="videoplayMask"></div>`

        $('body').append(videoplayHtml)
    }

    const $popmask = $('#videoplayMask')
    const $videoWrap = $('#videoplayWrap')
    const $videoCon = $videoWrap.children('video')

    $(document).on('click', ele, function () {
        const src = $(this).data('src')

        $videoCon.attr('src', src)
        $popmask.show()
        $videoWrap.show()

        const playPromise = $videoCon[0].play()
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Automatic playback started!')
            }).catch(() => {
                console.log('Automatic playback failed')
            })
        }

        if (playFn) {
            playFn.call(window, $videoCon)
        }
    })

    $(document).off('click', '#videoplayClose')
    $(document).on('click', '#videoplayClose', function () {
        $popmask.hide()
        $videoWrap.hide()
        $videoCon[0].pause()

        if (closeFn) {
            closeFn.call(window)
        }
    })
}

export {
    remRootFontSize,
    browserTips,
    isPc,
    isIos,
    isandroid,
    isWeixin,
    isPad,
    ieVersion,
    screenOrient,
    weixinAutoPlay,
    getQueryString,
    goToMobile,
    gameDownloadM,
    videoPlay
}
