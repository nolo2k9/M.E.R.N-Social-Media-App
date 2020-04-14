import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getPosts} from '../../actions/post';
//get the getPosts, post(the posts and the loading state)
const Posts =({getPosts,post:{posts,loading} }) => {
    useEffect(() => {

        getPosts();

    }, 
    //get post dependency
    [getPosts]);

    return(
        <div>

        </div>
    )    
}

Posts.prototypes = {
  getPosts:PropTypes.func.isRequired,
  post: PropTypes.object.isRequired

}
//getting state
const mapStateToProps = state => ({
    post: state.post
});
export default connect(mapStateToProps,{getPosts})(Posts);