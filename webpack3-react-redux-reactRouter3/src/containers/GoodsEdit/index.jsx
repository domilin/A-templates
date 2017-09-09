/**
 * Author：zhoushuanglong
 * Time：2017/8/18
 * Description：goods add
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs, Form, Select, Input, Upload, Icon, Modal, Radio, Button } from 'antd'

import './index.scss'
import RichEditor from '../../components/RichEditor'
import { goodsAdd } from '../../actions/goodsList'
import { columnListGet } from '../../actions/columnList'

const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22}
}

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
class GoodsEdit extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }]
    }
    handleCancel = () => this.setState({previewVisible: false})
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }
    handleChange = ({fileList}) => this.setState({fileList})

    submitEdit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const form = this.props.form.getFieldsValue()
                this.props.actions.goodsAdd(form)
            }
        })
    }

    componentWillMount () {
        this.props.actions.columnListGet()
    }

    render () {
        const {getFieldDecorator} = this.props.form
        const {previewVisible, previewImage, fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return <div className="goods-edit">
            <Form>
                <Tabs defaultActiveKey="basic" tabPosition="left">
                    <TabPane tab="基本信息" key="basic">
                        <FormItem label="商品名称" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_name', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请输入商品名称'
                                }]
                            })(<Input placeholder="请填写商品名称"/>)}
                        </FormItem>
                        <FormItem label="商品ID" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_id', {
                                initialValue: '',
                                rules: [{
                                    type: 'number', message: '请输入数字类型'
                                }, {
                                    required: true, message: '请输入商品ID'
                                }]
                            })(<Input placeholder="请填写商品ID"/>)}
                        </FormItem>
                        <FormItem label="所属专栏" {...formItemLayout}>
                            {getFieldDecorator('lk_column_name', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择专栏'
                                }]
                            })(<Select placeholder="请选数专栏类型">
                                {this.props.columnListArr.map((d, i) => {
                                    return <Option
                                        key={d.lk_column_id}
                                        value={d.lk_column_name}>{d.lk_column_name}</Option>
                                })}
                            </Select>)}
                        </FormItem>
                        <FormItem label="商品图片" {...formItemLayout}>
                            {getFieldDecorator('lk_goods_file', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择图片'
                                }]
                            })(<div className="clearfix">
                                <Upload
                                    action="/api_goods_add"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}>
                                    {fileList.length >= 2 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                </Modal>
                            </div>)}
                        </FormItem>
                        <FormItem label="商品介绍" {...formItemLayout}>
                            {getFieldDecorator('goodsIntro', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请输入商品介绍'
                                }]
                            })(<RichEditor/>)}
                        </FormItem>
                    </TabPane>
                    <TabPane tab="销售信息" key="sales">
                        <FormItem label="商品售价" {...formItemLayout}>
                            {getFieldDecorator('goodsPriceShow', {
                                initialValue: '',
                                rules: [{
                                    type: 'number', message: '请输入数字类型'
                                }, {
                                    required: true, message: '请输入商品售价'
                                }]
                            })(<Input placeholder="请填写商品售价"/>)}
                        </FormItem>
                        <FormItem label="商品原价" {...formItemLayout}>
                            {getFieldDecorator('goodsPriceOrginal', {
                                initialValue: '',
                                rules: [{
                                    type: 'number', message: '请输入数字类型'
                                }]
                            })(<Input placeholder="请输入商品原价"/>)}
                        </FormItem>
                        <FormItem label="限购平台" {...formItemLayout}>
                            {getFieldDecorator('goodsPlatform', {
                                initialValue: 'ios',
                                rules: [{
                                    required: true, message: '请选择限购平台'
                                }]
                            })(<RadioGroup size="large">
                                <RadioButton value="andriod">安卓</RadioButton>
                                <RadioButton value="ios">Ios</RadioButton>
                            </RadioGroup>)}
                        </FormItem>
                        <FormItem label="限购类型" {...formItemLayout}>
                            {getFieldDecorator('goodsSaleType', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择限购类型'
                                }]
                            })(<Select placeholder="请选择限购类型">
                                <Option value="china">China</Option>
                                <Option value="use">U.S.A</Option>
                            </Select>)}
                        </FormItem>
                        <FormItem label="商品状态" {...formItemLayout}>
                            {getFieldDecorator('goodsStatus', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择商品状态'
                                }]
                            })(<RadioGroup size="large">
                                <RadioButton value="saleing">销售中</RadioButton>
                                <RadioButton value="saled">已下架</RadioButton>
                            </RadioGroup>)}
                        </FormItem>
                    </TabPane>
                </Tabs>
                <div className="goods-edit-button">
                    <Button
                        type="primary"
                        size="large"
                        icon="save"
                        htmlType="submit"
                        onClick={this.submitEdit}>保存</Button>
                    <Button type="primary" size="large" icon="delete">取消</Button>
                </div>
            </Form>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        goodsListArr: state.goodsListArr,
        columnListArr: state.columnListArr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({goodsAdd, columnListGet}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(GoodsEdit))
