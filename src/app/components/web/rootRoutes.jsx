import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../header';
import Home from '../web/views/home';
import Shopdetails from './views/shop-details';

export default class rootRoutes extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </div>
        )
    }
}
