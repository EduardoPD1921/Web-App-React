import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

export default props =>
    <Switch>
        <Redirect from="*" to="/"/>
    </Switch>