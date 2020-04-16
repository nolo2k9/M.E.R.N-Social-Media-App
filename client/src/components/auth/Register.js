import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
//connect must be exported
import {connect} from 'react-redux';
//importing set alert action
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';

//pulling set alert and registerfrom actions/alert
const Register = ({setAlert, register, isAuthenticated}) => {
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
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    //assigning these to formData object
    const { name, email, password, password2 } = formData;
    /*
        When onChange is fired the element e is passed into setFormData
        The formData object will then make a copy of formData using the spread operator
        Then it will update the state associated with the name of the target input 
        [e.target.name] is a key that looks for the associated name attribute and will change it for everyfield... ex name = password  
    */
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        //objects like password made available from hook formData anywhere and can be called using setFormData
        //They can be updated using setForm data
        /*
            validation to see if both entered passwords are matching 
            if they are not send a message 
            if they are log the entered data in form data

            props.Alert passes the string into the payload as an msg
            Generate an id and dispatch the alert with that message and id
            Danger is the alert type css-alert
        */
        if (password !== password2) {
            /*
                 Getting alert type from here 
                 <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
                </div>
            */
            setAlert('The passwords entered do not match', 'danger');

        } else {
            //calling register class passing in name, email, password
            register({name, email, password});
        }
    }

    if(isAuthenticated){
        return <Redirect to = '/dashboard' />
    }
    return <Fragment>

        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
            </div>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small>
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
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2} onChange={e => onChange(e)} required
                    minLength="6"
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>

    </Fragment>
    
};
//setting up proptypes for Regsiter
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool

}
const mapStateToProps = state => ({
    //Need to check if the user is authenticated (reducers/auth)
    isAuthenticated:state.auth.isAuthenticated
})
//export connect with register component passing in action object
//connect takes intwo things:
//State that you want to map eg alert/Profiler

export default connect(mapStateToProps, {setAlert, register})(Register);

