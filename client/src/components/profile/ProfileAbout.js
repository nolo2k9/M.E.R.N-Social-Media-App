// component to render the about user profile component formatted and with our users data
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// our data taken from profile and user
// Will also trim the users name
// maps and renders skills
const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: {name}
}}) => 
    <div className="profile-about bg-light p-2">
        { bio && (
            <Fragment>
                <h2 className="text-primary">{name}s Bio</h2>
                <p>{bio}</p>
                <div className="line"></div>
            </Fragment>
        )}
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
            {skills.map((skill, index) =>(
                <div key={index} className="p-1">
                    <i className="fas fa-check"></i> {skill}
                </div>
            ))}    
        </div>
    </div>;

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
