/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：rich editor
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Editor, EditorState, RichUtils } from 'draft-js'

import './index.scss'

class RichEditor extends Component {
    constructor (props) {
        super(props)
        this.state = {editorState: EditorState.createEmpty()}

        this.focus = () => this.refs.editor.focus()
        this.onChange = (editorState) => this.setState({editorState})

        this.handleKeyCommand = (command) => this._handleKeyCommand(command)
        this.onTab = (e) => this._onTab(e)
        this.toggleBlockType = (type) => this._toggleBlockType(type)
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    }

    _handleKeyCommand (command) {
        const {editorState} = this.state
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState)
            return true
        }
        return false
    }

    _onTab (e) {
        const maxDepth = 4
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
    }

    _toggleBlockType (blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }

    _toggleInlineStyle (inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }

    render () {
        const {editorState} = this.state
        let className = 'RichEditor-editor'
        const contentState = editorState.getCurrentContent()
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder'
            }
        }

        return <div className="RichEditor-root">
            <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
            />
            <div className={className} onClick={this.focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    onTab={this.onTab}
                    placeholder="请输入文字"
                    ref="editor"
                    spellCheck={true}
                />
            </div>
        </div>
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
}

function getBlockStyle (block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote'
        default:
            return null
    }
}

class StyleButton extends Component {
    constructor () {
        super()
        this.onToggle = (e) => {
            e.preventDefault()
            this.props.onToggle(this.props.style)
        }
    }

    render () {
        let className = 'RichEditor-styleButton'
        if (this.props.active) {
            className += ' RichEditor-activeButton'
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        )
    }
}

const BLOCK_TYPES = [
    {label: '标题一', style: 'header-one'},
    {label: '标题二', style: 'header-two'},
    {label: '标题三', style: 'header-three'},
    {label: '标题四', style: 'header-four'},
    {label: '标题五', style: 'header-five'},
    {label: '标题六', style: 'header-six'},
    {label: '引用', style: 'blockquote'},
    {label: '有序列表', style: 'unordered-list-item'},
    {label: '无序列表', style: 'ordered-list-item'},
    {label: '代码块', style: 'code-block'}
]

const BlockStyleControls = (props) => {
    const {editorState} = props
    const selection = editorState.getSelection()
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

const INLINE_STYLES = [
    {label: '加粗', style: 'BOLD'},
    {label: '斜体', style: 'ITALIC'},
    {label: '下划线', style: 'UNDERLINE'},
    {label: '等宽字体', style: 'CODE'}
]

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle()
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        layoutConfig: state.layoutConfig
    }
}

export default connect(mapStateToProps)(RichEditor)
