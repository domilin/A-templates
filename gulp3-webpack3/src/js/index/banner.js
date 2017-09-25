/**
 * Author：zhoushuanglong
 * Time：2017-08-30 16:52
 * Description：js demo banner
 */

import { isPc } from '../../../libs/js/utils'

export default () => {
    if (isPc()) {
        console.log('this is pc')
    }
    console.log('this is js demo')
}
