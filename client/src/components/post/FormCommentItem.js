import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {deleteCommentSingle} from '../../actions/post'


const FormCommentItem = ({
    //pulling the postId, within the comment(id, the text, the persons name, their picture, their user id and the date) from the database
    postId,
    comment: {_id, text, name, avatar, user, date},
    auth,
    deleteCommentSingle
}) => {
    return (
       
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to= {`/profile/${user}`}>
              <img
                class="round-img"
                src= {avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format= 'YYYY/MM/DD'>{date}</Moment>
            </p>
            {!auth.loading && user ===auth.user._id && (
                <button onClick = {e => deleteCommentSingle(postId, _id)} type = "button" className="btn btn-danger">
                <i className = "fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    )
}

FormCommentItem.propTypes = {

    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired,
    deleteCommentSingle: PropTypes.func.isRequired

}
//Authentication
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteCommentSingle})(FormCommentItem) 
