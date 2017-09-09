/**
 * Author：zhoushuanglong
 * Time：2017/8/15
 * Description：goods list actions
 */

import { hashHistory } from 'react-router'
import { axiosAjax } from '../public/index'
import { message } from 'antd'

import {
    // GOODSDEL,
    // GOODSDWON,
    GOODSLIST
    // GOODSSEARCH
} from '../constants/index'

export const goodsListGet = (arg) => {
    return (dispatch) => {
        axiosAjax('GET', '/api_goods_list', arg, function (data) {
            const goodsData = data.data === '' ? [] : data.data
            dispatch({
                type: GOODSLIST,
                goodsData
            })
        })
    }
}

export const goodsAdd = (arg) => {
    return (dispatch) => {
        axiosAjax('POST', '/api_goods_add', arg, function () {
            goodsListGet(arg)
            message.warning('添加成功')
            hashHistory.push('/goods-list')
        })
    }
}
