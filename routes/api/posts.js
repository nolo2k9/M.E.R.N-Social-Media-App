// Handles posts users make

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
// Post request
// Create a post
router.post('/',
    [   //text is required in post
        auth,
        [
            check('text', 'You are required to enter text into a comment').not().isEmpty()

        ]
    ],
    async (req, res) => {
        //error checking, takes in request
        //validation result method provided through express validator
        //it extracts the validation errors from a request and makes them available in the error var
        const errors = validationResult(req);
        //if there are errors send back status 400 with the contents of the error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            /*
                User logged in, users id can be found by req.user.id
                don't send the password
            */
            const user = await User.findById(req.user.id).select('-password');
            //new post 
            const newPost = new Post({
                //text is in the req.body.text
                text: req.body.text,
                //name= users name 
                name: user.name,
                //users avater
                avatar: user.avatar,
                //users id 
                user: req.user.id
            });
            //save post
            const post = await newPost.save();
            //send back post in response 
            res.json(post);

        } catch (error) {

            console.error(err.message);
            res.status(500).send('Server error')

        }



    });

// Get request
// Get all posts
router.get('/', auth, async (req, res) => {

    try {
        //find post and sort it by most recent, oldest is the default 
        const posts = await Post.find().sort({ date: -1 });
        //return posts 
        res.json(posts);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error')
    }

});

// Get request
// Get all posts by id 

router.get('/:id', auth, async (req, res) => {

    try {
        //find post and sort it by most recent, oldest is the default 
        const post = await Post.findById(req.params.id).sort({ date: -1 });
        //if there is not a post by that user is 
        if (!post) {
            return res.status(404).json({ msg: 'There was no post not found' });
        }
        //return posts 
        res.json(post);

    } catch (error) {
        console.error(error.message);
        //if the error returned relates to an object id return
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'There was no post not found' });
        }
        res.status(500).send('Server error')
    }

});
module.exports = router;