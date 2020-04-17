import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import {getPosts} from '../../actions/post';
//get the getPosts, post(the posts and the loading state)
const Posts =({getPosts,post:{posts,loading},auth: { user } }) => {
    useEffect(() => {
        getPosts();
    }, 
    //get post dependency
    [getPosts]);
    /*
        If its loading show the spinner, else load a fragment 
        Map through posts then for each post use the key of post.id and get it's post data
    */
    return loading ?( <Spinner /> 
        ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
              <i className="fas fs-user"></i>Hi { user && user.name }!!! What's on your mind?
          </p>
        <PostForm/>
        <div className="posts">
            {posts.map(post => (
                <PostItem key={post.id} post={post}/>
            ))}
        </div>
        </Fragment>
    );
};

Posts.prototypes = {
  getPosts:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired

}
//getting state
const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});
export default connect(mapStateToProps,{getPosts})(Posts);