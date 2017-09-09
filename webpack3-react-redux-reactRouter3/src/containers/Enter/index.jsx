/**
 * Author：zhoushuanglong
 * Time：2017/7/26
 * Description：enter
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import $ from 'jquery'

import './index.scss'
import menuData from '../../public/menuData'
import { gameList, navigation, breadcrumb } from '../../actions/index'

class Enter extends Component {
    componentDidMount () {
        this.props.actions.gameList()
    }

    goGoodsListPage = (gameId) => {
        hashHistory.push('/goods-list')
        $.cookie('gameId', gameId)
    }

    render () {
        const This = this
        return <div className="game-wrap clearfix">
            {this.props.gameListInfo.map(function (d, i) {
                return <a
                    className="game-item"
                    key={d.lk_game_id}
                    onClick={() => {
                        This.goGoodsListPage(d.lk_game_id)
                        This.props.actions.navigation(menuData[1].children[0].key, menuData[1].key)
                        This.props.actions.breadcrumb([menuData[1].text, menuData[1].children[0].text])
                    }}>{d.lk_game_name}</a>
            })}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        gameListInfo: state.gameListInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({gameList, navigation, breadcrumb}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enter)
