import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication'
import classnames from 'classnames';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirm: "",
            errors: {}
        }
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
        console.log(user)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.pus("/")
        }

        if(nextProps.errors) {
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
            <div className="container" style={{ marginTop:'50px',width:'700px'}}>
                <h2 style={{marginBottom: '40px'}}>Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            className={
                                classnames("form-control", {
                                    "is-invalid": errors.name
                                })
                            } 
                            type="text" 
                            placeholder="Your name" 
                            name="name" 
                            id="name" 
                            onChange={ this.handleInputChange } 
                            value={ this.state.name } />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            className={
                                classnames("form-control", {
                                    "is-invalid": errors.email
                                })
                            } 
                            type="email" 
                            placeholder="Your email" 
                            name="email" 
                            id="email" 
                            onChange={ this.handleInputChange } 
                            value={ this.state.email } 
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            className={
                                classnames("form-control", {
                                    "is-invalid": errors.password
                                })
                            } 
                            type="password" 
                            placeholder="Your password" 
                            name="password" 
                            id="password" 
                            onChange={ this.handleInputChange } 
                            value={ this.state.password } />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input 
                            className={
                                classnames("form-control", {
                                    "is-invalid": errors.password_confirm
                                })
                            } 
                            type="password" 
                            placeholder="Confirm your password!" 
                            name="password_confirm" 
                            id="password_confirm" 
                            onChange={ this.handleInputChange } 
                            value={ this.state.password_confirm } />
                            {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Register User</button>
                    </div>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))