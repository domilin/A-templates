/**
 * Author：tantingting
 * Time：2017/8/22
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Radio, Form, Button, Input, Table, Row, Col, DatePicker, Modal } from 'antd'
import './index.scss'
import '../Config/config.scss'
import { gameIdCookie } from '../../public/index'
import { getOrderList, addOrderData } from '../../actions/order.action'
import $ from 'jquery'
const { RangePicker } = DatePicker

/* 订单状态 */
const orderState = {
    '0': '未支付',
    '1': '支付'
}
/* 商品状态 */
const goodsState = {
    '1': '出售中',
    '2': '已下架'
}
let columns = []
const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}
class OrderMange extends Component {
    constructor () {
        super()
        this.state = {
            'visible': false
        }
    }

    componentDidMount () {
        const { dispatch } = this.props
        gameIdCookie()
        // 搜索
        dispatch(getOrderList({'lk_game_id': $.cookie('gameId')}))
    }

    componentWillMount () {
        const { dispatch } = this.props
        // 表格数据渲染
        columns = [{
            title: '订单信息',
            colSpan: 3,
            render: (text, record) => {
                return <div>
                    <div className="mb5">订单编号：{record.lk_order_id}</div>
                    <div>下单时间：{record.lk_order_time}</div>
                </div>
            }
        }, {
            title: '商品信息',
            colSpan: 0,
            width: '30%',
            render: (text, record) => {
                return <div className="user-info">
                    <div className="img-box mr15"><img src={record.lk_goods_file} /></div>
                    <div>
                        <div className="mb5">{record.lk_goods_name}</div>
                        <div className="flex-inline-between">
                            <span className="mr15">￥{record.lk_goods_sprice}</span>
                            <span>X {record.lk_nummber}</span>
                        </div>
                    </div>
                </div>
            }
        }, {
            title: '用户信息',
            colSpan: 0,
            width: '15%',
            render: (text, record) => {
                return <div>
                    <div className="mb5"><span className="mr15">{record.lk_role_name}</span><span>{record.lk_tel}</span></div>
                    <div>{record.lk_passportName}</div>
                </div>
            }
        }, {
            title: '订单状态',
            render: (text, record) => {
                return <div>
                    <div className="mb5">{orderState[record.lk_order_status]}</div>
                    <a onClick={() => {
                        this.setState({ 'visible': true })
                        dispatch(addOrderData({'orderInfo': record}))
                    }}>订单详情</a>
                </div>
            }
        }, {
            title: '收款信息',
            dataIndex: 'lk_goods_asales',
            render: (text, record) => {
                return <span>￥{record.lk_goods_asales}</span>
            }
        }]
    }
    /* 搜索 */
    searchOrder = (arg) => {
        const { form, dispatch } = this.props
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            const rangeTimeValue = fieldsValue['lk_order_date']
            const values = {
                ...fieldsValue,
                'lk_order_date': !rangeTimeValue ? [] : [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
                ],
                ...arg
            }
            // 搜索
            dispatch(getOrderList({...values, 'lk_game_id': $.cookie('gameId')}))
            // form.resetFields()
        })
    }
    render () {
        const {getFieldDecorator} = this.props.form
        const {list, orderInfo} = this.props
        return <div className="common order">
            <div>
                {/* <FormItem>
                    <RadioGroup size="large" onChange={(e) => { console.log(e); dispatch(addOrderData({'type': e.target.value})) }}>
                        <RadioButton value="all">全部订单</RadioButton>
                        <RadioButton value="success">交易成功</RadioButton>
                        <RadioButton value="deviant">交易异常</RadioButton>
                    </RadioGroup>
                </FormItem> */}
                <Form layout="horizontal">
                    <FormItem>
                        {getFieldDecorator('lk_order_status', {
                            initialValue: ''
                        })(
                            <RadioGroup size="large" onChange={(e) => this.searchOrder({'lk_order_status': e.target.value})}>
                                <RadioButton value="">全部订单</RadioButton>
                                <RadioButton value="1">交易成功</RadioButton>
                                <RadioButton value="0">交易异常</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <Row>
                        <Col span={6}>
                            <FormItem label="订单编号" {...formItemLayout}>
                                {getFieldDecorator('lk_order_id', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="下单时间" labelCol={{'span': 6}} wrapperCol={{'span': 18}}>
                                {getFieldDecorator('lk_order_date', {
                                    initialValue: ''
                                })(<RangePicker style={{'width': '100%'}} format="YYYY-MM-DD HH:mm:s" showTime={ true } onChange={this.onChange} />)}
                            </FormItem>
                        </Col>
                        {/* <Col span={6}>
                            <FormItem label="订单状态" {...formItemLayout}>
                                {getFieldDecorator('lk_order_status', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem label="买家昵称" {...formItemLayout}>
                                {getFieldDecorator('lk_order_nick', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="蓝港账号" labelCol={{'span': 12}} wrapperCol={{'span': 12}}>
                                {getFieldDecorator('lk_passportName', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="商品名称" labelCol={{'span': 8}} wrapperCol={{'span': 16}}>
                                {getFieldDecorator('lk_goods_name', {
                                    initialValue: ''
                                })(<Input />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="20" offset="2">
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => this.searchOrder({})}>搜索</Button>
                        </Col>
                    </Row>
                </Form>
                <div className="mt30">
                    <Table columns={columns} dataSource={list.map((item, index) => ({...item, 'key': index}))} bordered/>
                </div>
            </div>
            {/*
                新增/修改专栏
            */}
            <Modal className="common order" width={900} title="订单详情" visible={this.state.visible} onOk={() => this.setState({ 'visible': false })} onCancel={() => this.setState({ 'visible': false })}
                okText="确认"
                cancelText="取消"
            >
                <div className="order-info">
                    <div>订单编号：{orderInfo.lk_order_id}</div>
                    <div>下单时间：{orderInfo.lk_order_time}</div>
                    <div>交易状态：{orderState[orderInfo.lk_order_status]}</div>
                </div>
                <div className="block mt20">
                    <div className="title"><h4>购买信息</h4></div>
                    <div className="box">
                        <Row>
                            <Col span="21">
                                <Row>
                                    <Col className="form-label" span={3} >买家昵称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_role_name}</Col>
                                    <Col className="form-label" span={3} >蓝港账号：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_passportName}</Col>
                                    <Col className="form-label" span={3} >选择平台：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_terrace}</Col>
                                </Row>
                                <Row>
                                    <Col className="form-label" span={3} >选择区服：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_server}</Col>
                                    <Col className="form-label" span={3} >选择角色：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_role_name}</Col>
                                    <Col className="form-label" span={3} >联系电话：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_tel}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* 商品信息 */}
                <div className="block mt20">
                    <div className="title"><h4>商品信息</h4></div>
                    <div className="box">
                        <Row className="bbdot">
                            <Col span="21">
                                <Row>
                                    <Col className="form-label" span={3} >商品名称：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_goods_name}</Col>
                                    <Col className="form-label" span={3} >商品ID：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_goods_id}</Col>
                                    <Col className="form-label" span={3} >专栏类型：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_column_name}</Col>
                                </Row>
                                <Row>
                                    <Col className="form-label" span={3} >商品状态：</Col>
                                    <Col className="lh32" span={5} >{goodsState[orderInfo.lk_goods_static]}</Col>
                                    <Col className="form-label" span={3} >限购平台：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_terrace}</Col>
                                    <Col className="form-label" span={3} >限购数量：</Col>
                                    <Col className="lh32" span={5} >每角色限购{orderInfo.lk_quota_count}个</Col>
                                </Row>
                                <Row>
                                    <Col className="form-label" span={3} >商品原价：</Col>
                                    <Col className="lh32" span={5} >¥{orderInfo.lk_goods_oprice}</Col>
                                    <Col className="form-label" span={3} >商品售价：</Col>
                                    <Col className="lh32" span={5} >¥{orderInfo.lk_goods_sprice}</Col>
                                    <Col className="form-label" span={3} >购买数量：</Col>
                                    <Col className="lh32" span={5} >{orderInfo.lk_nummber}</Col>
                                </Row>
                            </Col>
                            <Col span="3">
                                <div>
                                    <img src={orderInfo.lk_goods_file}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="21">
                                <Row>
                                    <Col className="form-label" offset="16" span={3} >订单金额：</Col>
                                    <Col className="lh32" span={3} >¥{orderInfo.lk_rental}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/* 商品描述 */}
                <div className="block mt20">
                    <div className="title"><h4>商品描述</h4></div>
                    <div className="box">
                        <Row>
                            <Col span="21">
                                <p className="lh32">{orderInfo.lk_goods_describe}</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        order: state.order,
        list: state.order.list,
        orderInfo: state.order.orderInfo
    }
}

export default connect(mapStateToProps)(Form.create()(OrderMange))
