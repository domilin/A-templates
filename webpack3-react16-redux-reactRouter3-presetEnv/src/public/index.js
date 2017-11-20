/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：public function
 */

import axios from 'axios'
import { hashHistory } from 'react-router'
import { message } from 'antd'

export const axiosAjax = (type, url, params, fn) => {
    axios({
        method: type,
        url: url,
        params: params
    }).then(function (response) {
        const data = response.data
        if (data.code === 200) {
            fn.call(this, data)
        } else {
            if (data.code === -102) {
                hashHistory.push('/login')
            }
            message.warning(data.message)
        }
    }).catch(function (error) {
        message.error(error)
    })
}
export const axiosFormData = (type, url, params, fn) => {
    axios({
        method: type,
        url: url,
        data: params,
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(function (response) {
        console.log(response)
        const data = response.data
        if (data.code === 200) {
            fn.call(this, data)
        } else {
            if (data.code === -102) {
                hashHistory.push('/login')
            }
            message.warning(data.message)
        }
    }).catch(function (error) {
        message.error(error)
    })
}
