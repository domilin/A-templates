/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root reducer
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import loginInfo from './loginInfo'
import gameListInfo from './gameListInfo'
import navigationArr from './navigationArr'
import breadcrumbArr from './breadcrumbArr'
const reducers = Object.assign({
    loginInfo,
    gameListInfo,
    navigationArr,
    breadcrumbArr,
    routing: routerReducer
})

const rootReducer = combineReducers(reducers)
export default rootReducer
