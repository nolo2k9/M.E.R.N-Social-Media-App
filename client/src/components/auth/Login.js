import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import{login} from '../../actions/auth';


//pulling login from props instead of doing props.login
const Login = ({login, isAuthenticated}) => {
    /*
        formData = object with all of the field values
        setFormData = function being used to update state, like this.setState(value, value)

        use state hook just like doing 
        state = {
            formData: {
                name: john
                age: 18
                etc
            }
        }
    */
    const [formData, setFormData] = useState({
        //initial state
       
        email: '',
        password: ''
        
    });
    //assigning these to formData object
    const {  email, password } = formData;
    /*
        When onChange is fired the element e is passed into setFormData
        The formData object will then make a copy of formData using the spread operator
        Then it will update the state associated with the name of the target input 
        [e.target.name] is a key that looks for the associated name attribute and will change it for everyfield... ex name = password  
    */
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
       
    }
    //  if the users credentials are valid redirect them 
    if(isAuthenticated){
        return <Redirect to="/dashboard"/>
    }
    return <Fragment>

        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)} required
                    minLength="6"
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

    </Fragment>;
    
};
//declaring login proptypes
Login.prototype = {
    login: PropTypes.func.isRequired,
    //boolean type
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    //Need to check if the user is authenticated (reducers/auth)
    isAuthenticated:state.auth.isAuthenticated
});


export default connect(
    //Map state to props set to null
    mapStateToProps, 
    //action (login)
    {login}) 
    //Login
    (Login);