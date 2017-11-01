$(function () {
    footerM()
})

/**
 * HTML：<div id="lkFooterM"></div>
 */
const footerM = () => {
    const footerLogo = `data:image/jpeg;base64,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`
    const pageFooterM = `<footer class="page-footer">
        <span><img src=${footerLogo} /></span>
        <p>蓝港在线（北京）科技有限公司 京ICP备09017018号-3 文网游备字[2016]M-RPG2263号</p>
        <em>Copyright  2007-2015 linekong.com, All Rights Reserved</em>
        <p>电话：010-84170099 地址：北京市朝阳区望京北路启明国际大厦8层 </p>
    </footer>`
    const pageFooterStyleM = `<style rel="stylesheet">
        footer.page-footer {
            padding: .83333rem 0;
            background: #000;
            width: 100%;
            color: #626262;
            font-size: 1rem;
            text-align: center;
            overflow: hidden;
            z-index: 999
        }
        
        footer.page-footer a {
            color: #626262
        }
        
        footer.page-footer span {
            margin-bottom: .83333rem;
            display: block;
            height: 1.75rem
        }
        
        footer.page-footer span img {
            height: 100%
        }
        
        footer.page-footer p {
            margin-left: -6.25rem;
            display: block;
            width: 150%;
            -webkit-transform: scale(.6);
            -ms-transform: scale(.6);
            transform: scale(.6)
        }
        
        footer.page-footer em {
            margin: .20833rem 0 .20833rem -6.66667rem;
            display: block;
            width: 150%;
            -webkit-transform: scale(.5);
            -ms-transform: scale(.5);
            transform: scale(.5)
        }
    </style>`
    $('#lkFooterM').html(pageFooterStyleM + pageFooterM)
}
