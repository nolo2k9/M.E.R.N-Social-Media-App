// Handles the in-between on the token and confirms or denies it

const jwt = require('jsonwebtoken');
const config = require('config');

// has access to all request and response objects
module.exports = function(req, res, next)
{
    // Get the token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token)
    {
        return res.status(401).json({ msg: 'No token, authorization denied' }); // 401 not authorized then -> error message
    }

    // verify token 
    try 
    {
        // decode the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } 
    catch (error) 
    {
        res.status(401).json({msg: 'Token is not valid'});
    }
}