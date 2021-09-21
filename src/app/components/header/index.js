import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Cartsidebar from '../web/views/cart-sidebar';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '', userName: '',searchtxt:''
        };
    } 
    render() {
        return (
            <div>
                <header className="header clearfix">
                    <nav className="navbar navbar-light navbar-expand-lg bg-dark bg-faded osahan-menu">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/"> <img src="https://picsum.photos/80/35?random=1" alt="logo" /> </a>
                           
                            <div className="navbar-collapse" id="navbarNavDropdown">
                                <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                                    <div className="top-categories-search" onSubmit={this.handleClickSearch}>
                                        <div className="input-group">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2 my-lg-0">
                                    <ul className="list-inline main-nav-right" >
                                        <li className="list-inline-item">
                                            
                                        </li>
                                        <li className="list-inline-item cart-btn mr-0">
                                            <Cartsidebar />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}
export default withRouter(Navigation)
