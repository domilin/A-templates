/**
 * Author：zhoushuanglong
 * Time：2017/7/27
 * Description：root route
 */

/* import React from 'react'
import { Route, Switch } from 'react-router'

const rootRoutes = <Switch>
    <Route path="/" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Main').default)
        }, 'Main')
    }}>
        <Route path='/enter' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/Enter').default)
            }, 'Enter')
        }}/>
    </Route>
    <Route path='/login' getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Login').default)
        }, 'Login')
    }}/>
</Switch>

export default rootRoutes */

import { Switch, Route } from 'react-router-dom'

const HomePage = () => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>

const PrimaryLayout = () => (
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={UsersPage}/>
    </Switch>
)

export default PrimaryLayout
