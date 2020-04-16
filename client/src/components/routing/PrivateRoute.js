// Component so we can declare private routes in our App.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ...rest will take anything else passed in to our component
const PrivateRoute = ({ 
    component: Component, 
    auth: { isAuthenticated, loading }, 
    ...rest
}) => (
    // authentication on our props with a redirect back to login if fail
    // if true -> load component
        <Route
        {...rest} 
            render={props => 
                !isAuthenticated && !loading ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props}/>
                )
            }
        />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
