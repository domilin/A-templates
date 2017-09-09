/**
 * Author：tantingting
 * Time：2017/8/22
 * Description：Description
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Table, Modal, Form } from 'antd'
import './config.scss'
const { TextArea } = Input
const FormItem = Form.Item
const columns = [{
    title: '专栏类型名称',
    width: '25%',
    dataIndex: 'lk_column_name'
}, {
    title: '显示顺序',
    dataIndex: 'lk_column_sort',
    width: '15%',
    render: (text, record) => {
        return <Input style={{'width': '50%'}}/>
    }
}, {
    title: '备注',
    width: '40%',
    dataIndex: 'lk_column_remark'
}, {
    title: '操作',
    render: (text, record) => {
        return <div className="goods-operate">
            <a className="mr15" onClick={() => {
                console.log('a')
            }}>编辑</a>
            <a onClick={() => {
                console.log('c')
            }}>删除</a>
        </div>
    }
}]

const data = [{
    key: '1',
    lk_column_name: '11',
    lk_column_remark: '22',
    lk_column_sort: '33',
    lk_column_time: '44'
}]
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15}
}
class UserPermission extends Component {
    constructor () {
        super()
        this.state = {
            'visible': false,
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }]
        }
    }
    submitForm = () => {
        const { form } = this.props
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            console.log('Received values of form: ', values)
            form.resetFields()
            this.setState({ visible: false })
        })
    }
    render () {
        const {getFieldDecorator} = this.props.form
        return <div className="recommend-config common">
            <Button type="primary" icon="plus" onClick={() => this.setState({'visible': !this.state.visible})}>新建</Button>
            <Table className="center-table mt30" columns={columns} dataSource={data} bordered pagination={false}/>
            {/*
                新增/修改专栏
            */}
            <Modal className="common" title="新建专栏" visible={this.state.visible} onOk={() => this.submitForm()} onCancel={() => this.setState({ 'visible': false })}
                okText="确认"
                cancelText="取消"
            >
                <Form>
                    <FormItem label="专栏名称" {...formItemLayout}>
                        {getFieldDecorator('lk_column_name', {
                            rules: [{
                                required: true, message: '请填写专栏名称！'
                            }],
                            initialValue: ''
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="备注" {...formItemLayout}>
                        {getFieldDecorator('lk_column_remark', {
                            initialValue: ''
                        })(<TextArea rows="6" />)}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    }
}

export default connect(mapStateToProps)(Form.create()(UserPermission))
