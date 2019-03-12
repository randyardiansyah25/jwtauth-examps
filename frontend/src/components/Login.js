import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginSubmit = e => {
        e.preventDefault()
        //console.log(this.state);
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(user)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push("/")
        }
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push("/")
        }
    }

    render(){
        const { errors } = this.state;
        return(
            <div className="container" style={{marginTop: '50px', width: '700px'}}>
                <h2 style={{marginBottom: '40px'}}>Login</h2>
                <form onSubmit={ this.handleLoginSubmit }>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            // className="form-control" 
                            className={
                                classnames("form-control", {
                                    "is-invalid": errors.email
                                })
                            }
                            placeholder="Your email" 
                            name="email" 
                            onChange={ this.handleOnChange } />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Password:</label>
                        <input 
                            type="password" 
                            //className="form-control" 
                            className={
                                classnames("form-control", {
                                    "is-invalid": errors.password
                                })
                            }
                            placeholder="Your password" 
                            name="password" 
                            onChange={ this.handleOnChange } />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form> 
            </div>

        )
    }
}

Login.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login)