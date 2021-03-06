const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){  //next is for moving to the next middleware
    //Get token from the header
    const token = req.header('x-auth-token');

    //Check if not token
    if (!token){
        res.status(401).json({
            msg: 'No token ,authorization denied'
        })
    }

    //Verify the token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch(err){
        res.status(401).json({msg: 'token is not valid'})
    }
}