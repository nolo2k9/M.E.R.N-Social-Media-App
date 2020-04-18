import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        college: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    // Toggle visibility of social inputs
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        // check loading or no profile objects, then fill with our data
        setFormData({
            college: loading || !profile.college ? '' : profile.college,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        });
        
    }, [loading, getCurrentProfile]);

    const{
        college,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Edit Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your profile about you
            </p>
            <small>Required fields are marked with a *</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Academic Status</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD">PhD</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Department Head">Department Head</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your education</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="College" name="college" value={college} onChange={e => onChange(e)}/>
                    <small className="form-text">Could be your own college or one you study at</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
                    <small className="form-text">Could be your own or a college website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
                    <small className="form-text">County/City suggested (e.g. Dublin, Dublin City)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
                    <small className="form-text">Please use comma separated values (eg. HTML, CSS, JavaScript)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e => onChange(e)}/>
                    <small className="form-text">Connect your github. Just paste in the link of your github repositories</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Tell us about yourself</small>
                </div>
                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">Add Social Network Links</button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="Youtube URL" name="youtube" value={youtube} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
                    </div>
                </Fragment>}

                
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));