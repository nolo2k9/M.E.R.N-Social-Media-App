// File for fetching all our data using an 'action'
import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import ProfileExperience from '../profile/ProfileExperience';
import ProfileEducation from '../profile/ProfileEducation';
import ProfileGithub from '../profile/ProfileGithub';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading} }) => {
    // lifecycle
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]); // runs once

    // if profile is null and still loading, load spinner
    // or if null display create account button
    // or if data exists load profile
    return loading && profile === null ? ( <Spinner/> ) : (
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
        <i className="fas fa-user" />Welcome { user && user.name }
        </p>
        {profile !== null ? (
        // Our component objects to display
        // bring in Dashboard actions and place at top of profile
        // Bring in ProfileTop and ProfileAbout components into our Fragment
        // Then bring in Experience and Education as long as they exist ( >0 )
        // Finally checks for a github user name and displays the github component if true
        <Fragment>
            <DashboardActions></DashboardActions>
            <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {profile.experience.length > 0 ? (<Fragment>
                        {profile.experience.map(experience => (
                            <ProfileExperience key={experience._id} experience={experience}></ProfileExperience>
                        ))}
                    </Fragment>) : (<h4>No Experience credentials</h4>)}
                </div>
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {profile.education.length > 0 ? (<Fragment>
                        {profile.education.map(education => (
                            <ProfileEducation key={education._id} education={education}></ProfileEducation>
                        ))}
                    </Fragment>) : (<h4>No Education credentials</h4>)}
                </div>
                {profile.githubusername && (
                    <ProfileGithub username={profile.githubusername}/>
                )}
            </div>
            <Experience experience={profile.experience} />
            <Education education={profile.education} /> 

            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </div>
            <small>If page is unresponsive please reload! </small>
        </Fragment>
        ) : (
        <Fragment>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
                Create Profile
            </Link>
        </Fragment>
        )}
    </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired 
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
