// Handles getting JSON web token for authentication

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// GET api/auth - Test route 
// by adding auth as a param, we protect our route using the middleware
router.get('/', auth, async(req, res) => {
    try 
    {
        const user = await await User.findById(req.user.id).select('-password'); // exclude password from return
        res.json(user);
    } 
    catch (error) 
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// POST api/auth - Authenticate user and get the token
router.post('/', [
    // check() performs validation on our fields (see documentation)
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    // check for error
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})// 400 = bad request, sends our validation messages as json array
    }

    const { email, password } = req.body;

    try 
    {
        // See if user exists -> error
        let user = await User.findOne({ email });// gets users email

        if(!user)
        {
            return res.status(400).json({ errors: [{msg: 'Invalid credentials'}]});// 400 bad request, array like above
        }

        // Return jsonwebtoken - automatically log in immediately after registration
        // an example of how JWT works: https://jwt.io/
        // Docs: https://www.npmjs.com/package/
        
        // making sure password matches
        const isMatch = await bcrypt.compare(password, user.password);// will compare encrypted and plaintext passwords

        if(!isMatch)
        {
            return res.status(400).json({ errors: [{msg: 'Invalid credentials'}]});// 400 bad request, array
        }

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
        
    }
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;