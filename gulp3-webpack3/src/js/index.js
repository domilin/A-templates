/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：js demo index
 */

import { goToMobile, imgPop, paging } from '../../libs/js/utils'
import banner from './index/banner'

$(function () {
    goToMobile('http://www.baidu.com')
    imgPop('#imgPopBtn')
    banner()

    $.ajax({
        type: 'GET',
        url: '/community/login/createtoken.do',
        data: {},
        dataType: 'json',
        success: function (data) {
            console.log(data)
        }
    })

    // 新闻列表页
    paging({
        element: '#newsList',
        url: 'http://opm.8864.com/api/website/getallcolumncontent',
        detailHtmlFileName: 'detial',
        pageSize: 14,
        columnIdName: [
            {
                id: 199,
                name: '新闻'
            }, {
                id: 517,
                name: '活动'
            }, {
                id: 519,
                name: '公告'
            }, {
                id: 521,
                name: '攻略'
            }
        ]
    })
})
