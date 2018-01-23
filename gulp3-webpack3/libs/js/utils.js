/**
 * Author：zhoushuanglong
 * Time：2017/8/24
 * Description：util tools functions
 */

/**
 * JS：browserTips()
 */

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
        $browserTipsMask.show()
        $browserTips.show()

        $('#browserTipsClose').click(function () {
            $browserTipsMask.hide()
            $browserTips.hide()
        })
    }
}

/**
 * HTML：<div class="news-list" id="newsList"></div>
 * CSS：.news-list .paging-nav a{};   .news-list .paging-list li a(span)/time{};   .news-list .paging-btn a{};
 * JS：paging({
        element: '#newsList',
        url: 'http://opm.8864.com/api/website/getallcolumncontent',
        detailHtmlFileName: 'detial',
        pageSize: 14,
        columnIdName: [{id: 199, name: '新闻'}, {id: 517, name: '活动'}, {id: 519, name: '公告'}, {id: 521, name: '攻略'}]
    })
 */
const paging = (obj) => {
    const getArticleList = (columnId, pageNum) => {
        $.ajax({
            type: 'GET',
            url: obj.url,
            data: {
                column_id: columnId,
                type: 'article',
                page: pageNum,
                pageSize: obj.pageSize
            },
            dataType: 'jsonp',
            success: function (data) {
                let list = ''
                $.each(data.data.data, function (i, d) {
                    let columnName = ''
                    for (let value of obj.columnIdName) {
                        if (parseInt(d.column_id) === parseInt(value.id)) {
                            columnName = value.name
                        }
                    }

                    list += `<li>
<a target="_blank" href="${obj.detailHtmlFileName}.html?column_id=${d.column_id}&id=${d.id}"><span>[${columnName}]</span>${d.title}</a>
<time>${d.create_time.split(' ')[0]}</time>
</li>`
                })
                $(listEle).html(list)

                const dataIn = data.data
                if (dataIn.totalPage > 1) {
                    const prevBtn = (parseInt(dataIn.page) - 1) === 0 ? '' : `<a data-page="${(parseInt(dataIn.page) - 1)}" data-column="${columnId}">上一页</a>`

                    let page = `<a data-page="1" data-column="${columnId}">首页</a>${prevBtn}`

                    for (let i = 1; i <= dataIn.totalPage; i++) {
                        let classStyle = ''
                        if (parseInt(i) === parseInt(dataIn.page)) {
                            classStyle = 'active'
                        }
                        page += `<a data-page="${i}" class="${classStyle}" data-column="${columnId}">${i}</a>`
                    }

                    const nextBtn = parseInt(dataIn.page) === dataIn.totalPage ? '' : `<a data-page="${(parseInt(dataIn.page) + 1)}" data-column="${columnId}">下一页</a>`

                    page += nextBtn + `<a data-page="${dataIn.totalPage}" data-column="${columnId}">末页</a>`

                    $(btnEle).html(page)
                } else {
                    $(btnEle).html('')
                }
            }
        })
    }

    let navStr = ''
    let idAll = ''
    for (let value of obj.columnIdName) {
        idAll += `${value.id},`
        navStr += `<a data-column="${value.id}">${value.name}</a>`
    }
    const navStrAll = `<a class="active" data-column="${idAll}">最新</a>${navStr}`

    const pagingStr = `<div class="paging-nav">${navStrAll}</div>
    <div class="paging-con">
        <ul class="paging-list"></ul>
        <div class="paging-btn"></div>
    </div>`
    $(obj.element).html(pagingStr)

    const navEle = `${obj.element} .paging-nav`
    const listEle = `${obj.element} .paging-list`
    const btnEle = `${obj.element} .paging-btn`

    getArticleList(idAll, 1)
    $(document).on('click', btnEle + ' a', function () {
        getArticleList($(this).data('column'), $(this).data('page'))
    })
    $(document).on('click', navEle + ' a', function () {
        getArticleList($(this).data('column'), 1)

        $(navEle + ' a').removeClass('active')
        $(this).addClass('active')
    })
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
    const userAgent = window.navigator.userAgent.toLowerCase()

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
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('iphone') > 0 || userAgent.indexOf('ipad') > 0) {
        flag = true
    }
    return flag
}

const isAndroid = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('android') > 0) {
        flag = true
    }
    return flag
}

const isPad = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('ipad') > 0) {
        flag = true
    }
    return flag
}

const isWeixin = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('micromessenger') > 0) {
        flag = true
    }
    return flag
}

const ieVersion = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

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
 * JS：goToMobile('url')
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
 * JS：pageLoadingHide()
 */
