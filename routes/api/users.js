// Handles registering/adding users

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// POST api/users - Register User
router.post('/', [
    // check() performs validation on our fields (see documentation)
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characers').isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    // check for error
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})// 400 = bad request, sends our validation messages as json array
    }

    const { name, email, password } = req.body;

    try 
    {
        // See if user exists -> error
        let user = await User.findOne({ email });// gets users email

        if(user)
        {
            return res.status(400).json({ errors: [{msg: 'User already exists'}]});// 400 bad request, array like above
        }

        // Get users gravatar (profile picture) that is associated with their email
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // instance of user
        user = new User({
            name,
            email,
            avatar,
            password
        });

        // Encrypt password - using bcrypt
        // Docs:  "https://www.npmjs.com/package/bcrypt"
        // the salt is random data that is used as an additional input to a one-way function that hashes data
        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(password, salt);// creates a hash based off the salt on password param

        await user.save();

        // Return jsonwebtoken - automatically log in immediately after registration
        // an example of how JWT works: https://jwt.io/
        // Docs: https://www.npmjs.com/package/
        
        const payload = {
            user: {
                id: user.id
            }
        }

        // sign the token, pass in the payload(data), pass in the secret, then validate on whether a token is received
        jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000}, // 360000 is a test value! CHANGE to 3600 (in seconds, i.e. 1 hour lifespan)
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );

        //res.send('User registered')
    }
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;