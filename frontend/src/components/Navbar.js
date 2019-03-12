import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../actions/authentication';


class Navbar extends Component {

    onLogout = e => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    render(){
        console.log(this.props.auth);
        const {isAuthenticated, user} = this.props.auth
        const authLink = (
            <ul className="navbar-nav ml-auto">
                <a href="#" className="nav-link" onClick={this.onLogout}>
                    <img 
                        src={user.avatar} 
                        alt={user.name} 
                        title={user.name} 
                        className="rounded-circle"
                        style={{width: '25px', height: '25px', marginRight:'8px'}}
                    />
                    Logout
                </a>
            </ul>
        )

        const guestLink = (
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li> */}
                <li className="nav-item">
                    <Link to="/Register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        )

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Auth Examps</Link>
                {console.log(`user : ${user}`)}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    { isAuthenticated ? authLink : guestLink}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))