const pageLoadingHide = (pixel) => {
    const $html = $('html')
    const pageMobile = () => {
        if (isPc() === false) {
            $html.addClass('page-mobile')
        } else {
            if (pixel) {
                if (parseInt($(window).width()) <= pixel) {
                    $html.addClass('page-mobile')
                } else {
                    $html.removeClass('page-mobile')
                }
            } else {
                $html.removeClass('page-mobile')
            }
        }
    }

    pageMobile()
    window.addEventListener('orientationchange', function () {
        pageMobile()
    })
    $(window).resize(function () {
        pageMobile()
    })

    const $pageLoading = $('#pageLoading')
    $pageLoading.removeClass('active')
    setTimeout(() => {
        $pageLoading.remove()
    }, 300)
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
            } else if (isAndroid()) {
                window.location.href = $this.data('android')
            }
        }
        return false
    })
}

/**
 * JS：lkLoadingHtml('#imgLoading')
 */
const lkLoadingHtml = (ele) => {
    return `<div class="lk-loading active" id="imgLoading">
        <div class="lk-loading-center">
            <div class="lk-loading-center-absolute">
                <div class="round round-one"></div>
                <div class="round round-two"></div>
                <div class="round round-three"></div>
            </div>
        </div>
    </div>`
}

/**
 * HTML：<a id="videoPlayBtn" data-src=""></a>
 * JS：videoPlay('#videoPlayBtn')
 */
const videoPlay = (ele, playFn, closeFn) => {
    if ($('#videoplayWrap').length === 0) {
        const videoplayHtml = `<div class="videoplay-wrap" id="videoplayWrap">
        <video src="" controls="controls" autoplay="autoplay">您的浏览器不支持该视频</video>
            <a class="videoplay-close" id="videoplayClose"><img src="../img/close-btn.png" /></a>
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

/**
 * HTML：<a id="imgPopBtn" data-src=""></a>
 * JS：imgPop('#imgPopBtn') imgPop('#imgPopBtn', widthSelf, heightSelf)
 */
const imgPop = (ele, widthSelf, heightSelf) => {
    if ($('#imgPop').length === 0) {
        const imgPopHtml = `<div class="img-pop" id="imgPop">
    <div class="img-mask" id="imgMask"></div>
    ${lkLoadingHtml('#imgLoading')}
    <div class="img-con-wrap" id="imgConWrap">
    <div class="img-con-scroll"><img id="imgCon" src=""/></div>
    <a class="img-pop-close" id="imgPopClose">×</a>
    </div></div>`
        $('body').append(imgPopHtml)
    }

    const $imgPop = $('#imgPop')
    const $imgCon = $('#imgCon')
    const $imgLoading = $('#imgLoading')
    const $imgConWrap = $('#imgConWrap')

    const imgPopClose = () => {
        $imgPop.hide()
        $imgLoading.show()
        $imgCon.attr('src', '')
        $imgConWrap.css({
            marginLeft: 'auto',
            marginTop: 'auto',
            height: 'auto',
            width: 'auto',
            visibility: 'hidden'
        })
    }

    $(document).on('click', ele, function () {
        $imgPop.show()

        const src = $(this).data('src')
        let imgTemp = new Image()
        imgTemp.src = src
        imgTemp.onload = function () {
            $imgCon.attr('src', src)

            const winWidth = parseInt($(window).width())
            const winHeight = parseInt($(window).height())

            if (isPc()) {
                const imgRealWidth = imgTemp.width > (winWidth - 500) ? (winWidth - 500) : imgTemp.width
                if (widthSelf) {
                    $imgConWrap.css({
                        marginLeft: -widthSelf / 2,
                        width: widthSelf
                    })
                } else {
                    $imgConWrap.css({
                        marginLeft: -imgRealWidth / 2,
                        width: imgRealWidth
                    })
                }
            }

            const conHeight = parseInt($imgConWrap.height())
            let closeBtnPos

            if (isPc()) {
                closeBtnPos = 80
            } else {
                closeBtnPos = 130 / 24 * parseInt($('html').css('font-size'))
            }

            const conRealHeight = conHeight > (winHeight - closeBtnPos) ? (winHeight - closeBtnPos) : conHeight
            if (heightSelf) {
                $imgConWrap.css({
                    marginTop: -heightSelf / 2,
                    height: heightSelf
                })
            } else {
                $imgConWrap.css({
                    marginTop: -conRealHeight / 2,
                    height: conRealHeight
                })
            }

            $imgLoading.hide()
            $imgConWrap.css('visibility', 'inherit')
        }
    })

    $(document).off('click', '#imgPopClose')
    $(document).on('click', '#imgPopClose', function () {
        imgPopClose()
    })

    $(document).off('click', '#imgLoading')
    $(document).on('click', '#imgLoading', function () {
        imgPopClose()
    })
}

export {
    remRootFontSize,
    browserTips,
    isPc,
    isIos,
    isAndroid,
    isWeixin,
    isPad,
    ieVersion,
    screenOrient,
    weixinAutoPlay,
    getQueryString,
    goToMobile,
    pageLoadingHide,
    gameDownloadM,
    lkLoadingHtml,
    videoPlay,
    imgPop,
    paging
}
