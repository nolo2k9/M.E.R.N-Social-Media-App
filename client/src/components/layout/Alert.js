import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
/*
    Pulls alerts in to get access to it
    if there are more than 0 alerts  and if the array content is bigger than 0
    Map through alerts and return jsx. When mapping through jsx its rendered as a list.
    It must therefore have a key which in this case is alert.id
    styles come from classname pulling the alert class and the alertype from the css stylesheet.
    and inside the alert message
*/
const Alert = ({alerts}) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>

));
//Setting up alerts proptype array
Alert.propTypes = {
    alerts: PropTypes.array.isRequired

}
/*
    As the first argument passed in to connect, 
    mapStateToProps is used for selecting the 
    part of the data from the store that the connected component needs
*/
const mapStateToProps = state => ({
    alerts: state.alert
})
//connect needs to be used when interacting with function or getting state when using redux
export default connect(mapStateToProps)(Alert);