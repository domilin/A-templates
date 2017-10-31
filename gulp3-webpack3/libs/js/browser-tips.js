window.onload = function () {
    var styleSheet = 'body,div,p,a,h1,h3{margin:0;padding:0;font-family:"Microsoft YaHei UI Light","Microsoft YaHei";font-weight:normal}' +
        'a{text-decoration:none;cursor:pointer}' +
        'html,body{height:100%}' +
        '.browser-tips-mask{position:fixed;left:0;top:0;background:url("http://common.8864.com/web/img/black-bg.png");height:100%;width:100%;z-index:9998;}' +
        '.browser-tips{margin-left:-300px;position:fixed;left:50%;top:200px;background:#fff;border-radius:5px;height:450px;width:600px;color:#454545;z-index:9999;}' +
        '.browser-tips a.browser-tips-close{position:absolute;right:5px;top:5px;background:url("http://common.8864.com/web/img/close-btn.png") no-repeat center;height:32px;width:32px;cursor:pointer;}' +
        '.browser-tips h1{margin:75px auto 50px;display:block;width:460px;color:#ba5750;font-size:36px;text-align:center;}' +
        '.browser-tips h3{margin:20px auto 0;width:460px;color:#764b45;font-size:16px;line-height:46px;}' +
        '.browser-tips p{margin:50px auto 0;width:600px;text-align:center;}' +
        '.browser-tips p a{margin:0 10px;display:inline-block;height:51px;width:148px;color:#b74c44;font-size:16px;line-height:51px;text-align:center;}' +
        '.browser-tips p a:hover{color:#0050b5}'

    loadStyleString(styleSheet)

    var userAgent = window.navigator.userAgent.toLowerCase()
    if ((userAgent.match(/msie\s\d+/) && userAgent.match(/msie\s\d+/)[0]) || (userAgent.match(/trident\s?\d+/) && userAgent.match(/trident\s?\d+/)[0])) {
        var ieVersion = parseInt(userAgent.match(/msie\s\d+/)[0].match(/\d+/)[0] || userAgent.match(/trident\s?\d+/)[0])
        if (ieVersion < 9) {
            if (ieVersion === 8) {
                createEle()
            } else if (ieVersion <= 7) {
                document.body.innerHTML = '<div class="browser-tips-mask" id="browserTipsMask">' +
                    '<div class="browser-tips" id="browserTips">' +
                    '<a class="browser-tips-close" id="browserTipsClose"></a>' +
                    '<h1>浏览器版本过低</h1>' +
                    '<h3>您好，我们检测到您的浏览器版本过低，可能存在安全风险！我们建议您使用以下浏览器，您将获得更好更安全的体验。</h3>' +
                    '<p>' +
                    '<a href="http://se.360.cn">360安全浏览器</a>' +
                    '<a href="http://browser.qq.com">QQ安全浏览器</a>' +
                    '<a href="http://ie.sogou.com">搜狗极速浏览器</a>' +
                    '</p></div></div>'
            }
            document.getElementById('browserTipsClose').onclick = function () {
                document.getElementById('browserTipsMask').style.display = 'none'
                document.getElementById('browserTips').style.display = 'none'
            }
        }
    }
}

function createEle () {
    var body = document.body

    var mask = document.createElement('div')
    mask.setAttribute('class', 'browser-tips-mask')
    mask.setAttribute('id', 'browserTipsMask')
    body.appendChild(mask)

    var tips = document.createElement('div')
    tips.setAttribute('class', 'browser-tips')
    tips.setAttribute('id', 'browserTips')
    body.appendChild(tips)

    var close = document.createElement('a')
    close.setAttribute('class', 'browser-tips-close')
    close.setAttribute('id', 'browserTipsClose')
    tips.appendChild(close)

    var h1 = document.createElement('h1')
    h1.innerText = '浏览器版本过低'
    tips.appendChild(h1)

    var h3 = document.createElement('h3')
    h3.innerText = '您好，我们检测到您的浏览器版本过低，可能存在安全风险！我们建议您使用以下浏览器，您将获得更好更安全的体验。'
    tips.appendChild(h3)

    var p = document.createElement('p')
    tips.appendChild(p)

    createA('http://se.360.cn', '360安全浏览器')
    createA('http://browser.qq.com', 'QQ安全浏览器')
    createA('http://ie.sogou.com', '搜狗极速浏览器')

    function createA (href, text) {
        var a = document.createElement('a')
        a.setAttribute('href', href)
        a.setAttribute('target', '_blank')
        a.innerText = text
        p.appendChild(a)
    }
}

function loadStyleString (css) {
    var style = document.createElement('style')
    style.type = 'text/css'
    try {
        style.appendChild(document.createTextNode(css))
    } catch (ex) {
        style.styleSheet.cssText = css
    }
    var head = document.getElementsByTagName('head')[0]
    head.appendChild(style)
}
