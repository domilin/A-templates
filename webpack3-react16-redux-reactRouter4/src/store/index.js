/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：store
 */

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers/index'

const history = createHistory()
const router = routerMiddleware(history)

export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk, router)
))
