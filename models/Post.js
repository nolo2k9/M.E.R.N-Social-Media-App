const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    //connects a user to a post
    //references users schema
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    //user required to enter text into their post 
    text: {
        type: String,
        required: true,
    },
    //user name 
    name: {
        type: String
    },

    avatar: {
        type: String
    },
    //array of likes
    likes: [
        {   //array of user object that contains the id's
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    //array of comments and contents 
    comments: [
        {
            //user data
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            //comment entered
            text: {
                type: String,
                required: true,

            },
            //user name 
            name: {
                type: String
            },
            //user avatar
            avatar: {
                type: String
            },
            //date the comment was posted
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    //date of the post
    date: {
        type: Date,
        default: Date.now
    }


})
//export as 
module.exports = Post = mongoose.model('post', postSchema)