/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：public function
 */

import React from 'react'
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

export const asyncComponent = loadComponent => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null
        }

        componentWillMount () {
            if (this.hasLoadedComponent()) {
                return
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({Component})
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`)
                    throw err
                })
        }

        hasLoadedComponent () {
            return this.state.Component !== null
        }

        render () {
            const {Component} = this.state
            return (Component) ? <Component {...this.props} /> : null
        }
    }
)
