// Handles actions on profiles, fetching/updating etc...

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// GET api/profile/the target profile - Gets current users profile
router.get('/me', auth, async(req, res) => {
    try 
    {
        // user is from our Profile model, name and avatar are from User model
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']); 

        if(!profile)
        {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }
        res.json(profile);
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// POST api/profile - Create or Update a user profile
router.post('/', [ auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'SKills is required').not().isEmpty()
    ]
], 
async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array()});
    }

    const {
        company,
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
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills)
    {
        // Array our skills
        profileFields.skills = skills.split(',').map(skill => skill.trim());// prevents errors with spaces included in entries
    }

    // Build social object and check existence of data
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try 
    {
        let profile = await Profile.findOne({ user: req.user.id }); // look for users profile

        if(profile)// found
        {
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set : profileFields }, { new: true });
            return res.json(profile);
        }

        // Create (if not found)
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;