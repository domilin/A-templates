/**
 * Author：zhoushuanglong
 * Time：2017/7/26
 * Description：main
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import $ from 'jquery'

import { breadcrumb, navigation } from '../../actions/index'
import './index.scss'
import menuData from '../../public/menuData'
import logo from '../../public/img/logo.svg'

const {SubMenu, Item} = Menu
const {Header, Content, Sider} = Layout

class Main extends Component {
    componentWillMount () {
        this.checkLogin()
        this.props.actions.breadcrumb([menuData[0].text])
        this.props.actions.navigation(menuData[0].key)
    }

    componentWillUpdate () {
        this.checkLogin()
    }

    checkLogin = () => {
        if (!$.cookie('email') || !$.cookie('password')) {
            hashHistory.push('/login')
        }
    }

    menuJsx = (selectkey, openkey) => {
        const This = this
        return <Menu
            className="shop-menu"
            mode="inline"
            // openKeys={[openkey ? openkey.toString() : '']}
            selectedKeys={[selectkey.toString()]}>
            {menuData.map(d => {
                if (d.children) {
                    return <SubMenu
                        key={d.key}
                        title={<span><Icon type={d.icon}/>{d.text}</span>}>
                        {d.children.map(data => {
                            return <Item key={data.key}>
                                <span><Icon type={data.icon}/><span>{data.text}</span></span>
                                <Link onClick={() => {
                                    This.props.actions.breadcrumb([d.text, data.text])
                                    This.props.actions.navigation(data.key, d.key)
                                    hashHistory.push(data.link)
                                }}/>
                            </Item>
                        })}
                    </SubMenu>
                } else {
                    return <Item key={d.key}>
                        <span><Icon type={d.icon}/><span>{d.text}</span></span>
                        <Link onClick={() => {
                            This.props.actions.breadcrumb([d.text])
                            This.props.actions.navigation(d.key)
                            hashHistory.push(d.link)
                        }}/>
                    </Item>
                }
            })}
        </Menu>
    }

    render () {
        const props = this.props
        return <Layout>
            <Header className="header">
                <div className="shop-logo"><img src={logo}/></div>
                <div className="shop-func">
                    <Button title="系统" type="primary" shape="circle" icon="setting" onClick={() => { hashHistory.push('/system') }}/>
                    <Button title="退出" type="primary" shape="circle" icon="logout"/>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="shop-slider">
                    {this.menuJsx(this.props.navigationArr[0], this.props.navigationArr[1])}
                </Sider>
                <Layout className="shop-content-wrap">
                    <Breadcrumb className="shop-breadcrumb">
                        {this.props.breadcrumbArr.map((d, i) => {
                            return <Breadcrumb.Item key={i}>{d}</Breadcrumb.Item>
                        })}
                    </Breadcrumb>
                    <Content className="shop-content">
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    }
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo,
        breadcrumbArr: state.breadcrumbArr,
        navigationArr: state.navigationArr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({breadcrumb, navigation}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
