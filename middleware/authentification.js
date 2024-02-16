const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authentification = (req, res, next) => {
    try{
      const authToken = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = jwt.verify(authToken, process.env.SECRET);
      const user = User.findOne({ _id: decodedToken._id, 'authTokens.authToken': authToken });
        if(!user){
            throw new Error();
        }

        req.user = user;
        next();
    }catch(err){
        res.status(400).send({"Authentification error" : "Please authenticate first"});
    }
}

module.exports = authentification;