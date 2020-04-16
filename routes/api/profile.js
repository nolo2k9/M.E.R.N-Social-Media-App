// Handles actions on profiles, fetching/updating etc...

const express = require('express');
const request = require('request');
const config = require('config')
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// GET api/profile/the target profile - Gets current users profile
router.get('/me', auth, async (req, res) => {
    try {
        // user is from our Profile model, name and avatar are from User model
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// POST api/profile - Create or Update a user profile
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'SKills is required').not().isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            college,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile Object and check existence of data
        const profileFields = {};
        profileFields.user = req.user.id;
        if (college) profileFields.college = college;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            // Array our skills
            profileFields.skills = skills.split(',').map(skill => skill.trim());// prevents errors with spaces included in entries
        }

        // Build social object and check existence of data
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id }); // look for users profile

            if (profile)// found
            {
                //Update
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }

            // Create (if not found)
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

//get request to api/profile
//get all profiles

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (err) {

        console.error(err.message);

        res.status(500).send('Server Error');
    }

});

//get request to api/profile/user/:user_id
//Get profile by user id

router.get('/user/:user_id', async (req, res) => {
    try {
        //Using mongo findOne() to find and populate a single profile by their user_id
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        //if the profile doesnt exist, send a status 400 along with a json message
        if (!profile) {
            return res.status(400).json({ msg: 'There was no profile found for this user' });
        }
        //response 
        res.json(profile);

    } catch (err) {

        console.error(err.message);
        //dont need this
        //If the kind of error relates to an object id send back this response 
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There was no profile found for this user' });
        }

        res.status(500).send('Server Error');
    }

});

//Delete request to api/profile
//Delete profile, user and posts

router.delete('/', auth, async (req, res) => {
    try {
        //Remove user posts
        await Post.deleteMany({ user: req.user.id });
        //Remove a profile by using the mongo command findOneAndRemove
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove the user 
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User has been deleted " });

    } catch (err) {

        console.error(err.message);

        res.status(500).send('Server Error');
    }

});

//Put request to api/profile/experience
// Add profile experience 

router.put('/experience', [

    auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date required').not().isEmpty()
    ]
], async (req, res) => {

    //check for errors
    const errors = validationResult(req);
    // if errors are contained in response, return status 400 with array of errors in json format 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //pull the following dat from request body 
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description

    }
    //getting profile you want to add experience to 
    try {
        const profile = await Profile.findOneAndUpdate({ user: req.user.id });
        //unshift pushes experience to the beggining, as opposed to the end. So the most recent are shown first 
        //passed in newExp object
        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);

        res.status(500).send('Server Error');

    }

}
);

// Delete  request to api/profile/experience
// Delete profile experience 

router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {
        //getting profile of the user 
        const profile = await Profile.findOne({ user: req.user.id });

        //Get the index remove index
        //Match whatever is passed into exp_id and get that experience
        //id passed into params is the experience id added when experience is created
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        //take an element from experience and remove that index
        profile.experience.splice(removeIndex, 1);
        //save profile
        await profile.save();
        //send back profile updated 
        res.json(profile);

    } catch (error) {
        console.error(error.message);

        res.status(500).send('Server Error');
    }

})

//Put request to api/profile/experience
// Add profile education 

router.put('/education', [

    auth,
    [
        check('school', 'The School you attended is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From date required').not().isEmpty()
    ]
], async (req, res) => {

    //check for errors
    const errors = validationResult(req);
    // if errors are contained in response, return status 400 with array of errors in json format 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //pull the following dat from request body 
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description

    }
    //getting profile you want to add experience to 
    try {
        const profile = await Profile.findOneAndUpdate({ user: req.user.id });
        //unshift pushes experience to the beggining, as opposed to the end. So the most recent are shown first 
        //passed in newExp object
        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);

        res.status(500).send('Server Error');

    }

}
);

// Delete  request to api/profile/experience
// Delete profile education 

router.delete('/education/:edu_id', auth, async (req, res) => {

    try {
        //getting profile of the user 
        const profile = await Profile.findOne({ user: req.user.id });

        //Get the index remove index
        //Match whatever is passed into exp_id and get that education
        //id passed into params is the education id added when education is created
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        //take an element from education and remove that index
        profile.education.splice(removeIndex, 1);
        //save profile
        await profile.save();
        //send back profile updated 
        res.json(profile);

    } catch (error) {
        console.error(error.message);

        res.status(500).send('Server Error');
    }

})

// Get request to api/profile/github/:username
// Get user repos from github

router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            /*uri consists of the following:
            The github username for the person making the request
            shows 5 per page
            When they were created in ascending order
            The client id and secret were created when the project was added on https://github.com/settings/developers
            both are taken from the config file which is used as a requirement above and then asscessed here
            */
           url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
           method: 'GET',
           headers: {
             'user-agent': 'node.js',
             Authorization: `token ${config.get('OAUTH-TOKEN')}`
           }
            
        };

        /*
            the request will contain options (defined above)
            a callback which will contain a possible error
            a response object and a body
        */
        request(options, (error, response, body ) =>{
            //if an error is contained in the response send back the error message
            if (error)
            {
                console.error(error);

            }
            // if a successful status code 200 is not returned send back the following 
            if (response.statusCode !==200)
            {
                    return res.status(404).json({msg: 'No Github profile has been found '})
            }
            //if successful send the body wrapped in json.parse
            res.json(JSON.parse(body));
            
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');

    }
})



module.exports = router;