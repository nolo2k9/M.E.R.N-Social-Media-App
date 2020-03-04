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
// Delete request
// Delete a post
router.delete('/:id', auth, async (req, res) => {

    try {
        //find post and sort it by most recent, oldest is the default 
        const post = await Post.findById(req.params.id);
        //if the post doesn't exist 
        if (!post) {
            return res.status(404).json({ msg: 'There was no post not found' });
        }
        /*
        check if the user logged in is the one who created the post
        req.user.id is a string, and user is not.
        To be able to compare them we need to turn user into a string
        The toString() is used for this so they can be comapred 
        Without the toSting90 eve if the user is the same it will never match 
        */
        if (post.user.toString() !== req.user.id) {
            //return a status report of 401(not authorised)
            return res.status(401).json({ msg: 'You are not authorised to delete this post' });

        }
        // remove the document from th db
        await post.remove();

        //return posts 
        res.json({ msg: 'This post has been removed!!!! ' });

    } catch (error) {
        console.error(error.message);
        //if the error returned relates to an object id return
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'There was no post not found' });
        }
        res.status(500).send('Server error')
    }

});

// Put request
// Like a post

router.put('/like/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        /*
            Validation check if the post has already been liked by the user 

            The filter() method creates a new array by filtering out all the elements
            that do not pass the test implemented by the callback() function. 
            Internally, the filter() method iterates over each element of an array and pass each element to the callback() function.
            
            filter method filters through the array of likes on the post
            filter takes a parameter like it compares the current iteration to the user that is logged in and puts the object in string format
            if that users like is greater that 0
            execute
        */
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            //send 400 bad request with the contained message
            return res.status(400).json({ msg: 'You have already liked this post' })
        }

        //if the post hasn't been liked
        //unshift will add that users like to the beginning of the array
        post.likes.unshift({ user: req.user.id });
        //save post
        await post.save();

        res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');


    }

});

// Put request
// Unlike a post

router.put('/unlike/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        /*
            Validation check if the post has already been liked by the user 

            The filter() method creates a new array by filtering out all the elements
            that do not pass the test implemented by the callback() function. 
            Internally, the filter() method iterates over each element of an array and pass each element to the callback() function.
            
            filter method filters through the array of likes on the post
            filter takes a parameter like it compares the current iteration to the user that is logged in and puts the object in string format
            if that users like is greater that 0
            execute
        */
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            //send 400 bad request with the contained message
            return res.status(400).json({ msg: 'You have not liked this post yet' })
        }

        //get remove index
        //for each like in the, return the useers like toString() in the index of the user id
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        //splice that like from the array and remove that like
        post.likes.splice(removeIndex, 1)
        //save post
        await post.save();

        res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');


    }

});



// Post request
// Comment on a post 
router.post('/comment/:id',
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
            //Post id contained in url 
            const post = await Post.findById(req.params.id);
            //new Comment  
            const newComment = ({
                //text is in the req.body.text
                text: req.body.text,
                //name= users name 
                name: user.name,
                //users avater
                avatar: user.avatar,
                //users id 
                user: req.user.id
            });
            //new comment to the top of the array
            post.comments.unshift(newComment)
            //save post with newly created comment 
            await post.save();
            //send back all comments in post in the response 
            res.json(post.comments);

        } catch (error) {

            console.error(err.message);
            res.status(500).send('Server error')

        }



    });

// Delete request
// Delete a comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {

        //Post id contained in url 
        const post = await Post.findById(req.params.id);

        /*
           Get comment from post
           for each comment see if the comment id is equal to the comment id in the request
           If the comment exists it will show the comment, otherwise it will
           return a 404 not found with a suitable message. 
        */
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Validation, make sure there is an actual comment with this id 
        if (!comment) {
            return res.status(404).json({ msg: 'The comment does not exist!!' })
        }
        /*
           check the user made the comment 
           Comment has the user property of id 
           return 401 not authorised with appropriate message
       */

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You are not authorised to delete this comment!!' })
        }

        //get remove index
        //for each comment in the, return the users comment toString() in the index of the user id
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        //splice that like from the array and remove that like
        post.comments.splice(removeIndex, 1)
        //save post
        await post.save();
        //return all the comments
        res.json(post.comments);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error')

    }
});
module.exports = router;