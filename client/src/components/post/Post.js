import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {getPost} from '../../actions/post'
import PostItem from '../posts/PostItem'
import {Link} from 'react-router-dom'
import FormComment from '../post/FormComment';
import FormCommentItem from '../post/FormCommentItem'




const Post = ({getPost, post:{post, loading}, match}) => {

    useEffect(() => {
        //getting the post id from the url parameters
        getPost(match.params.id)
        //adding get post asa dependency
    }, [getPost]);
    //if the page is loading or no post exists show the spinner 
    //Else pass in a frgament containing post item containing the post
    return loading || post === null ? <Spinner/> : 
    <Fragment>
        <Link to = '/posts' className = 'btn'>
            Back
        </Link>
        <PostItem post={post} Actions={false}/>
        <FormComment postId = {post._id} />
        <div className="comments">
        {post.comments.map(comment => (
            <FormCommentItem key = {comment._id} comment= {comment} postId={post._id} />
        ))}
         </div>
    </Fragment>
        
    
};

Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps,{getPost})(Post) 