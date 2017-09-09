/**
 * Author：zhoushuanglong
 * Time：2017/8/10
 * Description：goods manage
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Radio, Form, Select, Button, Input, Table, Modal } from 'antd'
import $ from 'jquery'

import './index.scss'
import { gameIdCookie } from '../../public/index'
import { goodsListGet } from '../../actions/goodsList'
import GoodsDetail from '../../components/GoodsDetail'

const columns = [{
    title: '商品名称',
    dataIndex: 'lk_goods_name'
}, {
    title: '商品ID',
    dataIndex: 'lk_goods_id'
}, {
    title: '商品专栏',
    dataIndex: 'lk_column_name'
}, {
    title: '售价/原价',
    render: (text, record) => {
        return <div className="goods-price">
            <span>{record.lk_goods_sprice}</span>
            <span>{record.lk_goods_oprice}</span>
        </div>
    }
}, {
    title: '商品状态',
    render: (text, record) => {
        let status = ''
        switch (record.lk_goods_static) {
            case '1':
                status = <span className="saleing">出售中</span>
                break
            case '2':
                status = '已下架'
                break
        }
        return status
    }
}, {
    title: '实际销量',
    dataIndex: 'lk_goods_asales'
}, {
    title: '显示销量',
    dataIndex: 'lk_goods_dsales'
}, {
    title: '操作',
    render: (text, record) => {
        return <div className="goods-operate">
            <a onClick={() => {
                console.log('a')
            }}>详情</a>
            <a onClick={() => {
                console.log('a')
            }}>编辑</a>
            <a onClick={() => {
                console.log('b')
            }}>下架商品</a>
            <a onClick={() => {
                console.log('c')
            }}>删除</a>
        </div>
    }
}]

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const Option = Select.Option
class GoodsList extends Component {
    state = {
        selectedRowKeys: [],
        visible: false
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys})
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        this.setState({
            visible: false
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    componentDidMount () {
        gameIdCookie()

        this.showModal()
    }

    componentWillMount () {
        this.props.actions.goodsListGet({
            lk_game_id: $.cookie('gameId')
        })
    }

    render () {
        const {selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const {getFieldDecorator} = this.props.form
        return <div className="goods-list">
            <div className="check-condition">
                <FormItem>
                    {getFieldDecorator('goodsSell', {
                        initialValue: 'goodsAll'
                    })(<RadioGroup size="large">
                        <RadioButton value="goodsAll">全部商品</RadioButton>
                        <RadioButton value="goodsSelling">出售中</RadioButton>
                        <RadioButton value="goodsSell">已下架</RadioButton>
                    </RadioGroup>)}
                </FormItem>
                <div className="check-search clearfix">
                    <div className="check-search-left">
                        <div className="goodsProLabel">商品专栏：</div>
                        <FormItem>
                            {getFieldDecorator('goodsPro', {
                                initialValue: 'jack'
                            })(<Select>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('goodsSearch', {
                                initialValue: ''
                            })(<Input placeholder="请输入商品名称"/>)}
                        </FormItem>
                        <Button type="primary" size="large" icon="search">搜索</Button>
                    </div>
                    <div className="check-search-right">
                        <Button type="primary" size="large" icon="plus">新增商品</Button>
                        <Button type="primary" size="large" icon="delete">删除</Button>
                        <Button type="primary" size="large" icon="arrow-down">下架</Button>
                    </div>
                </div>
                <div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.goodsListArr} bordered/>
                </div>
            </div>
            <Modal
                title="商品详情"
                width="1000px"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <GoodsDetail/>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        goodsListArr: state.goodsListArr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({goodsListGet}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(GoodsList))
