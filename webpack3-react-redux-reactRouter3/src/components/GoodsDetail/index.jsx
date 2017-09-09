/**
 * Author：zhoushuanglong
 * Time：2017/8/21
 * Description：goods detail
 */

import React, { Component } from 'react'
import { Row, Col, Button, Card } from 'antd'

import './index.scss'

class GoodsDetail extends Component {
    render () {
        return <div className="goods-detail">
            <Row className="goods-detail-info">
                <Col span={3}>
                    <div className="goods-img"><img src="http://reeoo.qiniudn.com/PracticalVR.png!main"/></div>
                </Col>
                <Col span={8}>
                    <h3>商品名称商品名称</h3>
                    <p>专栏类型：晶钻专栏</p>
                    <p>限购平台：安卓</p>
                </Col>
                <Col span={7}>
                    <p>商品ID：27828266826288</p>
                    <p>限购数量：按角色限购，每角色限购<span>10</span>个</p>
                </Col>
                <Col span={6}>
                    <em className="price-show">¥6499.00</em>
                    <em className="price-original">¥8499.00</em>
                    <Button type="primary" size="large">出售中</Button>
                </Col>
            </Row>
            <Card className="goods-detail-description" title="商品描述">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    }
}

export default GoodsDetail
