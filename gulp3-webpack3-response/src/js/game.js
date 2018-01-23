/**
 * Author：zhoushuanglong
 * Time：2017-08-29 19:27
 * Description：ndex
 */
import {gameData} from './data'

$(function () {
    let ulHtml = () => {
        let temp = ''
        gameData.map((item) => {
            temp += `<li class="item">
                        <p class="gameTitle">${item.title}</p>
                        <p class="gameContent">${item.desc}</p>
                      </li>`
        })
        return temp
    }
    $('.games .items').html(ulHtml())
})
