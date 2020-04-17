import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addCommentSingle} from '../../actions/post'

const FormComment = ({postId, addCommentSingle}) => {
    const [text, setText] = useState('');
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
            e.preventDefault();
            addCommentSingle(postId,{text});
            setText('');

        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Write your post!!!"
            value = {text}
            onChange = {e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

FormComment.propTypes = {

addCommentSingle: PropTypes.func.isRequired,


}

export default connect(null, {addCommentSingle})(FormComment);
